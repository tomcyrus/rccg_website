from collections import OrderedDict
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from time import monotonic
from uuid import uuid4
import asyncio
import re

from fastapi import Body, Depends, FastAPI, Header, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from pydantic import ValidationError

from .config import settings
from .models import PasswordChange, Login, PrayerSubmission, InquirySubmission, MODELS, PUBLIC_KINDS
from .supabase import Supabase


@asynccontextmanager
async def lifespan(app):
    app.state.db = Supabase()
    yield
    await app.state.db.close()


app = FastAPI(title='RCCG Kingdom First Assembly API', version='1.0.0', lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=settings.allowed_origins, allow_credentials=True,
                   allow_methods=['GET', 'POST', 'PUT', 'DELETE'], allow_headers=['Content-Type', 'X-Requested-With', 'If-Match'])


@app.middleware('http')
async def request_guards(request: Request, call_next):
    if request.url.path.startswith('/api/') and request.method in {'POST', 'PUT', 'DELETE', 'PATCH'}:
        origin = request.headers.get('origin')
        if request.headers.get('x-requested-with') != 'rccg-web' or (origin and origin not in settings.allowed_origins):
            return JSONResponse({'detail': 'Request origin is not allowed.'}, status_code=403)
        # Bound actual received bytes, including chunked requests without Content-Length.
        body = bytearray()
        async for chunk in request.stream():
            body.extend(chunk)
            if len(body) > 512_000:
                return JSONResponse({'detail': 'Request is too large.'}, status_code=413)
        request._body = bytes(body)
    response = await call_next(request)
    if request.url.path.startswith('/api/'):
        response.headers['Cache-Control'] = 'no-store'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response


@app.exception_handler(RequestValidationError)
async def validation_error(request, exc):
    # Do not echo passwords or confidential requests in error responses/logs.
    return JSONResponse({'detail': 'Invalid request. Check the required fields and their formats.'}, status_code=422)


def db(request: Request):
    return request.app.state.db


attempts = OrderedDict()


def rate_limit(request: Request, group: str, limit: int):
    now = monotonic()
    key = (request.client.host if request.client else 'unknown', group)
    times = [t for t in attempts.get(key, []) if t > now - 600]
    if len(times) >= limit:
        raise HTTPException(429, 'Too many attempts. Please try again in 10 minutes.')
    attempts[key] = [*times, now]
    attempts.move_to_end(key)
    while len(attempts) > 10000:
        attempts.popitem(last=False)


async def membership(database, user):
    rows = await database.request('GET', '/rest/v1/admin_users', params={'user_id': f'eq.{user["id"]}', 'select': 'user_id', 'limit': 1})
    if not rows:
        raise HTTPException(403, 'This account does not have administrator access.')
    return {'id': user['id'], 'email': user.get('email', '')}


async def require_admin(request: Request, database=Depends(db)):
    token = request.cookies.get('rccg_access')
    if not token:
        raise HTTPException(401, 'Please sign in to continue.')
    user = await database.request('GET', '/auth/v1/user', token=token, auth=True)
    return await membership(database, user)


def set_session(response, session):
    for name, value, age in [('rccg_access', session['access_token'], session.get('expires_in', 3600)),
                             ('rccg_refresh', session['refresh_token'], 604800)]:
        response.set_cookie(name, value, max_age=age, httponly=True, secure=settings.cookie_secure, samesite='lax', path='/api')


@app.get('/api/health')
def health():
    return {'status': 'ok', 'supabase_configured': settings.configured}


@app.post('/api/auth/login')
async def login(payload: Login, request: Request, response: Response, database=Depends(db)):
    rate_limit(request, 'login', 10)
    session = await database.request('POST', '/auth/v1/token', auth=True, params={'grant_type': 'password'}, json=payload.model_dump())
    user = await membership(database, session['user'])
    set_session(response, session)
    return user


@app.get('/api/auth/me')
async def me(user=Depends(require_admin)):
    return user


@app.post('/api/auth/refresh')
async def refresh(request: Request, response: Response, database=Depends(db)):
    token = request.cookies.get('rccg_refresh')
    if not token:
        raise HTTPException(401, 'Please sign in to continue.')
    session = await database.request('POST', '/auth/v1/token', auth=True, params={'grant_type': 'refresh_token'}, json={'refresh_token': token})
    user = await membership(database, session['user'])
    set_session(response, session)
    return user


@app.post('/api/auth/password')
async def change_password(payload: PasswordChange, request: Request, response: Response, user=Depends(require_admin), database=Depends(db)):
    rate_limit(request, 'password', 5)
    if payload.currentPassword == payload.newPassword:
        raise HTTPException(422, 'Choose a different password.')
    try:
        session = await database.request('POST', '/auth/v1/token', auth=True, params={'grant_type': 'password'}, json={'email': user['email'], 'password': payload.currentPassword})
    except HTTPException as exc:
        if exc.status_code == 401:
            raise HTTPException(400, 'Current password is incorrect.') from exc
        raise
    if session['user']['id'] != user['id']:
        raise HTTPException(403, 'Account verification failed.')
    await database.request('PUT', '/auth/v1/user', auth=True, token=session['access_token'], json={'password': payload.newPassword})
    # A password update can invalidate the session that performed it. Create a
    # fresh session so the browser never retains stale authentication cookies.
    fresh_session = await database.request(
        'POST', '/auth/v1/token', auth=True,
        params={'grant_type': 'password'},
        json={'email': user['email'], 'password': payload.newPassword},
    )
    set_session(response, fresh_session)
    return {'ok': True}


@app.post('/api/auth/logout')
async def logout(request: Request, database=Depends(db)):
    response = JSONResponse({'ok': True})
    token = request.cookies.get('rccg_access')
    if token:
        try:
            await database.request('POST', '/auth/v1/logout', auth=True, token=token, params={'scope': 'local'})
        except HTTPException as exc:
            if exc.status_code != 401:
                response = JSONResponse({'detail': 'Signed out locally; Supabase session revocation is temporarily unavailable.'}, status_code=503)
    for name in ('rccg_access', 'rccg_refresh'):
        response.delete_cookie(name, path='/api', secure=settings.cookie_secure, httponly=True, samesite='lax')
    return response


def check_kind(kind):
    if kind not in MODELS:
        raise HTTPException(404, 'Resource not found.')


def check_id(record_id):
    if not re.fullmatch(r'[a-zA-Z0-9_-]{1,100}', record_id):
        raise HTTPException(422, 'Invalid record ID.')


def validate(kind, payload):
    try:
        return MODELS[kind].model_validate(payload).model_dump(mode='json')
    except ValidationError as exc:
        errors = '; '.join(f'{".".join(map(str, e["loc"]))}: {e["msg"]}' for e in exc.errors())
        raise HTTPException(422, errors) from exc


@app.get('/api/public/{kind}')
async def public_list(kind: str, database=Depends(db)):
    if kind not in PUBLIC_KINDS:
        raise HTTPException(404, 'Resource not found.')
    rows = await database.all_rows(kind)
    return [row for row in rows if row.get('isActive')] if kind == 'announcements' else rows


@app.post('/api/public/prayers', status_code=201)
async def submit_prayer(payload: PrayerSubmission, request: Request, database=Depends(db)):
    rate_limit(request, 'submissions', 10)
    await database.insert('prayers', {**payload.model_dump(), 'id': str(uuid4()), 'status': 'new', 'submittedAt': datetime.now(timezone.utc).isoformat()})
    return {'ok': True}


@app.post('/api/public/inquiries', status_code=201)
async def submit_inquiry(payload: InquirySubmission, request: Request, database=Depends(db)):
    rate_limit(request, 'submissions', 10)
    await database.insert('inquiries', {**payload.model_dump(), 'id': str(uuid4()), 'status': 'new', 'submittedAt': datetime.now(timezone.utc).isoformat()})
    return {'ok': True}


@app.get('/api/admin/backup', dependencies=[Depends(require_admin)])
async def backup(database=Depends(db)):
    values = await asyncio.gather(*(database.all_rows(kind) for kind in MODELS))
    return {'exportDate': datetime.now(timezone.utc).isoformat(), **dict(zip(MODELS, values))}


@app.get('/api/admin/{kind}', dependencies=[Depends(require_admin)])
async def admin_list(kind: str, database=Depends(db)):
    check_kind(kind)
    return await database.all_rows(kind)


@app.post('/api/admin/{kind}', status_code=201, dependencies=[Depends(require_admin)])
async def create_record(kind: str, payload: dict = Body(...), database=Depends(db)):
    check_kind(kind)
    if kind not in PUBLIC_KINDS:
        raise HTTPException(405, 'Use the public submission endpoint to create requests.')
    return await database.insert(kind, validate(kind, payload))


@app.put('/api/admin/{kind}/{record_id}', dependencies=[Depends(require_admin)])
async def update_record(kind: str, record_id: str, payload: dict = Body(...), if_match: int = Header(..., ge=1), database=Depends(db)):
    check_kind(kind)
    check_id(record_id)
    data = validate(kind, payload)
    if data['id'] != record_id:
        raise HTTPException(422, 'Record ID does not match the URL.')
    if kind in {'prayers', 'inquiries'}:
        current = await database.rows(kind, id=f'eq.{record_id}', limit=1)
        if not current:
            raise HTTPException(404, 'Record not found.')
        # Admins may track care, not rewrite a visitor's original submission.
        original = database.unpack(current[0])
        fields = ('status', 'pastoralNotes', 'assignedTo') if kind == 'inquiries' else ('status', 'pastoralNotes')
        data = {**original, **{key: data[key] for key in fields}}
    return await database.update(kind, record_id, data, if_match)


@app.delete('/api/admin/{kind}/{record_id}', status_code=204, dependencies=[Depends(require_admin)])
async def delete_record(kind: str, record_id: str, if_match: int = Header(..., ge=1), database=Depends(db)):
    check_kind(kind)
    check_id(record_id)
    await database.delete(kind, record_id, if_match)
    return Response(status_code=204)


# Build the Vite frontend first. One origin keeps secure cookies simple in production.
dist = Path(__file__).resolve().parents[2] / 'dist'
if dist.is_dir():
    app.mount('/assets', StaticFiles(directory=dist / 'assets'), name='assets')

    @app.get('/{path:path}', include_in_schema=False)
    async def frontend(path: str):
        if path == 'api' or path.startswith('api/'):
            raise HTTPException(404, 'Endpoint not found.')
        target = (dist / path).resolve()
        if target.is_relative_to(dist) and target.is_file():
            return FileResponse(target)
        return FileResponse(dist / 'index.html')

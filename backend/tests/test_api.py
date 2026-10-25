from copy import deepcopy
import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from backend.app.main import app, db, attempts
from backend.app.supabase import Supabase

HEADERS = {'X-Requested-With': 'rccg-web', 'Origin': 'http://localhost:3000'}
EVENT = {'id': 'test-event', 'title': 'Sunday worship', 'category': 'worship', 'categoryLabel': 'Worship', 'dateBadge': {'month': 'SUN', 'day': '18'}, 'dayOfWeek': 'Sunday', 'time': '10 AM', 'frequency': 'Weekly', 'location': 'Church', 'description': 'Join us'}
PRAYER = {'name': 'Test Guest', 'email': 'guest@example.com', 'category': 'Family', 'requestText': 'Please pray with us.', 'isConfidential': True}


class FakeDatabase:
    unpack = staticmethod(Supabase.unpack)

    def __init__(self):
        self.data = {kind: {} for kind in ('events', 'videos', 'ebooks', 'announcements', 'prayers', 'inquiries')}
        self.admin = True
        self.fail = False
        self.revoked = False

    async def request(self, method, path, **kwargs):
        if self.fail:
            raise HTTPException(503, 'Service unavailable')
        if path == '/auth/v1/token':
            if kwargs.get('json', {}).get('password') == 'wrong':
                raise HTTPException(401, 'Invalid credentials or expired session.')
            return {'access_token': 'valid', 'refresh_token': 'refresh', 'expires_in': 3600, 'user': {'id': 'admin-id', 'email': 'admin@example.com'}}
        if path == '/auth/v1/user' and method == 'PUT':
            return {'id': 'admin-id', 'email': 'admin@example.com'}
        if path == '/auth/v1/user':
            if kwargs.get('token') != 'valid':
                raise HTTPException(401, 'Expired session')
            return {'id': 'admin-id', 'email': 'admin@example.com'}
        if path == '/rest/v1/admin_users':
            return [{'user_id': 'admin-id'}] if self.admin else []
        if path == '/auth/v1/logout':
            self.revoked = True
            return None
        raise AssertionError(path)

    async def all_rows(self, kind):
        if self.fail:
            raise HTTPException(503, 'Service unavailable')
        return deepcopy(list(self.data[kind].values()))

    async def rows(self, kind, **params):
        value = self.data[kind].get(params.get('id', '')[3:])
        return [{'id': value['id'], 'data': value, 'revision': value['revision']}] if value else []

    async def insert(self, kind, data):
        if self.fail:
            raise HTTPException(503, 'Service unavailable')
        if data['id'] in self.data[kind]:
            raise HTTPException(409, 'Duplicate')
        self.data[kind][data['id']] = {**deepcopy(data), 'revision': 1}
        return self.data[kind][data['id']]

    async def update(self, kind, record_id, data, revision):
        old = self.data[kind].get(record_id)
        if not old or old['revision'] != revision:
            raise HTTPException(409, 'Conflict')
        self.data[kind][record_id] = {**deepcopy(data), 'revision': revision + 1}
        return self.data[kind][record_id]

    async def delete(self, kind, record_id, revision):
        if self.data[kind].get(record_id, {}).get('revision') != revision:
            raise HTTPException(409, 'Conflict')
        del self.data[kind][record_id]


@pytest.fixture
def client():
    database = FakeDatabase()
    app.dependency_overrides[db] = lambda: database
    attempts.clear()
    with TestClient(app, headers=HEADERS) as c:
        c.database = database
        yield c
    app.dependency_overrides.clear()


def login(client):
    return client.post('/api/auth/login', json={'email': 'admin@example.com', 'password': 'correct'})


def test_health_and_no_private_public_routes(client):
    assert client.get('/api/health').status_code == 200
    for kind in ('prayers', 'inquiries', 'admin_users'):
        assert client.get('/api/public/' + kind).status_code == 404


@pytest.mark.parametrize('kind', ['events', 'prayers', 'inquiries', 'backup'])
def test_private_routes_require_session(client, kind):
    assert client.get('/api/admin/' + kind).status_code == 401
    assert client.post('/api/admin/events', json=EVENT).status_code == 401


def test_login_cookies_refresh_and_logout(client):
    result = login(client)
    assert result.status_code == 200
    assert 'access_token' not in result.text
    assert all('HttpOnly' in cookie and 'SameSite=lax' in cookie and 'Path=/api' in cookie for cookie in result.headers.get_list('set-cookie'))
    assert client.get('/api/auth/me').json()['email'] == 'admin@example.com'
    assert client.post('/api/auth/refresh').status_code == 200
    assert client.post('/api/auth/logout').status_code == 200
    assert client.database.revoked
    assert client.get('/api/auth/me').status_code == 401


def test_non_admin_cannot_login_or_use_existing_session(client):
    client.database.admin = False
    assert login(client).status_code == 403
    assert not client.cookies
    client.cookies.set('rccg_access', 'valid')
    assert client.get('/api/admin/prayers').status_code == 403


def test_wrong_password_does_not_set_cookies(client):
    assert client.post('/api/auth/login', json={'email': 'admin@example.com', 'password': 'wrong'}).status_code == 401
    assert not client.cookies


def test_csrf_and_body_limit(client):
    assert client.post('/api/public/prayers', headers={'Origin': 'https://evil.example'}, json=PRAYER).status_code == 403
    assert client.post('/api/public/prayers', headers={'X-Requested-With': ''}, json=PRAYER).status_code == 403
    assert client.post(
        '/api/public/prayers',
        headers={'Origin': 'http://testserver'},
        json=PRAYER,
    ).status_code == 201
    assert client.post(
        '/api/public/prayers',
        headers={
            'Host': 'backend.internal',
            'Origin': 'https://preview.example',
            'X-Forwarded-Host': 'preview.example',
        },
        json=PRAYER,
    ).status_code == 201
    assert client.post('/api/public/prayers', content='x' * 512001).status_code == 413


def test_private_submission_and_status_update(client):
    result = client.post('/api/public/prayers', json=PRAYER)
    assert result.status_code == 201 and result.json() == {'ok': True}
    assert 'requestText' not in result.text
    login(client)
    records = client.get('/api/admin/prayers').json()
    assert len(records) == 1 and records[0]['status'] == 'new'
    record = records[0]
    changed = {**record, 'status': 'interceding', 'pastoralNotes': 'Called guest', 'requestText': 'Tampered'}
    result = client.put('/api/admin/prayers/' + record['id'], headers={'If-Match': '1'}, json=changed)
    assert result.status_code == 200
    assert result.json()['requestText'] == PRAYER['requestText']
    assert result.json()['pastoralNotes'] == 'Called guest'
    assert result.headers['cache-control'] == 'no-store'


def test_submission_rejects_privileged_fields_and_invalid_data(client):
    assert client.post('/api/public/prayers', json={**PRAYER, 'status': 'answered'}).status_code == 422
    assert client.post('/api/public/prayers', json={**PRAYER, 'requestText': ' '}).status_code == 422
    assert client.post('/api/public/prayers', json={**PRAYER, 'email': 'bad'}).status_code == 422
    assert not client.database.data['prayers']


def test_inquiry_and_rsvp(client):
    data = {'fullName': 'Guest', 'email': 'guest@example.com', 'inquiryType': 'Event RSVP', 'message': 'RSVP for Sunday, 2 guests'}
    assert client.post('/api/public/inquiries', json=data).status_code == 201
    login(client)
    record = client.get('/api/admin/inquiries').json()[0]
    result = client.put('/api/admin/inquiries/' + record['id'], headers={'If-Match': '1'}, json={**record, 'status': 'contacted', 'assignedTo': 'Welcome team', 'pastoralNotes': 'Confirmed'})
    assert result.status_code == 200
    assert result.json()['assignedTo'] == 'Welcome team'


def test_event_crud_conflicts_and_backup(client):
    login(client)
    created = client.post('/api/admin/events', json=EVENT)
    assert created.status_code == 201
    event = created.json()
    assert client.get('/api/public/events').json() == [event]
    assert client.post('/api/admin/events', json=EVENT).status_code == 409
    updated = client.put('/api/admin/events/test-event', headers={'If-Match': '1'}, json={**event, 'title': 'Changed'})
    assert updated.status_code == 200 and updated.json()['revision'] == 2
    assert client.put('/api/admin/events/test-event', headers={'If-Match': '1'}, json=event).status_code == 409
    assert client.delete('/api/admin/events/test-event', headers={'If-Match': '1'}).status_code == 409
    assert client.get('/api/admin/backup').json()['events'][0]['title'] == 'Changed'
    assert client.delete('/api/admin/events/test-event', headers={'If-Match': '2'}).status_code == 204
    assert client.get('/api/public/events').json() == []


def test_announcement_visibility_and_url_validation(client):
    login(client)
    data = {'id': 'main', 'isActive': False, 'message': 'Welcome', 'type': 'notice'}
    assert client.post('/api/admin/announcements', json={**data, 'actionUrl': 'javascript:alert(1)'}).status_code == 422
    assert client.post('/api/admin/announcements', json=data).status_code == 201
    assert client.get('/api/public/announcements').json() == []
    assert client.put('/api/admin/announcements/main', headers={'If-Match': '1'}, json={**data, 'isActive': True}).status_code == 200
    assert len(client.get('/api/public/announcements').json()) == 1


def test_rate_limits_and_upstream_failure(client):
    for _ in range(10):
        assert client.post('/api/public/prayers', json=PRAYER).status_code == 201
    assert client.post('/api/public/prayers', json=PRAYER).status_code == 429
    client.database.fail = True
    assert login(client).status_code == 503


def test_logout_clears_cookies_even_when_upstream_fails(client):
    login(client)
    client.database.fail = True
    assert client.post('/api/auth/logout').status_code == 503
    assert not client.cookies


def test_password_change_requires_current_password_and_minimum_length(client):
    assert client.post('/api/auth/password', json={'currentPassword': 'correct', 'newPassword': 'new-test-password'}).status_code == 401
    login(client)
    assert client.post('/api/auth/password', json={'currentPassword': 'wrong', 'newPassword': 'new-test-password'}).status_code == 400
    assert client.post('/api/auth/password', json={'currentPassword': 'correct', 'newPassword': 'short'}).status_code == 422
    assert client.post('/api/auth/password', json={'currentPassword': 'correct', 'newPassword': 'new-test-password'}).status_code == 200


def test_newsletter_signup_is_saved_as_a_private_inquiry(client):
    payload = {'fullName': 'Newsletter subscriber', 'email': 'guest@example.com', 'inquiryType': 'Newsletter Subscription', 'message': 'Please send church updates.'}
    assert client.post('/api/public/inquiries', json=payload).status_code == 201
    assert client.get('/api/public/inquiries').status_code == 404

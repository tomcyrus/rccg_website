import httpx
from fastapi import HTTPException
from .config import settings


class Supabase:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=15)

    async def close(self):
        await self.client.aclose()

    async def request(self, method, path, *, token=None, auth=False, **kwargs):
        if not settings.configured:
            raise HTTPException(503, 'Supabase is not configured. Follow README.md to set up backend/.env.')
        key = settings.supabase_publishable_key if auth else settings.supabase_secret_key
        headers = {'apikey': key}
        # New Supabase secret keys are API keys, not JWT bearer tokens.
        if token:
            headers['Authorization'] = f'Bearer {token}'
        elif key.count('.') == 2:
            headers['Authorization'] = f'Bearer {key}'
        headers.update(kwargs.pop('headers', {}))
        try:
            response = await self.client.request(method, settings.supabase_url.rstrip('/') + path, headers=headers, **kwargs)
        except httpx.RequestError as exc:
            raise HTTPException(503, 'Unable to reach Supabase. Please try again.') from exc
        if response.is_error:
            if auth and response.status_code in (400, 401, 403, 422):
                raise HTTPException(401, 'Invalid credentials or expired session.')
            if response.status_code == 429:
                raise HTTPException(429, 'Too many attempts. Please try again later.')
            if response.status_code == 409:
                raise HTTPException(409, 'This record already exists. Refresh and try again.')
            raise HTTPException(502, 'Supabase could not complete this request. Check the project configuration and migration.')
        return response.json() if response.content else None

    async def rows(self, kind, **params):
        return await self.request('GET', '/rest/v1/church_records', params={'kind': f'eq.{kind}', 'select': 'id,data,revision', **params})

    async def all_rows(self, kind):
        # Supabase caps each response; page until exhausted for full lists and exports.
        result = []
        offset = 0
        while True:
            page = await self.rows(kind, order='created_at.desc,id.asc', limit=500, offset=offset)
            result.extend(page)
            if not page:
                return [self.unpack(row) for row in result]
            offset += len(page)

    @staticmethod
    def unpack(row):
        return {**row['data'], 'id': row['id'], 'revision': row['revision']}

    async def insert(self, kind, data):
        payload = {k: v for k, v in data.items() if k not in ('id', 'revision')}
        rows = await self.request('POST', '/rest/v1/church_records', json={'kind': kind, 'id': data['id'], 'data': payload}, headers={'Prefer': 'return=representation'})
        return self.unpack(rows[0])

    async def update(self, kind, record_id, data, revision):
        payload = {k: v for k, v in data.items() if k not in ('id', 'revision')}
        rows = await self.request('PATCH', '/rest/v1/church_records', params={'kind': f'eq.{kind}', 'id': f'eq.{record_id}', 'revision': f'eq.{revision}'}, json={'data': payload, 'revision': revision + 1}, headers={'Prefer': 'return=representation'})
        if not rows:
            raise HTTPException(409, 'This record changed or was deleted. Reload data before editing again.')
        return self.unpack(rows[0])

    async def delete(self, kind, record_id, revision):
        rows = await self.request('DELETE', '/rest/v1/church_records', params={'kind': f'eq.{kind}', 'id': f'eq.{record_id}', 'revision': f'eq.{revision}'}, headers={'Prefer': 'return=representation'})
        if not rows:
            raise HTTPException(409, 'This record changed or was deleted. Reload data before deleting again.')

import asyncio
import httpx
import pytest
from fastapi import HTTPException
from backend.app.config import settings
from backend.app.supabase import Supabase


@pytest.fixture(autouse=True)
def config(monkeypatch):
    monkeypatch.setattr(settings, 'supabase_url', 'https://example.supabase.co')
    monkeypatch.setattr(settings, 'supabase_publishable_key', 'sb_publishable_test')
    monkeypatch.setattr(settings, 'supabase_secret_key', 'sb_secret_test')


def run(handler, operation):
    async def scenario():
        database = Supabase()
        await database.client.aclose()
        database.client = httpx.AsyncClient(transport=httpx.MockTransport(handler))
        try:
            return await operation(database)
        finally:
            await database.close()
    return asyncio.run(scenario())


def test_keys_not_used_as_jwt_and_verified_user_token():
    def handler(request):
        assert request.headers['apikey'] == 'sb_publishable_test'
        assert request.headers['authorization'] == 'Bearer user-token'
        return httpx.Response(200, json={'id': 'user-id'})
    result = run(handler, lambda d: d.request('GET', '/auth/v1/user', token='user-token', auth=True))
    assert result['id'] == 'user-id'


def test_pagination_handles_server_cap():
    def handler(request):
        assert request.headers['apikey'] == 'sb_secret_test'
        assert 'authorization' not in request.headers
        offset = int(request.url.params['offset'])
        rows = [{'id': str(i), 'data': {'title': str(i)}, 'revision': 1} for i in range(3)]
        return httpx.Response(200, json=rows[offset:offset + 1])
    assert len(run(handler, lambda d: d.all_rows('events'))) == 3


def test_update_compare_and_swap():
    def handler(request):
        assert request.method == 'PATCH'
        assert request.url.params['revision'] == 'eq.3'
        assert request.url.params['id'] == 'eq.test'
        assert request.headers['prefer'] == 'return=representation'
        return httpx.Response(200, json=[])
    with pytest.raises(HTTPException) as exc:
        run(handler, lambda d: d.update('events', 'test', {'title': 'Title'}, 3))
    assert exc.value.status_code == 409


def test_upstream_errors_do_not_leak_details():
    with pytest.raises(HTTPException) as exc:
        run(lambda req: httpx.Response(500, json={'message': 'private SQL details'}), lambda d: d.all_rows('events'))
    assert exc.value.status_code == 502
    assert 'private SQL' not in exc.value.detail


def test_missing_configuration_is_actionable(monkeypatch):
    monkeypatch.setattr(settings, 'supabase_secret_key', '')
    with pytest.raises(HTTPException) as exc:
        run(lambda req: pytest.fail('Should not call network'), lambda d: d.all_rows('events'))
    assert exc.value.status_code == 503

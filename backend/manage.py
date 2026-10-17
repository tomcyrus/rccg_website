"""One-time project setup. Requires owner-supplied credentials in ignored env files."""
import argparse
import asyncio
import json
import secrets
from pathlib import Path
from dotenv import dotenv_values
from app.supabase import Supabase

ROOT = Path(__file__).resolve().parent


def migrate():
    import psycopg
    config = dotenv_values(ROOT / '.env.database')
    mapping = {'PGHOST': 'host', 'PGPORT': 'port', 'PGUSER': 'user', 'PGDATABASE': 'dbname', 'PGPASSWORD': 'password', 'PGSSLMODE': 'sslmode'}
    kwargs = {target: config[source] for source, target in mapping.items() if config.get(source)}
    with psycopg.connect(**kwargs, connect_timeout=15, autocommit=True) as conn:
        with conn.cursor() as cur:
            cur.execute("select to_regclass('public.admin_users'), to_regclass('public.church_records')")
            tables = cur.fetchone()
            if all(tables):
                print('Church tables already exist; migration skipped.')
                return
            if any(tables):
                raise RuntimeError('Partial schema exists. Inspect it before applying the migration.')
            cur.execute((ROOT.parent / 'supabase/migrations/001_church_backend.sql').read_text())
            print('Church schema applied successfully.')


async def admin(email):
    database = Supabase()
    try:
        page = 1
        user = None
        while True:
            result = await database.request('GET', '/auth/v1/admin/users', params={'page': page, 'per_page': 100})
            users = result.get('users', [])
            user = next((item for item in users if item.get('email', '').lower() == email.lower()), None)
            if user or len(users) < 100:
                break
            page += 1
        if user is None:
            password = secrets.token_urlsafe(24)
            user = await database.request('POST', '/auth/v1/admin/users', json={'email': email, 'password': password, 'email_confirm': True})
            credentials = ROOT / '.env.admin-bootstrap'
            credentials.write_text(f'ADMIN_EMAIL={email}\nADMIN_INITIAL_PASSWORD={password}\nADMIN_USER_ID={user["id"]}\n')
            credentials.chmod(0o600)
            print('Created Auth account. Initial password saved only to backend/.env.admin-bootstrap.')
        else:
            print('Auth account already exists; password was not changed.')
        await database.request('POST', '/rest/v1/admin_users', json={'user_id': user['id']}, headers={'Prefer': 'resolution=ignore-duplicates'})
        print('Administrator membership granted.')
    finally:
        await database.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['migrate', 'admin'])
    parser.add_argument('--email')
    args = parser.parse_args()
    if args.action == 'migrate':
        migrate()
    elif args.email:
        asyncio.run(admin(args.email))
    else:
        parser.error('--email is required for admin setup')

# RCCG Kingdom First Assembly

React/Vite church website with a FastAPI backend, Supabase Postgres persistence, and Supabase Auth for approved administrators. Existing visual design is preserved.

## Features

- Admin email/password sign-in, HTTP-only session cookies, refresh, logout, and server-side membership checks on every admin request.
- Create, edit, delete, and feature public events, YouTube videos, and e-books; publish/mute the announcement banner.
- Public calendar, homepage sermons, video gallery, and e-book previews load persisted content.
- Prayer requests, visitor inquiries, event RSVPs, and newsletter signup requests are saved before success is shown. Private records are visible only to approved admins, including requests marked non-confidential.
- Pastoral status/notes and visitor assignment/follow-up; private JSON export from current server records.
- Per-record revision checks reject stale edits/deletes with HTTP 409. Reload data before retrying a conflicting edit.
- Failed saves preserve editor/form values. No browser PINs, fake login, local pastoral storage, or destructive factory-reset button.

## Local setup

Requirements: Python 3.11+ and Node 22.12+ (Node 22 LTS recommended). The repository includes `.nvmrc`.

```sh
npm ci
python3 -m venv .venv
.venv/bin/pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
```

The backend reads `backend/.env` regardless of the working directory. All `.env` files are ignored by Git. Do not put Supabase secret/service-role keys in `VITE_*` variables or frontend source code.

## Create and configure Supabase

1. Create a project at https://supabase.com/dashboard. Save its database password securely.
2. In the project's SQL Editor, run `supabase/migrations/001_church_backend.sql` **once** against the new project. It creates `admin_users` and `church_records`, enables RLS, and denies direct browser access to both tables. FastAPI is the data gateway.
3. Copy the Project URL and API keys from the project settings into `backend/.env`:

   ```dotenv
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   SUPABASE_SECRET_KEY=your-secret-key
   ALLOWED_ORIGINS=["http://localhost:3000","http://127.0.0.1:3000"]
   COOKIE_SECURE=false
   ```

   Legacy `anon` and `service_role` keys are also supported in the corresponding publishable/secret variables. Keys stay on the backend; the frontend needs no Supabase credentials.
4. Under **Authentication → Users**, create the first admin email/password account and confirm its email. Disable public signup if this project is only for church admins. Do not share one admin account among staff.
5. Copy the user's UUID and run this in the SQL Editor, replacing the placeholder:

   ```sql
   insert into public.admin_users (user_id)
   values ('REPLACE_WITH_AUTH_USER_UUID'::uuid);
   ```

   A Supabase Auth account alone does **not** grant admin access. Add each approved staff account to this table. To revoke access immediately on the next request:

   ```sql
   delete from public.admin_users
   where user_id = 'REPLACE_WITH_AUTH_USER_UUID'::uuid;
   ```

   Admins can change their password under Backup & Settings after signing in. Password recovery is managed by the project owner through Supabase Auth; the site does not provide a public registration or password-reset flow.
6. Optional: import the repository's original **public example content**:

   ```sh
   npm run seed:export
   .venv/bin/python backend/seed.py
   ```

   Review example sermon links, authors, dates, service times, and e-book text before publishing. The seed skips existing IDs and never imports the old demo prayer/visitor records. Skip this step to start with an empty site and add real content in the admin console.

## Run

In one terminal:

```sh
.venv/bin/uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

In another:

```sh
npm run dev
```

- Website: http://localhost:3000
- Admin console: http://localhost:3000/#admin
- API documentation: http://127.0.0.1:8000/docs
- Configuration health: http://127.0.0.1:8000/api/health

Vite proxies `/api` to FastAPI, so the browser uses one origin. Leave `VITE_API_BASE_URL` unset for this setup. Without Supabase configuration, health remains available and data/auth endpoints return an actionable 503; there is no silent local/demo fallback. `supabase_configured` checks presence of settings, not remote connectivity.

## Production

The supported deployment serves the Vite frontend and FastAPI from the same HTTPS origin. The checked-in `vercel.json` defines two [Vercel Services](https://vercel.com/docs/services): Vite handles the site and FastAPI handles `/api/*` with the original request path preserved.

In each Vercel project connected to this repository, add these environment variables for **Preview** and **Production**:

```text
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-key
COOKIE_SECURE=true
```

Leave `VITE_API_BASE_URL` unset so the browser calls the same-origin `/api`. Vercel supplies HTTPS and sets `VERCEL`, which also enables secure cookies automatically; `COOKIE_SECURE=true` makes the intent explicit. Dynamic preview domains are accepted only when the request `Origin` matches its `Host`. Add `ALLOWED_ORIGINS` only for a separate trusted browser origin.

For a non-Vercel host, build the frontend before starting FastAPI:

```sh
npm ci
npm run build
.venv/bin/uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --workers 1
```

FastAPI serves `dist/` plus `/api` in that setup. Put it behind an HTTPS reverse proxy, set `COOKIE_SECURE=true`, and set `ALLOWED_ORIGINS` to any additional exact browser origin (for example `["https://church.example.org"]`). Never use wildcard origins with credentials. Cookies use `HttpOnly`, `SameSite=Lax`, and `/api` scope. Mutating browser requests require the custom request header and either the same origin or an explicitly allowed Origin. Sign-out clears local cookies and revokes the Supabase refresh session; already-issued access tokens follow Supabase's expiry behavior.

The included rate limiter is per-process (10 public submissions and 10 login attempts per IP per 10 minutes). It bounds memory and is suitable for local/small single-process use. For multiple workers/instances, use shared Redis or an ingress rate limiter. Configure trusted proxy IP forwarding at deployment; do not trust arbitrary client-supplied forwarding headers. Public forms do not send email notifications or newsletter campaigns; staff review the admin inbox, including newsletter signup requests.

E-books store structured text and generate text study-guide downloads, as in the original site. There is no PDF/media upload or payment processing. Gallery and general church information remain static assets/content. JSON export contains personal pastoral data and should be handled privately; database-level backups/restores are managed in Supabase.

## Verification

```sh
npm run lint
npm run build
.venv/bin/python -m pytest backend/tests -q
npm run test:e2e
```

Backend tests exercise authentication/authorization, private submissions, validation, CSRF, revision conflicts, public publishing, exports, pagination, rate limits, and upstream failures using a fake Supabase boundary. Browser tests run the built frontend (run `npm run build` first) with a controlled API fixture, never a live church database. For browser tests install Chromium with `npx playwright install chromium`, or set `PLAYWRIGHT_CHROME_EXECUTABLE` to an installed Chrome executable.

After configuring a real project, verify these end-to-end before launch:

1. Sign in with an approved admin; confirm an unapproved Auth account gets 403.
2. Create/edit/delete an event and video; confirm another browser sees the updates.
3. Create an e-book, read its chapter, and download its text study guide.
4. Submit a prayer, visitor inquiry, and RSVP from a signed-out browser; review them in the admin inbox.
5. Update pastoral notes/status, assign an inquiry, export records, then sign out. A signed-out `/api/admin/prayers` request must return 401.
6. Attempt direct Supabase REST reads of both tables with the publishable/anon key and an ordinary user's JWT; no private rows or writes should be accessible.

Official references: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security), [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/).


### Optional command-line project setup

To apply the migration using a direct or Session pooler PostgreSQL connection, install `psycopg[binary]` in the virtual environment and create an ignored, owner-readable `backend/.env.database` with `PGHOST`, `PGPORT`, `PGUSER`, `PGDATABASE`, `PGPASSWORD`, and `PGSSLMODE=require`. Use the exact connection details from Supabase → Connect. Then run:

```sh
.venv/bin/python backend/manage.py migrate
.venv/bin/python backend/manage.py admin --email YOUR_ADMIN_EMAIL
```

The admin command reuses existing Auth accounts without changing their passwords. For a new account it generates an initial password and writes it only to the ignored `backend/.env.admin-bootstrap` file. Sign in, change the password under Backup & Settings, and delete that bootstrap file. The setup command does not send an email. Do not commit or share these local environment files.

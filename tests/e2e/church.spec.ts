import { test, expect, Page } from '@playwright/test';

async function mockApi(page: Page) {
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  let signedIn = false;
  const records: Record<string, any[]> = { events: [], videos: [], ebooks: [], prayers: [], inquiries: [], announcements: [] };
  let failSubmission = false;
  await page.route('**/api/**', async route => {
    const req = route.request();
    const path = new URL(req.url()).pathname.replace('/api', '');
    const method = req.method();
    const payload = req.postDataJSON();
    const respond = (body: unknown, status = 200) => route.fulfill({ status, json: body });
    if (path === '/auth/login') {
      if (payload.password === 'wrong') return respond({ detail: 'Invalid credentials or expired session.' }, 401);
      signedIn = true; return respond({ id: 'admin', email: payload.email });
    }
    if (path === '/auth/logout') { signedIn = false; return respond({ ok: true }); }
    if (path.startsWith('/auth/')) return signedIn ? respond({ id: 'admin', email: 'admin@example.com' }) : respond({ detail: 'Please sign in to continue.' }, 401);
    const [, scope, kind, id] = path.split('/');
    if (scope === 'admin' && !signedIn) return respond({ detail: 'Please sign in.' }, 401);
    if (path === '/admin/backup') return respond(records);
    if (method === 'GET') return respond(kind === 'announcements' && scope === 'public' ? records[kind].filter(r => r.isActive) : records[kind] || []);
    if (scope === 'public') {
      if (failSubmission) return respond({ detail: 'The church records service is temporarily unavailable. Please try again.' }, 503);
      records[kind].push({ ...payload, id: crypto.randomUUID(), status: 'new', submittedAt: new Date().toISOString(), revision: 1 });
      return respond({ ok: true }, 201);
    }
    if (method === 'POST') { const item = { ...payload, revision: 1 }; records[kind].push(item); return respond(item, 201); }
    if (method === 'PUT') {
      const item = { ...payload, revision: (payload.revision || 1) + 1 };
      records[kind] = records[kind].map(r => r.id === id ? item : r); return respond(item);
    }
    if (method === 'DELETE') { records[kind] = records[kind].filter(r => r.id !== id); return route.fulfill({ status: 204 }); }
    return respond({ detail: 'Not found' }, 404);
  });
  return { records, fail: (value: boolean) => { failSubmission = value; } };
}

async function signIn(page: Page) {
  await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Admin email').fill('admin@example.com');
  await page.getByPlaceholder('Enter your password').fill('test-password');
  await page.getByRole('button', { name: 'Sign in to Admin Console' }).click();
  await expect(page.getByText('Church Activities Administration')).toBeVisible();
}

test('admin sign-in, event creation, public publishing, deletion and logout', async ({ page }) => {
  const { records } = await mockApi(page);
  await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Quick Sign In')).toHaveCount(0);
  await page.getByLabel('Admin email').fill('admin@example.com');
  await page.getByPlaceholder('Enter your password').fill('wrong');
  await page.getByRole('button', { name: 'Sign in to Admin Console' }).click();
  await expect(page.getByText('Invalid credentials or expired session.')).toBeVisible();
  await page.getByPlaceholder('Enter your password').fill('correct');
  await page.getByRole('button', { name: 'Sign in to Admin Console' }).click();
  await page.getByRole('button', { name: 'Create New Activity' }).click();
  await page.getByPlaceholder('e.g. Sunday Celebration Worship Service').fill('Community Thanksgiving');
  await page.getByPlaceholder('Details about what takes place during this activity...').fill('Everyone is welcome.');
  await page.getByRole('button', { name: 'Save Activity' }).click();
  await expect(page.getByText('Community Thanksgiving', { exact: true })).toBeVisible();
  expect(records.events).toHaveLength(1);
  await page.getByRole('button', { name: 'View Live Site' }).click();
  await expect(page.getByText('Community Thanksgiving', { exact: true }).first()).toBeVisible();
  await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  page.once('dialog', dialog => dialog.accept());
  await page.getByTitle('Delete Event').click();
  await expect(page.getByText('Community Thanksgiving', { exact: true })).toHaveCount(0);
  expect(records.events).toHaveLength(0);
  await page.getByRole('button', { name: 'Lock / Exit' }).click();
  await expect(page.getByRole('button', { name: 'Sign in to Admin Console' })).toBeVisible();
});

test('e-book editor persists chapter and survives refresh; logout gates admin', async ({ page }) => {
  const { records } = await mockApi(page);
  await signIn(page);
  await page.getByRole('button', { name: /E-Books & Manuals/ }).click();
  await page.getByRole('button', { name: 'Add e-book', exact: true }).click();
  const editor = page.getByRole('dialog', { name: 'E-book editor' });
  await editor.getByLabel('Title', { exact: true }).fill('Walking in Faith');
  await editor.getByLabel('Author', { exact: true }).fill('Church Team');
  await editor.getByLabel('Short description').fill('A guide for the church.');
  await editor.getByLabel('Chapter title').fill('Trusting God');
  await editor.getByLabel('Chapter text (one paragraph per line)').fill('Walk by faith.');
  await editor.getByRole('button', { name: 'Save e-book' }).click();
  await expect(page.getByText('Walking in Faith', { exact: true })).toBeVisible();
  expect(records.ebooks[0].sampleChapter.paragraphs).toEqual(['Walk by faith.']);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Church Activities Administration')).toBeVisible();
  await page.getByRole('button', { name: 'Lock / Exit' }).click();
  await expect(page.getByRole('button', { name: 'Sign in to Admin Console' })).toBeVisible();
});

test('prayer form keeps entered text on failure and saves privately on retry', async ({ page }) => {
  const fixture = await mockApi(page);
  fixture.fail(true);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('footer').getByRole('button', { name: 'Prayer Request', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Submit a Prayer Request' });
  await dialog.locator('input[type="text"]').fill('Test Guest');
  await dialog.locator('input[type="email"]').fill('guest@example.com');
  await dialog.locator('textarea').fill('Please pray for our family.');
  await dialog.getByRole('button', { name: /Submit|Send/i }).click();
  await expect(dialog.getByRole('alert')).toContainText('church records service is temporarily unavailable');
  await expect(dialog.locator('textarea')).toHaveValue('Please pray for our family.');
  expect(fixture.records.prayers).toHaveLength(0);
  fixture.fail(false);
  await dialog.getByRole('button', { name: /Submit|Send/i }).click();
  await expect(dialog.getByText('We Stand With You in Prayer')).toBeVisible();
  expect(fixture.records.prayers).toHaveLength(1);
  await dialog.getByRole('button', { name: 'Close & Return' }).click();
  await signIn(page);
  await page.getByRole('button', { name: /Prayer Pipeline/ }).click();
  await expect(page.getByText('Please pray for our family.', { exact: false })).toBeVisible();
});

test('mobile admin login fits viewport and no console runtime errors', async ({ page }) => {
  await mockApi(page);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await signIn(page);
  await expect(page.getByRole('button', { name: 'Reload data' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test('clean routes support direct loads and browser history without hashes', async ({ page }) => {
  await mockApi(page);
  await page.goto('/about', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.getByRole('button', { name: 'Sermons', exact: true }).click();
  await expect(page).toHaveURL(/\/sermons$/);
  expect(new URL(page.url()).hash).toBe('');

  await page.goBack();
  await expect(page).toHaveURL(/\/about$/);
});

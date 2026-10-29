import { test, expect } from '@playwright/test';

test('portfolio loads its assets and offers five clear project and contact routes', async ({ page }) => {
  const problems = [];
  page.on('pageerror', error => problems.push(error.message));
  page.on('response', response => { if (!response.ok()) problems.push(`${response.status()} ${response.url()}`); });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle(/Patrick Schaller/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Good software.Fewer headaches.');
  await expect(page.getByRole('link', { name: /Explore the repository/ })).toHaveCount(5);
  await expect(page.getByRole('link', { name: /patrick.r.schaller@gmail.com/ })).toHaveAttribute('href', 'mailto:patrick.r.schaller@gmail.com');
  await page.getByRole('link', { name: 'The work' }).click();
  await page.getByText('What’s worth a closer look?', { exact: true }).first().click();
  await expect(page.getByText('Transactions keep receipt lines together.', { exact: false })).toBeVisible();
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(item => item.complete && item.naturalWidth > 0)).toBe(true);
  }
  expect(problems).toEqual([]);
});

test('the small workflow interaction works with a keyboard and has a reduced-motion mode', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const button = page.getByRole('button', { name: /Untangle it/ });
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#workbench')).toHaveAttribute('data-tidy', 'true');
  await expect(page.locator('#bench-status')).toHaveText('A clearer route. Same moving parts.');
  expect(await page.locator('.flow-tidy').evaluate(item => getComputedStyle(item).transitionDuration)).toBe('0s');
  await page.getByRole('button', { name: /Show the tangle again/ }).click();
  await expect(page.locator('#workbench')).toHaveAttribute('data-tidy', 'false');
});

for (const width of [320, 390, 768, 1440]) {
  test(`layout remains usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('link', { name: /Say hello/ }).click();
    await expect(page.getByRole('heading', { name: 'Got a good problem?' })).toBeInViewport();
    await expect(page.getByRole('link', { name: /patrick.r.schaller@gmail.com/ })).toBeVisible();
  });
}

test('the introduction, projects and email work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5100/');
  await expect(page.getByRole('button', { name: /Untangle it/ })).toBeHidden();
  await expect(page.getByRole('link', { name: /Explore the repository/ })).toHaveCount(5);
  await page.getByRole('link', { name: /Say hello/ }).click();
  await expect(page.getByRole('link', { name: /patrick.r.schaller@gmail.com/ })).toHaveAttribute('href', 'mailto:patrick.r.schaller@gmail.com');
  await context.close();
});

test('API evidence links to a self-hosted read-only contract explorer', async ({ page }) => {
  const problems = [];
  const external = [];
  page.on('pageerror', error => problems.push(error.message));
  page.on('console', message => { if (message.type() === 'error') problems.push(message.text()); });
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:5100/') && !request.url().startsWith('data:')) external.push(request.url()); });
  await page.goto('/');
  await page.getByRole('link', { name: /APIs & business apps/ }).click();
  await expect(page).toHaveURL(/#api$/);
  await page.getByText('See the actual conflict response', { exact: true }).click();
  await expect(page.locator('.api-proof pre')).toContainText('"status": 409');
  await page.getByRole('link', { name: /Inspect the API/ }).click();
  await expect(page.getByRole('heading', { name: 'A contract you can inspect.' })).toBeVisible();
  await expect(page.locator('.opblock')).toHaveCount(5);
  const receipt = page.locator('#operations-Receiving-ReceiveStock');
  await receipt.locator('.opblock-summary-control').click();
  await expect(receipt).toContainText('X-Inventory-Client');
  await expect(receipt).toContainText('409');
  await expect(page.getByRole('button', { name: 'Try it out' })).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const contract = await page.request.get('/api/inventory/openapi.json');
  expect(contract.headers()['content-type']).toContain('application/json');
  expect(Object.keys((await contract.json()).paths)).toHaveLength(5);
  expect(problems).toEqual([]);
  expect(external).toEqual([]);
});

import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5100/');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: fileURLToPath(new URL('../docs/desktop.png', import.meta.url)) });
  await page.evaluate(() => document.querySelector('.project-inventory').scrollIntoView());
  await page.screenshot({ path: fileURLToPath(new URL('../docs/projects.png', import.meta.url)) });
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: fileURLToPath(new URL('../docs/mobile.png', import.meta.url)) });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:5100/api/inventory/');
  await page.locator('#operations-Receiving-ReceiveStock .opblock-summary-control').waitFor();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: fileURLToPath(new URL('../docs/api-reference.png', import.meta.url)) });
} finally { await browser.close(); }

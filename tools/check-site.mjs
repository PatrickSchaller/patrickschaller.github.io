import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../site/', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'HTML IDs must be unique');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Keep one descriptive main heading');
for (const document of ['index.html', 'api/inventory/index.html']) {
const content = await readFile(path.join(root, document), 'utf8');
for (const [, attribute, url] of content.matchAll(/\b(href|src)="([^"]+)"/g)) {
  const localIds = [...content.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (url.startsWith('#')) { assert(localIds.includes(url.slice(1)), `Missing anchor ${url}`); continue; }
  if (url.startsWith('https:') || url.startsWith('mailto:')) continue;
  assert(!url.includes(':'), `Unexpected URL protocol: ${url}`);
  const resolved = path.resolve(root, path.dirname(document), url.endsWith('/') ? url + 'index.html' : url);
  assert(resolved.startsWith(root), `Asset outside site: ${url}`);
  assert((await stat(resolved)).isFile(), `Missing ${attribute}: ${url}`);
}
}
for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
  assert(/\balt="[^"]+"/.test(tag[0]), 'Project images need meaningful alt text');
  const source = tag[0].match(/src="([^"]+)"/)[1];
  const image = await readFile(path.join(root, source));
  const width = Number(tag[0].match(/\bwidth="(\d+)"/)[1]);
  const height = Number(tag[0].match(/\bheight="(\d+)"/)[1]);
  assert.equal(width, image.readUInt32BE(16), `Incorrect width for ${source}`);
  assert.equal(height, image.readUInt32BE(20), `Incorrect height for ${source}`);
}
assert(html.includes('mailto:patrick.r.schaller@gmail.com'), 'Keep the requested contact route');
assert(!/https?:\/\/(?:localhost|127\.0\.0\.1)/i.test(html), 'Do not publish local demo links');
const contract = JSON.parse(await readFile(path.join(root, 'api/inventory/openapi.json'), 'utf8'));
assert.equal(Object.keys(contract.paths).length, 5, 'The API reference must include all five routes');
assert.equal(contract.paths['/api/receipts'].post.operationId, 'ReceiveStock');
const responses = JSON.parse(await readFile(path.join(root, 'api/inventory/responses.json'), 'utf8'));
assert.equal(responses.requests.length, 12, 'Publish the complete recorded walkthrough');
const conflict = responses.requests.find(request => request.status === 409);
assert(html.includes(conflict.response.detail), 'The portfolio example must match the recorded API response');
process.stdout.write('Static links, anchors, image dimensions, contact route and API evidence verified.\n');

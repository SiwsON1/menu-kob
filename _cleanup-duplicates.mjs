import { google } from 'googleapis';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
const TOKEN_PATH = join(__dirname, 'token.json');

function getAuth() {
  const creds = JSON.parse(readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id } = creds.installed;
  const auth = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080/oauth2callback');
  auth.setCredentials(JSON.parse(readFileSync(TOKEN_PATH)));
  return auth;
}

async function findFolder(drive, name, parentId = null) {
  const q = [`name='${name}'`, `mimeType='application/vnd.google-apps.folder'`, parentId ? `'${parentId}' in parents` : null, 'trashed=false'].filter(Boolean).join(' and ');
  const list = await drive.files.list({ q, fields: 'files(id,name)' });
  return list.data.files[0]?.id;
}

const auth = getAuth();
const drive = google.drive({ version: 'v3', auth });
const rootId = await findFolder(drive, 'Kobi Meble');
const blogV2Id = await findFolder(drive, 'Blog 2026-06 v2 humanized', rootId);

const all = await drive.files.list({
  q: `'${blogV2Id}' in parents and trashed=false`,
  fields: 'files(id,name,createdTime)',
  orderBy: 'createdTime',
  pageSize: 100,
});

// Group by name, keep only newest
const byName = {};
for (const f of all.data.files) {
  if (!byName[f.name]) byName[f.name] = [];
  byName[f.name].push(f);
}

let deleted = 0;
for (const [name, files] of Object.entries(byName)) {
  if (files.length === 1) continue;
  files.sort((a, b) => a.createdTime.localeCompare(b.createdTime));
  const toDelete = files.slice(0, -1); // wszystkie poza najnowszym
  for (const f of toDelete) {
    await drive.files.delete({ fileId: f.id });
    console.log(`  DEL ${f.name} (created ${f.createdTime})`);
    deleted++;
  }
}
console.log(`\nUsunięto ${deleted} duplikatów. Pozostało: 6 najnowszych plików.`);

import { google } from 'googleapis';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
const TOKEN_PATH = join(__dirname, 'token.json');
const DOCS_DIR = join(__dirname, 'docs');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const date = new Date().toISOString().slice(0, 10);

// Lista 6 slugów blog do uploadu (musi się zgadzać z teksty/blog/2026-06/*.md)
const BLOG_SLUGS = [
  'lozko-dzieciece-z-barierka-bezpieczenstwo-do-jakiego-wieku',
  'wysokosc-biurka-dla-dziecka-tabela-cm-wzrost',
  'lozko-pietrowe-w-malym-pokoju-dzieciecym-jak-rozplanowac',
  'lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy',
  'pokoj-dziewczynki-meble-kolor-pelen-przewodnik',
  'materac-kokos-do-lozka-dzieciecego-opinie-kiedy-warto',
];

function getAuth() {
  const creds = JSON.parse(readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id } = creds.installed;
  const auth = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080/oauth2callback');
  if (!existsSync(TOKEN_PATH)) {
    console.error('Brak token.json - uruchom najpierw upload-to-drive.mjs zeby zalogowac.');
    process.exit(1);
  }
  auth.setCredentials(JSON.parse(readFileSync(TOKEN_PATH)));
  return auth;
}

async function findOrCreateFolder(drive, name, parentId = null) {
  // Szukaj istniejacego
  const q = [
    `name='${name}'`,
    `mimeType='application/vnd.google-apps.folder'`,
    parentId ? `'${parentId}' in parents` : null,
    'trashed=false',
  ].filter(Boolean).join(' and ');
  const list = await drive.files.list({ q, fields: 'files(id,name)', spaces: 'drive' });
  if (list.data.files && list.data.files.length > 0) return list.data.files[0].id;
  // Utworz nowy
  const meta = { name, mimeType: 'application/vnd.google-apps.folder', ...(parentId ? { parents: [parentId] } : {}) };
  const res = await drive.files.create({ requestBody: meta, fields: 'id' });
  return res.data.id;
}

async function uploadFile(drive, filePath, fileName, folderId) {
  const content = readFileSync(filePath);
  const res = await drive.files.create({
    requestBody: { name: fileName, parents: [folderId] },
    media: {
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      body: Readable.from(content),
    },
    fields: 'id,name,webViewLink',
  });
  return res.data;
}

async function main() {
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });

  console.log('Szukam/tworze folder "Kobi Meble"...');
  const rootId = await findOrCreateFolder(drive, 'Kobi Meble');
  console.log('Szukam/tworze podfolder "Blog 2026-06"...');
  const blogId = await findOrCreateFolder(drive, 'Blog 2026-06', rootId);
  console.log('OK\n');

  for (const slug of BLOG_SLUGS) {
    const docxPath = join(DOCS_DIR, slug + '.docx');
    if (!existsSync(docxPath)) {
      console.log('  [SKIP] brak pliku: ' + slug + '.docx');
      continue;
    }
    const nameWithDate = slug + '_' + date + '.docx';
    const result = await uploadFile(drive, docxPath, nameWithDate, blogId);
    console.log('  + ' + result.name);
  }
  console.log('\nGotowe! Sprawdz Google Drive -> Kobi Meble -> Blog 2026-06');
}

main().catch(e => { console.error(e); process.exit(1); });

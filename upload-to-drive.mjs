import { google } from 'googleapis';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
const TOKEN_PATH = join(__dirname, 'token.json');
const DOCS_DIR = join(__dirname, 'docs');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const date = new Date().toISOString().slice(0, 10); // 2026-04-12

function getAuth() {
  const creds = JSON.parse(readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = creds.installed;
  return new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080/oauth2callback');
}

async function getToken(auth) {
  if (existsSync(TOKEN_PATH)) {
    auth.setCredentials(JSON.parse(readFileSync(TOKEN_PATH)));
    return;
  }

  const authUrl = auth.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
  console.log('\n=== URL DO AUTORYZACJI ===');
  console.log(authUrl);
  console.log('=========================\n');
  exec(`start "" "${authUrl}"`);

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost:3000');
      const code = url.searchParams.get('code');
      if (code) {
        res.end('<h2>Autoryzacja zakonczona! Mozesz zamknac ta karte.</h2>');
        server.close();
        resolve(code);
      }
    });
    server.listen(8080);
    server.on('error', reject);
  });

  const { tokens } = await auth.getToken(code);
  auth.setCredentials(tokens);
  writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log('Token zapisany.\n');
}

async function createFolder(drive, name, parentId = null) {
  const meta = {
    name,
    mimeType: 'application/vnd.google-apps.folder',
    ...(parentId ? { parents: [parentId] } : {}),
  };
  const res = await drive.files.create({ requestBody: meta, fields: 'id,name' });
  return res.data.id;
}

async function uploadFile(drive, filePath, fileName, folderId) {
  const { Readable } = await import('stream');
  const content = readFileSync(filePath);
  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      body: Readable.from(content),
    },
    fields: 'id,name',
  });
  return res.data;
}

async function main() {
  const auth = getAuth();
  await getToken(auth);
  const drive = google.drive({ version: 'v3', auth });

  console.log('Tworzenie folderu "Kobi Meble" na Google Drive...');
  const rootFolderId = await createFolder(drive, 'Kobi Meble');

  const subFolders = {
    produkty: await createFolder(drive, 'Produkty', rootFolderId),
    kategorie: await createFolder(drive, 'Kategorie', rootFolderId),
  };
  console.log('Foldery utworzone.\n');

  const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.docx'));

  for (const file of files) {
    const isKategoria = file.includes('biurka') || file.includes('lozka-dzieciece') ||
      file.includes('meble-ogrodowe') || file.includes('polkotapczany');
    const folder = isKategoria ? subFolders.kategorie : subFolders.produkty;
    const nameWithDate = file.replace('.docx', '') + `_${date}.docx`;
    const result = await uploadFile(drive, join(DOCS_DIR, file), nameWithDate, folder);
    console.log(`✓ ${result.name}`);
  }

  console.log('\nGotowe! Sprawdz Google Drive -> folder "Kobi Meble"');
}

main().catch(console.error);

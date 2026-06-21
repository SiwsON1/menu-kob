import { google } from 'googleapis';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
const auth = new google.auth.OAuth2(creds.installed.client_id, creds.installed.client_secret, 'http://localhost:8080/oauth2callback');
auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
const drive = google.drive({ version: 'v3', auth });

async function mkfolder(name, parent) {
  const q = `name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false` + (parent ? ` and '${parent}' in parents` : '');
  const ex = await drive.files.list({ q, fields: 'files(id,name)' });
  if (ex.data.files.length) return ex.data.files[0].id;
  const res = await drive.files.create({ requestBody: { name, mimeType: 'application/vnd.google-apps.folder', ...(parent ? { parents: [parent] } : {}) }, fields: 'id' });
  return res.data.id;
}

const root = await mkfolder('KOBI - linkowanie 2026-06-04', null);
const kat = await mkfolder('Kategorie', root);
const prod = await mkfolder('Produkty', root);
const ids = { root, kat, prod };
writeFileSync(join(__dirname, 'link-folders.json'), JSON.stringify(ids, null, 2));
console.log('ROOT:', root);
console.log('Kategorie:', kat);
console.log('Produkty:', prod);
console.log('Link: https://drive.google.com/drive/folders/' + root);

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
const { client_secret, client_id } = creds.installed;
const auth = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080/oauth2callback');
auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
const drive = google.drive({ version: 'v3', auth });

const KEEP = process.argv[2] || ''; // id folderu do zachowania (opcjonalnie)
const res = await drive.files.list({
  q: "name contains 'Poprawki 2026-05-29' and mimeType='application/vnd.google-apps.folder' and trashed=false",
  fields: 'files(id,name)', pageSize: 100,
});
for (const f of res.data.files) {
  if (f.id === KEEP) { console.log('ZOSTAWIAM', f.name); continue; }
  await drive.files.update({ fileId: f.id, requestBody: { trashed: true } });
  console.log('skasowano:', f.name);
}
console.log('Gotowe. Pozostałe foldery Poprawki 2026-05-29:', res.data.files.length, '(skasowano wszystkie poza KEEP)');

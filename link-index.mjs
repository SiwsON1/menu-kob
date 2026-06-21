import ExcelJS from 'exceljs';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ids = JSON.parse(readFileSync(join(__dirname, 'link-folders.json')));
const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
const auth = new google.auth.OAuth2(creds.installed.client_id, creds.installed.client_secret, 'http://localhost:8080/oauth2callback');
auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
const drive = google.drive({ version: 'v3', auth });

async function listFolder(parent) {
  const res = await drive.files.list({ q: `'${parent}' in parents and trashed=false and mimeType!='application/vnd.google-apps.folder'`, fields: 'files(id,name)', pageSize: 200, orderBy: 'name' });
  return res.data.files.map(f => ({ name: f.name, link: 'https://drive.google.com/file/d/' + f.id + '/view' }));
}

const kat = await listFolder(ids.kat);
const prod = await listFolder(ids.prod);

const wb = new ExcelJS.Workbook();
const ws = wb.addWorksheet('Linkowanie KOBI 2026-06-04');
ws.columns = [
  { header: 'Typ', key: 'typ', width: 12 },
  { header: 'Plik', key: 'plik', width: 60 },
  { header: 'Link do doca (linki + schema)', key: 'link', width: 70 },
  { header: 'Dodane do IdoSell', key: 'done', width: 18 },
];
ws.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
ws.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E2E2E' } };
for (const f of kat) ws.addRow({ typ: 'Kategoria', plik: f.name, link: f.link, done: '' });
for (const f of prod) ws.addRow({ typ: 'Produkt', plik: f.name, link: f.link, done: '' });
ws.eachRow((row, i) => { if (i > 1) { const v = row.getCell('link').value; row.getCell('link').value = { text: v, hyperlink: v }; } });

const buf = await wb.xlsx.writeBuffer();
const name = 'INDEKS-linkowanie-2026-06-04.xlsx';
const ex = await drive.files.list({ q: `'${ids.root}' in parents and name='${name}' and trashed=false`, fields: 'files(id)' });
let id;
if (ex.data.files.length) { id = ex.data.files[0].id; await drive.files.update({ fileId: id, media: { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', body: Readable.from(Buffer.from(buf)) } }); }
else { const r = await drive.files.create({ requestBody: { name, parents: [ids.root] }, media: { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', body: Readable.from(Buffer.from(buf)) }, fields: 'id' }); id = r.data.id; }

console.log('Kategorie:', kat.length, '| Produkty:', prod.length, '| Razem:', kat.length + prod.length);
console.log('INDEKS:', 'https://drive.google.com/file/d/' + id + '/view');
console.log('FOLDER:', 'https://drive.google.com/drive/folders/' + ids.root);

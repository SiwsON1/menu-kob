import { Document, Paragraph, TextRun, ExternalHyperlink, Packer, HeadingLevel } from 'docx';
import { google } from 'googleapis';
import { readFileSync, readdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ITER = '2026-05-29';
const ROOT_FOLDER = '1M9zlFF6tUa3frrZ-4g6oTZIeRPgCs6Vg'; // KOMPLET FINALNY
const SRC = [
  { rel: `teksty/kategorie/${ITER}`, sub: 'Kategorie' },
  { rel: `teksty/produkty/${ITER}`, sub: 'Produkty' },
];

function parseMd(md) {
  const lines = md.split('\n'); const blocks = []; let buf = [];
  const flush = () => { if (buf.length) { const t = buf.join(' ').trim(); if (t) blocks.push({ type: 'p', text: t }); buf = []; } };
  for (const line of lines) {
    if (line.startsWith('## ')) { flush(); blocks.push({ type: 'h2', text: line.slice(3).trim() }); }
    else if (line.startsWith('# ')) { flush(); blocks.push({ type: 'h1', text: line.slice(2).trim() }); }
    else if (line.trim() === '') { flush(); }
    else buf.push(line);
  }
  flush(); return blocks;
}
function parseInline(text) {
  const runs = []; const rx = /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)|\*\*(.+?)\*\*|((?:[^\[*]|\*(?!\*))+)/g; let m;
  while ((m = rx.exec(text)) !== null) {
    if (m[1] && m[2]) runs.push(new ExternalHyperlink({ link: m[2], children: [new TextRun({ text: m[1], style: 'Hyperlink', color: '1155CC', underline: { type: 'single' } })] }));
    else if (m[3]) runs.push(new TextRun({ text: m[3], bold: true }));
    else if (m[4]) runs.push(new TextRun({ text: m[4] }));
  }
  return runs.length ? runs : [new TextRun({ text })];
}
function buildDoc(blocks) {
  const ch = [];
  for (const b of blocks) {
    if (b.type === 'h2' || b.type === 'h1') ch.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: b.text, bold: true, size: 28, font: 'Calibri' })], spacing: { before: 200, after: 100 } }));
    else ch.push(new Paragraph({ children: parseInline(b.text), spacing: { before: 80, after: 80 } }));
  }
  return new Document({ styles: { default: { document: { run: { font: 'Calibri', size: 24 }, paragraph: { spacing: { line: 360 } } } } }, sections: [{ children: ch }] });
}

const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
const auth = new google.auth.OAuth2(creds.installed.client_id, creds.installed.client_secret, 'http://localhost:8080/oauth2callback');
auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
const drive = google.drive({ version: 'v3', auth });

// znajdź podfoldery Kategorie / Produkty
const subRes = await drive.files.list({ q: `'${ROOT_FOLDER}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`, fields: 'files(id,name)' });
const subId = {}; for (const f of subRes.data.files) subId[f.name] = f.id;

let updated = 0, created = 0;
for (const { rel, sub } of SRC) {
  const full = join(__dirname, rel); const parent = subId[sub];
  if (!parent) { console.log('BRAK podfolderu', sub); continue; }
  for (const file of readdirSync(full).filter(f => f.endsWith('.md'))) {
    const md = readFileSync(join(full, file), 'utf8');
    const buf = await Packer.toBuffer(buildDoc(parseMd(md)));
    const name = basename(file, '.md') + `_${ITER}.docx`;
    const ex = await drive.files.list({ q: `'${parent}' in parents and name='${name}' and trashed=false`, fields: 'files(id)' });
    if (ex.data.files.length) {
      await drive.files.update({ fileId: ex.data.files[0].id, media: { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', body: Readable.from(buf) } });
      updated++; console.log('zaktualizowano:', sub + '/' + name);
    } else {
      await drive.files.create({ requestBody: { name, parents: [parent] }, media: { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', body: Readable.from(buf) }, fields: 'id' });
      created++; console.log('dodano:', sub + '/' + name);
    }
  }
}
console.log(`\nGOTOWE w tym samym folderze. Zaktualizowano: ${updated}, dodano: ${created}.`);
console.log('Link: https://drive.google.com/drive/folders/' + ROOT_FOLDER);

import { Document, Paragraph, TextRun, ExternalHyperlink, Packer, HeadingLevel } from 'docx';
import { google } from 'googleapis';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'teksty/linkowanie-2026-06-04';
const ids = JSON.parse(readFileSync(join(__dirname, 'link-folders.json')));
const SRC = [
  { rel: `${BASE}/Kategorie`, parent: ids.kat },
  { rel: `${BASE}/Produkty`, parent: ids.prod },
];
const ONLY = process.argv[2] || null; // opcjonalnie: tylko jeden plik (basename bez .md)

function parseMd(md) {
  const lines = md.split('\n'); const blocks = []; let buf = []; let code = null;
  const flush = () => { if (buf.length) { const t = buf.join(' ').trim(); if (t) blocks.push({ type: 'p', text: t }); buf = []; } };
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (code === null) { flush(); code = []; }
      else { blocks.push({ type: 'code', lines: code }); code = null; }
      continue;
    }
    if (code !== null) { code.push(line); continue; }
    if (line.startsWith('### ')) { flush(); blocks.push({ type: 'h3', text: line.slice(4).trim() }); }
    else if (line.startsWith('## ')) { flush(); blocks.push({ type: 'h2', text: line.slice(3).trim() }); }
    else if (line.startsWith('# ')) { flush(); blocks.push({ type: 'h1', text: line.slice(2).trim() }); }
    else if (line.trim() === '') { flush(); }
    else buf.push(line);
  }
  flush(); if (code && code.length) blocks.push({ type: 'code', lines: code }); return blocks;
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
    if (b.type === 'h2' || b.type === 'h1') ch.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: b.text, bold: true, size: 28, font: 'Calibri' })], spacing: { before: 220, after: 100 } }));
    else if (b.type === 'h3') ch.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: b.text, bold: true, size: 25, font: 'Calibri' })], spacing: { before: 160, after: 80 } }));
    else if (b.type === 'code') for (const ln of b.lines) ch.push(new Paragraph({ children: [new TextRun({ text: ln, font: 'Consolas', size: 17 })], spacing: { before: 0, after: 0, line: 240 } }));
    else ch.push(new Paragraph({ children: parseInline(b.text), spacing: { before: 80, after: 80 } }));
  }
  return new Document({ styles: { default: { document: { run: { font: 'Calibri', size: 24 }, paragraph: { spacing: { line: 360 } } } } }, sections: [{ children: ch }] });
}

const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
const auth = new google.auth.OAuth2(creds.installed.client_id, creds.installed.client_secret, 'http://localhost:8080/oauth2callback');
auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
const drive = google.drive({ version: 'v3', auth });

const out = [];
for (const { rel, parent } of SRC) {
  const full = join(__dirname, rel);
  if (!existsSync(full)) continue;
  for (const file of readdirSync(full).filter(f => f.endsWith('.md'))) {
    const base = basename(file, '.md');
    if (ONLY && base !== ONLY) continue;
    const md = readFileSync(join(full, file), 'utf8');
    const buf = await Packer.toBuffer(buildDoc(parseMd(md)));
    const name = base + '_2026-06-04_LINKI.docx';
    const ex = await drive.files.list({ q: `'${parent}' in parents and name='${name}' and trashed=false`, fields: 'files(id)' });
    let id;
    if (ex.data.files.length) {
      id = ex.data.files[0].id;
      await drive.files.update({ fileId: id, media: { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', body: Readable.from(buf) } });
      console.log('zaktualizowano:', name);
    } else {
      const r = await drive.files.create({ requestBody: { name, parents: [parent] }, media: { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', body: Readable.from(buf) }, fields: 'id,webViewLink' });
      id = r.data.id;
      console.log('dodano:', name);
    }
    out.push({ name, id, link: 'https://drive.google.com/file/d/' + id + '/view' });
  }
}
console.log('\n=== LINKI ===');
for (const o of out) console.log(o.name, '->', o.link);

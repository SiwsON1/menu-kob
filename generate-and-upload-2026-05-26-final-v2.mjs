import { Document, Paragraph, TextRun, ExternalHyperlink, Packer, HeadingLevel } from 'docx';
import { google } from 'googleapis';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ITER_DATE = '2026-05-26';
const SRC_DIRS = [
  { rel: `teksty/kategorie/${ITER_DATE}`, label: 'kategorie' },
  { rel: `teksty/produkty/${ITER_DATE}`, label: 'produkty' },
];
const DOCS_OUT = join(__dirname, 'docs', ITER_DATE);

// ---------- MD → DOCX ----------

function parseMd(md) {
  const lines = md.split('\n');
  const blocks = [];
  let buffer = [];
  const flush = () => {
    if (buffer.length) {
      const t = buffer.join(' ').trim();
      if (t) blocks.push({ type: 'p', text: t });
      buffer = [];
    }
  };
  for (const line of lines) {
    if (line.startsWith('# ')) { flush(); blocks.push({ type: 'h1', text: line.slice(2).trim() }); }
    else if (line.startsWith('## ')) { flush(); blocks.push({ type: 'h2', text: line.slice(3).trim() }); }
    else if (line.startsWith('| ')) { flush(); blocks.push({ type: 'p', text: line.trim() }); }
    else if (line.trim() === '') { flush(); }
    else buffer.push(line);
  }
  flush();
  return blocks;
}

function parseInline(text) {
  const runs = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|((?:[^\[*]|\*(?!\*))+)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m[1] && m[2]) {
      runs.push(new ExternalHyperlink({
        link: m[2],
        children: [new TextRun({ text: m[1], style: 'Hyperlink', color: '1155CC', underline: { type: 'single' } })],
      }));
    } else if (m[3]) runs.push(new TextRun({ text: m[3], bold: true }));
    else if (m[4]) runs.push(new TextRun({ text: m[4], italics: true }));
    else if (m[5]) runs.push(new TextRun({ text: m[5] }));
  }
  return runs.length ? runs : [new TextRun({ text })];
}

function buildDoc(blocks) {
  const children = [];
  for (const b of blocks) {
    if (b.type === 'h1') {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: b.text, bold: true, size: 32, font: 'Calibri' })],
        spacing: { before: 240, after: 120 },
      }));
    } else if (b.type === 'h2') {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: b.text, bold: true, size: 26, font: 'Calibri' })],
        spacing: { before: 200, after: 80 },
      }));
    } else {
      children.push(new Paragraph({
        children: parseInline(b.text),
        spacing: { before: 80, after: 80 },
      }));
    }
  }
  return new Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 24 }, paragraph: { spacing: { line: 360 } } } } },
    sections: [{ children }],
  });
}

async function generateDocs() {
  mkdirSync(DOCS_OUT, { recursive: true });
  const results = [];
  for (const { rel, label } of SRC_DIRS) {
    const full = join(__dirname, rel);
    if (!existsSync(full)) { console.log(`! Brak folderu: ${rel}`); continue; }
    const outSub = join(DOCS_OUT, label);
    mkdirSync(outSub, { recursive: true });
    const files = readdirSync(full).filter(f => f.endsWith('.md'));
    for (const f of files) {
      const md = readFileSync(join(full, f), 'utf8');
      const doc = buildDoc(parseMd(md));
      const buf = await Packer.toBuffer(doc);
      const outPath = join(outSub, basename(f, '.md') + '.docx');
      writeFileSync(outPath, buf);
      results.push({ label, path: outPath, filename: basename(outPath) });
      console.log(`✓ ${label}/${basename(outPath)}`);
    }
  }
  return results;
}

// ---------- Upload to Drive ----------

function getAuth() {
  const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
  const { client_secret, client_id } = creds.installed;
  const auth = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080/oauth2callback');
  auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
  return auth;
}

async function createFolder(drive, name, parentId = null) {
  const res = await drive.files.create({
    requestBody: { name, mimeType: 'application/vnd.google-apps.folder', ...(parentId ? { parents: [parentId] } : {}) },
    fields: 'id,name,webViewLink',
  });
  return res.data;
}

async function uploadFile(drive, filePath, name, parentId) {
  const content = readFileSync(filePath);
  const res = await drive.files.create({
    requestBody: { name, parents: [parentId] },
    media: {
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      body: Readable.from(content),
    },
    fields: 'id,name,webViewLink',
  });
  return res.data;
}

async function uploadAll(generated) {
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });

  console.log(`\nTworzenie folderu "Kobi Meble - Poprawki ${ITER_DATE} FINAL v2 (bez cen i dyn. liczb)" na Drive...`);
  const root = await createFolder(drive, `Kobi Meble - Poprawki ${ITER_DATE} FINAL v2 (bez cen i dyn. liczb)`);
  const kategorieFolder = await createFolder(drive, 'Kategorie', root.id);
  const produktyFolder = await createFolder(drive, 'Produkty', root.id);

  const links = { root: root.webViewLink, kategorie: [], produkty: [] };

  for (const item of generated) {
    const parent = item.label === 'kategorie' ? kategorieFolder.id : produktyFolder.id;
    const nameWithDate = basename(item.filename, '.docx') + `_${ITER_DATE}.docx`;
    const res = await uploadFile(drive, item.path, nameWithDate, parent);
    console.log(`↑ ${res.name}`);
    links[item.label].push({ name: res.name, link: res.webViewLink });
  }

  return { root, kategorieFolder, produktyFolder, links };
}

// ---------- Main ----------

const generated = await generateDocs();
console.log(`\n${generated.length} plików wygenerowanych. Upload na Drive...\n`);
const result = await uploadAll(generated);

console.log('\n========================================');
console.log('GOTOWE - Linki do recenzji klienta');
console.log('========================================');
console.log(`\nFolder główny: ${result.root.webViewLink}`);
console.log(`\nKategorie:`);
for (const f of result.links.kategorie) console.log(`  ${f.name}\n    ${f.link}`);
console.log(`\nProdukty:`);
for (const f of result.links.produkty) console.log(`  ${f.name}\n    ${f.link}`);

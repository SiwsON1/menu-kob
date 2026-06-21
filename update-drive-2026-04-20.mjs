import { Document, Paragraph, TextRun, ExternalHyperlink, Packer, HeadingLevel } from 'docx';
import { google } from 'googleapis';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ITER_DATE = '2026-04-20';
const DOCS_OUT = join(__dirname, 'docs', ITER_DATE);

// Root folder od poprzedniego uploadu — pliki nadpisujemy w tym samym miejscu
const ROOT_FOLDER_ID = '18TXtEEaV34PFR5dM2GPu69s6BIzc7zTL';

const SRC_DIRS = [
  // Kategorie zaakceptowane przez klienta i wdrożone — nie nadpisujemy
  // { rel: `teksty/kategorie/${ITER_DATE}`, label: 'kategorie', subFolder: 'Kategorie' },
  { rel: `teksty/produkty/${ITER_DATE}`, label: 'produkty', subFolder: 'Produkty' },
];

function parseMd(md) {
  const lines = md.split('\n');
  const blocks = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('# ')) { blocks.push({ type: 'h2', text: line.slice(2).trim() }); continue; } // tytuł renderujemy jako H2 (H1 jest w CMS)
    if (line.startsWith('### ')) { blocks.push({ type: 'h3', text: line.slice(4).trim() }); continue; }
    if (line.startsWith('## ')) { blocks.push({ type: 'h2', text: line.slice(3).trim() }); continue; }
    // Cały akapit w **bold** (bez innych markerów) → traktuj jak H3 (wzorzec pytania FAQ)
    const boldOnly = /^\*\*(.+)\*\*$/.exec(line);
    if (boldOnly && !boldOnly[1].includes('**')) {
      blocks.push({ type: 'h3', text: boldOnly[1].trim() });
      continue;
    }
    blocks.push({ type: 'p', text: line });
  }
  return blocks;
}

function stripMarkdownInline(s) {
  return s
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1');
}

function extractFaqPairs(blocks) {
  const pairs = [];
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].type !== 'h3') continue;
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[j].type === 'p') {
        pairs.push({ q: blocks[i].text.trim(), a: stripMarkdownInline(blocks[j].text).trim() });
        break;
      }
      if (blocks[j].type === 'h2' || blocks[j].type === 'h3') break;
    }
  }
  return pairs;
}

function buildFaqSchemaJson(pairs) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(p => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };
  return '<script type="application/ld+json">\n' + JSON.stringify(schema, null, 2) + '\n</script>';
}

function parseInline(text) {
  const runs = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|((?:[^\[*]|\*(?!\*))+)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m[1] && m[2]) runs.push(new ExternalHyperlink({ link: m[2], children: [new TextRun({ text: m[1], style: 'Hyperlink', color: '1155CC', underline: { type: 'single' }, font: 'Roboto' })] }));
    else if (m[3]) runs.push(new TextRun({ text: m[3], bold: true, font: 'Roboto', color: '000000' }));
    else if (m[4]) runs.push(new TextRun({ text: m[4], italics: true, font: 'Roboto', color: '000000' }));
    else if (m[5]) runs.push(new TextRun({ text: m[5], font: 'Roboto', color: '000000' }));
  }
  return runs.length ? runs : [new TextRun({ text, font: 'Roboto', color: '000000' })];
}

function buildDoc(blocks) {
  const children = [];
  for (const b of blocks) {
    if (b.type === 'h1') children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: b.text, bold: true, size: 32, font: 'Roboto', color: '000000' })],
      spacing: { before: 240, after: 120 },
    }));
    else if (b.type === 'h2') children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: b.text, bold: true, size: 26, font: 'Roboto', color: '000000' })],
      spacing: { before: 200, after: 80 },
    }));
    else if (b.type === 'h3') children.push(new Paragraph({
      heading: HeadingLevel.HEADING_3,
      children: [new TextRun({ text: b.text, bold: true, size: 22, font: 'Roboto', color: '000000' })],
      spacing: { before: 160, after: 60 },
    }));
    else children.push(new Paragraph({ children: parseInline(b.text), spacing: { before: 80, after: 80 } }));
  }

  // Schema FAQPage JSON-LD na końcu — jeśli dokument ma pytania FAQ (pary h3+p)
  const faqPairs = extractFaqPairs(blocks);
  if (faqPairs.length > 0) {
    children.push(new Paragraph({ children: [new TextRun({ text: '' })], spacing: { before: 400, after: 80 } }));
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: 'Schema FAQ (JSON-LD) — do wklejenia w sekcji kodu HTML', bold: true, size: 26, font: 'Roboto', color: '000000' })],
      spacing: { before: 200, after: 80 },
    }));
    const jsonBlock = buildFaqSchemaJson(faqPairs);
    for (const line of jsonBlock.split('\n')) {
      children.push(new Paragraph({
        children: [new TextRun({ text: line || ' ', font: 'Consolas', size: 18, color: '333333' })],
        spacing: { before: 0, after: 0, line: 260 },
      }));
    }
  }

  return new Document({
    styles: {
      default: {
        document: { run: { font: 'Roboto', size: 24, color: '000000' }, paragraph: { spacing: { line: 360 } } },
        heading1: { run: { font: 'Roboto', size: 32, bold: true, color: '000000' } },
        heading2: { run: { font: 'Roboto', size: 26, bold: true, color: '000000' } },
        heading3: { run: { font: 'Roboto', size: 22, bold: true, color: '000000' } },
      },
    },
    sections: [{ children }],
  });
}

async function generateDocs() {
  mkdirSync(DOCS_OUT, { recursive: true });
  const results = [];
  for (const { rel, label, subFolder } of SRC_DIRS) {
    const full = join(__dirname, rel);
    const outSub = join(DOCS_OUT, label);
    mkdirSync(outSub, { recursive: true });
    for (const f of readdirSync(full).filter(x => x.endsWith('.md'))) {
      const md = readFileSync(join(full, f), 'utf8');
      const doc = buildDoc(parseMd(md));
      const buf = await Packer.toBuffer(doc);
      const outPath = join(outSub, basename(f, '.md') + '.docx');
      writeFileSync(outPath, buf);
      results.push({ label, subFolder, path: outPath, filename: basename(outPath), targetName: basename(outPath, '.docx') + `_${ITER_DATE}.docx` });
    }
  }
  return results;
}

function getAuth() {
  const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
  const { client_secret, client_id } = creds.installed;
  const auth = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080/oauth2callback');
  auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
  return auth;
}

async function findFolderInParent(drive, name, parentId) {
  const q = `name = '${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const res = await drive.files.list({ q, fields: 'files(id,name)' });
  return res.data.files[0];
}

async function findFileInParent(drive, name, parentId) {
  const q = `name = '${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and trashed = false`;
  const res = await drive.files.list({ q, fields: 'files(id,name,webViewLink)' });
  return res.data.files[0];
}

async function updateFileContent(drive, fileId, filePath) {
  const res = await drive.files.update({
    fileId,
    media: {
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      body: Readable.from(readFileSync(filePath)),
    },
    fields: 'id,name,webViewLink',
  });
  return res.data;
}

async function main() {
  console.log('Regeneracja .docx z folderów 2026-04-20...');
  const generated = await generateDocs();
  console.log(`✓ ${generated.length} plików wygenerowanych.\n`);

  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });

  const kategorieFolder = await findFolderInParent(drive, 'Kategorie', ROOT_FOLDER_ID);
  const produktyFolder = await findFolderInParent(drive, 'Produkty', ROOT_FOLDER_ID);
  if (!kategorieFolder || !produktyFolder) throw new Error('Brak podfolderów Kategorie/Produkty w rootu');

  console.log('Nadpisywanie zawartości plików na Drive...\n');
  const results = { kategorie: [], produkty: [] };
  for (const item of generated) {
    const parent = item.label === 'kategorie' ? kategorieFolder.id : produktyFolder.id;
    const existing = await findFileInParent(drive, item.targetName, parent);
    if (!existing) {
      console.log(`! Brak w Drive: ${item.targetName} — pomijam`);
      continue;
    }
    const updated = await updateFileContent(drive, existing.id, item.path);
    console.log(`✓ ${updated.name}`);
    results[item.label].push({ name: updated.name, link: updated.webViewLink });
  }

  console.log('\n========================================');
  console.log('GOTOWE — linki (te same co wcześniej, nowa zawartość)');
  console.log(`Folder: https://drive.google.com/drive/folders/${ROOT_FOLDER_ID}`);
  console.log('========================================');
}

main().catch(e => { console.error(e); process.exit(1); });

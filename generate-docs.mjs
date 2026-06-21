import { Document, Paragraph, TextRun, ExternalHyperlink, Packer, HeadingLevel } from 'docx';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseMd(md) {
  const lines = md.split('\n');
  const paragraphs = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('# ')) { paragraphs.push({ type: 'h2', text: line.slice(2).trim() }); continue; } // tytuł renderujemy jako H2 (H1 jest w CMS)
    else if (line.startsWith('## ')) paragraphs.push({ type: 'h2', text: line.slice(3).trim() });
    else paragraphs.push({ type: 'paragraph', text: line });
  }
  return paragraphs;
}

// Parses inline markdown: **bold**, *italic*, [text](url)
function parseInline(text) {
  const runs = [];
  // Regex: markdown link, bold, italic, plain text
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|((?:[^\[*]|\*(?!\*))+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1] && match[2]) {
      // Hyperlink [text](url)
      runs.push(new ExternalHyperlink({
        link: match[2],
        children: [new TextRun({
          text: match[1],
          style: 'Hyperlink',
          color: '1155CC',
          underline: { type: 'single' },
        })],
      }));
    } else if (match[3]) {
      runs.push(new TextRun({ text: match[3], bold: true }));
    } else if (match[4]) {
      runs.push(new TextRun({ text: match[4], italics: true }));
    } else if (match[5]) {
      runs.push(new TextRun({ text: match[5] }));
    }
  }
  return runs.length > 0 ? runs : [new TextRun({ text })];
}

function buildDoc(blocks) {
  const children = [];

  for (const block of blocks) {
    if (block.type === 'h1') {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: block.text, bold: true, size: 32, color: '000000', font: 'Roboto' })],
        spacing: { before: 240, after: 120 },
      }));
    } else if (block.type === 'h2') {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: block.text, bold: true, size: 26, color: '000000', font: 'Roboto' })],
        spacing: { before: 200, after: 80 },
      }));
    } else {
      children.push(new Paragraph({
        children: parseInline(block.text),
        spacing: { before: 80, after: 80 },
      }));
    }
  }

  return new Document({
    styles: {
      default: {
        document: { run: { font: 'Roboto', size: 24, color: '000000' }, paragraph: { spacing: { line: 360 } } },
        heading1: { run: { font: 'Roboto', size: 32, bold: true, color: '000000' } },
        heading2: { run: { font: 'Roboto', size: 26, bold: true, color: '000000' } },
      },
    },
    sections: [{ children }],
  });
}

const DIRS = ['teksty/produkty', 'teksty/kategorie', 'teksty/blog/2026-06', 'teksty/blog/2026-06-v2'];
mkdirSync(join(__dirname, 'docs'), { recursive: true });

for (const dir of DIRS) {
  const fullDir = join(__dirname, dir);
  const files = readdirSync(fullDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const md = readFileSync(join(fullDir, file), 'utf8');
    const blocks = parseMd(md);
    const doc = buildDoc(blocks);
    const buffer = await Packer.toBuffer(doc);
    const suffix = dir.endsWith('-v2') ? '-v2' : '';
    const outPath = join(__dirname, 'docs', basename(file, '.md') + suffix + '.docx');
    writeFileSync(outPath, buffer);
    console.log('✓', basename(file, '.md') + '.docx');
  }
}
console.log('\nGotowe! Pliki w: klienci/kobi-meble/docs/');

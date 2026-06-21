import { Document, Paragraph, TextRun, ExternalHyperlink, Packer, HeadingLevel } from 'docx';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseInline(text) {
  const runs = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*|`([^`]+)`|((?:[^\[*`]|\*(?!\*))+)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m[1] && m[2]) {
      runs.push(new ExternalHyperlink({ link: m[2], children: [new TextRun({ text: m[1], color: '1155CC', underline: { type: 'single' } })] }));
    } else if (m[3]) runs.push(new TextRun({ text: m[3], bold: true }));
    else if (m[4]) runs.push(new TextRun({ text: m[4], font: 'Consolas' }));
    else if (m[5]) runs.push(new TextRun({ text: m[5] }));
  }
  return runs.length ? runs : [new TextRun({ text })];
}

function buildDoc(md) {
  const children = [];
  for (const raw of md.split('\n')) {
    const line = raw.replace(/\s+$/,'');
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith('> ')) { children.push(new Paragraph({ children: parseInline(t.slice(2)), indent: { left: 360 }, spacing: { before: 60, after: 60 } })); continue; }
    if (/^#{1}\s/.test(t)) { children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t.replace(/^#\s+/,''), bold: true, size: 32, font: 'Roboto' })], spacing: { before: 240, after: 120 } })); continue; }
    if (/^#{2}\s/.test(t)) { children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t.replace(/^#{2}\s+/,''), bold: true, size: 27, font: 'Roboto' })], spacing: { before: 220, after: 90 } })); continue; }
    if (/^#{3,}\s/.test(t)) { children.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t.replace(/^#{3,}\s+/,''), bold: true, size: 24, font: 'Roboto' })], spacing: { before: 160, after: 70 } })); continue; }
    if (/^---+$/.test(t)) { children.push(new Paragraph({ text: '', border: { bottom: { color: 'CCCCCC', space: 1, style: 'single', size: 6 } } })); continue; }
    // table row -> plain line w/o pipes
    if (/^\|/.test(t)) {
      if (/^\|[\s:|-]+\|?$/.test(t)) continue; // separator row
      const cells = t.replace(/^\|/,'').replace(/\|$/,'').split('|').map(c=>c.trim());
      children.push(new Paragraph({ children: parseInline(cells.join('  |  ')), spacing: { before: 30, after: 30 } }));
      continue;
    }
    // list item
    const li = t.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (li) { children.push(new Paragraph({ children: parseInline(li[3]), bullet: { level: 0 }, spacing: { before: 30, after: 30 } })); continue; }
    children.push(new Paragraph({ children: parseInline(t), spacing: { before: 70, after: 70 } }));
  }
  return new Document({
    styles: { default: { document: { run: { font: 'Roboto', size: 22, color: '000000' }, paragraph: { spacing: { line: 320 } } } } },
    sections: [{ children }],
  });
}

const FILES = [
  'plans/MASTER-kobi-geo-rozmowa-2026-05-29.md',
  'plans/sciaga-rozmowa-A4.md',
  'plans/rozmowa-dyrektor-2026-05-28.md',
  'plans/pomysly-kierunki-rozwoj-2026-05-29.md',
  'plans/geo-konkurencja-idosell-2026-05-29.md',
];
mkdirSync(join(__dirname, 'docs', 'rozmowa'), { recursive: true });
for (const f of FILES) {
  const md = readFileSync(join(__dirname, f), 'utf8');
  const buffer = await Packer.toBuffer(buildDoc(md));
  const out = join(__dirname, 'docs', 'rozmowa', basename(f, '.md') + '.docx');
  writeFileSync(out, buffer);
  console.log('OK', basename(out));
}
console.log('Gotowe -> docs/rozmowa/');

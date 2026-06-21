import { google } from 'googleapis';
import JSZip from 'jszip';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TMP_DIR = join(__dirname, 'tmp-docx-iter1');
mkdirSync(TMP_DIR, { recursive: true });

// Lista plików iteracji 1, które klient recenzował
const FILES = [
  // Kategorie
  { id: '1-aVphN4R4OhJIgEYisegf8enS0__iOO0', name: 'meble-ogrodowe', type: 'kategoria' },
  { id: '1QhXrIRMWiYGlbonFJId1bov8j1f0oAKB', name: 'polkotapczany-lozka-w-szafie', type: 'kategoria' },
  { id: '1O3xpIfrP1A4ZI1KBW7zLVLthG2VLAxiw', name: 'lozka-dzieciece', type: 'kategoria' },
  { id: '1FFP1W2ppK_AzlvszgIrk8-BG6XpV7_U1', name: 'biurka-komputerowe', type: 'kategoria' },
  // Produkty
  { id: '1-TqbAjMC1HsrbG0A5JZSbuOS7Tg6ybvV', name: 'biurko-rozkladane-verto-biale', type: 'produkt' },
  { id: '1owmhokJu0BtVlwmSeOGUylOXFJ2kidNz', name: 'zestaw-mebli-ogrodowych-nicea-bezowy-kremowy', type: 'produkt' },
  { id: '1r3iugQWF6amTGl3F8Dn7N0Mwt23uMstB', name: 'lozko-domek-dubi-dzieciece-160x80-naturalny', type: 'produkt' },
  { id: '1DcwLULiEKlXDjmpfN7xAts-6e9jTrwx0', name: 'lozko-dzieciece-emma-160x80-biale-rozowe', type: 'produkt' },
  { id: '1Ml9nIj9vIwRNivIaeeTLbBdI-nYtXxH9', name: 'biurko-flexi-118cm-elektryczne-dab-artisan-czarny', type: 'produkt' },
  { id: '1pY_8JpF8ynSZGZEf7bIqM4kgCfwbUo1t', name: 'lozko-dzieciece-leo-montessori-160x80-biale', type: 'produkt' },
  { id: '1JyknuEXGMasQNojSrjYI5u9yIAX8ELk7', name: 'lozko-pojedyncze-eryk-160x80-biale-panele-szare', type: 'produkt' },
  { id: '15tcayixryKwdcaTpKPH6AtlKCjnS9mQH', name: 'lozko-dzieciece-auto-spider-160x80', type: 'produkt' },
  { id: '1UkuXIEoaXBrnXLZarutmjFo09iUFZ88V', name: 'lozko-podwojne-helios-160x200-szare-z-materacem', type: 'produkt' },
  { id: '1TgL_eyBKu_xw8saKjabjufVkU8qEqiGK', name: 'polkotapczan-verto-140x200-bialy', type: 'produkt' },
];

function getAuth() {
  const creds = JSON.parse(readFileSync(join(__dirname, 'credentials.json')));
  const { client_secret, client_id } = creds.installed;
  const auth = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080/oauth2callback');
  auth.setCredentials(JSON.parse(readFileSync(join(__dirname, 'token.json'))));
  return auth;
}

async function downloadDocx(drive, id) {
  const res = await drive.files.get({ fileId: id, alt: 'media' }, { responseType: 'arraybuffer' });
  return Buffer.from(res.data);
}

// Parse document.xml: wyciągnij wszystkie paragrafy, a dla każdego run z w:color != "000000"/"auto"
// Zwraca: [{ paragraphText, colorRuns: [{text, color}] }]
function parseDocumentXml(xml) {
  const paragraphs = [];
  // Podziel na <w:p>...</w:p>
  const paraRegex = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g;
  let pMatch;
  while ((pMatch = paraRegex.exec(xml)) !== null) {
    const pContent = pMatch[1];
    const runRegex = /<w:r\b[^>]*>([\s\S]*?)<\/w:r>/g;
    let rMatch;
    const runs = [];
    while ((rMatch = runRegex.exec(pContent)) !== null) {
      const rContent = rMatch[1];
      // szukaj w:rPr > w:color
      const colorMatch = /<w:color\s+[^\/>]*w:val="([^"]+)"/i.exec(rContent);
      const color = colorMatch ? colorMatch[1].toUpperCase() : null;
      // tekst z <w:t>...</w:t>
      let text = '';
      const tRegex = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g;
      let tMatch;
      while ((tMatch = tRegex.exec(rContent)) !== null) text += tMatch[1];
      if (!text) continue;
      runs.push({ text, color });
    }
    if (runs.length === 0) continue;
    const fullText = runs.map(r => r.text).join('');
    // kolorowe = nie czarny, nie auto, nie null
    const colorRuns = runs.filter(r => r.color && r.color !== '000000' && r.color !== 'AUTO');
    paragraphs.push({ fullText, runs, colorRuns });
  }
  return paragraphs;
}

async function main() {
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });
  const report = ['# Raport uwag klienta — iteracja 1 (2026-04-12 → 2026-04-16)', '',
    'Pobrane binarnie i rozparsowane 14 plików. Każdy fragment w kolorze **innym niż czarny** (zwykle czerwony = uwaga klienta).', ''];

  for (const file of FILES) {
    console.log(`↓ ${file.name}`);
    try {
      const buf = await downloadDocx(drive, file.id);
      const localPath = join(TMP_DIR, `${file.name}.docx`);
      writeFileSync(localPath, buf);
      const zip = await JSZip.loadAsync(buf);
      const xml = await zip.file('word/document.xml').async('string');
      const paragraphs = parseDocumentXml(xml);
      const paragraphsWithColor = paragraphs.filter(p => p.colorRuns.length > 0);

      report.push(`## ${file.type === 'kategoria' ? '[KATEGORIA]' : '[PRODUKT]'} ${file.name}`, '');
      if (paragraphsWithColor.length === 0) {
        report.push('*Brak kolorowych adnotacji w tym pliku.*', '');
        continue;
      }
      report.push(`Znaleziono **${paragraphsWithColor.length}** akapitów z kolorowymi fragmentami.`, '');
      for (const p of paragraphsWithColor) {
        // Wyróżnij kolorowe fragmenty inline w tekście
        const highlighted = p.runs.map(r => {
          if (r.color && r.color !== '000000' && r.color !== 'AUTO') {
            return `**__[${r.color}]__ ${r.text}__**`;
          }
          return r.text;
        }).join('');
        report.push('---', '');
        report.push(`**Pełny akapit (z wyróżnionymi kolorami):**`, '');
        report.push(highlighted, '');
        report.push(`**Tylko kolorowe fragmenty:**`, '');
        for (const cr of p.colorRuns) {
          report.push(`- [${cr.color}] \`${cr.text}\``);
        }
        report.push('');
      }
    } catch (err) {
      report.push(`## ${file.name} — ❌ BŁĄD: ${err.message}`, '');
    }
  }

  const outPath = join(__dirname, 'raport-uwagi-klienta-2026-04-20.md');
  writeFileSync(outPath, report.join('\n'));
  console.log(`\n✓ Raport zapisany: ${outPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });

// Buduje sformatowany XLSX z checklistą fraz KOBI + zapisuje master listę w projekcie.
// Wzór wizualny: emoji w nagłówkach sekcji, kolumna "✓ Klient" z TRUE/FALSE, kolory na priorytety.
import ExcelJS from 'exceljs';
import { writeFileSync, readFileSync } from 'fs';

const SRC_CSV = 'C:/Users/mahin/Downloads/meblekobi_checklista_fraz_v3_klient.csv';
const OUT_XLSX = 'C:/Users/mahin/Downloads/meblekobi_checklista_fraz_v4_klient.xlsx';
const PROJECT_MASTER = 'D:/cursor/netim-seo-os/klienci/kobi-meble/frazy-master-2026-05-05.md';

const text = readFileSync(SRC_CSV, 'utf8');
const lines = text.split(/\r?\n/);

// Parse CSV honoring quoted commas
function parseCsvLine(line) {
  const cells = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; continue; }
    if (c === ',' && !inQ) { cells.push(cur); cur = ''; continue; }
    cur += c;
  }
  cells.push(cur);
  return cells;
}

const wb = new ExcelJS.Workbook();
const ws = wb.addWorksheet('Checklista fraz', {
  views: [{ state: 'frozen', ySplit: 4 }],
});

// Title rows (rows 1-3 in source = title + legend)
ws.mergeCells('A1:H1');
ws.getCell('A1').value = 'meblekobi.pl – Checklista fraz SEO   |   Kolumna H = TRUE/FALSE od klienta';
ws.getCell('A1').font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
ws.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F2937' } };
ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
ws.getRow(1).height = 28;

ws.mergeCells('A2:H2');
ws.getCell('A2').value = '🟢 TOP = generuje ruch    📍 POS = poza TOP10    ⭐ NEW = brak w Senuto    ★★★ wysoki    ★★ średni    ★ niski    ✅ TRUE = klient chce / FALSE = odrzucone';
ws.getCell('A2').font = { italic: true, size: 10, color: { argb: 'FF374151' } };
ws.getCell('A2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } };
ws.getCell('A2').alignment = { vertical: 'middle', wrapText: true };
ws.getRow(2).height = 28;

ws.getRow(3).values = ['Lp', 'Fraza kluczowa', 'Vol / mies.', 'Obecna poz.', 'Status', 'Priorytet (nasza ocena)', 'Co zrobić?', '✓ Klient'];
const headerRow = ws.getRow(3);
headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
headerRow.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
headerRow.height = 36;
headerRow.eachCell(cell => {
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF111827' } };
  cell.border = { top: { style: 'thin' }, bottom: { style: 'medium' }, left: { style: 'thin' }, right: { style: 'thin' } };
});

ws.columns = [
  { key: 'lp', width: 6 },
  { key: 'fraza', width: 50 },
  { key: 'vol', width: 11 },
  { key: 'pos', width: 14 },
  { key: 'status', width: 24 },
  { key: 'prio', width: 9 },
  { key: 'todo', width: 50 },
  { key: 'klient', width: 11 },
];

// Process source lines starting from row 5 (after title+legend+header in source)
let outRow = 4;
const accepted = [];
const rejected = [];

for (let i = 4; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue; // skip blank lines

  const cells = parseCsvLine(line);

  // Section divider (starts with whitespace + emoji + name)
  if (cells.length >= 2 && cells[0].trim() === '' && cells[1] === '') {
    // Skip pure empty rows
    if (cells.every(c => c === '')) continue;
  }

  // Section header pattern: leading "  🛏️ ..." in first cell, rest empty
  if (cells[0].startsWith('  ') && cells.slice(1).every(c => c === '')) {
    outRow++;
    ws.mergeCells(`A${outRow}:H${outRow}`);
    const cell = ws.getCell(`A${outRow}`);
    cell.value = cells[0].trim();
    cell.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF6B7280' } };
    cell.alignment = { vertical: 'middle', indent: 1 };
    ws.getRow(outRow).height = 24;
    continue;
  }

  // Skip the "Lp,Fraza..." re-occurrence and total footer
  if (cells[0] === 'Lp' || cells[0].includes('ŁĄCZNIE')) continue;

  // Data row
  const lp = cells[0];
  const fraza = cells[1];
  if (!fraza) continue;

  outRow++;
  const row = ws.getRow(outRow);
  row.values = [
    lp,
    fraza,
    cells[2],
    cells[3],
    cells[4],
    cells[5],
    cells[6],
    cells[7] || 'FALSE',
  ];
  row.alignment = { vertical: 'middle', wrapText: true };

  // Color the ✓ Klient cell
  const klientCell = row.getCell(8);
  if (cells[7] === 'TRUE') {
    klientCell.value = '✅ TRUE';
    klientCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } };
    klientCell.font = { bold: true, color: { argb: 'FF065F46' } };
    accepted.push({ lp, fraza, status: cells[4], prio: cells[5] });
  } else {
    klientCell.value = '❌ FALSE';
    klientCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } };
    klientCell.font = { bold: true, color: { argb: 'FF991B1B' } };
    rejected.push({ lp, fraza, status: cells[4], prio: cells[5], todo: cells[6] });
  }
  klientCell.alignment = { vertical: 'middle', horizontal: 'center' };

  // Color status column
  const statusCell = row.getCell(5);
  if (cells[4].includes('🟢')) {
    statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFECFDF5' } };
  } else if (cells[4].includes('📍')) {
    statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
  } else if (cells[4].includes('⭐')) {
    statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
  }

  // Border on row
  for (let c = 1; c <= 8; c++) {
    row.getCell(c).border = { top: { style: 'hair', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'hair', color: { argb: 'FFE5E7EB' } } };
  }
}

// Auto-filter on header
ws.autoFilter = { from: 'A3', to: 'H3' };

await wb.xlsx.writeFile(OUT_XLSX);
console.log('SAVED XLSX:', OUT_XLSX);
console.log('Accepted (TRUE):', accepted.length);
console.log('Rejected (FALSE):', rejected.length);

// === Save master list to project ===
const md = `# meblekobi.pl – frazy MASTER LIST (2026-05-05)

> **Źródło:** uwagi klienta z maila + checklista v3.
> **Reguła:** jeśli ktoś (Marcin, Claude, ja) zaproponuje frazę z listy ODRZUCONYCH poniżej — **TO BŁĄD**, klient ją wprost wykluczył.
> **Plik XLSX:** \`C:/Users/mahin/Downloads/meblekobi_checklista_fraz_v4_klient.xlsx\`

---

## 🚫 ODRZUCONE (${rejected.length}) — NIE proponować ani nie pisać pod nie tekstów

${rejected.map(r => `- **${r.fraza}** _(Lp ${r.lp}, ${r.prio || ''})_  → ${r.todo || 'wykluczone przez klienta'}`).join('\n')}

### Główne powody odrzuceń (do pamiętania)
- **Złe wymiary** — klient pisze 160x80 a NIE 80x160 (we Francji jest 80x160, na PL inaczej). Stosować PL: większy×mniejszy. Dotyczy: łóżek dziecięcych, materacy, stelaży.
- **Nie ma w sprzedaży / nie produkuje**: łóżko samolot, łóżko zamek, łóżeczka karoca (lepiej "łóżko kareta"), łóżka tapicerowane dziecięce (mają "z panelami tapicerowanymi" — Eryk, Helios), półkotapczany dziecięce, łóżko w szafie dziecięce, biurko dla 2 dzieci, szafa domek (mają regał domek / łóżko domek), regał boho, konsola do przedpokoju, krzesełko drewniane, materac kieszeniowy/medyczny/turystyczny dziecięcy, meble ogrodowe dla dzieci, barierka dla dorosłych, nakładki na listwy, pomocnik kuchenny drewniany, krzesło pomocnik dla dzieci.
- **Cała kategoria akcesoria dla zwierząt** — KOBI tego nie sprzedaje, do usunięcia z monitoringu.
- **Za szczegółowe** (klient woli ogólne): łóżko 90x200 dziecięce (rozmywa kategorię), biurko narożne białe dziecięce, komoda wąska 40 cm, regał dąb sonoma 50 cm, regał biały 80 cm, szafka nocna dąb artisan, szafka na buty wąska, półka w kształcie gwiazdy, meble kolekcja dąb sonoma, stolik kawowy/szafka RTV w dębach (artisan, sonoma).
- **"Dla dwóch X" / podwójne longtaile** — odpuszczone: dla dwóch dziewczynek, dla dwóch chłopców, podwójne wysuwane 160x80, podwójne z szufladą.

---

## ✅ ZAAKCEPTOWANE (${accepted.length}) — można pracować

Pełna lista w XLSX powyżej. Główne grupy:
- Łóżka dziecięce (ogólne, białe, drewniane, dla dziewczynki/chłopca, z barierką, z szufladą, 140x70)
- Łóżka bajkowe (autko, samochód, kareta, domek, jednorożec, kotek, traktor, policja)
- Łóżka podwójne (jako kategoria — bez "dla dwóch X")
- Łóżka z pojemnikiem dziecięce (TYLKO bez "tapicerowane dla dziecka")
- Półkotapczany ogólne + 90x200/120x200/140x200/160x200 (wariantowość rozmiarowa)
- Biurka dziecięce, biurka chowane w komodzie/regale/szafie, biurka rozkładane
- Komody (artisan, grafitowa, 40 cm, dla dziecka)
- Szafy dziecięce
- Regały dąb artisan/craft złoty, regał dziecięcy, regał na zabawki, regał na książki
- Szafki nocne dziecięce, toaletki (skandynawska, boho, dla dziewczynki)
- Przedpokój: szafka na buty z siedziskiem, wieszak (NIE "wąska", NIE "konsola")
- Stoliki i krzesełka dziecięce
- Półki dziecięce, ścienne, w kształcie chmurki
- Meble łazienkowe (szafka grafitowa, biała, pod umywalkę, słupek loft)
- Materace dziecięce (TYLKO bez wymiarów odwróconych, BEZ "kieszeniowy/medyczny/turystyczny dla dziecka")
- Meble ogrodowe ogólne (BEZ "dla dzieci")
- Barierki do łóżka dziecięcego, stelaże dziecięce
- Lokalne — Stalowa Wola
- B2B / dropshipping
- Nowe pokojowe segmenty (chłopca / dziewczynki / nastolatki)

---

## 🆕 NOWE FRAZY OD KLIENTA (mail 2026-05-04) — PRIORYTET ★★★

Specjalizacja klienta: **grafika / nadruk na meblach**. Dodatkowo wariantowość rozmiarowa półkotapczanu.

- łóżko z grafiką
- komoda z grafiką
- szafa z nadrukiem
- półkotapczan 90x200
- półkotapczan 140x200
- półkotapczan 160x200
- regał na książki
- zestaw półek
- łóżko kareta _(zamiast "łóżeczko karoca")_
- łóżko domek _(już mają)_
- łóżko z panelami tapicerowanymi _(produkty: Eryk, Helios)_

---

## 📌 ZASADA dla każdej kolejnej sesji KOBI

Zanim zaproponujesz nową frazę, opis produktu lub temat artykułu — **sprawdź sekcję ODRZUCONE wyżej**. Jeśli fraza tam jest, NIE używaj jej i wytłumacz dlaczego (np. "tego klient wykluczył w mailu z 2026-05-04 bo X").

Jeśli fraza nie jest na liście, ale jest podobna do jednej z odrzuconych (inna wersja wymiaru, inny dziecięcy wariant tapicerki), **flaga: zapytaj klienta**.
`;

writeFileSync(PROJECT_MASTER, md, 'utf8');
console.log('SAVED PROJECT MASTER:', PROJECT_MASTER);

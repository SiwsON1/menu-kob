import ExcelJS from 'exceljs';
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_05_26_20_48.xlsx');
const ws = wb.worksheets[0];
const rows = [];
for (let r = 2; r <= ws.rowCount; r++) {
  const g = (n) => { let v = ws.getRow(r).getCell(n).value; if (v && typeof v === 'object' && 'text' in v) v = v.text; if (v && typeof v === 'object' && 'result' in v) v = v.result; return v; };
  rows.push({ kw: String(g(1)||''), vol: Number(g(2))||0, pos: Number(g(3))||0, url: String(g(11)||'') });
}

const queries = [
  // 5 fraz z planu
  /^półkotapczan/i,
  /^regał na zabawki/i,
  /^szafa do pokoju dziecięc/i,
  /^szafa młodzieżow/i,
  /^biurko młodzieżow/i,
  /^łóżko z grafiką|^łóżko dziecięce z grafiką/i,
  // dodatkowo: spojrzymy na konkurencyjne intencje dla porównania
  /^szafka nocna$/i,
  /^szafka łazienkowa$/i,
  /^komoda biała$/i,
];

for (const rx of queries) {
  const hits = rows.filter(r => rx.test(r.kw)).sort((a,b)=>b.vol-a.vol).slice(0, 8);
  console.log(`\n## ${rx}`);
  if (!hits.length) { console.log('  (brak w raporcie)'); continue; }
  hits.forEach(h => {
    const isPoradnik = /poradnik|porad/i.test(h.url) || /\/art\d+,/i.test(h.url);
    console.log(`  vol=${h.vol}\tpos${h.pos}\t${isPoradnik?'[INFORMATIONAL]':'[TRANSACTIONAL]'}\t"${h.kw}"\n    → ${h.url}`);
  });
}

import ExcelJS from 'exceljs';
import fs from 'fs';

const path = 'C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_05_26_20_48.xlsx';
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(path);
const ws = wb.worksheets[0];

const rows = [];
for (let r = 2; r <= ws.rowCount; r++) {
  const row = ws.getRow(r);
  const get = (n) => {
    let v = row.getCell(n).value;
    if (v && typeof v === 'object' && 'text' in v) v = v.text;
    if (v && typeof v === 'object' && 'result' in v) v = v.result;
    return v;
  };
  rows.push({
    kw: String(get(1) || ''),
    vol: Number(get(2)) || 0,
    pos: Number(get(3)) || 0,
    traffic: Number(get(6)) || 0,
    url: String(get(11) || ''),
  });
}

console.log(`TOTAL ROWS: ${rows.length}`);

const poradniki = rows.filter(r => /poradnik|porady/i.test(r.url));
poradniki.sort((a, b) => b.vol - a.vol);
fs.writeFileSync('_raport-poradniki.tsv', 'kw\tvol\tpos\ttraffic\turl\n' +
  poradniki.map(r => `${r.kw}\t${r.vol}\t${r.pos}\t${r.traffic}\t${r.url}`).join('\n'));
console.log(`\nPORADNIKI: ${poradniki.length}`);
console.log('TOP 60:');
poradniki.slice(0, 60).forEach(r => console.log(`${r.vol}\tpos${r.pos}\t${r.kw}\t→ ${r.url.replace(/^.*?\/poradnik\//,'').slice(0,80)}`));

const pytania = rows.filter(r => /^(jak |czy |ile |co |który|która|które|kiedy |gdzie |dlaczego |czym )/i.test(r.kw));
pytania.sort((a, b) => b.vol - a.vol);
fs.writeFileSync('_raport-pytania.tsv', 'kw\tvol\tpos\ttraffic\turl\n' +
  pytania.slice(0, 800).map(r => `${r.kw}\t${r.vol}\t${r.pos}\t${r.traffic}\t${r.url}`).join('\n'));
console.log(`\nPYTANIA: ${pytania.length}`);

const kobiKeywords = [
  /łóżk(o|a) (dziecięc|dla|piętrow|domek|kareta|kotek|jednoroż|autko|samochód|policja|traktor|z pojemnik|podwójn|wysuwan)/i,
  /półkotapczan/i,
  /materac (dziecięc|piankowy|kokos|do łóżeczk|7 cm)/i,
  /biurk[oa] (dziecięc|narożn|chowan|do nauki|szkoln|regulowan|gamingowy)/i,
  /komoda (dla dziec|biała|szuflad|niska|do pokoju|w stylu)/i,
  /szaf(a|y) (dziecięc|dla dziec|niska|narożn|na ubrania|do pokoju)/i,
  /regał (dziecięc|na książk|na zabawk|dziewczyn|chłopca|niski|wąski)/i,
  /toaletka (dziecięc|dziewczyn|skandyn)/i,
  /szafka (dziecięc|nocna|na buty|łazienkow)/i,
  /pokoju (dziecka|dziewczynki|chłopca|nastolatka)/i,
  /pokój (dziecięc|dziewczynki|chłopca|nastolatka)/i,
  /meble (dziecięc|do pokoju dz|łazienkow|ogrodow|smart)/i,
  /barierka/i,
  /aranżacja (pokoju|sypialn|małego)/i,
];

const kobiRows = rows.filter(r => kobiKeywords.some(rx => rx.test(r.kw)));
kobiRows.sort((a, b) => b.vol - a.vol);
fs.writeFileSync('_raport-kobi-frazy.tsv', 'kw\tvol\tpos\ttraffic\turl\n' +
  kobiRows.slice(0, 200).map(r => `${r.kw}\t${r.vol}\t${r.pos}\t${r.traffic}\t${r.url}`).join('\n'));
console.log(`\nFRAZY KOBI-SEMANTYCZNE: ${kobiRows.length}`);
console.log('TOP 50:');
kobiRows.slice(0, 50).forEach(r => console.log(`${r.vol}\tpos${r.pos}\t${r.kw}`));

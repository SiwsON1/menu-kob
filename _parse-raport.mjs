import ExcelJS from 'exceljs';

const path = 'C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_05_26_20_48.xlsx';
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(path);

console.log('=== ARKUSZE ===');
wb.eachSheet((ws, id) => {
  console.log(`${id}: "${ws.name}" rows=${ws.rowCount} cols=${ws.columnCount}`);
});

for (const ws of wb.worksheets) {
  console.log(`\n\n###### ARKUSZ: ${ws.name} ######`);
  const lim = Math.min(ws.rowCount, 30);
  for (let r = 1; r <= lim; r++) {
    const row = ws.getRow(r);
    const vals = [];
    row.eachCell({ includeEmpty: true }, (cell) => {
      let v = cell.value;
      if (v && typeof v === 'object' && 'text' in v) v = v.text;
      if (v && typeof v === 'object' && 'result' in v) v = v.result;
      vals.push(v ?? '');
    });
    console.log(`${r}: ${vals.map(v => String(v).slice(0,60)).join(' | ')}`);
  }
}

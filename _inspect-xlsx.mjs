import ExcelJS from 'exceljs';
const f = process.argv[2];
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(f);
wb.eachSheet(ws => {
  console.log('SHEET:', ws.name, 'rows:', ws.rowCount, 'cols:', ws.columnCount);
  const h = ws.getRow(1).values;
  console.log('HEADER:', JSON.stringify(h));
  const r2 = ws.getRow(2).values;
  console.log('ROW2:', JSON.stringify(r2));
});

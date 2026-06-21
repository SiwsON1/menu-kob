import fs from 'fs';import ExcelJS from 'exceljs';
function deb(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
const dir='C:/Users/mahin/Downloads/';
const files=[...fs.readdirSync(dir).filter(f=>/baza_s.*2026_06_20.*\.xlsx$/.test(f)),'analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx','analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx'];
const m=new Map();
for(const f of files){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(dir+f);const ws=wb.worksheets[0];ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0;if(k){const d=deb(k);const c=m.get(d);if(!c||v>c.v)m.set(d,{k,v});}});}
const hits=[...m.values()].filter(o=>deb(o.k).includes('domek')&&(deb(o.k).includes('lozk')||deb(o.k).includes('lozeczk'))).sort((a,b)=>b.v-a.v);
console.log('Frazy z "domek" (łóżka), wg wolumenu:');
hits.slice(0,20).forEach(o=>console.log(`  ${o.v}\t${o.k}`));

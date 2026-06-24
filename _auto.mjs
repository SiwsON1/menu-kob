import fs from 'fs';import ExcelJS from 'exceljs';
function deb(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
// KOBI produkty auto/samochod/traktor w lozkach
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const beds=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m&&/Łóżk|Łóżko/.test(m[3]))beds.push(m[2].toLowerCase());}
const auto=beds.filter(s=>/auto|samochod|traktor|policja|wyscig|car/.test(s));
console.log('KOBI łóżka auto/samochód/traktor:',auto.length);
auto.slice(0,15).forEach(s=>console.log('  '+s));
// Senuto popyt
const dir='C:/Users/mahin/Downloads/';
const files=[...fs.readdirSync(dir).filter(f=>/baza_s.*2026_06_2[01].*\.xlsx$/.test(f)),'analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx','analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx'];
const kw=new Map();for(const f of files){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(dir+f);const ws=wb.worksheets[0];ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:0;if(k){const d=deb(k);const c=kw.get(d);if(!c||v>c.v)kw.set(d,{k,v});}});}
console.log('\nSenuto frazy auto/samochód (łóżka):');
[...kw.values()].filter(o=>/auto|samochod|wyscig/.test(deb(o.k))&&/lozk|lozeczk/.test(deb(o.k))).sort((a,b)=>b.v-a.v).slice(0,12).forEach(o=>console.log('  '+o.v+'\t'+o.k));

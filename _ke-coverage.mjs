import fs from 'fs';import ExcelJS from 'exceljs';
function deb(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
const dir='C:/Users/mahin/Downloads/';
const files=fs.readdirSync(dir).filter(f=>/baza_s.*2026_06_20.*\.xlsx$/.test(f));
const m=new Map();
for(const f of files){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(dir+f);const ws=wb.worksheets[0];ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:0;if(k){const d=deb(k);const c=m.get(d);if(!c||v>c.v)m.set(d,{k,v});}});}
const all=[...m.values()];
const topics=[['łóżko',/lozk|lozeczk/],['komoda',/komod/],['szafka rtv',/rtv/],['biurko',/biurk/],['stół/stolik',/stol/],['szafka nocna',/nocn/],['szafa/garderoba',/szaf|garderob/],['łazienka/umywalka/słupek/blat',/lazienk|umywalk|slupek|blat|pralk/],['regał',/regal/],['kanapa/narożnik',/kanapa|naroznik/],['fotel/pufa',/fotel|puf/],['krzesło',/krzesl/],['materac',/materac/],['szafka na buty/przedpokój',/buty|wieszak|konsola/],['ogród',/ogrod/],['toaletka',/toaletk/]];
console.log('Pokrycie KE per temat (ile fraz / max wolumen):');
for(const [n,re] of topics){const h=all.filter(o=>re.test(deb(o.k)));const mx=h.reduce((a,o)=>Math.max(a,o.v),0);console.log(`  ${h.length<5?'❌':'✅'} ${n}: ${h.length} fraz, max ${mx}`);}

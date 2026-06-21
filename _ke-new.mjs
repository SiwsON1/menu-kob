import ExcelJS from 'exceljs';
function deb(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
const wb=new ExcelJS.Workbook();await wb.xlsx.readFile('C:/Users/mahin/Downloads/baza_s__w_kluczowych_raporty_s_owa_kluczowe_2026_06_21_00_40.xlsx');
const ws=wb.worksheets[0];const all=[];
ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:0;if(k)all.push({k,v});});
console.log('Fraz:',all.length);
const topics=[['komoda',/komod/],['szafka rtv',/rtv/],['szafka nocna',/nocn/],['stół/stolik',/stol/],['szafa/garderoba',/szaf|garderob/],['łazienka',/lazienk|umywalk|slupek|blat|pralk/],['regał',/regal/],['kanapa',/kanapa|naroznik/],['fotel/pufa',/fotel|puf/],['krzesło',/krzesl/],['toaletka',/toaletk/],['buty/przedpokój',/buty|wieszak|konsola/],['ogród',/ogrod/]];
for(const [n,re] of topics){const h=all.filter(o=>re.test(deb(o.k)));if(h.length>=3)console.log(`  ✅ ${n}: ${h.length} fraz, max ${h.reduce((a,o)=>Math.max(a,o.v),0)}`);}
console.log('TOP15 fraz w pliku:');all.sort((a,b)=>b.v-a.v).slice(0,15).forEach(o=>console.log(`  ${o.v}\t${o.k}`));

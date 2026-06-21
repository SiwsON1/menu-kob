import fs from 'fs';
import ExcelJS from 'exceljs';
function deburr(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
// wczytaj WSZYSTKIE keyword-explorer z 2026_06_20
const dir='C:/Users/mahin/Downloads/';
const files=[...fs.readdirSync(dir).filter(f=>/baza_s.*2026_06_20.*\.xlsx$/.test(f)),
  'analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx',
  'analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx'];
const kw=new Map(); // deburr -> {kw, v}
for(const f of files){
  const wb=new ExcelJS.Workbook(); await wb.xlsx.readFile(dir+f);
  const ws=wb.worksheets[0];
  ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0;if(k){const d=deburr(k);const cur=kw.get(d);if(!cur||v>cur.v)kw.set(d,{kw:k,v});}});
}
console.log('Plików KE:',files.length,'| unikalnych fraz:',kw.size);
function vol(req,excl){ // najlepsza fraza zawierajaca wszystkie tokeny req, bez excl
  let b=null;
  for(const [d,o] of kw){ if(!req.every(t=>d.includes(t)))continue; if(excl&&excl.some(t=>d.includes(t)))continue; if(!b||o.v>b.v)b=o; }
  return b||{kw:'-',v:0};
}
// KOBI produkty - bed buckets
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const beds=[];const all=[];
for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m){all.push({s:m[2].toLowerCase(),b:m[3]});}}
const BEDB=['Łóżka dziecięce grafika/bajkowe','Łóżka dziecięce klasyczne','Łóżka inne','Łóżko domek','Łóżko Montessori/podłogowe','Łóżka podwójne dziecięce/rozsuwane','Łóżka piętrowe','Łóżka młodzieżowe','Łóżka tapicerowane/panele'];
const bedPool=all.filter(p=>BEDB.includes(p.b));
function kobi(req,buckets){const pool=buckets?all.filter(p=>buckets.includes(p.b)):bedPool;return pool.filter(p=>req.every(t=>p.s.includes(t))).length;}

// WĘZŁY łóżka (poprawione, bez "klasyczne"): [poziom, nazwa, frazaReq, frazaExcl, slugReq, buckets?]
const N=[
 ['GŁOWA','Łóżka dziecięce',['lozk','dzieciec'],null,[], BEDB],
 ['podkat','— 160x80',['160x80'],null,['160x80'],null],
 ['podkat','— 140x70',['140x70'],null,['140x70'],null],
 ['podkat','— z barierką',['lozk','barierk'],null,['barierk'],null],
 ['podkat','— z szufladą',['lozk','szuflad'],null,['szuflad'],null],
 ['podkat','— z materacem',['lozk','materac'],null,['z-materac'],null],
 ['podkat','— dla dziewczynki',['lozk','dziewczynk'],null,['dziewczynk'],null],
 ['podkat','— dla chłopca',['lozk','chlopc'],null,['chlopc'],null],
 ['podkat','— z grafiką / bajkowe',['lozk','grafik'],null,null,['Łóżka dziecięce grafika/bajkowe']],
 ['podkat','— ze zjeżdżalnią (LUKA?)',['lozk','zjezdzaln'],null,['zjezdzaln'],null],
 ['KATEGORIA','Łóżko domek',['domek'],null,['domek'],['Łóżko domek']],
 ['KATEGORIA','Łóżka montessori',['montessori'],null,['montessori'],['Łóżko Montessori/podłogowe']],
 ['KATEGORIA','Łóżka piętrowe',['pietrow'],null,['pietrow'],['Łóżka piętrowe']],
 ['KATEGORIA','Łóżka podwójne',['lozk','podwojn'],null,['podwojn'],['Łóżka podwójne dziecięce/rozsuwane']],
 ['podkat','— podwójne z pojemnikiem',['lozk','pojemnik'],null,['pojemnik'],['Łóżka podwójne dziecięce/rozsuwane']],
 ['KATEGORIA','Łóżka młodzieżowe',['mlodziezow'],null,['mlodziezow'],['Łóżka młodzieżowe']],
];

let out='# Łóżka — propozycja struktury z popytem (Senuto Keyword Explorer) + pokryciem KOBI\n\n';
out+='Reguła: węzeł istnieje TYLKO gdy ma frazę z popytem ORAZ produkty KOBI. „Klasyczne" usunięte (0 popytu).\n\n';
out+='| Poziom | Węzeł | Fraza główna | Wyszukiwań/mc | Produkty KOBI | Werdykt |\n|---|---|---|---|---|---|\n';
for(const [lvl,name,fr,frx,sr,bk] of N){
  const v=vol(fr,frx);
  const k=sr?kobi(sr,bk):kobi([], bk);
  let verdict;
  if(v.v===0) verdict='✕ brak frazy → nie robić';
  else if(k===0) verdict='⚠ LUKA: popyt jest, brak towaru';
  else if(k>=10&&v.v>=2000) verdict='✅ pełna kategoria';
  else if(k>=5&&v.v>=500) verdict='◑ podkat./filtr';
  else verdict='◔ słabo';
  out+=`| ${lvl} | ${name} | ${v.kw} | ${v.v} | ${k} | ${verdict} |\n`;
}
fs.writeFileSync('strategia/lozka-proposal-2026-06-20.md',out);
console.log(out);

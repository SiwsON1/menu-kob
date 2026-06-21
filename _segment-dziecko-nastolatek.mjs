import fs from 'fs';
import ExcelJS from 'exceljs';
function deburr(s){return s.replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
async function load(file){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(file);const ws=wb.worksheets[0];const a=[];ws.eachRow((r,i)=>{if(i===1)return;const kw=(r.getCell(1).value||'').toString().toLowerCase();let v=r.getCell(2).value;v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0;if(kw)a.push([kw,deburr(kw),v]);});return a;}
const comp=[...(await load('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx')),...(await load('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx'))];

// segmenty wg intencji pokoju
const SEG=[
 ['POKÓJ DZIECIĘCY (head)', /^(meble (do )?(pokoj|pokoju) dzieciec|pokoj dzieciec|pokoj dla dziecka|meble dzieciec|umeblowanie pokoju dzieciec)/],
 ['POKÓJ MŁODZIEŻOWY (head)', /(pokoj mlodziezow|meble mlodziezow|pokoj dla nastolat|pokoj nastolat|meble do pokoju nastolat|meble dla nastolat)/],
 ['POKÓJ DZIEWCZYNKI', /(pokoj.*dziewczynk|meble.*dla dziewczynk|meble dziewczec)/],
 ['POKÓJ CHŁOPCA', /(pokoj.*chlopc|meble.*dla chlopc|pokoj dla chlopc)/],
 ['NASTOLATEK ogólnie', /nastolat/],
 ['MŁODZIEŻOWE produkty', /mlodziezow/],
 ['DZIECIĘCE produkty', /dzieciec/],
];
console.log('=== POPYT SEGMENTÓW (meble.pl + interbeds) ===');
for(const [name,re] of SEG){
  let vol=0,n=0;const top=[];
  for(const [kw,kwN,v] of comp){if(re.test(kwN)){vol+=v;n++;top.push([kw,v]);}}
  top.sort((a,b)=>b[1]-a[1]);
  console.log(`\n## ${name}: ${n} fraz, popyt ${vol}/mc`);
  console.log('   top:', top.slice(0,6).map(([k,v])=>`${k} (${v})`).join(' · '));
}

// nasza glebia w segmencie mlodziezowym/rozmiarach dorastajacych
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const slugs=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)slugs.push(m[2].toLowerCase());}
console.log('\n\n=== GŁĘBIA KOBI w produktach MŁODZIEŻOWYCH/dorastających ===');
const KCHECK=[['młodzieżowe (token)',/mlodziezow/],['90x200',/90x200/],['120x200',/120x200/],['140x200',/140x200/],['200x90',/200x90/],['biurko (wszystkie)',/^biurko/],['łóżko 160x80 (małe dziecko)',/160x80/],['140x70 (małe dziecko)',/140x70/]];
for(const [n,re] of KCHECK) console.log(`   ${n}: ${slugs.filter(s=>re.test(s)).length}`);

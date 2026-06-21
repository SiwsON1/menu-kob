import fs from 'fs';
import ExcelJS from 'exceljs';
function deburr(s){return s.replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
async function load(f){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(f);const ws=wb.worksheets[0];const a=[];ws.eachRow((r,i)=>{if(i===1)return;const kw=(r.getCell(1).value||'').toString().toLowerCase();let v=r.getCell(2).value;v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0;if(kw)a.push([kw,deburr(kw),v]);});return a;}
// dedup: zsumuj wolumeny tej samej frazy z roznych zrodel? NIE - bierzemy max (te same frazy w obu plikach)
const raw=[...(await load('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx')),...(await load('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx'))];
const map=new Map();for(const [kw,kwN,v] of raw){const cur=map.get(kwN);if(!cur||v>cur.v)map.set(kwN,{kw,v});}
const comp=[...map.entries()].map(([kwN,o])=>[o.kw,kwN,o.v]);

// produkty KOBI
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const slugs=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)slugs.push(m[2].toLowerCase());}
function kc(req){return slugs.filter(s=>req.every(t=>s.includes(t))).length;}

// NODES: [poziom, galaz, nazwa, [wymagane tokeny frazy], [wymagane tokeny slug do liczenia KOBI], excludeTokens?]
const N=[
 // GAŁĘZIE-HUBY (intent pokojowy/kolekcyjny)
 ['G','Pokój dziecka','Pokój dziecka (hub)',['meble','dzieciec'],['lozko'],[]],
 ['G','Pokój dziecka','Meble młodzieżowe (podhub)',['mlodziezow'],['mlodziezow'],[]],
 ['G','Pokój dziecka','Pokój dziewczynki (landing)',['pokoju','dziewczynk'],['rozow'],[]],
 ['G','Pokój dziecka','Pokój chłopca (landing)',['chlopc'],['niebiesk'],[]],
 ['G','Biuro','Biuro / strefa nauki (hub)',['biurko'],['biurko'],[]],
 ['G','Łazienka','Meble łazienkowe na wymiar (hub)',['meble','lazienkow'],['lazienkow'],[]],
 // KATEGORIE TYPU
 ['K','Pokój dziecka','Łóżka dziecięce',['lozko','dzieciec'],['lozko'],[]],
 ['K','Pokój dziecka','Łóżka piętrowe',['lozko','pietrow'],['pietrow'],[]],
 ['K','Pokój dziecka','Łóżka podwójne',['lozko','podwojn'],['podwojn'],[]],
 ['K','Pokój dziecka','Łóżka młodzieżowe',['lozk','mlodziezow'],['mlodziezow'],[]],
 ['K','Pokój dziecka','Łóżko domek',['lozko','domek'],['domek'],[]],
 ['K','Pokój dziecka','Szafy dziecięce',['szafa','dzieciec'],['szafa','dzieciec'],[]],
 ['K','Pokój dziecka','Regały dziecięce',['regal','dzieciec'],['regal'],[]],
 ['K','Pokój dziecka','Półki dla dzieci',['polka'],['polka'],[]],
 ['K','Pokój dziecka','Skrzynie na zabawki',['skrzynia','zabawki'],['skrzynia'],[]],
 ['K','Pokój dziecka','Toaletki dziecięce',['toaletka'],['toaletka'],[]],
 ['K','Biuro','Biurka dziecięce',['biurko','dzieciec'],['biurko'],[]],
 ['K','Biuro','Biurka narożne',['biurko','naroz'],['biurko','naroz'],[]],
 ['K','Biuro','Biurka regulowane',['biurko','regulowane'],['regulowan'],[]],
 ['K','Biuro','Krzesła obrotowe / biurowe',['krzeslo','obrotowe'],['obrotow'],[]],
 ['K','Sypialnia','Komody',['komoda'],['komoda'],[]],
 ['K','Sypialnia','Szafki nocne',['szafka','nocna'],['nocn'],[]],
 ['K','Sypialnia','Szafy',['szafa'],['szafa'],['dzieciec']],
 ['K','Sypialnia','Garderoby',['garderoba'],['garderob'],[]],
 ['K','Sypialnia','Toaletki',['toaletka'],['toaletka'],[]],
 ['K','Sypialnia','Materace',['materac'],['materac'],[]],
 ['K','Salon','Szafki RTV',['szafka','rtv'],['rtv'],[]],
 ['K','Salon','Stoliki kawowe',['stolik','kawowy'],['stolik'],[]],
 ['K','Salon','Ławy',['lawa'],['lawa'],[]],
 ['K','Salon','Stoły',['stol'],['stol'],['stolik']],
 ['K','Salon','Krzesła do jadalni',['krzesla','jadalni'],['krzeslo'],[]],
 ['K','Salon','Kanapy',['kanapa'],['kanapa'],[]],
 ['K','Salon','Narożniki',['naroznik'],['naroznik'],[]],
 ['K','Salon','Fotele',['fotel'],['fotel'],[]],
 ['K','Salon','Pufy',['pufa'],['puf'],[]],
 ['K','Salon','Regały',['regal'],['regal'],['dzieciec']],
 ['K','Łazienka','Szafki łazienkowe',['szafka','lazienkow'],['lazienkow'],[]],
 ['K','Przedpokój','Szafki na buty',['szafka','buty'],['buty'],[]],
 ['K','Przedpokój','Wieszaki',['wieszak'],['wieszak'],[]],
 ['K','Przedpokój','Konsole',['konsola'],['konsola'],[]],
 ['K','Ogród','Meble ogrodowe',['meble','ogrodowe'],['ogrod'],[]],
 ['K','Akcesoria','Uchwyty meblowe',['uchwyt','meble'],['uchwyt'],[]],
 ['K','Akcesoria','Drapaki dla kota',['drapak'],['drapak'],[]],
 // PODKATEGORIE (z subcats-approved) - reprezentatywne
 ['P','Pokój dziecka','Łóżko dziecięce 160x80',['lozko','dzieciec','160x80'],['160x80'],[]],
 ['P','Pokój dziecka','Łóżko z barierką',['lozko','barierk'],['barierk'],[]],
 ['P','Pokój dziecka','Łóżko z pojemnikiem',['lozko','pojemnik'],['pojemnik'],[]],
 ['P','Pokój dziecka','Łóżko dla dziewczynki',['lozko','dziewczynk'],['dziewczynk'],[]],
 ['P','Sypialnia','Komoda dąb',['komoda','dab'],['komoda','dab'],[]],
 ['P','Sypialnia','Komoda biała',['komoda','biala'],['komoda','bial'],[]],
 ['P','Sypialnia','Komoda czarna',['komoda','czarna'],['komoda','czarn'],[]],
 ['P','Sypialnia','Szafka nocna biała',['szafka','nocna','biala'],['nocn','bial'],[]],
 ['P','Salon','Stolik kawowy okrągły',['stolik','kawowy','okragly'],['stolik','okragl'],[]],
 ['P','Salon','Ława do salonu',['lawa','salonu'],['lawa'],[]],
 ['P','Salon','Stół okrągły',['stol','okragly'],['stol','okragl'],['stolik']],
 ['P','Salon','Szafka RTV dąb',['szafka','rtv','dab'],['rtv','dab'],[]],
 ['P','Salon','Szafka RTV biała',['szafka','rtv','biala'],['rtv','bial'],[]],
 ['P','Salon','Szafka RTV wisząca',['szafka','rtv','wiszaca'],['rtv','wiszac'],[]],
 ['P','Biuro','Biurko komputerowe',['biurko','komputerowe'],['komputerow'],[]],
 ['P','Biuro','Biurko białe',['biurko','biale'],['biurko','bial'],[]],
 ['P','Łazienka','Szafka pod umywalkę',['szafka','umywalke'],['umywalk'],[]],
 ['P','Łazienka','Słupek łazienkowy',['slupek'],['slupek'],[]],
 ['P','Łazienka','Blat kuchenny',['blat','kuchenny'],['blat'],[]],
];

function best(reqTokens, excl){
  let b=null;
  for(const [kw,kwN,v] of comp){
    if(!reqTokens.every(t=>kwN.includes(t)))continue;
    if(excl&&excl.some(t=>kwN.includes(t)))continue;
    if(!b||v>b.v)b={kw,v};
  }
  return b;
}

const rows=[];
for(const [lvl,br,name,reqK,reqS,excl] of N){
  const ph=best(reqK,excl);
  rows.push({lvl,br,name,kobi:kc(reqS),phrase:ph?ph.kw:'-',vol:ph?ph.v:0});
}
// kolizje: ta sama fraza-cel u >1 wezla
const byPhrase={};
rows.forEach(r=>{if(r.phrase!=='-')(byPhrase[r.phrase]=byPhrase[r.phrase]||[]).push(r.name);});
const collisions=Object.entries(byPhrase).filter(([p,ns])=>ns.length>1);

let out='# Master mapa fraza→węzeł + kolizje kanibalizacji (2026-06-20)\n\n';
out+=`Węzłów: ${rows.length}. Każdy dostaje najlepszą (najwyższy wolumen) frazę z Senuto, dla której\n`;
out+=`wszystkie tokeny nazwy są obecne. Kolizja = ta sama fraza-cel przypisana >1 węzłowi.\n\n`;
out+='## KOLIZJE (do rozstrzygnięcia kanonicznego)\n\n';
if(!collisions.length) out+='Brak kolizji 1:1 na poziomie frazy głównej.\n\n';
else collisions.forEach(([p,ns])=>{out+=`- **"${p}"** ← ${ns.join(' / ')}\n`;});
out+='\n## PEŁNA MAPA (poziom · gałąź · węzeł · KOBI · fraza-cel · popyt)\n\n';
out+='| Lvl | Gałąź | Węzeł | KOBI | Fraza-cel | Popyt |\n|---|---|---|---|---|---|\n';
for(const r of rows) out+=`| ${r.lvl} | ${r.br} | ${r.name} | ${r.kobi} | ${r.phrase} | ${r.vol} |\n`;
// flagi ryzyka: wezel bez frazy lub z popytem 0, lub KOBI<5
out+='\n## FLAGI RYZYKA\n\n';
rows.filter(r=>r.vol===0).forEach(r=>out+=`- BRAK FRAZY: ${r.name} (KOBI ${r.kobi})\n`);
rows.filter(r=>r.kobi<5&&r.lvl!=='G').forEach(r=>out+=`- CIENKO (KOBI<5): ${r.name} (${r.kobi} prod., fraza "${r.phrase}" ${r.vol})\n`);
fs.writeFileSync('strategia/keyword-node-map-2026-06-20.md',out);
console.log('Węzłów:',rows.length,'| kolizji:',collisions.length);
collisions.forEach(([p,ns])=>console.log('  KOLIZJA "'+p+'":',ns.join(' / ')));

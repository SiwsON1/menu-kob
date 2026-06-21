import fs from 'fs';
import ExcelJS from 'exceljs';

// --- nasze produkty (poprawione mapowanie) ---
const csv = fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);
csv.shift();
const byBucket={};
for(const line of csv){
  const m=line.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);
  if(!m) continue;
  const slug=m[2].toLowerCase(), bucket=m[3];
  (byBucket[bucket]=byBucket[bucket]||[]).push(slug);
}

// --- definicje: [nazwa, leafKey (branch||leaf), [kosze-rodzice], regex-slug, regex-fraza] ---
const L1='1. Pokój dziecka i nastolatka', L2='2. Strefa nauki i pracy (biuro)', L5='5. Sypialnia', L6='6. Salon i jadalnia', L7='7. Łazienka i kuchnia (zabudowa)';
const BED=['Łóżka dziecięce grafika/bajkowe','Łóżka dziecięce klasyczne'];
const SUB = [
  // --- ROZMIAR / CECHA łóżka ---
  ['160x80', L1+'||Łóżka bajkowe / z grafiką', BED, /160x80/, /160x80|160 x 80/],
  ['140x70', L1+'||Łóżka bajkowe / z grafiką', BED, /140x70/, /140x70|140 x 70/],
  ['z barierką', L1+'||Łóżka bajkowe / z grafiką', BED, /barierk/, /z barierk/],
  ['z szufladą', L1+'||Łóżka bajkowe / z grafiką', BED, /szuflad/, /lozko.*z szuflad/],
  ['z materacem', L1+'||Łóżka bajkowe / z grafiką', BED, /z-materac/, /lozko.*z materacem/],
  // --- KOMODY: kolor/materiał/styl ---
  ['Komoda dąb / artisan', L5+'||Komody', ['Komody (ogólne)'], /dab|artisan/, /komoda dab|komoda debowa/],
  ['Komoda biała', L5+'||Komody', ['Komody (ogólne)'], /bial/, /komoda biala/],
  ['Komoda czarna', L5+'||Komody', ['Komody (ogólne)'], /czarn/, /komoda czarna/],
  ['Komoda kaszmir', L5+'||Komody', ['Komody (ogólne)'], /kaszmir/, /komoda kaszmir/],
  ['Komoda loft', L5+'||Komody', ['Komody (ogólne)'], /loft/, /komoda loft|komoda industrialn/],
  ['Komoda skandynawska', L5+'||Komody', ['Komody (ogólne)'], /skandynaw/, /komoda skandynaw/],
  ['Komoda na nóżkach', L5+'||Komody', ['Komody (ogólne)'], /nogi|nozk/, /komoda na nozkach|komoda na nogach/],
  ['Komoda ryflowana', L5+'||Komody', ['Komody (ogólne)'], /ryflowan/, /ryflowan/],
  // --- SZAFKI NOCNE ---
  ['Szafka nocna dąb', L5+'||Szafki nocne', ['Szafki nocne'], /dab|artisan/, /szafka nocna dab|nocna debowa/],
  ['Szafka nocna biała', L5+'||Szafki nocne', ['Szafki nocne'], /bial/, /szafka nocna biala/],
  ['Szafka nocna czarna', L5+'||Szafki nocne', ['Szafki nocne'], /czarn/, /szafka nocna czarna/],
  ['Szafka nocna wisząca', L5+'||Szafki nocne', ['Szafki nocne'], /wiszac/, /szafka nocna wiszaca|nocna wiszaca/],
  // --- MATERACE wg rozmiaru ---
  ['Materac 90x200', L5+'||Materace', ['Materace i dopłaty'], /90x200/, /materac 90x200/],
  ['Materac 120x200', L5+'||Materace', ['Materace i dopłaty'], /120x200/, /materac 120x200/],
  ['Materac 140x200', L5+'||Materace', ['Materace i dopłaty'], /140x200/, /materac 140x200/],
  ['Materac 160x200', L5+'||Materace', ['Materace i dopłaty'], /160x200/, /materac 160x200/],
  ['Materac kieszeniowy', L5+'||Materace', ['Materace i dopłaty'], /kieszeniow/, /materac kieszeniowy/],
  // --- SZAFKI RTV: kolor/styl ---
  ['RTV dąb', L6+'||Szafki RTV', ['Szafki RTV'], /dab|artisan/, /szafka rtv dab|rtv dab/],
  ['RTV biała', L6+'||Szafki RTV', ['Szafki RTV'], /bial/, /szafka rtv biala|rtv biala/],
  ['RTV czarna', L6+'||Szafki RTV', ['Szafki RTV'], /czarn/, /szafka rtv czarna|rtv czarna/],
  ['RTV loft', L6+'||Szafki RTV', ['Szafki RTV'], /loft|metalow/, /szafka rtv loft|rtv industrialn|rtv loft/],
  ['RTV skandynawska', L6+'||Szafki RTV', ['Szafki RTV'], /skandynaw/, /rtv skandynaw/],
  ['RTV z półkami / wisząca', L6+'||Szafki RTV', ['Szafki RTV'], /polk|wiszac/, /szafka rtv wiszaca|rtv z polkami/],
  // --- STOLIKI KAWOWE ---
  ['Stolik okrągły', L6+'||Stoliki kawowe / ławy', ['Stoliki kawowe / ławy'], /okragl/, /stolik kawowy okragly|stolik okragly/],
  ['Stolik dąb', L6+'||Stoliki kawowe / ławy', ['Stoliki kawowe / ławy'], /dab|artisan/, /stolik kawowy dab|stolik kawowy drewnian/],
  ['Stolik marmur', L6+'||Stoliki kawowe / ławy', ['Stoliki kawowe / ławy'], /marmur/, /stolik.*marmur/],
  ['Zestaw stolików', L6+'||Stoliki kawowe / ławy', ['Stoliki kawowe / ławy'], /zestaw/, /zestaw stolikow|komplet stolikow/],
  // --- STOŁY ---
  ['Stół okrągły', L6+'||Stoły jadalniane', ['Stoły (jadalnia)'], /okragl/, /stol okragly|okragly stol/],
  ['Stół rozkładany', L6+'||Stoły jadalniane', ['Stoły (jadalnia)'], /rozkladan/, /stol rozkladany/],
  ['Stół marmur', L6+'||Stoły jadalniane', ['Stoły (jadalnia)'], /marmur/, /stol marmur|stol .*marmurowy/],
  // --- KANAPY / FOTELE ---
  ['Z funkcją spania', L6+'||Kanapy / narożniki / sofy', ['Kanapy/narożniki/sofy'], /spania|funkcja/, /z funkcja spania|kanapa z funkcja spania/],
  ['Narożnik', L6+'||Kanapy / narożniki / sofy', ['Kanapy/narożniki/sofy'], /naroznik/, /narozniki do salonu|naroznik rozkladany|kanapa narozna/],
  ['Zestaw puf', L6+'||Fotele / pufy', ['Fotele/pufy/ławki'], /puf/, /zestaw puf|pufy do salonu|komplet puf/],
  // --- BIURKA ---
  ['Biurko komputerowe', L2+'||Biurka dziecięce i proste', ['Biurka (dziecięce/proste)'], /komputerow/, /biurka komputerowe|biurko komputerowe/],
  ['Biurko z szufladami', L2+'||Biurka dziecięce i proste', ['Biurka (dziecięce/proste)'], /szuflad/, /biurko z szufladami|biurka z szufladami/],
  // --- REGAŁY ---
  ['Regał na książki', L6+'||Regały', ['Regały'], /ksiazk/, /regal na ksiazki/],
  ['Regał dąb', L6+'||Regały', ['Regały'], /dab|artisan|craft/, /regal dab|regal debowy/],
  ['Regał na zabawki', L6+'||Regały', ['Regały'], /zabawk|loni/, /regal na zabawki/],
  // --- ŁAZIENKA rozbicie ---
  ['Szafka pod umywalkę', L7+'||Zabudowa łazienka/kuchnia (szafki, słupki, blaty)', ['Łazienka/kuchnia - zabudowa'], /umywalk/, /szafka pod umywalke|pod umywalke/],
  ['Słupek łazienkowy', L7+'||Zabudowa łazienka/kuchnia (szafki, słupki, blaty)', ['Łazienka/kuchnia - zabudowa'], /slupek/, /slupek lazienkowy|slupek kuchenny|slupek/],
  ['Blat roboczy', L7+'||Zabudowa łazienka/kuchnia (szafki, słupki, blaty)', ['Łazienka/kuchnia - zabudowa'], /blat/, /blat kuchenny|blat pod umywalke|blat roboczy/],
  ['Szafka z lustrem', L7+'||Zabudowa łazienka/kuchnia (szafki, słupki, blaty)', ['Łazienka/kuchnia - zabudowa'], /lustr/, /szafka z lustrem|lustro lazienkowe/],
  // --- ITER 3-7: nowe kandydaty z deep-breakdown ---
  ['Łóżko z pojemnikiem', L1+'||Łóżka podwójne / dla rodzeństwa', ['Łóżka podwójne dziecięce/rozsuwane'], /pojemnik/, /lozko.*z pojemnikiem|lozeczko.*pojemnik/],
  ['Łóżko dla dziewczynki', L1+'||Łóżka bajkowe / z grafiką', BED, /dziewczynk|rozow/, /lozko dla dziewczynki|lozko.*dziewczynk/],
  ['Łóżko dla chłopca', L1+'||Łóżka bajkowe / z grafiką', BED, /chlopc|niebiesk/, /lozko dla chlopca|lozko.*chlopc/],
  ['Łóżko auto / traktor', L1+'||Łóżka bajkowe / z grafiką', BED, /auto|traktor|samochod|policja/, /lozko auto|lozko samochod|lozko traktor/],
  ['Łóżko zwierzęta / jednorożec', L1+'||Łóżka bajkowe / z grafiką', BED, /animals|bear|bunny|kotek|jednorozec|zajac/, /lozko jednorozec|lozko kotek|lozko.*zwierz/],
  ['Biurko białe', L2+'||Biurka dziecięce i proste', ['Biurka (dziecięce/proste)'], /bial/, /biurko biale|biale biurko/],
  ['Biurko dąb', L2+'||Biurka dziecięce i proste', ['Biurka (dziecięce/proste)'], /dab|artisan/, /biurko dab|biurko debowe/],
  ['Stół dąb', L6+'||Stoły jadalniane', ['Stoły (jadalnia)'], /dab|artisan/, /stol dab|stol debowy|stol.*dab artisan/],
  ['Stół czarny', L6+'||Stoły jadalniane', ['Stoły (jadalnia)'], /czarn/, /stol czarny/],
  ['Ława do salonu', L6+'||Stoliki kawowe / ławy', ['Stoliki kawowe / ławy'], /lawa/, /lawa do salonu|lawa /],
  ['Stolik czarny', L6+'||Stoliki kawowe / ławy', ['Stoliki kawowe / ławy'], /czarn/, /stolik.*czarny|czarny stolik/],
  ['RTV na nóżkach', L6+'||Szafki RTV', ['Szafki RTV'], /nogi|nozk/, /szafka rtv na nozkach|rtv na nozkach|rtv na nogach/],
  ['Regał dąb', L6+'||Regały', ['Regały'], /dab|artisan|craft/, /regal dab|regal debowy/],
  ['Regał biały', L6+'||Regały', ['Regały'], /bial/, /regal bialy|bialy regal/],
  ['Garderoba na wymiar', L5+'||Garderoby', ['Garderoby / szafy wielofunkcyjne'], /garderob|veno|malmo/, /garderoba na wymiar|szafa garderoba|garderoba/],
];

function kobiCount(parents, re){
  let n=0; const ex=[];
  parents.forEach(p=>(byBucket[p]||[]).forEach(s=>{ if(re.test(s)){n++; if(ex.length<3)ex.push(s);} }));
  return {n, ex};
}
function deburr(s){return s.replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
async function loadComp(file){
  const wb=new ExcelJS.Workbook(); await wb.xlsx.readFile(file);
  const ws=wb.worksheets[0]; const arr=[];
  ws.eachRow((row,i)=>{ if(i===1)return; const kw=(row.getCell(1).value||'').toString().toLowerCase(); let v=row.getCell(2).value; v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0; if(kw)arr.push([kw,deburr(kw),v]); });
  return arr;
}
const comp = [
  ...(await loadComp('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx')),
  ...(await loadComp('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx')),
];
function compVol(re){
  let vol=0,n=0; const top=[];
  for(const [kw,kwN,v] of comp){ if(re.test(kwN)){vol+=v;n++;top.push([kw,v]);} }
  top.sort((a,b)=>b[1]-a[1]);
  return {vol,n,top:top.slice(0,3)};
}
function fmtVol(v){ return v>=1000?(v/1000).toFixed(v>=10000?0:1).replace('.0','')+'k':String(v); }

let out='# Weryfikacja podkategorii (3. poziom) z konkurencją — pełna (2026-06-20)\n\n';
out+='Próg: PEŁNA = KOBI ≥10 prod. i popyt ≥3000/mc · filtr SEO = KOBI ≥5 i popyt ≥1000 · reszta odrzucona.\n\n';
out+='| Podkategoria | Kategoria | KOBI | Popyt | Top frazy konkurencji | Werdykt |\n|---|---|---|---|---|---|\n';
const approved={};
for(const [name,leafKey,parents,reS,reK] of SUB){
  const k=kobiCount(parents,reS); const c=compVol(reK);
  let kind=null;
  if(k.n>=10 && c.vol>=3000) kind='full';
  else if(k.n>=5 && c.vol>=1000) kind='filtr';
  const verdict = kind==='full'?'✅ PEŁNA':kind==='filtr'?'◑ filtr SEO':(k.n<3?'✕ za mało towaru':'◔ słaby popyt');
  const tops=c.top.map(([w,v])=>`${w} (${v})`).join('; ')||'-';
  out+=`| ${name} | ${leafKey.split('||')[1]} | ${k.n} | ${c.vol} | ${tops} | ${verdict} |\n`;
  if(kind){ (approved[leafKey]=approved[leafKey]||[]).push({n:name,p:reS.source,v:fmtVol(c.vol),k:kind}); }
}
fs.writeFileSync('strategia/weryfikacja-subkategorii-2026-06-20.md', out);
fs.writeFileSync('strategia/subcats-approved.json', JSON.stringify(approved,null,1));
const full=Object.values(approved).flat().filter(s=>s.k==='full').length;
const filt=Object.values(approved).flat().filter(s=>s.k==='filtr').length;
console.log('Kandydatów:', SUB.length, '| PEŁNYCH:', full, '| filtrów:', filt, '| odrzuconych:', SUB.length-full-filt);
console.log('Eksport: strategia/subcats-approved.json');

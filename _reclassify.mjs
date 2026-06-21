import fs from 'fs';

const csv = fs.readFileSync('produkty-mapowanie-2026-06-15.csv','utf8').trim().split(/\r?\n/);
csv.shift();
const rows = [];
for(const line of csv){
  const m = line.match(/^"?([^,"]+)"?,"?(.*?)"?,"?(.*?)"?$/);
  if(!m) continue;
  rows.push({url:m[1].trim(), slug:m[2].trim().toLowerCase().replace(/^"|"$/g,''), bucketOld:m[3].trim()});
}

// klasyfikacja po GLOWNYM typie (poczatek sluga). Kolejnosc: najbardziej specyficzne pierwsze.
// zwraca nazwe kosza zgodna z DRZEWO-MENU-FINAL.
function classify(s){
  // akcesoria - tylko realne uchwyty/galki jako PRODUKT glowny
  if(/^drewniany-uchwyt|^drewniana-galka|^uchwyt-meblowy|^galka-meblowa|-lui-\d/.test(s)) return 'Akcesoria meblowe (uchwyty/gałki)';
  if(/^noga-|^nozka-/.test(s)) return 'Akcesoria meblowe (uchwyty/gałki)';
  // zwierzeta
  if(/^drapak|drapak-dla-kota|^legowisko/.test(s)) return 'Akcesoria dla zwierząt';
  // LOZKA wg podtypu
  if(/^lozko.*pietrow|^lozko-pietrowe/.test(s)) return 'Łóżka piętrowe';
  if(/^lozko.*mlodziezow/.test(s)) return 'Łóżka młodzieżowe';
  if(/^lozko.*(montessori|niskie|podlogow)/.test(s)) return 'Łóżko Montessori/podłogowe';
  if(/^lozko.*domek|^lozko-domek/.test(s)) return 'Łóżko domek';
  if(/^lozko.*(podwojn|-ii-|rozsuwan|wysuwan|rodzenstw|pietro)/.test(s)) return 'Łóżka podwójne dziecięce/rozsuwane';
  if(/^lozko.*(tapicerowan|kontynentaln|dwuosobowe-tapic)/.test(s)) return 'Łóżka tapicerowane/panele';
  if(/^lozko-dwuosobowe(?!.*dzieci)/.test(s)) return 'Łóżka dwuosobowe (sypialnia)';
  if(/^samochod-lozko/.test(s) || /^lozko.*(grafik|goal|animals|bear|bunny|jednorozec|auto|traktor|policja|kotek|kareta|pilka-nozna|ksiezniczk|princess)/.test(s)) return 'Łóżka dziecięce grafika/bajkowe';
  if(/^lozko-dzieciece|^lozko-pojedyncze|^lozko-jednoosobow|^lozeczko/.test(s)) return 'Łóżka dziecięce klasyczne';
  if(/^lozko/.test(s)) return 'Łóżka inne';
  // KOMODY
  if(/^komoda.*(goal|grafik|animals|bear|bunny|jednorozec|auto-)/.test(s)) return 'Komody z grafiką';
  if(/^komoda/.test(s)) return 'Komody (ogólne)';
  if(/^nakastlik/.test(s)) return 'Szafki nocne';
  // SZAFKI nocne
  if(/^szafka-nocna|^stolik-nocny|^szafka.*nocn/.test(s)) return 'Szafki nocne';
  // RTV
  if(/^szafka-rtv|^szafka.*rtv|^komoda-rtv|^zestaw.*rtv|^zestaw-mebli-do-salonu/.test(s)) return 'Szafki RTV';
  // LAZIENKA/KUCHNIA zabudowa
  if(/slupek|^blat|pod-blat|^obudowa-pralki|kosz-na-pranie|lavia|^szafka.*(umywalk|pralk|lazienkow|nova|elia|ariel|lavia|boni|ovalia|wysoka|wisz)|^szafka-stojaca|^szafka-gorna|^szafka-dolna|^elegance|^zestaw-mebli-lazienkow|zestaw.*lazienk/.test(s)) return 'Łazienka/kuchnia - zabudowa';
  if(/^pomocnik|kitchen-helper/.test(s)) return 'Pomocniki kuchenne';
  // BUTY / PRZEDPOKOJ
  if(/^szafka-na-buty|na-buty|^szafa-na-buty|^komoda-na-buty/.test(s)) return 'Szafki na buty';
  if(/^wieszak/.test(s)) return 'Wieszaki';
  if(/^konsola|^przedpokoj|^zestaw.*przedpokoj|^garderoba.*przedpokoj/.test(s)) return 'Przedpokój (zestawy/konsole)';
  // SZAFY / GARDEROBY
  if(/^szafa-dzieciec|^szafa.*(stella|duno|meli)/.test(s)) return 'Szafy dziecięce';
  if(/^garderoba|wielofunkcyjn|veno|malmo-szaf/.test(s)) return 'Garderoby / szafy wielofunkcyjne';
  if(/^szafa/.test(s)) return 'Szafy (ogólne)';
  // BIURKA
  if(/^biurko.*naroz|^biurko-narozne/.test(s)) return 'Biurka narożne';
  if(/^biurko.*(elektr|regulowan|podnoszon|rosnac)/.test(s)) return 'Biurka regulowane/elektryczne';
  if(/^biurko.*gaming|^biurko.*chowane|^biurko.*rozkladan/.test(s)) return 'Biurka rozkładane/chowane (VERTO)';
  if(/^biurko/.test(s)) return 'Biurka (dziecięce/proste)';
  // REGALY
  if(/^regal/.test(s)) return 'Regały';
  // STOLY / STOLIKI / LAWY
  if(/^stol-barowy|^taboret|^hoker/.test(s)) return 'Taborety / hokery barowe';
  if(/^stolik-kawowy|^stolik.*kawow|^lawa-/.test(s)) return 'Stoliki kawowe / ławy';
  if(/^stolik.*(dzieci|timi)|^zestaw.*(timi|stolik.*krzesel)/.test(s)) return 'Stoliki+krzesełka dziecięce';
  if(/^stol/.test(s)) return 'Stoły (jadalnia)';
  // KRZESLA
  if(/^krzeslo.*(obrotow|gaming|biurow)|^fotel.*(biurow|gaming|obrotow)/.test(s)) return 'Krzesła/biurka gamingowe';
  if(/^krzeslo.*(lumi|ergonom)|^krzeselko|^krzeslo-dzieci/.test(s)) return 'Krzesła dziecięce ergonomiczne';
  if(/^krzeslo/.test(s)) return 'Krzesła (jadalnia/obrotowe)';
  // FOTELE / KANAPY
  if(/^fotel|^pufa|^puf-|^lawka/.test(s)) return 'Fotele/pufy/ławki';
  if(/^kanapa|^naroznik|^sofa|^wersalka/.test(s)) return 'Kanapy/narożniki/sofy';
  // POLKI / SKRZYNIE
  if(/^polka|^polki|^zestaw-polek|shelf/.test(s)) return 'Półki / dla dzieci';
  if(/^skrzynia/.test(s)) return 'Skrzynie na zabawki';
  // MATERACE
  if(/^materac|^naklad|^doplat|^stelaz|^pokrowiec/.test(s)) return 'Materace i dopłaty';
  // TOALETKI
  if(/^toaletka/.test(s)) return 'Toaletki';
  // BARIERKI
  if(/^barierka|^bariera/.test(s)) return 'Barierki/stelaże';
  // POLKOTAPCZAN
  if(/^polkotapczan|tapczan/.test(s)) return 'Półkotapczany (VERTO)';
  // OGROD
  if(/^zestaw.*ogrod|ogrodow|technorattan|rattan|^lawka-ogrod/.test(s)) return 'Meble ogrodowe';
  // zestawy i przymiotnik-na-poczatku
  if(/^zestaw.*puf|^zestaw-2-puf/.test(s)) return 'Fotele/pufy/ławki';
  if(/^zestaw.*stolik/.test(s)) return 'Stoliki kawowe / ławy';
  if(/^zestaw.*polek/.test(s)) return 'Półki / dla dzieci';
  if(/^okragly-stol|^stol/.test(s)) return 'Stoły (jadalnia)';
  if(/^wieza.*kot|dla-kota/.test(s)) return 'Akcesoria dla zwierząt';
  if(/^emma$|^luk(-|$)/.test(s)) return 'Łóżka dziecięce klasyczne';
  return '??? NIEROZPOZNANE';
}

let moved=0, unrec=0;
const moves={}; const unrecList=[];
const newByBucket={};
for(const r of rows){
  r.bucketNew = classify(r.slug);
  if(r.bucketNew==='??? NIEROZPOZNANE'){ unrec++; unrecList.push(r.slug); }
  if(r.bucketNew!==r.bucketOld){ moved++; const k=r.bucketOld+'  →  '+r.bucketNew; moves[k]=(moves[k]||0)+1; }
  (newByBucket[r.bucketNew]=newByBucket[r.bucketNew]||[]).push(r);
}

let out='# Reklasyfikacja per-produkt po GŁÓWNYM typie (2026-06-19)\n\n';
out+=`Produktów: ${rows.length} · przeniesionych vs auto-mapowanie: **${moved}** (${((moved/rows.length)*100).toFixed(1)}%) · nierozpoznanych: ${unrec}\n\n`;
out+='## Największe przeniesienia (stary kosz → nowy)\n\n| Ruch | Szt. |\n|---|---|\n';
Object.entries(moves).sort((a,b)=>b[1]-a[1]).slice(0,40).forEach(([k,v])=>out+=`| ${k} | ${v} |\n`);
out+='\n## Nowy rozkład per kosz (po korekcie)\n\n| Kosz | Stary | Nowy | Δ |\n|---|---|---|---|\n';
const oldCounts={}; rows.forEach(r=>oldCounts[r.bucketOld]=(oldCounts[r.bucketOld]||0)+1);
const allK=new Set([...Object.keys(oldCounts),...Object.keys(newByBucket)]);
[...allK].sort((a,b)=>(newByBucket[b]?.length||0)-(newByBucket[a]?.length||0)).forEach(k=>{
  const o=oldCounts[k]||0, n=newByBucket[k]?.length||0, d=n-o;
  out+=`| ${k} | ${o} | ${n} | ${d>0?'+':''}${d} |\n`;
});
if(unrec){ out+='\n## Nierozpoznane (do ręcznego przypisania)\n\n'; unrecList.forEach(s=>out+=`- ${s}\n`); }

fs.writeFileSync('strategia/reklasyfikacja-2026-06-19.md', out);
// zapisz poprawione mapowanie
let cm='url,slug,kategoria_stara,kategoria_nowa,zmiana\n';
rows.forEach(r=>{cm+=`${r.url},${r.slug},"${r.bucketOld}","${r.bucketNew}",${r.bucketNew!==r.bucketOld?'TAK':''}\n`;});
fs.writeFileSync('produkty-mapowanie-POPRAWIONE-2026-06-19.csv', cm);
// czysty 3-kolumnowy dla generatora mega-menu
let clean='url,slug,kategoria_nowa\n';
rows.forEach(r=>{clean+=`${r.url},"${r.slug}","${r.bucketNew}"\n`;});
fs.writeFileSync('produkty-mapowanie-FINAL-2026-06-19.csv', clean);
console.log('Przeniesionych:', moved, '/', rows.length, '| nierozpoznanych:', unrec);
console.log('Pliki: strategia/reklasyfikacja-2026-06-19.md + produkty-mapowanie-POPRAWIONE-2026-06-19.csv');

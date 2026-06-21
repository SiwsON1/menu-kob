import fs from 'fs';

const csv = fs.readFileSync('produkty-mapowanie-2026-06-15.csv','utf8').trim().split(/\r?\n/);
csv.shift();
const rows = [];
for(const line of csv){
  const m = line.match(/^([^,]+),([^,]*),"?(.*?)"?$/);
  if(!m) continue;
  rows.push({url:m[1].trim(), slug:m[2].trim().toLowerCase(), bucket:m[3].trim()});
}

// sygnatura: tokeny ktore POWINNY wystapic w slugu produktu danego kosza (dopasowanie pozytywne)
const SIG = {
  'Łazienka/kuchnia - zabudowa': /lazienk|umywalk|pralk|slupek|blat|kuchen|szafka-pod|nad-pralk|ariel|elia|nova|lavia|boni|ovalia|wc|toaletowa|lustro/,
  'Łóżka dziecięce grafika/bajkowe': /lozk|lozeczk|domek|autk|traktor|kotek|kareta|samochod|bajk|grafik|jednorozec|chmurk/,
  'Komody (ogólne)': /komod/,
  'Szafki RTV': /rtv|tv|pod-telewizor|telewizyjn/,
  'Stoliki kawowe / ławy': /stolik|lawa|kawow|okragl/,
  'Materace i dopłaty': /materac|doplat|stelaz|naklad/,
  'Regały': /regal/,
  'Łóżka podwójne dziecięce/rozsuwane': /podwojn|rozsuwan|wysuwan|rodzenstw/,
  'Biurka (dziecięce/proste)': /biurk/,
  'Szafki nocne': /nocn|szafka-nocna/,
  'Stoły (jadalnia)': /stol|stol-/,
  'Akcesoria meblowe (uchwyty/gałki)': /uchwyt|galk|nozk|front|lui/,
  'Meble ogrodowe': /ogrod|tarasow|technorattan|aluminiow|balkon|rattan/,
  'Kanapy/narożniki/sofy': /kanap|naroznik|sofa|wersalk/,
  'Fotele/pufy/ławki': /fotel|pufa|puf-|lawk|siedzisk/,
  'Półki / dla dzieci': /polk|polka|lewit|chmurk|serc/,
  'Szafki na buty': /buty|obuwie|szafka-na-but/,
  'Skrzynie na zabawki': /skrzyni|zabawk/,
  'Łóżko Montessori/podłogowe': /montessori|podlogow|lozk/,
  'Łóżka piętrowe': /pietrow|antresol|karol|aurelia/,
  'Biurka regulowane/elektryczne': /regulowan|elektr|podnoszon|rosnac|flexi|eliss/,
  'Szafy (ogólne)': /szaf/,
  'Krzesła (jadalnia/obrotowe)': /krzesl|krzeslo|obrotow|taboret|hoker/,
  'Garderoby / szafy wielofunkcyjne': /garderob|veno|malmo|wielofunkcyjn/,
  'Łóżka dziecięce klasyczne': /lozk|lozeczk/,
  'Półkotapczany (VERTO)': /polkotapczan|verto|tapczan/,
  'Łóżka młodzieżowe': /mlodziezow|helios|julia|alex/,
  'Stoliki+krzesełka dziecięce': /stolik|krzesel|zestaw-dzieci/,
  'Krzesła dziecięce ergonomiczne': /krzesl|krzesel|lumi|ergonom/,
  'Biurka narożne': /biurk|naroz/,
  'Szafy dziecięce': /szaf|stella|duno|meli/,
  'Akcesoria dla zwierząt': /drapak|kot|zwierz|tuba|legowisk/,
  'Toaletki': /toaletk/,
  'Przedpokój (zestawy/konsole)': /przedpokoj|konsol|garderob|zestaw|komplet/,
  'Łóżka dwuosobowe (sypialnia)': /lozk|dwuosobow|160x200|140x200/,
  'Taborety / hokery barowe': /taboret|hoker|barow/,
  'Łóżko domek': /domek/,
  'Łóżka inne': /lozk|lozeczk/,
  'Krzesła/biurka gamingowe': /gaming|gamingow/,
  'Komody z grafiką': /komod/,
  'Barierki/stelaże': /barierk|stelaz/,
  'Łóżka tapicerowane/panele': /tapicerowan|panel|zaglowek/,
  'Biurka rozkładane/chowane (VERTO)': /biurk|rozkladan|chowan|verto/,
  'Wieszaki': /wieszak/,
  'Pomocniki kuchenne': /pomocnik|kuchen|helper/,
};

// 1) QA dopasowania
const byBucket = {};
rows.forEach(r=>{(byBucket[r.bucket]=byBucket[r.bucket]||[]).push(r);});
let out = '# QA mapowania produkt->kategoria + kopanie pod nowe kategorie (2026-06-19)\n\n';
out += `Produktów: ${rows.length} · koszy: ${Object.keys(byBucket).length}\n\n## 1. Dopasowanie slug->kosz (flaga podejrzanych)\n\n| Kosz | Prod. | Pasuje | Podejrzane | % pewności | Przykłady podejrzanych |\n|---|---|---|---|---|---|\n`;
let totalSusp=0;
const suspectList=[];
for(const [b,list] of Object.entries(byBucket).sort((a,b)=>b[1].length-a[1].length)){
  const sig = SIG[b];
  let ok=0, susp=[];
  list.forEach(r=>{
    if(sig && sig.test(r.slug)) ok++; else susp.push(r.slug);
  });
  totalSusp+=susp.length;
  susp.forEach(s=>suspectList.push({bucket:b,slug:s}));
  const pct = ((ok/list.length)*100).toFixed(0);
  out += `| ${b} | ${list.length} | ${ok} | ${susp.length} | ${pct}% | ${susp.slice(0,4).join('; ')||'-'} |\n`;
}
out += `\n**Podejrzanych łącznie: ${totalSusp} / ${rows.length} (${((totalSusp/rows.length)*100).toFixed(1)}%)**\n`;

// pełna lista podejrzanych do recznego przejrzenia
out += `\n### Pełna lista podejrzanych (slug nie zawiera tokenu sygnatury kosza)\n\n`;
const suspByBucket={};
suspectList.forEach(s=>{(suspByBucket[s.bucket]=suspByBucket[s.bucket]||[]).push(s.slug);});
for(const [b,slugs] of Object.entries(suspByBucket).sort((a,b)=>b[1].length-a[1].length)){
  out += `**${b}** (${slugs.length}):\n`;
  slugs.forEach(s=>out+=`- ${s}\n`);
  out+='\n';
}

// 2) Kopanie pod nowe (pod)kategorie: czeste tokeny wewnatrz kosza
out += `\n## 2. Kandydaci na nowe (pod)kategorie — częste tokeny w slugach kosza (próg >=5)\n\n`;
const STOP = new Set(['lozko','lozeczko','komoda','szafka','biurko','regal','stol','stolik','krzeslo','fotel','szafa','meble','meblekobi','pl','do','z','i','na','dla','w','o','pokoju','dzieciece','dzieciecy','dzieciecych','bialy','biala','biale','kobi','html','pokoj','set','model']);
for(const [b,list] of Object.entries(byBucket).sort((a,b)=>b[1].length-a[1].length)){
  const tok={};
  list.forEach(r=>{
    const parts = r.slug.replace(/\.html?$/,'').replace(/-\d+$/,'').split(/[-_]/).filter(Boolean);
    const seen=new Set();
    parts.forEach(p=>{
      if(p.length<3||STOP.has(p)||/^\d+$/.test(p)) return;
      if(seen.has(p))return; seen.add(p);
      tok[p]=(tok[p]||0)+1;
    });
    // wymiary jako osobny sygnal
    const dim = r.slug.match(/\d{2,3}x\d{2,3}/g)||[];
    dim.forEach(d=>{ if(!seen.has(d)){seen.add(d); tok[d]=(tok[d]||0)+1;} });
  });
  const cand = Object.entries(tok).filter(([k,v])=>v>=5).sort((a,b)=>b[1]-a[1]);
  if(cand.length){
    out += `**${b}** (${list.length} prod.): ${cand.map(([k,v])=>`${k}=${v}`).join(' · ')}\n\n`;
  }
}

fs.writeFileSync('strategia/QA-mapowanie-2026-06-19.md', out);
console.log('OK. Podejrzanych:', totalSusp, '/', rows.length, `(${((totalSusp/rows.length)*100).toFixed(1)}%)`);
console.log('Plik: strategia/QA-mapowanie-2026-06-19.md, dlugosc', out.length);

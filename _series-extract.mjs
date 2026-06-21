import fs from 'fs';
const csv = fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);
csv.shift();
const rows=[];
for(const line of csv){const m=line.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)rows.push({slug:m[2].toLowerCase(),bucket:m[3]});}

// stoplista: typy, kolory, materialy, rozmiary, cechy, generyki
const STOP=new Set('lozko lozeczko komoda szafka szafa biurko regal stol stolik krzeslo krzeselko fotel pufa pufy kanapa naroznik sofa polka polki skrzynia materac toaletka wieszak slupek blat drapak lawa lawka taboret hoker garderoba konsola barierka stelaz polkotapczan nakastlik zestaw komplet mebli meble do dla na z i o w pod nad ii iii bialy biala biale bialym czarny czarna czarne czarnym szary szara szare szarym dab debowy debowa orzech sonoma artisan craft kaszmir kremowy bezowy bezowa zloty zlote zielony zielona rozowy rozowe niebieski grafit antracyt naturalny naturalne drewniany drewniane drewna dwudrzwiowa dwudrzwiowy trzydrzwiowa jednodrzwiowa szuflada szuflady szufladami szuflad drzwi drzwiczki polkami polka noga nogi nozkach nozki nozka metalowe metalowych skandynawska skandynawski skandynawskim loft industrialny mat polysk wysoka wysoki niski niskie nowoczesny nowoczesna male maly duza duze dwa trzy cztery osob osobowe osobowy jednoosobowy dwuosobowe podwojne pojedyncze pietrowe mlodziezowe dzieciece dzieciecy dzieciecych dziecka pokoju pokoj nastolatka chlopca dziewczynki dziewczynka kolor kolorze cm mm szt szer wys gleb prawe lewe prawostronne lewostronne lewy prawy stronny stronne wiszaca wiszacy stojaca stojaca otwarty zamkniety rozkladany rozkladane rozsuwane wysuwane skladany skladane chowane regulowane elektryczne podnoszone komputerowe gamingowe narozne narozna kawowy kawowa rtv tv telewizor jadalni jadalnia salonu salon sypialni sypialnia lazienkowa lazienkowy lazienki kuchenny kuchenna kuchni umywalke umywalka pralke pralki obudowa kosz pranie lustrem lustro grafika grafika nadrukiem nadruk z-grafika bajkowe domek montessori podlogowe niskie barierka materacem materaca bez ze ergonomiczne obrotowe biurowe gaming barowy barowe na-buty buty obuwie ogrodowy ogrodowe ogrodowych ogrodzie tarasowy technorattan rattan aluminiowe balkon poduszki poduszka recznie auto autko traktor policja kotek kareta jednorozec animals bear bunny pilka nozna serduszka serca chmurki ksiezniczka princess goal sweet primo lofto bunny biale white red green ciemny ciemne miodowy braz brazu cappuccino popielaty granatowy bordowy szmaragd jadeit opal syriusz turkusowy szampan buk laura nordic nordi forest royal diamond evoke linea berga roni ercol nicole sofen focus2'.split(/\s+/));

const tok={};
for(const r of rows){
  const parts=r.slug.replace(/\.html?$/,'').replace(/-\d+$/,'').split(/[-_]/).filter(Boolean);
  const seen=new Set();
  for(const p of parts){
    if(p.length<3||/\d/.test(p)||STOP.has(p))continue;
    if(seen.has(p))continue; seen.add(p);
    (tok[p]=tok[p]||{n:0,buckets:{}});
    tok[p].n++; tok[p].buckets[r.bucket]=(tok[p].buckets[r.bucket]||0)+1;
  }
}
// serie = tokeny >=4 wystapien
const series=Object.entries(tok).filter(([k,v])=>v.n>=4).sort((a,b)=>b[1].n-a[1].n);
let out='# Serie produktowe KOBI (do warstwy Kolekcje) — 2026-06-20\n\n';
out+=`Wykryte serie (≥4 produkty), token w slugu. Razem kandydatów: ${series.length}\n\n`;
out+='| Seria | Prod. | Główne kategorie |\n|---|---|---|\n';
for(const [k,v] of series){
  const tops=Object.entries(v.buckets).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([b,c])=>`${b} (${c})`).join('; ');
  out+=`| ${k.toUpperCase()} | ${v.n} | ${tops} |\n`;
}
fs.writeFileSync('strategia/serie-produktowe-2026-06-20.md', out);
console.log('Serii (≥4 prod.):', series.length);
console.log('TOP20:', series.slice(0,20).map(([k,v])=>`${k}:${v.n}`).join(' '));

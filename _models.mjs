import fs from 'fs';
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const rows=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)rows.push({s:m[2].toLowerCase(),b:m[3]});}
const STOP=new Set('lozko lozeczko komoda szafka szafa biurko regal stol stolik krzeslo krzeselko fotel pufa pufy kanapa naroznik sofa polka polki skrzynia toaletka wieszak slupek blat drapak lawa lawka taboret hoker garderoba konsola barierka stelaz polkotapczan nakastlik zestaw komplet mebli meble dzieciece dzieciecy podwojne pojedyncze pietrowe mlodziezowe rtv nocna nocny do dla na z i pod nad samochod wiszaca stojaca'.split(/\s+/));
const COL=/^(bialy|biala|biale|czarny|czarna|czarne|szary|szara|szare|dab|debowy|rozowy|rozowa|rozowe|naturalny|naturalne|grafit|kaszmir|sonoma|artisan|craft|wotan|niebieski|niebieska|zielony|zielona|oliwkowy|kolor|kolorze|grafika|barierka|szuflada|szuflady|materac|materacem|uchwyty|bez|ze|serii|white|mat|polysk|lakierowany)$/;
const models={};
for(const r of rows){
  const parts=r.s.replace(/\.html?$/,'').replace(/-\d+$/,'').split(/[-_]/).filter(Boolean);
  let model=null;
  for(const p of parts){ if(p.length>=3 && !STOP.has(p) && !/\d/.test(p) && !COL.test(p)){ model=p; break; } }
  if(!model) model='(bez-nazwy)';
  const type=parts[0];
  const key=type+' '+model;
  if(!models[key]) models[key]={n:0,ex:r.s};
  models[key].n++;
}
const sorted=Object.entries(models).sort((a,b)=>b[1].n-a[1].n);
let out='# Lista unikalnych modeli KOBI do Google-audytu per-produkt\n\n';
out+=`Modeli: ${sorted.length}\n\n| Model (typ + nazwa) | Sztuk (warianty) | Przykład |\n|---|---|---|\n`;
sorted.forEach(([k,v])=>out+=`| ${k} | ${v.n} | ${v.ex} |\n`);
fs.writeFileSync('strategia/modele-do-audytu.md',out);
console.log('Modeli:',sorted.length);
sorted.slice(0,50).forEach(([k,v])=>console.log('  '+v.n+'\t'+k));

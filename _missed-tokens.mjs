import fs from 'fs';
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({s:m[2].toLowerCase(),b:m[3]});}

// wszystko co JUZ zlapane jako podkategoria (biblioteka atrybutow z _decompose-all)
const COVERED=/bial|czarn|dab|artisan|sonoma|craft|wotan|szar|rozow|kaszmir|niebiesk|zielon|oliwk|160x80|140x70|180x80|90x200|200x90|120x200|140x200|160x200|80x160|80x180|auto|samochod|policja|wyscig|traktor|jednorozec|kotek|mis|zajac|sowa|animal|bear|bunny|panda|ksiezniczk|princess|korona|zamek|serc|serduszk|domek|gwiazd|skandynaw|scandi|loft|industrial|metalow|ryflowan|glamour|velvet|nowoczesn|barierk|szuflad|pojemnik|materac|nogi|nozk|wiszac|regulowan|elektr|podnoszon|rozkladan|naroz|okragl|marmur|welur|spania|komputerow|gaming|nadstaw|lustr|polk|umywalk|slupek|blat|pralk|dziewczynk|chlopc/;
// typy + generyki + jednostki (ignorujemy)
const STOP=new Set('lozko lozeczko komoda szafka szafa biurko regal stol stolik krzeslo krzeselko fotel pufa pufy kanapa naroznik sofa polka skrzynia toaletka wieszak drapak lawa lawka taboret hoker garderoba konsola stelaz polkotapczan nakastlik zestaw komplet mebli meble do dla na z i o w pod nad ii iii bez kolor kolorze cm mm szt drewno drewniany drewniane drewna naturalny naturalne lakierowany bialy biala biale dzieciece dzieciecy dzieciecych dziecka pokoju pokoj nastolatka mlodziezowe mlodziezowy podwojne pojedyncze pietrowe jednoosobowy dwuosobowe rozsuwane wysuwane skladany chowane otwarty wysoka wysoki niski niskie male maly duza duze dwa trzy cztery osob osobowe prawe lewe prawo lewo stronny stronne prawostronne lewostronne mat polysk gorny dolny lewy prawy nogach nozkach'.split(/\s+/));
function isnum(t){return /^\d/.test(t)||/^\d+x\d+$/.test(t);}

const byB={};all.forEach(p=>{(byB[p.b]=byB[p.b]||[]).push(p.s);});
let out='# Test „nic nie umknęło": tokeny ze slugów NIE złapane jako podkategoria (2026-06-24)\n\n';
out+='Jeśli token to realny atrybut → brakująca podkat. Jeśli nazwa serii/model lub generyk → szum (OK).\n\n';
let flagged=0;
for(const [b,slugs] of Object.entries(byB).sort((a,b)=>b[1].length-a[1].length)){
  const tok={};
  for(const s of slugs){const parts=s.replace(/\.html?$/,'').replace(/-\d+$/,'').split(/[-_]/).filter(Boolean);const seen=new Set();for(let p of parts){if(p.length<3||STOP.has(p)||isnum(p)||COVERED.test(p))continue;if(seen.has(p))continue;seen.add(p);tok[p]=(tok[p]||0)+1;}}
  const cand=Object.entries(tok).filter(([k,v])=>v>=4).sort((a,b)=>b[1]-a[1]);
  if(cand.length){out+=`## ${b} (${slugs.length})\n`+cand.map(([k,v])=>`- ${k}: ${v}`).join('\n')+'\n\n';flagged+=cand.length;}
}
fs.writeFileSync('strategia/test-nic-nie-umknelo-2026-06-24.md',out);
console.log('Nieskategoryzowanych tokenów ≥4:',flagged,'-> strategia/test-nic-nie-umknelo-2026-06-24.md');
console.log(out.slice(0,2200));

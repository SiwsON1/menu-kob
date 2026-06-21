import fs from 'fs';
const urls=fs.readFileSync('category-urls.txt','utf8').trim().split(/\r?\n/).filter(Boolean);

// stem = slug bez końcowego -ID i bez ścieżki/rozszerzenia
function stem(u){
  let s=u.replace('https://meblekobi.pl','').replace(/\.html$/,'').replace(/\/$/,'');
  s=s.replace(/^\/pl\/menu\//,'').replace(/^\/sklep\//,'');
  s=s.split('/').pop();              // ostatni segment
  s=s.replace(/-\d+$/,'');           // usuń -ID
  return s;
}
// mapowanie stem -> kanoniczna kategoria docelowa (wg DRZEWO-v2). null = nie ruszać / hub.
const CANON={
 'biurka':'/sklep/biuro/biurka/','biurka-komputerowe':'/sklep/biuro/biurka/?f=komputerowe',
 'komody':'/sklep/sypialnia/komody/','komody-dzieciece':'/sklep/sypialnia/komody/?f=dzieciece',
 'fotele':'/sklep/salon/fotele/','kanapy-i-narozniki':'/sklep/salon/kanapy-narozniki/',
 'krzesla':'/sklep/salon/krzesla/','krzesla-obrotowe':'/sklep/biuro/krzesla-obrotowe/',
 'lawki-i-pufy':'/sklep/salon/pufy-lawki/','lozka-bajkowe':'/sklep/pokoj-dziecka/lozka-z-grafika/',
 'lozka-z-grafika':'/sklep/pokoj-dziecka/lozka-z-grafika/','lozka-drewniane':'/sklep/pokoj-dziecka/lozka-dzieciece/',
 'lozka-mlodziezowe':'/sklep/pokoj-dziecka/lozka-mlodziezowe/','lozka-pietrowe':'/sklep/pokoj-dziecka/lozka-pietrowe/',
 'lozka-podwojne':'/sklep/pokoj-dziecka/lozka-podwojne/','lozka-pojedyncze':'/sklep/pokoj-dziecka/lozka-dzieciece/',
 'lozka-tapicerowane':'/sklep/pokoj-dziecka/lozka-podwojne/?f=tapicerowane','lozka-z-pojemnikiem':'/sklep/pokoj-dziecka/lozka-podwojne/?f=pojemnik',
 'lozeczka-niemowlece':'/sklep/pokoj-dziecka/lozka-dzieciece/','barierki-zabezpieczajace':'/sklep/pokoj-dziecka/barierki/',
 'polki':'/sklep/pokoj-dziecka/polki-dla-dzieci/','polki-dla-dzieci':'/sklep/pokoj-dziecka/polki-dla-dzieci/',
 'polkotapczany':'/sklep/sypialnia/polkotapczany/','meble-smart':'/sklep/sypialnia/polkotapczany/',
 'regaly':'/sklep/salon/regaly/','skrzynie':'/sklep/pokoj-dziecka/skrzynie-na-zabawki/',
 'stelaze':'/sklep/sypialnia/materace/?f=stelaz','stoliki-i-krzeselka':'/sklep/pokoj-dziecka/stoliki-krzeselka/',
 'stoliki-kawowe':'/sklep/salon/stoliki-kawowe/','stoly':'/sklep/salon/stoly/',
 'szafki-na-buty':'/sklep/przedpokoj/szafki-na-buty/','szafki-nocne':'/sklep/sypialnia/szafki-nocne/',
 'szafki-rtv':'/sklep/salon/szafki-rtv/','szafy':'/sklep/sypialnia/szafy/','szafy-dzieciece':'/sklep/pokoj-dziecka/szafy-dzieciece/',
 'toaletki':'/sklep/sypialnia/toaletki/','wieszaki':'/sklep/przedpokoj/wieszaki/',
 'akcesoria-meblowe':'/sklep/akcesoria/uchwyty-galki/','pomocniki-kuchenne':'/sklep/lazienka-kuchnia/',
 'meble-lazienkowe':'/sklep/lazienka-kuchnia/','szafki-lazienkowe':'/sklep/lazienka-kuchnia/szafki-pod-umywalke/',
 'zestawy-lazienkowe':'/sklep/lazienka-kuchnia/','materace':'/sklep/sypialnia/materace/',
 'materace-kieszeniowe':'/sklep/sypialnia/materace/?f=kieszeniowe','materace-medyczne':'/sklep/sypialnia/materace/?f=medyczne',
 'materace-turystyczne':'/sklep/sypialnia/materace/?f=turystyczne','pianka-kokos':'/sklep/sypialnia/materace/?f=kokos',
 'piankowe':'/sklep/sypialnia/materace/?f=piankowe','doplaty-do-materacy-pianka-kokos':'/sklep/sypialnia/materace/',
 'ogrod':'/sklep/ogrod/','jadalnia':'/sklep/salon/','lazienka':'/sklep/lazienka-kuchnia/',
 'lozka-dzieciece':'/sklep/pokoj-dziecka/lozka-dzieciece/','szafki-nocne-dzieci':'/sklep/sypialnia/szafki-nocne/?f=dzieciece',
 'szafki-regaly':'/sklep/salon/regaly/','konsole':'/sklep/przedpokoj/','lozka':'/sklep/sypialnia/',
};
// huby/room/utility - nie ruszać lub osobno
const HUBS=new Set(['meble','pomieszczenia','kids-young','promocje','pokoj-dziecka','pokoj-dzienny','przedpokoj','sypialnia']);

const groups={};
for(const u of urls){ const s=stem(u); (groups[s]=groups[s]||[]).push(u); }

let out='# Mapa przekierowań 301 — stara struktura → kanoniczna (2026-06-20)\n\n';
out+=`Z 103 realnych URL-i kategorii (sitemapa). Dwa wzorce /pl/menu/ + /sklep/ → ujednolicić na /sklep/.\n`;
out+='UWAGA: wybór KANONICZNEJ z duplikatów (która ma najwięcej produktów) wymaga panelu IdoSell —\n';
out+='tu proponuję docelowy URL; physical-canonical (który ID zostaje) do potwierdzenia w panelu.\n\n';

// duplikaty (stem z >1 URL)
const dups=Object.entries(groups).filter(([s,us])=>us.length>1).sort((a,b)=>b[1].length-a[1].length);
out+=`## DUPLIKATY do scalenia (${dups.length} grup)\n\n`;
for(const [s,us] of dups){
  const target=CANON[s]||'(DO USTALENIA)';
  out+=`### ${s} → \`${target}\` (${us.length} URL-i)\n`;
  us.forEach(u=>out+=`- ${u.replace('https://meblekobi.pl','')}\n`);
  out+='\n';
}
// pojedyncze /pl/menu/ do migracji wzorca
out+='## Pojedyncze /pl/menu/ → migracja wzorca na /sklep/ (301)\n\n';
let single=0;
for(const [s,us] of Object.entries(groups)){
  if(us.length>1)continue;
  const u=us[0];
  if(!u.includes('/pl/menu/'))continue;
  if(HUBS.has(s)){continue;}
  const target=CANON[s]||'(DO USTALENIA)';
  out+=`- ${u.replace('https://meblekobi.pl','')} → \`${target}\`\n`; single++;
}
out+=`\n## HUBY / room / utility (NIE 301, zostają jako huby)\n\n`;
for(const [s,us] of Object.entries(groups)){ if(HUBS.has(s)) us.forEach(u=>out+=`- ${u.replace('https://meblekobi.pl','')}\n`); }

fs.writeFileSync('strategia/mapa-301-2026-06-20.md',out);
const totalDupUrls=dups.reduce((a,[s,us])=>a+us.length,0);
console.log('Grup duplikatów:',dups.length,'| URL-i w duplikatach:',totalDupUrls,'| pojedynczych /pl/menu/ do migracji:',single);
console.log('Stemy do ustalenia (brak w CANON):', Object.keys(groups).filter(s=>!CANON[s]&&!HUBS.has(s)).join(', ')||'—');

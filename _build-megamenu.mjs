import fs from 'fs';

// --- wczytaj mapowanie produktow ---
const csv = fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);
csv.shift(); // header: url,slug,kategoria_nowa
const byBucket = {};
for(const line of csv){
  const m = line.match(/^([^,]+),([^,]*),"?(.*?)"?$/);
  if(!m) continue;
  const url = m[1].trim();
  const slug = m[2].trim();
  const bucket = m[3].trim();
  (byBucket[bucket] = byBucket[bucket]||[]).push({url, slug});
}

// --- DRZEWO MENU (z DRZEWO-MENU-FINAL-2026-06-19.md). Bez myslnikow w copy. ---
const TREE = [
 {branch:'1. Pokój dziecka i nastolatka', tag:'rdzeń ★', leaves:[
   {name:'Łóżka bajkowe / z grafiką', buckets:['Łóżka dziecięce grafika/bajkowe'], vol:'~223k', note:'USP marki: cała grafika tutaj'},
   {name:'Łóżko domek', buckets:['Łóżko domek'], vol:'~44k', note:'KOBI już rankuje'},
   {name:'Łóżka montessori / podłogowe', buckets:['Łóżko Montessori/podłogowe'], vol:''},
   {name:'Łóżka klasyczne', buckets:['Łóżka dziecięce klasyczne','Łóżka inne'], vol:''},
   {name:'Łóżka piętrowe', buckets:['Łóżka piętrowe'], vol:'~147k', isNew:true, note:'P0, top okazja. Dziś brak kategorii (tylko wyszukiwarka)'},
   {name:'Łóżka podwójne / dla rodzeństwa', buckets:['Łóżka podwójne dziecięce/rozsuwane'], vol:'~34k', note:'scalić 3 zdublowane URL'},
   {name:'Łóżka młodzieżowe', buckets:['Łóżka młodzieżowe'], vol:'~75k'},
   {name:'Szafy dziecięce', buckets:['Szafy dziecięce'], vol:'~11k', note:'KOBI rankuje'},
   {name:'Półki dla dzieci', buckets:['Półki / dla dzieci'], vol:''},
   {name:'Skrzynie na zabawki', buckets:['Skrzynie na zabawki'], vol:''},
   {name:'Stoliki i krzesełka dziecięce', buckets:['Stoliki+krzesełka dziecięce'], vol:''},
   {name:'Krzesła dziecięce ergonomiczne', buckets:['Krzesła dziecięce ergonomiczne'], vol:'', isNew:true},
   {name:'Barierki i stelaże', buckets:['Barierki/stelaże'], vol:''},
 ]},
 {branch:'2. Strefa nauki i pracy (biuro)', tag:'NOWA ★', branchNew:true, leaves:[
   {name:'Biurka dziecięce i proste', buckets:['Biurka (dziecięce/proste)'], vol:'~248k (biurko 90k)'},
   {name:'Biurka narożne', buckets:['Biurka narożne'], vol:'~64k'},
   {name:'Biurka regulowane elektrycznie', buckets:['Biurka regulowane/elektryczne'], vol:'~17k'},
   {name:'Biurka / krzesła gamingowe', buckets:['Krzesła/biurka gamingowe'], vol:'', isNew:true},
   {name:'Biurka rozkładane / chowane (VERTO)', buckets:['Biurka rozkładane/chowane (VERTO)'], vol:''},
   {name:'Krzesła obrotowe / fotele biurowe', buckets:[], vol:'~82k', note:'cross-link: wydzielić z bucketu Krzesła przy przepisaniu panelu'},
 ]},
 {branch:'3. Łóżka z grafiką i nadrukiem', tag:'hub marki', leaves:[
   {name:'Hub marketingowy (link do Łóżek bajkowych)', buckets:[], vol:'', note:'NIE osobne kategorie. Grafika mocna tylko w łóżkach'},
 ]},
 {branch:'4. Meble smart / oszczędzające miejsce', tag:'nisza, marża', leaves:[
   {name:'Półkotapczany (łóżka w szafie)', buckets:['Półkotapczany (VERTO)'], vol:'', note:'VERTO, flagship marży'},
 ]},
 {branch:'5. Sypialnia', tag:'', leaves:[
   {name:'Komody', buckets:['Komody (ogólne)','Komody z grafiką'], vol:'~373k', note:'długi ogon: dąb artisan, biała'},
   {name:'Szafki nocne', buckets:['Szafki nocne'], vol:'~128k'},
   {name:'Szafy', buckets:['Szafy (ogólne)'], vol:'~840k head', note:'nie walczymy frontalnie'},
   {name:'Garderoby', buckets:['Garderoby / szafy wielofunkcyjne'], vol:'~33k', isNew:true, note:'VENO, MALMO'},
   {name:'Toaletki', buckets:['Toaletki'], vol:'~43k'},
   {name:'Materace', buckets:['Materace i dopłaty'], vol:''},
   {name:'Łóżka dwuosobowe / tapicerowane', buckets:['Łóżka dwuosobowe (sypialnia)','Łóżka tapicerowane/panele'], vol:'', note:'cienko zatowarowane: landing, nie gałąź'},
 ]},
 {branch:'6. Salon i jadalnia', tag:'~250 prod.', leaves:[
   {name:'Stoliki kawowe / ławy', buckets:['Stoliki kawowe / ławy'], vol:'~356k', note:'OKAZJA: stolik kawowy 110k, okrągły 27k'},
   {name:'Szafki RTV', buckets:['Szafki RTV'], vol:'~117k'},
   {name:'Stoły jadalniane', buckets:['Stoły (jadalnia)'], vol:'~431k'},
   {name:'Krzesła do jadalni / obrotowe', buckets:['Krzesła (jadalnia/obrotowe)'], vol:'~512k'},
   {name:'Taborety / hokery barowe', buckets:['Taborety / hokery barowe'], vol:'~18k'},
   {name:'Kanapy / narożniki / sofy', buckets:['Kanapy/narożniki/sofy'], vol:'~492k'},
   {name:'Fotele / pufy', buckets:['Fotele/pufy/ławki'], vol:'~508k'},
   {name:'Regały', buckets:['Regały'], vol:'~153k'},
 ]},
 {branch:'7. Łazienka i kuchnia (zabudowa)', tag:'NOWA ★ największa grupa', branchNew:true, leaves:[
   {name:'Zabudowa łazienka/kuchnia (szafki, słupki, blaty)', buckets:['Łazienka/kuchnia - zabudowa'], vol:'~260k', note:'serie Ariel, Elia, Nova, Lavia, Boni, Ovalia'},
   {name:'Pomocniki kuchenne', buckets:['Pomocniki kuchenne'], vol:''},
 ]},
 {branch:'8. Przedpokój', tag:'', leaves:[
   {name:'Szafki na buty (z siedziskiem)', buckets:['Szafki na buty'], vol:'', note:'ANDY'},
   {name:'Konsole / zestawy do przedpokoju', buckets:['Przedpokój (zestawy/konsole)'], vol:'~18k'},
   {name:'Wieszaki', buckets:['Wieszaki'], vol:'~15k'},
 ]},
 {branch:'9. Akcesoria meblowe', tag:'NOWA', branchNew:true, leaves:[
   {name:'Uchwyty i gałki (wymienne fronty)', buckets:['Akcesoria meblowe (uchwyty/gałki)'], vol:'~184k rynek', note:'KOREKTA: realnie tylko 6 produktów LUI (auto-mapowanie miało 40, reszta to łóżka z opcją uchwytów). USP jest, ale towar płytki: landing, nie duża gałąź'},
 ]},
 {branch:'10. Meble ogrodowe', tag:'', leaves:[
   {name:'Meble ogrodowe', buckets:['Meble ogrodowe'], vol:'~188k'},
 ]},
 {branch:'11. Dla zwierząt', tag:'', leaves:[
   {name:'Drapaki dla kota', buckets:['Akcesoria dla zwierząt'], vol:'', note:'niski SEO, realny towar'},
 ]},
];

// --- 3. POZIOM: podkategorie zweryfikowane konkurencją ---
// wczytane z subcats-approved.json (generuje _verify-subcats.mjs). klucz: 'branch||leaf' -> [{n,p,v,k}]
const SUBS = JSON.parse(fs.readFileSync('strategia/subcats-approved.json','utf8'));

// kontrola pokrycia bucketow (0 sierot)
const used = new Set();
TREE.forEach(b=>b.leaves.forEach(l=>l.buckets.forEach(x=>used.add(x))));
const allBuckets = Object.keys(byBucket);
const orphans = allBuckets.filter(b=>!used.has(b));
console.log('Bucketów:', allBuckets.length, '| użytych:', used.size, '| SIEROTY:', orphans.length, orphans);
const totalProducts = Object.values(byBucket).reduce((a,v)=>a+v.length,0);
const fullSubs = Object.values(SUBS).flat().filter(s=>s.k==='full').length;

const dataForHtml = {};
TREE.forEach(b=>b.leaves.forEach(l=>{
  const prods=[];
  l.buckets.forEach(bk=>(byBucket[bk]||[]).forEach(p=>prods.push(p)));
  l._count = prods.length;
  dataForHtml[b.branch+'||'+l.name] = prods;
}));

function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

let sidebar='';
TREE.forEach((b,bi)=>{
  const branchCount = b.leaves.reduce((a,l)=>a+l._count,0);
  sidebar += `<div class="branch">
    <button class="branch-h" data-bi="${bi}">
      <span class="chev">▸</span>
      <span class="bname">${esc(b.branch)}</span>
      ${b.tag?`<span class="tag ${b.branchNew?'tag-new':''}">${esc(b.tag)}</span>`:''}
      <span class="bcount">${branchCount}</span>
    </button>
    <div class="leaves" data-leaves="${bi}">`;
  b.leaves.forEach((l)=>{
    const key=b.branch+'||'+l.name;
    const nsub=(SUBS[key]||[]).length;
    sidebar += `<button class="leaf" data-key="${esc(key)}">
      <span class="lname">${esc(l.name)}${l.isNew?'<span class="dot-new">NOWA</span>':''}${nsub?`<span class="sub-ind">+${nsub}</span>`:''}</span>
      <span class="lmeta">${l.vol?`<span class="vol">${esc(l.vol)}</span>`:''}<span class="lcount">${l._count}</span></span>
    </button>`;
  });
  sidebar += `</div></div>`;
});

const html = `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>meblekobi.pl — mega-menu (struktura kategorii)</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:oklch(0.17 0.02 250);--panel:oklch(0.21 0.022 250);--panel2:oklch(0.25 0.026 255);
  --line:oklch(0.31 0.025 250);--ink:oklch(0.93 0.012 250);--mut:oklch(0.68 0.03 250);
  --acc:oklch(0.78 0.12 235);--acc2:oklch(0.85 0.11 85);--new:oklch(0.82 0.14 165);
}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(1200px 600px at 80% -10%,oklch(0.24 0.04 255),transparent),var(--bg);color:var(--ink);font-family:Manrope,system-ui,sans-serif;font-size:15px;line-height:1.5}
header{padding:26px 30px 18px;border-bottom:1px solid var(--line);position:sticky;top:0;background:oklch(0.17 0.02 250/.88);backdrop-filter:blur(10px);z-index:5}
h1{font-family:Fraunces,serif;font-weight:900;font-size:clamp(22px,2.4vw,32px);margin:0;letter-spacing:-.01em}
.sub{color:var(--mut);margin-top:6px;font-size:14px;max-width:75ch}
.stats{display:flex;gap:26px;margin-top:16px;flex-wrap:wrap}
.stat{display:flex;flex-direction:column}
.stat b{font-family:Fraunces,serif;font-size:24px}
.stat span{color:var(--mut);font-size:12px;text-transform:uppercase;letter-spacing:.06em}
.search{margin-top:18px}
.search input{width:100%;max-width:420px;padding:11px 14px;border-radius:10px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-family:inherit;font-size:14px}
.search input:focus{outline:none;border-color:var(--acc)}
.wrap{display:grid;grid-template-columns:minmax(350px,450px) 1fr}
.side{border-right:1px solid var(--line);padding:14px;overflow:auto;max-height:calc(100vh - 158px);position:sticky;top:158px}
.branch{margin-bottom:7px}
.branch-h{width:100%;display:flex;align-items:center;gap:9px;background:var(--panel);border:1px solid var(--line);color:var(--ink);padding:11px 12px;border-radius:10px;cursor:pointer;text-align:left;font-family:Manrope;font-weight:700;font-size:14px;transition:background .15s,border-color .15s}
.branch-h:hover{background:var(--panel2);border-color:oklch(0.38 0.03 250)}
.chev{transition:transform .2s;color:var(--mut);font-size:11px}
.branch.open .chev{transform:rotate(90deg);color:var(--acc)}
.bname{flex:1}
.tag{font-size:10.5px;font-weight:600;color:var(--acc2);background:oklch(0.85 0.11 85/.12);padding:2px 8px;border-radius:20px;white-space:nowrap}
.tag-new{color:var(--new);background:oklch(0.82 0.14 165/.13)}
.bcount{font-size:12px;color:var(--mut);min-width:30px;text-align:right;font-variant-numeric:tabular-nums}
.leaves{display:none;padding:7px 0 8px 8px}
.branch.open .leaves{display:block}
.leaf{width:100%;display:flex;justify-content:space-between;align-items:center;gap:8px;background:transparent;border:1px solid transparent;border-radius:8px;color:var(--ink);padding:8px 10px;cursor:pointer;text-align:left;font-family:inherit;font-size:13.5px;transition:background .12s,border-color .12s;margin-bottom:1px}
.leaf:hover{background:var(--panel2);border-color:var(--line)}
.leaf.active{background:oklch(0.78 0.12 235/.14);border-color:oklch(0.78 0.12 235/.4)}
.lname{flex:1}
.dot-new{font-size:9px;font-weight:700;color:var(--new);background:oklch(0.82 0.14 165/.16);padding:1px 6px;border-radius:12px;margin-left:7px;vertical-align:middle}
.lmeta{display:flex;align-items:center;gap:9px}
.vol{font-size:11px;color:var(--acc2);font-variant-numeric:tabular-nums}
.lcount{font-size:12px;color:var(--mut);min-width:26px;text-align:right;font-variant-numeric:tabular-nums}
.main{padding:26px 32px;overflow:auto;max-height:calc(100vh - 158px)}
.empty{color:var(--mut);text-align:center;margin-top:80px;font-size:15px;line-height:1.7}
.crumb{font-family:Fraunces,serif;font-size:26px;font-weight:600;margin:0 0 6px;letter-spacing:-.01em}
.crumb-meta{margin-bottom:18px}
.crumb-meta .pill{display:inline-block;background:var(--panel2);border:1px solid var(--line);padding:3px 10px;border-radius:20px;margin:0 7px 6px 0;font-size:12px}
.note{background:oklch(0.85 0.11 85/.09);border:1px solid oklch(0.85 0.11 85/.22);color:var(--acc2);padding:10px 14px;border-radius:10px;margin-bottom:20px;font-size:13px}
.sub-ind{font-size:10px;font-weight:700;color:var(--acc);background:oklch(0.78 0.12 235/.14);padding:1px 6px;border-radius:10px;margin-left:6px}
.subbar{margin:0 0 20px}
.subbar-lbl{display:block;font-size:12px;color:var(--mut);text-transform:uppercase;letter-spacing:.05em;margin-bottom:9px}
.chips{display:flex;flex-wrap:wrap;gap:7px}
.chip{background:var(--panel);border:1px solid var(--line);color:var(--ink);padding:7px 12px;border-radius:24px;cursor:pointer;font-family:inherit;font-size:13px;transition:border-color .12s,background .12s;display:inline-flex;align-items:center;gap:6px}
.chip:hover{background:var(--panel2);border-color:oklch(0.38 0.03 250)}
.chip.active{background:oklch(0.78 0.12 235/.16);border-color:oklch(0.78 0.12 235/.5)}
.chip b{font-variant-numeric:tabular-nums}
.chip .chv{font-size:11px;color:var(--acc2)}
.chip em{font-size:10px;font-style:normal;color:var(--mut);text-transform:uppercase;letter-spacing:.04em}
.chip-full{border-color:oklch(0.82 0.14 165/.35)}
.chip-full em{color:var(--new)}
.plist{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:9px}
.pcard{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:11px 14px;font-size:13px;transition:border-color .12s,background .12s,transform .12s;text-decoration:none;color:var(--ink);display:block}
.pcard:hover{border-color:var(--acc);background:var(--panel2);transform:translateY(-1px)}
.pcard .pn{font-weight:600}
.pcard .pu{color:var(--mut);font-size:11px;margin-top:3px;word-break:break-all}
.searchres .branch-lbl{color:var(--acc);font-size:12px;text-transform:uppercase;letter-spacing:.05em;margin:20px 0 8px}
@media(max-width:860px){.wrap{grid-template-columns:1fr}.side{position:static;max-height:none;border-right:0;border-bottom:1px solid var(--line)}.main{max-height:none}}
</style></head><body>
<header>
  <h1>meblekobi.pl, proponowane mega-menu</h1>
  <div class="sub">Finalna struktura kategorii. ${TREE.length} gałęzi. Klik w kategorię pokazuje realne produkty z katalogu. Dane: katalog z sitemapy plus popyt Senuto (interbeds.pl, meble.pl).</div>
  <div class="stats">
    <div class="stat"><b>${totalProducts}</b><span>produktów w katalogu</span></div>
    <div class="stat"><b>${TREE.length}</b><span>gałęzi menu</span></div>
    <div class="stat"><b>${used.size}/${allBuckets.length}</b><span>bucketów przypisanych</span></div>
    <div class="stat"><b style="color:var(--new)">4</b><span>nowe gałęzie</span></div>
    <div class="stat"><b style="color:var(--acc)">${fullSubs}</b><span>nowe podkat. (zweryf.)</span></div>
  </div>
  <div class="search"><input id="q" placeholder="Szukaj produktu (np. piętrowe, dąb, biurko narożne)..."></div>
</header>
<div class="wrap">
  <nav class="side" id="side">${sidebar}</nav>
  <section class="main" id="main"><div class="empty">Wybierz kategorię z menu po lewej, żeby zobaczyć produkty.<br><br>Gałęzie <span style="color:var(--new)">NOWA</span> to domknięte luki: biuro, akcesoria, łazienka/kuchnia, garderoby.</div></section>
</div>
<script>
const DATA = ${JSON.stringify(dataForHtml)};
const META = ${JSON.stringify(Object.fromEntries(TREE.flatMap(b=>b.leaves.map(l=>[b.branch+'||'+l.name,{vol:l.vol,note:l.note,isNew:l.isNew,branch:b.branch}]))))};
const SUBS = ${JSON.stringify(SUBS)};
function pretty(slug){let s=slug.replace(/\\.html?$/,'').replace(/-\\d+$/,'');return (s.replace(/[-_]/g,' ').trim()).replace(/^./,c=>c.toUpperCase());}
function fullUrl(u){return u.startsWith('http')?u:'https://'+u;}
function cards(list){return list.map(p=>'<a class="pcard" href="'+fullUrl(p.url)+'" target="_blank" rel="noopener"><div class="pn">'+pretty(p.slug)+'</div><div class="pu">'+p.url+'</div></a>').join('');}
function renderLeaf(key){
  const prods=DATA[key]||[];const m=META[key]||{};const subs=SUBS[key]||[];
  const name=key.split('||')[1];
  let h='<div class="crumb">'+name+(m.isNew?' <span class="dot-new">NOWA</span>':'')+'</div>';
  h+='<div class="crumb-meta"><span class="pill">'+prods.length+' produktów</span>'+(m.vol?'<span class="pill" style="color:var(--acc2)">popyt '+m.vol+'/mc</span>':'')+'<span class="pill">'+m.branch+'</span></div>';
  if(m.note) h+='<div class="note">'+m.note+'</div>';
  if(subs.length){
    h+='<div class="subbar"><span class="subbar-lbl">Podkategorie (3. poziom, zweryfikowane popytem konkurencji):</span><div class="chips">';
    h+='<button class="chip active" data-key="'+key+'" data-re="">Wszystkie <b>'+prods.length+'</b></button>';
    subs.forEach(s=>{
      const cnt=prods.filter(p=>new RegExp(s.p).test(p.slug.toLowerCase())).length;
      h+='<button class="chip '+(s.k==='full'?'chip-full':'chip-filtr')+'" data-key="'+key+'" data-re="'+s.p+'">'+s.n+' <b>'+cnt+'</b> <span class="chv">'+s.v+'</span> <em>'+(s.k==='full'?'podkat.':'filtr')+'</em></button>';
    });
    h+='</div></div>';
  }
  if(!prods.length){h+='<div class="empty" style="margin-top:40px">Brak produktów w mapowaniu (kategoria koncepcyjna, cross-link lub do dosourcingu).</div>';return h;}
  h+='<div class="plist" id="plist">'+cards(prods)+'</div>';return h;
}
document.querySelectorAll('.branch-h').forEach(b=>b.addEventListener('click',()=>b.closest('.branch').classList.toggle('open')));
document.querySelectorAll('.leaf').forEach(l=>l.addEventListener('click',()=>{
  document.querySelectorAll('.leaf').forEach(x=>x.classList.remove('active'));
  l.classList.add('active');
  document.getElementById('main').innerHTML=renderLeaf(l.dataset.key);
  document.getElementById('main').scrollTop=0;
}));
document.querySelector('.branch').classList.add('open');
// filtrowanie podkategorii (chipy) - delegacja na #main
document.getElementById('main').addEventListener('click',e=>{
  const c=e.target.closest('.chip'); if(!c)return;
  const key=c.dataset.key, re=c.dataset.re;
  c.parentNode.querySelectorAll('.chip').forEach(x=>x.classList.remove('active')); c.classList.add('active');
  const prods=DATA[key]||[];
  const filtered=re?prods.filter(p=>new RegExp(re).test(p.slug.toLowerCase())):prods;
  const pl=document.getElementById('plist'); if(pl) pl.innerHTML=cards(filtered);
});
const q=document.getElementById('q');
q.addEventListener('input',()=>{
  const t=q.value.trim().toLowerCase();
  const main=document.getElementById('main');
  if(t.length<2){main.innerHTML='<div class="empty">Wybierz kategorię z menu po lewej.</div>';return;}
  let hits=[];
  for(const key in DATA){for(const p of DATA[key]){if(pretty(p.slug).toLowerCase().includes(t)||p.slug.toLowerCase().includes(t)){hits.push({key,p});}}}
  let h='<div class="crumb">Wyniki: "'+t+'"</div><div class="crumb-meta"><span class="pill">'+hits.length+' produktów</span></div>';
  if(!hits.length){h+='<div class="empty">Brak wyników.</div>';main.innerHTML=h;return;}
  const byK={};hits.slice(0,400).forEach(({key,p})=>{(byK[key]=byK[key]||[]).push(p);});
  h+='<div class="searchres">';
  for(const key in byK){h+='<div class="branch-lbl">'+key.replace('||',' › ')+'</div><div class="plist">';byK[key].forEach(p=>{h+='<a class="pcard" href="'+fullUrl(p.url)+'" target="_blank" rel="noopener"><div class="pn">'+pretty(p.slug)+'</div><div class="pu">'+p.url+'</div></a>';});h+='</div>';}
  h+='</div>';main.innerHTML=h;
});
</script></body></html>`;

fs.writeFileSync('strategia/mega-menu-FINAL-2026-06-19.html', html);
console.log('OK napisano strategia/mega-menu-FINAL-2026-06-19.html ('+(html.length/1024).toFixed(0)+' KB), produktów:', totalProducts);

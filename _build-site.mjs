import fs from 'fs';
// produkty
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({url:m[1],slug:m[2].toLowerCase(),b:m[3]});}
function pick(buckets,slug){let p=all.filter(x=>buckets.includes(x.b));if(slug)p=p.filter(x=>slug.every(t=>x.slug.includes(t)));return p;}

// FINALNA STRUKTURA: gałąź -> kategorie [{n,ph,v, b:[buckets], s:[slugFilter], subs:[{n,ph,v,s}]}]
const B='Łóżka dziecięce grafika/bajkowe,Łóżka dziecięce klasyczne,Łóżka inne'.split(',');
const T=[
 {br:'1. Pokój dziecka', cats:[
  {n:'Łóżka dziecięce',ph:'łóżka dziecięce',v:33100,b:['Łóżka dziecięce grafika/bajkowe','Łóżka dziecięce klasyczne','Łóżka inne','Łóżko domek','Łóżko Montessori/podłogowe'],subs:[
    {n:'160x80',ph:'łóżko dziecięce 160x80',v:1900,s:['160x80']},{n:'z barierką',ph:'łóżko dziecięce z barierką',v:1000,s:['barierk']},
    {n:'z szufladą',ph:'łóżka z szufladami',v:5400,s:['szuflad']},{n:'z materacem',ph:'łóżko z materacem',v:2400,s:['z-materac']},
    {n:'dla dziewczynki',ph:'łóżko dla dziewczynki',v:9900,s:['dziewczynk']},{n:'140x70',ph:'łóżko dziecięce 140x70',v:720,s:['140x70']}]},
  {n:'Łóżka piętrowe',ph:'łóżko piętrowe',v:40500,b:['Łóżka piętrowe'],subs:[]},
  {n:'Łóżka młodzieżowe',ph:'łóżka młodzieżowe',v:27100,b:['Łóżka młodzieżowe'],subs:[]},
  {n:'Łóżka podwójne / dla rodzeństwa',ph:'łóżko podwójne dziecięce',v:2900,b:['Łóżka podwójne dziecięce/rozsuwane'],subs:[{n:'z pojemnikiem',ph:'łóżko z pojemnikiem',v:6600,s:['pojemnik']}]},
  {n:'Łóżka domki',ph:'łóżko domek / łóżeczko domek',v:9900,b:['Łóżko domek'],subs:[]},
  {n:'Szafy dziecięce',ph:'szafa do pokoju dziecięcego',v:5400,b:['Szafy dziecięce'],subs:[]},
  {n:'Regały na zabawki',ph:'regał na zabawki',v:14800,b:['Regały'],s:['zabawk'],subs:[]},
  {n:'Półki dla dzieci',ph:'półka dla dzieci',v:480,b:['Półki / dla dzieci'],subs:[]},
  {n:'Skrzynie na zabawki',ph:'skrzynia na zabawki',v:5400,b:['Skrzynie na zabawki'],subs:[]},
  {n:'Stoliki i krzesełka dziecięce',ph:'stolik i krzesełko dla dziecka',v:880,b:['Stoliki+krzesełka dziecięce'],subs:[]},
  {n:'Krzesła dziecięce ergonomiczne',ph:'krzesło ergonomiczne dla dziecka',v:590,b:['Krzesła dziecięce ergonomiczne'],subs:[]},
 ]},
 {br:'2. Biuro i nauka', cats:[
  {n:'Biurka',ph:'biurko',v:90500,b:['Biurka (dziecięce/proste)'],subs:[
    {n:'białe',ph:'biurko białe',v:12100,s:['bial']},{n:'dąb',ph:'biurko dąb',v:2900,s:['dab']},{n:'komputerowe',ph:'biurka komputerowe',v:6600,s:['komputerow']},{n:'z szufladami',ph:'biurko z szufladami',v:1600,s:['szuflad']}]},
  {n:'Biurka regulowane elektrycznie',ph:'biurko regulowane elektrycznie',v:9900,b:['Biurka regulowane/elektryczne'],subs:[]},
  {n:'Biurka narożne',ph:'biurko narożne',v:27100,b:['Biurka narożne'],subs:[]},
  {n:'Biurka i krzesła gamingowe',ph:'biurko gamingowe',v:830,b:['Krzesła/biurka gamingowe'],subs:[]},
 ]},
 {br:'3. Sypialnia', cats:[
  {n:'Komody',ph:'komoda',v:60500,b:['Komody (ogólne)','Komody z grafiką'],subs:[
    {n:'białe',ph:'komoda biała',v:27100,s:['bial']},{n:'dąb',ph:'komoda dąb',v:3600,s:['dab']},{n:'czarne',ph:'komoda czarna',v:4400,s:['czarn']},{n:'kaszmir',ph:'komoda kaszmir',v:4400,s:['kaszmir']}]},
  {n:'Szafki nocne',ph:'szafka nocna',v:49500,b:['Szafki nocne'],subs:[{n:'białe',ph:'szafka nocna biała',v:8100,s:['bial']},{n:'dąb',ph:'szafka nocna dąb',v:1000,s:['dab']}]},
  {n:'Garderoby',ph:'garderoba',v:3600,b:['Garderoby / szafy wielofunkcyjne'],subs:[]},
  {n:'Toaletki',ph:'toaletka',v:6600,b:['Toaletki'],subs:[]},
  {n:'Materace',ph:'materac dziecięcy',v:2400,b:['Materace i dopłaty'],subs:[{n:'kieszeniowe',ph:'materac kieszeniowy',v:2400,s:['kieszeniow']}]},
  {n:'Półkotapczany (łóżko w szafie)',ph:'półkotapczan',v:480,b:['Półkotapczany (VERTO)'],subs:[]},
 ]},
 {br:'4. Salon i jadalnia', cats:[
  {n:'Stoliki kawowe i ławy',ph:'stolik kawowy',v:110000,b:['Stoliki kawowe / ławy'],subs:[{n:'okrągłe',ph:'stolik kawowy okrągły',v:27100,s:['okragl']},{n:'ławy do salonu',ph:'ława do salonu',v:14800,s:['lawa']},{n:'czarne',ph:'stolik kawowy czarny',v:4400,s:['czarn']}]},
  {n:'Stoły do jadalni',ph:'stół do jadalni',v:18100,b:['Stoły (jadalnia)'],subs:[{n:'okrągłe',ph:'stół okrągły rozkładany',v:33100,s:['okragl']}]},
  {n:'Szafki RTV',ph:'szafka rtv',v:49500,b:['Szafki RTV'],subs:[{n:'białe',ph:'szafka rtv biała',v:3600,s:['bial']},{n:'dąb',ph:'szafka rtv dąb',v:1300,s:['dab']},{n:'czarne',ph:'szafka rtv czarna',v:2400,s:['czarn']},{n:'wiszące',ph:'szafka rtv wisząca',v:9900,s:['wiszac']}]},
  {n:'Krzesła do jadalni',ph:'krzesła do jadalni',v:74000,b:['Krzesła (jadalnia/obrotowe)'],subs:[]},
  {n:'Kanapy i narożniki',ph:'narożnik rozkładany',v:18100,b:['Kanapy/narożniki/sofy'],subs:[{n:'z funkcją spania',ph:'kanapa z funkcją spania',v:8100,s:['spania']}]},
  {n:'Fotele',ph:'fotel',v:49500,b:['Fotele/pufy/ławki'],s:['fotel'],subs:[]},
  {n:'Pufy',ph:'pufa',v:12100,b:['Fotele/pufy/ławki'],s:['puf'],subs:[]},
  {n:'Regały',ph:'regał',v:27100,b:['Regały'],subs:[]},
 ]},
 {br:'5. Łazienka i kuchnia (na wymiar)', cats:[
  {n:'Meble łazienkowe na wymiar',ph:'meble łazienkowe na wymiar',v:2400,b:['Łazienka/kuchnia - zabudowa'],subs:[
    {n:'blaty',ph:'blaty kuchenne',v:14800,s:['blat']},{n:'szafki pod umywalkę',ph:'szafka pod umywalkę',v:1900,s:['umywalk']},{n:'słupki',ph:'słupek łazienkowy',v:1900,s:['slupek']}]},
 ]},
 {br:'6. Przedpokój', cats:[
  {n:'Szafki na buty',ph:'szafka na buty',v:2900,b:['Szafki na buty'],subs:[]},
  {n:'Wieszaki',ph:'wieszak do przedpokoju',v:18100,b:['Wieszaki'],subs:[]},
  {n:'Konsole',ph:'konsola',v:18100,b:['Przedpokój (zestawy/konsole)'],subs:[]},
 ]},
 {br:'7. Ogród', cats:[{n:'Meble ogrodowe',ph:'meble ogrodowe',v:135000,b:['Meble ogrodowe'],subs:[]}]},
 {br:'8. Akcesoria', cats:[
  {n:'Uchwyty i gałki meblowe',ph:'uchwyt do mebli',v:14800,b:['Akcesoria meblowe (uchwyty/gałki)'],subs:[]},
  {n:'Drapaki dla kota',ph:'drapak dla kota',v:590,b:['Akcesoria dla zwierząt'],subs:[]},
 ]},
];

function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function fmt(v){return v>=1000?(v/1000).toFixed(v>=10000?0:1).replace('.0','')+'k':String(v);}

// dane do JS + sidebar
const DATA={};let totalProd=0;const seen=new Set();
let side='';
for(const [bi,br] of T.entries()){
  let bcount=0;
  let cathtml='';
  for(const cat of br.cats){
    const prods=pick(cat.b,cat.s);bcount+=prods.length;prods.forEach(p=>{if(!seen.has(p.url)){seen.add(p.url);totalProd++;}});
    const key=br.br+'||'+cat.n;
    DATA[key]={ph:cat.ph,v:cat.v,prods:prods.map(p=>({u:p.url,s:p.slug})),subs:(cat.subs||[]).map(s=>({n:s.n,ph:s.ph,v:s.v,re:s.s.join('|')}))};
    cathtml+=`<button class="cat" data-key="${esc(key)}"><span class="cn">${esc(cat.n)}</span><span class="cm"><span class="cv">${fmt(cat.v)}/mc</span><span class="cc">${prods.length}</span></span></button>`;
  }
  side+=`<div class="branch"><button class="bh" data-bi="${bi}"><span class="chev">▸</span><span class="bn">${esc(br.br)}</span><span class="bc">${bcount}</span></button><div class="cats">${cathtml}</div></div>`;
}

const html=`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>meblekobi.pl — proponowana struktura kategorii</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:oklch(0.985 0.004 255);--panel:#ffffff;--panel2:oklch(0.965 0.008 255);--line:oklch(0.9 0.012 255);--ink:oklch(0.28 0.03 260);--mut:oklch(0.55 0.03 260);--acc:oklch(0.55 0.14 252);--acc-soft:oklch(0.95 0.04 252);--hot:oklch(0.5 0.13 160);--hot-soft:oklch(0.95 0.05 160);--shadow:0 1px 2px oklch(0.5 0.05 260/.06),0 4px 16px oklch(0.5 0.05 260/.06)}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Manrope,system-ui,sans-serif;font-size:15px;line-height:1.55}
header{padding:24px 30px 18px;border-bottom:1px solid var(--line);position:sticky;top:0;background:oklch(0.985 0.004 255/.92);backdrop-filter:blur(10px);z-index:5}
h1{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:clamp(22px,2.4vw,30px);margin:0;letter-spacing:-.02em;color:oklch(0.25 0.04 260)}
.sub{color:var(--mut);margin-top:7px;font-size:13.5px;max-width:80ch}
.stats{display:flex;gap:26px;margin-top:16px;flex-wrap:wrap}.stat b{font-family:'Plus Jakarta Sans',sans-serif;font-size:23px;font-weight:800;color:var(--acc)}.stat span{color:var(--mut);font-size:11px;text-transform:uppercase;letter-spacing:.06em;display:block;margin-top:2px}
.search{margin-top:16px}.search input{width:100%;max-width:420px;padding:11px 15px;border-radius:12px;border:1px solid var(--line);background:#fff;color:var(--ink);font:inherit;box-shadow:var(--shadow)}.search input:focus{outline:none;border-color:var(--acc)}
.wrap{display:grid;grid-template-columns:minmax(330px,420px) 1fr}
.side{border-right:1px solid var(--line);padding:16px;overflow:auto;max-height:calc(100vh - 160px);position:sticky;top:160px}
.branch{margin-bottom:7px}.bh{width:100%;display:flex;align-items:center;gap:10px;background:var(--panel);border:1px solid var(--line);color:var(--ink);padding:12px 13px;border-radius:12px;cursor:pointer;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:14px;box-shadow:var(--shadow);transition:border-color .15s}
.bh:hover{border-color:var(--acc)}.chev{transition:.2s;color:var(--acc);font-size:11px}.branch.open .chev{transform:rotate(90deg)}.bn{flex:1}.bc{font-size:12px;color:var(--mut);font-variant-numeric:tabular-nums}
.cats{display:none;padding:7px 0 8px 8px}.branch.open .cats{display:block}
.cat{width:100%;display:flex;justify-content:space-between;align-items:center;gap:8px;background:transparent;border:1px solid transparent;border-radius:10px;color:var(--ink);padding:9px 11px;cursor:pointer;text-align:left;font:inherit;font-size:13.5px;margin-bottom:2px}
.cat:hover{background:var(--panel2)}.cat.active{background:var(--acc-soft);border-color:var(--acc)}.cn{flex:1;font-weight:500}.cm{display:flex;gap:10px;align-items:center}.cv{font-size:11px;color:var(--hot);font-weight:600;background:var(--hot-soft);padding:2px 7px;border-radius:20px;white-space:nowrap}.cc{font-size:12px;color:var(--mut);min-width:26px;text-align:right;font-variant-numeric:tabular-nums}
.main{padding:26px 32px;overflow:auto;max-height:calc(100vh - 160px)}.empty{color:var(--mut);text-align:center;margin-top:80px;line-height:1.8}
.crumb{font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:800;margin:0 0 8px;letter-spacing:-.02em;color:oklch(0.25 0.04 260)}.cmeta{margin-bottom:18px}.pill{display:inline-block;background:#fff;border:1px solid var(--line);padding:4px 11px;border-radius:20px;margin:0 7px 6px 0;font-size:12px;box-shadow:var(--shadow)}.pill.hot{color:var(--hot);border-color:var(--hot);font-weight:600}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}.chip{background:#fff;border:1px solid var(--line);color:var(--ink);padding:8px 13px;border-radius:24px;cursor:pointer;font:inherit;font-size:13px;display:inline-flex;gap:7px;align-items:center;box-shadow:var(--shadow)}.chip:hover{border-color:var(--acc)}.chip.active{background:var(--acc);border-color:var(--acc);color:#fff}.chip.active .cv{color:oklch(0.92 0.05 252)}.chip .cv{color:var(--hot);font-size:11px}.chip b{font-variant-numeric:tabular-nums}
.plist{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:11px}
.pcard{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:13px 15px;font-size:13px;text-decoration:none;color:var(--ink);display:block;box-shadow:var(--shadow);transition:transform .12s,border-color .12s}.pcard:hover{border-color:var(--acc);transform:translateY(-2px)}.pn{font-weight:600}.pu{color:var(--mut);font-size:11px;margin-top:3px;word-break:break-all}
@media(max-width:860px){.wrap{grid-template-columns:1fr}.side{position:static;max-height:none;border-right:0;border-bottom:1px solid var(--line)}.main{max-height:none}}
</style></head><body>
<header><h1>meblekobi.pl, proponowana struktura kategorii</h1>
<div class="sub">Każda kategoria oparta na realnym popycie (liczba/mc = średnie miesięczne wyszukiwania w Google, Senuto) i na liczbie produktów w katalogu. Klik kategorię, by zobaczyć produkty.</div>
<div class="stats"><div class="stat"><b>${totalProd}</b><span>produktów</span></div><div class="stat"><b>${T.length}</b><span>gałęzi menu</span></div><div class="stat"><b>${Object.keys(DATA).length}</b><span>kategorii</span></div></div>
<div class="search"><input id="q" placeholder="Szukaj produktu..."></div></header>
<div class="wrap"><nav class="side">${side}</nav><section class="main" id="main"><div class="empty">Wybierz kategorię z menu po lewej.<br>Przy każdej widzisz liczbę wyszukiwań/mc i liczbę naszych produktów.</div></section></div>
<script>
const DATA=${JSON.stringify(DATA)};
function pretty(s){return s.replace(/-\\d+$/,'').replace(/[-_]/g,' ').trim().replace(/^./,c=>c.toUpperCase());}
function url(u){return u.startsWith('http')?u:'https://'+u;}
function cards(list){return list.map(p=>'<a class="pcard" href="'+url(p.u)+'" target="_blank" rel="noopener"><div class="pn">'+pretty(p.s)+'</div><div class="pu">'+p.u.replace('https://meblekobi.pl','')+'</div></a>').join('');}
function render(key){const d=DATA[key];const name=key.split('||')[1];let h='<div class="crumb">'+name+'</div>';
 h+='<div class="cmeta"><span class="pill hot">'+(d.v>=1000?(d.v/1000).toFixed(d.v>=10000?0:1).replace('.0','')+'k':d.v)+' wyszukiwań/mc</span><span class="pill">fraza: '+d.ph+'</span><span class="pill">'+d.prods.length+' produktów</span></div>';
 if(d.subs&&d.subs.length){h+='<div class="chips"><button class="chip active" data-re="">Wszystkie <b>'+d.prods.length+'</b></button>';d.subs.forEach(s=>{const c=d.prods.filter(p=>new RegExp(s.re).test(p.s)).length;h+='<button class="chip" data-re="'+s.re+'">'+s.n+' <b>'+c+'</b> <span class="cv">'+(s.v>=1000?(s.v/1000).toFixed(s.v>=10000?0:1).replace('.0','')+'k':s.v)+'</span></button>';});h+='</div>';}
 h+='<div class="plist" id="pl">'+cards(d.prods)+'</div>';return h;}
let cur=null;
document.querySelectorAll('.bh').forEach(b=>b.addEventListener('click',()=>b.closest('.branch').classList.toggle('open')));
document.querySelectorAll('.cat').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.cat').forEach(x=>x.classList.remove('active'));c.classList.add('active');cur=c.dataset.key;document.getElementById('main').innerHTML=render(cur);document.getElementById('main').scrollTop=0;}));
document.querySelector('.branch').classList.add('open');
document.getElementById('main').addEventListener('click',e=>{const ch=e.target.closest('.chip');if(!ch||!cur)return;ch.parentNode.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');const re=ch.dataset.re;const list=re?DATA[cur].prods.filter(p=>new RegExp(re).test(p.s)):DATA[cur].prods;document.getElementById('pl').innerHTML=cards(list);});
const q=document.getElementById('q');q.addEventListener('input',()=>{const t=q.value.trim().toLowerCase();const m=document.getElementById('main');if(t.length<2){m.innerHTML='<div class="empty">Wybierz kategorię z menu.</div>';return;}let hits=[];for(const k in DATA)for(const p of DATA[k].prods)if(pretty(p.s).toLowerCase().includes(t)){hits.push(p);}m.innerHTML='<div class="crumb">Wyniki: '+t+'</div><div class="cmeta"><span class="pill">'+hits.length+'</span></div><div class="plist">'+cards(hits.slice(0,300))+'</div>';});
</script></body></html>`;
fs.writeFileSync('index.html',html);
console.log('OK index.html ('+(html.length/1024).toFixed(0)+'KB), produktów:',totalProd,'kategorii:',Object.keys(DATA).length);

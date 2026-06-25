import fs from 'fs';
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({url:m[1],slug:m[2].toLowerCase(),b:m[3]});}
function pick(buckets,slug,re,nre){let p=all.filter(x=>buckets.includes(x.b));if(slug)p=p.filter(x=>slug.every(t=>x.slug.includes(t)));if(re){const r=new RegExp(re);p=p.filter(x=>r.test(x.slug));}if(nre){const n=new RegExp(nre);p=p.filter(x=>!n.test(x.slug));}return p;}
const BEDB2=['Łóżka dziecięce grafika/bajkowe','Łóżka dziecięce klasyczne','Łóżka inne','Łóżka podwójne dziecięce/rozsuwane','Łóżka piętrowe'];

const T=[
 {br:'Pokój dziecka', cats:[
  {n:'Łóżka dziecięce',ph:'łóżka dziecięce',v:33100,b:['Łóżka dziecięce grafika/bajkowe','Łóżka dziecięce klasyczne','Łóżka inne','Łóżko domek','Łóżko Montessori/podłogowe'],subs:[
    {n:'160x80',ph:'łóżko dziecięce 160x80',v:1900,s:['160x80']},{n:'140x70',ph:'łóżko dziecięce 140x70',v:720,s:['140x70']},{n:'180x80',ph:'łóżko dziecięce 180x80',v:260,s:['180x80']},
    {n:'z barierką',ph:'łóżko dziecięce z barierką',v:1000,s:['barierk']},
    {n:'z szufladą',ph:'łóżka z szufladami',v:5400,s:['szuflad']},{n:'z materacem',ph:'łóżko z materacem',v:2400,s:['z-materac']},
    {n:'dla dziewczynki',ph:'łóżko dla dziewczynki',v:9900,s:['dziewczynk']}]},
  {n:'Łóżka piętrowe',ph:'łóżko piętrowe',v:40500,b:['Łóżka piętrowe'],subs:[{n:'80x180',ph:'łóżko piętrowe 80x180',v:140,s:['80x180']},{n:'80x160',ph:'łóżko piętrowe 80x160',v:140,s:['80x160']}]},
  {n:'Łóżka młodzieżowe',ph:'łóżka młodzieżowe',v:27100,b:['Łóżka młodzieżowe'],subs:[{n:'90x200',ph:'łóżko młodzieżowe 90x200',v:1600,s:['200x90']}]},
  {n:'Łóżka podwójne',ph:'łóżko podwójne dziecięce',v:2900,b:['Łóżka podwójne dziecięce/rozsuwane','Łóżka tapicerowane/panele'],subs:[{n:'160x200',ph:'łóżko 160x200',v:6600,s:['160x200']},{n:'140x200',ph:'łóżko 140x200',v:5400,s:['140x200']},{n:'z pojemnikiem',ph:'łóżko z pojemnikiem',v:6600,s:['pojemnik']}]},
  {n:'Barierki i stelaże',ph:'barierka do łóżka',v:1000,b:['Barierki/stelaże'],subs:[]},
  {n:'Łóżka domki',ph:'łóżeczko domek',v:9900,b:['Łóżko domek'],subs:[]},
  {n:'Łóżka Montessori',ph:'łóżko montessori',v:1300,b:['Łóżko Montessori/podłogowe'],subs:[]},
  {n:'Łóżka samochody',ph:'łóżka samochody',v:390,b:BEDB2,re:'auto|samochod|policja|wyscig|traktor',subs:[]},
  {n:'Łóżka ze zwierzętami',ph:'łóżka ze zwierzętami',v:180,b:BEDB2,re:'jednorozec|kotek|mis-|zajac|sowa|panda|bear|bunny|teddy|cat',subs:[]},
  {n:'Łóżka dla dziewczynki księżniczka',ph:'łóżko dla dziewczynki księżniczka',v:260,b:BEDB2,re:'ksiezniczk|princess|korona|zamek',subs:[]},
  {n:'Szafy dziecięce',ph:'szafa do pokoju dziecięcego',v:5400,b:['Szafy dziecięce'],subs:[]},
  {n:'Regały na zabawki',ph:'regał na zabawki',v:14800,b:['Regały'],s:['zabawk'],subs:[]},
  {n:'Półki ścienne dla dzieci',ph:'półka ścienna dla dzieci',v:480,b:['Półki / dla dzieci'],subs:[]},
  {n:'Skrzynie na zabawki',ph:'skrzynia na zabawki',v:5400,b:['Skrzynie na zabawki'],subs:[]},
  {n:'Krzesełka i stoliki dziecięce',ph:'stolik i krzesełko dla dziecka',v:880,b:['Stoliki+krzesełka dziecięce','Krzesła dziecięce ergonomiczne'],subs:[]},
 ]},
 {br:'Biuro i nauka', cats:[
  {n:'Biurka',ph:'biurko',v:90500,b:['Biurka (dziecięce/proste)','Biurka rozkładane/chowane (VERTO)'],subs:[
    {n:'białe',ph:'biurko białe',v:12100,s:['bial']},{n:'dąb',ph:'biurko dąb',v:2900,s:['dab']},{n:'komputerowe',ph:'biurka komputerowe',v:6600,s:['komputerow']},{n:'z szufladami',ph:'biurko z szufladami',v:1600,s:['szuflad']}]},
  {n:'Biurka regulowane elektrycznie',ph:'biurko regulowane elektrycznie',v:9900,b:['Biurka regulowane/elektryczne'],subs:[]},
  {n:'Biurka narożne',ph:'biurko narożne',v:27100,b:['Biurka narożne'],subs:[]},
  {n:'Biurka i krzesła gamingowe',ph:'biurko gamingowe',v:830,b:['Krzesła/biurka gamingowe'],subs:[]},
 ]},
 {br:'Sypialnia', cats:[
  {n:'Komody',ph:'komoda',v:60500,b:['Komody (ogólne)','Komody z grafiką'],subs:[
    {n:'białe',ph:'komoda biała',v:27100,s:['bial']},{n:'dąb',ph:'komoda dąb',v:3600,s:['dab']},{n:'czarne',ph:'komoda czarna',v:4400,s:['czarn']},{n:'kaszmir',ph:'komoda kaszmir',v:4400,s:['kaszmir']}]},
  {n:'Szafki nocne',ph:'szafka nocna',v:49500,b:['Szafki nocne'],subs:[{n:'białe',ph:'szafka nocna biała',v:8100,s:['bial']},{n:'dąb',ph:'szafka nocna dąb',v:1000,s:['dab']}]},
  {n:'Garderoby i szafy',ph:'garderoba',v:3600,b:['Garderoby / szafy wielofunkcyjne','Szafy (ogólne)'],subs:[]},
  {n:'Toaletki',ph:'toaletka',v:6600,b:['Toaletki'],subs:[]},
  {n:'Materace',ph:'materac dziecięcy',v:2400,b:['Materace i dopłaty'],subs:[{n:'kieszeniowe',ph:'materac kieszeniowy',v:2400,s:['kieszeniow']}]},
  {n:'Półkotapczany',ph:'półkotapczan',v:480,b:['Półkotapczany (VERTO)'],subs:[]},
 ]},
 {br:'Salon i jadalnia', cats:[
  {n:'Stoliki kawowe i ławy',ph:'stolik kawowy',v:110000,b:['Stoliki kawowe / ławy'],subs:[{n:'okrągłe',ph:'stolik kawowy okrągły',v:27100,s:['okragl']},{n:'ławy do salonu',ph:'ława do salonu',v:14800,s:['lawa']},{n:'czarne',ph:'stolik kawowy czarny',v:4400,s:['czarn']}]},
  {n:'Stoły do jadalni',ph:'stół do jadalni',v:18100,b:['Stoły (jadalnia)'],subs:[{n:'okrągłe',ph:'stół okrągły rozkładany',v:33100,s:['okragl']}]},
  {n:'Szafki RTV',ph:'szafka rtv',v:49500,b:['Szafki RTV'],nre:'zestaw-mebli-do-salonu|mebloscianka|icaro',subs:[{n:'białe',ph:'szafka rtv biała',v:3600,s:['bial']},{n:'dąb',ph:'szafka rtv dąb',v:1300,s:['dab']},{n:'czarne',ph:'szafka rtv czarna',v:2400,s:['czarn']},{n:'wiszące',ph:'szafka rtv wisząca',v:9900,s:['wiszac']}]},
  {n:'Meblościanki / zestawy do salonu',ph:'meblościanka',v:14800,b:['Szafki RTV','Łazienka/kuchnia - zabudowa'],re:'zestaw-mebli-do-salonu|mebloscianka|icaro',subs:[]},
  {n:'Krzesła do jadalni',ph:'krzesła do jadalni',v:74000,b:['Krzesła (jadalnia/obrotowe)'],subs:[]},
  {n:'Kanapy i narożniki',ph:'narożnik rozkładany',v:18100,b:['Kanapy/narożniki/sofy'],subs:[{n:'z funkcją spania',ph:'kanapa z funkcją spania',v:8100,s:['spania']}]},
  {n:'Fotele wypoczynkowe',ph:'fotele wypoczynkowe',v:49500,b:['Fotele/pufy/ławki'],s:['fotel'],subs:[]},
  {n:'Pufy i podnóżki',ph:'pufy i podnóżki',v:12100,b:['Fotele/pufy/ławki'],s:['puf'],subs:[]},
  {n:'Ławki tapicerowane',ph:'ławka tapicerowana',v:1900,b:['Fotele/pufy/ławki'],s:['lawk'],subs:[]},
  {n:'Taborety i hokery barowe',ph:'hoker barowy',v:18100,b:['Taborety / hokery barowe'],subs:[]},
  {n:'Regały',ph:'regał',v:27100,b:['Regały'],subs:[]},
 ]},
 {br:'Łazienka i kuchnia', cats:[
  {n:'Meble łazienkowe na wymiar',ph:'meble łazienkowe na wymiar',v:2400,b:['Łazienka/kuchnia - zabudowa','Pomocniki kuchenne'],subs:[
    {n:'blaty',ph:'blaty kuchenne',v:14800,s:['blat']},{n:'szafki pod umywalkę',ph:'szafka pod umywalkę',v:1900,s:['umywalk']},{n:'słupki',ph:'słupek łazienkowy',v:1900,s:['slupek']}]},
 ]},
 {br:'Przedpokój', cats:[
  {n:'Szafki na buty',ph:'szafka na buty',v:2900,b:['Szafki na buty'],subs:[]},
  {n:'Wieszaki do przedpokoju',ph:'wieszak do przedpokoju',v:18100,b:['Wieszaki'],subs:[]},
  {n:'Konsole do przedpokoju',ph:'konsola do przedpokoju',v:18100,b:['Przedpokój (zestawy/konsole)'],subs:[]},
 ]},
 {br:'Ogród', cats:[{n:'Meble ogrodowe',ph:'meble ogrodowe',v:135000,b:['Meble ogrodowe'],subs:[]}]},
 {br:'Akcesoria', cats:[
  {n:'Uchwyty i gałki meblowe',ph:'uchwyt do mebli',v:14800,b:['Akcesoria meblowe (uchwyty/gałki)'],subs:[]},
  {n:'Drapaki dla kota',ph:'drapak dla kota',v:590,b:['Akcesoria dla zwierząt'],subs:[]},
 ]},
];

// CZYSTE, ręcznie skontrolowane podkategorie (nazwa = keyword, re = filtr slug). Bez duplikatów, poprawne przypisanie.
const CLEANSUBS={
 'Łóżka dziecięce':[
   {n:'Łóżka dziecięce 160x80',re:'160x80'},{n:'Łóżka dziecięce 140x70',re:'140x70'},{n:'Łóżka dziecięce 180x80',re:'180x80'},
   {n:'Łóżka z barierką',re:'barierk'},{n:'Łóżka z szufladą',re:'szuflad'},{n:'Łóżka z materacem',re:'(?<!be)z-materac'},
   {n:'Łóżka dla dziewczynki',re:'dziewczynk|rozow'},{n:'Łóżka dla chłopca',re:'chlopc|niebiesk|auto|samochod|policja|traktor'},{n:'Łóżka bez materaca',re:'bez-materac'},{n:'Łóżka białe',re:'bialy|biale'},{n:'Łóżka dąb',re:'dab|artisan'}],
 'Łóżka podwójne':[{n:'Łóżka 160x200',re:'160x200'},{n:'Łóżka 140x200',re:'140x200'},{n:'Łóżka z pojemnikiem',re:'pojemnik'},{n:'Łóżka tapicerowane',re:'tapicerowan'}],
 'Łóżka piętrowe':[{n:'Łóżka piętrowe domki',re:'domek'},{n:'Łóżka piętrowe 80x180',re:'80x180'},{n:'Łóżka piętrowe 80x160',re:'80x160'}],
 'Komody':[{n:'Komody białe',re:'bialy|biala'},{n:'Komody dąb',re:'dab|artisan|sonoma'},{n:'Komody czarne',re:'czarn'},{n:'Komody kaszmir',re:'kaszmir'},{n:'Komody z szufladami',re:'szuflad'},{n:'Komody na nóżkach',re:'nogi|nozk'},{n:'Komody skandynawskie',re:'skandynaw'},{n:'Komody loft',re:'loft'}],
 'Szafki nocne':[{n:'Szafki nocne białe',re:'bialy|biala'},{n:'Szafki nocne dąb',re:'dab|sonoma'},{n:'Szafki nocne czarne',re:'czarn'},{n:'Szafki nocne z szufladą',re:'szuflad'}],
 'Szafki RTV':[{n:'Szafki RTV białe',re:'bialy|biala'},{n:'Szafki RTV dąb',re:'dab|artisan'},{n:'Szafki RTV czarne',re:'czarn'},{n:'Szafki RTV wiszące',re:'wiszac'},{n:'Szafki RTV na nóżkach',re:'nogi|nozk'},{n:'Szafki RTV z półkami',re:'polk'},{n:'Szafki RTV loft',re:'loft'}],
 'Biurka':[{n:'Biurka białe',re:'bialy|biale'},{n:'Biurka dąb',re:'dab|artisan|sonoma'},{n:'Biurka komputerowe',re:'komputerow'},{n:'Biurka z szufladami',re:'szuflad'}],
 'Stoliki kawowe i ławy':[{n:'Stoliki kawowe okrągłe',re:'okragl'},{n:'Stoliki kawowe dąb',re:'dab|artisan|sonoma'},{n:'Stoliki kawowe czarne',re:'czarn'},{n:'Stoliki kawowe marmur',re:'marmur'},{n:'Ławy do salonu',re:'lawa'}],
 'Stoły do jadalni':[{n:'Stoły okrągłe',re:'okragl'},{n:'Stoły rozkładane',re:'rozkladan'},{n:'Stoły dąb',re:'dab|artisan|sonoma'},{n:'Stoły marmur',re:'marmur'}],
 'Materace':[{n:'Materace kieszeniowe',re:'kieszeniow'},{n:'Materace kokosowe',re:'kokos'},{n:'Materace piankowe',re:'piankow|pianka'},{n:'Materace medyczne',re:'medyczn'},{n:'Materace termoelastyczne',re:'visco|termoelast'}],
 'Regały':[{n:'Regały na książki',re:'ksiazk'},{n:'Regały dąb',re:'dab|artisan|craft'},{n:'Regały białe',re:'bialy|biale'},{n:'Regały otwarte',re:'otwart'}],
 'Szafki na buty':[{n:'Szafki na buty białe',re:'bialy|biala'},{n:'Szafki na buty dąb',re:'dab|sonoma'},{n:'Szafki na buty z siedziskiem',re:'siedzisk'}],
 'Meble łazienkowe na wymiar':[{n:'Szafki pod umywalkę',re:'umywalk'},{n:'Słupki łazienkowe',re:'slupek'},{n:'Blaty łazienkowe',re:'blat'},{n:'Szafki z lustrem',re:'lustr'},{n:'Szafki nad pralkę',re:'pralk'}],
 'Garderoby i szafy':[{n:'Szafy dwudrzwiowe',re:'dwudrzwiow'},{n:'Szafy z szufladami',re:'szuflad'},{n:'Garderoby',re:'garderob'}],
};
const DKMAP={'Łóżka dziecięce':'Łóżka dziecięce','Łóżka piętrowe':'Łóżka piętrowe','Łóżka młodzieżowe':'Łóżka młodzieżowe','Łóżka podwójne':'Łóżka podwójne','Komody':'Komody','Szafki nocne':'Szafki nocne','Szafki RTV':'Szafki RTV','Biurka':'Biurka','Stoły do jadalni':'Stoły','Stoliki kawowe i ławy':'Stoliki kawowe / ławy','Krzesła do jadalni':'Krzesła','Kanapy i narożniki':'Kanapy / narożniki','Fotele wypoczynkowe':'Fotele / pufy','Pufy i podnóżki':'Fotele / pufy','Regały':'Regały','Regały na zabawki':'Regały','Materace':'Materace','Toaletki':'Toaletki','Meble łazienkowe na wymiar':'Meble łazienkowe','Szafki na buty':'Szafki na buty','Szafy dziecięce':'Szafy / garderoby','Garderoby i szafy':'Szafy / garderoby'};
function subsFor(cat){ if(CLEANSUBS[cat.n]) return CLEANSUBS[cat.n].map(s=>({n:s.n,re:s.re})); return (cat.subs||[]).map(s=>({n:s.n,re:s.s.join('|')})); }

// "MEBLE" = pierwsze wejście: wszystkie typy A-Z (jak meble.pl). Pokoje zostają jako drugi sposób.
const allCats=[];const seenN=new Set();
for(const br of T) for(const c of br.cats){ if(!seenN.has(c.n)){seenN.add(c.n);allCats.push(c);} }
allCats.sort((a,b)=>a.n.localeCompare(b.n,'pl'));
T.unshift({br:'Meble', cats:allCats});

function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function fmt(v){return v>=1000?(v/1000).toFixed(v>=10000?0:1).replace('.0','')+'k':String(v);}

const DATA={};let totalProd=0;const seen=new Set();
let nav='';let megas='';
for(const [bi,br] of T.entries()){
  nav+=`<button class="navitem" data-bi="${bi}">${esc(br.br)}<svg viewBox="0 0 10 6" class="caret"><path d="M1 1l4 4 4-4"/></svg></button>`;
  // DWA PANELE: lewy = lista kategorii, prawy = podkategorie najechanej kategorii (jak meble.pl)
  let left=''; let panels='';
  br.cats.forEach((cat,ci)=>{
    const prods=pick(cat.b,cat.s,cat.re,cat.nre);prods.forEach(p=>{if(!seen.has(p.url)){seen.add(p.url);totalProd++;}});
    const key=br.br+'||'+cat.n;
    const subs=subsFor(cat);
    DATA[key]={ph:cat.ph,v:cat.v,prods:prods.map(p=>({u:p.url,s:p.slug})),subs};
    const mid=bi+'-'+ci;
    left+=`<button class="mleft" data-mr="${mid}" data-key="${esc(key)}">${esc(cat.n)}<span>${prods.length}</span></button>`;
    let subsH='';
    for(const s of subs){const c=prods.filter(p=>new RegExp(s.re).test(p.slug)).length;if(c>0)subsH+=`<button class="msub" data-key="${esc(key)}" data-re="${esc(s.re)}">${esc(s.n)} <i>${c}</i></button>`;}
    panels+=`<div class="mr-panel" data-mr="${mid}"><button class="mr-all" data-key="${esc(key)}">${esc(cat.n)} — wszystkie (${prods.length})</button>${subsH?`<div class="mr-subs">${subsH}</div>`:'<div class="mr-empty">Brak dalszego podziału</div>'}</div>`;
  });
  megas+=`<div class="mega" data-mega="${bi}"><div class="mega-inner mega2"><div class="mega-left">${left}</div><div class="mega-right">${panels}</div></div></div>`;
}

const html=`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>meblekobi.pl — proponowane menu kategorii</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:oklch(0.985 0.004 255);--panel:#fff;--panel2:oklch(0.965 0.008 255);--line:oklch(0.9 0.012 255);--ink:oklch(0.28 0.03 260);--mut:oklch(0.55 0.03 260);--acc:oklch(0.55 0.14 252);--acc-d:oklch(0.46 0.15 252);--acc-soft:oklch(0.96 0.03 252);--hot:oklch(0.5 0.13 160);--hot-soft:oklch(0.95 0.05 160);--shadow:0 1px 2px oklch(0.5 0.05 260/.06),0 6px 22px oklch(0.5 0.05 260/.08)}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Manrope,system-ui,sans-serif;font-size:15px;line-height:1.55}
.topbar{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}
.tb-row{max-width:1280px;margin:0 auto;display:flex;align-items:center;gap:18px;padding:14px 24px}
.logo{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:22px;letter-spacing:-.02em;color:var(--acc);text-decoration:none;white-space:nowrap}
.logo span{color:var(--ink)}
.tb-search{margin-left:auto;flex:0 1 320px}.tb-search input{width:100%;padding:9px 14px;border-radius:24px;border:1px solid var(--line);background:var(--panel2);font:inherit;font-size:13.5px}.tb-search input:focus{outline:none;border-color:var(--acc);background:#fff}
.nav{max-width:1280px;margin:0 auto;display:flex;gap:2px;padding:0 16px;overflow-x:auto}
.navitem{display:inline-flex;align-items:center;gap:6px;background:none;border:0;border-bottom:2px solid transparent;color:var(--ink);font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:14px;padding:13px 14px;cursor:pointer;white-space:nowrap}
.navitem:hover{color:var(--acc)}.navitem.open{color:var(--acc);border-bottom-color:var(--acc)}
.caret{width:10px;height:6px;fill:none;stroke:currentColor;stroke-width:1.6;transition:transform .2s}.navitem.open .caret{transform:rotate(180deg)}
.mega{display:none;position:absolute;left:0;right:0;background:#fff;border-bottom:1px solid var(--line);box-shadow:var(--shadow);z-index:19}
.mega.open{display:block}
.mega-inner{max-width:1280px;margin:0 auto;padding:22px 24px 26px}
.mega-head{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:18px;margin-bottom:16px;color:oklch(0.25 0.04 260)}.mega-head span{font-family:Manrope;font-weight:500;font-size:13px;color:var(--mut);margin-left:10px}
.mega2{display:flex;max-height:50vh}
.mega-left{width:300px;flex-shrink:0;border-right:1px solid var(--line);overflow:auto;padding-right:8px}
.mleft{width:100%;display:flex;justify-content:space-between;align-items:center;gap:10px;background:none;border:0;border-radius:8px;padding:9px 12px;text-align:left;cursor:pointer;font:inherit;font-size:14px;color:var(--ink)}
.mleft span{font-size:11px;color:var(--mut)}
.mleft:hover,.mleft.active{background:var(--acc-soft);color:var(--acc)}.mleft.active span{color:var(--acc)}
.mega-right{flex:1;overflow:auto;padding:2px 8px 2px 28px}
.mr-panel{display:none}.mr-panel.active{display:block}
.mr-all{background:none;border:0;border-bottom:2px solid var(--acc);padding:0 0 8px;margin-bottom:12px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;color:var(--ink);cursor:pointer;text-align:left}
.mr-all:hover{color:var(--acc)}
.mr-subs{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:4px 18px}
.msub{background:none;border:0;padding:6px 0;text-align:left;cursor:pointer;font:inherit;font-size:13px;color:var(--mut);display:flex;justify-content:space-between;gap:8px;line-height:1.3}
.msub:hover{color:var(--acc)}.msub i{font-style:normal;font-size:11px;opacity:.55}
.mr-empty{color:var(--mut);font-size:13px;padding:4px 0}
.wrap{max-width:1280px;margin:0 auto;padding:28px 24px 60px}
.hero{text-align:center;padding:30px 0 26px}.hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:clamp(22px,3vw,32px);margin:0 0 8px;letter-spacing:-.02em;color:oklch(0.25 0.04 260)}.hero p{color:var(--mut);margin:0 auto;max-width:60ch;font-size:14px}
.stats{display:flex;gap:30px;justify-content:center;margin-top:18px}.stat b{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:22px;color:var(--acc);display:block}.stat span{color:var(--mut);font-size:11px;text-transform:uppercase;letter-spacing:.06em}
.crumb{font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:800;margin:0 0 8px;letter-spacing:-.02em;color:oklch(0.25 0.04 260)}.crumb small{font-weight:600;color:var(--mut);font-family:Manrope}
.cmeta{margin-bottom:18px}.pill{display:inline-block;background:#fff;border:1px solid var(--line);padding:4px 11px;border-radius:20px;margin:0 7px 6px 0;font-size:12px;box-shadow:var(--shadow)}.pill.hot{color:var(--hot);border-color:var(--hot);font-weight:600}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}.chip{background:#fff;border:1px solid var(--line);color:var(--ink);padding:8px 13px;border-radius:24px;cursor:pointer;font:inherit;font-size:13px;display:inline-flex;gap:7px;align-items:center;box-shadow:var(--shadow)}.chip:hover{border-color:var(--acc)}.chip.active{background:var(--acc);border-color:var(--acc);color:#fff}.chip.active .cv{color:oklch(0.92 0.05 252)}.chip .cv{color:var(--hot);font-size:11px}.chip b{font-variant-numeric:tabular-nums}
.subhead{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:13px;color:var(--mut);text-transform:uppercase;letter-spacing:.05em;margin:4px 0 8px}
.subcats{display:flex;flex-direction:column;margin-bottom:24px;max-width:460px;border-top:1px solid var(--line)}
.subcat{display:flex;justify-content:space-between;align-items:center;gap:10px;background:none;border:0;border-bottom:1px solid var(--line);padding:10px 6px;cursor:pointer;font:inherit;color:var(--ink);text-align:left}
.subcat:hover .scn{color:var(--acc)}
.subcat.active .scn{color:var(--acc);font-weight:700}
.scn{font-weight:500;font-size:14.5px}.scc{font-size:12px;color:var(--mut);font-variant-numeric:tabular-nums}
.plist{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:11px}
.pcard{background:#fff;border:1px solid var(--line);border-radius:12px;padding:13px 15px;font-size:13px;text-decoration:none;color:var(--ink);display:block;box-shadow:var(--shadow);transition:transform .12s,border-color .12s}.pcard:hover{border-color:var(--acc);transform:translateY(-2px)}.pn{font-weight:600}.pu{color:var(--mut);font-size:11px;margin-top:3px;word-break:break-all}
.empty{text-align:center;color:var(--mut);padding:50px 0;line-height:1.8}
#scrim{display:none;position:fixed;inset:0;background:transparent;z-index:10}#scrim.on{display:block}
@media(max-width:720px){.tb-search{display:none}.mgrid{grid-template-columns:1fr 1fr}.mega{position:static}}
@media(max-width:480px){.mgrid{grid-template-columns:1fr}}
</style></head><body>
<div class="topbar">
 <div class="tb-row"><a class="logo" href="#">KOBI<span> meble</span></a><div class="tb-search"><input id="q" placeholder="Szukaj produktu..."></div></div>
 <nav class="nav">${nav}</nav>
 ${megas}
</div>
<div id="scrim"></div>
<div class="wrap">
 <div class="hero" id="hero">
  <h1>Proponowane menu kategorii meblekobi.pl</h1>
  <p>Tak może wyglądać menu sklepu. Najedź lub kliknij pozycję u góry, wybierz kategorię i zobacz produkty. Przy każdej kategorii liczba miesięcznych wyszukiwań w Google (Senuto) oraz liczba produktów w katalogu.</p>
  <div class="stats"><div class="stat"><b>${totalProd}</b><span>produktów</span></div><div class="stat"><b>${T.length}</b><span>działów menu</span></div><div class="stat"><b>${Object.keys(DATA).length}</b><span>kategorii</span></div></div>
 </div>
 <section id="main"></section>
</div>
<script>
const DATA=${JSON.stringify(DATA)};
function pretty(s){return s.replace(/-\\d+$/,'').replace(/[-_]/g,' ').trim().replace(/^./,c=>c.toUpperCase());}
function clean(p){return (p||'').replace(/\\b(ikea|agata|allegro|opinie|cena|tanie|castorama|leroy|jysk|brw|halmar)\\b/gi,'').replace(/\\s+/g,' ').trim().replace(/^./,c=>c.toUpperCase());}
function url(u){return u.startsWith('http')?u:'https://'+u;}
function fmt(v){return v>=1000?(v/1000).toFixed(v>=10000?0:1).replace('.0','')+'k':String(v);}
function cards(list){return list.map(p=>'<a class="pcard" href="'+url(p.u)+'" target="_blank" rel="noopener"><div class="pn">'+pretty(p.s)+'</div><div class="pu">'+p.u.replace('https://meblekobi.pl','')+'</div></a>').join('');}
const scrim=document.getElementById('scrim');
function closeMega(){document.querySelectorAll('.mega').forEach(m=>m.classList.remove('open'));document.querySelectorAll('.navitem').forEach(n=>n.classList.remove('open'));scrim.classList.remove('on');}
document.querySelectorAll('.navitem').forEach(n=>n.addEventListener('click',e=>{e.stopPropagation();const bi=n.dataset.bi;const m=document.querySelector('.mega[data-mega="'+bi+'"]');const isOpen=m.classList.contains('open');closeMega();if(!isOpen){m.classList.add('open');n.classList.add('open');scrim.classList.add('on');}}));
scrim.addEventListener('click',closeMega);
let cur=null;
function render(key){const d=DATA[key];const name=key.split('||')[1];const branch=key.split('||')[0];
 document.getElementById('hero').style.display='none';
 let h='<div class="crumb">'+name+' <small>w dziale '+branch+'</small></div>';
 h+='<div class="cmeta"><span class="pill hot">'+fmt(d.v)+' wyszukiwań/mc</span><span class="pill">fraza: '+d.ph+'</span><span class="pill">'+d.prods.length+' produktów</span></div>';
 const vis=(d.subs||[]).map(s=>({...s,c:d.prods.filter(p=>new RegExp(s.re).test(p.s)).length})).filter(s=>s.c>0);
 if(vis.length){h+='<div class="subhead">Podkategorie ('+vis.length+'):</div><div class="subcats"><button class="subcat active" data-re=""><span class="scn">Wszystkie</span><span class="scc">'+d.prods.length+'</span></button>';vis.forEach(s=>{h+='<button class="subcat" data-re="'+s.re+'"><span class="scn">'+s.n+'</span><span class="scc">'+s.c+'</span></button>';});h+='</div>';}
 h+=d.prods.length?'<div class="plist" id="pl">'+cards(d.prods)+'</div>':'<div class="empty">Kategoria koncepcyjna lub do dosourcingu.</div>';
 return h;}
document.querySelectorAll('.mega').forEach(m=>{
  const lefts=[...m.querySelectorAll('.mleft')];const panels=[...m.querySelectorAll('.mr-panel')];
  function act(mid){lefts.forEach(l=>l.classList.toggle('active',l.dataset.mr===mid));panels.forEach(p=>p.classList.toggle('active',p.dataset.mr===mid));}
  lefts.forEach(l=>{l.addEventListener('mouseenter',()=>act(l.dataset.mr));l.addEventListener('click',()=>{cur=l.dataset.key;closeMega();document.getElementById('main').innerHTML=render(cur);window.scrollTo({top:0,behavior:'smooth'});});});
  if(lefts[0])act(lefts[0].dataset.mr);
});
document.querySelectorAll('.mr-all').forEach(c=>c.addEventListener('click',()=>{cur=c.dataset.key;closeMega();document.getElementById('main').innerHTML=render(cur);window.scrollTo({top:0,behavior:'smooth'});}));
document.querySelectorAll('.msub').forEach(c=>c.addEventListener('click',()=>{cur=c.dataset.key;const re=c.dataset.re;closeMega();document.getElementById('main').innerHTML=render(cur);const sc=[...document.querySelectorAll('.subcat')].find(x=>x.dataset.re===re);if(sc)sc.click();window.scrollTo({top:0,behavior:'smooth'});}));
document.getElementById('main').addEventListener('click',e=>{const ch=e.target.closest('.subcat');if(!ch||!cur)return;ch.parentNode.querySelectorAll('.subcat').forEach(x=>x.classList.remove('active'));ch.classList.add('active');const re=ch.dataset.re;const list=re?DATA[cur].prods.filter(p=>new RegExp(re).test(p.s)):DATA[cur].prods;document.getElementById('pl').innerHTML=cards(list);});
const q=document.getElementById('q');q.addEventListener('input',()=>{const t=q.value.trim().toLowerCase();const m=document.getElementById('main');document.getElementById('hero').style.display='none';if(t.length<2){m.innerHTML='<div class="empty">Wpisz min. 2 znaki albo wybierz kategorię z menu u góry.</div>';return;}let hits=[];for(const k in DATA)for(const p of DATA[k].prods)if(pretty(p.s).toLowerCase().includes(t))hits.push(p);m.innerHTML='<div class="crumb">Wyniki: '+t+' <small>'+hits.length+' produktów</small></div><div class="plist">'+cards(hits.slice(0,300))+'</div>';});
</script></body></html>`;
fs.writeFileSync('index.html',html);
// EKSPORT dowodu: kazdy produkt -> kategoria + dopasowane podkategorie (keyword)
let pc='url;produkt;dzial;kategoria;podkategorie(frazy-cele)\n';let cov=0;const covered=new Set();
for(const p of all){
  for(const br of T){ if(br.br==='Meble')continue;
    for(const cat of br.cats){
      if(!cat.b.includes(p.b))continue;
      if(cat.s&&!cat.s.every(t=>p.slug.includes(t)))continue;
      if(cat.re&&!new RegExp(cat.re).test(p.slug))continue;
      if(cat.nre&&new RegExp(cat.nre).test(p.slug))continue;
      const subs=CLEANSUBS[cat.n]||[];
      const msub=subs.filter(s=>new RegExp(s.re).test(p.slug)).map(s=>s.n).join(' | ');
      pc+=`${p.url};${p.slug};${br.br};${cat.n};${msub}\n`;covered.add(p.url);
    }
  }
}
fs.writeFileSync('strategia/produkt-kategorie-2026-06-25.csv',pc);
// PELNA LISTA kategorii + podkategorii (nazwy)
function cap(p){return (p||'').replace(/^./,c=>c.toUpperCase());}
let ol='# PEŁNA LISTA KATEGORII meblekobi.pl (nazwy = frazy-cele)\n';
for(const br of T){ if(br.br==='Meble')continue; ol+='\n## '+br.br+'\n';
  for(const cat of br.cats){ const key=br.br+'||'+cat.n; const d=DATA[key]||{prods:[],subs:[]};
    ol+='- **'+cat.n+'** — '+d.prods.length+' prod. ('+fmt(cat.v)+'/mc)\n';
    (d.subs||[]).forEach(s=>{const c=d.prods.filter(p=>new RegExp(s.re).test(p.s)).length; if(c>0) ol+='   - '+s.n+' ('+c+' prod.)\n';});
  }
}
fs.writeFileSync('strategia/PELNA-LISTA-KATEGORII.md',ol);
console.log('OK index.html, produktów:',totalProd,'| eksport produkt->kategorie: pokrytych',covered.size,'z',all.length);

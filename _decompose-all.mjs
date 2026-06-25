import fs from 'fs';import ExcelJS from 'exceljs';
function deb(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
// frazy
const dir='C:/Users/mahin/Downloads/';
const files=fs.readdirSync(dir).filter(f=>/baza_s.*2026_06_2[01].*\.xlsx$/.test(f) || /analiza_widoczno_ci_raport__(meble_pl|interbeds)/.test(f));
const kw=new Map();for(const f of files){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(dir+f);const ws=wb.worksheets[0];ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0;if(k){const d=deb(k);const c=kw.get(d);if(!c||v>c.v)kw.set(d,{k,v});}});}
function demand(roots,attrRe){let b={k:'-',v:0};for(const [d,o] of kw){if(!roots.some(r=>d.includes(r)))continue;if(!attrRe.test(d))continue;if(o.v>b.v)b=o;}return b;}
// produkty
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({s:m[2].toLowerCase(),b:m[3]});}

// biblioteka atrybutow: [label, slugRegex, phraseRegex]
const A=[
 // kolor
 ['białe',/bial/,/bial/],['czarne',/czarn/,/czarn/],['dąb',/dab|artisan|sonoma|craft|wotan/,/dab|artisan|sonoma/],['szare',/szar/,/szar/],['różowe',/rozow/,/rozow|dziewczynk/],['kaszmir',/kaszmir/,/kaszmir/],['niebieskie',/niebiesk/,/niebiesk/],['zielone',/zielon|oliwk/,/zielon/],
 // rozmiar lozka
 ['160x80',/160x80/,/160x80/],['140x70',/140x70/,/140x70/],['180x80',/180x80/,/180x80/],['90x200',/90x200|200x90/,/90x200/],['120x200',/120x200/,/120x200/],['140x200',/140x200/,/140x200/],['160x200',/160x200/,/160x200/],['80x160',/80x160/,/80x160/],['80x180',/80x180/,/80x180/],
 // motyw
 ['samochody / autka',/auto|samochod|policja|wyscig/,/auto|samochod/],['traktor',/traktor/,/traktor/],['zwierzątka',/jednorozec|kotek|mis|zajac|sowa|animal|bear|bunny|panda/,/jednorozec|zwierz|kotek|mis/],['księżniczka',/ksiezniczk|princess|korona|zamek/,/ksiezniczk|princess/],['domek',/domek/,/domek/],['gwiazdki',/gwiazd/,/gwiazd/],
 // styl
 ['skandynawskie',/skandynaw|scandi/,/skandynaw/],['loft / industrialne',/loft|industrial|metalow/,/loft|industrial/],['ryflowane',/ryflowan/,/ryflowan/],['glamour',/glamour|velvet/,/glamour/],['nowoczesne',/nowoczesn/,/nowoczesn/],
 // funkcja / ksztalt
 ['z barierką',/barierk/,/barierk/],['z szufladą',/szuflad/,/szuflad/],['z pojemnikiem',/pojemnik/,/pojemnik/],['z materacem',/z-materac/,/z materacem/],['na nóżkach',/nogi|nozk/,/nozk|nogach/],['wiszące',/wiszac/,/wiszac/],['regulowane',/regulowan|elektr|podnoszon/,/regulowan|elektr/],['rozkładane',/rozkladan/,/rozkladan/],['narożne',/naroz/,/naroz/],['okrągłe',/okragl/,/okragl/],['marmur',/marmur/,/marmur/],['welurowe',/welur/,/welur/],['z funkcją spania',/spania|funkcja-spania/,/funkcja spania/],['komputerowe',/komputerow/,/komputerow/],['gamingowe',/gaming/,/gaming/],['z nadstawką',/nadstaw/,/nadstaw/],['z lustrem',/lustr/,/lustr/],['z półkami',/polk/,/polk/],['pod umywalkę',/umywalk/,/umywalk/],['słupki',/slupek/,/slupek/],['blaty',/blat/,/blat/],['nad pralkę',/pralk/,/pralk/],['dla dziewczynki',/dziewczynk|rozow|serduszk/,/dla dziewczynk/],['dla chłopca',/chlopc|niebiesk/,/dla chlopc/],
 // typy materacy
 ['medyczne / rehabilitacyjne',/medyczn|rehabilit/,/medyczn|rehabilit/],['z pianką aloe vera',/aloe/,/aloe|vera/],['turystyczne / składane',/turystyczn/,/turystyczn|skladan/],['termoelastyczne / visco',/visco|termoelast/,/visco|termoelast/],['kokosowe',/kokos/,/kokos/],['piankowe',/piankow|pianka/,/piankow/],
];

// kategorie: [nazwa, [buckety], [phraseRoots]]
const C=[
 ['Łóżka dziecięce',['Łóżka dziecięce grafika/bajkowe','Łóżka dziecięce klasyczne','Łóżka inne','Łóżko domek','Łóżko Montessori/podłogowe'],['lozk','lozeczk']],
 ['Łóżka piętrowe',['Łóżka piętrowe'],['pietrow']],
 ['Łóżka młodzieżowe',['Łóżka młodzieżowe'],['mlodziezow']],
 ['Łóżka podwójne',['Łóżka podwójne dziecięce/rozsuwane'],['podwojn','lozk']],
 ['Komody',['Komody (ogólne)','Komody z grafiką'],['komod']],
 ['Szafki nocne',['Szafki nocne'],['nocn']],
 ['Szafki RTV',['Szafki RTV'],['rtv']],
 ['Biurka',['Biurka (dziecięce/proste)','Biurka narożne','Biurka regulowane/elektryczne','Krzesła/biurka gamingowe'],['biurk']],
 ['Stoły',['Stoły (jadalnia)'],['stol']],
 ['Stoliki kawowe / ławy',['Stoliki kawowe / ławy'],['stolik','lawa']],
 ['Krzesła',['Krzesła (jadalnia/obrotowe)'],['krzesl']],
 ['Kanapy / narożniki',['Kanapy/narożniki/sofy'],['kanapa','naroznik','sofa']],
 ['Fotele / pufy',['Fotele/pufy/ławki'],['fotel','puf']],
 ['Regały',['Regały'],['regal']],
 ['Szafy / garderoby',['Szafy dziecięce','Szafy (ogólne)','Garderoby / szafy wielofunkcyjne'],['szaf','garderob']],
 ['Materace',['Materace i dopłaty'],['materac']],
 ['Toaletki',['Toaletki'],['toaletk']],
 ['Meble łazienkowe',['Łazienka/kuchnia - zabudowa'],['lazienk','umywalk','slupek','blat','kuchen']],
 ['Szafki na buty',['Szafki na buty'],['buty']],
];

const JSONOUT={};
let out='# Pełna dekompozycja KAŻDEJ kategorii na podkategorie (popyt + towar) 2026-06-23\n\n';
out+='Próg: ✅ pełna podkat. = ≥5 prod. i ≥500/mc · ◑ filtr = ≥3 prod. i ≥150/mc · reszta pominięta.\n\n';
for(const [name,bk,roots] of C){
 const pool=all.filter(p=>bk.includes(p.b));
 const rows=[];
 for(const [lab,sre,pre] of A){
   const n=pool.filter(p=>sre.test(p.s)).length;
   if(n<3)continue;
   const d=demand(roots,pre);
   let kind=null;if(n>=5&&d.v>=500)kind='✅';else if(n>=3&&d.v>=150)kind='◑';else if(n>=5)kind='○';
   if(kind)rows.push({lab,n,d,kind,re:sre.source});
 }
 rows.sort((a,b)=>b.d.v-a.d.v);
 JSONOUT[name]=rows.map(r=>({n:r.lab,ph:r.d.k,v:r.d.v,re:r.re,kind:r.kind}));
 out+=`## ${name} (${pool.length} prod.)\n\n`;
 if(!rows.length){out+='_brak podkategorii z popytem+towarem_\n\n';continue;}
 out+='| Podkategoria | Prod. | Popyt/mc | Fraza | |\n|---|---|---|---|---|\n';
 for(const r of rows)out+=`| ${r.lab} | ${r.n} | ${r.d.v} | ${r.d.k} | ${r.kind} |\n`;
 out+='\n';
}
fs.writeFileSync('strategia/dekompozycja-pelna-2026-06-23.md',out);
fs.writeFileSync('strategia/subcats-all.json',JSON.stringify(JSONOUT));
const tot=out.split('\n').filter(l=>l.includes('✅')).length;
console.log('Gotowe. Linii ✅ pełnych podkat.:',tot,'-> strategia/dekompozycja-pelna-2026-06-23.md');

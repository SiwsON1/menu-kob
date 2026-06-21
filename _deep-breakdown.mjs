import fs from 'fs';
const csv = fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);
csv.shift();
const byBucket={};
for(const line of csv){const m=line.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m){(byBucket[m[3]]=byBucket[m[3]]||[]).push(m[2].toLowerCase());}}

function dim(buckets, dims){
  const pool=[]; buckets.forEach(b=>(byBucket[b]||[]).forEach(s=>pool.push(s)));
  const res={};
  for(const [name,re] of dims){ res[name]=pool.filter(s=>re.test(s)).length; }
  return {total:pool.length, res};
}

const SPEC=[
 ['ŁAZIENKA/KUCHNIA (zabudowa)', ['Łazienka/kuchnia - zabudowa'], [
   ['pod umywalkę',/umywalk/],['słupek',/slupek/],['blat',/blat/],['nad/pod pralkę',/pralk/],
   ['z lustrem',/lustr/],['szafka wisząca',/wiszac/],['szafka stojąca',/stojac/],['z koszem na pranie',/pranie|kosz/],
   ['seria Ariel',/ariel/],['seria Nova',/nova/],['seria Elia',/elia/],['seria Lavia',/lavia/],['seria Mel',/mel-|-mel/],['seria Elegance',/elegance/],['seria Iconic',/iconic/],['seria Cremona',/cremona/],
 ]],
 ['ŁÓŻKA (wszystkie dziecięce)', ['Łóżka dziecięce grafika/bajkowe','Łóżka dziecięce klasyczne','Łóżka podwójne dziecięce/rozsuwane','Łóżka piętrowe','Łóżka młodzieżowe','Łóżko Montessori/podłogowe','Łóżko domek','Łóżka inne'], [
   ['160x80',/160x80/],['140x70',/140x70/],['180x80',/180x80/],['90x200',/90x200/],['80x180',/80x180/],['80x160',/80x160/],['200x90',/200x90/],
   ['z barierką',/barierk/],['z szufladą',/szuflad/],['z materacem',/z-materac/],['bez materaca',/bez-materac/],['z pojemnikiem',/pojemnik/],['tapicerowane',/tapicerowan/],
   ['motyw auto/traktor',/auto|traktor|samochod|policja/],['motyw zwierzęta',/animals|bear|bunny|kotek|zajac|jednorozec/],['domek',/domek/],['piętrowe',/pietrow/],['montessori/niskie',/montessori|niskie|podlogow/],
   ['dla dziewczynki',/dziewczynk|rozow/],['dla chłopca',/chlopc|niebiesk/],
 ]],
 ['KOMODY', ['Komody (ogólne)','Komody z grafiką'], [
   ['dąb/artisan',/dab|artisan/],['biała',/bial/],['czarna',/czarn/],['kaszmir',/kaszmir/],['szara',/szar/],['loft/industrial',/loft|industrial/],['skandynawska',/skandynaw/],['na nóżkach',/nogi|nozk/],['ryflowana',/ryflowan/],['MALMO',/malmo/],
   ['60 cm',/60-cm|-60-/],['80 cm',/80-cm|-80-/],['100 cm',/100-cm|-100-/],['120 cm',/120-cm|-120-|120cm/],['140 cm',/140-cm|-140-|140cm/],['z szufladami',/szuflad/],['dwudrzwiowa',/dwudrzwiow/],
 ]],
 ['SZAFKI RTV', ['Szafki RTV'], [
   ['dąb/artisan',/dab|artisan/],['biała',/bial/],['czarna',/czarn/],['skandynawska',/skandynaw/],['loft/metalowa',/loft|metalow/],['na nóżkach',/nogi|nozk/],['z półkami',/polk/],['wisząca',/wiszac/],['FOCUS',/focus/],
   ['120 cm',/120/],['140 cm',/140/],['160 cm',/160/],['180 cm',/180/],['200 cm',/200/],['zestaw mebli',/zestaw|komplet/],
 ]],
 ['SZAFKI NOCNE', ['Szafki nocne'], [
   ['dąb',/dab|artisan/],['biała',/bial/],['czarna',/czarn/],['MALMO',/malmo/],['wisząca',/wiszac/],['z szufladą',/szuflad/],['skandynawska',/skandynaw/],
 ]],
 ['BIURKA (strefa nauki)', ['Biurka (dziecięce/proste)','Biurka narożne','Biurka regulowane/elektryczne','Krzesła/biurka gamingowe','Biurka rozkładane/chowane (VERTO)'], [
   ['komputerowe',/komputerow/],['narożne',/naroz/],['regulowane/elektr',/regulowan|elektr|podnoszon/],['gamingowe',/gaming/],['rozkładane/chowane',/rozkladan|chowan/],
   ['z szufladami',/szuflad/],['z półkami',/polk/],['z nadstawką',/nadstaw/],['dąb',/dab|artisan/],['białe',/bial/],['lewe/prawe',/lewe|prawe|lewo|prawo/],['proste',/proste/],
 ]],
 ['STOŁY (jadalnia)', ['Stoły (jadalnia)'], [
   ['okrągły',/okragl/],['rozkładany',/rozkladan/],['marmur',/marmur/],['dąb',/dab|artisan/],['kwadratowy',/kwadrat/],['VIVO',/vivo/],['czarny',/czarn/],['biały',/bial/],
 ]],
 ['STOLIKI KAWOWE / ŁAWY', ['Stoliki kawowe / ławy'], [
   ['okrągły',/okragl/],['dąb',/dab|artisan/],['marmur',/marmur/],['2w1',/2w1/],['zestaw/komplet',/zestaw|komplet/],['na kółkach',/kolk/],['czarny',/czarn/],['RUSSELL',/russell/],['ława',/lawa/],
 ]],
 ['KRZESŁA (jadalnia/obrotowe)', ['Krzesła (jadalnia/obrotowe)','Krzesła/biurka gamingowe'], [
   ['welurowe',/welur/],['obrotowe',/obrotow/],['tapicerowane',/tapicerowan/],['drewniane',/drewnian/],['gamingowe',/gaming/],['czarne',/czarn/],
 ]],
 ['KANAPY / NAROŻNIKI', ['Kanapy/narożniki/sofy'], [
   ['z funkcją spania',/spania|funkcja/],['narożnik',/naroznik/],['lewy/prawy',/lewo|prawo|stronny/],['rozkładana',/rozkladan/],['z pojemnikiem',/pojemnik/],
 ]],
 ['FOTELE / PUFY', ['Fotele/pufy/ławki'], [
   ['fotel',/fotel/],['pufa/puf',/puf/],['ławka',/lawk/],['bujany',/bujan/],['z pojemnikiem',/pojemnik|schowk/],['zestaw 2',/zestaw|-2-/],
 ]],
 ['REGAŁY', ['Regały'], [
   ['na książki',/ksiazk/],['na zabawki',/zabawk|loni/],['dąb',/dab|artisan|craft/],['otwarty',/otwart/],['skandynawski',/skandynaw/],['z szufladami',/szuflad/],['biały',/bial/],['słupek',/slupek/],
 ]],
 ['SZAFY (dziecięce+ogólne+garderoby)', ['Szafy dziecięce','Szafy (ogólne)','Garderoby / szafy wielofunkcyjne'], [
   ['dziecięca',/dzieciec/],['MELI',/meli/],['STELLA',/stella/],['przesuwna',/przesuwn/],['narożna',/naroz/],['z szufladami',/szuflad/],['z drążkiem',/drazek/],['garderoba',/garderob|veno|malmo/],
 ]],
];

let out='# Głęboki rozkład atrybutowy koszy (iter 2-7) — 2026-06-20\n\n';
out+='Liczby produktów KOBI per atrybut. ≥10 = kandydat na pełną podkat. (do weryfikacji popytem).\n\n';
for(const [title,buckets,dims] of SPEC){
  const {total,res}=dim(buckets,dims);
  out+=`## ${title} (${total} prod.)\n\n`;
  const sorted=Object.entries(res).sort((a,b)=>b[1]-a[1]);
  out+=sorted.map(([k,v])=>`- ${v>=10?'**':''}${k}: ${v}${v>=10?'**':''}`).join('\n')+'\n\n';
}
fs.writeFileSync('strategia/deep-breakdown-2026-06-20.md', out);
console.log('OK deep-breakdown. Kandydaci ≥10 prod.:');
for(const [title,buckets,dims] of SPEC){
  const {res}=dim(buckets,dims);
  const big=Object.entries(res).filter(([k,v])=>v>=10).map(([k,v])=>`${k}(${v})`);
  if(big.length) console.log(' '+title.split(' ')[0]+':', big.join(' '));
}

import ExcelJS from 'exceljs';

// kolejnosc wazna: bardziej specyficzne wzorce PRZED ogolnymi
const PATTERNS = [
  ['Łóżka piętrowe', /piętrow|piętrow/i],
  ['Łóżka montessori/podłogowe', /montessori|podłogow/i],
  ['Łóżko domek', /domek|domku/i],
  ['Łóżka młodzieżowe', /młodzież/i],
  ['Łóżka podwójne/rodzeństwo', /podwójn|rodzeństw|wysuwan|rozsuwan|2-osobowe dziecięce/i],
  ['Łóżka tapicerowane', /tapicerowan/i],
  ['Łóżka z pojemnikiem', /pojemnik/i],
  ['Łóżka dziecięce (ogólne+motywy)', /łóżk.*(dziecięc|dla dziecka|autk|traktor|kotek|kareta|barierk|samochod|zjeżdżaln)|(dziecięc|barierk).*łóżk/i],
  ['Łóżka kontynentalne/dorosłe', /kontynentaln|łóżk.*(160x200|140x200|180x200|sypialn|małżeńsk)/i],
  ['Łóżka inne', /łóżk/i],
  ['Materace', /materac|stelaż/i],
  ['Biurka gamingowe', /biurk.*gaming|gaming.*biurk/i],
  ['Biurka narożne', /biurk.*narożn|narożn.*biurk/i],
  ['Biurka regulowane/elektryczne', /biurk.*(regulowan|elektr|podnoszon|rosnące)/i],
  ['Biurka (ogólne/dziecięce)', /biurk/i],
  ['Krzesła gamingowe/obrotowe (biuro)', /krzesł.*(gaming|obrotow|biurow)|fotel.*(gaming|biurow|obrotow)/i],
  ['Krzesła dziecięce', /krzesł.*dziecięc|krzesełk/i],
  ['Krzesła (jadalnia/ogólne)', /krzesł|taboret|hoker/i],
  ['Szafki RTV', /rtv|pod telewizor|szafka tv/i],
  ['Stoliki kawowe/ławy', /(stolik|ława|ławа).*(kawow|salon)|ława|stolik kawow|stolik okrągł/i],
  ['Stoły (jadalnia)', /stół|stoł/i],
  ['Kanapy/narożniki/sofy', /kanap|narożnik|sofa|wersalk/i],
  ['Fotele/pufy', /fotel|pufa|puf /i],
  ['Komody dziecięce', /komod.*dziecięc|przewijak/i],
  ['Komody (ogólne)', /komod/i],
  ['Szafki nocne', /szafk.*nocn|nocn.*szafk|stolik nocn/i],
  ['Toaletki', /toaletk/i],
  ['Regały (ogólne+zabawki)', /regał|półk.*książk|na książki/i],
  ['Półki dla dzieci', /półk/i],
  ['Skrzynie na zabawki', /skrzyni|na zabawki/i],
  ['Szafy dziecięce', /szaf.*dziecięc|dziecięc.*szaf/i],
  ['Garderoby', /garderob/i],
  ['Szafy (ogólne+przesuwne)', /szaf/i],
  ['Łazienka - zabudowa', /łazienk|umywalk|pod pralk|nad pralk|obudowa pralk|słupek łazienk/i],
  ['Kuchnia - zabudowa', /kuchni|pod blat|blat robocz|szafka kuchenn|witryn/i],
  ['Szafki na buty/przedpokój', /na buty|szafka na obuwie|przedpokój|przedpokoj|wieszak|garderoba przedpokój|konsola/i],
  ['Meble ogrodowe', /ogrodow|ogród|tarasow|technorattan|balkon/i],
  ['Meble dla zwierząt', /drapak|dla kota|legowisko|dla psa/i],
  ['Akcesoria (uchwyty/gałki)', /uchwyt|gałk|nóżk|fronty wymienn/i],
  ['Półkotapczany/smart', /półkotapczan|łóżko w szafie|meble składan|smart/i],
  ['Pokój dziewczynki/chłopca/nastolatka', /dziewczynk|chłopc|nastolat/i],
];

function bucketize(file, label){
  return ExcelJS.Workbook.prototype; // placeholder
}

async function run(file){
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(file);
  const ws = wb.worksheets[0];
  const agg = {};
  for (const [name] of PATTERNS) agg[name] = {vol:0, n:0, top:[]};
  let other = {vol:0,n:0,top:[]};
  ws.eachRow((row, i)=>{
    if(i===1) return;
    const kw = (row.getCell(1).value||'').toString().trim();
    let vol = row.getCell(2).value; vol = typeof vol==='number'?vol:parseInt((vol||'0').toString().replace(/\D/g,''))||0;
    if(!kw) return;
    let matched=false;
    for(const [name,re] of PATTERNS){
      if(re.test(kw)){ agg[name].vol+=vol; agg[name].n++; agg[name].top.push([kw,vol]); matched=true; break; }
    }
    if(!matched){ other.vol+=vol; other.n++; other.top.push([kw,vol]); }
  });
  return {agg, other};
}

const sources = [
  ['INTERBEDS.PL (nisza dziecięca)', 'C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx'],
  ['MEBLE.PL (szeroki rynek)', 'C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx'],
  ['MEBLEKOBI.PL (my, obecne pozycje)', 'C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meblekobi_pl_2026_06_15_19_42.xlsx'],
];

let out = '# Klastry kategorii vs konkurencja (Senuto 2026-06-15)\n\n';
for(const [label,file] of sources){
  const {agg, other} = await run(file);
  out += `\n## ${label}\n\n| Klaster | Frazy | Suma wol./mc | Top frazy (wol.) |\n|---|---|---|---|\n`;
  const rows = Object.entries(agg).filter(([,v])=>v.n>0).sort((a,b)=>b[1].vol-a[1].vol);
  for(const [name,v] of rows){
    const top = v.top.sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,vv])=>`${k} (${vv})`).join('; ');
    out += `| ${name} | ${v.n} | ${v.vol} | ${top} |\n`;
  }
  out += `| _(niesklasyfikowane)_ | ${other.n} | ${other.vol} | ${other.top.sort((a,b)=>b[1]-a[1]).slice(0,15).map(([k,vv])=>`${k} (${vv})`).join('; ')} |\n`;
}
import fs from 'fs';
fs.writeFileSync('strategia/klastry-vs-konkurencja-2026-06-19.md', out);
console.log('OK napisano strategia/klastry-vs-konkurencja-2026-06-19.md, dlugosc', out.length);

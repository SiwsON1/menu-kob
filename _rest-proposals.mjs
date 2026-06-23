import fs from 'fs';
import ExcelJS from 'exceljs';
function deb(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
const dir='C:/Users/mahin/Downloads/';
const files=[...fs.readdirSync(dir).filter(f=>/baza_s.*2026_06_2[01].*\.xlsx$/.test(f)),
 'analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx','analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx'];
const kw=new Map();
for(const f of files){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(dir+f);const ws=wb.worksheets[0];ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0;if(k){const d=deb(k);const c=kw.get(d);if(!c||v>c.v)kw.set(d,{k,v});}});}
function vol(req,excl){let b=null;for(const [d,o] of kw){if(!req.every(t=>d.includes(t)))continue;if(excl&&excl.some(t=>d.includes(t)))continue;if(!b||o.v>b.v)b=o;}return b||{k:'-',v:0};}
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({s:m[2].toLowerCase(),b:m[3]});}
function kobi(sr,bk){const pool=all.filter(p=>bk.includes(p.b));return sr?pool.filter(p=>sr.every(t=>p.s.includes(t))).length:pool.length;}

const C=[
 {t:'STOŁY (jadalnia)',b:['Stoły (jadalnia)'],nodes:[
  ['GŁOWA','Stoły do jadalni',['stol','jadalni'],['stolik'],null],
  ['kat','Stoły okrągłe',['stol','okragl'],['stolik'],['okragl']],
  ['kat','Stoły rozkładane',['stol','rozkladan'],['stolik'],['rozkladan']],
  ['podkat','— dąb',['stol','dab'],['stolik'],['dab']],
  ['podkat','— marmur',['stol','marmur'],['stolik'],['marmur']],
 ]},
 {t:'STOLIKI KAWOWE / ŁAWY',b:['Stoliki kawowe / ławy'],nodes:[
  ['GŁOWA','Stoliki kawowe',['stolik','kawowy'],null,['stolik']],
  ['kat','Stoliki okrągłe',['stolik','okragl'],null,['okragl']],
  ['kat','Ławy do salonu',['lawa','salonu'],null,['lawa']],
  ['podkat','— dąb',['stolik','dab'],null,['dab']],
  ['podkat','— czarne',['stolik','czarny'],null,['czarn']],
  ['podkat','— marmur',['stolik','marmur'],null,['marmur']],
 ]},
 {t:'KANAPY / NAROŻNIKI',b:['Kanapy/narożniki/sofy'],nodes:[
  ['GŁOWA','Narożniki',['naroznik'],['biurko'],['naroznik']],
  ['kat','Kanapy z funkcją spania',['kanapa','spania'],null,['spania']],
  ['kat','Narożniki rozkładane',['naroznik','rozkladan'],['biurko'],['rozkladan']],
 ]},
 {t:'FOTELE / PUFY',b:['Fotele/pufy/ławki'],nodes:[
  ['GŁOWA','Fotele',['fotel'],['biurow','gaming','samochod'],['fotel']],
  ['kat','Pufy',['pufa'],null,['puf']],
 ]},
 {t:'KRZESŁA (jadalnia)',b:['Krzesła (jadalnia/obrotowe)'],nodes:[
  ['GŁOWA','Krzesła do jadalni',['krzesla','jadalni'],null,['krzeslo']],
  ['kat','Krzesła tapicerowane',['krzesla','tapicerowan'],null,['tapicerowan']],
  ['kat','Krzesła welurowe',['krzesl','welur'],null,['welur']],
 ]},
 {t:'SZAFKI NOCNE',b:['Szafki nocne'],nodes:[
  ['GŁOWA','Szafki nocne',['szafka','nocna'],null,['nocn']],
  ['kat','Szafki nocne białe',['szafka','nocna','biala'],null,['nocn','bial']],
  ['kat','Szafki nocne dąb',['szafka','nocna','dab'],null,['nocn','dab']],
  ['podkat','— czarne',['szafka','nocna','czarna'],null,['nocn','czarn']],
  ['podkat','— wiszące',['szafka','nocna','wiszac'],null,['nocn','wiszac']],
 ]},
 {t:'MATERACE',b:['Materace i dopłaty'],nodes:[
  ['GŁOWA','Materace dziecięce',['materac','dzieciec'],null,['materac']],
  ['kat','Materace kieszeniowe',['materac','kieszeniow'],null,['kieszeniow']],
  ['kat','Materace piankowe',['materac','piankow'],null,['piankow']],
  ['kat','Materace kokosowe',['materac','kokos'],null,['kokos']],
 ]},
 {t:'TOALETKI',b:['Toaletki'],nodes:[
  ['GŁOWA','Toaletki',['toaletka'],null,['toaletka']],
  ['kat','Toaletki z lustrem',['toaletka','lustr'],null,['lustr']],
 ]},
 {t:'REGAŁY',b:['Regały'],nodes:[
  ['GŁOWA','Regały',['regal'],['dzieciec'],['regal']],
  ['kat','Regały na książki',['regal','ksiazk'],null,['ksiazk']],
  ['podkat','— dąb',['regal','dab'],null,['dab']],
 ]},
 {t:'PRZEDPOKÓJ',b:['Szafki na buty','Przedpokój (zestawy/konsole)','Wieszaki'],nodes:[
  ['kat','Szafki na buty',['szafka','buty'],null,['buty']],
  ['kat','Konsole',['konsola'],null,['konsola']],
  ['kat','Wieszaki',['wieszak'],null,['wieszak']],
 ]},
 {t:'ŁAZIENKA I KUCHNIA (na wymiar)',b:['Łazienka/kuchnia - zabudowa'],nodes:[
  ['GŁOWA','Meble łazienkowe na wymiar',['meble','lazienkow'],null,null],
  ['kat','Szafki pod umywalkę',['szafka','umywalke'],null,['umywalk']],
  ['kat','Słupki łazienkowe',['slupek'],null,['slupek']],
  ['kat','Blaty (pod umywalkę/kuchenne)',['blat'],null,['blat']],
  ['podkat','— szafki wiszące/nad pralkę',['szafka','pralk'],null,['pralk']],
 ]},
 {t:'OGRÓD',b:['Meble ogrodowe'],nodes:[
  ['GŁOWA','Meble ogrodowe',['meble','ogrodowe'],null,['ogrod']],
  ['kat','Zestawy ogrodowe',['zestaw','ogrod'],null,['zestaw']],
 ]},
 {t:'POKÓJ DZIECKA — przechowywanie',b:['Półki / dla dzieci','Skrzynie na zabawki'],nodes:[
  ['kat','Półki dla dzieci',['polka','dzieci'],null,['polk']],
  ['kat','Skrzynie na zabawki',['skrzynia','zabawki'],null,['skrzyni']],
 ]},
 {t:'AKCESORIA',b:['Akcesoria meblowe (uchwyty/gałki)','Akcesoria dla zwierząt'],nodes:[
  ['kat','Uchwyty i gałki meblowe',['uchwyt','meble'],null,['uchwyt','lui']],
  ['kat','Drapaki dla kota',['drapak'],null,['drapak']],
 ]},
];

let out='# Pozostałe kategorie — popyt + pokrycie (2026-06-23)\n\n';
for(const cat of C){
 out+=`## ${cat.t}\n\n| Poziom | Nazwa (H1) | Fraza główna | Wyszuk./mc | Prod. KOBI | Werdykt |\n|---|---|---|---|---|---|\n`;
 for(const [lvl,name,fr,frx,sr] of cat.nodes){
  const v=vol(fr,frx);const k=sr?kobi(sr,cat.b):kobi(null,cat.b);
  let verd; if(v.v===0)verd='✕ brak frazy'; else if(k===0)verd='⚠ LUKA'; else if(lvl==='GŁOWA')verd='✅ głowa'; else if(k>=10&&v.v>=2000)verd='✅ pełna'; else if(k>=5&&v.v>=500)verd='◑ podkat'; else verd='◔ słabo';
  out+=`| ${lvl} | ${name} | ${v.k} | ${v.v} | ${k} | ${verd} |\n`;
 }
 out+='\n';
}
fs.writeFileSync('strategia/rest-proposals-2026-06-23.md',out);
console.log(out);

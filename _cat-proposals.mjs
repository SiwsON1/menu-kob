import fs from 'fs';
import ExcelJS from 'exceljs';
function deb(s){return s.toLowerCase().replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l').replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/[żź]/g,'z');}
// wszystkie zrodla fraz: KE (06_20 + 06_21) + widocznosc
const dir='C:/Users/mahin/Downloads/';
const files=[...fs.readdirSync(dir).filter(f=>/baza_s.*2026_06_2[01].*\.xlsx$/.test(f)),
 'analiza_widoczno_ci_raport__meble_pl_2026_06_15_19_43.xlsx','analiza_widoczno_ci_raport__interbeds_pl_2026_06_15_19_43.xlsx'];
const kw=new Map();
for(const f of files){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(dir+f);const ws=wb.worksheets[0];ws.eachRow((r,i)=>{if(i===1)return;const k=(r.getCell(1).value||'').toString().trim();let v=r.getCell(2).value;v=typeof v==='number'?v:parseInt((v||'0').toString().replace(/\D/g,''))||0;if(k){const d=deb(k);const c=kw.get(d);if(!c||v>c.v)kw.set(d,{k,v});}});}
function vol(req,excl){let b=null;for(const [d,o] of kw){if(!req.every(t=>d.includes(t)))continue;if(excl&&excl.some(t=>d.includes(t)))continue;if(!b||o.v>b.v)b=o;}return b||{k:'-',v:0};}
// KOBI
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({s:m[2].toLowerCase(),b:m[3]});}
function kobi(slugReq,buckets){const pool=all.filter(p=>buckets.includes(p.b));return slugReq?pool.filter(p=>slugReq.every(t=>p.s.includes(t))).length:pool.length;}

// CATEGORIE: {tytul, buckets, nodes:[ [lvl,nazwaH1,frazaReq,frazaExcl,slugReq] ]}
const C=[
 {t:'BIURKA (strefa nauki / biuro)', b:['Biurka (dziecięce/proste)','Biurka narożne','Biurka regulowane/elektryczne','Krzesła/biurka gamingowe','Biurka rozkładane/chowane (VERTO)'], nodes:[
   ['GŁOWA','Biurka',['biurko'],['gabinetowe'],null],
   ['kat','Biurka komputerowe',['biurko','komputerow'],null,['komputerow']],
   ['kat','Biurka narożne',['biurko','naroz'],null,['naroz']],
   ['kat','Biurka regulowane elektrycznie',['biurko','regulowan'],null,['regulowan']],
   ['kat','Biurka gamingowe',['biurko','gaming'],null,['gaming']],
   ['kat','Biurka dla dzieci',['biurko','dziec'],null,['dzieciec']],
   ['kat','Biurka młodzieżowe',['biurko','mlodziezow'],null,['mlodziezow']],
   ['podkat','— białe',['biurko','biale'],null,['bial']],
   ['podkat','— dąb',['biurko','dab'],null,['dab']],
   ['podkat','— z szufladami',['biurko','szuflad'],null,['szuflad']],
 ]},
 {t:'KOMODY', b:['Komody (ogólne)','Komody z grafiką'], nodes:[
   ['GŁOWA','Komody',['komoda'],['ikea','agata','waran','komodo'],null],
   ['kat','Komody białe',['komoda','biala'],null,['bial']],
   ['kat','Komody dąb',['komoda','dab'],null,['dab']],
   ['kat','Komody czarne',['komoda','czarna'],null,['czarn']],
   ['kat','Komody do salonu',['komody','salonu'],null,null],
   ['kat','Komody do sypialni',['komoda','sypialni'],null,null],
   ['kat','Komody z przewijakiem',['komoda','przewijak'],null,['przewijak']],
   ['podkat','— kaszmir',['komoda','kaszmir'],null,['kaszmir']],
   ['podkat','— z szufladami',['komoda','szuflad'],null,['szuflad']],
   ['podkat','— na nóżkach',['komoda','nozk'],null,['nogi']],
   ['podkat','— wąska/szufladami 120',['komoda','120'],null,['120']],
 ]},
 {t:'SZAFKI RTV', b:['Szafki RTV'], nodes:[
   ['GŁOWA','Szafki RTV',['szafka','rtv'],null,null],
   ['kat','Szafki RTV białe',['rtv','biala'],null,['bial']],
   ['kat','Szafki RTV dąb',['rtv','dab'],null,['dab']],
   ['kat','Szafki RTV czarne',['rtv','czarna'],null,['czarn']],
   ['kat','Szafki RTV wiszące',['rtv','wiszac'],null,['wiszac']],
   ['kat','Komody RTV',['komoda','telewizor'],null,null],
   ['podkat','— z półkami',['rtv','polk'],null,['polk']],
   ['podkat','— na nóżkach',['rtv','nozk'],null,['nogi']],
   ['podkat','— 200 cm',['rtv','200'],null,['200']],
 ]},
 {t:'SZAFY / GARDEROBY', b:['Szafy (ogólne)','Szafy dziecięce','Garderoby / szafy wielofunkcyjne'], nodes:[
   ['GŁOWA','Szafy',['szafa'],['rtv','nocna'],null],
   ['kat','Szafy dziecięce',['szafa','dzieciec'],null,['dzieciec']],
   ['kat','Garderoby',['garderoba'],null,['garderob']],
   ['kat','Szafy przesuwne',['szafa','przesuwn'],null,['przesuwn']],
   ['podkat','— do pokoju dziecięcego',['szafa','pokoju','dzieciec'],null,['dzieciec']],
 ]},
];

let out='# Propozycje kategorii z popytem (Senuto KE) + pokryciem KOBI — biurka/komody/RTV/szafy (2026-06-21)\n\n';
out+='Reguła: węzeł = fraza z popytem + produkty KOBI + ładna nieduplikująca nazwa (plural). Warianty long-tail → opis.\n\n';
for(const cat of C){
  out+=`## ${cat.t}\n\n| Poziom | Nazwa (H1) | Fraza główna | Wyszukiwań/mc | Prod. KOBI | Werdykt |\n|---|---|---|---|---|---|\n`;
  for(const [lvl,name,fr,frx,sr] of cat.nodes){
    const v=vol(fr,frx);const k=kobi(sr,cat.b);
    let verd;
    if(v.v===0)verd='✕ brak frazy';
    else if(k===0)verd='⚠ LUKA (brak towaru)';
    else if(lvl==='GŁOWA')verd='✅ głowa';
    else if(k>=10&&v.v>=2000)verd='✅ pełna';
    else if(k>=5&&v.v>=500)verd='◑ podkat./filtr';
    else verd='◔ słabo';
    out+=`| ${lvl} | ${name} | ${v.k} | ${v.v} | ${k} | ${verd} |\n`;
  }
  out+='\n';
}
fs.writeFileSync('strategia/cat-proposals-2026-06-21.md',out);
console.log(out);

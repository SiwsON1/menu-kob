import fs from 'fs';
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({s:m[2].toLowerCase(),b:m[3]});}
const checks=[
 ['nadstawka (biurka)',/nadstaw/,/Biurk/],
 ['chmurka (półki/regały)',/chmurk/,/Półk|Regał/],
 ['drzewko/drzewo (półki/regały)',/drzewk|drzewo/,/Półk|Regał/],
 ['gwiazdka',/gwiazd/,/./],
 ['skandynawski (wszystko)',/skandynaw/,/./],
 ['różowy=dziewczynka (regały/komody/szafy dz.)',/rozow/,/Regał|Komod|Szaf/],
 ['niemowlęce/przewijak',/przewijak|niemowl/,/./],
];
for(const [lab,sre,bre] of checks){const n=all.filter(p=>sre.test(p.s)&&bre.test(p.b)).length;console.log(`${n}\t${lab}`);}

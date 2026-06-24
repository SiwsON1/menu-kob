import fs from 'fs';
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const all=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m)all.push({s:m[2].toLowerCase(),b:m[3]});}
const c=[
 ['narożnik lewy/prawy',/lewo|prawo|lewa|prawa|lewy|prawy|stronny/,/Kanap/],
 ['szafy 2-drzwiowe',/dwudrzwiow|2-drzwi|2 drzwi/,/Szaf/],
 ['szafy 3-drzwiowe',/trzydrzwiow|3-drzwi/,/Szaf/],
 ['szafy przesuwne',/przesuwn/,/Szaf/],
 ['ogród technorattan',/technorattan|rattan/,/ogrod/i],
 ['ogród aluminium',/aluminiow|aluminium/,/ogrod/i],
 ['ogród zestaw wypoczynkowy',/wypoczynkow|sofa/,/ogrod/i],
];
for(const [lab,sre,bre] of c){const n=all.filter(p=>sre.test(p.s)&&bre.test(p.b)).length;console.log(`${n}\t${lab}`);}

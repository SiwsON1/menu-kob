import fs from 'fs';
const csv=fs.readFileSync('produkty-mapowanie-FINAL-2026-06-19.csv','utf8').trim().split(/\r?\n/);csv.shift();
const beds=[];for(const l of csv){const m=l.match(/^([^,]+),"?(.*?)"?,"?(.*?)"?$/);if(m&&/Łóżk|Łóżko/.test(m[3]))beds.push({s:m[2].toLowerCase(),b:m[3]});}
const sizes=['160x80','140x70','180x80','90x200','120x200','140x200','160x200','80x180','80x160','200x90'];
console.log('Rozmiary łóżek (wszystkie buckety łóżkowe):');
for(const z of sizes){const n=beds.filter(p=>p.s.includes(z)).length;if(n>0)console.log(`  ${z}: ${n}`);}
console.log('\nPer bucket x rozmiar (gdzie >=3):');
const bk=[...new Set(beds.map(p=>p.b))];
for(const b of bk){for(const z of sizes){const n=beds.filter(p=>p.b===b&&p.s.includes(z)).length;if(n>=3)console.log(`  ${b} | ${z}: ${n}`);}}

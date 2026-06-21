import ExcelJS from 'exceljs';
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile('C:/Users/mahin/Downloads/analiza_widoczno_ci_raport__meble_pl_2026_05_26_20_48.xlsx');
const ws = wb.worksheets[0];
const rows = [];
for (let r = 2; r <= ws.rowCount; r++) {
  const g = (n) => { let v = ws.getRow(r).getCell(n).value; if (v && typeof v === 'object' && 'text' in v) v = v.text; if (v && typeof v === 'object' && 'result' in v) v = v.result; return v; };
  rows.push({ kw: String(g(1)||''), vol: Number(g(2))||0, pos: Number(g(3))||0, url: String(g(11)||'') });
}

const poradniki = rows.filter(r => /\/poradnik\/|\/art\d+,/i.test(r.url));

const buckets = {
  'A. LOZKA DZIECIECE (AUTO/EMMA/ERYK/LEO/DUBI/Kareta)': [
    /^łóżk\w* dziec/i, /łóżk\w* dla dziec/i, /łóżk\w* (samochodow|domek|kareta|jednoroż|kotek|policja|traktor|bajk|montessori|domk)/i,
    /łóżk\w* (dla dziewczynki|dla chłopca|nastolatka|nastolatki|młodzieżow)/i,
    /łóżk\w* (z barierką|z szufladą|z pojemnikiem|piętrow)/i,
  ],
  'B. POLKOTAPCZAN VERTO (flagship)': [
    /półkotapczan/i, /łóżk\w* (chowan|składan|w szafie|do szafy|pionowe|wertykal)/i,
  ],
  'C. BIURKA (FLEXI/VERTO/ELISS/PUFFI/DYLAN)': [
    /biurk[oa] (dziec|dla dziec|młodzież|nastolat|szkoln|do nauki|do pokoju|narożn|chowan|składan|regulowan|elektryczn|gamingow|z nadstawk|z regałem|z szufladami|małe|wąsk)/i,
    /kącik (do nauki|szkolny)/i,
  ],
  'D. KOMODY DZIECIECE / PRZEWIJAKI / BIALE': [
    /komoda (dziec|dla dziec|biała|drewnian|niska|nowoczesna|z szufladami|do pokoju|skandyn|glamour|kremow|do sypialn|do salon)/i,
    /przewijak/i,
  ],
  'E. SZAFY DZIECIECE I MLODZIEZOWE': [
    /szaf(a|y) (dziec|dla dziec|do pokoju dz|młodzież|narożn|przesuwn|do małego)/i,
    /szafki do pokoju dziec/i,
  ],
  'F. REGALY / SKRZYNIE / NA ZABAWKI / NA KSIAZKI': [
    /regał (dziec|na zabawk|na książk|dziewczyn|chłopca|niski|wąski|domek|otwarty|w stylu)/i,
    /skrzynia (na zabawk|drewnian|do pokoju)/i,
    /pojemnik (na zabawk)/i, /witryna na książk/i, /zestaw półek/i,
  ],
  'G. TOALETKI (dla dziewczynki/skandyn)': [
    /toaletka/i, /krzesło do toaletki/i,
  ],
  'H. SZAFKI NOCNE (dziec/biale)': [
    /szafka nocna (dziec|dla dziec|dla dziewczynki|biała|nowoczesna|drewnian|w stylu|skandyn|szar|czarn|wąska|niska|glamour|boho)/i,
  ],
  'I. SZAFKI NA BUTY / WIESZAKI / PRZEDPOKOJ': [
    /szafka na buty (z siedzisk|nowoczesn|z szufladą|do małego|drewnian|nowocz)/i,
    /wieszak (do przedp|na ubrania|stojąc|ścienn)/i,
  ],
  'J. STOLIKI I KRZESELKA DZIECIECE': [
    /stolik dziec/i, /krzesełk\w dziec/i, /stolik z krzesełk/i, /stół dla dziec/i, /krzesło dla dziec/i,
  ],
  'K. POLKI DZIECIECE (chmurki, scienne)': [
    /półka dziec/i, /półki dziec/i, /półka ścienn/i, /półka chmurk/i, /półka w kształcie/i,
  ],
  'L. POKOJ (dziewczynki/chlopca/nastolatka) - ARANZACJA': [
    /pokój dziewczynki/i, /pokój chłopca/i, /pokój nastolat/i,
    /pokoju dziewczynki/i, /pokoju chłopca/i, /pokoju nastolat/i,
    /jak urządzić pokój dziewczyn/i, /jak urządzić pokój chłop/i, /jak urządzić pokój nastolat/i,
    /meble do pokoju dziew/i, /meble do pokoju chłop/i, /meble do pokoju młodzież/i,
    /meble dziecięce/i,
  ],
  'M. MEBLE LAZIENKOWE (szafki)': [
    /szafka łazienkow/i, /słupek łazienkow/i, /szafka pod umywalk/i, /aranżacja łazienk/i, /łazienka inspir/i, /mała łazienk/i,
  ],
  'N. MEBLE OGRODOWE (NICEA/SYCYLIA/...)': [
    /meble ogrodow/i, /zestaw ogrodow/i, /aluminiowe meble/i, /technorattan/i, /polywood/i,
    /huśtawka ogrodow/i, /leżak ogrodow/i, /fotel ogrodow/i, /pokrowiec na meble ogrod/i,
  ],
  'O. BARIERKI / STELAZE / MATERACE DZIECIECE': [
    /^barierka/i, /^stelaż/i, /materac dziec/i, /materac piankow/i, /materac do łóżeczk/i, /materac kokos/i,
  ],
};

const kobiCovered = [
  /jak dobrać materac/i, /materac (medyczn|turystyczn)/i,
  /^pokój (dla dziecka|dziecięc)$/i, /jak urządzić mały pokój dziec/i,
  /jak urządzić pokój dzien/i, /jak urządzić przedpokój/i,
  /jak optycznie powiększyć/i, /jak nowocześnie pomalować/i,
  /jak łączyć kolory/i, /styl skandynaw/i, /stoły do kuchni/i,
  /^meble łazienkowe.*pomysł/i, /^meble młodzieżowe dla chłopca$/i, /^meble dla dziewczynki$/i,
];
const isCovered = (kw) => kobiCovered.some(rx => rx.test(kw));

const rejectedRaw = [
  'lozko 90x200 dzieciece','lozko dzieciece 70x140','lozko samolot','lozeczko karoca',
  'lozko zamek dla dziewczynki','lozko dla dwoch dziewczynek','lozko dla dwoch chlopcow',
  'podwojne lozko wysuwane dla dzieci 160x80','lozko dzieciece podwojne z szuflada',
  'lozko tapicerowane 80x180','lozko tapicerowane dla dziecka','lozko tapicerowane dla dziewczynki',
  'lozko tapicerowane z barierka','lozko tapicerowane dzieciece rozowe','polkotapczan dzieciecy',
  'lozko w szafie dzieciece','lozko z biurkiem dzieciece','biurko dla 2 dzieci',
  'biurko narozne biale dzieciece','komoda grafit','komoda wask',
  'szafa domek dla dziecka','regal boho','regal dab sonoma 50 cm','regal bialy 80 cm','szafka nocna dab artisan',
  'konsola do przedpokoju','szafka na buty wask','krzeselko dla dziecka drewniane',
  'polka w ksztalcie gwiazdy','material dzieciecy 80x160','material dzieciecy 80x180',
  'material kieszeniowy dzieciecy','material medyczny dla dziecka','material turystyczny dzieciecy',
  'meble ogrodowe dla dzieci','barierka do lozka dla doroslych','stelaz do lozka 80x160','stelaz do lozka 80x180',
  'nakladki na listwy sprezynujace','meble kolekcja dab sonoma','pomocnik kuchenny drewniany',
  'krzeslo pomocnik dla dzieci','stolik kawowy dab artisan','szafka rtv dab sonoma',
  'lozko z panelami tapicerowanymi',
];
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l').replace(/ó/g,'o').replace(/ś/g,'s').replace(/ć/g,'c').replace(/ż/g,'z').replace(/ź/g,'z').replace(/ą/g,'a').replace(/ę/g,'e').replace(/ń/g,'n');
const isRejected = (kw) => rejectedRaw.some(r => norm(kw) === r);

for (const [name, patterns] of Object.entries(buckets)) {
  const hits = poradniki
    .filter(r => patterns.some(rx => rx.test(r.kw)))
    .filter(r => !isCovered(r.kw))
    .filter(r => !isRejected(r.kw))
    .filter(r => r.vol >= 100);
  const seen = new Set(); const unique = [];
  for (const h of hits) { if (seen.has(h.kw)) continue; seen.add(h.kw); unique.push(h); }
  unique.sort((a,b) => b.vol - a.vol);
  if (!unique.length) continue;
  console.log(`\n\n${name}  (${unique.length} fraz po filtracji)`);
  unique.slice(0, 20).forEach(h => {
    const artId = (h.url.match(/art(\d+),/i) || [])[1] || '';
    console.log(`  ${String(h.vol).padStart(6)}  pos${String(h.pos).padStart(3)}  ${h.kw}${artId?`   [art${artId}]`:''}`);
  });
}

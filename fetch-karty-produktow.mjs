import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const products = [
  ['biurko-flexi', 'https://meblekobi.pl/pl/products/biurko-flexi-140-cm-regulowane-podnoszone-elektryczne-komputerowe-dab-artisan-czarny-14708.html'],
  ['konsola-meli', 'https://meblekobi.pl/pl/products/konsola-meli-z-szuflada-skandynawska-boho-kolor-roz-13865.html'],
  ['lozko-auto', 'https://meblekobi.pl/pl/products/lozko-dzieciece-z-serii-auto-160x80-grafika-materac-speed-13816.html'],
  ['emma-ii', 'https://meblekobi.pl/pl/products/lozko-podwojne-emma-ii-160x80-biale-rozowe-4509.html'],
  ['eryk', 'https://meblekobi.pl/pl/products/lozko-pojedyncze-eryk-160x80-biale-panele-szare-12654.html'],
  ['helios', 'https://meblekobi.pl/pl/products/lozko-podwojne-helios-200x160-biale-panele-rozowe-12101.html'],
  ['kareta', 'https://meblekobi.pl/pl/products/lozko-dzieciece-kareta-160x80-13971.html'],
  ['leo-montessori', 'https://meblekobi.pl/pl/products/lozko-dzieciece-leo-montessori-160x80-barierka-ochronna-bez-materaca-bialy-15438.html'],
  ['niko', 'https://meblekobi.pl/pl/products/materac-niko-piankowy-z-pokrowcem-80x200-cm-15270.html'],
  ['verto-120', 'https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-120x200-skladany-w-szafe-bialy-14791.html'],
  ['verto-160', 'https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-160x200-skladany-w-szafe-bialy-14799.html'],
  ['verto-90', 'https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-90x200-skladany-w-szafe-bialy-14787.html'],
  ['regal-bari', 'https://meblekobi.pl/pl/products/regal-bari-103-cm-dab-vicenza-15172.html'],
  ['regal-japandi', 'https://meblekobi.pl/pl/products/regal-japandi-104-cm-kaszmir-15092.html'],
  ['szafka-andy', 'https://meblekobi.pl/pl/products/szafka-na-buty-z-siedziskiem-i-wieszakiem-andy-13794.html'],
  ['toaletka-rubi', 'https://meblekobi.pl/pl/products/toaletka-rubi-z-lustrem-i-siedziskiem-biala-15660.html'],
  ['lewit', 'https://meblekobi.pl/pl/products/zestaw-3-polek-samowiszacych-lewit-dab-craft-13829.html'],
];

const searches = [
  ['szafka-nocna-meli', 'https://meblekobi.pl/pl/search.html?text=szafka%20nocna%20MELI', ['Szafka nocna MELI', 'Biały']],
  ['zestaw-polek-chmurki', 'https://meblekobi.pl/pl/search.html?text=chmurki%20polki', ['chmur', '3', 'Bia']],
  ['auto-turbo-4x4', 'https://meblekobi.pl/pl/search.html?text=AUTO%20Turbo', ['AUTO', 'Turbo']],
];

function fetchUrl(url) {
  return execFileSync('curl.exe', ['-k', '-L', '--compressed', '-s', url], {
    encoding: 'utf8',
    maxBuffer: 25 * 1024 * 1024,
  });
}

function decodeEntities(s) {
  const map = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
  };
  return s
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_, ent) => {
      if (ent[0] === '#') {
        const code = ent[1].toLowerCase() === 'x' ? parseInt(ent.slice(2), 16) : parseInt(ent.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : _;
      }
      return map[ent.toLowerCase()] ?? _;
    })
    .replace(/\u00a0/g, ' ');
}

function htmlToText(html) {
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|li|h[1-6]|div|section|tr)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .split(/\n+/)
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

function between(html, startNeedle, endNeedle) {
  const start = html.indexOf(startNeedle);
  if (start === -1) return '';
  const end = html.indexOf(endNeedle, start);
  return end === -1 ? html.slice(start) : html.slice(start, end);
}

function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*class="[^"]*product_name__name[^"]*"[^>]*>([\s\S]*?)<\/h1>/i)
    || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1 ? htmlToText(h1[1]) : 'brak na karcie';
}

function extractShortDescription(html) {
  const block = html.match(/<div class="product_name__block --description">([\s\S]*?)<\/div><\/section>/i);
  return block ? htmlToText(block[1]) : '';
}

function extractLongDescription(html) {
  const section = between(html, '<section id="projector_longdescription"', '<section id="projector_dictionary"');
  if (!section) return 'brak na karcie';
  const text = htmlToText(section);
  return text.replace(/^.*?Produkt[\s\S]*?(?=\n#|^[A-ZĄĆĘŁŃÓŚŹŻ])/m, '').trim() || 'brak na karcie';
}

function extractParams(html) {
  const section = between(html, '<section id="projector_dictionary"', '</section>');
  const params = [];
  if (section) {
    const blocks = section.match(/<div class="dictionary__param[\s\S]*?(?=<div class="dictionary__param|<\/div><\/section>)/gi) || [];
    for (const block of blocks) {
      const nameMatch = block.match(/<span class="dictionary__name_txt">([\s\S]*?)<\/span>/i);
      if (!nameMatch) continue;
      const name = htmlToText(nameMatch[1]).trim();
      const values = [...block.matchAll(/<(?:span|a)[^>]*class="dictionary__value_txt"[^>]*>([\s\S]*?)<\/(?:span|a)>/gi)]
        .map((m) => htmlToText(m[1]).trim())
        .filter(Boolean);
      params.push(`- ${name}: ${values.length ? values.join(' | ') : 'brak na karcie'}`);
    }
  }

  const variantsBlock = html.match(/<div id="versions"[\s\S]*?<\/div><\/div>/i);
  if (variantsBlock) {
    const labels = [...variantsBlock[0].matchAll(/<span class="projector_versions__name">([\s\S]*?)<\/span>/gi)]
      .map((m) => htmlToText(m[1]).trim())
      .filter(Boolean);
    if (labels.length) params.push(`- Warianty na karcie: ${[...new Set(labels)].join(' | ')}`);
  }

  return params.length ? params.join('\n') : 'brak na karcie';
}

function resolveSearch(name, searchUrl, required) {
  const html = fetchUrl(searchUrl);
  const links = [...html.matchAll(/<a[^>]+class="product__name"[^>]+href="([^"]+)"[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: decodeEntities(m[1]), title: htmlToText(m[2] || m[3]) }));
  const found = links.find((item) => required.every((term) => item.title.toLowerCase().includes(term.toLowerCase())));
  if (!found) {
    throw new Error(`Nie znaleziono wyniku dla ${name}: ${searchUrl}`);
  }
  return [name, found.url];
}

for (const search of searches) {
  products.push(resolveSearch(...search));
}

const out = [];
out.push('<!-- UWAGA: długie opisy marketingowe są pobrane live z kart, ale w polu OPIS PRODUCENTA zapisano tylko krótki dosłowny fragment. Parametry techniczne zapisano dosłownie z tabel kart. -->');
out.push('');

for (const [name, url] of products) {
  process.stderr.write(`Pobieram ${name}\n`);
  const html = fetchUrl(url);
  const shortDesc = extractShortDescription(html);
  const longDesc = extractLongDescription(html);
  const excerptSource = shortDesc || longDesc;
  const excerptWords = excerptSource.split(/\s+/).slice(0, 24).join(' ');

  out.push(`## ${name}`);
  out.push(`URL: ${url}`);
  out.push(`TYTUL KARTY: ${extractTitle(html)}`);
  out.push(`OPIS PRODUCENTA: "${excerptWords}${excerptSource.split(/\s+/).length > 24 ? ' [...]' : ''}"`);
  out.push('');
  out.push('PARAMETRY:');
  out.push(extractParams(html));
  out.push('');
}

writeFileSync('karty-produktow-live.md', out.join('\n'), 'utf8');

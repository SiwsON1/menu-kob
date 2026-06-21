# Iter 9 — antykanibalizacja i kanoniczność (2026-06-20)

Cel: jeden produkt = jeden kanoniczny URL; warstwy pokój/płeć/kolor/styl/seria = widoki (facety)
z rel=canonical do kategorii typu. Eliminacja dublujących adresów wykrytych w audycie.

## A. ŹRÓDŁA KANIBALIZACJI (zdiagnozowane)

### A1. Dwa równoległe drzewa: POKÓJ vs TYP (główne źródło)
Dziś ten sam produkt jest pod `/pl/menu/komody` (typ) i `/pl/menu/pokoj-dziecka/...` (pokój) =
2-3 adresy, Google nie wie który pokazać. **Decyzja:** jedna hierarchia kanoniczna = TYP.
Pokój = grupowanie w mega-menu (linki do tych samych kategorii typu), NIE osobne kategorie.

### A2. Zdublowane kategorie (te same ID typu, potwierdzone w panelu)
Z audytu instrukcje-idosell i sitemapy:
- lozka-bajkowe-621 / 626 / 627 (3×) → kanoniczna 1, reszta 301
- komody-157 / komody-649 / komody-dzieciece-179 → kanoniczna „Komody" + facet „dziecięca"
- lozka-podwojne-154 / 173 → 1 kanoniczna
- lozka-pojedyncze-153 / 172 → 1 kanoniczna
- biurka-163 / 176 / biurka-komputerowe-674 → „Biurka" + facet „komputerowe"
- krzesla-562 / 565, krzesla-obrotowe-268 / 269 / 270 → scalić
- fotele-650 / 651, kanapy-653 / 654, lawki-625 / 652, toaletki ×4, regaly ×4, szafki-nocne ×3
**Decyzja:** wybrać kanoniczną (najwięcej produktów / najstarszy URL z linkami), reszta 301 (iter 10).

### A3. Dwa wzorce URL: `/pl/menu/` vs `/sklep/`
Niespójność. **Decyzja:** jeden wzorzec docelowy (rekomendacja `/sklep/<kategoria>/`), reszta 301.

### A4. Facety kolor/płeć/styl — ryzyko wewnątrz typu
„komoda biała", „komoda dziecięca", „komoda dla dziewczynki" to NIE osobne obiekty — to
filtry tej samej kategorii „Komody". **Decyzja:** facet = parametr/landing z rel=canonical
do kategorii typu, chyba że ma własną, unikalną intencję i ≥10 prod. (wtedy pełna podkat. z opisem).

### A5. Produkty wieloznaczne (zestawy)
„zestaw-mebli-do-salonu-icaro" (RTV+słupek+półka), „zestaw mebli łazienkowych" — pasują do 2 kategorii.
**Decyzja:** przypisać do DOMINUJĄCEGO elementu zestawu (RTV→Szafki RTV; łazienkowy→Zabudowa),
reszta jako tag, nie druga kategoria.

## B. ZASADA KANONICZNOŚCI (reguła generalna)

```
1 produkt → 1 kategoria TYPU (kanoniczna, w URL)
   ├── widok POKÓJ      → link w menu, canonical = typ
   ├── widok PŁEĆ       → landing /dla-dziewczynki, canonical = typ (chyba że unikalna intencja)
   ├── widok KOLOR      → filtr ?kolor=, canonical = typ (pełna podkat. tylko gdy popyt≥3k: biała/dąb/czarna)
   ├── widok STYL       → filtr ?styl=, canonical = typ (pełna tylko: skandynawska/loft gdy ≥10)
   └── widok SERIA      → strona kolekcji, canonical = własna (kolekcja to inna intencja niż typ)
```

Pełna podkat. (własny indeksowalny URL z opisem) TYLKO gdy: ≥10 prod. + popyt ≥3k + unikalna
intencja (nie pokrywa się z kategorią-rodzicem). Inaczej facet z canonical do rodzica.

## C. KONFLIKTY FRAZOWE (jedna fraza → jedna strona)
| Fraza | Kandydaci | Kanoniczna |
|---|---|---|
| komoda biała | Komody/Komoda biała vs Komody dziecięce | Komody › Komoda biała (facet z opisem, ≥20 prod./41k) |
| szafka rtv biała | RTV/biała vs Salon | RTV › biała |
| łóżko dziecięce 160x80 | Bajkowe/160x80 vs Klasyczne/160x80 | Łóżka dziecięce › 160x80 (agreguje oba, canonical jeden) |
| biurko dziecięce | Pokój dziecka vs Biuro | Biuro › Biurka dziecięce (1 kanoniczna, link z pokoju) |
| komoda dziecięca | Komody vs Pokój dziecka | Komody › facet dziecięca (canonical Komody) |

## D. ANTI (czego nie targetujemy — kanibalizacja z gigantami)
Head „szafa / komoda / stół / kanapa / fotel" frontalnie = przegrana z IKEA/BRW/meble.pl.
Gramy długim ogonem (dąb artisan, okrągły, z barierką, na wymiar). Frazy OBI = szum.

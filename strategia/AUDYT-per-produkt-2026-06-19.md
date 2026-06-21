# Audyt per-produkt + nowe kategorie + konkurencja (2026-06-19)

Odpowiedź na trzy pytania: czy każdy produkt pasuje, czy da się zrobić więcej kategorii,
czy porównane z konkurencją. Wszystko na twardych danych (1273 produkty, Senuto interbeds/meble.pl).

---

## Q1. Czy każdy produkt pasuje do kategorii? — SPRAWDZONE, były błędy

Auto-mapowanie z 15.06 (`produkty-mapowanie-2026-06-15.csv`) klasyfikowało po dowolnym tokenie
w slugu, nie po typie głównym. Przeklasyfikowałem **każdy z 1273 produktów po głównym typie**
(początek nazwy). Plik wynikowy: `produkty-mapowanie-FINAL-2026-06-19.csv` (+ `-POPRAWIONE-` z kolumną
stara/nowa/zmiana). Raport: `reklasyfikacja-2026-06-19.md`.

**Przeniesionych: 168 / 1273 (13,2%). Nierozpoznanych: 0.**

Najważniejsze korekty (zmieniają strategię):
- **Akcesoria meblowe 40 → 6.** Tylko 6 to realne uchwyty/gałki LUI. Pozostałe 34 to łóżka, komody,
  skrzynie, szafy, szafki nocne, które miały w slugu „uchwyty" (kolor uchwytów). **Moja wcześniejsza
  teza „40 LUI = głęboka gałąź akcesoriów" była błędna.** USP wymiennych frontów realne, ale towar płytki:
  to landing, nie duża gałąź.
- **Szafy ogólne 17 → 1; Szafy dziecięce 8 → 22.** Prawie wszystkie „szafy" to faktycznie szafy
  dziecięce (STELLA/DUNO/MELI). Potwierdza: KOBI to producent dziecięcy, nie szaf dorosłych.
- **Łóżka dwuosobowe (sypialnia) 5 → 0.** KOBI praktycznie NIE ma łóżek dorosłych. Gałąź „Sypialnia"
  trzeba zawęzić: komody/szafki nocne/toaletki tak, ale łóżka i szafy dorosłe to nie nasz teren.
- **Łóżka dziecięce rozbite uczciwie:** grafika/bajkowe 79 (z motywem) + klasyczne 90 (gładkie) zamiast
  jednego worka 132. Razem 169 łóżek dziecięcych (rdzeń potwierdzony).
- Krzesła gamingowe/obrotowe 3 → 9 (wyłuskane z „jadalni"); RTV +7; Stoły +8; podwójne +8.

**Wniosek:** teraz każdy produkt siedzi w koszu wg swojego typu głównego. Do ręcznego potwierdzenia
zostają tylko zestawy wieloelementowe (np. „zestaw mebli do salonu" = RTV + słupek), które z natury
pasują do 2 kategorii — decyzja przy budowie panelu.

---

## Q2. Czy da się zrobić więcej kategorii? — TAK, oto kandydaci (3. poziom / landingi SEO)

Z kopania tokenów wewnątrz koszy (`QA-mapowanie-2026-06-19.md`) + popytu konkurencji. Próg: ≥5 produktów
i potwierdzony popyt. Ranking wg głębokość towaru × popyt:

| Nowa (pod)kategoria | Prod. KOBI | Popyt rynek | Dlaczego |
|---|---|---|---|
| **Stół okrągły** | ~30 | stół okrągły rozkładany 33k | mamy 30 okrągłych, nietknięte jako kategoria |
| **Stolik kawowy okrągły** | ~18 | stolik kawowy okrągły 27k | trend, mamy głębokość |
| **Komoda dąb artisan** | ~45 | komoda dąb, KOBI już rankuje | nasz realny wariant zamiast „komoda biała" head |
| **Szafka RTV dąb** | ~61 | szafka rtv dąb / drewniana | największy podzbiór RTV |
| **Łazienka: szafki pod umywalkę** | ~26 | blat/szafka pod umywalkę | rozbić 150 zabudowy na podtypy |
| **Łazienka: słupki** | ~31 | słupek łazienkowy | j.w. |
| **Łazienka: blaty robocze** | ~42 | blat roboczy/kuchenny | j.w. |
| **Łóżko dziecięce 160x80** | ~63 | łóżko dziecięce 160x80 1,6k | rozmiar = osobne wejście (jak interbeds) |
| **Łóżko dziecięce 140x70** | ~60 | 140x70 udowodniony | j.w. |
| **Regał na książki** | ~15 | regał na książki | podzbiór regałów |
| **Biurko komputerowe** | ~26 | biurka komputerowe 6,6k | podzbiór biurek |
| **Łóżko podwójne z pojemnikiem** | ~34 | łóżko z pojemnikiem | podzbiór podwójnych |
| **Komoda 120 / 140 cm** | 7 / 5 | komoda 120 cm | szerokość = filtr/landing |
| **Szafka na buty z siedziskiem** | ~8 | szafka na buty z siedziskiem | podzbiór |

To są realne podstrony SEO/podkategorie 3. poziomu, których w drzewie traktowałem zbiorczo jako „filtry".
Rekomendacja: te z ≥30 prod. (stół okrągły, stolik okrągły, komoda dąb, RTV dąb, blaty, rozmiary łóżek)
zrobić jako pełne podkategorie z opisem; resztę jako filtry SEO.

---

## Q3. Porównanie z konkurencją — ZROBIONE (Senuto)

Pełne klastry: `klastry-vs-konkurencja-2026-06-19.md`. Kluczowe dla struktury:
- **interbeds.pl** (nisza dziecięca) potwierdza hierarchię łóżek: piętrowe 147k, młodzieżowe 75k,
  domek 44k, podwójne 34k, plus rozmiary jako osobne wejścia (80x160/90x200 itd.).
- **meble.pl** (szeroki rynek) wyznacza, gdzie NIE walczyć frontalnie (szafa 840k, krzesła 512k,
  fotele 508k — IKEA/BRW) i gdzie są nasze długie ogony: stół okrągły rozkładany 33k, stolik kawowy
  okrągły 27k, komoda dąb, biurko narożne 27k, biurko komputerowe, szafka rtv dąb.
- Konkurencja robi **atrybutowe podkategorie** (rozmiar × kolor × materiał × seria) — to wzór dla
  naszych nowych podkategorii z Q2.

---

## CO Z TEGO WYNIKA DLA MENU (zmiany vs wersja sprzed audytu)

1. **Akcesoria meblowe** schodzą z rangi „gałąź ~184k" do **landingu LUI (6 prod.)**. Nie obiecujemy głębi.
2. **Sypialnia** zawężona: bez łóżek/szaf dorosłych (mamy ~0), zostają komody/szafki nocne/toaletki/garderoby.
3. **Szafy dziecięce** awansują (22 prod., nie 8) — pełna podkategoria w Pokoju dziecka.
4. **Dodać podkategorie z Q2** (stół okrągły, stolik okrągły, komoda dąb, RTV dąb, blaty łazienkowe,
   rozmiary łóżek) jako 3. poziom drzewa.
5. Reszta drzewa (piętrowe P0, biuro, łazienka/kuchnia, garderoby) bez zmian — potwierdzona danymi.

Mega-menu `mega-menu-FINAL-2026-06-19.html` przepięte na poprawione dane (liczniki realne).

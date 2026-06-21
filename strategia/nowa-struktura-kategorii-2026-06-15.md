# Nowa struktura kategorii meblekobi.pl — blueprint IA + SEO (2026-06-15)

Dokument roboczy: jak przebudować menu i drzewo kategorii w IdoSell, żeby było więcej
kategorii celujących w realne frazy, a każda z nich miała pokrycie w produktach KOBI.

Źródła: live meblekobi.pl (menu 2026-06-15), interbeds.pl + meble.pl (konkurencja),
`_raport-kobi-frazy.tsv` (volume), `frazy-master-2026-05-05.md` (akceptacje/odrzucenia),
`baza-rodzin-produktowych.md` (inwentarz), `instrukcje-idosell-2026-04-26.md` (mechanika + audyt).

Wszystkie liczby "vol" niżej to miesięczny wolumen wyszukiwań z raportu (rankingi meble.pl,
więc to realny popyt kategoriowy, nie nasze życzenia).

---

## 1. Diagnoza obecnej struktury (co jest źle)

Dziś sklep ma **trzy równoległe drzewa kategorii** plus kategorie wolnostojące:

1. **MEBLE** (wg typu) — ok. 33 kategorie: łóżka (pojedyncze, podwójne, z grafiką, bajkowe,
   drewniane, piętrowe, tapicerowane, z pojemnikiem, łóżeczka niemowlęce), półkotapczany,
   meble smart, kanapy, stoliki, stoły, szafki RTV, komody, regały, krzesła, fotele, szafy,
   szafki nocne, toaletki, wieszaki, szafki na buty, biurka, biurka komputerowe, półki,
   meble łazienkowe, stelaże, pomocniki kuchenne, przewijaki, akcesoria.
2. **POMIESZCZENIA** (wg pokoju) — Salon, Jadalnia, Pokój dziecka i nastolatka, Sypialnia,
   Przedpokój, Łazienka — każde z własnym kompletem podkategorii.
3. **KIDS** — kolejny komplet kategorii dziecięcych (łóżka, szafy dziecięce, regały, komody,
   biurka, krzesła obrotowe, skrzynie, szafki nocne, toaletki, półki, barierki).
4. **Wolnostojące**: MATERACE, KOLEKCJE, OGRÓD, PROMOCJE, B2B, KONTAKT.

### Problemy
- **Duplicate content / kanibalizacja.** Ten sam typ produktu ma 2-3 osobne adresy URL
  (np. komody: ID 157/649/179; szafki nocne: 3 URL-e; regały 159/177/252/253; toaletki
  577/578/579/580; krzesła obrotowe 268/269/270 — z audytu #3/#4). Google nie wie którą
  stronę rankować, PageRank się rozbija.
- **Dwa wzorce URL** (`/pl/menu/...` stara struktura vs `/sklep/...` nowa) na to samo.
- **Płaska, "katalogowa" lista typów** w MEBLE walczy head-onami ("szafy", "komody",
  "szafki nocne", "krzesła obrotowe", "fotele") z Mebline / BRW / IKEA / meble.pl, gdzie
  KOBI nie wygra. Marnujemy crawl budget i opisy na frazy bez szans.
- **Brak warstwy long-tail.** Konkurencja zgarnia ruch atrybutowymi stronami (kolor, temat,
  funkcja, target), a KOBI ma jedną ogólną kategorię na typ.
- **Niszowe typy bez produktów** (przewijaki, pomocniki kuchenne, akcesoria meblowe,
  łóżeczka niemowlęce) zaśmiecają menu i rozmywają tematykę.

### Wniosek
KOBI nie powinien być "kolejnym sklepem ze wszystkimi meblami". Trzy przewagi, które
realnie wyróżniają ofertę i mają popyt:
1. **Pokój dziecka i nastolatka** (rdzeń asortymentu: 412 łóżek dziecięcych, biurka,
   szafy/komody/regały dziecięce, półki, toaletki).
2. **Meble z grafiką i nadrukiem** (USP, którego nie robi nikt na taką skalę — łóżka AUTO/FALA,
   szafy/komody z nadrukiem, fronty graficzne; klient sam wskazał te frazy jako priorytet).
3. **Meble smart / oszczędzające miejsce** (półkotapczany VERTO, biurka rozkładane, łóżka
   rozsuwane HELIOS) — rosnący trend "małe mieszkanie".

Struktura ma te trzy przewagi wynieść na górę i obudować long-tailem, a "meble ogólne"
zostawić jako tło.

---

## 2. Jak robi to konkurencja (i co z tego bierzemy)

### interbeds.pl — lider mebli dziecięcych
Buduje **dużo podkategorii z jednego typu produktu** wg atrybutów, każda = osobna fraza:
- **wg konfiguracji**: pojedyncze, podwójne, trzyosobowe, piętrowe, parterowe, na antresoli,
  z biurkiem, z szufladami, rozsuwane, wielofunkcyjne;
- **wg tematu/grafiki**: samochody, domki;
- **wg płci**: dla chłopca, dla dziewczynki;
- **wg cechy**: z barierką, z pojemnikiem.

To dokładnie wzorzec, którego KOBI potrzebuje: **jeden typ -> wiele wejść long-tail**.

### meble.pl — silnik faceted SEO
Zamienia filtry w indeksowalne landing-page'e z własnym URL i frazą:
`/meble/komody,kolor-bialy/`, `/meble/szafki-nocne,kolor-szary/`, `/meble/biurka,biurka-narozne/`.
Stąd biorą gigantyczne wolumeny atrybutowe:
- szafka nocna **49 500**, szafka nocna biała **8 100**, czarna **2 900**, szara **1 300**, grafitowa 260...
- komoda biała **27 100**, komoda biała połysk **5 400**, biała z szufladami **2 400**...
- biurko narożne / narożnikowe **27 100**, z regałem 1 300, z nadstawką 880...
- regał na zabawki **22 200**, szafa do pokoju dziecięcego **5 400**, łóżko z pojemnikiem **1 600**.

Wniosek: realny popyt siedzi w **kombinacjach atrybutowych**, nie w head termach. KOBI ma
produkty pod sporą część tych fraz — trzeba im dać własne strony.

### Czego NIE kopiujemy
- meble.pl rankuje wiele z tych fraz **artykułem poradnikowym**, nie kategorią (np. "regał na
  zabawki" -> /poradnik/). To znaczy, że **kategoria jest do wzięcia** — KOBI może wskoczyć
  realnym listingiem produktów (silniejszy intent zakupowy).
- Nie kopiujemy długości wymiarowych jako osobnych kategorii (90x200, 40 cm) — klient
  odrzucił (patrz §5). Wymiar = filtr, nie kategoria.

---

## 3. Strategia: jedna kanoniczna hierarchia + warstwa landingów

Reguła naczelna IA: **jeden typ produktu = jeden obiekt kategorii = jeden kanoniczny URL.**
Pokój (Salon/Sypialnia/Pokój dziecka) to w menu **grupowanie nawigacyjne**, które linkuje
do tych samych kanonicznych kategorii — nie tworzy ich kopii. To likwiduje duplikację 3 drzew.

Dwie warstwy:
- **Warstwa A — drzewo kategorii (menu, max 2 poziomy):** to co użytkownik klika. Każdy
  liść to prawdziwa kategoria IdoSell z opisem, FAQ, listingiem.
- **Warstwa B — landing pages atrybutowe (SEO):** kolor / temat / funkcja / target. W IdoSell
  realizowane jako **strony filtrów z własnym SEO** (canonical na siebie, własny H1+opis) albo
  jako dodatkowe podkategorie tam, gdzie produktów jest dużo i intent jest silny. To są wejścia
  long-tail, nie pozycje w menu głównym (ewentualnie jako linki w mega-menu / w opisie kategorii).

Rozróżnienie "kategoria vs landing":
- **Kategoria** = trwały, szeroki typ z dużym asortymentem (łóżka dziecięce, biurka, szafy dziecięce).
- **Landing** = wycinek atrybutowy tej kategorii pod konkretną frazę (łóżko z grafiką, biurko
  narożne, regał na zabawki, komoda biała). Powstaje przez filtr/tag, nie przez przenoszenie produktów.

---

## 4. Proponowane drzewo kategorii (Warstwa A)

Top-level menu (kolejność = priorytet biznesowo-SEO):

```
1. POKÓJ DZIECKA I NASTOLATKA      ← hero, rdzeń oferty
2. MEBLE Z GRAFIKĄ I NADRUKIEM     ← hero USP (kolekcja przekrojowa)
3. MEBLE SMART / OSZCZĘDZAJĄCE MIEJSCE  ← hero USP
4. SYPIALNIA
5. SALON I JADALNIA
6. PRZEDPOKÓJ
7. ŁAZIENKA
8. MATERACE
9. MEBLE OGRODOWE
10. KOLEKCJE
11. PROMOCJE   ·   B2B   ·   KONTAKT
```

### 1. POKÓJ DZIECKA I NASTOLATKA  (hero)
Podkategorie kanoniczne:
- **Łóżka dziecięce** — root kategoria (vol head niski, ale to brama do landingów)
- **Łóżka młodzieżowe** — HELIOS (vol: "szafa do pokoju młodzieżowego" 1 600 obok)
- **Łóżka piętrowe** *(tylko jeśli są produkty — zweryfikować; "łóżko piętrowe 2 osobowe" 2 900,
  "1 osobowe" 1 600. Jeśli KOBI nie ma — NIE tworzyć pustej kategorii)*
- **Biurka dziecięce i młodzieżowe** — ELISS dziecięce, BASIC, PUFFI ("biurko dziecięce białe" 210)
- **Szafy dziecięce** — STELLA/MELI/DUNO ("szafa do pokoju dziecięcego" 5 400, "szafy do pokoju dziecka" 1 000)
- **Komody dziecięce**
- **Regały dziecięce** — LONI ("regał na zabawki" 22 200, "regał dziecięcy na zabawki" 320)
- **Szafki nocne dziecięce** ("szafka nocna dziecięca" 390, "do pokoju dziewczynki" 210)
- **Toaletki dziecięce** *(akceptowane: skandynawska/boho/dla dziewczynki)*
- **Półki dla dzieci** — LEWIT/MELI/CHMURKI/SERCA (półka chmurka, zestaw półek)
- **Stoliki i krzesełka dziecięce**
- **Skrzynie na zabawki**
- **Barierki i akcesoria** — barierki ochronne, stelaże dziecięce

> To jest gałąź, w którą inwestujemy najwięcej opisów i landingów. Pokrycie produktowe pełne.

### 2. MEBLE Z GRAFIKĄ I NADRUKIEM  (hero USP — kolekcja przekrojowa)
Strona-parasol + podkategorie/landingi przekrojowe (te same produkty co w "Pokój dziecka",
spięte tematem grafiki — realizować tagiem/filtrem "grafika", nie kopią):
- **Łóżka z grafiką** — AUTO, FALA, ANIMALS, ANNA ("łóżko z grafiką" — fraza klienta priorytet)
- **Łóżka bajkowe** — domek, kareta, jednorożec, kotek, traktor, policja, księżniczka
  ("łóżka dla księżniczek" 480, "łóżko domek 90x200" 480)
- **Komody z grafiką / nadrukiem** ("komoda z grafiką" — fraza klienta)
- **Szafy z nadrukiem** ("szafa z nadrukiem" — fraza klienta)
- **Regały i półki z grafiką**

> Blue ocean. Nikt nie konsoliduje "mebli z nadrukiem" jako kolekcji. To wyróżnik marki +
> łapie frazy, których konkurencja nie obsługuje kategorią.

### 3. MEBLE SMART / OSZCZĘDZAJĄCE MIEJSCE  (hero USP)
- **Półkotapczany (łóżka w szafie)** — VERTO 16 SKU ("półkotapczan", "łóżko w szafie",
  "łóżko składane do szafy")
- **Biurka rozkładane / chowane** — VERTO biurko ("biurko składane", "biurko chowane w szafce")
- **Łóżka rozsuwane** — HELIOS ("łóżko rozsuwane", "łóżko 2w1")
- **Łóżka z pojemnikiem** ("łóżko z pojemnikiem" 1 600, "z pojemnikiem na pościel" 390)
- *(rename obecnego "Meble smart" -> "Meble smart / oszczędzające miejsce" — frazowane, audyt #16)*

### 4. SYPIALNIA
- **Łóżka** (pojedyncze, podwójne) · **Łóżka tapicerowane / z panelami** (ERYK) ·
  **Szafy** · **Komody** · **Szafki nocne** · **Toaletki** · **Regały**
> Tu KOBI gra na drugim planie (head terms zajęte), ale kategorie muszą istnieć dla pełności
> oferty i wewnętrznego linkowania. Opisy lekkie, bez walki o "szafy"/"komody" solo.

### 5. SALON I JADALNIA
- **Szafki RTV** · **Komody** · **Regały** · **Stoły** · **Stoliki kawowe** ·
  **Krzesła** · **Fotele / pufy** *(tylko typy z realnym asortymentem — wyciąć puste)*

### 6. PRZEDPOKÓJ
- **Szafki na buty** (z siedziskiem — "szafka na buty z siedziskiem" akcept) · **Wieszaki** ·
  **Komody / konsole** *(NIE "konsola do przedpokoju" — odrzucone; "wieszak" tak)*

### 7. ŁAZIENKA
- **Szafki łazienkowe** · **Zestawy łazienkowe** ("meble łazienkowe" rodzina)

### 8. MATERACE
- **Piankowe** · **Pianka-kokos** · **Dziecięce** *(BEZ wymiarów odwróconych; BEZ
  "kieszeniowy/medyczny/turystyczny dla dziecka" — odrzucone w frazy-master)*
- *(usunąć z menu kategorie bez produktów: medyczne / turystyczne / kieszeniowe, jeśli KOBI nie ma)*

### 9. MEBLE OGRODOWE
- **Zestawy technorattan** (SYCYLIA/MILANO/MAROKO/FLORENCJA/OLIMPIA) · **Zestawy aluminiowe** (NICEA)
- *(NIE "meble ogrodowe dla dzieci" — odrzucone)*

### 10. KOLEKCJE
- DREAM / SCANDI / LOFT / GOAL / GRAFF / VENUS / MODUS / AURA / BLANCA (19 kolekcji) —
  jako strony kolekcji + linki z `kobisc.pl` na `nofollow` (audyt #11).

### Do wycięcia / scalenia (porządki)
- "Biurka komputerowe" -> scalić z "Biurka" (H1 long-tail "biurka komputerowe" na jednej stronie;
  nie osobny obiekt — to był tylko SEO-H1 wg wiedzy biznesowej).
- "Łóżeczka niemowlęce", "Przewijaki", "Pomocniki kuchenne", "Akcesoria meblowe" -> usunąć
  z menu jeśli brak produktów (zweryfikować w panelu).
- Duplikaty (komody 157/649/179, szafki nocne ×3, regały ×4, toaletki ×4, krzesła obrotowe ×3)
  -> wybrać kanoniczną, reszta 301 (audyt #3).

---

## 5. Warstwa B — landingi atrybutowe (mapa fraza -> produkty -> volume)

Każdy landing = filtr/tag na istniejącej kategorii z własnym H1, opisem i FAQ. Tworzymy
TYLKO te, które mają (a) realny volume, (b) pokrycie produktowe KOBI, (c) nie są na liście
odrzuconych. Priorytet wg volume × dopasowanie produktu.

### Najwyższy priorytet (duży volume + mamy produkty)
| Landing (H1 / fraza) | Vol | Kategoria-rodzic | Produkty KOBI |
|---|---|---|---|
| Regał na zabawki | 22 200 | Regały dziecięce | LONI (otwarty regał) |
| Biurko narożne | 27 100 | Biurka | DYLAN / Daniel (narożne) |
| Szafa do pokoju dziecięcego | 5 400 | Szafy dziecięce | STELLA, MELI, DUNO |
| Łóżko z pojemnikiem | 1 600 | Meble smart / Łóżka | EMMA/ERYK (szuflada), HELIOS |
| Biurko regulowane elektryczne | 2 900 | Biurka | FLEXI, ELISS |
| Meble do pokoju dziewczynki | 2 900 | Pokój dziecka | EMMA, FALA princess, toaletki |
| Meble do pokoju chłopca | 1 000 | Pokój dziecka | AUTO, GOAL, FALA |

### Wysoki priorytet (atrybut koloru — wzorzec meble.pl)
Kolor jako landing tam, gdzie KOBI ma wystarczająco SKU w kolorze (białe są wszędzie):
| Landing | Vol | Rodzic | Uwaga |
|---|---|---|---|
| Komoda biała | 27 100 | Komody | + "biała z szufladami" 2 400, "biała wysoka" 590 |
| Szafka nocna biała | 8 100 | Szafki nocne | + czarna 2 900, szara 1 300 |
| Białe meble dziecięce | 320 | Pokój dziecka | "biurko dziecięce białe" 210, "meble dziecięce białe" 210 |
| Łóżko dziecięce drewniane | — | Łóżka dziecięce | DUBI (jedyne lite drewno) |

> Uwaga realizacyjna: kolory robimy filtrem SEO, NIE rozbijamy menu na 10 kolorów. W menu
> max "białe" jako flagowy. Reszta to indeksowalne strony filtra.

### Temat / grafika (USP — łapie gałąź 2)
| Landing | Rodzic | Produkty |
|---|---|---|
| Łóżko z grafiką | Meble z grafiką | AUTO, FALA, ANIMALS, ANNA |
| Łóżko autko / samochód | Łóżka z grafiką | AUTO (SPIDER/BATCAR/SPEED/TURBO/TAXI) |
| Łóżko domek | Łóżka z grafiką | DUBI, FALA domek |
| Łóżko kareta | Łóżka z grafiką | Kareta *(nie "karoca" — odrzucone)* |
| Łóżko jednorożec / kotek | Łóżka z grafiką | FALA, ANIMALS |
| Łóżko dla księżniczek | Łóżka z grafiką | EMMA, FALA (vol 480) |
| Komoda z grafiką / Szafa z nadrukiem | Meble z grafiką | fronty graficzne (fraza klienta) |

### Funkcja / target dziecięcy
| Landing | Vol | Produkty |
|---|---|---|
| Łóżko z barierką | 590 + 590 | wszystkie dziecięce (barierka demontowalna) |
| Łóżko dla dziewczynki | — | EMMA, FALA princess |
| Łóżko dla chłopca | — | AUTO, GOAL |
| Łóżko Montessori / podłogowe | — | LEO |
| Łóżka dla rodzeństwa / podwójne | 880 | EMMA II, FALA II, HELIOS |
| Łóżko z panelami tapicerowanymi | — | ERYK, HELIOS velvet |

### Świadomie odpuszczone (z frazy-master — NIE tworzyć)
łóżko samolot/zamek, łóżeczko karoca, łóżko 90x200 dziecięce, łóżko/materac wg odwróconych
wymiarów (80x160), łóżko tapicerowane dziecięce, półkotapczan dziecięcy, łóżko w szafie dziecięce,
biurko dla 2 dzieci, szafa domek dla dziecka, regał boho, komoda wąska 40 cm, materace
medyczne/turystyczne/kieszeniowe dziecięce, meble ogrodowe dla dzieci, cała kategoria zwierzęca
(drapaki/wieże/tuby — KOBI tego nie sprzedaje), "dla dwóch dziewczynek/chłopców", konsola do
przedpokoju, szafka na buty wąska, pomocnik kuchenny drewniany. Powód: klient wykluczył w mailu
2026-05-04 (brak produktu / złe wymiary / za szczegółowe).

---

## 6. Mechanika wdrożenia w IdoSell

### 6.1. Drzewo kategorii (Warstwa A)
- **Sklep -> Towary -> Kategorie.** Zbudować docelowe drzewo (max 2 poziomy w menu).
- Każdy typ = **jeden obiekt kategorii**. Pokoje (Salon/Sypialnia/Pokój dziecka) jako grupy
  menu linkujące do tych samych kategorii (mega-menu), nie nowe obiekty.
- Mega-menu / edytor menu: **Wygląd sklepu -> Edytor menu** (audyt #7). Jeśli edytor ograniczony
  (stary skin) -> eskalacja do dewelopera szablonu.

### 6.2. Landingi atrybutowe (Warstwa B)
Trzy możliwe mechanizmy w IdoSell, w kolejności preferencji:
1. **Strony SEO filtrów** (jeśli szablon RWD je wspiera): filtr koloru/tematu generuje URL
   z własnym H1 + opisem + canonical na siebie. Najtańsze, skaluje się.
2. **Podkategoria** — gdy intent silny i dużo SKU (np. "Łóżka z grafiką", "Biurka narożne",
   "Regał na zabawki"). Produkt przypisany do wielu kategorii (IdoSell to wspiera), bez kopii.
3. **Strona CMS / kolekcja** — dla parasoli typu "Meble z grafiką" (kurowana lista + opis).

> Decyzja kolor-jako-filtr vs kolor-jako-kategoria: filtr dla kolorów (skala), kategoria dla
> tematu/funkcji (intent + opis sprzedażowy). Do potwierdzenia, które filtry SEO udostępnia
> aktualny szablon — sprawdzić w panelu lub u dewelopera.

### 6.3. Higiena SEO (z audytu — warunek konieczny przy przebudowie)
- **301 dla wszystkich starych URL** na nowe kanoniczne (audyt #3, #6). Bez mapy 301 nie ruszać
  struktury — inaczej tracimy pozycje. Eksport obecnych URL (Screaming Frog / eksport z bazy).
- **Canonical** na duplikatach i stronach filtrów (audyt #2, #12).
- **Konsolidacja duplikatów** komody/szafki nocne/regały/toaletki/krzesła (audyt #3) — wybrać
  kanoniczną wg liczby produktów + impresji GSC, reszta 301.
- **noindex/Disallow** na filtrach niewybranych jako SEO (`?sort=`, `?cena=`) (audyt #13).
- **Każdy nowy landing**: unikalny H1 z frazą, opis 250+ słów (evergreen wg ZASAD-v2),
  FAQ 3-4 PAA, link do rodzica + 2-3 produktów (reguły z `WYMAGANIA-KLIENTA.md` §7).

### 6.4. Co wymaga ADMIN / DEV (eskalacja do klienta/dewelopera)
- Mapa 301 i zmiana wzorca URL `/pl/menu/` -> `/sklep/` (DEV, projekt 2-4 tyg, audyt #6).
- Edytor mega-menu jeśli stary skin (DEV).
- Strony SEO filtrów jeśli szablon ich nie ma natywnie (DEV).
- Reszta (kategorie, opisy, przypisania produktów, FAQ) — robimy my w panelu (login ADAWARDS).

---

## 7. Priorytety wdrożenia

**P0 — fundament (najpierw, inaczej przebudowa zaszkodzi):**
1. Eksport obecnych URL + liczba produktów per kategoria (panel/Screaming Frog).
2. Mapa 301 stara->nowa struktura.
3. Konsolidacja 5 grup duplikatów (komody, szafki nocne, regały, toaletki, krzesła obrotowe).

**P1 — gałęzie hero (największy zwrot):**
4. Zbudować "Pokój dziecka i nastolatka" z pełnym kompletem podkategorii.
5. Landingi top-volume: Regał na zabawki (22 200), Biurko narożne (27 100),
   Szafa do pokoju dziecięcego (5 400), Biurko regulowane elektryczne (2 900).
6. Gałąź "Meble z grafiką i nadrukiem" + landingi tematyczne (USP).
7. Gałąź "Meble smart / oszczędzające miejsce".

**P2 — uzupełnienie + long-tail:**
8. Landingi kolor (komoda biała, szafka nocna biała/czarna/szara) jako filtry SEO.
9. Landingi target/funkcja (z barierką, dla dziewczynki/chłopca, dla rodzeństwa).
10. Sypialnia/Salon/Przedpokój/Łazienka — kategorie tła + lekkie opisy.
11. Wyczyścić puste typy z menu, przemianować "Meble smart", scalić "Biurka komputerowe".

---

## 8. Weryfikacje do zrobienia przed publikacją (otwarte pytania)
- **Łóżka piętrowe** — czy KOBI ma produkty? (vol 2 900+1 600, ale nie tworzymy pustej kategorii)
- **Liczby produktów per kategoria** — potrzebne do wyboru kanonicznej z duplikatów.
- **Filtry SEO w obecnym szablonie** — czy są natywne, czy DEV.
- **Które typy z obecnego menu są puste** (przewijaki, pomocniki kuchenne, łóżeczka niemowlęce,
  akcesoria) — do usunięcia.
- **kobisc.pl** w menu/KOLEKCJE -> `rel="nofollow"` (audyt #11).

---

## 9. Następne kroki (co mogę wygenerować dalej)
1. **Pełna lista kategorii do panelu** (CSV/tabela: nazwa, rodzic, URL slug, H1, meta title,
   meta description) — gotowa do wklejenia/importu w IdoSell.
2. **Mapa 301** w formacie stara_url -> nowa_url (po eksporcie obecnych URL).
3. **Opisy nowych kategorii hero** wg ZASAD-v2 (evergreen, FAQ, frazy) — pojedynczo, jak dotąd.
4. **Mega-menu mockup** (układ pokój×typ) do akceptacji klienta.

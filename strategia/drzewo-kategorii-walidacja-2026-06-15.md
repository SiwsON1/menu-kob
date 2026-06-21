# Drzewo kategorii meblekobi.pl — walidacja keyword-fit (2026-06-15)

Cel: pokazać dla KAŻDEJ proponowanej kategorii, na czym opiera się jej sens SEO, i uczciwie
oddzielić to, co potwierdzone danymi, od tego, co jest założeniem do weryfikacji.

## Źródła (i ich jakość)
1. **MP — popyt rynkowy:** `_raport-kobi-frazy.tsv` (200 fraz z volume, rankingi meble.pl). Pokazuje
   ile ludzie szukają, niezależnie od KOBI.
2. **MK — własne rankingi KOBI:** `analiza_widocznosci_meblekobi_pl_2026-05-11.xlsx` (364 frazy
   z volume + pozycja + trudność KD + URL). Pokazuje, na co KOBI już łapie ruch.
3. **KLIENT — lista zaakceptowana/odrzucona:** `frazy-master-2026-05-05.md` (twarde guardraile).
4. Produkty: `baza-rodzin-produktowych.md`.

Czego NADAL nie mam: pełnego eksportu Senuto/Ahrefs dla całej niszy (audyt #27) — część kategorii
poniżej ma volume „?", bo żaden z dwóch raportów go nie pokrywa. To są kandydaci do potwierdzenia,
nie pewniki.

## Legenda pewności
- **A — pewne:** KOBI już rankuje (MK) ORAZ jest zmierzony popyt. Konsolidacja/optymalizacja = szybka wygrana.
- **B — popyt potwierdzony, KOBI słabo/wcale:** volume twardy (MP), ale KOBI nie rankuje. Szansa, wymaga treści.
- **C — uzasadnione produktem + klientem, volume niezmierzony:** sensowne, ale liczby brak — do potwierdzenia eksportem.
- **D — tło katalogowe:** istnieje dla pełności oferty i linkowania; NIE keyword play (head term zajęty przez gigantów albo popyt = szum „obi").

Flagi: [P] pokrycie produktowe do sprawdzenia · [M] umiejscowienie/fraza ogólna · [I] możliwy intent mismatch · [V] volume do zmierzenia.

---

## NAJWAŻNIEJSZE KOREKTY vs pierwszy CSV (czego dane mnie nauczyły)
1. **Łóżka podwójne dziecięce / dla rodzeństwa = osobna kategoria P1** (było: landing P2). Klaster:
   łóżeczko podwójne 3600 (poz40), łóżko podwójne dla dziewczynki 1300, łóżka podwójne dla dzieci 1300,
   łóżko dziecięce podwójne 1000 (poz16!), łóżka dwuosobowe dla dzieci 320, dziecięce dwuosobowe 210
   + MP łóżka dla rodzeństwa 880. KOBI rankuje na 3 RÓŻNYCH URL (kanibalizacja: `/pl/menu/lozka-podwojne-173`,
   `/pl/menu/lozka-podwojne-154`, `/sklep/.../lozka-podwojne`). Konsolidacja = duży, łatwy zysk.
2. **Łóżko dziecięce 140x70 = landing (był pominięty jako „tylko filtr").** Klaster: łóżka dziecięce 140x70 480,
   łóżko dla dziecka 140x70 170, dla dziewczynki 140x70 140, „lozko 140 70" 110, 90... KOBI rankuje (EMMA 140x70).
   Klient ZAAKCEPTOWAŁ 140x70 (standard PL). Analogicznie 180x80 (260+50).
3. **Lokalne „Stalowa Wola" = landing/strona — BYŁO POMINIĘTE.** kobi stalowa wola 260, meble stalowa wola 260,
   sklep meblowy stalowa wola 170, salon meblowy 70. Klient zaakceptował lokalne. KOBI już rankuje (poz1 na brand-local).
4. **„obi X" to SZUM** (OBI hypermarket): obi szafki łazienkowe 1900, meble łazienkowe obi 1900, obi biurko 590,
   obi wieszaki 480, obi szafki nocne 480, obi półki 480. Nie budować na tym kategorii — to nie nasz intent.
5. **„Meble z grafiką" jako fraza ≈ 0 zmierzonego popytu.** Ruch jest w konkretach (traktor 590, domek 590,
   kotek 170, auto 70). Gałąź zostaje jako USP/nawigacja + różnicowanie, ale waga SEO na landingach tematycznych.
6. **Komoda biała 27100 / szafka nocna biała 8100 to HEAD ogólny** (dorośli), zajęty przez meble.pl/BRW. KOBI
   realnie rankuje na komoda dąb artisan 1900 (poz33), komoda 40 cm 480, komoda dąb artisan 140 — czyli na
   DEKOR/WYMIAR konkretny, nie na „biała" head. Landingi kolorowe traktować ostrożnie (B/D, nie A).

---

## DRZEWO Z WALIDACJĄ

### 1. POKÓJ DZIECKA I NASTOLATKA (hero)

| Kategoria | Pewność | Dowód (volume / pozycja KOBI) | Produkty |
|---|---|---|---|
| Łóżka dziecięce (root) | A | KOBI rankuje na dziesiątkach fraz produktowych; klient core | AUTO/EMMA/ERYK/LEO/DUBI/FALA/ANNA/MAX/LUK |
| **Łóżka podwójne dziecięce** (NOWE P1) | A | MK 3600+1300+1300+1000(poz16)+320+210; MP 880. 3 URL do scalenia | EMMA II, FALA II, HELIOS, LUK II |
| Łóżka młodzieżowe | C [V] | „łóżko młodzieżowe" brak w raportach; segment kliencki | HELIOS |
| Biurka dziecięce i młodzieżowe | A | MK fajne biurka dla dzieci 590, biurko podwójne dla dzieci 720, biurka dla 4 latka 720, mini biurko 90 | ELISS dz., BASIC, PUFFI, biurka narożne |
| Szafy dziecięce | B [P] | MP szafa do pokoju dziecięcego 5400, szafy do pokoju dziecka 1000; MK ledwie (szafa dziecięca z szufladami 50) = SZANSA | STELLA, MELI, DUNO |
| Komody dziecięce | A | MK komoda do pokoju chłopca 110, komoda biała dziecięca 90, na ubrania dziecięce 50 (URL /komody-dzieciece-179) | komody dziecięce |
| Regały dziecięce | B [P] | MP regał na zabawki **22200** (KOBI NIE rankuje, pokrycie cienkie=LONI); MK regał biały dla dzieci 50 | LONI, regały R40/kostka |
| Szafki nocne dziecięce | A | MK stolik nocny dla dziewczynki 480, szafka nocna dla chłopca 90 (URL /szafki-nocne-dzieci) | szafki nocne dz. |
| Toaletki dziecięce | A | MK toaletka boho 720, scandi 90, skandynawska z lustrem 90 | toaletki SCANDI |
| Półki dla dzieci | C | MK półka serce 70, wieszak chmurka 50; klient accepted (chmurki/zestaw) | LEWIT, MELI, CHMURKI, SERCA |
| Stoliki i krzesełka dziecięce | A | MK zestaw stolik i krzesła 70, do pokoju dziecięcego 50 | stoliki+krzesełka |
| Skrzynie na zabawki | C | MK skrzynia dla dziecka 90, dąb sonoma 50, skarby dla chłopca 70 | skrzynie |
| Barierki / stelaże | D | MK stelaż do łóżka dziecięcego 50; accepted, niski popyt | barierki, stelaże |

Landingi (filtr/podkat) pod łóżka dziecięce:
| Landing | Pewność | Dowód | Produkty |
|---|---|---|---|
| **Łóżko dziecięce 140x70** (NOWE) | A | MK 480+170+140+110+90; accepted PL | EMMA, FALA, MAX, LUK 140x70 |
| Łóżko z barierką | A | MK 110+70+50; MP 590+590 | wszystkie dziecięce |
| Łóżko dla dziewczynki | A | MK podwójne dla dziewczynki 1300, 140x70 140, 180x80 50 | EMMA, FALA |
| Łóżko dla chłopca | B | MP meble do pokoju chłopca 1000; MK chłopiec cluster słaby | AUTO, GOAL, FALA |
| Łóżko domek | A | MK łóżeczko domek 160x80 590, łóżko domek 590, meblik domek 50 | DUBI, FALA |
| Łóżko autko / traktor / kotek | A | MK traktor 590, kotek/kot 170+50, auto 70 | AUTO, FALA, ANIMALS, ANNA |
| Łóżko kareta | A | MK karoca 170, kareta 70; accepted „kareta" (nie karoca) | Kareta |
| Łóżko Montessori / podłogowe | C [P] | MK łóżko lili 180x80 50 (podłogowe niskie) | LEO, LILI |
| Łóżko dla księżniczek | B [P] | MP 480; MK nie rankuje | EMMA, FALA (do potwierdzenia) |
| Białe meble dziecięce | B | MP białe meble do pokoju dziecka 320, dziecięce białe 210 | białe warianty |
| Meble do pokoju dziewczynki | A | MP 2900 | EMMA, FALA, toaletki |
| Meble do pokoju chłopca | A | MP 1000 | AUTO, GOAL |
| Meble do pokoju nastolatka | C | MP aranżacja pokoju młodzieżowego 320; segment accepted | HELIOS, FLEXI, ELISS |
| Biurko narożne | A [M] | MK 120/80x80/120x100/grafit 50-70; MP 27100 (ogólne) | DYLAN, biurka narożne z półkami |
| Biurko regulowane elektryczne | A | MP 2900; MK biurka składane rank | FLEXI, ELISS |
| Biurka rozkładane / chowane | A | MK biurka chowane 390(poz20), składane do komody 170 | VERTO |
| Regał na zabawki | B [P] | MP **22200**; KOBI nie rankuje, 1 model = ryzyko | LONI |

### 2. MEBLE Z GRAFIKĄ I NADRUKIEM (hero USP — uwaga na volume)
| Węzeł | Pewność | Dowód | Uwaga |
|---|---|---|---|
| Meble z grafiką (parasol) | C [V] | „z grafiką" brak zmierzonego popytu; klient priorytet | USP/nawigacja, nie traffic-driver |
| Łóżka bajkowe | A | MK bajkowe łóżka dla dzieci 260(poz13), bajkowe meble 70(poz12); 2 URL do scalenia | rankuje |
| Łóżka z grafiką | C [V] | popyt w tematach (wyżej), nie w „z grafiką" | rozbić na tematy |
| Komody z grafiką | C [V] | klient priorytet; volume? | blue ocean |
| Szafy z nadrukiem | C [V] | klient priorytet; volume? | blue ocean |

### 3. MEBLE SMART / OSZCZĘDZAJĄCE MIEJSCE (hero USP)
| Węzeł | Pewność | Dowód | Produkty |
|---|---|---|---|
| Półkotapczany | C [V] | MK półkotapczan łóżko w szafie 50, meblini polkotapczany 110; flagship klienta, ale niski zmierzony popyt | VERTO 16 SKU |
| Łóżka podwójne wysuwane | A | MK łóżko podwójne wysuwane 110+50, z szufladami 50 (łączy się z podwójne dziecięce) | HELIOS |
| Łóżka z pojemnikiem | A [I] | MP 1600; MK łóżka podwójne z pojemnikiem 110. Intent: „pojemnik"=stelaż podnoszony, KOBI ma SZUFLADY | EMMA, ERYK, HELIOS |
| Biurka rozkładane | A | (jak wyżej, VERTO) | VERTO |

### 4-7. SYPIALNIA / SALON / PRZEDPOKÓJ / ŁAZIENKA (głównie tło)
| Węzeł | Pewność | Dowód / uwaga |
|---|---|---|
| Szafki na buty (z siedziskiem) | A | MP nowoczesna szafka na buty z siedziskiem 1000; MK wieszak+szafka ANDY 90+50. Reszta „obi" = szum |
| Wieszaki | D | volume zdominowany przez „obi wieszaki" (szum); wieszak chmurka 50 realny |
| Komody (ogólne) | D [M] | head zajęty; KOBI rankuje tylko dekor: komoda dąb artisan **1900**(poz33), 40 cm 480, lena 50. Landing realny = „komoda dąb artisan", NIE „komoda biała" |
| Szafki nocne (ogólne) | D | head; KOBI rankuje szafka nocna 40 cm 1300 (produkt), nie head „biała" |
| Toaletki (ogólne) | C | toaletka boho/scandi (patrz dziecięce) |
| Szafki łazienkowe | D | volume = „obi" szum 1900; realne: słupek dąb artisan 70, meble łaz. dąb artisan 50 |
| Szafki RTV / stoły / stoliki / krzesła | D | „obi krzesła do jadalni" 110, szafka rtv czerwona 70, stolik orzech 70 — tło, head zajęty |

### 8. LOKALNE — Stalowa Wola (NOWE, było pominięte)
| Węzeł | Pewność | Dowód |
|---|---|---|
| Sklep meblowy Stalowa Wola (strona lokalna) | A | MK kobi stalowa wola 260(poz1), meble stalowa wola 260, sklep meblowy 170, salon 70, praca 50 |

### 9. MATERACE / 10. OGRÓD / 11. KOLEKCJE
| Węzeł | Pewność | Dowód |
|---|---|---|
| Materace dziecięce | C | MK materac aloe vera 180x200 50; accepted (bez odwróconych wymiarów) |
| Meble ogrodowe (zestawy) | C [V] | brak w raportach (sezonowe); NICEA premium nisza |
| Kolekcje | D | nawigacja; brand/kolekcje |

---

## RYZYKA / RZECZY DO POTWIERDZENIA PRZED ODDANIEM KLIENTOWI
1. **Regał na zabawki (22200)** — najwięcej popytu, ale KOBI ma praktycznie 1 model (LONI) i nie rankuje.
   Sprawdzić w panelu, ile realnie otwartych regałów dziecięcych jest, zanim obiecamy tę kategorię klientowi.
2. **Komoda biała / szafka nocna biała (head)** — wysoki popyt, ale to nie nisza KOBI i KOBI rankuje tylko
   na dekor/wymiar (dąb artisan, 40 cm). Realne landingi: „komoda dąb artisan", „komoda 40 cm", „szafka nocna 40 cm".
   Uwaga: „komoda grafit/wąska 40 cm" były ODRZUCONE przez klienta jako kategoria, choć produkty rankują — trzymać
   jako produkt/filtr, nie kategoria. Do rozstrzygnięcia z klientem (sprzeczność: rankuje vs odrzucone).
3. **„Meble z grafiką" (cała gałąź USP)** — volume „z grafiką" niezmierzony/niski. Klientowi powiedzieć wprost:
   to gra pod różnicowanie marki i long-tail tematyczny, nie pod duży ruch z jednej frazy.
4. **Półkotapczany** — flagship klienta, ale zmierzony popyt niski. Wartość biznesowa (marża) > wartość SEO.
5. **Pełny eksport Senuto/Ahrefs** dla niszy domknąłby kategorie z pewnością C [V] (toaletki, łóżka młodzieżowe,
   meble z grafiką, ogród). Bez niego to założenia produktowo-klienckie, nie zmierzony popyt.
6. **Łóżko z pojemnikiem** — sprawdzić intent: searcher zwykle chce stelaż podnoszony; KOBI ma szuflady.

---

## MAPA POPYTU Z SENUTO (interbeds.pl + meble.pl, 2026-06-15) — domknięcie kategorii C

Dwa eksporty konkurencji przeklastrowane w kubełki kategorii KOBI (suma śr. mies. wyszukiwań).
interbeds.pl (2985 fraz) = idealne dopasowanie niszy dziecięcej. meble.pl (60175 fraz) = szeroki rynek.

### INTERBEDS (nisza dziecięca/łóżka) — popyt per klaster
| Klaster | Suma vol | Twarde frazy | KOBI |
|---|---|---|---|
| **Łóżka piętrowe** | **183 970** | łóżko piętrowe 40500, łóżeczka piętrowe 27100 | **MA (KAROL+AURELIA 16 SKU), brak kategorii!** |
| Łóżka dziecięce (ogólne) | 130 250 | łóżka dla dzieci 22200, łóżko dziecięce 22200 | core |
| **Łóżka młodzieżowe** | **75 660** | łóżeczka młodzieżowe 22200, młodzieżowe rozkładane 3600 | HELIOS (awans C→A) |
| Łóżka podwójne/wysuwane | 53 600 | łóżko wysuwane 1900, podwójne dla dziewczynki 1300 | EMMA II, FALA II, HELIOS |
| Łóżko z pojemnikiem | 48 730 | 140x200 z pojemnikiem 5400, 120x200 3600 | [I] rozmiary DOROSŁE, KOBI ma szuflady |
| Łóżko domek | 43 790 | łóżeczko domek 9900, łóżko domek 9900 | DUBI, FALA, AURELIA |
| Łóżka tapicerowane | 43 450 | łóżka tapicerowane 18100 | [I] DOROSŁE; KOBI kids-panele ERYK |
| Łóżko bajkowe/grafika | 8 620 | samochody 320, zjeżdżalnia 260 (KOBI brak zjeżdżalni) | AUTO, FALA, ANIMALS |
| Łóżko z barierką | 7 560 | łóżko dziecięce z barierką 1000 | wszystkie dziecięce |

### MEBLE.PL (rynek szeroki) — kubełki istotne dla KOBI
| Klaster | Suma vol | Uwaga |
|---|---|---|
| Biurko narożne | 63 030 | KOBI ma (DYLAN, narożne z półkami) — mocne A |
| Toaletka | 56 070 | KOBI scandi/boho rankuje |
| Biurko regulowane | 17 890 | biurko podnoszone 3600 — KOBI FLEXI |
| Regał na zabawki | ~15 330 | regał dziecięcy na zabawki 320; KOBI cienko (LONI) |
| Szafa dziecięca | 6 680 | szafa do pokoju dziecięcego 5400 — KOBI STELLA/DUNO, szansa |
| Komoda (head) | 340 870 | giganci; KOBI realnie tylko dekor: komoda dąb artisan 1900 |
| Szafa / szafka nocna (head) | 367k / 124k | giganci; KOBI tylko sub-nisze dekor/dziecięce |

### REWIZJA PRIORYTETÓW (popyt × pokrycie × czy KOBI rankuje)
**P1 — pewne (rób najpierw):**
1. **Łóżka piętrowe** — NOWE, top opportunity: 184k popytu, 16 SKU (KAROL/AURELIA), kategoria nie istnieje (404). Dodać + landingi (drewniane, domek piętrowy, ze zjeżdżalnią? — NIE, KOBI brak; 80x180/90x200).
2. Łóżka dziecięce + landingi (140x70, z barierką, domek, autko/traktor/kotek, kareta, dla dziewczynki/chłopca).
3. **Łóżka podwójne dziecięce** (scalić 3 kanibalizujące URL).
4. **Łóżka młodzieżowe** (75k — awans; HELIOS).
5. Biurka: narożne (63k) + regulowane (FLEXI) + dziecięce + rozkładane (VERTO).

**P1 — szansa (popyt jest, pokrycie do zbudowania/sprawdzenia):**
6. Szafy dziecięce (5.4k, KOBI słabo rankuje).
7. Regał na zabawki (15k, pokrycie cienkie — [P] sprawdzić ile regałów otwartych).

**Ostrożnie (popyt = inny intent/rozmiar dorosły):**
8. Łóżko z pojemnikiem (48k, ale 120/140x200 dorosłe + stelaż podnoszony ≠ szuflady KOBI).
9. Łóżka tapicerowane (43k, ale dorosłe; KOBI ma tylko kids-panele 160x80 ERYK).

**Niski SEO mimo wagi biznesowej:** Półkotapczany (smart bed ~480) — flagship marży, nie ruchu. Powiedzieć klientowi wprost.

**Tło/head (giganci, nie walczymy solo):** komoda/szafa/szafka nocna ogólne — tylko sub-nisze (dąb artisan, dziecięce, 40 cm jako produkt/filtr, nie kategoria).

### Luki produktowe wykryte w danych (do rozważenia z klientem, NIE kategorie bez produktu)
- Łóżko ze zjeżdżalnią (interbeds: popyt jest; KOBI brak) — warto dosourcing?
- Łóżko z pojemnikiem w rozmiarach dorosłych (120/140x200 podnoszony stelaż) — KOBI brak.

## Kolejny krok (do decyzji)
Mam komplet danych (popyt rynkowy + własne rankingi KOBI + potwierdzone pokrycie produktowe).
Mogę teraz wygenerować **finalne, zwalidowane drzewo + poprawiony CSV** z:
- nową kategorią Łóżka piętrowe (P1, top opportunity),
- awansem łóżek podwójnych dziecięcych i młodzieżowych do P1,
- landingami 140x70 + Stalowa Wola,
- przeklasyfikowaniem head→tło i flagami intent (pojemnik/tapicerowane = dorosłe),
- osobną listą „luki produktowe" dla klienta.

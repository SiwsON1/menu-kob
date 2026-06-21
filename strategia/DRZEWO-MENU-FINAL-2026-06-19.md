# meblekobi.pl — FINALNE drzewo menu (mega-menu)

Wersja: 2026-06-19. Źródło prawdy dla mega-menu i przepisania CSV do panelu.
Scala: drzewo dla klienta 2026-06-15 + rewizja katalogowa + walidacja danymi konkurencji.

**Dane:** katalog 1272 produkty (44 buckety z `produkty-mapowanie-2026-06-15.csv`),
popyt rynkowy z Senuto (`klastry-vs-konkurencja-2026-06-19.md`: interbeds.pl nisza dziecięca,
meble.pl szeroki rynek), własne pozycje meblekobi.pl.

Legenda: `[N]` = liczba produktów KOBI w buckecie · `~Xk` = popyt rynkowy/mc ·
★ priorytet · ★★ najwyższy priorytet · NOWA = gałąź/kategoria której dziś nie ma.
Zasada kanoniczna: jeden typ = jeden obiekt = jeden URL. Pokoje grupują w menu, nie kopiują.

---

## 1. POKÓJ DZIECKA I NASTOLATKA ★ (rdzeń oferty, najmocniejszy SEO)

- **Łóżka dziecięce** — ~223k (łóżka dla dzieci 22,2k; dla dziewczynki 9,9k; dla nastolatków 6,6k)
  - Łóżka bajkowe / z grafiką `[132]` — USP marki, tu leży cała grafika
  - Łóżko domek `[3+]` — ~44k (łóżeczko domek 9,9k), KOBI już rankuje
  - Łóżka montessori / podłogowe `[18]` — LEO, PINI, LILI
  - Łóżka klasyczne `[14]`
  - podstrony SEO pod rozmiar: **160x80** `[102]`, **140x70** `[67]`, **180x80** `[16]`
  - podstrony pod motyw/target: autko / traktor / kotek / kareta · dla dziewczynki · dla chłopca · z barierką
- **Łóżka piętrowe** ★★ NOWA kategoria `[18]` — ~147k nisza (łóżko piętrowe 40,5k; łóżeczka piętrowe 27,1k; z biurkiem 14,8k). KAROL + AURELIA. Dziś tylko wyszukiwarka = strata. **Założyć w pierwszej kolejności.**
- **Łóżka podwójne / dla rodzeństwa** ★ `[51]` — ~34k (łóżeczko podwójne 3,6k). EMMA II, FALA II. Dziś 3 zdublowane URL → scalić.
- **Łóżka młodzieżowe** ★ `[13]` — ~75k (młodzieżowe 27,1k; rozkładane 3,6k). HELIOS, JULIA, ALEX.
- **Komody dziecięce** `[subset]` — KOBI rankuje
- **Szafy dziecięce** `[8]` — ~11k (szafa do pokoju dziecięcego 5,4k), KOBI rankuje. STELLA, DUNO.
- **Szafki nocne dziecięce** `[subset z 43]`
- **Regały dziecięce / na zabawki** `[subset z 53]` — ~15k (regał na zabawki 14,8k). LONI.
- **Półki dla dzieci** `[24]` — LEWIT, MELI, CHMURKI, SERCA
- **Skrzynie na zabawki** `[18]` — KOBI rankuje (skrzynia na zabawki 5,4k)
- **Toaletki dziecięce** `[subset 6]` — SCANDI
- **Stoliki i krzesełka dziecięce** `[12]`
- **Krzesła dziecięce ergonomiczne** NOWA `[12]` — LUMI
- **Barierki i stelaże** `[3]`
- **Materace dziecięce** `[subset z 60]`
- → _menu cross-link:_ Biurka dziecięce → patrz **Strefa nauki i pracy**

## 2. STREFA NAUKI I PRACY (BIURO) ★ — NOWA gałąź (luka domknięta)

Biurka i fotele rozproszone były pod „pokój dziecka" / nigdzie. Razem ~250k popytu.

- **Biurka dziecięce** `[subset z 50]`
- **Biurka młodzieżowe** — ELISS, BASIC, PUFFI
- **Biurka narożne** `[9]` — ~64k (biurko narożne 27,1k). DYLAN.
- **Biurka regulowane elektrycznie** `[18]` — ~17k (biurko regulowane 9,9k). FLEXI, ELISS.
- **Biurka gamingowe** NOWA `[3]` — trend rosnący
- **Biurka rozkładane / chowane (VERTO)** `[2]`
- **Krzesła obrotowe / fotele biurowe** NOWA `[subset z 17]` — ~82k (fotel biurowy 33,1k; gamingowy 12,1k)
- **Regały biurowe / na książki** `[subset z 53]`

## 3. ŁÓŻKA Z GRAFIKĄ I NADRUKIEM (hub marki, NIE osobne kategorie)

USP KOBI, ale fraza „meble z grafiką" ma mało wyszukiwań — ruch z konkretów. Grafika mocna
**tylko w łóżkach** (132); komody z grafiką `[3]` i szafy z nadrukiem `[0]` = za cienko na gałąź.
Ten hub to landing marketingowy linkujący do „Łóżka bajkowe" — nie duplikuje kanonicznych kategorii.

## 4. MEBLE SMART / OSZCZĘDZAJĄCE MIEJSCE (nisza, wysoka marża)

- **Półkotapczany (łóżka w szafie)** `[13]` — VERTO
- → Biurka rozkładane / chowane (link do Strefy nauki)
- → Łóżka rozsuwane (link do Łóżek podwójnych)

## 5. SYPIALNIA

- **Komody** `[105]` — ~373k head (komoda 60,5k). Gramy długim ogonem: **komoda dąb artisan** (KOBI rankuje), komoda biała. + komody z grafiką `[3]` tutaj, nie w osobnej gałęzi.
- **Szafki nocne** `[43]` — ~128k (szafka nocna 49,5k)
- **Szafy** `[17]` — ~840k head (IKEA/BRW) → nie walczymy frontalnie, długi ogon
- **Garderoby** NOWA `[15]` — ~33k. VENO, MALMO.
- **Toaletki** `[6]` — ~43k
- **Materace** `[subset z 60]`
- **Łóżka dwuosobowe / kontynentalne** `[5]` — UWAGA: cienko zatowarowane, landing nie gałąź

## 6. SALON I JADALNIA — pełna gałąź (~250 prod., nie „tło")

- **Stoliki kawowe / ławy** `[66]` — ~356k. **OKAZJA: stolik kawowy 110k!**, stolik kawowy okrągły 27,1k (53 okrągłe w katalogu, nietknięte).
- **Szafki RTV** `[102]` — ~117k (komoda pod telewizor 12,1k)
- **Stoły jadalniane** `[40]` — ~431k (stół okrągły rozkładany 33,1k)
- **Krzesła do jadalni** `[subset z 17]` — ~512k (krzesła do jadalni 74k)
- **Taborety / hokery barowe** `[4]` — ~18k (hokery do kuchni 18,1k)
- **Kanapy / narożniki / sofy** `[30]` — ~492k
- **Fotele / pufy** `[30]` — ~508k
- **Komody do salonu** `[subset komody]`
- **Regały** `[subset z 53]` — ~153k (regał 27,1k)

## 7. ŁAZIENKA I KUCHNIA — zabudowa modułowa ★ — NOWA pełna gałąź

**Największa grupa w sklepie `[144]`** — całkowicie pominięta w 1. planie. Serie Ariel / Elia /
Nova / Lavia / Boni / Ovalia. Popyt długiego ogona niskiej konkurencji.

- Szafki pod umywalkę — blat pod umywalkę 1k
- Słupki łazienkowe
- Szafki nad pralkę / pod pralkę / obudowy pralki
- Szafki z lustrem
- Blaty robocze
- Szafki kuchenne / pod blat — meble łazienkowe na wymiar 2,4k
- → Pomocniki kuchenne `[1]` (podstrona)

## 8. PRZEDPOKÓJ

- **Szafki na buty (z siedziskiem)** `[22]` — ANDY (na buty 1k)
- **Konsole** `[subset 5]` — ~18k (konsola 18,1k)
- **Wieszaki** `[1]` — ~15k (wieszak 14,8k)
- **Zestawy do przedpokoju** `[5]`

## 9. AKCESORIA MEBLOWE — NOWA gałąź (luka, wysoki wolumen)

- **Uchwyty i gałki** `[40]` — ~184k (uchwyt do mebli 14,8k). LUI = **wymienne fronty, realne USP marki.**
- Nóżki do mebli

## 10. MEBLE OGRODOWE `[31]` — ~188k (meble ogrodowe 135k)

- Zestawy technorattan · Zestawy aluminiowe · na balkon

## 11. DLA ZWIERZĄT `[7]`

- **Drapaki dla kota** — KOBI sprzedaje (sprzeczność z dawną notatką). Niski SEO, ale realny towar. Podkategoria/landing.

## 12. MATERACE `[60]` (gałąź użytkowa, + dziecięce jako podstrona)

---

## STRONY POZA DRZEWEM PRODUKTOWYM

- **Sklep meblowy Stalowa Wola** ★ — strona lokalna (meble Stalowa Wola ~260, KOBI #1 brandowo)
- **Kolekcje / serie** — grupowanie marketingowe (KAROL, VERTO, STELLA...), nie kanoniczne kategorie

---

## KONTROLA POKRYCIA: 44 buckety → 0 sierot

Każdy z 44 bucketów katalogu ma dokładnie jedno miejsce kanoniczne (subsety = filtry/podstrony,
nie osobne obiekty). „Łóżka inne" `[3]` → reklasyfikacja ręczna do łóżek dziecięcych.
„Komody z grafiką" `[3]` → Sypialnia/Komody (nie osobna gałąź graficzna).

## CZEGO NIE ROBIMY

- Frazy „obi szafki / obi biurko / obi komoda" = szum (ludzie szukają marketu OBI) — nie budować.
- Head „szafa / komoda / stół / kanapa" frontalnie — przegramy z gigantami; gramy sub-niszami i długim ogonem.
- Łóżka z pojemnikiem / tapicerowane w rozmiarach dorosłych (160x200) — inny segment niż nasze
  dziecięce 160x80 z szufladą; landing, nie gałąź.

## LUKI PRODUKTOWE (popyt jest, towaru brak — do decyzji o dosourcingu)

- Łóżko ze zjeżdżalnią — nisza dziecięca ma popyt, KOBI brak.
- Łóżka dorosłe 120/140x200 z pojemnikiem / tapicerowane — duży popyt, inny segment.

## NEXT STEP (techniczny, bez ruszania panelu)

1. Mapa 301 stara→nowa (warunek: inaczej przebudowa zbije pozycje). Duplikaty: lozka-bajkowe-621/626/627,
   komody-157/649/179, lozka-podwojne-154/173, biurka-163/176/674, krzesla-obrotowe-268/269/270 itd.
2. Scalenie zdublowanych kategorii do kanonicznych.
3. Założenie nowych: **piętrowe (P0)**, Strefa nauki, Akcesoria, Łazienka+Kuchnia, Garderoby.
4. Przepisanie `kategorie-do-panelu.csv` pod to drzewo.

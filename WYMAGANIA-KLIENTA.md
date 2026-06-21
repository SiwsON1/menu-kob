# KOBI Meble — wymagania klienta do opisów (master, czytaj przed każdą sesją)

Konsolidacja wszystkich uwag klienta + wniosków z audytów. Szczegóły mechaniki kategorii: `teksty/kategorie/ZASADY-v2-slowik-motiondesk.md`. Wiedza o produktach/modelach: `wiedza-biznesowa.md`.

## 0. Reguła nadrzędna — pod CZŁOWIEKA
- **Dłuższe, w pełni rozwinięte zdania.** Klient ma czytać i NA PEWNO wiedzieć, o co chodzi. Zero zdań telegraficznych, urwanych, niejasnych. Każdą myśl dopowiedz do końca (kto, po co, jaki problem rozwiązuje).
- Ma być zrozumiałe dla każdego, nie dla SEO-wca. Czytaj własny tekst jak zwykły rodzic.
- „Krócej" (mniej sekcji, mniej lania wody) ≠ „krótkie zdania". Tnij objętość, NIE klarowność.

## 1. Wspólne dla kategorii i produktów
- **En-dash (–)** jako myślnik i w zakresach (3–5 dni, 70–115 cm). NIGDY em-dash (—) ani dywiz „-" jako myślnik. Wymiary „160x80" zostają z „x".
- **Zero antropomorfizmu mebla:** „mebel pracuje", „stelaż pracuje", „ściana pracuje", „komoda zostawia przejście", „łóżko dorasta/oddaje miejsce". (OK: „silnik pracuje cicho", „pracować na stojąco" — o użytkowniku.)
- **Zero żargonu aranżacyjnego:** „zabudowa", „bryła", „strefa", „zagra", „pomost", „konstrukcje". Pisz po ludzku: „pełna szafa", „mniej przytłacza pokój", „pasuje do aranżacji".
- **Trust-sygnały DOZWOLONE i stałe:** gwarancja 24 miesięcy, wysyłka 3–5 dni roboczych (NIE 48h), polski producent. (To NIE jest ujawnianie firm trzecich — Codex błędnie to flaguje, ignoruj.)
- **NIE ujawniać, że KOBI sprzedaje też produkty firm trzecich.** Mów nazwami modeli (STELLA, MELI, LONI, DUNO, HELIOS, VERTO, EMMA, ERYK, LEO…), nie „produkujemy wszystko".
- Bez generic AI fluff („W dzisiejszych czasach", „Skontaktuj się już dziś").
- **Zasada zero — weryfikuj merytorykę na żywej karcie** przed pisaniem/zmianą liczb. Nie zgaduj parametrów (lekcja: wymyślona waga NICEA; błędne 145x80 w EMMA II).

## 2. OPISY KATEGORII (inny reżim niż produkty!)
- **EVERGREEN — ZERO zmiennych liczb:** wymiary w cm, liczba modeli/kolorów/paneli, ceny. Pisz jakościowo („szeroka gama kolorów", „różne szerokości"). Wyjątek: gwarancja 24 mc + wysyłka 3–5 dni.
- **Test zdania zerowego:** pierwsze zdanie musi nieść RÓŻNICĘ (po podmianie marki na konkurencję przestaje być prawdziwe). „Szafa daje miejsce na ubrania" = ZAKAZ (oczywistość/definicja).
- **Zakaz definicji** czym jest mebel/jego część („drążek pozwala wieszać", „komoda służy do…").
- **Różnicowanie + obalenie obiekcji** kupującego (ruch Motiondesk). USP KOBI: fronty z grafiką do pokoju dziecka, wymienne uchwyty (kulki), polski producent.
- **Kotwicz modele z linkiem** (IdoSell: `/pl/search.html?text=NAZWA`).
- **Każdy H2 zawiera frazę główną**, ale naturalnie (nie „czas dostawy i gwarancja na szafy").
- Zakazane frazy: „wąska wnęka", „pościel zimowa/letnia" (mów „pościel"), „filtry wymiarów".
- LONI = otwarty regał. Szafy ≠ tylko grafika (są gładkie + graficzne). 80–90 cm to GŁĘBOKOŚĆ szaf, nie szerokość (i tak nie podawać cm).
- **Strategia frazy:** KOBI NIE wygra head „szafy/komody" (Mebline/BRW/IKEA). Cel = „szafy dziecięce / do pokoju dziecięcego" itp.
- Skill: `slowik-category-seo`. Master template: `teksty/kategorie/2026-05-29/szafy.md`.

## 3. OPISY PRODUKTÓW (odwrotnie niż kategorie!)
- **Konkretne liczby są WYMAGANE** — to karta SKU: wymiary, materiał (płyta laminowana, MDF, FLEX), obciążenie (110 kg), co w zestawie, materac (w zestawie / osobno), kolory/wykończenia.
- **Sprzedażowo, pod klienta** (uwaga klienta z iter1: „produkty za mało sprzedażowe"). BLUF z predykatem („Zamów… jeśli chcesz…"), sekcja „dla kogo", obalona obiekcja, FAQ, cross-link.
- Spójność liczb: wymiary zewnętrzne vs powierzchnia spania; materac „w zestawie" vs „osobno" — jednakowo w całym pliku (BLUF = body = FAQ).
- Skill: `pl-copywriter-ecommerce` + `pl-humanizer`.

## 4. Workflow (obowiązkowy)
1. Czytaj `WYMAGANIA-KLIENTA.md` + `wiedza-biznesowa.md`.
2. WebFetch żywej kategorii/karty → ground truth (modele, typy, wymiary, kolory).
3. Pisz (Claude — polskie copy NIE idzie do Codexa).
4. Audyt po napisaniu: Codex (`codex-seo-reviewer` / spec) — błędy, sprzeczności, czytelność, reguły. Claude weryfikuje findingi (Codex bywa false-positive, np. „polski producent").
5. Generuj docx + wgraj na Drive (folder „Kobi Meble - Poprawki <data>"). Pipeline: `generate-and-upload-<data>.mjs` + `NODE_EXTRA_CA_CERTS` (cert Avast).

## 5. Historia odrzuceń (czego klient NIE chce)
- iter3 kategorii (2026-05-25): „okropne gówno nie pisane pod człowieka, jakby tłumaczone z chińskiego" — definicje, oczywistości, mechaniczne odhaczanie reguł.
- Wersja „telegraficzna" — też odrzucona, mimo że ludzka. Stąd reguła 0 (dłuższe, rozwinięte zdania).

## 6. ZASADY PISANIA OPISÓW PRODUKTÓW (2026-06-01, twarde — na każde przyszłe produkty)

Spisane po dniu, w którym klient musiał prosić 50 razy o to samo. Stosować od pierwszego razu.

### Proces (obowiązkowy, w tej kolejności)
1. **Najpierw pobierz DOSŁOWNY opis producenta z żywej karty** (WebFetch danego URL z meblekobi.pl, nie Codex — Codex ucina i „chroni prawa autorskie", a to NASZA strona). Zapisz do `opisy-zrodlowe-1do1.md`.
2. **Pisz KAŻDY produkt osobno, ręcznie, jakościowo.** Zero szablonu, zero skryptu (żadnego sed-prepend tytułów, żadnego „w każdym nagłówku ta sama fraza").
3. **Porównuj swój tekst z opisem producenta.** Jeśli sformułowanie producenta jest lepsze (np. VERTO „rozkładasz w kilka sekund, jedną ręką, dzięki siłownikom gazowym") — bierz je. Rewrite tylko tam, gdzie REALNIE ulepszasz. Jeśli oryginał lepszy, zostaw oryginał.
4. **Self-review każdego produktu** PRZED pokazaniem klientowi (czytaj zdanie po zdaniu jak człowiek). Nie czekaj, aż klient wskaże błąd.
5. Po napisaniu: grep zakazanych słów (niżej), potem aktualizuj JEDEN folder w miejscu (`update-komplet.mjs`, nadpisuje po ID — link się nie zmienia). NIE rób nowych folderów co upload.

### Reguła nadrzędna nr 1
**Każdą uwagę klienta traktuj jako STAŁĄ regułę i zastosuj do WSZYSTKICH produktów, nie tylko do tego jednego, który wskazał.**

### Nagłówki (H2)
- Tytuł produktu jako `## H2` na górze (NIE H1 — H1 daje szablon strony; NIE usuwać tytułu).
- Nagłówki sekcji **unikalne i naturalne, pod konkretny produkt** — nie ten sam zestaw „Dla kogo / Co dostajesz" na każdym. Frazę wplataj naturalnie, gdy pasuje, nie na siłę.

### Zakazane sformułowania (klient je odrzucał)
- „spokojny kolor / spokojna kolorystyka / spokojny styl" — kolor nie jest spokojny. Pisz „jasny / stonowany / minimalistyczny".
- „robotę odwalają (siłowniki)" — pisz „ciężar przejmują / wyręczają Cię".
- „mebel oddaje podłogę / oddaje pokój" — mebel nic nie oddaje. Pisz „środek pokoju znów jest wolny / zwalnia miejsce".
- „klient musi z tym wytrzymać" i inne negatywne kalki.
- Antropomorfizm mebla: „mebel pracuje", „stelaż pracuje", „komoda zostawia przejście", „łóżko dorasta/oddaje miejsce".
- Półpauza „–" / myślnik „—" / „ - " W PROZIE (najmocniejszy AI-tell PL) — zamiast tego przecinek, kropka, dwukropek, nawias. Zakresy: „3 do 5 dni" albo „70-115" (dywiz bez spacji).
- Masło maślane typu „Łóżko X to dziecięce łóżko" i wciskane wymiary w środek zdania („na powierzchni spania 160x80 cm" wepchnięte do BLUF). Wymiary do sekcji wymiarów.

### Grupa docelowa — TYLKO za producentem
Nie zawężaj odbiorcy na siłę. Sprawdź, co pisze karta:
- RUBI = nastolatki / nowoczesna sypialnia (NIE „dziecko").
- konsola MELI = przedpokój / sypialnia / salon, konsola/toaletka/biurko (NIE „dla dziewczynki").
- KARETA, EMMA = dziewczynka — bo PRODUCENT tak pisze (tu OK).
- łóżka AUTO/ERYK/LEO, CHMURKI = dziecięce wg producenta (OK).

### Produkty vs kategorie
- Produkty: konkretne liczby WYMAGANE (wymiary, materiał, materac, obciążenie) — odwrotnie niż evergreen kategorie.
- Sprzedażowo z „Zamów…" w CTA jest OK (klient to potwierdził). Problemem była pusta formuła „Zamów X jeśli…" w roli całego opisu, nie samo słowo.

### Trust-sygnały dozwolone
Gwarancja 24 mies. (2 lata), wysyłka 3 do 5 dni roboczych, polski producent. Codex błędnie flaguje „polski producent" — ignoruj.

### Źródła w projekcie
- `opisy-zrodlowe-1do1.md` — dosłowne opisy producenta (źródło do pisania).
- `karty-full.md`, `karty-produktow-live.md` — parametry + parafrazy.
- `update-komplet.mjs` — aktualizacja docx w jednym folderze Drive po ID (stały link).

## 7. ZASADY OPISÓW KATEGORII (2026-06-01)

- **Bierz BEZPOŚREDNIĄ (najgłębszą) kategorię produktu z breadcrumba**, nie nadrzędną. Kategorii-rodziców NIE opisujemy osobno (tylko linkujemy do nich).
- **Linkowanie w kategorii = oszczędne:** link do kategorii rodzica (jeśli jest sensowny URL) + 2-3 linki do produktów. I tyle. Bez linków do siostrzanych kategorii, bez nadmiaru.
- **FAQ obowiązkowe** — 3-4 pytania PAA, nagłówek FAQ i pytania z frazą kategorii (pod featured snippets).
- Reszta jak przy 2026-05-29: evergreen (zero liczb/cm/ilości, OK gwarancja 24 mc + wysyłka 3-5 dni), test zdania zerowego, zakaz definicji i żargonu, dash-free, każdy H2 z frazą, kotwiczenie modeli.
- **Sprawdź PEŁNĄ historię kategorii przed pisaniem** (`ls teksty/kategorie/*/`), żeby nie zdublować już napisanej.

### Kategorie JUŻ NAPISANE (stan 2026-06-01) — NIE pisać ponownie:
- 2026-04-20: biurka-komputerowe, łóżka dziecięce, meble ogrodowe, półkotapczany
- 2026-05-29: szafy, komody, łóżka młodzieżowe, łóżka tapicerowane
- 2026-06-01: szafy dziecięce, stoły, szafki łazienkowe, łóżka pojedyncze, szafki RTV, materace piankowo-kokosowe, wieszaki, toaletki
(razem 16 kategorii)

## 8. REJESTR JĘZYKA — PROSTO, JAK PRODUCENT (2026-06-01, twarda zasada)

Najczęstszy mój błąd: brałem prostą, jasną copy producenta i przekombinowywałem ją w wymądrzające się konstrukcje, których nikt po polsku nie mówi. Klient to odrzuca jako „niezrozumiałe dla człowieka".

**Wzorzec = opis producenta.** Jest prosty, jasny, lekko sprzedażowy. Moja robota to go DOPRACOWAĆ (struktura H2, FAQ, usunięcie powtórek, dash-free), NIE zamieniać na łamigłówki.

ZAKAZANE (przykłady z odrzuconych iteracji):
- „pojemność ustawiona w pionie" zamiast po prostu „wysoka komoda"
- „regał wkomponowany/wpisany w bryłę komody" zamiast „otwarte półki"
- „buty znikają do skrzyni, którą lubi się rozsypywać" — cukierkowe metafory
- „mebel pracuje / oddaje podłogę / robotę odwalają siłowniki" — antropomorfizm i slang
- każde zdanie z „wymyślnym kątem" doklejonym do zwykłego faktu

ZASADA: jeśli zdania nie powiedziałby na głos normalny sprzedawca w sklepie meblowym, przepisz je prościej. Krótkie, jasne zdania > efektowne. Fakt + prosta korzyść. Czytelne dla 14-latka.

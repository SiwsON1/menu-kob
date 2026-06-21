# KOBI Meble — bank pomysłów i kierunków rozwoju (maksymalna lista)

**Data:** 2026-05-29
**Cel:** wyczerpujący brainstorm — co można zrobić na stronie, pod GEO, jakie treści, **pomysły na nowe strony/mikrostrony**, różnicowanie, off-site, oraz kiedy "nowa strona" ma sens. Materiał roboczy do rozmowy z Dyrektorem i do planowania zakresu.
**Powiązane:** `rozmowa-dyrektor-2026-05-28.md` (sekcja 7 = skondensowane punkty do mówienia), `geo-konkurencja-idosell-2026-05-29.md` (analiza live + 45 kwestii technicznych).
**Metoda:** skille netim-seo-os (`seo-audit-2026`, `schema-knowledge-graph`, `cost-of-retrieval-optimizer`, `query-fanout`, `competitor-gap-analyzer`, `content-gap-detector`) + Codex (drugi mózg, brainstorm) + live inspekcja strony.

> Zasady twarde przy każdym pomyśle: A1 (nie "łóżka KOBI mają X", tylko przez nazwy serii), bez wymyślonych liczb katalogowych, wymiary PL (160×80). Pomysły oznaczone wykonawcą: ✅TY · ⚠️ADMIN · 🔧DEV · 🆕nowy-byt (poza IdoSell).

---

## 1. Kierunki na OBECNEJ stronie (IdoSell) — on-page, struktura, konwersja

1. ✅ Opisy reszty katalogu sprzedażowo + answer-first (setki SKU, gotowy pipeline).
2. ✅ Bloki opisowe 60-110 słów na górze każdej kategorii (dziś puste/słabe).
3. ⚠️ Konsolidacja zdublowanych kategorii (komody 157/649/179, regały, toaletki, szafki nocne, krzesła obrotowe) + 301/canonical.
4. ⚠️🔧 Sekcje bestsellery/nowości/kolekcje z bazy meblekobi.pl zamiast widgetów kobisc.pl.
5. ✅🔧 `rel="nofollow noopener"` na linkach do kobisc.pl (opisy sam, menu/footer deweloper).
6. ✅ Meta title/description pod CTR dla kategorii i produktów flagowych.
7. 🔧 Wzmocnić H1 strony głównej ("Meble dziecięce i półkotapczany od producenta KOBI").
8. ✅ Internal linking model↔kolekcja (EMMA→DREAM różowy/szary, HELIOS→HELIOS szary) — dane są w `wiedza-biznesowa.md`.
9. ✅ Bloki "pasujące produkty/akcesoria" (łóżko→materac→barierka→szafka nocna z serii) — cross-sell + długi ogon.
10. ✅ Sekcja "wybierz wariant" na produktach wariantowych (VERTO 16 SKU, FLEXI, AUTO grafiki) zamiast osobnych konkurujących stron.
11. 🔧 Paginacja: self-canonical + opis kategorii tylko na str. 1 + dynamiczny title `?page=N`.
12. ⚠️ Blokada indeksacji filtrów `?kolor=`/`?sort=`/`?cena=` (budżet crawla).
13. 🔧 noindex na wynikach wyszukiwarki wewnętrznej `/pl/search.html`.
14. ✅ Tabele HTML: rozmiary, parametry, porównania (zamiast tekstu ciągłego).
15. ✅ Alt texty opisowe na zdjęciach (nie keyword stuffing).
16. ⚠️🔧 Optymalizacja prędkości (WebP natywny IdoSell, preload hero, lazy reszty) — Core Web Vitals.
17. ✅ Strona 404 z linkami do top kategorii + wyszukiwarką.
18. ✅ Spójność wektora Title→Meta→H1 na każdym szablonie (bez dryfu).
19. ⚠️ HTML sitemap (`/mapa-strony/`) + link w stopce.
20. ✅ Ujednolicenie NAP (nazwa/adres/telefon) na stronie = schema = GMB.

---

## 2. GEO / widoczność w AI (ChatGPT, Perplexity, Gemini, AI Overviews)

1. ✅ Answer-first w każdym opisie (typ + wymiar + wiek + materac + cena w 1. zdaniu).
2. ✅ FAQ jako sekcja `<h3>`+`<p>` na top kategoriach (pytania = realne prompty).
3. ✅ `FAQPage` JSON-LD wklejany w opis (IdoSell przyjmuje `<script>` w polu opisu).
4. 🔧 `HowTo` schema montażu łóżka/półkotapczana (nikt w niszy nie ma).
5. 🔧 `hasMerchantReturnPolicy` + `OfferShippingDetails` w Offer (wymóg Rich Results 2026 + AI shopping agents).
6. 🔧 `Article/BlogPosting` z author(Person)+datePublished+dateModified na blogu.
7. ⚠️ `Organization.sameAs[]` (FB, IG, Allegro, GMB, ew. Wikidata) — disambiguation marki.
8. ⚠️ Decyzja o `ClaudeBot`/`anthropic-ai` w robots (dziś blokada; reszta AI-search dopuszczona).
9. ✅🔧 `llms.txt` w roocie — mapa kategorii i poradników dla AI (early-mover, nikt nie ma).
10. ✅ Chunking — akapity 2-4 zdania, każde samodzielne (LLM czyta chunkami).
11. ✅ Density — przymiotniki → liczby z jednostkami (gramatura, cm, kg, lata, % obciążenia).
12. ✅ Tabele porównawcze (cytowalność +47% wg badań w skillu `seo-audit-2026`).
13. ✅ Pokrycie query fan-out: dla "jakie łóżko dla 4-latka" odpowiedzieć też na sub-pytania (wymiar, bezpieczeństwo, materac, cena, pokój).
14. ✅ Definicje jako `DefinedTerm` ("co to półkotapczan", "system FLEX", "łóżko Montessori").
15. ✅ Miesięczny AI visibility test (10-15 zapytań niebrandowych) — czy KOBI jest cytowane.
16. ⚠️ Feed Google Merchant Center z pełnymi polami (GTIN, return, dostępność) — pod AI Shopping.

---

## 3. Pomysły na treści / blog (tematy, pillary, klastry)

**Pillary (hub, 3000+ słów, spinają klaster):**
1. ✅ "Jak wybrać łóżko dziecięce" — rozmiar (140×70 vs 160×80 vs 90×200), typ (grafika/domek/Montessori/pojazd), wiek, bezpieczeństwo. Spina cały dział łóżek.
2. ✅ "Pokój dziecka od zera — kompletny przewodnik" (wyprawka: łóżko + materac + szafa + biurko + regał + oświetlenie + dywan).
3. ✅ "Pokój nastolatka — meble które rosną z dzieckiem" (biurka FLEXI, szafa z regulacją drążka, łóżko 90×200).
4. ✅ "Małe wnętrza — meble oszczędzające miejsce" (półkotapczany VERTO, biurka składane VERTO, łóżka z pojemnikiem).

**Spoke / poradniki (1500-2200 słów, z planu czerwiec + nowe):**
5. ✅ Półkotapczan — przewodnik (4 wymiary VERTO) — *specjalizacja, konkurencja blogowa zerowa.*
6. ✅ Regał na zabawki — jak wybrać (22 200/mc) — *duży wolumen.*
7. ✅ Szafa do pokoju dziecięcego/młodzieżowego (5 400 + 2 900/mc).
8. ✅ Biurko młodzieżowe — elektryczne/składane/z nadstawką (9 900/mc).
9. ✅ Łóżka z grafiką — motywy, czyszczenie, na ile lat — *nowa fraza klienta.*
10. ✅ "Łóżko Montessori — czy warto, od jakiego wieku" (LEO).
11. ✅ "Łóżko domek dla dziecka — drewno, bezpieczeństwo, aranżacja" (DUBI).
12. ✅ "Materac dla dziecka — pianka czy pianka+kokos, jaka grubość".
13. ✅ "Barierka do łóżka dziecięcego — do jakiego wieku, jak montować".
14. ✅ "Jak bezpiecznie przymocować meble do ściany" (regały, szafy — bezpieczeństwo).
15. ✅ "Półkotapczan — do jakiej ściany można montować" (literalna treść klienta, beton/cegła vs karton-gips).
16. ✅ "Biurko elektryczne dla ucznia — czy ma sens, jak ustawić wysokość" (FLEXI).
17. ✅ "Meble ogrodowe aluminiowe — jak dbać, czy zimować" (NICEA, sezonowy peak wiosna/lato).
18. ✅ "Jak urządzić pokój dla rodzeństwa" (łóżka podwójne/piętrowe, podział strefy).
19. ✅ "Kolory w pokoju dziecka — dekory uniwersalne na lata" (biały/kaszmir/dąb artisan/szary).
20. ✅ "Narożnik z funkcją spania do salonu — jak wybrać" (HELIOS — segment salon).
21. ✅ "Przedpokój z dzieckiem — szafka na buty z siedziskiem, wieszak".
22. ✅ "Toaletka dla dziewczynki — od jakiego wieku, jak ustawić".

**Treści sezonowe / cykliczne:**
23. ✅ "Wyprawka do pokoju przed 1 września" (sierpień peak — biurko, regał, lampka).
24. ✅ "Prezent dla dziecka na święta — meble i akcesoria do pokoju" (listopad/grudzień).
25. ✅ "Najlepsze łóżka dziecięce 2026" — odświeżane rocznie (freshness pod AI).

**Treści wspierające konwersję/trust:**
26. ✅ "Czym różni się producent od pośrednika mebli" (pozycjonowanie KOBI jako producenta — bez ujawniania A1).
27. ✅ "Gwarancja, reklamacje, dostawa — jak wygląda zakup mebli w KOBI".

---

## 4. POMYSŁY NA NOWE STRONY / MIKROSTRONY / LANDINGI (rozbudowane)

> Każdy pomysł: po co · fraza/segment · gdzie zbudować (IdoSell CMS vs 🆕 osobny byt) · ryzyko kanibalizacji.

**A. Landingi / strony tematyczne w obrębie IdoSell (najtańsze, bez ryzyka):**
1. ✅ **Strona-przewodnik "Półkotapczany"** (CMS) — hub VERTO + 4 wymiary + FAQ + linki do SKU. *Fraza: półkotapczan. Specjalizacja, niska konkurencja.*
2. ✅ **Strona "Łóżka z grafiką / z nadrukiem"** (CMS) — galeria motywów AUTO/EMMA + jak wybrać. *Nowa fraza klienta. Różnicowanie.*
3. ✅ **Strona "Meble do małego pokoju"** (CMS) — kuratorowana selekcja (półkotapczan, biurko składane, łóżko z pojemnikiem). *Segment, nie pojedyncza fraza.*
4. ✅ **Strona "Wyprawka do pokoju dziecka"** (CMS) — zestaw startowy + checklisty. *Intencja zakupowa "kompletujemy pokój".*
5. ✅ **Strona "Pokój nastolatka"** (CMS) — biurka FLEXI/ELISS + szafa + łóżko 90×200. *Mostek do segmentu młodzież.*
6. ✅ **Strona "Bezpieczeństwo mebli dziecięcych"** (CMS) — atesty, obrzeże PCV, mocowanie do ściany, FLEX. *Trust + E-E-A-T + cytowalność AI.*
7. ✅ **Strona "O producencie KOBI"** (CMS) — historia, fabryka, eksport (Targi Poznań 2026), bez A1. *Brand entity + sameAs.*

**B. Narzędzia interaktywne (konwersja + linkowalność + cytowalność AI):**
8. 🔧/🆕 **Quiz "Jakie łóżko dla mojego dziecka?"** — wiek/wzrost/pokój/budżet → rekomendacja modelu. *Magnes na linki, długi czas na stronie, świetne pod AI ("polecane przez quiz").*
9. 🔧/🆕 **Kalkulator "Jaki rozmiar łóżka do wieku/wzrostu"** — 140×70/160×80/90×200. *Featured snippet + cytowalność.*
10. 🔧/🆕 **Konfigurator pokoju / "skompletuj pokój"** — dobierz łóżko+szafa+biurko z pasujących dekorów. *AOV w górę, cross-sell.*
11. 🔧/🆕 **Kalkulator "czy półkotapczan zmieści się w mojej ścianie"** — wymiary po złożeniu/rozłożeniu. *Niszowe, ale unikalne.*
12. 🆕 **Wizualizator dekoru** — podgląd modelu w 4 dekorach (biały/kaszmir/szary/dąb artisan). *Redukcja zwrotów.*

**C. Strony pod segmenty biznesowe:**
13. ✅/🆕 **Landing B2B / hurt / dropshipping** — dla sklepów odsprzedających (KOBI jest producentem). *Fraza: meble dziecięce hurt, dropshipping meble. Osobny lejek.*
14. ✅/🆕 **Landing eksportowy EN/DE** — pod Targi Poznań i kontakty eksportowe. *Nowy rynek; ryzyko: wymaga tłumaczeń i hreflang.*
15. ✅ **Strona "Współpraca / dla architektów i projektantów wnętrz"** — rabaty, katalog, próbki dekorów. *B2B nisza, wysoka wartość.*

**D. Strony-satelity / mikrostrony (osobne domeny — ostrożnie, długoterminowo):**
16. 🆕 **Blog ekspercki na osobnej domenie** (np. poradnikowy o urządzaniu pokoju dziecka) linkujący do meblekobi.pl. *Off-site authority; ryzyko: duplikacja wysiłku, musi być realnie wartościowy.*
17. 🆕 **Mikrostrona pod jedną mocną frazę** (np. polkotapczany.xxx) — tylko jeśli IdoSell nie wystarcza na pełną kontrolę. *Ryzyko kanibalizacji z kategorią na meblekobi.pl — raczej NIE, lepiej landing wewnętrzny (#1).*
18. 🆕 **Strona "Galeria realizacji / pokoje klientów" (UGC)** — zdjęcia pokoi ze zrealizowanymi meblami. *Experience (E-E-A-T), social proof; może być sekcja IdoSell.*

**E. Strony contentowe pod AI/featured snippets:**
19. ✅ **Słownik mebli dziecięcych** (`DefinedTerm`) — półkotapczan, Montessori, system FLEX, obrzeże PCV, dekor. *Cytowalność definicji w AI.*
20. ✅ **Strona "Porównanie typów łóżek"** (grafika vs domek vs Montessori vs pojazd vs z pojemnikiem) — duża tabela. *Query fan-out "jakie łóżko".*

> **Reguła anty-kanibalizacja:** landing wewnętrzny w IdoSell prawie zawsze bije osobną mikrostronę dla tej samej frazy. Osobny byt (🆕) tylko gdy: (a) IdoSell technicznie nie pozwala, (b) inny segment/język/biznes (B2B, eksport), (c) narzędzie wymagające własnego frontu (quiz/konfigurator na Next.js osadzony w iframe lub subdomenie).

---

## 5. Nowe rzeczy / różnicowanie (czego nie robi konkurencja)

1. ✅ Eksponowanie atestów bezpieczeństwa (EN 716, atest higieniczny) — rzadkie u konkurentów-producentów.
2. 🔧/🆕 Wideo produktu + wideo montażu z `VideoObject`+transkrypcja.
3. 🆕 AR / "zobacz mebel w swoim pokoju" (długoterminowo, mało kto ma).
4. ✅ Recenzje ze zdjęciami od klientów (UGC) + zachęta (rabat za opinię z foto).
5. ✅ Profil doradcy/projektanta firmujący poradniki (E-E-A-T).
6. ✅/🆕 Usługa "darmowy projekt pokoju" / konsultacja doboru mebli (jak meblik.pl).
7. ✅ Program lojalnościowy / rabat na drugi mebel z serii (cross-sell).
8. ✅ Rozszerzona gwarancja jako USP (jeśli możliwe — meblik chwali się 7 lat).
9. ✅ "Próbki dekorów" wysyłkowo (redukcja zwrotów, B2B).
10. ✅ Treści wideo-poradniki na YouTube (kanał = sygnał E-E-A-T + sameAs).
11. ✅ Sekcja "często kupowane razem" oparta na realnych zestawach serii.

---

## 6. Rozwój / skalowanie / off-site

1. ✅ Allegro / marketplace jako drugi kanał (producent → własne aukcje).
2. ⚠️ Google Merchant Center + kampanie Shopping/PMax (feed z IdoSell).
3. ✅ Link building: PR w portalach parentingowych/wnętrzarskich (gościnne poradniki).
4. ✅ Współprace z influencerami parentingowymi (recenzje łóżek z grafiką).
5. ✅ Google Business Profile (nawet dla e-commerce) + lokalne frazy (Stalowa Wola w `frazy-master`).
6. ✅ E-mail marketing (newsletter sezonowy: wyprawka, święta, ogród wiosną).
7. ✅ Social proof na social (IG/FB) z realizacji + UGC.
8. ✅ Katalogi branżowe i porównywarki (Ceneo) — z pełnym feedem.
9. ✅ Współpraca z blogerami wnętrzarskimi (backlink + brand mention).
10. ✅ Brand monitoring (Mention/Google Alerts) — śledzenie wzmianek marki KOBI.
11. 🆕 Pinterest (meble dziecięce/aranżacje = wizualna nisza, ruch długoterminowy).

---

## 7. Kiedy "nowa strona" (replatform) MA sens, a kiedy NIE

**Argumenty PRZECIW migracji teraz (rekomendacja: zostać na IdoSell):**
- IdoSell działa, sprzedaje, ma poprawne dane strukturalne, koszyk, płatności, integracje, magazyn.
- 90% potrzeb SEO/GEO da się zrobić w obrębie IdoSell (treść/FAQ/meta/blog sami + reszta przez dewelopera szablonu jednorazowo).
- Migracja setek SKU = ryzyko utraty pozycji i ruchu na miesiące + koszt kilkudziesięciu tys. zł + przepięcie integracji.

**Sygnały, że CZAS rozważyć migrację (headless/custom, np. Next.js commerce):**
- Twardy limit IdoSell blokuje wzrost (brak kontroli nad `<head>`/schema/szybkością mimo dewelopera).
- Core Web Vitals nie da się dociągnąć w szablonie IdoSell, a to kosztuje pozycje/konwersję.
- Potrzeba własnych narzędzi (zaawansowany konfigurator/quiz/AR), których CMS nie udźwignie.
- Skala treści/segmentów (B2B + eksport EN/DE + blog ekspercki) przerasta architekturę sklepu.
- Koszt utrzymania/abonamentu IdoSell przy dużej skali > koszt własnego stacku.

**Ścieżka pośrednia (zanim pełna migracja):**
- Narzędzia (quiz/konfigurator) jako 🆕 osobny front (Next.js) osadzony w subdomenie/iframe, reszta zostaje na IdoSell.
- Blog ekspercki na osobnej domenie jako poligon, jeśli blog IdoSell ogranicza.

**Konkluzja:** najpierw wycisnąć obecną stronę (kierunki 1-6, 3-6 mc), zmierzyć, i dopiero przy realnym limicie — migracja z policzonym ROI. Nie odwrotnie.

---

## 8. Aneks — dorzucone przez Codex (kuratorowane, net-new)

> Drugi przebieg brainstormu (Codex/gpt-5.5). Zostawiam tylko to, czego NIE ma wyżej. Odrzucono pomysł "strona co produkujemy vs co sprzedajemy" — łamie zasadę A1 (ujawnia sprzedaż obcych marek).

**Treści / blog (nowe, konkretne):**
- ✅ Serie wiekowe: "Łóżko dla dwulatka", "dla sześciolatka", "dla nastolatka — kiedy 190×90/200×90" (mocny long-tail wiekowy).
- ✅ Serie przestrzenne: "Pokój dziecka na poddaszu", "z wnęką (kiedy półkotapczan)", "w bloku — 12 układów" (Pinterest/social).
- ✅ "Jak zmierzyć pokój przed zakupem łóżka" (HowTo, ogranicza zwroty).
- ✅ "Jak przygotować dziecko do przejścia z łóżeczka na łóżko" (górny lejek, parenting).
- ✅ "Najczęstsze błędy przy wyborze łóżka / biurka dziecięcego" (featured snippets).
- ✅ "Meble do pokoju dziewczynki bez różowych stereotypów" / "dla chłopca bez motywów na jeden sezon" (różnicowanie + nowocześni rodzice).
- ✅ Mega-FAQ jako treść: "50 pytań o łóżka dziecięce", "30 o półkotapczany", "30 o biurka" (long-tail + AI).
- ✅ "Pokój dziecka alergika" / "pokój neuroprzyjazny" — ostrożnie, z konsultantem i źródłami (zdrowotne).
- ✅ Lead magnety PDF: "Checklist zakup łóżka online", "Checklist pokój pierwszoklasisty", "Plan pokoju do wydruku", "Lista wymiarów przed zakupem półkotapczanu".

**Nowe strony / landingi (net-new):**
- ✅ Landingi wiekowe: "Łóżko dla przedszkolaka", "dla ucznia" (frazy wiekowo-sezonowe).
- ⚠️ Indeksowalne landingi/filtry wymiarowe: "Łóżko dziecięce 160×80 / 180×80 / 190×90" — TYLKO realne frazy, kontrola kanibalizacji vs filtry (zgodnie z PL: większy×mniejszy).
- ✅ Landingi funkcjonalne: "Łóżko z materacem (zestaw)", "z szufladą", "z barierką" — z unikalną treścią, nie duplikat filtra.
- ✅ Huby przechowywania: "Regały do pokoju dziecka", "Skrzynie na zabawki", "Komody i szafy dziecięce".
- ✅ **Centrum instrukcji montażu** (biblioteka PDF/HTML, indeksowalna) — posprzedaż + SEO + baza pod HowTo.
- ✅ **Biblioteka wymiarów** (tabele łóżek/materacy/biurek/regałów) — wysoka wartość pod AI.
- ✅ **Centrum opinii i realizacji** (recenzje + zdjęcia + serie) — konwersja.
- 🆕 **Strefa architekta** z plikami CAD/SketchUp/3D + wymiary + kontakt (B2B, magnes na linki).
- 🆕 Landingi eksportowe: EN "Export furniture manufacturer Poland", DE "Kinderzimmermöbel Hersteller Polen" (subfolder lub osobny Next.js, bez kanibalizacji PL).
- ✅/🆕 Mikrostrona "KOBI na Targach Poznań 2026" (PR/B2B/eksport).
- ✅ Kampanijne (coroczna aktualizacja): "Powrót do szkoły", "Prezent dla dziecka — łóżko z grafiką", "Pokój dziecka bez remontu".
- 🆕 Landingi B2B obiektowe: "Meble dziecięce do hotelu/pensjonatu/apartamentu", "dla dewelopera / PRS".

**Różnicowanie / UX / posprzedaż (net-new):**
- ✅ "Paszport produktu" PDF dla serii własnych (wymiary, zdjęcia, przeznaczenie, instrukcja) + karty jakości serii.
- ✅ Sekcja "dla kogo NIE jest ten produkt" — buduje zaufanie, rzadkie w branży.
- ✅ Pakiety/zestawy z jednym CTA: "pokój ucznia", "mały pokój", "pierwsze duże łóżko" + "dobierz materac do łóżka" w koszyku.
- ✅ Program "drugie dziecko" (rabat na kolejny element pokoju) + lojalność rodzinna.
- ✅ E-mail 6 mc po zakupie: prośba o zdjęcie realizacji + opinię (zasila UGC + AggregateRating).
- ✅ Współprace eksperckie: fizjoterapeuta dziecięcy (ergonomia biurek FLEXI), architekt wnętrz (małe pokoje) — E-E-A-T.
- 🆕 "KOBI Academy" — seria wideo-poradników; "1 pokój, 3 układy"; live shopping; wideo testu otwierania VERTO.
- ✅ Tryb zakupowy "mam pokój X m²" zamiast przeglądania kategorii.
- ✅ "Zamów próbkę koloru/dekoru" + "zarezerwuj konsultację telefoniczną" przy większych zestawach (jeśli operacyjnie realne).
- ✅ Strona "części zamienne i akcesoria" dla serii własnych (trwałość/naprawialność).

---

## Następne kroki (operacyjnie)
- [ ] Wybór z Dyrektorem: które kierunki (A-E z `rozmowa-dyrektor`) wchodzą do zakresu.
- [ ] Z tej listy: 3-5 quick wins na start (answer-first + FAQ + meta + 5 art. czerwiec + 2 landingi tematyczne).
- [ ] Potwierdzić dostępy (ADMIN/DEV) — odblokowuje Fazy techniczne.
- [ ] Potwierdzić atesty + autora bloga (E-E-A-T).

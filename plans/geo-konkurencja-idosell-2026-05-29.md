# KOBI Meble — GEO + konkurencja + co da się zrobić na IdoSell

**Data:** 2026-05-29
**Cel:** kompletna lista kwestii pod GEO (Generative Engine Optimization), benchmark konkurencji meblowej i mapa działań możliwych na platformie IdoSell. Materiał pod rozmowę z Dyrektorem (uzupełnia `rozmowa-dyrektor-2026-05-28.md` o warstwę techniczną i AI).
**Metodyka:** skille netim-seo-os (`seo-audit-2026`, `schema-knowledge-graph`, `cost-of-retrieval-optimizer`, `query-fanout`) + live inspekcja meblekobi.pl (surowy HTML, robots.txt, blog) + research konkurencji.

> Wszystkie ustalenia "live" zweryfikowane 2026-05-29 na surowym kodzie strony (nie z pamięci). Rzeczy niepewne oznaczono `[do weryfikacji]`.

---

## 0. TL;DR — 7 rzeczy, które trzeba wiedzieć przed rozmową

1. **Karty produktów KOBI są pod schema MOCNE** — IdoSell natywnie wstawia `Product + Offer + AggregateRating + Brand + Review` (na łóżku AUTO realne 5 opinii z gwiazdkami), plus `FurnitureStore`, `Organization`, `BreadcrumbList`, `WebSite+SearchAction`. To lepiej niż większość konkurencji. **Nie zaczynamy od zera.**
2. **Największa luka GEO to NIE schema, tylko format treści** — opisy zaczynają się od ogólnika ("połączenie praktyczności i wyjątkowego designu"), nie od konkretnej odpowiedzi z liczbami. AI cytuje konkrety, nie przymiotniki.
3. **Brak FAQPage schema NIGDZIE** (ani produkt, ani kategoria) — to najtańszy, najszybszy zysk pod AI (+58,9% szansy cytowania wg badań, skill `seo-audit-2026`).
4. **robots.txt blokuje `ClaudeBot` i `anthropic-ai`** — czyli Claude/Anthropic nie zacytuje KOBI. GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended **są dopuszczone** (mogą crawlować). To decyzja do podjęcia świadomie.
5. **Blog istnieje (~36 artykułów, 4 strony)**, ale wpisy nie mają widocznych **dat, autorów ani kategorii** na kartach — zero sygnałów E-E-A-T i freshness, które są paliwem GEO.
6. **Oferta nadal linkuje do `kobisc.pl`** (bestsellery/nowości/kolekcje w menu) — wyciek autorytetu poza domenę, na której pozycjonujemy.
7. **`Offer` bez `hasMerchantReturnPolicy` i `shippingDetails`** — to w 2026 wymóg pełnych Rich Results i pól, które czytają "AI shopping agents" (ChatGPT zakupy, Gemini Shopping).

---

## 1. Stan faktyczny meblekobi.pl (live 2026-05-29)

### 1.1. Strona główna
- **Title:** `Meble dziecięce i salonowe od producenta KOBI | Sklep online` — OK (brand + kategoria + nisza).
- **H1:** jeden, treść `Polski producent mebli` — **za ogólny**, brak frazy ("meble dziecięce", "łóżka dziecięce"). Audyt #17 wspominał o problemie podwójnego H1 w starym szablonie — obecnie jeden H1, ale słaby.
- **Blog:** dostępny w menu jako "Jak urządzić wnętrze?" → `/pl/blog.html`.
- **Linki do kobisc.pl:** obecne (nowości/bestsellery/kolekcje, np. `kobisc.pl/pl/menu/lozka-bajkowe-621.html`).
- **Platforma:** IdoSell (potwierdzone), szablon RWD.

### 1.2. Karta produktu (AUTO Spider 160×80, ID 13820)
- **H1:** `Łóżko dziecięce z serii AUTO 160x80 grafika materac - SPIDER`.
- **JSON-LD — 5 bloków (zweryfikowane na surowym HTML):**
  1. `FurnitureStore` + `PostalAddress` (LocalBusiness — natywne IdoSell)
  2. `Organization`
  3. `BreadcrumbList` + `ListItem`
  4. `WebSite` + `SearchAction` (sitelinks searchbox)
  5. `Product` + `Offer` + `AggregateRating` + `Brand` + `Review×5` + `Person` + `Rating`
- **Braki w schema:** ❌ `FAQPage`, ❌ `hasMerchantReturnPolicy`, ❌ `shippingDetails` (w Offer), ❌ `HowTo` (montaż).
- **Pierwsze zdanie opisu:** *"Łóżko dziecięce AUTO to połączenie praktyczności i wyjątkowego designu inspirowanego światem motoryzacji oraz superbohaterów."* → **nie answer-first** (ogólnik zamiast: typ + wymiar + wiek + materac + cena).
- **Tabela parametrów:** jest jako HTML (wymiary 165×84×49, powierzchnia 160×80, materac 7 cm, gwarancja 24 mc) — dobre dla AI.
- **FAQ na stronie:** brak dedykowanej sekcji.

### 1.3. Blog (`/pl/blog.html`)
- ~36 wpisów na 4 stronach (np. "Łóżka drewniane i piętrowe…", "Materace medyczne…", "Ergonomiczne krzesło i biurko elektryczne…", "Targi Meblowe Poznań 2026…").
- **Karty wpisów BEZ dat, autorów i kategorii** — brak `Article/BlogPosting` z `author Person`, `datePublished`, `dateModified` `[do weryfikacji w surowym HTML wpisu, ale na liście niewidoczne]`.
- H1 listy: `Blog`.

### 1.4. robots.txt
- `Sitemap: https://meblekobi.pl/sitemap.xml.gz` (jest, spakowany).
- `Crawl-delay: 1`, blokada ~30 ścieżek systemowych (logowanie, koszyk, zamówienia) — OK.
- **Boty AI zablokowane (`Disallow: /`):** `ClaudeBot`, `anthropic-ai`, `Bytespider`, `Meta-ExternalAgent`, `Amazonbot`.
- **Boty AI dopuszczone (brak na liście blokad):** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, `Applebot-Extended`.
- Wniosek: to domyślna polityka IdoSell (blokuje część scraperów AI). Trzeba ją **świadomie ustawić** pod GEO.

### 1.5. llms.txt
- Brak (`/llms.txt` nie odpowiada). Żaden z badanych konkurentów też nie ma — tani early-mover.

---

## 2. Czym jest GEO i co się "pod GEO" konkretnie robi

GEO = optymalizacja, żeby treść była **cytowana w odpowiedziach AI** (ChatGPT, Perplexity, Google AI Overviews/Gemini, Bing). Inny cel niż klasyczny ranking: nie chodzi o pozycję w 10 niebieskich linkach, tylko o to, by model **wybrał i zacytował** Twój fragment. Mechanizmy (wg skilli netim-seo-os):

| Mechanizm | Co to znaczy | Efekt (źródła w `seo-audit-2026`) |
|---|---|---|
| **Query fan-out** | AI rozbija jedno pytanie ("jakie łóżko dla 4-latka") na 5-10 sub-pytań (wymiar, bezpieczeństwo, materac, cena, do jakiego pokoju). Strona musi odpowiadać na sub-pytania. | Pokrycie sub-pytań = wejście do odpowiedzi |
| **Answer-first** | Pierwsze zdanie sekcji = zwięzła odpowiedź (1-2 zdania, z liczbami). | +20-30% cytowań |
| **FAQPage schema** | Realne pytania (z PAA, z supportu) jako `Question/Answer`. | +58,9% szansy cytowania |
| **Tabele HTML** (nie obrazek) | Porównania, rozmiary jako `<table>`. | +47% cytowań |
| **Konkretne dane + jednostki** | "materac piankowy 7 cm, wiek 3-9 lat, max 110 kg" zamiast "wygodny i bezpieczny". | +20-30% |
| **Wektor kontekstowy** | Title → meta → H1 spójne tematycznie, bez dryfu. | +25-30% |
| **Chunking** | Akapity 2-4 zdania (40-60 słów), każde zdanie samodzielne (LLM czyta chunkami). | wyższa ekstrahowalność |
| **Cost of Retrieval** | Im taniej AI/Google wyciąga fakt (dobra struktura, listy, boldy encji, density), tym chętniej wybiera stronę. | mniej "puchu" = wyższy wybór |
| **Schema jako grounding** | JSON-LD potwierdza encje (Produkt/Marka/Firma) i obniża niepewność modelu (patenty Google: confidence/cost/nodes). | szybszy grounding, wyższa pewność |
| **E-E-A-T / proweniencja** | Autor z `Person` + `sameAs`, daty, źródła. | sygnał zaufania dla AI |
| **Entity hubs** | `about`/`mentions`/`hasPart` + hub & spoke = topical authority. | model widzi komplet, nie zgaduje |
| **llms.txt** | Mapa kluczowych stron dla botów AI w roocie. | ułatwia AI nawigację |

**Skrót dla Dyrektora:** "GEO to pisanie tak, żeby AI mogło skopiować nasz fragment jako gotową odpowiedź — krótka odpowiedź na górze, konkretne liczby, FAQ z prawdziwych pytań, tabele, oznaczenia w kodzie (schema). Część z tego KOBI ma, części brakuje."

---

## 3. Co robią lepsi konkurenci (benchmark)

| Domena | Nisza | Co robi mocno (czego KOBI nie ma/ma słabiej) |
|---|---|---|
| **meblik.pl** | premium meble dziecięce, producent + salony | dedykowana strona `/faq`, atest TÜV + gwarancja 7 lat eksponowane, opinie Google z gwiazdkami, "darmowy projekt pokoju" — silne E-E-A-T |
| **kocotkids.com** | polski producent łóżek z grafiką (bezpośredni rywal) | blog poradnikowy ("jak urządzić kącik", "gdzie trzymać zabawki"), pozycjonowanie "producent"; **brak** ocen i atestów = luka, którą KOBI może wyprzedzić |
| **interbeds.pl / clickbed.pl / pietrowe.pl** | wąska specjalizacja: piętrowe + półkotapczany | bardzo silny topical match na wąskiej frazie; ceny w title; konkretne wymiary łatwe do cytowania przez AI |
| **transforms.pl** | półkotapczany / piętrowe metalowe (producent) | opisowe karty funkcji (szafa+spanie+wypoczynek), pełne wymiary |
| **bodzio.pl / meblowa1.pl / dedekids.pl** | zestawy do pokoju | **internal linking między elementami zestawu** (łóżko→komoda→biurko→szafa) z opisowymi anchorami — długi ogon |

**Wnioski przekrojowe (co robią, czego u KOBI brak):**
1. Dedykowana strona/sekcja **FAQ** (meblik) — KOBI nie ma.
2. **Atesty bezpieczeństwa** eksponowane (EN 716, atest higieniczny, TÜV) — krytyczne dla rodziców i dla AI jako trust; KOBI nie eksponuje liczbowo.
3. **Blog poradnikowy z linkami do kategorii** (kocot) — KOBI ma blog, ale bez spinania z ofertą i bez dat/autorów.
4. **Wąskie landing pages pod jedną frazę** (interbeds/clickbed) — KOBI ma asortyment, ale rozmywa go w szerokich kategoriach.
5. **Internal linking zestawów** (bodzio) — KOBI słabo łączy modele z pasującymi kolekcjami (choć dane do tego są w `wiedza-biznesowa.md`: DREAM, HELIOS szary itd.).
6. **"O producencie" z konkretną datą/latami na rynku** (meblik) — KOBI ma tylko "polski producent" bez liczb.

---

## 4. LISTA KWESTII GEO/SEO dla KOBI (jak najwięcej, pogrupowane)

Legenda kto wdraża na IdoSell: ✅ **TY** (panel, edycja treści) · ⚠️ **ADMIN** (uprawnienia admina) · 🔧 **DEV** (szablon/kod). Wpływ: 🔴 wysoki · 🟡 średni · 🟢 niski.

### A. Format treści pod AI (answer-first, chunking, density)
1. 🔴 ✅ **Answer-first w opisach produktów** — pierwsze zdanie = typ + wymiar + wiek + materac + cena. Zamiast "połączenie praktyczności i designu" → "Łóżko AUTO 160×80 to łóżko-samochód z materacem piankowym 7 cm, dla dzieci 3-9 lat, z barierką i szufladą". Dotyczy całego katalogu opisów.
2. 🔴 ✅ **Answer-first + blok 60-110 słów na górze KAŻDEJ kategorii** — definicja + 2-4 fakty (wymiary, wiek, materiał, cena od). Dziś kategorie są słabe lub puste.
3. 🟡 ✅ **Chunking** — łamać ściany tekstu na akapity 2-4 zdania; długie opisy zamieniać na listy tam, gdzie jest wyliczanie.
4. 🟡 ✅ **Density / konkrety** — każdy przymiotnik ("solidny", "wygodny") zastąpić liczbą/parametrem (gramatura, cm, kg, lata). Skill `cost-of-retrieval-optimizer`.
5. 🟢 ✅ **Bold na encjach i atrybutach** (nazwy modeli, materiały, wymiary) — obniża Cost of Retrieval.

### B. FAQ (największy szybki zysk pod GEO)
6. 🔴 ✅ **FAQ jako sekcja `<h3>`+`<p>` na top kategoriach** — pytania to realne prompty: "Jakie łóżko dla 3-latka?", "Łóżko 140×70 czy 160×80?", "Czy półkotapczan da się montować do karton-gipsu?".
7. 🔴 ✅ **`FAQPage` JSON-LD** wklejany w opis kategorii/produktu (IdoSell pozwala wkleić `<script>` w pole opisu). Treść pytań MUSI być widoczna na stronie. Instrukcja gotowa w `instrukcje-idosell-2026-04-26.md` #15.
8. 🟡 ✅ **FAQ na produktach flagowych** (VERTO, FLEXI, AUTO, HELIOS) — mamy już FAQ w opisach iteracji 2, wystarczy dorobić blok JSON-LD.

### C. Schema / structured data (mamy mocną bazę, dobić braki)
9. 🔴 🔧 **`hasMerchantReturnPolicy` w Offer** — brak; wymóg pełnych Rich Results 2026 + czytają go AI shopping agents. Deweloper szablonu wstawia raz, globalnie.
10. 🔴 🔧 **`shippingDetails`/`OfferShippingDetails` w Offer** — brak; KOBI ma "wysyłka 3-5 dni" w treści, ale nie w schema.
11. 🟡 🔧 **`HowTo` schema dla montażu** — łóżko/półkotapczan = idealny HowTo; nikt w niszy tego nie ma.
12. 🟡 ⚠️ **`Organization.sameAs[]`** — dodać profile (FB, Instagram, Allegro, GMB, ew. Wikidata) dla disambiguation encji marki. `[do weryfikacji czy IdoSell już wstawia sameAs]`.
13. 🟡 🔧 **`Article/BlogPosting` na wpisach bloga** z `author` (Person), `datePublished`, `dateModified`, `image` — `[do weryfikacji w surowym HTML wpisu]`.
14. 🟢 ✅ **Walidacja** wszystkiego w Rich Results Test + GSC (cel: 0 błędów = ranking signal wg patentów, skill `schema-knowledge-graph`).

### D. Polityka botów AI (GEO gate)
15. 🔴 ⚠️ **Odblokować `ClaudeBot` i `anthropic-ai`** w robots.txt (jeśli chcemy cytowań w Claude) — decyzja biznesowa. Reszta kluczowych (GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended) jest już dopuszczona.
16. 🟢 ⚠️ **Świadoma polityka** — spisać które boty AI dopuszczamy vs blokujemy (scrapery cenowe Dealavo/Twenga zostawić zablokowane, boty AI-search dopuścić).

### E. Blog / hub & spoke / E-E-A-T (paliwo topical authority)
17. 🔴 ✅ **Dodać daty + autora + kategorię** do każdego wpisu (freshness + E-E-A-T). Bez tego AI nie traktuje wpisu jako wiarygodnego źródła.
18. 🔴 ✅ **5 artykułów czerwiec** z `content-plan-2026-06.md` (półkotapczan → regał na zabawki 22k vol → szafa → biurko młodzieżowe 9,9k → łóżka z grafiką) — wypełniają realne luki vs konkurencja.
19. 🟡 ✅ **Pillar "Jak wybrać łóżko dziecięce"** spinający rozmiary 140×70 / 160×80 / 90×200 i typy (grafika / domek / pojazd) — KOBI ma wszystkie typy, brak treści porównawczej.
20. 🟡 ✅ **Internal linking artykuł↔kategoria↔produkt** (3-5 linków/500 słów, opisowe anchory) — spina hub & spoke.
21. 🟢 ✅ **Profil autora/eksperta** ("doradca KOBI", "projektant") przy poradnikach — żaden konkurent-producent tego nie ma.
22. 🟢 ✅ **Semantic freshness** — odświeżać top artykuły co 6-12 mc (nowe scenariusze, nie tylko data).

### F. Tabele i porównania (cytowalność)
23. 🟡 ✅ **Tabela porównawcza "140×70 vs 160×80 vs 90×200"** (wiek, wzrost, waga dziecka, wymiar pokoju) — w pillarze i kategoriach.
24. 🟡 ✅ **Tabela "który dekor do jakiego wnętrza"** (biały/kaszmir/szary/dąb artisan) — VERTO/FLEXI.
25. 🟢 ✅ **Tabela "typy biurek"** (elektryczne FLEXI / składane VERTO / z nadstawką ELISS) — gotowe w planie art #4.

### G. Architektura / kanibalizacja / wyciek autorytetu
26. 🔴 ⚠️🔧 **Sekcje bestsellery/nowości/kolekcje na meblekobi.pl zamiast kobisc.pl** — dziś wyciek PageRank (audyt #9). Moduł "Polecane towary" IdoSell ciągnie z własnej bazy.
27. 🟡 ✅🔧 **`rel="nofollow noopener"` na linkach do kobisc.pl** (audyt #11) — w opisach sam, w menu/footerze deweloper.
28. 🔴 ⚠️ **Konsolidacja zduplikowanych kategorii** (komody 157/649/179, regały, toaletki, szafki nocne, krzesła obrotowe) + canonical/301 (audyt #2-4) — rozbija PageRank i myli AI co do encji kategorii.
29. 🟡 ⚠️ **Blokada indeksacji filtrów** `?kolor=`, `?sort=` (audyt #13) — chroni budżet crawla.
30. 🟡 🔧 **Paginacja**: self-canonical + opis kategorii tylko na str. 1 (audyt #12).

### H. Wąskie landingi / nowe kategorie pod frazy
31. 🟡 ⚠️✅ **Landing "półkotapczan"** jako mocna kategoria (VERTO 16 SKU) — specjalizacja KOBI, konkurencja blogowa zerowa.
32. 🟡 ⚠️✅ **Kategoria/landing "łóżka z grafiką"** — nowa fraza klienta, KOBI ma 7+ wariantów AUTO + EMMA.
33. 🟢 ⚠️ **"Biurko młodzieżowe"** jako nazwany segment (FLEXI/VERTO/ELISS) — 9,9k vol/mc.

### I. Meta / wektor kontekstowy
34. 🟡 ✅ **Meta title+description** dla wszystkich kategorii i produktów flagowych (audyt #5; mamy gotowe dla 4 kat. + 10 prod.).
35. 🟡 🔧 **Wzmocnić H1 strony głównej** — z "Polski producent mebli" na frazowy "Meble dziecięce i półkotapczany od producenta KOBI" (audyt #17).
36. 🟢 ✅ **Spójność Title→Meta→H1** na każdej stronie (bez dryfu tematycznego).

### J. Multimodal / media (przewaga, mało kto ma)
37. 🟡 ✅ **Alt text opisowy** na zdjęciach produktów (nie keyword stuffing) — AI czyta multimedia.
38. 🟢 🔧 **Wideo produktu / montażu** + `VideoObject` z transkrypcją — przewaga, nikt w niszy nie ma.
39. 🟢 ✅ **Zdjęcia autorskie w aranżacji pokoju** (nie packshot na białym) — Experience w E-E-A-T.

### K. Trust / E-E-A-T (sygnały dla rodziców i AI)
40. 🔴 ✅ **Eksponować atesty** (EN 716, atest higieniczny PHO) na kartach i kategoriach dziecięcych — `[do potwierdzenia z klientem jakie atesty ma]`.
41. 🟡 ✅ **Strona "O producencie"** z konkretami (rok założenia, lata na rynku, gdzie fabryka) — bez ujawniania produktów obcych marek (zasada A1).
42. 🟢 ✅ **Zachęta do dłuższych opinii ze zdjęciem** — AggregateRating już działa, ale recenzje krótkie; dłuższe = więcej cytowalnej treści.

### L. GEO-only (czysto pod AI)
43. 🟡 ✅🔧 **`llms.txt`** w roocie — mapa kluczowych kategorii i poradników. Tani early-mover (nikt w niszy nie ma).
44. 🟢 ✅ **AI visibility test** — co miesiąc 10-15 zapytań niebrandowych w ChatGPT/Perplexity/Gemini ("najlepsze łóżko z grafiką dla dziecka", "półkotapczan 140x200") i sprawdzać czy KOBI jest cytowane. Bez nazwy marki (zasada `feedback-zero-branded-prompts`).
45. 🟢 ⚠️ **Feed Google Merchant Center** z pełnymi polami (cena, dostępność, GTIN, return policy) — AI shopping agents i Shopping czytają feed.

---

## 5. Co konkretnie da się zrobić NA IdoSell (mapa wykonalności)

IdoSell ogranicza dostęp warstwami. Podział z `instrukcje-idosell-2026-04-26.md`:

### ✅ TY — w panelu, bez admina, od ręki
- Opisy kategorii i produktów (answer-first, konkrety, chunking, bold).
- FAQ jako sekcja HTML + wklejony `<script>FAQPage</script>` w polu opisu (IdoSell przyjmuje JSON-LD w opisie).
- Meta title/description per kategoria i produkt (zakładka Pozycjonowanie).
- Alt texty zdjęć.
- Artykuły bloga (treść) + uzupełnienie pól SEO wpisu.
- `rel="nofollow"` na linkach do kobisc.pl wewnątrz opisów.
- Tabele porównawcze jako `<table>` w opisach.
- Walidacja w Rich Results Test, testy mobilne, strona 404.

### ⚠️ ADMIN — wymaga uprawnień administratora sklepu
- robots.txt (odblokowanie ClaudeBot, blokady filtrów/systemowych).
- Sitemap.xml — konfiguracja typów + zgłoszenie w GSC.
- Konsolidacja kategorii + przekierowania 301 (sekcja Pozycjonowanie → Przekierowania URL).
- Canonical na duplikatach kategorii.
- Włączenie/konfiguracja modułu Blog (URL, kategorie).
- Parametry URL (noindex dla filtrów).
- Meta tagi strony głównej.
- GA4 Enhanced E-commerce, GSC, Hotjar/Clarity.

### 🔧 DEV — edytor szablonu RWD / deweloper IdoSell
- `hasMerchantReturnPolicy` + `shippingDetails` w schema Offer (globalnie w szablonie produktu).
- `HowTo` schema montażu, `VideoObject`.
- `Article` z author/data na wpisach bloga (jeśli szablon nie daje).
- Sekcje bestsellery/nowości z bazy meblekobi.pl (zamiast widgetów kobisc.pl).
- Paginacja: rel canonical + opis tylko str.1, dynamiczny title `?page=N`.
- Naprawa H1 strony głównej, mixed content `http://`.
- Ujednolicenie struktury URL z planem 301 (duży projekt 2-4 tyg).
- `llms.txt` (lub jako strona CMS przekierowana — `[do sprawdzenia czy IdoSell pozwala plik w roocie]`).

> **Ważne ograniczenie IdoSell:** część schema jest "zaszyta" w szablonie i generowana automatycznie — własnego JSON-LD na produkcie nie wstawisz globalnie bez DEV. FAQPage da się obejść per-strona przez wklejenie w opis. Pełnej kontroli nad `<head>` nie ma bez dewelopera szablonu.

---

## 6. Jak to rozwijać — roadmap (fazy)

**Faza 0 — odblokowanie GEO (1 tydzień, ADMIN):**
robots.txt (ClaudeBot + filtry), sitemap w GSC, GA4 Enhanced E-commerce. Bez tego pomiar i część cytowań są martwe.

**Faza 1 — szybkie zyski na treści (2-4 tyg, TY):**
Answer-first + FAQ (HTML + FAQPage JSON-LD) na 10 top kategoriach i produktach flagowych. Meta tagi. To 80% efektu GEO przy małym nakładzie.

**Faza 2 — content hub & spoke (ciągłe, TY):**
5 artykułów czerwiec z planu + pillar "jak wybrać łóżko". Daty/autorzy na blogu. Internal linking. Cel: topical authority "pokój dziecka / młodzieżowy".

**Faza 3 — schema dobicie (1-2 tyg, DEV):**
return policy + shipping w Offer, HowTo montaż, Article na blogu, sameAs Organization. Walidacja GSC.

**Faza 4 — architektura (projekt, ADMIN+DEV):**
konsolidacja kategorii + 301, sekcje z własnej bazy zamiast kobisc.pl, paginacja, struktura URL.

**Faza 5 — przewaga / monitoring (ciągłe):**
atesty, "o producencie", wideo, llms.txt, miesięczny AI visibility test + raport pozycji (seo-tracker już gotowy).

---

## 7. KPI (pod GEO, nie tylko pozycje)
1. Cytowalność w AI Overviews / ChatGPT / Perplexity (miesięczny sample 10-15 zapytań niebrandowych).
2. Pokrycie sub-pytań (query fan-out) na top frazach.
3. GSC Rich Results — valid items per typ, 0 błędów.
4. Ruch niebrandowy z intencją zakupową (GSC filtered).
5. CTR Rich Results vs zwykłe wyniki.
6. Liczba opinii/AggregateRating na produktach (rośnie = więcej cytowalnej treści).
7. Topical authority coverage (% pokrycia klastra "pokój dziecka").

---

## 8. Pytania do klienta (blokują część działań)
1. **Dostęp ADMIN/DEV** — czy dostajemy uprawnienia do robots/sitemap/przekierowań, czy idzie to przez ich dewelopera IdoSell? (decyduje o tempie Faz 0/3/4).
2. **Polityka botów AI** — odblokowujemy ClaudeBot? (Anthropic/Claude cytowania vs ochrona przed scrapingiem).
3. **Atesty** — jakie certyfikaty bezpieczeństwa mają meble dziecięce (EN 716, higieniczny)? Można je eksponować?
4. **kobisc.pl** — zgoda na nofollow + przełączenie sekcji home na bazę meblekobi.pl?
5. **Blog** — autor pod artykułami (kto firmuje E-E-A-T)?
6. **Zakres** — czy techniczne SEO/GEO wchodzi do umowy (Fazy 0/3/4 wymagają dewelopera).

---

## 9. JAK wdrażać na IdoSell, skoro "nie ma dostępu do kodu" (warstwy iniekcji)

> Ustalenie live 2026-05-29: na stronie **działa już Google Tag Manager `GTM-KMGVCWN` oraz GA4 `G-CL10XD31EN`**. To zmienia grę — większość rzeczy "kodowych" da się wstrzyknąć **bez dewelopera szablonu**.

**Pięć warstw, którymi dorzucamy rzeczy do IdoSell bez ruszania kodu szablonu:**

1. **Google Tag Manager (najmocniejsza, już jest `GTM-KMGVCWN`)** — przez Custom HTML tag w GTM można:
   - wstrzyknąć **dowolny JSON-LD** (FAQPage, HowTo, Organization+sameAs, dodatkowe pola Offer) na wybranych typach stron (reguły: URL zawiera `/menu/` = kategoria, `/products/` = produkt);
   - dorzucić **widżety/sekcje DOM** (np. blok FAQ, tabelę porównawczą, baner) JS-em w konkretne miejsce strony;
   - odpalać **eventy GA4/konwersje** (np. klik w wariant, dodanie do koszyka z poziomu landingu).
   - ⚠️ Uwaga GEO: JSON-LD wstrzykiwany JS-em przez GTM jest widziany przez Google (renderuje JS) i przez boty AI-search, które renderują (GPTBot/Perplexity render bywa ograniczony) — dlatego **schema krytyczna lepiej server-side (DEV), a GTM jako szybki most/uzupełnienie**.
2. **Pole "Opis" kategorii/produktu (✅ TY, w panelu)** — przyjmuje pełny HTML: `<h2/h3>`, `<table>`, `<details>` (accordion FAQ), a także `<script type="application/ld+json">` i `<style>`. Tu wstawiamy answer-first, FAQ + FAQPage, tabele, definicje — **server-side, bez DEV i bez GTM**.
3. **Strony CMS / "Treści" (✅ TY / ⚠️ ADMIN)** — pełny HTML → tu budujemy **landingi tematyczne** (półkotapczany, łóżka z grafiką, "O producencie", bezpieczeństwo, biblioteka wymiarów, słownik), strony B2B, mapę HTML.
4. **"Skrypty śledzące / Custom HTML" w panelu IdoSell (⚠️ ADMIN)** — globalne wstrzyknięcie kodu przed `</head>`/`</body>` (jeśli nie chcemy iść przez GTM): tu np. weryfikacja GSC, Hotjar/Clarity, dodatkowy JSON-LD globalny.
5. **robots.txt + sitemap + przekierowania + meta globalne (⚠️ ADMIN, sekcja Pozycjonowanie)** — odblokowanie ClaudeBot, blokady filtrów, 301 przy konsolidacji.

**Wniosek do rozmowy:** "nie ma kodu" to mit — mamy GTM + pola HTML w panelu + CMS. Bez dewelopera robimy: answer-first, FAQ+FAQPage, tabele, landingi, llms.txt (jako plik przez ADMIN lub strona+reguła), część schema przez GTM. Deweloper potrzebny tylko do: schema server-side w `<head>` produktu (return/shipping/HowTo na stałe), sekcji z bazy zamiast kobisc.pl, paginacji, struktury URL. **Czyli ~70% pod GEO ruszamy od ręki.**

---

## 10. OFF-SITE GEO — wzmianki bez linków, encja, digital PR (rdzeń GEO 2026)

> Intuicja słuszna: w GEO **sama wzmianka marki (bez linku) jest sygnałem**. Dane: branded web mentions mają najsilniejszą korelację (~0,66) z obecnością w AI Overviews; ~95% cytowań AI pochodzi ze źródeł niepłatnych; domeny z wzmiankami na Reddit/Quora mają ~4× wyższą szansę cytowania; jeden materiał PR rozesłany na wiele serwisów = mediana +239% cytowań; 83% cytowań AI Overviews pochodzi spoza TOP10 organicznego.

**A. Fundament encji (żeby AI w ogóle "wiedziało", czym jest KOBI):**
1. **Wikidata** — wpis encji "KOBI" jako producent mebli (`instance of: furniture manufacturer`, kraj, sameAs do social). Fundament grounding.
2. **Google Business Profile** — spójny NAP + opis + posty produktowe (nawet dla e-commerce).
3. **Katalogi firm** (Panorama Firm, Aleo, GoWork, branżowe meblarskie) — identyczna nazwa/opis = redundancja encji w niezależnych źródłach.
4. **`Organization.sameAs[]`** spinające FB/IG/YT/LinkedIn/Allegro/Ceneo/GMB — "klej" encji across-web.
5. **Spójny brand entity** — zawsze "KOBI" (nie Kobi/KOBI Meble/kobisc) + powtarzalna asocjacja z kategorią ("polski producent łóżek dziecięcych z grafiką").

**B. Źródła, które AI realnie cytuje (obecność tam = cytowania):**
6. **Reddit** (r/Polska, r/dzieci, r/wnetrza) — dominujące źródło wzrostu cytowań w ChatGPT/Perplexity; naturalne wzmianki w żywych wątkach.
7. **Quora PL** — eksperckie odpowiedzi na "jakie łóżko dla 3-latka", "z barierką czy bez".
8. **Fora parentingowe**: `forum.babyboom.pl` (wątki meble do pokoju dziecka), `forum.canpolbabies.com`.
9. **Grupy FB** ("Mamy urządzają pokoje dzieci", "Pokój dziecka inspiracje") — odpowiedzi na prośby o polecenie.
10. **Rankingi/listicle w niszy**: `senpo.pl/chybasnisz`, `zaczarowanasypialnia.pl/blog/rankingi`, `salonsnu.pl` — pitch o ujęcie marki (nawet bez linku).
11. **Portale wnętrzarskie**: Homebook, Domodi, Deccoria, urzadzamy.pl, Allani — artykuły/wzmianki w kontekście pokoju dziecka.
12. **Agregatory zakupowe**: Ceneo, Favi.pl, Domodi, Allegro — encje, które AI czyta dla cen/dostępności/parametrów.
13. **YouTube** — montaż/realizacje; transkrypcje są indeksowane i cytowane przy "jak złożyć / jak urządzić".
14. **Prasa branżowa meblarska** (biznes.meble.pl) — wzmianka producenta = co-citation z kategorią.

**C. Digital PR i formaty, które AI lubi cytować:**
15. **Raport z danymi** ("Jak Polacy urządzają pokoje dzieci 2026" — ankieta na 500 rodziców) — dane/statystyki są nieproporcjonalnie cytowane.
16. **Syndykacja** tego samego materiału na kilka serwisów (mediana +239% cytowań).
17. **Treści "X vs Y"** (łóżko domek vs klasyczne; półkotapczan vs łóżko) — wysoka ekstrakcyjność.
18. **Współprace z influencerami** parentingowymi/wnętrzarskimi — recenzje z nazwą modelu (format "co polecasz").
19. **Opinie Google/Allegro/Ceneo z atrybutami** ("łóżko Emma stabilne, duża szuflada") — stają się cytowanymi fragmentami.
20. **Case studies realizacji pokoi** na blogu + cross-post na portalach (clickbed to robi, KOBI nie).

**D. Pomiar (bez tego nie wiadomo, co działa):**
21. Monitoring cytowań AI: **Profound / Otterly.ai / Peec AI / LLMrefs** — czy "KOBI" pada w ChatGPT/Perplexity/Gemini i przy jakich promptach (zgodnie z `feedback-zero-branded-prompts`: testy na zapytaniach kategorycznych, nie brandowych).

**Priorytet off-site (siła dowodów):** (1) brand mentions + digital PR z danymi, (2) community Reddit/Quora/babyboom, (3) spójność encji Wikidata+GMB+sameAs, (4) potem dopiero on-site FAQ/tabele/llms.txt jako w 100% kontrolowana wygrana.

---

## 11. Konkurencja — pogłębione (co realnie mają w kodzie/off-site)

| Konkurent | Kod/schema (live) | Autorytet / off-site |
|---|---|---|
| **clickbed.pl** (najdojrzalszy) | Organization + Product + BreadcrumbList + WebSite | **Autorzy z imienia i nazwiska**, gwarancja 10 lat, **konfigurator**, galeria "realizacje we wnętrzach klientów", storytelling |
| **meblik.pl** | SPA (schema renderowana JS) | Najsilniejszy: **7 lat gwarancji, fabryka, badania TÜV, normy UE, bezpłatny "Projekt pokoju", strona /faq**, opinie 4,6/5 |
| **interbeds.pl** | brak JSON-LD w widoku home (możliwe na kartach) | **Ceny w title**, **certyfikat TÜV**, producent z adresem, ocena 4,9 |
| **kocotkids.com** | brak JSON-LD w widoku, blog edytorski | producent, 2 lata gwarancji; brak autorów/lat/FAQ/konfiguratora |
| **meblekobi.pl (KOBI)** | **Product+Offer+AggregateRating(4,8/248)+Review+Brand+FurnitureStore+Organization+BreadcrumbList+WebSite** | producent, 24 mc gwarancji, opinie zweryfikowane; **brak: FAQPage, HowTo, autorów bloga, "projekt pokoju"/konfiguratora, atestów w treści, cen w title** |

**Co z tego wynika dla pozycji KOBI:** pod schema produktu KOBI **wygrywa** z większością (ma AggregateRating+Review, czego brak u konkurencji). Realne luki vs liderzy: (1) brak FAQPage/HowTo, (2) brak nazwanych autorów (clickbed ma), (3) brak usługi "projekt pokoju"/konfiguratora (meblik+clickbed), (4) brak wyeksponowanych atestów (meblik/interbeds budują na TÜV), (5) brak galerii realizacji (clickbed), (6) cienki blog widoczny w schema. **Żaden konkurent nie ma `llms.txt`** — czyste pole first-mover.

> Sygnał strategiczny: `dziecirosna.pl` przekierowuje (301) na `babyboom.pl` — silne domeny parentingowe wchłaniają nisze. Wniosek: obecność w ekosystemie parentingowym (babyboom/fora/grupy) jest realnym kanałem, nie dodatkiem.

---

## 12. Co z tego jest najprzydatniejsze NA ROZMOWIE z Dyrektorem

- **"Strona jest zdrowsza niż myśleliśmy"** — twardy dowód: pokazujemy, że karty mają komplet danych strukturalnych (Google widzi produkt/markę/ceny/oceny/opinie) lepiej niż konkurencja. Buduje zaufanie do nas.
- **"Nie potrzebujemy przebudowy, żeby ruszyć"** — GTM + pola HTML w panelu = 70% pod GEO robimy od ręki, bez kosztu dewelopera. Argument "szybko i tanio zaczynamy".
- **"GEO to przewaga, której konkurencja nie ma"** — nikt w niszy nie ma llms.txt/FAQPage/HowTo; możemy być pierwsi, których cytuje ChatGPT/Perplexity. Sprzedażowy haczyk.
- **"Najmocniejsza dźwignia jest poza stroną"** — wzmianki marki + obecność w community/rankingach + raport z danymi. To uzasadnia budżet na content/PR, nie tylko opisy.
- **"Konkurencja wygrywa zaufaniem (TÜV, lata, projekt pokoju), my możemy to dogonić"** — atesty, "O producencie", konfigurator, galeria realizacji. Konkret, co dołożyć.
- **Pytanie o dostępy** — co możemy sami (panel/GTM), a co przez ich dewelopera. Ustawia tempo i zakres.
- **Pomiar = ROI** — Profound/Otterly + miesięczny raport pozycji i cytowań AI; pokazujemy efekty, uzasadniamy kolejne miesiące.

---

## Źródła i powiązane pliki
- `rozmowa-dyrektor-2026-05-28.md` — brief biznesowy na spotkanie (ten plik = warstwa techniczna/GEO)
- `instrukcje-idosell-2026-04-26.md` — 32 zadania SEO z podziałem TY/ADMIN/DEV
- `wiedza-biznesowa.md` — zasady (A1 nie ujawniać obcych marek), parametry, linki
- `strategia/content-plan-2026-06.md` — 5 artykułów + luki vs konkurencja
- `frazy-master-2026-05-05.md` — frazy akceptowane/odrzucone
- Skille: `seo-audit-2026`, `schema-knowledge-graph`, `cost-of-retrieval-optimizer`, `query-fanout`
- Live inspekcja meblekobi.pl 2026-05-29 (surowy HTML produktu, robots.txt, blog)

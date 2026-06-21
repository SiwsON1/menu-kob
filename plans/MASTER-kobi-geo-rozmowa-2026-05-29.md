# 📋 KOBI / meblekobi.pl — MASTER: GEO, SEO, IdoSell, konkurencja, pomysły, rozmowa z Dyrektorem

**Data:** 2026-05-29 · **Status:** materiał roboczy + przygotowanie do rozmowy
**Metoda:** skille netim-seo-os (`seo-audit-2026`, `schema-knowledge-graph`, `cost-of-retrieval-optimizer`, `query-fanout`) + 3 agenty research (konkurencja, off-site GEO, IdoSell) + Codex (brainstorm) + **live inspekcja surowego HTML strony**.
**Zasady twarde:** A1 (nie "łóżka KOBI mają X", tylko przez nazwy serii AUTO/EMMA/ERYK/LEO/DUBI/VERTO/FLEXI/ELISS/HELIOS/NICEA) · bez wymyślonych liczb katalogowych · wymiary PL (160×80) · bez em-dashy w body.
jaki
---

## CZĘŚĆ I — STAN FAKTYCZNY STRONY (live, surowy kod 2026-05-29)

### Co jest dobrze (mocniejsze niż się spodziewaliśmy)
- **Karta produktu ma bogaty schema:** `Product + Offer + AggregateRating(4,8/248 opinii) + Review×5 + Brand` oraz globalnie `FurnitureStore`, `Organization`, `BreadcrumbList`, `WebSite+SearchAction`. Pod tym KOBI bije większość konkurencji.
- **GTM zainstalowany:** `GTM-KMGVCWN`. **GA4:** `G-CL10XD31EN`, `gtag` aktywny.
- **Blog działa:** ~36 artykułów, 4 strony, moduł blogowy obecny (`/pl/blog.html`).
- **Sitemap:** `sitemap.xml.gz` (w robots), **1× H1** na home, meta description sensowny ("KOBI to polski producent mebli dziecięcych, młodzieżowych i salonowych...").

### Co jest źle / brakuje (luki)
- **Brak `FAQPage` nigdzie** (produkt ani kategoria) — najtańszy zysk GEO niewykorzystany.
- **Opisy NIE answer-first** — np. AUTO zaczyna od "połączenie praktyczności i wyjątkowego designu" zamiast konkretu z liczbami.
- **`Offer` bez `hasMerchantReturnPolicy` i `shippingDetails`** — wymóg pełnych Rich Results 2026 + pól dla AI-shopping.
- **Brak `HowTo`** (montaż) i brak `Article`/autora/daty na wpisach bloga (zero E-E-A-T/freshness).
- **robots.txt KOBI blokuje `ClaudeBot` + `anthropic-ai`** (Disallow /), choć GPTBot/OAI-SearchBot/PerplexityBot/Google-Extended są dopuszczone. (Uwaga: domyślny robots IdoSell wpuszcza wszystkie boty AI — czyli ktoś u KOBI dołożył blokadę.)
- **Wyciek do kobisc.pl** — nowości/bestsellery/kolekcje w menu linkują na siostrzaną domenę.
- **Brak `llms.txt`** (nikt w niszy nie ma — wolne pole).
- **H1 home za ogólny** ("Polski producent mebli", bez frazy meble dziecięce/łóżka).

---

## CZĘŚĆ II — CO POTRAFI IdoSell I JAK WDROŻYĆ "BEZ KODU"

### Natywne funkcje SEO IdoSell (jest out-of-the-box)
- Auto-schema: Product/Offer/AggregateRating/Review/Organization/BreadcrumbList/WebSite (potwierdzone na KOBI).
- Sitemap XML (auto, raz dziennie), robots.txt **edytowalny w panelu** (Sklep → SEO Optymalizacja), canonical aktywny, przekierowania 301 w panelu, przyjazne URL.
- Meta przez **schematy ze zmiennymi** per typ strony (home/kategoria/produkt/producent/blog) + ręczne nadpisanie.
- Moduły **Blog** (kategorie, archiwum, meta per wpis) i **Aktualności**.
- Feed **Google Merchant Center** ("Towary i reklamy w Google") + free listings.

### Czego IdoSell NIE robi natywnie (dorobić ręcznie)
- `FAQPage`, `HowTo`, `Article`/`BlogPosting` z autorem (Person), pełny `Offer` (return/shipping). → wszystko wstrzykujemy jako JSON-LD.

### JAK wdrożyć bez dewelopera — moduł "Dodatki HTML i JavaScript" (kluczowe)
> To jest odpowiedź na "nie ma kodu". IdoSell ma panelowy moduł **Sklep → Dodatki HTML/JS**:
- Typy: **HTML** (z `<script>`/`<style>`/`<div>`), **JavaScript**, **CGI**.
- Miejsce wstawienia: początek `<head>`, początek/koniec `<body>`.
- **Targetowanie per podstrona:** wszystkie / predefiniowane (karta produktu, koszyk, wyszukiwarka) / **własne URL** (np. tylko `/pl/menu/...` = kategorie). Plus targetowanie po urządzeniu i audytorium.
- Grupowanie w kampanie + eksport/import.
- → tędy wstrzykujemy **FAQPage, HowTo, Article, rozszerzony Offer, llms-bootstrap, widżety DOM** bez ruszania szablonu.

### 5 warstw iniekcji (podsumowanie)
1. **Moduł Dodatki HTML/JS** (panel) — JSON-LD + widżety per URL. ⭐ główny lewar
2. **GTM `GTM-KMGVCWN`** (już jest) — JSON-LD/widżety/eventy jako alternatywa/uzupełnienie
3. **Pole "Opis" kategorii/produktu** (WYSIWYG) — `<table>`, `<details>` accordion, listy, H2/H3 (JSON-LD lepiej przez moduł, bo WYSIWYG może sanityzować `<script>`)
4. **Strony CMS / Treści** — pełny HTML → landingi, B2B, mapa, słownik
5. **Panel SEO/Pozycjonowanie** (ADMIN) — robots, sitemap, 301, meta-schematy

**Wniosek:** ~70-80% pracy GEO/SEO robimy z panelu, bez dewelopera. Deweloper tylko do: schema server-side na stałe w `<head>`, sekcji "polecane" z bazy zamiast kobisc.pl, paginacji, struktury URL.

### Ograniczenia IdoSell (pod SEO)
Sztywna struktura URL · duplicate content z filtrów/paginacji · warianty konkurują z kartą główną · ryzyko podwójnego H1 · masowa edycja meta wymaga API · .htaccess niedostępny · opisy z hurtowni = duplikacja (śmiertelne dla mebli).

---

## CZĘŚĆ III — CZYM JEST GEO I CO SIĘ "ROBI" (mechanizmy)

| Mechanizm | Co znaczy | Efekt |
|---|---|---|
| Query fan-out | AI rozbija pytanie na 5-10 sub-pytań — strona musi je pokrywać | wejście do odpowiedzi |
| Answer-first | 1. zdanie sekcji = zwięzła odpowiedź z liczbami | +20-30% cytowań |
| FAQPage schema | realne pytania jako Q&A | +58,9% szansy cytowania |
| Tabele HTML | porównania/rozmiary jako `<table>` | +47% cytowań |
| Konkrety + jednostki | "materac 7 cm, wiek 3-9 lat" zamiast "wygodny" | +20-30% |
| Wektor kontekstowy | Title→Meta→H1 spójne, bez dryfu | +25-30% |
| Chunking | akapity 2-4 zdania, każde samodzielne | wyższa ekstrahowalność |
| Cost of Retrieval | tania ekstrakcja faktu (struktura, listy, boldy, density) | wyższy wybór |
| Schema = grounding | JSON-LD potwierdza encje, obniża niepewność modelu | szybszy grounding |
| E-E-A-T / proweniencja | autor Person + sameAs + daty + źródła | sygnał zaufania |
| Entity hubs | about/mentions/hasPart + hub & spoke | topical authority |
| llms.txt | mapa stron dla botów AI | ułatwia nawigację AI |

---

## CZĘŚĆ IV — KONKURENCJA (live)

| Konkurent | Kod/schema | Autorytet / off-site |
|---|---|---|
| **clickbed.pl** (najdojrzalszy) | Organization+Product+BreadcrumbList+WebSite | **autorzy z imienia i nazwiska**, gwarancja 10 lat, **konfigurator**, galeria realizacji, storytelling |
| **meblik.pl** | SPA (schema w JS) | **7 lat gwarancji, fabryka, TÜV, normy UE, bezpłatny "Projekt pokoju", strona /faq**, 4,6/5 |
| **interbeds.pl** | brak JSON-LD w widoku home | **ceny w title**, **TÜV**, producent z adresem, 4,9 |
| **kocotkids.com** | brak JSON-LD, blog edytorski | producent (rywal z grafiką), 2 lata; brak autorów/FAQ/konfiguratora |
| **KOBI** | **najmocniejszy schema produktu w stawce** (AggregateRating+Review) | producent, 24 mc; **brak FAQPage/HowTo/autorów/projektu pokoju/atestów w treści/cen w title** |

**Sygnały:** `dziecirosna.pl` → 301 na `babyboom.pl` (silne domeny parentingowe wchłaniają nisze → obecność w ekosystemie parentingowym = realny kanał). **Nikt w niszy nie ma llms.txt** = first-mover.

---

## CZĘŚĆ V — KOMPLETNA LISTA PUNKTÓW (211)

### A. Obecna strona (IdoSell): on-page/struktura/konwersja
1. Opisy reszty katalogu sprzedażowo + answer-first
2. Bloki opisowe 60-110 słów na górze każdej kategorii
3. Konsolidacja zdublowanych kategorii (komody 157/649/179, regały 159/177/252/253, toaletki 577-580, szafki nocne, krzesła obrotowe 268-270) + 301/canonical
4. Sekcje bestsellery/nowości/kolekcje z bazy meblekobi.pl zamiast kobisc.pl
5. rel="nofollow noopener" na linkach do kobisc.pl
6. Meta title/description pod CTR (kategorie + produkty flagowe) — przez schematy IdoSell
7. Wzmocnić H1 strony głównej ("Meble dziecięce i półkotapczany od producenta KOBI")
8. Internal linking model↔kolekcja (EMMA→DREAM różowy/szary, HELIOS→HELIOS szary)
9. Bloki "pasujące produkty" (łóżko→materac→barierka→szafka nocna) — cross-sell
10. Warianty na jednej karcie (VERTO 16 SKU, FLEXI, grafiki AUTO) zamiast osobnych stron
11. Paginacja: self-canonical + opis tylko na str. 1 + dynamiczny title ?page=N
12. Blokada indeksacji filtrów ?kolor=/?sort=/?cena=
13. noindex na wyszukiwarce wewnętrznej /pl/search.html
14. Tabele HTML (rozmiary, parametry, porównania)
15. Alt texty opisowe na zdjęciach
16. Prędkość: WebP, preload hero, lazy reszta (Core Web Vitals)
17. Strona 404 z linkami do top kategorii + wyszukiwarką
18. Spójność Title→Meta→H1 na każdym szablonie
19. HTML sitemap /mapa-strony/ + link w stopce
20. Ujednolicić NAP (nazwa/adres/telefon) strona = schema = GMB

### B. GEO on-page (cytowalność w AI)
21. Answer-first w każdym opisie
22. FAQ jako sekcja H3+P na top kategoriach (pytania = realne prompty)
23. FAQPage JSON-LD (przez moduł Dodatki HTML/JS lub w opisie)
24. HowTo schema montażu — nikt w niszy nie ma
25. hasMerchantReturnPolicy + OfferShippingDetails w Offer
26. Article z author(Person)+datePublished+dateModified na blogu
27. Organization.sameAs[] (FB, IG, Allegro, GMB, Wikidata)
28. Decyzja o ClaudeBot/anthropic-ai w robots (dziś blokada)
29. llms.txt w roocie — first-mover
30. Chunking — akapity 2-4 zdania
31. Density — przymiotniki → liczby z jednostkami
32. Tabele porównawcze (+47%)
33. Pokrycie query fan-out (sub-pytania)
34. Definicje jako DefinedTerm (półkotapczan, FLEX, Montessori, obrzeże PCV)
35. Miesięczny AI visibility test (10-15 zapytań niebrandowych)
36. Feed Google Merchant Center z pełnymi polami (GTIN, return, dostępność)

### C. Treści / blog — pillary (hub)
37. Jak wybrać łóżko dziecięce
38. Pokój dziecka od zera (wyprawka)
39. Pokój nastolatka
40. Mały pokój dziecka
41. Pokój ucznia
42. Montessori i samodzielność
43. Meble ogrodowe aluminiowe (NICEA)
44. Narożniki do salonu (HELIOS)

### C. Treści — poradniki (spoke)
45. Półkotapczan — przewodnik (4 wymiary VERTO)
46. Regał na zabawki (22 200/mc)
47. Szafa do pokoju dziecięcego/młodzieżowego (5 400 + 2 900/mc)
48. Biurko młodzieżowe — elektryczne/składane/z nadstawką (9 900/mc)
49. Łóżka z grafiką — motywy, czyszczenie, na ile lat
50. Łóżko Montessori — czy warto, od jakiego wieku (LEO)
51. Łóżko domek — drewno, bezpieczeństwo, aranżacja (DUBI)
52. Materac dla dziecka — pianka czy pianka+kokos, grubość
53. Barierka do łóżka — do jakiego wieku, montaż
54. Jak bezpiecznie przymocować meble do ściany
55. Półkotapczan — do jakiej ściany montować (beton/cegła vs karton-gips)
56. Biurko elektryczne dla ucznia — wysokość (FLEXI)
57. Meble ogrodowe aluminiowe — pielęgnacja, zimowanie (NICEA)
58. Jak urządzić pokój dla rodzeństwa
59. Kolory w pokoju dziecka — dekory na lata
60. Narożnik z funkcją spania do salonu (HELIOS)
61. Przedpokój z dzieckiem — szafka na buty z siedziskiem
62. Toaletka dla dziewczynki — od jakiego wieku

### C. Treści — wiekowe/przestrzenne
63. Łóżko dla dwulatka
64. Łóżko dla sześciolatka
65. Łóżko dla nastolatka (kiedy 190×90)
66. Pokój dziecka na poddaszu
67. Pokój dziecka z wnęką (kiedy półkotapczan)
68. Pokój dziecka w bloku — 12 układów
69. Pokój 8 m² / 10 m² / 12 m²

### C. Treści — problemowe/decyzyjne
70. Łóżko 160×80 czy 180×80
71. Półkotapczan czy klasyczne łóżko
72. Łóżko z szufladą czy bez
73. Komoda czy szafa do pokoju dziecka
74. Regał otwarty / zamknięty / z koszami
75. Najczęstsze błędy przy wyborze łóżka
76. Najczęstsze błędy przy wyborze biurka
77. Jak zmierzyć pokój przed zakupem
78. Jak przygotować dziecko do przejścia z łóżeczka na łóżko

### C. Treści — sezonowe
79. Wyprawka przed 1 września
80. Pokój pierwszoklasisty
81. Prezent dla dziecka na święta
82. Najlepsze łóżka dziecięce 2026 (odświeżane rocznie)

### C. Treści — pod AI / trust
83. Słownik mebli dziecięcych
84. FAQ: 50 pytań o łóżka dziecięce
85. FAQ: 30 pytań o półkotapczany
86. FAQ: 30 pytań o biurka dziecięce
87. Czym różni się producent od pośrednika
88. Meble do pokoju dziewczynki bez różowych stereotypów
89. Meble do pokoju chłopca bez motywów na jeden sezon

### C. Treści — lead magnety (PDF)
90. Checklist zakup łóżka online
91. Checklist pokój pierwszoklasisty
92. Plan pokoju do wydruku
93. Lista wymiarów przed zakupem półkotapczanu

### D. Nowe strony — landingi tematyczne (IdoSell CMS)
94. Półkotapczany VERTO (hub)
95. Łóżka z grafiką
96. Meble do małego pokoju
97. Wyprawka do pokoju dziecka
98. Pokój nastolatka
99. Bezpieczeństwo mebli dziecięcych
100. O producencie KOBI
101. Łóżko domek Montessori
102. Biurko FLEXI elektryczne
103. Biurko ELISS z nadstawką
104. Biurko składane VERTO

### D. Nowe strony — wiekowe/wymiarowe/funkcjonalne
105. Łóżko dla przedszkolaka
106. Łóżko dla ucznia
107. Łóżko dziecięce 160×80 / 180×80 / 190×90 (indeksowalne filtry)
108. Łóżko z materacem (zestaw)
109. Łóżko z szufladą
110. Łóżko z barierką

### D. Nowe strony — huby przechowywania
111. Regały do pokoju dziecka
112. Skrzynie na zabawki
113. Komody i szafy dziecięce

### D. Narzędzia (Next.js / iframe — magnesy na linki + cytowalność)
114. Quiz "jakie łóżko dla mojego dziecka"
115. Konfigurator pokoju (metraż→łóżko+biurko+przechowywanie)
116. Kalkulator rozmiaru łóżka do wieku/wzrostu
117. Kalkulator "ile miejsca zostanie w pokoju"
118. Kalkulator wysokości biurka do wzrostu
119. Wizualizator dekoru (4 kolory)
120. Porównywarka serii łóżek (AUTO/EMMA/ERYK/LEO/DUBI)
121. Porównywarka biurek FLEXI/ELISS/VERTO

### D. Centra/biblioteki (posprzedaż + SEO + AI)
122. Centrum instrukcji montażu (PDF/HTML)
123. Biblioteka wymiarów (tabele)
124. Centrum opinii i realizacji
125. Galeria pokoi klientów (UGC)

### D. B2B / eksport
126. Współpraca hurtowa / dropshipping
127. Strefa architekta (pliki CAD/SketchUp/3D + wymiary)
128. Producent mebli dziecięcych Polska
129. Export furniture manufacturer Poland (EN)
130. Kinderzimmermöbel Hersteller Polen (DE)
131. Meble dla hotelu/pensjonatu/apartamentu
132. Meble dla dewelopera/PRS
133. KOBI na Targach Poznań 2026 (mikrostrona PR)

### D. Kampanijne (coroczna aktualizacja)
134. Powrót do szkoły
135. Prezent dla dziecka — łóżko z grafiką
136. Pokój dziecka bez remontu

### D. Satelity (ostrożnie)
137. pokojdziecka.pl — pełnowartościowy poradnik z jawnym właścicielem

### E. Nowe rzeczy / różnicowanie
138. Eksponowanie atestów (EN 716, atest higieniczny)
139. Wideo produktu + montażu (VideoObject + transkrypcja)
140. AR "zobacz łóżko w pokoju"
141. Recenzje ze zdjęciami (UGC) + rabat za opinię z foto
142. Profil doradcy/projektanta przy poradnikach (E-E-A-T)
143. Usługa "darmowy projekt 2D pokoju"
144. "Paszport produktu" PDF + karty jakości serii
145. Sekcja "dla kogo NIE jest ten produkt"
146. Pakiety z jednym CTA ("pokój ucznia", "mały pokój")
147. "Dobierz materac do łóżka" w koszyku
148. Program "drugie dziecko" + lojalność rodzinna
149. E-mail 6 mc po zakupie: prośba o zdjęcie realizacji + opinię
150. Współpraca z fizjoterapeutą dziecięcym (ergonomia FLEXI)
151. Współpraca z architektem wnętrz (małe pokoje)
152. "KOBI Academy" — wideo-poradniki
153. Format "1 pokój, 3 układy"
154. Live shopping / prezentacje YouTube/FB
155. Wideo testu otwierania półkotapczana VERTO
156. Tryb zakupowy "mam pokój X m²"
157. "Zamów próbkę dekoru"
158. "Zarezerwuj konsultację telefoniczną" przy zestawach
159. Strona "części zamienne i akcesoria"

### F. Off-site / skalowanie (klasyczne)
160. Allegro / marketplace jako drugi kanał
161. Google Merchant Center + Shopping/PMax
162. Link building: PR parentingowy/wnętrzarski
163. Influencerzy parentingowi
164. Google Business Profile + lokalne frazy (Stalowa Wola)
165. E-mail marketing (newsletter sezonowy)
166. Social proof IG/FB z realizacji
167. Ceneo + porównywarki z pełnym feedem
168. Współprace z blogerami wnętrzarskimi
169. Brand monitoring (Mention/Google Alerts)
170. Pinterest (wizualna nisza)

### G. OFF-SITE GEO — wzmianki bez linków, encja (rdzeń 2026)
> Dane: branded mentions korelacja ~0,66 z AI Overviews · ~95% cytowań AI ze źródeł niepłatnych · Reddit/Quora ~4× częściej cytowane · syndykacja +239% · 83% cytowań spoza TOP10.

171. Wpis w Wikidata (KOBI = furniture manufacturer)
172. Google Business Profile — spójny NAP + posty
173. Katalogi firm (Panorama Firm, Aleo, GoWork, branżowe)
174. Organization.sameAs[] (FB/IG/YT/LinkedIn/Allegro/Ceneo/GMB)
175. Spójny brand + asocjacja "polski producent łóżek dziecięcych z grafiką"
176. Reddit (r/Polska, r/dzieci, r/wnetrza) — naturalne wzmianki
177. Quora PL — eksperckie odpowiedzi
178. forum.babyboom.pl + forum.canpolbabies.com
179. Grupy FB ("Mamy urządzają pokoje dzieci")
180. Rankingi: senpo.pl/chybasnisz, zaczarowanasypialnia.pl/rankingi, salonsnu.pl
181. Portale wnętrzarskie: Homebook, Domodi, Deccoria, urzadzamy.pl, Allani
182. Agregatory: Ceneo, Favi.pl, Domodi, Allegro
183. YouTube (montaż/realizacje, transkrypcje cytowane)
184. Prasa branżowa: biznes.meble.pl
185. Raport z danymi ("Jak Polacy urządzają pokoje dzieci 2026" — ankieta 500 rodziców)
186. Syndykacja materiału na kilka serwisów (+239%)
187. Treści "X vs Y" (łóżko domek vs klasyczne)
188. Influencerzy — recenzje z nazwą modelu
189. Opinie Google/Allegro/Ceneo z atrybutami produktu
190. Case studies realizacji pokoi + cross-post
191. Monitoring cytowań AI: Profound / Otterly.ai / Peec AI / LLMrefs

### H. Jak wdrożyć na IdoSell bez kodu
192. Moduł "Dodatki HTML i JavaScript" (panel) — JSON-LD/widżety per URL ⭐
193. GTM GTM-KMGVCWN (już jest) — JSON-LD/widżety/eventy
194. Pole "Opis" kategorii/produktu — HTML + table + details
195. Strony CMS / Treści — pełny HTML → landingi, B2B, mapa
196. Panel SEO/Pozycjonowanie (ADMIN) — robots, sitemap, 301, meta-schematy

### I. Kiedy "nowa strona" ma sens
197. PRZECIW teraz: IdoSell działa/sprzedaje, migracja = ryzyko + koszt kilkudziesięciu tys. zł
198. 90% GEO da się na IdoSell (treść/FAQ/meta/blog + Dodatki HTML/GTM)
199. ZA gdy: twardy limit IdoSell blokuje wzrost (brak kontroli head/schema/szybkości)
200. ZA gdy: Core Web Vitals nie do dociągnięcia w szablonie
201. ZA gdy: potrzeba własnych narzędzi (konfigurator/AR), których CMS nie udźwignie
202. ZA gdy: skala (B2B + eksport EN/DE + blog) przerasta architekturę sklepu
203. Ścieżka pośrednia: narzędzia jako osobny front (Next.js) w subdomenie/iframe, reszta na IdoSell
204. Konkluzja: najpierw wycisnąć obecną (3-6 mc), zmierzyć, potem migracja z policzonym ROI

### J. Argumenty na rozmowę z Dyrektorem
205. "Strona zdrowsza niż myśleliśmy" — komplet danych strukturalnych lepszy niż konkurencja
206. "Ruszamy bez przebudowy i dewelopera" — Dodatki HTML/JS + GTM = 70% pod GEO od ręki
207. "GEO = przewaga, której konkurencja nie ma" — nikt nie ma llms.txt/FAQPage/HowTo
208. "Najmocniejsza dźwignia jest poza stroną" — wzmianki + community + raport z danymi
209. "Konkurencja wygrywa zaufaniem (TÜV, lata, projekt pokoju) — dogonimy"
210. Pytanie o dostępy — co sami (panel/GTM), co przez ich dewelopera
211. Pomiar = ROI — Profound/Otterly + miesięczny raport pozycji i cytowań

---

## CZĘŚĆ VI — ROADMAP (fazy)
- **Faza 0 (1 tydz, ADMIN):** robots (ClaudeBot + filtry), sitemap w GSC, GA4 Enhanced E-commerce.
- **Faza 1 (2-4 tyg, TY):** answer-first + FAQ+FAQPage + meta na 10 top kategoriach i produktach flagowych.
- **Faza 2 (ciągłe, TY):** 5 art. czerwiec + pillar "jak wybrać"; daty/autorzy na blogu; internal linking.
- **Faza 3 (1-2 tyg, DEV):** return/shipping w Offer, HowTo, Article, sameAs; walidacja GSC.
- **Faza 4 (projekt):** konsolidacja kategorii + 301, sekcje z bazy zamiast kobisc.pl, paginacja, URL.
- **Faza 5 (ciągłe):** off-site GEO (Wikidata/GMB/community/PR), atesty, "O producencie", llms.txt, monitoring cytowań.

## CZĘŚĆ VII — KPI (pod GEO)
Cytowalność w AI (sample 10-15 zapytań niebrandowych) · pokrycie sub-pytań · GSC Rich Results 0 błędów · ruch niebrandowy z intencją zakupową · CTR Rich Results · liczba opinii/AggregateRating · topical authority coverage.

## CZĘŚĆ VIII — DECYZJE/PYTANIA DO KLIENTA
Zakres (kierunki A-E) · tempo (np. 15-20 opisów + 6 art/mc) · priorytet rodzin · dostępy ADMIN/DEV · polityka botów AI (ClaudeBot) · atesty + autor bloga · nofollow kobisc.pl · forma współpracy (abonament/projekt).

---

## Pliki powiązane
- `rozmowa-dyrektor-2026-05-28.md` — brief biznesowy + sekcja 7 (5 kierunków)
- `geo-konkurencja-idosell-2026-05-29.md` — analiza techniczna (sekcje 9-12: IdoSell, off-site, konkurencja)
- `pomysly-kierunki-rozwoj-2026-05-29.md` — bank pomysłów + aneks Codex
- `sciaga-rozmowa-A4.md` — ściąga na spotkanie
- `.docx` wszystkich powyższych w `docs/rozmowa/`

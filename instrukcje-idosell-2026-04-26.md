# Instrukcja wdrożenia 32 zadań SEO w IdoSell — meblekobi.pl

Data: 2026-04-26
Źródło: `Zadania_SEO_meblekobi (1).xlsx`

## Legenda dostępności

- ✅ **TY** — zrobisz sam w panelu IdoSell (zwykły dostęp do edycji kategorii/produktów/treści)
- ⚠️ **ADMIN** — wymaga uprawnień administratora sklepu IdoSell (sekcje SEO, robots.txt, sitemap, przekierowania, ustawienia globalne)
- 🔧 **DEV** — wymaga edytora szablonu RWD lub dewelopera IdoSell (kod HTML/CSS/JS)

> Nazwy menu w IdoSell zmieniają się przy aktualizacjach panelu. Jeżeli ścieżki nie pasują 1:1, używaj wyszukiwarki w panelu (zwykle Ctrl+/ albo lupka w lewym górnym rogu) i szukaj po nazwie podanej **pogrubieniem** w każdym kroku.

---

## FAZA 1 — KRYTYCZNE (zrobić w pierwszej kolejności)

### #1 + #19 ⚠️ ADMIN — Sitemap.xml + wpis w robots.txt
**Po co:** Google nie wie o twoich produktach.

1. Panel → **Administracja** → **Pozycjonowanie** (albo SEO) → **Mapa strony XML**
2. Włącz checkbox: *"Generuj mapę strony XML"* (jeśli wyłączona)
3. Zaznacz typy: **kategorie**, **produkty**, **strony bloga**, **strony CMS**
4. Zapisz. URL będzie pod `https://meblekobi.pl/sitemap.xml` (lub `/sitemaps/sitemap.xml`).
5. Sprawdź w przeglądarce, że plik się otwiera i zawiera URL-e.
6. W tym samym dziale **Pozycjonowanie** → **Plik robots.txt** → dopisz na końcu:
   ```
   Sitemap: https://meblekobi.pl/sitemap.xml
   ```
7. **GSC** (Google Search Console): Indeksowanie → Mapy witryn → wklej `https://meblekobi.pl/sitemap.xml` → Prześlij.

**Jak nie masz uprawnień:** napisz do admina (szablon maila na końcu pliku).

---

### #2 ⚠️ ADMIN / 🔧 DEV — Tag canonical na zduplikowanych kategoriach
**Po co:** 3 równoległe drzewa kategorii (MEBLE / POMIESZCZENIA / KIDS) generują duplicate content.

W IdoSell w **nowym szablonie RWD** canonical jest natywnie. W **starym szablonie** trzeba dorzucić ręcznie.

1. Sprawdź, jaki masz szablon: panel → **Wygląd sklepu** → **Wybór szablonu**.
   - **RWD (responsywny)** — canonical działa, sprawdź źródło strony (Ctrl+U) na losowej kategorii czy jest `<link rel="canonical">`.
   - **Stary "Skin"/CSS** — nie ma canonical, trzeba 🔧 DEV.
2. Dla **zduplikowanych** kategorii (lista w #3): w edycji każdej kategorii **NIE-głównej** ustaw:
   - panel → **Sklep** → **Towary** → **Kategorie** → wybierz kategorię → zakładka **Pozycjonowanie / SEO**
   - pole **"Adres kanoniczny (canonical URL)"** lub **"Wskazanie strony kanonicznej"** → wpisz URL kategorii GŁÓWNEJ
3. Zapisz.

**Czego NIE robić:** nie ustawiaj canonical sam-na-siebie na każdej, jak nie wiesz która jest główna — wybierz najpierw jedną i tylko duplikaty wskazują na nią (zob. #3).

---

### #3 ⚠️ ADMIN — Konsolidacja zduplikowanych kategorii
**Po co:** 5 grup duplikatów rozbija PageRank.

Lista duplikatów z arkusza (ID kategorii):
- **Komody:** 157, 649, 179 → wybierz jedną główną (zwykle najdłuższy URL z najwięcej produktów)
- **Szafki nocne:** 160 + 2 inne → jedna główna
- **Regały:** 159, 177, 252, 253
- **Krzesła obrotowe:** 268, 269, 270
- **Toaletki:** 577, 578, 579, 580

Dla każdej grupy:
1. **Sklep** → **Towary** → **Kategorie** → zlicz produkty per ID. Najwięcej = kandydat na główną.
2. Zweryfikuj w GSC która ma najwięcej impresji (Wyniki wyszukiwania → filtr URL).
3. Wybrana = **główna** (zostaje).
4. Pozostałe (duplikaty) — **dwie opcje**:
   - **Lepsza:** Edycja kategorii → **Status: nieaktywna** + **Przekierowanie 301** na URL głównej. Pole zwykle: *"Adres do przekierowania (301)"* lub w **Administracja** → **Pozycjonowanie** → **Przekierowania URL** → Dodaj nowe → stara URL → nowa URL → typ **301**.
   - **Tymczasowa:** zostaw aktywną, ustaw canonical na główną (jak w #2). Stosuj tylko jak nie da się przekierować bo coś tam linkuje fizycznie.

**Lista ID do potwierdzenia z klientem PRZED wdrożeniem** (żeby nie wyłączyć kategorii która sprzedaje).

---

### #4 ⚠️ ADMIN — Kanibalizacja "szafki nocne"
Konkret: 3 URL-e dla tej samej frazy:
- `/pl/menu/szafki-nocne-160.html` (stara struktura)
- `/sklep/sypialnia/szafki-nocne.html` (nowa)
- `/sklep/pokoj-dziecka/szafki-nocne-dzieci.html` (sub-niche, OK ale potrzebuje frazy)

**Co zrobić:**
1. **Główna** = `/sklep/sypialnia/szafki-nocne.html` (nowa struktura, najszersza fraza).
2. Stary URL `/pl/menu/szafki-nocne-160.html` → **301** na główną (Administracja → Przekierowania).
3. `/sklep/pokoj-dziecka/szafki-nocne-dzieci.html` zostaw, ale **przemianuj H1 + meta title** na "Szafki nocne dziecięce" (długi ogon) i w opisie kategorii dodaj link do głównej kategorii sypialnianej. Nie konkurujcie sami ze sobą.

To samo schemat dla każdej grupy z #3.

---

### #5 ✅ TY — Meta title i meta description dla wszystkich podstron
**Po co:** Google sam zgaduje tytuły = niska klikalność.

#### 5a. Strona główna ⚠️ ADMIN
panel → **Administracja** → **Sklep** → **Konfiguracja** → **SEO/Meta tagi strony głównej**.

**Wzór title (do 60 znaków):**
`Meble KOBI — łóżka, półkotapczany, meble dziecięce | Producent`

**Wzór description (do 155 znaków):**
`Polski producent mebli KOBI. Łóżka, półkotapczany, biurka, meble dziecięce. Wysyłka 3-5 dni roboczych. Sprawdź ofertę bezpośrednio od producenta.`

#### 5b. Kategorie ✅ TY
Dla każdej kategorii: **Sklep** → **Towary** → **Kategorie** → edycja → **Pozycjonowanie / SEO**:
- **Tytuł meta (title):** wzór `[Kategoria] — szeroki wybór modeli | KOBI`
  - przykład: `Półkotapczany — łóżka składane do szafy | KOBI`
- **Opis meta (description):** 140-155 znaków, z CTA, frazą i USP (producent / wysyłka).
  - przykład: `Półkotapczany VERTO w 4 wymiarach i 4 kolorach. Łóżka składane do ściany, oszczędzające miejsce. Producent KOBI. Sprawdź modele.`
- **Słowa kluczowe meta:** zostaw puste (Google ignoruje od 2009).

> Mam już opisy dla 4 kategorii w `teksty/kategorie/2026-04-20/` — wyciągnę z nich title+desc do gotowych snippetów (zob. plik `meta-tagi-do-wklejenia-2026-04-26.md` po wygenerowaniu).

#### 5c. Produkty ✅ TY
**Sklep** → **Towary** → **Lista towarów** → wybierz produkt → zakładka **Pozycjonowanie**:
- **Tytuł meta:** `[Nazwa modelu] — [USP w 2-3 słowach] | KOBI`
- **Opis meta:** 140-155 znaków, CTA + parametr który odróżnia.

> Mam już dla 10 produktów (iteracja 2). Wyciągnę.

#### 5d. Blog (jak będzie)
Każdy wpis ma własne pola SEO przy edycji.

---

## FAZA 2 — WYSOKI PRIORYTET

### #6 🔧 DEV — Ujednolicenie struktury URL
**Status:** projekt deweloperski. NIE rób sam, NIE bez planu 301 dla wszystkich starych URL.

**Twoja rola:** spisz wszystkie obecne wzorce URL (zrób crawl Screaming Frog albo poproś dewelopera o eksport z bazy). Bez listy 301 nie ruszać. Eskalacja do dewelopera IdoSell — koszt rzędu kilku tysięcy zł, prace 2-4 tygodnie.

---

### #7 ⚠️ ADMIN / 🔧 DEV — Uproszczenie menu głównego
1. Panel → **Wygląd sklepu** → **Edytor menu** (albo **Treści** → **Menu**)
2. Usuń duplikujące się gałęzie. Cel: max 2 poziomy.
3. Linki **KOLEKCJE** i **B2B** prowadzące na `kobisc.pl` — **NIE usuwaj** (klient ich potrzebuje), tylko dodaj `rel="nofollow"` (zob. #11).

Jeśli edytor menu jest ograniczony (typowe dla "Skin"/CSS) — eskalacja do dewelopera szablonu.

---

### #8 ⚠️ ADMIN — Blokada indeksacji stron systemowych
**Po co:** /pl/shoppinglist, /client-new.php nie powinny być w Google.

Panel → **Administracja** → **Pozycjonowanie** → **Plik robots.txt** → dopisz:
```
User-agent: *
Disallow: /pl/shoppinglist
Disallow: /client-new.php
Disallow: /pl/products-bought.html
Disallow: /pl/clientorder.php
Disallow: /pl/cart
Disallow: /pl/order
Disallow: /pl/login
Disallow: /pl/register
Disallow: /pl/comparison
Disallow: /pl/contact-form

Sitemap: https://meblekobi.pl/sitemap.xml
```

> Uwaga: nie blokuj `/pl/products/` ani `/sklep/` — to TWOJE produkty, mają być indeksowane.

---

### #9 ⚠️ ADMIN / 🔧 DEV — Sekcje BESTSELLERY / NOWOŚCI / KOLEKCJE na meblekobi.pl
**Po co:** dziś linkują do `kobisc.pl` = wyciek PageRank.

1. Panel → **Wygląd sklepu** → **Strona główna** → **Edytor sekcji** (lub w starym szablonie: **Treści** → **Strona główna**).
2. Każdy moduł "Bestsellery / Nowości / Kolekcje" — sprawdź konfigurację: czy linki są na produkty z meblekobi.pl, czy widget zewnętrzny do kobisc.
3. Jeśli widget zewnętrzny — zamień na **moduł IdoSell "Polecane towary"** lub **"Kategoria z polecanymi"** (te ciągną z bazy meblekobi.pl).
4. Karuzela kategorii — to samo: tylko kategorie z meblekobi.pl.

Ten punkt zwykle wymaga dewelopera szablonu, jeśli sekcje były robione na zamówienie.

---

### #10 ⚠️ ADMIN (włączenie) + ✅ TY (treść) — Blog
1. Panel → **Marketing** → **Blog** (jeśli nie ma — Administracja → Konfiguracja → włącz moduł "Blog").
2. **Adres URL:** ustaw `/blog/` (jak nie ma takiego pola — eskalacja do dewelopera).
3. Skonfiguruj **kategorie bloga**: Aranżacje, Poradniki zakupowe, Trendy, Materiały (sprawdzony zestaw dla mebli).
4. **Pisanie artykułów** — zrobimy w narzędziu w projekcie (skill `pl-blog-wp-writer` adaptowany do IdoSell HTML editor) i wklejamy w panel po jednym.

**Plan publikacji:** 4 art./mies. przez pierwsze 3 mies. (12 artykułów do wybudowania klastra). Tematy w `strategia/content-plan.md` (jest stub, wypełnimy po wgraniu iteracji 2).

---

### #11 ✅ TY (w opisach) / 🔧 DEV (w menu/szablonie) — `rel="nofollow"` na linkach do kobisc.pl
**W opisach kategorii i produktów** (gdzie wstawiasz HTML linki):
- Edytor wizualny → przełącz na **HTML/Źródło** → znajdź `<a href="https://kobisc.pl/...">` → dopisz `rel="nofollow noopener"`:
  ```html
  <a href="https://kobisc.pl/..." rel="nofollow noopener" target="_blank">tekst</a>
  ```

**W menu / banerach / footerze** — te linki idą z szablonu, nie da się sam, eskalacja do dewelopera.

> W moim przepisanym contentcie iteracji 2 nie ma linków do kobisc — bezpieczne. Stary content z iteracji 1 i wcześniejszy może zawierać.

---

### #12 🔧 DEV — Paginacja: rel=next/prev + canonical + SEO text tylko na str. 1
Edycja szablonu, nie zrobisz w panelu. Brief dla dewelopera:
- W `<head>` stron paginacji: `<link rel="next" href="...?page=N+1">`, `<link rel="prev" href="...?page=N-1">`.
- `<link rel="canonical">` self-canonical na każdej stronie paginacji (NIE na stronie 1 dla pozostałych).
- Opis SEO kategorii (HTML z editora opisu) wyświetlać warunkowo: tylko gdy `page == 1`.

---

### #13 ⚠️ ADMIN — Blokada indeksacji filtrów (`?kolor=`, `?sort=` itd.)
1. Panel → **Administracja** → **Pozycjonowanie** → **Parametry URL** (jeśli jest taka sekcja).
2. Dla każdego parametru filtra: oznacz **"Nie indeksuj URL z tym parametrem"** (lub `noindex,follow`).
3. **Plan B (uniwersalny):** dopisz w robots.txt:
   ```
   Disallow: /*?filter_*
   Disallow: /*?kolor=*
   Disallow: /*?cena=*
   Disallow: /*?sort=*
   Disallow: /*?material=*
   ```
   ⚠️ NIE używaj prostego `Disallow: /*?*` — możesz zablokować podstawowe URL-e systemu IdoSell z parametrami zapytań typu `?lang=pl`.
4. **Wektor weryfikacji:** otwórz dowolną kategorię, kliknij filtry, skopiuj URL → wklej do crawlera.

---

### #14 ⚠️ ADMIN — HTML Sitemap
Panel → **Treści CMS** → **Strony statyczne** → **Dodaj nową** → tytuł "Mapa strony" → URL `/mapa-strony/`.

Treść: lista wszystkich kategorii produktowych z linkami. **NIE wpisuj ręcznie** — IdoSell często ma widget `[KATEGORIE_LISTA]` lub podobny do osadzenia w treści CMS. Jeśli nie ma — eksport listy kategorii z panelu, wkleić HTML jako `<ul><li><a>...`.

Dodaj link do tej strony w **stopce** (Wygląd → Stopka → Edytor).

---

### #15 🔧 DEV (głównie) / ✅ TY (FAQ częściowo) — Schema AggregateRating + FAQ
**AggregateRating** (gwiazdki w Google) — wymaga JSON-LD wstrzykniętego per produkt z faktycznymi ocenami z bazy. To **dewelopera IdoSell** (snippet w szablonie produktu).

**FAQ schema na kategoriach** — możesz sam:
1. Edycja kategorii → **Opis** (HTML/Źródło)
2. Wklej na końcu opisu blok `<script type="application/ld+json">` z FAQ:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       {
         "@type": "Question",
         "name": "PYTANIE 1?",
         "acceptedAnswer": {"@type": "Answer", "text": "ODPOWIEDŹ 1."}
       }
     ]
   }
   </script>
   ```
3. **Tekst pytań i odpowiedzi MUSI być widoczny na stronie** (Google wyrzuca FAQ schema bez widocznej treści) — czyli FAQ musi być też w opisie HTML jako sekcja `<h3>` + `<p>`.

> Mam już FAQ dla 4 kategorii w `teksty/kategorie/2026-04-20/`. Wygeneruję gotowy JSON-LD do wklejenia (osobny plik na życzenie).

---

## FAZA 3 — ŚREDNI PRIORYTET

### #16 ⚠️ ADMIN + ✅ TY — Nowe kategorie pod frazy long-tail
- "Łóżka piętrowe" — sprawdź czy są takie produkty, jeśli tak: utwórz kategorię (Sklep → Towary → Kategorie → Dodaj)
- "Meble do pokoju nastolatka" — może być **subkategoria** w "Pokój dziecka"
- "Meble skandynawskie" — jeśli są produkty w stylu, **filtr** (atrybut "Styl") lub kategoria
- Przemianuj "Meble smart" → "Meble multifunkcyjne" (frazowane wyszukiwanie)

Research fraz: Senuto/Ahrefs (#27).

---

### #17 🔧 DEV — Podwójny H1 na stronie głównej
Stary szablon ma 2x `<h1>`. Naprawia deweloper. Brief:
- Pierwszy H1 ("Polski producent mebli") zostaje — to jest fraza brand+kategoria
- Drugi H1 ("Jeśli coś ma Ci służyć codziennie...") zamienić na `<p class="hero-tagline">` lub `<h2>`.

---

### #18 ✅ TY — Unikalne opisy kategorii
Mam już 4 napisane (`teksty/kategorie/2026-04-20/`). **Dla każdej z 30+ pozostałych:**
1. Mów do mnie "napisz opis kategorii X" — generuję w `pl-copywriter-ecommerce`.
2. Plik .md → ja → ty wklejasz w **Sklep → Kategorie → edycja → Opis** (HTML).
3. Min 250 słów, FAQ 3-5 pytań, H2-H3, link wewnętrzny do 2-3 powiązanych kategorii.

---

### #20 ⚠️ ADMIN / 🔧 DEV — Dynamiczny title na paginacji
Sprawdź sam: otwórz `meblekobi.pl/sklep/komody/?page=2` → Ctrl+U → szukaj `<title>`. Jeśli identyczny jak strona 1 = problem, eskalacja do dewelopera.

Snippet dla dewelopera szablonu RWD (zwykle plik `head.html`):
```html
<title>{$category.name}{if $page > 1} — Strona {$page}{/if} | KOBI</title>
```

---

### #21 🔧 DEV — Mixed content `baseurl=http://`
W kodzie JS szablonu zmienić na `https://`. Zwykły deweloper szablonu, 5 minut roboty.

---

### #22 🔧 DEV — `noindex` na wynikach wyszukiwarki wewnętrznej
URL-e `/pl/search.html?text=...` powinny mieć `<meta name="robots" content="noindex,follow">`.

**Plan B (✅ TY):** dopisz do robots.txt:
```
Disallow: /pl/search.html
```
Działa, ale `noindex` w meta jest formalnie poprawniejszy (Google może już mieć zaindeksowane URL-e — `Disallow` ich nie usunie z indeksu, a `noindex` tak).

---

### #23 ⚠️ ADMIN / 🔧 DEV — Optymalizacja grafik (WEBP)
Panel → **Administracja** → **Multimedia** → **Konfiguracja zdjęć** — zaznacz konwersję do **WEBP** (jest natywnie w IdoSell od kilku lat). Sprawdź też wagę — IdoSell ma kompresję, może być wyłączona.

Banery na stronie głównej często wgrane ręcznie jako JPG → konwertuj przed wgraniem (Squoosh.app — drag&drop, eksport WEBP, 80% jakości, max 100KB).

---

### #24 + #25 ⚠️ ADMIN / 🔧 DEV — Lighthouse + Core Web Vitals
**Sam:**
1. https://pagespeed.web.dev/ → wpisz `meblekobi.pl` → poczekaj.
2. Zapisz wyniki: LCP, INP, CLS, score Performance.
3. Daj mi screen / wyniki — przygotuję brief dla dewelopera (priorytetyzowana lista naprawy).

Cele:
- LCP < 2.5s (najczęściej: preload obrazu hero, lazy-load reszty)
- INP < 200ms (zwykle: ograniczyć JS, defer dla widgetów)
- CLS < 0.1 (rezerwować miejsce dla karuzeli i obrazów: `width`/`height` atrybuty)

---

## FAZA 4 — NISKI PRIORYTET / WERYFIKACJE

### #26 ⚠️ ADMIN — Monitoring (UptimeRobot, Hotjar, GA4, GSC)
- **UptimeRobot** (uptimerobot.com): konto darmowe → Add Monitor → URL `https://meblekobi.pl` → 5 min interval → email/SMS alerty.
- **Hotjar** (hotjar.com): konto → kod tracking → wkleić w panelu IdoSell: **Administracja** → **Konfiguracja** → **Skrypty śledzące / Custom HTML** → wklej przed `</body>`.
- **GA4**: zweryfikuj czy jest podpięty (panel → Marketing → Integracje → Google Analytics). Włącz **Enhanced E-commerce** (typowy switch w IdoSell, sam strzela eventy `purchase`, `add_to_cart`, `view_item`).
- **GSC**: search.google.com/search-console → Dodaj zasób → meblekobi.pl → weryfikacja przez DNS lub HTML tag (Administracja → SEO → kod weryfikacji).

---

### #27 ⚠️ ADMIN — Audyt widoczności Senuto/Ahrefs
Wymaga subskrypcji. Jak masz dostęp NETIM — prześlij mi eksport CSV widoczności i top 100 fraz. Wyciągnę insighty.

---

### #28 ⚠️ ADMIN — Weryfikacja indeksacji w GSC
Po dostępie:
1. GSC → Indeksowanie → **Strony**
2. **Zaindeksowane**: porównaj z liczbą URL w sitemap. Powinno być ~85-95% pokrycia.
3. **Niezaindeksowane**: przeglądnij grupy (np. "Strona zawiera tag noindex", "Duplikat — Google wybrał inną stronę kanoniczną", "Stronę zeskanowano, ale nie zaindeksowano"). Każda grupa ma inny scenariusz naprawy.

---

### #29 ⚠️ ADMIN / ✅ TY (Screaming Frog) — Crawler 3xx/4xx + orphan pages
1. **Screaming Frog SEO Spider** (screamingfrog.co.uk) — darmowy do 500 URL, płatny licencja roczna ~840 PLN.
2. New Crawl → `meblekobi.pl` → poczekaj na pełen crawl (kilka godzin dla dużego sklepu).
3. Raporty:
   - **Response Codes** → filtruj `3xx` (poprawić linki na docelowe), `4xx` (naprawić lub przekierować)
   - **Internal** → sortuj po `Inlinks` ASC → góra listy = orphan pages (strony bez linków przychodzących)
4. Eksport do CSV → daj mi → przygotuję plan akcji.

---

### #30 ✅ TY — Strona 404
1. Otwórz w przeglądarce np. `meblekobi.pl/pl/products/nie-istnieje-12345.html` → zobacz co się pokazuje.
2. Powinna mieć: link do strony głównej, wyszukiwarkę, polecane kategorie, friendly komunikat.
3. Edycja: panel → **Treści CMS** → **Strona błędu 404** (jeśli edytowalna; w niektórych szablonach to template fix → 🔧 DEV).

---

### #31 ✅ TY — Walidacja schema w Rich Results Test
Po wdrożeniu #15:
1. https://search.google.com/test/rich-results
2. Wklej URL strony głównej, kategorii, produktu → sprawdź czy schemy są wykrywane.
3. GSC → Wyniki z elementami rozszerzonymi → monitoruj raporty błędów.

---

### #32 ✅ TY — Ręczne testy mobilne
Chrome DevTools → F12 → ikona urządzenia (Ctrl+Shift+M) → wybierz iPhone/Android → przejdź:
- Strona główna (czy top-bar nie zasłania)
- Menu (hamburger otwiera się?)
- Kategoria + filtry (filtry klikalne?)
- Karta produktu → dodaj do koszyka
- Koszyk → przejdź do checkout → wypełnij formularz testowo (nie składaj zamówienia)

Co nie działa → screenshot → eskalacja 🔧 DEV.

---

## SZABLON E-MAILA DO ADMINA / DEWELOPERA

```
Temat: meblekobi.pl — pilne zadania SEO do wdrożenia w panelu / szablonie

Cześć,

Po audycie SEO meblekobi.pl mam listę 32 zadań. Część wykonam sam (opisy kategorii i produktów, FAQ, blog), ale w nast. zadaniach potrzebuję Twojej pomocy:

KRYTYCZNE (do końca tygodnia):
1. Włączenie sitemap.xml w panelu IdoSell + dopisanie wpisu Sitemap: w robots.txt + zgłoszenie w GSC
2. Konsolidacja zduplikowanych kategorii (lista ID poniżej) — wybór głównych + 301 dla pozostałych:
   - Komody: 157, 649, 179
   - Szafki nocne: 160 + 2 inne
   - Regały: 159, 177, 252, 253
   - Krzesła obrotowe: 268, 269, 270
   - Toaletki: 577, 578, 579, 580
3. Rozszerzenie robots.txt o blokady stron systemowych (gotowy plik wyślę)

WYSOKIE (do 2 tygodni):
4. Wdrożenie tagów canonical na duplikatach (jeśli stary szablon — edycja head)
5. Zmiana sekcji BESTSELLERY / NOWOŚCI / KOLEKCJE — żeby linkowały na meblekobi.pl, nie kobisc.pl
6. Włączenie modułu Blog z URL /blog/
7. Dodanie rel="nofollow noopener" na linkach do kobisc.pl w menu i banerach
8. Naprawa baseurl http:// w JS na https://

DEWELOPERSKIE (priorytet po krytycznych):
9. Ujednolicenie struktury URL (z /pl/menu/ na /sklep/) z planem 301 — projekt 2-4 tyg
10. Usunięcie podwójnego H1 na stronie głównej
11. rel=next/prev + canonical na paginacji + warunkowe wyświetlanie opisu kategorii (tylko strona 1)
12. JSON-LD AggregateRating na stronach produktów (z bazy ocen)

Pełna lista i instrukcje dostępu w pliku: instrukcje-idosell-2026-04-26.md

Pytanie o uprawnienia:
- Czy mogę dostać dostęp do edycji robots.txt i sitemap?
- Czy mogę dostać dostęp do edytora przekierowań URL (sekcja Pozycjonowanie)?
- Czy mogę dostać dostęp do Pozycjonowania → Meta tagi globalne?

Daj znać, co najszybciej możemy ruszyć.

Pozdr.
```

---

## CO ROBIMY DALEJ (ode mnie)

Po wgraniu tego pliku do projektu mogę dla ciebie wygenerować:
1. **Konkretne meta title + description** dla 4 kategorii i 10 produktów z iteracji 2 (gotowe do skopiowania do panelu IdoSell)
2. **JSON-LD FAQ schema** do wklejenia w opisy 4 kategorii (gotowy `<script>` blok)
3. **robots.txt — pełna zawartość** do skopiowania do panelu (wszystkie blokady + Sitemap:)
4. **Plan content bloga** — 12 tematów na 3 mies. + briefy dla każdego (na bazie już posiadanej `wiedza-biznesowa.md`)
5. **Lista konkretnych ID kategorii** do konsolidacji (po pobraniu eksportu z panelu lub crawlu)

Powiedz "zrób 1, 3, 4" itd. — wykonam pojedynczo.

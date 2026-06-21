# Kobi Meble — wiedza biznesowa (jedno źródło prawdy)

Plik jest źródłem prawdy dla każdej sesji pracy z klientem meblekobi.pl. Czytaj przed pisaniem każdego opisu. Aktualizuj przy każdej nowej uwadze klienta.

Ostatnia aktualizacja: 2026-04-20

---

## A. Zasady biznesowe (BŁĄD = utrata zaufania klienta)

### A1. KOBI sprzedaje też produkty firm zewnętrznych — NIE ujawniać

KOBI (meblekobi.pl) to producent ORAZ sklep. W sklepie są:
- **własne modele KOBI** (VERTO, NICEA, FLEXI, HELIOS, ELISS, AUTO, EMMA, ERYK, LEO Montessori, DUBI, MAX, FALA, LUK, Kareta) — z charakterystycznymi cechami: zaokrąglone krawędzie, obrzeże PCV, stelaż FLEX, 24-m-cy gwarancja
- **produkty obcych marek** (inne specyfikacje, inne gwarancje, brak zaokrągleń, itp.)

**KLIENT KOŃCOWY NIE MOŻE SIĘ O TYM DOWIEDZIEĆ.** Psuje to pozycjonowanie marki KOBI.

**Zabronione sformułowania:**
- "łóżka/biurka/meble KOBI mają [cecha]"
- "wszystkie łóżka dziecięce KOBI"
- "każdy model KOBI"
- "każde biurko KOBI" / "każde łóżko w KOBI"
- "nasze autorskie modele" / "nasze modele"
- "produkcji KOBI" / "łóżka produkcji KOBI"
- "Półkotapczany KOBI produkujemy"
- FAQ typu "Jak długo służy łóżko dziecięce KOBI?"

**Bezpieczne sformułowania:**
- "W modelach AUTO, EMMA, ERYK, LEO i DUBI krawędzie są zaokrąglone..."
- "Modele AUTO, EMMA, ERYK, LEO i DUBI budujemy z płyty 16/18 mm..."
- "Projektując modele [X, Y, Z] skupiamy się na..."
- "Seria VERTO produkuje się w czterech rozmiarach..."
- "Zamówione łóżko dostarczamy z 24-m-cy gwarancją producenta"
- "Każdy półkotapczan z serii VERTO" (OK — to jedna seria)
- "w kategorii [X]" / "w ofercie KOBI" (neutralne, o sklepie jako całości)

### A2. Merytoryka — weryfikacja strony PRZED pisaniem

Pełne aktualne opisy ze strony → `opisy-ze-strony-2026-04-20.md` (word-for-word z 10 kart produktowych). To baza do przepisywania.

Nigdy nie pisz z pamięci. Jeśli czegoś nie ma na karcie — nie zgaduj.

### A3. Uwagi klienta stosuj LITERALNIE

Klient (pani z KOBI) dodaje uwagi w Google Docs **na czerwono** (FF0000) w nawiasach. Formaty:
- `( dodajemy : [tekst] )` — dodaj dokładnie ten tekst
- `( usunąć - [powód] )` — usuń poprzedzający fragment
- `( proszę zmienić na to - [nowy tekst] )` — zastąp tym tekstem

Wszystkie czerwone uwagi → `raport-uwagi-klienta-2026-04-20.md` (wyekstrahowane z 14 docxów iteracji 1).

Żeby wyciągnąć czerwone uwagi: `node extract-red-notes.mjs` — pobiera binarnie .docx z Drive, parsuje XML, zapisuje raport.

### A4. W opisie produktu (pole `description` w IdoSell) NIE dawaj sekcji:

- ❌ "Wymiary produktu" (szerokość/głębokość/wysokość)
- ❌ "Specyfikacja" / "Tabela parametrów"
- ❌ "Wymiary paczek" / "Kod producenta"
- ❌ Ceny (są w polu cena)

To są osobne pola w IdoSell. Opis = **tylko tekst sprzedażowy + FAQ**.

### A5. Tryb "iteracja poprawek" — chirurgia punktowa

Gdy klient recenzuje tekst i daje uwagi — nakładaj TYLKO uwagi na istniejący tekst. Nie przepisuj od zera, chyba że klient wyraźnie prosi.

### A6. Bez dynamicznych liczb

Nie wpisuj: "412 modeli", "89 biurek", "40 produktów w kategorii". To się zmienia. Pisz "szeroka oferta", "różne konfiguracje".

---

## B. Konkretne reguły merytoryczne z uwag klienta (czerwone)

### B1. Konstrukcja łóżek dziecięcych (AUTO, EMMA, ERYK, LEO, DUBI)

| Element | Reguła |
|---------|--------|
| **Materiały korpusu** | Płyta meblowa **16 LUB 18 mm** albo **lite drewno** (sosna dla DUBI). **NIE ma łóżek ze stali** — klient wprost: "nie idźmy w tak mocny marketing, łóżka mamy z płyty meblowej 16 lub 18 oraz z drewna" |
| **Stelaż** | **"Stelaż z elastycznych listew brzozowych — system FLEX"**. NIE pisać "stelaż FLEX z listew" (klient: "system jest FLEX NIE LISTWY") |
| **Krawędzie** | Zaokrąglone, wykończone **obrzeżem PCV** (w AUTO dodatkowo gumowym, bez kleju) |
| **Barierka** | **Demontowalna, montaż lewo- lub prawostronny** |
| **Maksymalne obciążenie** | **110 kg** |
| **Materac** | Piankowy **7 cm**, pokrowiec zdejmowany na zamek. Upgrade: **pianka + kokos** (dopłata w [kategorii materacy](https://meblekobi.pl/pl/menu/materace-545.html)) |
| **Warianty z/bez materaca** | NIE każdy model ma materac w zestawie. Są warianty. NIE uogólniać. |
| **Szuflada / pojemnik** | Wybrać **jedno słowo** (klient: pleonazm). Preferowane: "szuflada". Opisywać "pod łóżkiem", NIE "pod materacem" (klient wprost w EMMA i ERYK). |
| **Uchwyty (EMMA)** | **Element dekoracyjny**, NIE konstrukcyjny (klient wprost poprawił) |
| **DUBI** | **NIE pisać "zapach żywicy"** (klient kazał usunąć). **NIE pisać "zaokrąglone krawędzie minimalizują ryzyko urazów"** (klient kazał usunąć — implikuje ryzyko w innych łóżkach). **NIE ma drewnianych półek** w ofercie (klient: "mamy półki z płyty meblowej") — nie linkować do drewnianych półek. |
| **AUTO** | NIE "w tym samym stylu" (klient: nie mamy mebli w tym samym stylu co łóżka AUTO). Można wspomnieć **materac pianka+kokos** jako upgrade. |

### B2. Półkotapczany seria VERTO

| Element | Reguła |
|---------|--------|
| **Wymiary** | **4 rozmiary spania** — 90×200, 120×200, 140×200, 160×200 cm |
| **Kolory (dekory)** | biały, kaszmir, szary, dąb artisan (4 kolory) |
| **Łącznie** | 16 wariantów w serii VERTO (4 × 4) |
| **Max grubość materaca** | **20 cm** (wszystkich 4 rozmiarów) |
| **Mechanizm** | Siłowniki gazowe + blokada mechaniczna |
| **Zaczepy ścienne** | W zestawie, **obowiązkowo montować do solidnej, nośnej ściany (betonowej lub ceglanej)** — NIE do płyt kartonowo-gipsowych. Treść FAQ wprost od klienta: *"Łóżko składane należy montować wyłącznie do solidnej, nośnej ściany (np. betonowej lub ceglanej) – ściany z płyt kartonowo-gipsowych nie są do tego odpowiednie. Nie wymaga dodatkowych wzmocnień, ale kluczowe jest zastosowanie właściwych mocowań i prawidłowy montaż zgodny z instrukcją."* |
| **Jedna osoba** | **Da radę** złożyć/rozłożyć — siłowniki wspomagają. NIE pisać "producent zaleca montaż z pomocą drugiej osoby" (klient kazał usunąć — nie na temat) |
| **Materac** | **NIE w zestawie** |

### B3. Biurka (FLEXI, VERTO, ELISS, BASIC, PUFFI, DYLAN)

| Element | Reguła |
|---------|--------|
| **Kategoria w sklepie** | Jedna ogólna "biurka" (`/pl/menu/biurka-176.html`). **NIE ma osobnej kategorii "biurka komputerowe"** — to słowo-klucz SEO (H1), w tekście odwołuj się do ogólnej kategorii biurek |
| **FLEXI** | Elektryczna regulacja **70-115 cm**, panel LED, pamięć 2 ustawień, system antykolizyjny. Rozmiary: 118, 120, 138, 140 cm. Dekory: czarny, dąb craft, dąb artisan |
| **VERTO (biurko)** | Składane chowane w szafkę. Blat 100×84 cm po rozłożeniu, głębokość 34 cm po złożeniu. Wysokość robocza 76 cm. Siłowniki + TIP-ON. Wolnostojące. **NIE pisać "wystarczy płaska podłoga"** (klient kazał usunąć) |
| **ELISS** | Biurka z nadstawką (100×65 lub 120×65 cm). Link: https://meblekobi.pl/pl/search.html?text=elise |

### B4. Meble ogrodowe (kategoria "ogród")

| Element | Reguła |
|---------|--------|
| **Materiały** | Aluminium (malowane proszkowo), technorattan, polywood, polipropylen, tekstylen, metal proszkowy |
| **Serie** | NICEA (aluminium+imitacja drewna), SYCYLIA BIG, MILANO, MAROKO, FLORENCJA, OLIMPIA |
| **"Nie rdzewieje"** | **NIE pisać bezwzględnie** — klient: "mebel ubity lub z odpryskiem może rdzewieć, klient zrozumie dosłownie". Pisać: "odporna na korozję", "odporna na warunki atmosferyczne" |
| **Zimowanie** | Aluminium nie wymaga obowiązkowego chowania, ale klient chce w FAQ: *"Dla zachowania estetyki i dłuższej żywotności mebli zaleca się jednak przechowywanie ich w suchym miejscu lub zabezpieczenie na zimę."* |
| **NICEA — brak danych** | waga całości (NIE wymyślać "7 kg"!), max obciążenie, dokładne wymiary elementów ("na zdjęciach w opisie") |

### B5. Łóżko HELIOS podwójne

- Rozsuwane — pojedyncze → podwójne (160×200 po rozłożeniu)
- 2 × materac piankowy 200×80×8 cm w zestawie
- Obciążenie 220 kg (110 kg/osoba)
- 9 paneli tapicerowanych velvet
- 2 pojemne szuflady
- 4 warianty: biały/szary × z materacem/bez
- Pasująca kolekcja: https://meblekobi.pl/pl/menu/helios-szary-603.html

### B6. Łóżko EMMA — pasujące kolekcje

- EMMA biały/różowy → [DREAM Różowy](https://meblekobi.pl/pl/menu/dream-rozowy-587.html)
- EMMA biały/szary → [DREAM Szary](https://meblekobi.pl/pl/menu/dream-szary-586.html)

### B7. Łóżko LEO Montessori — uzupełnienia

Klient sugeruje linkowanie do:
- [Skrzynie na zabawki](https://meblekobi.pl/pl/menu/skrzynie-178.html)
- [Komody dziecięce](https://meblekobi.pl/pl/menu/komody-dzieciece-179.html)

Zamiast "sylwetkę" → "konstrukcję".

---

## C. Wysyłka i gwarancja

- **Gwarancja:** 24 miesiące producenta (wszystkie produkty KOBI)
- **Wysyłka:** **3-5 dni roboczych** z magazynu w Polsce (NIE "48 godzin", NIE "2-3 dni")
- **Producent:** KOBI (polska produkcja)

---

## D. EAV — kluczowe atrybuty per produkt (dla struktury opisu)

### VERTO półkotapczan 140x200 biały
- Entity: półkotapczan / Attribute: wymiar → Value: 140×200 cm
- Entity: półkotapczan / Attribute: dekor → Value: biały
- Entity: półkotapczan / Attribute: głębokość po złożeniu → Value: 40 cm
- Entity: półkotapczan / Attribute: mechanizm → Value: siłowniki gazowe + blokada
- Entity: półkotapczan / Attribute: materac → Value: brak w zestawie, max 20 cm

### Biurko VERTO biały
- Entity: biurko / Attribute: blat po rozłożeniu → Value: 100×84 cm
- Entity: biurko / Attribute: głębokość po złożeniu → Value: 34 cm
- Entity: biurko / Attribute: mechanizm → Value: TIP-ON + siłowniki
- Entity: biurko / Attribute: dekor → Value: biały (też dąb artisan, szary, kaszmir)

### HELIOS 160x200 szary z materacem
- Entity: łóżko / Attribute: rozmiar po rozsunięciu → Value: 160×200 cm
- Entity: łóżko / Attribute: materac → Value: 2 × pianka 200×80×8 cm
- Entity: łóżko / Attribute: obciążenie → Value: 220 kg (110/osoba)
- Entity: łóżko / Attribute: pojemniki → Value: 2 szuflady

### Biurko FLEXI 118 dąb artisan/czarny
- Entity: biurko / Attribute: regulacja wysokości → Value: 70-115 cm elektryczna
- Entity: biurko / Attribute: blat → Value: 118 cm
- Entity: biurko / Attribute: panel → Value: LED + pamięć 2 ustawień
- Entity: biurko / Attribute: dekor → Value: dąb artisan / czarny

### AUTO Spider 160x80
- Entity: łóżko / Attribute: grafika → Value: Spider (7 wariantów serii: Batcar, Rainbow, Baccar, Speed, Turbo 4x4, Taxi)
- Entity: łóżko / Attribute: rozmiar → Value: 160×80 cm (też 140×70)
- Entity: łóżko / Attribute: materac → Value: pianka 7 cm (upgrade: pianka+kokos)

### EMMA-DREAM 160x80 biały/różowy
- Entity: łóżko / Attribute: grafika → Value: serduszka
- Entity: łóżko / Attribute: uchwyty → Value: drewniane w kształcie serc (dekoracyjne!)
- Entity: łóżko / Attribute: szuflada → Value: pod łóżkiem, na kółkach
- Entity: łóżko / Attribute: kolory → Value: biały/różowy, biały/szary
- Entity: łóżko / Attribute: prezent → Value: poduszka w kształcie serca

### ERYK 160x80 biały panele szare
- Entity: łóżko / Attribute: panele → Value: 4 miękkie velvet (szary/różowy/czarny)
- Entity: łóżko / Attribute: szuflada → Value: duża, pod łóżkiem, na kółkach
- Entity: łóżko / Attribute: użycie → Value: łóżko + sofa dzienna

### LEO Montessori 160x80 biały
- Entity: łóżko / Attribute: styl → Value: Montessori, podłogowe
- Entity: łóżko / Attribute: konstrukcja → Value: niska (not: "sylwetka")
- Entity: łóżko / Attribute: materac → Value: pianka 7 cm z pokrowcem

### DUBI domek 160x80 naturalny
- Entity: łóżko / Attribute: forma → Value: domek drewniany
- Entity: łóżko / Attribute: materiał → Value: drewno sosnowe nielakierowane
- Entity: łóżko / Attribute: wykończenie → Value: szlifowane, bez lakieru
- Entity: łóżko / Attribute: kolory → Value: naturalny, biały (z materacem / bez)

### NICEA beżowy/kremowy
- Entity: zestaw / Attribute: skład → Value: sofa + 2 fotele + pufa + stół
- Entity: zestaw / Attribute: konstrukcja → Value: aluminium malowane proszkowo
- Entity: zestaw / Attribute: blat stołu → Value: deska kompozytowa w imitacji drewna
- Entity: zestaw / Attribute: poduszki → Value: 10 cm, wodoodporne, szybkoschnące
- Entity: zestaw / Attribute: warianty → Value: beżowy+kremowy / czarny+szary / czarny+beżowy

---

## E. Workflow i pliki w projekcie

### Struktura folderów

```
teksty/
  kategorie/
    <slug>.md                   # iter 1 (ZAAKCEPTOWANE, wdrożone na stronę)
    2026-04-20/<slug>.md        # iter 2 z uwagami klienta (ZAAKCEPTOWANE)
  produkty/
    <slug>.md                   # iter 1
    2026-04-20/<slug>.md        # iter 2 (przerabiamy TERAZ)
docs/2026-04-20/                # generowane docxy
fakty-ze-strony-2026-04-20.md   # parametry techniczne ze sklepu
opisy-ze-strony-2026-04-20.md   # pełne opisy word-for-word (bazowe do przepisywania)
raport-uwagi-klienta-2026-04-20.md  # czerwone adnotacje z iter 1
wiedza-biznesowa.md             # TEN PLIK
```

### Pipeline

1. WebFetch karty + `opisy-ze-strony-2026-04-20.md` (baza do przepisywania)
2. `raport-uwagi-klienta-2026-04-20.md` (co pani poprawiała)
3. Wiedza-biznesowa.md (reguły)
4. Pisz w md (`teksty/produkty/2026-04-20/`) zgodnie ze skillem `pl-copywriter-ecommerce`
5. `node update-drive-2026-04-20.mjs` — generuje .docx, nadpisuje Drive (tylko produkty; kategorie zablokowane w SRC_DIRS)
6. Klient dodaje uwagi → `node extract-red-notes.mjs`
7. Iteracja

### Skrypty

- `generate-docs.mjs` — legacy, md → docx per folder główny
- `update-drive-2026-04-20.mjs` — aktualny, md → docx → Drive (nadpisuje)
- `extract-red-notes.mjs` — Drive docx → raport czerwonych uwag

### Stan iteracji 2026-04-20

| Obszar | Status |
|---|---|
| Kategorie (4 pliki) | ✅ Zaakceptowane, wdrożone na stronę (nie dotykamy) |
| Produkty (10 plików) | 🔄 Przerabiane: bogate, bluff lead + język korzyści + EAV + czerwone uwagi |
| Canonical w IdoSell | 📋 Instrukcja przekazana klientowi (ustawia ręcznie) |

---

## F. Lista produktów przepisywanych (iteracja 2)

| # | Nazwa | Flagship kolor | URL na meblekobi.pl |
|---|---|---|---|
| 1 | Półkotapczan VERTO 140x200 | Biały (14795) | [link](https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-140x200-skladany-w-szafe-bialy-14795.html) |
| 2 | Biurko rozkładane VERTO | Biały (14641) | [link](https://meblekobi.pl/pl/products/biurko-rozkladane-verto-skladane-chowane-w-szafke-bialy-14641.html) |
| 3 | Łóżko HELIOS 160x200 | Biały z materacem (9331) * | [link](https://meblekobi.pl/pl/products/lozko-podwojne-helios-160x200-biale-z-materacem-9331.html) |
| 4 | Biurko FLEXI 118 | Dąb artisan/czarny (15556) | [link](https://meblekobi.pl/pl/products/biurko-flexi-118cm-regulowane-podnoszone-elektryczne-komputerowe-dab-artisan-czarny-15556.html) |
| 5 | Łóżko AUTO 160x80 | Spider (13820) | [link](https://meblekobi.pl/pl/products/lozko-dzieciece-z-serii-auto-160x80-grafika-materac-spider-13820.html) |
| 6 | Łóżko EMMA 160x80 | Biały/różowy (4492) | [link](https://meblekobi.pl/pl/products/lozko-dzieciece-emma-160x80-biale-rozowe-4492.html) |
| 7 | Łóżko ERYK 160x80 | Biały panele szare (12654) | [link](https://meblekobi.pl/pl/products/lozko-pojedyncze-eryk-160x80-biale-panele-szare-12654.html) |
| 8 | Łóżko LEO Montessori | Biały (15437) | [link](https://meblekobi.pl/pl/products/lozko-dzieciece-leo-montessori-160x80-barierka-ochronna-materac-bialy-15437.html) |
| 9 | Łóżko Domek DUBI | Naturalny z materacem (14470) | [link](https://meblekobi.pl/pl/products/lozko-domek-dubi-dzieciece-160x80-z-materacem-kolor-naturalny-14470.html) |
| 10 | Zestaw NICEA | Beżowy/kremowy (15344) | [link](https://meblekobi.pl/pl/products/zestaw-mebli-ogrodowych-z-aluminium-nicea-bezowy-imitacja-drewna-poduszki-kremowe-15344.html) |

\* HELIOS szary z materacem (15246) miał 404 — klient ustawi osobno, merytorycznie ten sam produkt.

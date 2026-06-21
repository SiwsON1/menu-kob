# Brief: ROZSZERZENIE art D o 500-700 słów

ZADANIE: Przeczytaj plik `teksty/blog/2026-06-v2/lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy.md` (aktualnie 1904 słowa). Rozszerz go o 500-700 słów do **2400-2600 słów łącznie**, dodając 2 nowe sekcje H2 PRZED sekcją "Na co zwrócić uwagę przed zakupem...". Zapisz wynik do TEGO SAMEGO pliku (overwrite).

## Powód rozszerzenia
Konkurent meble.pl art14407 ma 2500-2800 słów na ten temat. Nasze v2 ma 1904 — chcemy pobić konkurenta długością i pokryciem semantycznym.

## DWIE nowe sekcje do dodania (PRZED "Na co zwrócić uwagę")

### Nowa sekcja 1: "Łóżko piętrowe dla nastolatka chłopca – kiedy ma sens"

Outline:
- BLUF: kiedy łóżko piętrowe ma sens w pokoju jednego nastolatka (nie tylko dla rodzeństwa) — np. dolne piętro jako miejsce do nauki/sofa, górne do spania. Albo: nastolatek + nocujący kolega.
- 3 paragrafy: kiedy piętrowe pasuje 1 chłopcu, kiedy lepiej wybrać HELIOS rozsuwane, ile miejsca potrzeba w pokoju nastolatka 8-12 m²
- Lista bullet 5-7 punktów: zalety piętrowego dla 1 nastolatka (przestrzeń dolna, miejsce do siedzenia, ścianka na plakaty, dom dla kota itp)
- 1 zdanie linkujące do art "Łóżko piętrowe w małym pokoju" jeśli czytelnik chce konkretów technicznych — link relatywny lub po prostu wzmianka

Długość: ~250 słów

### Nowa sekcja 2: "Pokój nastolatka chłopca – co jeszcze poza łóżkiem"

Outline:
- BLUF: łóżko to fundament, ale pokój chłopca 12+ lat potrzebuje też biurka, szafy, regału na książki/figurki, miejsca na sprzęt grający/sportowy
- 3-4 paragrafy:
  - **Biurko** — wymień FLEXI elektryczne 70-115 cm jako pasujące do nastolatka, link do biurka [FLEXI 118](https://meblekobi.pl/pl/products/biurko-flexi-118cm-regulowane-podnoszone-elektryczne-komputerowe-dab-artisan-czarny-15556.html), kategoria [biurka](https://meblekobi.pl/pl/menu/biurka-176.html)
  - **Szafa** — krótko o pojemności, drążek regulowany, miejsce na sprzęt sportowy
  - **Regał na książki + figurki** — link do kategorii [łóżka dziecięce](https://meblekobi.pl/pl/menu/lozka-dzieciece-179.html) (brak konkretnej kategorii regałów w wiedza-biznesowa, więc generic)
  - **Strefa relaksu** — pufy, lampka, plakaty, miejsce na konsolę
- Lista bullet 6-8 punktów: co musi się znaleźć w pokoju nastolatka chłopca
- Anegdota: "Rodzice najczęściej mówią, że nastolatek spędza w pokoju 60-70% czasu w domu — dlatego pokój ma być wygodny do nauki, snu I rozrywki"

Długość: ~280 słów

## ZASADY (krytyczne — łamać = patch klienta)

- NIE dodawaj `**bold**` wewnątrz nagłówków H1/H2/H3
- NIE wstawiaj tabel markdown `| a | b |` — używaj list bullet `- **kolumna**: wartość`
- NIE wstawiaj FLEXI biurko do dziwnych miejsc (np. do listy parametrów łóżek) — FLEXI jest TYLKO w sekcji o biurku
- NIE pisz "łóżka KOBI mają X" — pisz "W modelach AUTO, ERYK, HELIOS..."
- NIE pisz "wysyłka 48h" — TAK "wysyłka 3-5 dni roboczych"
- NIE dynamicznych liczb ("412 modeli")
- NIE em-dashy `—` w bodytext — TYLKO polish dash `–` w H1/H2
- Polskie znaki diakrytyczne (ą, ć, ę, ł, ń, ó, ś, ź, ż) w 100% miejsc
- Separator `---` PRZED każdą nową sekcją H2
- Bold target keyword "łóżko młodzieżowe dla chłopca" 1-2 razy w nowych sekcjach

## INSTRUKCJA edycji pliku

1. Otwórz plik `teksty/blog/2026-06-v2/lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy.md`
2. Znajdź sekcję `## Na co zwrócić uwagę przed zakupem łóżka młodzieżowego dla chłopca?`
3. PRZED tą sekcją wstaw 2 nowe sekcje H2 (z separatorem `---` na początku każdej)
4. Zachowaj WSZYSTKO inne w pliku bez zmian (intro, istniejące H2, FAQ, footer)
5. Zapisz overwrite tego samego pliku

Encoding UTF-8 BEZ BOM. Po zapisaniu pliku zakończ — żaden inny output.

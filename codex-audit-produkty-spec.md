# Audyt 20 opisów PRODUKTÓW KOBI — błędy + merytoryka + reguły + luki vs konkurencja

Przeczytaj WSZYSTKIE pliki z katalogu:
`D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\produkty\2026-05-29\` (20 plików .md)

To karty produktów sklepu meblowego meblekobi.pl (IdoSell). Tu konkretne liczby SĄ wymagane (to nie kategorie).

## ZADANIE 1 — BŁĘDY i sprzeczności wewnętrzne (najważniejsze)
Dla każdego pliku sprawdź:
- spójność liczb: czy wymiary zewnętrzne pasują do deklarowanej powierzchni spania (np. 160x80 vs wymiary ramy), czy zakresy się zgadzają,
- sprzeczności między BLUF, sekcją "wymiary", "dla kogo" i FAQ,
- czy materiał/obciążenie/zawartość zestawu nie przeczą sobie między akapitami,
- literówki, błędy odmiany, zła interpunkcja, podwojone słowa,
- czy materac jest "w zestawie" czy "osobno" — spójnie w całym pliku.
Format: plik → cytat → na czym polega błąd → poprawka.

## ZADANIE 2 — plausibility merytoryczna (flaga, nie pewnik)
Oznacz wartości, które wyglądają podejrzanie/nietypowo dla danego mebla (np. wymiar, obciążenie, wysokość), żebym zweryfikował je wobec żywej karty na meblekobi.pl. NIE zmyślaj poprawnych wartości — tylko wskaż "do weryfikacji".

## ZADANIE 3 — reguły KOBI (BLOCKING)
- en-dash (–), nigdy em-dash (—) ani dywiz "-" jako myślnik/zakres. WYJĄTEK: wymiary typu "160x80" są OK.
- Zero antropomorfizmu mebla ("mebel pracuje", "stelaż pracuje", "ściana pracuje"). "silnik pracuje" i "pracować na stojąco" (o użytkowniku) są OK.
- Nie ujawniać, że KOBI sprzedaje produkty firm trzecich (mówić nazwą modelu, nie "produkujemy wszystko"). 
- Brak generic AI fluff ("W dzisiejszych czasach", "Skontaktuj się już dziś").

## ZADANIE 4 — luki vs typowe karty konkurencji (krótko)
Dla kategorii produktów dziecięcych (łóżka, toaletki, regały) konkurenci (np. meblik.pl, woodies.pl, pinio) często podają: bezpieczeństwo/atesty, sposób montażu, czas montażu, czy materac w zestawie, konserwacja. Wskaż per typ produktu, jakiej powtarzalnej informacji zakupowej u nas brakuje — TYLKO jeśli da się dodać bez zmyślania (oznacz "wymaga potwierdzenia").

## Output (stdout + zapis do `codex-audit-produkty.md`), zwięźle:
```
# Audyt produktów — <data>
## Summary: BŁĘDY krytyczne X | do weryfikacji Y | reguły Z
## BŁĘDY / sprzeczności (per plik, z cytatem i poprawką)
## Do weryfikacji wobec żywej karty (lista wartości)
## Złamania reguł KOBI
## Luki vs konkurencja (evergreen-safe / wymaga potwierdzenia)
## Werdykt: które pliki czyste, które wymagają poprawki
```
NIE wymyślaj problemów na siłę. Jeśli plik czysty — napisz "czysty". Skup się na realnych błędach.

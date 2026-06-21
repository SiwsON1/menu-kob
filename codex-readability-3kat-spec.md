# Audyt czytelności (human comprehension) — 3 opisy kategorii KOBI

Przeczytaj 3 pliki:
- `D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\kategorie\2026-05-29\komody.md`
- `D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\kategorie\2026-05-29\lozka-mlodziezowe.md`
- `D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\kategorie\2026-05-29\lozka-tapicerowane.md`

## ZADANIE — czytaj jak zwykły polski rodzic, nie jak SEO
Dla KAŻDEGO pliku wskaż zdania, które:
- brzmią jak żargon aranżacyjny/projektowy (np. "bryła", "zagra", "strefa") lub kalka,
- są nielogiczne (coś robi coś, czego robić nie może),
- są przegadane, mętne albo nienaturalne dla rodzica kupującego mebel.
Format: plik → cytat → dlaczego zgrzyta → propozycja naturalniejszego brzmienia.
Jeśli plik jest czysty, napisz wprost "czysty, brak zgrzytów".

## Reguły klienta (BLOCKING jeśli złamane)
- ZERO liczb/wymiarów/cm/ilości modeli/kolorów. WYJĄTEK OK (nie flaguj): "gwarancja 24 miesięcy", "wysyłka 3–5 dni roboczych".
- en-dash (–) w myślnikach, NIGDY em-dash (—) ani zwykły dywiz "-" jako myślnik.
- Zero antropomorfizmu ("mebel pracuje", "komoda staje się elementem").
- Bez definicji typu "komoda służy do przechowywania" / "łóżko to mebel do spania".
- Nie ujawniać firm trzecich (mówić nazwami modeli).

## Output (stdout, krótko)
```
# Audyt czytelności — <data>
## komody.md: <czysty | lista zgrzytów cytat→propozycja>
## lozka-mlodziezowe.md: <...>
## lozka-tapicerowane.md: <...>
## BLOCKING (reguły klienta): <lista lub brak>
## Werdykt: czy zrozumiałe dla człowieka? co poprawić priorytetowo
```
Bez nitpicków interpunkcyjnych. Tylko realne zgrzyty zrozumiałości + złamania reguł.

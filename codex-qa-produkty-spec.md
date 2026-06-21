# QA 1:1 — 30 opisów produktów KOBI vs zapisane opisy źródłowe producenta

ŹRÓDŁA (dosłowne dane producenta):
- `D:\cursor\netim-seo-os\klienci\kobi-meble\opisy-zrodlowe-1do1.md` (20 produktów partii 2026-05-29)
- `D:\cursor\netim-seo-os\klienci\kobi-meble\opisy-zrodlowe-2026-06-01.md` (10 produktów partii 2026-06-01)

OPISY DO SPRAWDZENIA:
- `D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\produkty\2026-05-29\*.md` (20 plików)
- `D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\produkty\2026-06-01\*.md` (10 plików)

ZADANIE:
Dla KAŻDEGO opisu .md dopasuj go do właściwego produktu w plikach źródłowych i porównaj WSZYSTKIE liczby i fakty:
- wymiary zewnętrzne i powierzchnia spania,
- materac: czy w zestawie (TAK/NIE), ile, jaka wysokość,
- maksymalne obciążenie,
- materiał/wykonanie (płyta 16/18 mm, HDF, rama metalowa, drewno itd.),
- zawartość zestawu (np. liczba paneli, szuflad, barierek),
- kolory/warianty, funkcje (siłowniki, cichy domyk, brak tylnej ścianki itd.).

Zgłoś WYŁĄCZNIE rozjazdy: gdzie opis podaje liczbę/fakt INNY niż źródło, albo podaje fakt, którego w źródle NIE MA (ryzyko zmyślenia).

Format outputu (stdout + zapis do `codex-qa-produkty.md`):
```
# QA produktów — <data>
## Summary: rozjazdy X | zgodne Y (z 30)
## ROZJAZDY (per produkt)
- <plik> | <co w opisie> | <co w źródle> | severity
## Produkty bez zastrzeżeń: <lista>
```
NIE czepiaj się stylu ani sformułowań. Tylko zgodność liczb i faktów. Jeśli wszystko się zgadza — napisz "30/30 zgodne".

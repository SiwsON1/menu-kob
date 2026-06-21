# SEO Audit — opis kategorii "Szafy" (meblekobi.pl) — tryb competitive + rules

## Plik do audytu
`D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\kategorie\2026-05-29\szafy.md`
(opis kategorii Szafy, sklep meblowy IdoSell, ogólnopolski, target głównie pokój dziecka)

Przeczytaj ten plik. Reguły referencyjne: `D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\kategorie\ZASADY-v2-slowik-motiondesk.md` — też przeczytaj.

## ZADANIE 1 — pokrycie vs konkurencja
Sprawdź (z wiedzy o rynku PL i jeśli masz dostęp do sieci, pobierz) jak topowe sklepy opisują kategorie na frazy:
"szafy do pokoju dziecięcego", "szafa dla dziecka", "szafy dziecięce", "szafa do pokoju młodzieżowego".
Konkurenci do rozważenia: interbeds.pl, meblik.pl, dadada.pl, pinio.pl, woodies24.pl.
Wskaż KONKRETNE luki: jakie intencje / pytania kupujących / podtematy (H2/FAQ) pokrywają konkurenci, a nasz tekst NIE.
Przykłady możliwych luk: bezpieczeństwo (płyta, atesty, zaokrąglone krawędzie), drzwi przesuwne vs uchylne,
szafa 2/3-drzwiowa, organizacja wnętrza dla dziecka, montaż/dostawa, materiał/wykończenie, antywyważeniowe mocowanie do ściany.

## ZADANIE 2 — zgodność z zasadami (ZASADY-v2)
Dla każdej zasady: PASS / FAIL + cytat z tekstu jeśli FAIL.
- Test zdania zerowego (pierwsze zdanie niesie RÓŻNICĘ, nie oczywistość/definicję)
- Zakaz definicji (nie tłumaczy czym jest szafa/drążek)
- Różnicowanie (czemu te modele, nie pierwsze lepsze)
- E-A-V evergreen (atrybuty jakościowe, nie zmienne liczby)
- Kotwiczenie modeli (STELLA/MELI/LONI + idealnie linki)
- Information gain (coś ponad generyk producenta)
- Brak intent driftu (każda sekcja zakupowa, nie encyklopedyczna)

## ZADANIE 3 — twarde reguły klienta KOBI (BLOCKING jeśli złamane)
- ZERO liczb/wymiarów/cm/ilości modeli/kolorów (pełny evergreen). WYJĄTEK dozwolony: "gwarancja 24 miesięcy" i "wysyłka 3–5 dni roboczych" — te są OK, NIE flaguj.
- Zero antropomorfizmu ("mebel pracuje", "spokojna bryła").
- LONI musi być opisany jako OTWARTY REGAŁ (nie pełna szafa).
- Mowa o GŁĘBOKOŚCI szaf, nie szerokości.
- Tylko en-dash (–) w myślnikach, nigdy em-dash (—).
- Nie ujawniać, że to produkty firm trzecich (mówić nazwami modeli, nie "produkujemy wszystko").

## Output (zapisz do `codex-seo-audit-szafy.md` i wypisz na stdout)
```
# Audyt szafy.md — <data>
## Summary: BLOCKING X | WARNING Y | luki konkurencja Z
## BLOCKING (must fix)
- <severity> <issue> + cytat
## Luki vs konkurencja (priorytet pod dodanie)
- <podtemat> — kto z konkurencji to ma, czemu warto
## Zgodność z zasadami (PASS/FAIL lista)
```
NIE wymyślaj problemów na siłę. Nitpicki stylistyczne pomiń. Skup się na blocking + realnych lukach pokrycia.

# Weryfikacja 20 opisów produktów KOBI vs ŻYWE karty meblekobi.pl

Masz dostęp do sieci. Sklep: https://meblekobi.pl (wyszukiwarka: https://meblekobi.pl/pl/search.html?text=FRAZA).

Dla KAŻDEGO z 20 plików w `D:\cursor\netim-seo-os\klienci\kobi-meble\teksty\produkty\2026-05-29\`:
1. Z tytułu/nazwy pliku ustal model + rozmiar (np. "Łóżko EMMA II 160x80", "Toaletka RUBI", "Regał JAPANDI 104").
2. Znajdź odpowiadającą KARTĘ produktu na meblekobi.pl (użyj search, wejdź na /pl/products/...html). Podaj URL którego użyłeś.
3. Z karty wyciągnij oficjalne parametry: wymiary zewnętrzne, powierzchnia spania, materac (w zestawie TAK/NIE + ile + wymiar), maksymalne obciążenie, materiał korpusu, dostępne kolory/warianty, co wchodzi w skład zestawu, kluczowe funkcje (np. szuflady, barierka, mechanizm).
4. PORÓWNAJ z liczbami i twierdzeniami w pliku .md.

## Output — TYLKO rozjazdy i braki (zapisz do `codex-verify-produkty-live.md` + stdout):
Dla każdego pliku jedna z trzech:
- `ZGODNE` — jeśli parametry w pliku zgadzają się z kartą (krótko, bez wypisywania wszystkiego).
- `ROZJAZD` — tabela: parametr | w pliku | na karcie | poprawka. Wypisz KAŻDY niezgodny parametr.
- `KARTY NIE ZNALEZIONO` — jeśli nie udało się dopasować karty (podaj czego szukałeś).

Na końcu sekcja:
## Krytyczne błędy merytoryczne (liczby, które w pliku są ZŁE wg karty)
## Do ręcznego potwierdzenia (czego na karcie nie widać jednoznacznie)

Zasady: NIE zmyślaj parametrów. Jeśli karty nie ma lub parametr niewidoczny — napisz wprost. Podawaj URL każdej karty, żeby dało się zweryfikować. Skup się na liczbach (wymiary, obciążenie, materac) i zawartości zestawu — to tam są błędy.

Lista plików (20): biurko-flexi-140cm-dab-artisan-czarny, konsola-meli-roz-toaletka, lozko-auto-batcar-160x80, lozko-auto-turbo-4x4-160x80, lozko-emma-ii-160x80-podwojne-rozowe, lozko-eryk-160x80-panele-rozowe, lozko-helios-160x200-panele-rozowe, lozko-kareta-160x80, lozko-leo-montessori-160x80-bez-materaca, materac-niko-80x200-piankowy, polkotapczan-verto-120x200-bialy, polkotapczan-verto-160x200-bialy, polkotapczan-verto-90x200-bialy, regal-bari-103-dab-vicenza, regal-japandi-104-kaszmir, szafka-na-buty-andy-z-siedziskiem, szafka-nocna-meli-skandynawska-biala, toaletka-rubi-biala-3w1, zestaw-polek-chmurki-bialy, zestaw-polek-lewit-dab-craft.

Jesteś audytorem przypisań kategorii w sklepie meblowym (PL).

Przeczytaj plik `strategia/produkt-kategorie-2026-06-25.csv` (separator ;, kolumny:
url;produkt;dzial;kategoria;podkategorie). To 1273 produkty meblekobi.pl, każdy ma nazwę
(slug) i przypisaną kategorię.

ZADANIE: dla KAŻDEGO wiersza oceń, czy `kategoria` pasuje do nazwy produktu (`produkt`).
Wypisz TYLKO przypadki PODEJRZANE/BŁĘDNE, czyli gdy produkt wygląda na inny typ niż jego kategoria,
albo podkategoria jest błędna (np. łóżko w komodach; "uchwyty serduszka" liczone jako motyw serca;
zestaw RTV w łazience; produkt dorosły w dziecięcym).

Dla każdego podejrzanego: nazwa produktu | obecna kategoria | dlaczego źle | sugerowana kategoria.
Pomiń poprawne. Na końcu policz ile podejrzanych / 1273 i wypisz najczęstsze wzorce błędów.

Zapisz wynik do pliku `strategia/codex-audyt-produktow.md`. Pracuj dokładnie, przejdź cały plik.

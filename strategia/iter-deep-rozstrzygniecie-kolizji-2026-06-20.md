# Rozstrzygnięcie kolizji + kanoniczne frazy rodzic↔dziecko (deep, 2026-06-20)

Z master-mapy `keyword-node-map-2026-06-20.md` (62 węzły). Każda kolizja rozłożona: realna vs artefakt.

## ZASADA: rodzic celuje w HEAD, dziecko w szczegół (anty-kanibalizacja hierarchiczna)

| Węzeł rodzic | Fraza rodzica (HEAD) | Węzeł dziecko | Fraza dziecka |
|---|---|---|---|
| Szafki RTV | szafka rtv / meble rtv | RTV wisząca / dąb / biała | szafka rtv wisząca / dąb / biała |
| Stoły | stół do jadalni / stół rozkładany | Stół okrągły | stół okrągły rozkładany |
| Stoliki kawowe / ławy | stolik kawowy / ława do salonu | Stolik okrągły / dąb | stolik kawowy okrągły / dąb |
| Komody | komoda / komody do salonu | Komoda dąb / biała / czarna | komoda dąb artisan / biała / czarna |
| Łóżka dziecięce | łóżko dziecięce | 160x80 / z barierką / domek | łóżko dziecięce 160x80 / z barierką / domek |
| Biurka | biurko | komputerowe / białe / dąb | biurko komputerowe / białe / dąb |

Reguła operacyjna: H1+title rodzica = fraza HEAD; H1+title dziecka = fraza HEAD + atrybut. Nigdy ta sama
fraza w dwóch title. rel=canonical dziecka NIE wskazuje na rodzica (to inna, węższa intencja indeksowalna).

## KOLIZJE — rozstrzygnięcia 1:1

1. **„łóżka młodzieżowe" (Meble młodzieżowe hub vs Łóżka młodzieżowe)** — REALNA.
   → Hub „Meble młodzieżowe / pokój nastolatka" celuje w **„pokój młodzieżowy" (3,6k) / „meble młodzieżowe"**.
   → Kategoria „Łóżka młodzieżowe" celuje w **„łóżka młodzieżowe" (27,1k)**. Rozdzielone.

2. **„toaletka z lusterkiem led" (Toaletki dziecięce vs Toaletki)** — REALNA (duplikacja w v2 doc).
   → KOBI ma tylko 6 toaletek. JEDNA kategoria „Toaletki" (w Sypialni), z linkiem z Pokoju dziecka.
   Usunąć „Toaletki dziecięce" jako osobny węzeł. (Żywe mega-menu już ma toaletki tylko raz — fix dotyczy v2 doc.)

3. **„szafka rtv wisząca" (Szafki RTV vs RTV wisząca)** — HIERARCHIA, nie kanibalizacja.
   → Rodzic „Szafki RTV" → „szafka rtv"; dziecko → „szafka rtv wisząca". OK po przypisaniu frazy head.

4. **„ława do salonu" (Ławy vs Ława do salonu)** — ARTEFAKT (brak osobnej kategorii „Ławy" w generatorze).
   Ława to podkat. w „Stoliki kawowe / ławy". Bez zmian.

5. **„stół okrągły rozkładany" (Stoły vs Stół okrągły)** — HIERARCHIA. Rodzic → „stół do jadalni",
   dziecko → „stół okrągły". OK po przypisaniu.

## FLAGI CIENKIE — rozstrzygnięcia

- **Szafy dziecięce „1 prod."** = ARTEFAKT liczenia (token „szafa"+„dzieciec"). REALNIE 22 (bucket).
  Caveat globalny: liczby produktów liczyć z reklasyfikacji (bucket), nie z token-match — produkty
  nazwane serią (szafa-stella, łóżko-karol) nie zawierają tokenu typu+atrybutu.
- **Konsole 1 (literał) / 5 (bucket przedpokój)** — za cienko na osobną kategorię. Fold do „Przedpokój".

## METODOLOGICZNY WNIOSEK (ważny dla całej analizy)
Liczby KOBI w `keyword-node-map` (kolumna KOBI) są ZANIŻONE dla węzłów nazwanych serią — to licznik
token-AND bez kontekstu bucketa. Autorytatywne pozostają liczby z `_verify-subcats.mjs` (filtr w obrębie
właściwego bucketa) i z reklasyfikacji. Mapa fraz (kolumna fraza-cel + popyt) jest poprawna.

## DO NAPRAWY (lista)
1. v2 doc: usunąć „Toaletki dziecięce" z gałęzi 1 (zostaje link do Toaletek w Sypialni). ✔ w tym kroku.
2. v2 doc: hub młodzieżowy → fraza „pokój młodzieżowy", nie „łóżka młodzieżowe". ✔
3. Konsole → fold do Przedpokoju (nie osobna kategoria). ✔
4. Reguła kanoniczna rodzic-head / dziecko-atrybut → dopisana do iter9.

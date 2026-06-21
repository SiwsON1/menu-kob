# Master mapa fraza→węzeł + kolizje kanibalizacji (2026-06-20)

Węzłów: 62. Każdy dostaje najlepszą (najwyższy wolumen) frazę z Senuto, dla której
wszystkie tokeny nazwy są obecne. Kolizja = ta sama fraza-cel przypisana >1 węzłowi.

## KOLIZJE (do rozstrzygnięcia kanonicznego)

- **"łóżka młodzieżowe"** ← Meble młodzieżowe (podhub) / Łóżka młodzieżowe
- **"toaletka z lusterkiem led"** ← Toaletki dziecięce / Toaletki
- **"szafka rtv wisząca"** ← Szafki RTV / Szafka RTV wisząca
- **"ława do salonu"** ← Ławy / Ława do salonu
- **"stół okrągły rozkładany"** ← Stoły / Stół okrągły

## PEŁNA MAPA (poziom · gałąź · węzeł · KOBI · fraza-cel · popyt)

| Lvl | Gałąź | Węzeł | KOBI | Fraza-cel | Popyt |
|---|---|---|---|---|---|
| G | Pokój dziecka | Pokój dziecka (hub) | 280 | meble dziecięce | 6600 |
| G | Pokój dziecka | Meble młodzieżowe (podhub) | 10 | łóżka młodzieżowe | 27100 |
| G | Pokój dziecka | Pokój dziewczynki (landing) | 30 | meble do pokoju dziewczynki | 3600 |
| G | Pokój dziecka | Pokój chłopca (landing) | 5 | meble dla chłopca | 2900 |
| G | Biuro | Biuro / strefa nauki (hub) | 81 | biurko | 90500 |
| G | Łazienka | Meble łazienkowe na wymiar (hub) | 21 | meble łazienkowe na wymiar | 2400 |
| K | Pokój dziecka | Łóżka dziecięce | 280 | łóżko dziecięce | 22200 |
| K | Pokój dziecka | Łóżka piętrowe | 19 | łóżko piętrowe | 40500 |
| K | Pokój dziecka | Łóżka podwójne | 59 | łóżko podwójne | 2900 |
| K | Pokój dziecka | Łóżka młodzieżowe | 10 | łóżka młodzieżowe | 27100 |
| K | Pokój dziecka | Łóżko domek | 14 | łóżko domek | 9900 |
| K | Pokój dziecka | Szafy dziecięce | 1 | szafa do pokoju dziecięcego | 5400 |
| K | Pokój dziecka | Regały dziecięce | 66 | regał dziecięcy na zabawki | 320 |
| K | Pokój dziecka | Półki dla dzieci | 50 | półka ścienna | 8100 |
| K | Pokój dziecka | Skrzynie na zabawki | 20 | biała skrzynia na zabawki | 140 |
| K | Pokój dziecka | Toaletki dziecięce | 6 | toaletka z lusterkiem led | 6600 |
| K | Biuro | Biurka dziecięce | 81 | biurko dziecięce białe | 210 |
| K | Biuro | Biurka narożne | 9 | biurko narożna | 27100 |
| K | Biuro | Biurka regulowane | 10 | biurko regulowane | 9900 |
| K | Biuro | Krzesła obrotowe / biurowe | 8 | krzesło obrotowe skóra | 260 |
| K | Sypialnia | Komody | 128 | komoda | 60500 |
| K | Sypialnia | Szafki nocne | 45 | szafka nocna | 49500 |
| K | Sypialnia | Szafy | 34 | szafa | 60500 |
| K | Sypialnia | Garderoby | 6 | szafa garderoba | 3600 |
| K | Sypialnia | Toaletki | 6 | toaletka z lusterkiem led | 6600 |
| K | Sypialnia | Materace | 119 | materac kieszeniowy | 2400 |
| K | Salon | Szafki RTV | 109 | szafka rtv wisząca | 9900 |
| K | Salon | Stoliki kawowe | 88 | stolik kawowy | 110000 |
| K | Salon | Ławy | 18 | ława do salonu | 14800 |
| K | Salon | Stoły | 130 | stół okrągły rozkładany | 33100 |
| K | Salon | Krzesła do jadalni | 34 | krzesła do jadalni | 74000 |
| K | Salon | Kanapy | 15 | kanapa narożna | 9900 |
| K | Salon | Narożniki | 15 | biurko narożnikowe | 27100 |
| K | Salon | Fotele | 11 | fotel | 49500 |
| K | Salon | Pufy | 16 | pufa ze schowkiem | 12100 |
| K | Salon | Regały | 66 | regał | 27100 |
| K | Łazienka | Szafki łazienkowe | 21 | szafka łazienkowa | 40500 |
| K | Przedpokój | Szafki na buty | 22 | szafka na buty biała | 2900 |
| K | Przedpokój | Wieszaki | 6 | wieszak do przedpokoju | 18100 |
| K | Przedpokój | Konsole | 1 | konsola | 18100 |
| K | Ogród | Meble ogrodowe | 31 | meble ogrodowe | 135000 |
| K | Akcesoria | Uchwyty meblowe | 39 | meble kuchenne biały połysk bez uchwytów | 40 |
| K | Akcesoria | Drapaki dla kota | 7 | drapak na bok kanapy | 110 |
| P | Pokój dziecka | Łóżko dziecięce 160x80 | 112 | łóżko dziecięce 160x80 | 1600 |
| P | Pokój dziecka | Łóżko z barierką | 81 | łóżko dziecięce z barierką | 1000 |
| P | Pokój dziecka | Łóżko z pojemnikiem | 37 | łóżko 160x200 z pojemnikiem | 6600 |
| P | Pokój dziecka | Łóżko dla dziewczynki | 18 | łóżko dla dziewczynki | 9900 |
| P | Sypialnia | Komoda dąb | 56 | komoda dąb sonoma | 3600 |
| P | Sypialnia | Komoda biała | 33 | komoda biała | 27100 |
| P | Sypialnia | Komoda czarna | 18 | komoda czarna | 4400 |
| P | Sypialnia | Szafka nocna biała | 14 | szafka nocna biała | 8100 |
| P | Salon | Stolik kawowy okrągły | 18 | stolik kawowy okrągły | 27100 |
| P | Salon | Ława do salonu | 18 | ława do salonu | 14800 |
| P | Salon | Stół okrągły | 50 | stół okrągły rozkładany | 33100 |
| P | Salon | Szafka RTV dąb | 64 | szafka rtv dąb | 1300 |
| P | Salon | Szafka RTV biała | 38 | szafka rtv biala | 3600 |
| P | Salon | Szafka RTV wisząca | 5 | szafka rtv wisząca | 9900 |
| P | Biuro | Biurko komputerowe | 39 | biurko komputerowe narożnikowe | 480 |
| P | Biuro | Biurko białe | 38 | biurko białe | 12100 |
| P | Łazienka | Szafka pod umywalkę | 26 | nowoczesna szafka pod umywalkę nablatową | 1900 |
| P | Łazienka | Słupek łazienkowy | 39 | słupek kuchenny | 1900 |
| P | Łazienka | Blat kuchenny | 55 | blat kuchenny na wymiar | 1900 |

## FLAGI RYZYKA

- CIENKO (KOBI<5): Szafy dziecięce (1 prod., fraza "szafa do pokoju dziecięcego" 5400)
- CIENKO (KOBI<5): Konsole (1 prod., fraza "konsola" 18100)

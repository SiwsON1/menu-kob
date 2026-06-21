# Plan: 6 artykulow blogowych meblekobi.pl - czerwiec 2026

Data: 2026-05-26
Cel: zapelnic blog 6 artykulami pokrywajacymi longtail keywords z poradnikow meble.pl (informational intent), ktore trafiaja w realna oferte KOBI.
Workflow: Codex headless pisze, Claude robi QA wg wiedza-biznesowa.md.

## Kryteria akceptacji per artykul

1. Dlugosc: 1000-1800 slow (poza E ~2000 slow, F ~800-1000)
2. Struktura wg plans/blog-kobi-2026-06-benchmark.md
3. 0 zakazanych sformulowan wg A1 (wiedza-biznesowa.md):
   - NIE "lozka KOBI maja X" / "wszystkie nasze modele" / "produkcji KOBI"
   - NIE "stelaz FLEX z listew" - TAK "stelaz z elastycznych listew brzozowych - system FLEX"
   - NIE "wysylka 48h" - TAK "wysylka 3-5 dni roboczych"
   - NIE dynamiczne liczby (412 modeli)
   - NIE em-dashy w bodytext (tylko w H1/H2 polish dash)
4. Target keyword + supporting boldowane (8-15 razy)
5. FAQ z literalnym przejeciem tresci klienta gdzie ma zastosowanie (sekcja B wiedza-biznesowa.md)
6. Linki wewnetrzne z sekcji F wiedza-biznesowa.md

## 6 artykulow

| # | Slug | Target | Vol klaster | Produkty KOBI | Slow |
|---|---|---|---:|---|---:|
| A | lozko-dzieciece-z-barierka-bezpieczenstwo-do-jakiego-wieku | lozko dzieciece z barierka | 1460 | AUTO, EMMA, ERYK, LEO, DUBI | 1300-1600 |
| B | wysokosc-biurka-dla-dziecka-tabela-cm-wzrost | wysokosc biurka dla dziecka | 850 | FLEXI 70-115 cm | 1000-1200 |
| C | lozko-pietrowe-w-malym-pokoju-dzieciecym-jak-rozplanowac | lozko pietrowe w malym pokoju | 430 | lozka pietrowe KOBI | 1200-1500 |
| D | lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy | lozko mlodziezowe dla chlopca | 1600 | AUTO Spider/Batcar/Turbo, ERYK, HELIOS | 1500-1800 |
| E | pokoj-dziewczynki-meble-kolor-pelen-przewodnik | meble do pokoju dziewczynki + kolor | 4390 | EMMA bialy/rozowy, DREAM rozowy, toaletki, szafy | 1800-2200 |
| F | materac-kokos-do-lozka-dzieciecego-opinie-kiedy-warto | materac kokos opinie + dla dziecka | 590 | upgrade pianka+kokos | 800-1100 |

## Workflow per artykul

1. Brief: plans/codex-blog-2026-06/<slug>-brief.md (target+supporting, outline, FAQ, internal linki, zasady)
2. Codex: cat brief | codex exec --skip-git-repo-check - > teksty/blog/2026-06/<slug>.md
3. Claude QA: czyta wynik, checklist (0 zakazanych, dlugosc, struktura)
4. Jezeli OK -> next art. Jezeli blad -> Edit (chirurgia).
5. Po wszystkich 6: generate-docs.mjs (mod pod podfolder daty) + upload-to-drive.mjs do "Kobi Meble / Blog 2026-06"

## Internal linki - gotowe URL

Polkotapczan VERTO 140x200 bialy: https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-140x200-skladany-w-szafe-bialy-14795.html
Biurko rozkladane VERTO bialy: https://meblekobi.pl/pl/products/biurko-rozkladane-verto-skladane-chowane-w-szafke-bialy-14641.html
Lozko HELIOS 160x200 bialy z materacem: https://meblekobi.pl/pl/products/lozko-podwojne-helios-160x200-biale-z-materacem-9331.html
Biurko FLEXI 118: https://meblekobi.pl/pl/products/biurko-flexi-118cm-regulowane-podnoszone-elektryczne-komputerowe-dab-artisan-czarny-15556.html
Lozko AUTO Spider 160x80: https://meblekobi.pl/pl/products/lozko-dzieciece-z-serii-auto-160x80-grafika-materac-spider-13820.html
Lozko EMMA 160x80 bialy/rozowy: https://meblekobi.pl/pl/products/lozko-dzieciece-emma-160x80-biale-rozowe-4492.html
Lozko ERYK 160x80 bialy panele szare: https://meblekobi.pl/pl/products/lozko-pojedyncze-eryk-160x80-biale-panele-szare-12654.html
Lozko LEO Montessori 160x80 bialy: https://meblekobi.pl/pl/products/lozko-dzieciece-leo-montessori-160x80-barierka-ochronna-materac-bialy-15437.html
Lozko Domek DUBI 160x80 naturalny: https://meblekobi.pl/pl/products/lozko-domek-dubi-dzieciece-160x80-z-materacem-kolor-naturalny-14470.html
Zestaw NICEA: https://meblekobi.pl/pl/products/zestaw-mebli-ogrodowych-z-aluminium-nicea-bezowy-imitacja-drewna-poduszki-kremowe-15344.html
Kategoria lozka dzieciece: https://meblekobi.pl/pl/menu/lozka-dzieciece-179.html
Kategoria polkotapczany: https://meblekobi.pl/pl/menu/polkotapczany-lozka-w-szafie-688.html
Kategoria biurka: https://meblekobi.pl/pl/menu/biurka-176.html
Kategoria materace: https://meblekobi.pl/pl/menu/materace-545.html
Kategoria skrzynie: https://meblekobi.pl/pl/menu/skrzynie-178.html
Kategoria komody dzieciece: https://meblekobi.pl/pl/menu/komody-dzieciece-179.html
Wyszukiwanie ELISS: https://meblekobi.pl/pl/search.html?text=elise
Kolekcja DREAM rozowy: https://meblekobi.pl/pl/menu/dream-rozowy-587.html
Kolekcja DREAM szary: https://meblekobi.pl/pl/menu/dream-szary-586.html
Kolekcja HELIOS szary: https://meblekobi.pl/pl/menu/helios-szary-603.html

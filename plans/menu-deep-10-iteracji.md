# Plan: 10 iteracji pogłębiania struktury menu meblekobi.pl + 10× weryfikacja w sieci

Cel: najgłębsza, kompletna, antykanibalizacyjna architektura kategorii (4 poziomy:
gałąź → kategoria → podkategoria → atrybut/filtr), każda warstwa zweryfikowana realnym
popytem (Senuto lokalnie + WebSearch/WebFetch live).

Dane bazowe: `produkty-mapowanie-FINAL-2026-06-19.csv` (1273, po reklasyfikacji), Senuto
interbeds.pl + meble.pl, `subcats-approved.json` (23 podkat. potwierdzone).

Kryteria akceptacji podkategorii: KOBI ≥10 prod. + popyt ≥3k = PEŁNA; ≥5 + ≥1k = filtr SEO.
Każda iteracja kończy się: (a) zaktualizowanym `subcats-approved.json` lub osobnym artefaktem,
(b) wpisem weryfikacji, (c) regeneracją mega-menu jeśli doszły pozycje.

## Iteracje

1. **Serie/kolekcje produktowe** — wyciągnij wszystkie serie z katalogu (KAROL, VERTO, MALMO,
   STELLA, AURELIA, EMMA, ELISS, DYLAN, FLEXI, HELIOS, ANDY, LONI, LUMI, LUI, FOCUS, NOVA...),
   policz produkty/serię. Web: czy szukają po nazwie serii. → warstwa „Kolekcje".
2. **Łazienka/kuchnia deep** — 150 prod. × seria (Ariel/Nova/Elia/Lavia/Boni/Ovalia) × funkcja
   (pod umywalkę/słupek/blat/nad pralkę/z lustrem). Web: struktura „meble łazienkowe na wymiar".
3. **Łóżka deep** — macierz rozmiar (160x80/140x70/180x80/90x200) × typ (domek/montessori/piętrowe/
   podwójne/młodzieżowe) × motyw (auto/zwierzęta/księżniczka). Web: autocomplete „łóżko dziecięce".
4. **Komody deep** — kolor (dąb/biała/czarna/kaszmir) × szerokość (120/140) × styl (loft/skandi/
   ryflowana) × nogi. Web: faceted komody na meble.pl/konkurent.
5. **RTV + storage salon** — kolor × styl × wisząca/stojąca × szerokość (140/200). Web.
6. **Biurka/strefa nauki deep** — dziecięce/młodzieżowe/komputerowe/narożne/regulowane/gamingowe
   × kolor. Web: trend gamingowe/regulowane.
7. **Salon deep** — stoły (okrągły/rozkł/marmur/dąb), stoliki (okrągły/dąb/marmur/2w1/zestaw),
   krzesła (welur/obrotowe/tapicerowane), kanapy (funkcja spania/narożnik L-P), fotele/pufy. Web.
8. **Audyt menu konkurencji (live)** — pobierz realne menu: interbeds.pl, meble.pl, dadeco,
   bellamio, konsimo, wójcik. Czego mają w menu, czego my nie. WebFetch ×5+.
9. **Antykanibalizacja + kanoniczność** — mapa fraza→jedna kategoria, wykryj konflikty
   (komoda biała vs komoda dziecięca biała itd.), przypisz kanoniczny URL, reszta = filtr.
10. **Konsolidacja** — finalne 4-poziomowe drzewo (`DRZEWO-MENU-v2`), mega-menu v2 z pełną
    głębią, draft CSV do panelu, lista 301 stara→nowa, podsumowanie dla klienta.

## Web-checki (min. 10)
interbeds.pl menu · meble.pl faceted · „łóżko dziecięce" autocomplete/PAA · „komoda dąb artisan"
SERP · „meble łazienkowe na wymiar" · „szafka rtv" warianty · „biurko gamingowe" trend ·
„stół okrągły rozkładany" · konkurent dziecięcy (dadeco/pinio/bellamio) menu · „półkotapczan" nisza.

## Anti-cele
Nie tworzyć kategorii bez ≥5 produktów. Nie dublować adresów (kanoniczność). Nie myślniki w copy.
Materace wg rozmiaru już odrzucone (popyt = łóżka). Frazy OBI = szum.

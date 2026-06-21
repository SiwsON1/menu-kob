# Sesja 2026-05-25 — Iter3 Kobi Meble (PROGRESS)

> Stan na: przerwa po scrapowaniu, przed pisaniem opisów. Kompu zresetowany — kontynuujemy od pisania.

## Scope iter3

**4 kategorie + 10 produktów** — pod ★★★ frazy z maila klienta 2026-05-04.

### 4 kategorie (do napisania w `teksty/kategorie/2026-05-25/`)

1. `lozka-mlodziezowe.md` — /pl/menu/lozka-mlodziezowe-174.html (HELIOS / ORIO / LENORIA / ASTRA / VALENTINO)
2. `lozka-tapicerowane.md` — /pl/menu/lozka-tapicerowane-619.html (fraza ★★★ "łóżko z panelami tapicerowanymi"; ERYK + HELIOS + VALENTINO + LENORIA + MADERA)
3. `komody.md` — /pl/menu/komody-157.html (fraza ★★★ "komoda z grafiką"; Emily SWEET BEAR/GAME/Fashion + VENUS + Yasumi)
4. `szafy.md` — /pl/menu/szafy-273.html (fraza ★★★ "szafa z nadrukiem"; STELLA SWEET BEAR/GAME/BUNNY + MELI + LONI)

### 10 produktów (do napisania w `teksty/produkty/2026-05-25/`)

1. `polkotapczan-verto-90x200-bialy.md` — SKU 14787, 2 250 zł, fraza ★★★
2. `polkotapczan-verto-120x200-bialy.md` — SKU 14791, 2 442 zł, bonus rodzina
3. `polkotapczan-verto-160x200-bialy.md` — SKU 14799, 2 954 zł, fraza ★★★
4. `lozko-auto-batcar-160x80.md` — SKU 13825, 510 zł, fraza ★★★ "łóżko z grafiką"
5. `lozko-auto-turbo-4x4-160x80.md` — SKU 13818, 510 zł
6. `lozko-eryk-160x80-panele-rozowe.md` — SKU 12653, 634 zł
7. `lozko-helios-160x200-panele-rozowe.md` — SKU 12101, 1 532 zł
8. `lozko-emma-ii-160x80-podwojne-rozowe.md` — SKU 4509, 752 zł
9. `biurko-flexi-140cm-dab-artisan-czarny.md` — SKU 14708, 718,99 zł
10. `lozko-leo-montessori-160x80-bez-materaca.md` — SKU 15438, 279 zł

## Co zrobione w tej sesji (2026-05-25)

- [x] Stan projektu zweryfikowany (memory, frazy-master 2026-05-05, baza-rodzin, Drive)
- [x] Sprawdzony Drive — klient NIE odpisał na iter2, wszystko z 2026-04-20 wdrożone na meblekobi.pl (potwierdza raport-kwiecień 2026-05-12)
- [x] Wybrane 4 kategorie + 10 produktów (zgodnie z ★★★ mailem klienta 2026-05-04)
- [x] Foldery utworzone: `teksty/kategorie/2026-05-25/`, `teksty/produkty/2026-05-25/`, `docs/2026-05-25/`
- [x] **WebFetch wszystkich 14 stron** — sklep przeczytany, ceny zaktualizowane (kilka spadków vs baza-rodzin: ERYK 634, HELIOS 1532, EMMA II 752, LEO 279, AUTO Batcar wrócił z promo)
- [x] **`fakty-ze-strony-2026-05-25.md`** — pełen zestaw parametrów per produkt + per kategoria

## Co zostało do zrobienia (kontynuacja po resecie)

- [ ] **Napisz 4 opisy kategorii** w `teksty/kategorie/2026-05-25/` (PEAVT + Słowik + FAQ 4-6 pytań, 400-700 słów). Skill: `pl-copywriter-ecommerce`
- [ ] **Napisz 10 opisów produktów** w `teksty/produkty/2026-05-25/` (PEAVT + cecha→korzyść + FAQ 3-5 pytań, 200-400 słów)
- [ ] **Humanizuj 14 tekstów** (skill `pl-humanizer`) — anti-AI patterny, zero pauz w prozie
- [ ] **Wygeneruj .docx**: `node generate-docs.mjs` z folderem 2026-05-25
- [ ] **Upload na Google Drive**: utworzyć folder "Kobi Meble - Poprawki 2026-05-25" (analogicznie do iter2 — id z iter2: 18TXtEEaV34PFR5dM2GPu69s6BIzc7zTL); wgrać .docx z datą w nazwie pliku

## Workflow per opis (z CLAUDE.md projektu)

1. Lead/BLUF z czasownikiem transakcyjnym + kluczowa korzyść + cena (1-2 zdania)
2. Korzyści sprzedażowe (cecha → korzyść, NIGDY cecha sama)
3. Parametry techniczne (1 fakt liczbowy co 2 zdania)
4. Zastosowanie / dla kogo
5. Trust + CTA (gwarancja 24 mc, polski producent, czasownik z Słowika)
6. FAQ (3-5 produkty, 4-6 kategorie) — pytania TRANSAKCYJNE
7. Schema FAQ (JSON-LD) jak w iter2

## Klucze zasady (memory feedback)

- NIE wymyślać parametrów których nie ma na karcie
- NIE ujawniać że KOBI sprzedaje też produkty firm zewnętrznych
- NIE używać `–` `—` ` - ` w prozie (P13 pl-humanizer + feedback) — listy OK
- NIE używać generic "w dzisiejszych czasach", "innowacyjny" bez dowodu
- NIE ruszać nazw produktów (post_title niezmienne)
- Pierwsza linia opisu produktu = H2
- Min 3 słowa transakcyjne per opis (kup, zamów, sprawdź, wybierz)
- Title meta max 65 znaków
- 3-5 dni roboczych wysyłka (NIE 48h)
- Gwarancja 24 mies. (standard KOBI)

## Pliki źródłowe do otwarcia po resecie

1. `fakty-ze-strony-2026-05-25.md` — PRIORYTET (pełne parametry)
2. `wiedza-biznesowa.md` — zabronione sformułowania
3. `baza-rodzin-produktowych.md` — szerszy kontekst
4. `frazy-master-2026-05-05.md` — sekcja ODRZUCONE (sprawdzić przed każdą frazą)
5. `CLAUDE.md` (projektu) — workflow
6. `.claude/skills/pl-copywriter-ecommerce/SKILL.md` (w netim-seo-os)
7. `.claude/skills/pl-humanizer/SKILL.md`
8. Wzorce iter2: `teksty/kategorie/2026-04-20/*.md`, `teksty/produkty/2026-04-20/*.md`

## Tasks (Claude Code TaskList)

- #1 [pending] Iter3 master
- #2 [completed] Scrape obecne opisy
- #3 [pending] Napisz 4 opisy kategorii
- #4 [pending] Napisz 10 opisów produktów
- #5 [pending] Humanizuj 14 tekstów
- #6 [pending] Generuj .docx + upload do Google Drive

## Folder docelowy na Drive

- Parent: id `0ALDMsda_EvFOUk9PVA`
- Stworzyć: `Kobi Meble - Poprawki 2026-05-25`
- Wewnątrz: `Kategorie/` i `Produkty/` (jak w iter2)

## Po resecie — pierwszy krok

Otwórz Claude Code w `D:/cursor/netim-seo-os/klienci/kobi-meble/`, powiedz: "kontynuuj iter3 kobi z SESJA-2026-05-25-PROGRESS.md, zacznij od pisania kategorii". Mamy wszystkie fakty offline, nie trzeba znów scrapować.

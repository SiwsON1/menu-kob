# Plan: Humanizacja + audyt 3x dla 6 artykulow blog KOBI (czerwiec 2026)

Data: 2026-05-26 v2
Cel: zhumanizowac 6 artykulow z v1 (teksty/blog/2026-06/) → wersja v2 (teksty/blog/2026-06-v2/) bez "AI fluffu", z wyraznym POV usera, konkretami zamiast ogolnikow.

## Audyt 3-pass per artykul (zgodnie z feedback-audit-3x.md)

**Pass 1 — Brand + Style (zgodnosc z KOBI):**
- 0 zakazow A1 wiedza-biznesowa.md: NIE "lozka KOBI maja X", NIE "stelaz FLEX z listew", NIE "wysylka 48h", NIE dynamiczne liczby
- Styl wg benchmark `plans/blog-kobi-2026-06-benchmark.md` — H1+H2 wprowadzenie+5-7 sekcji+FAQ+footer
- Linki do produktow/kategorii zachowane

**Pass 2 — EAV + Slownik konkretow:**
- Czy sa konkretne atrybuty: wymiar (160x80), grubosc (16 mm), obciazenie (110 kg), wysokosc (70-115 cm)
- Czy CTA wystepuje w footer (sprzedazowy: "Sprawdz", "Zobacz", "Wybierz")
- Czy cecha → korzysc (np. "barierka demontowalna" → "moze byc zdjeta gdy dziecko podrosnie")

**Pass 3 — LLM-fluff + dlugosc:**
- Znajdz frazy generic "Wybor odpowiedniego X to wazna decyzja...", "Warto pamietac, ze..."
- Hedge'owanie: "moze sie zdarzyc, ze...", "czasami warto rozwazyc..." → konkretne "rob X", "warto Y"
- Pasywizmy → POV usera ("Mozna ustawic" → "Mozesz ustawic")
- Powtorzenia bold-fraz target keyword (>15x = przesyt) → ogranicz do 8-12x
- Variation paragraph length: niektore 1 zdaniowe, niektore 3-4 zdaniowe (mix)

## Zasady humanizacji KOBI (DOSTOSOWANE — NIE seomantyczny/mebloweporady)

KOBI to IdoSell, klient recenzuje w docx → BEZ HTML komponentow inline (sm-*, accordion, hero). Trzymamy MD format z benchmarka.

Co konkretnie zmieniac:
1. **Pierwszy paragraf intro** — zacznij od KONKRETNEJ sytuacji rodzica/uzytkownika (nie "Wybor odpowiedniego..."). Np: "Kiedy syn skonczyl 5 lat, lozeczko niemowlece przestalo wystarczac" lub "Pokoj dziewczynki 8 m² to czesta sytuacja w mieszkaniach blokowych"
2. **Drugi os. liczba pojedyncza** ("Mozesz", "Wybierzesz", "Sprawdzisz") zamiast 3 os. ("Mozna", "Klient wybiera", "Sprawdza sie")
3. **Konkretne wymiary/wagi/liczby** zamiast ogolnikow ("dla starszego dziecka" → "dla dziecka 7-10 lat / 125-145 cm wzrostu")
4. **Mix dlugosci paragrafow** — 1-zdaniowe sentence (rzadko, dla emphasis) + 3-4 zdaniowe (standard)
5. **Mniej "warto"/"powinno"** — wiecej "wybierz X", "ustaw Y", "kup Z"
6. **Wyciagnij 1-2 "rodzice mowia, ze..." anegdoty** per artykul (gdzie pasuje)
7. **Zachowaj cala strukture** (H1/H2 outline, FAQ pytania, footer) — humanizacja to REWRITE paragrafow, nie outline'u

## ZACHOWUJEMY (BEZ ZMIAN):

- Wszystkie nagłowki H1/H2 (tytuly tak samo)
- Linki internal (produkty/kategorie)
- FAQ pytania (jak w v1)
- Footer "**Artykul przygotowany przez zespol KOBI s.c.**"
- Lista produktow KOBI per art (AUTO, EMMA, ERYK, LEO, DUBI, FLEXI, VERTO, HELIOS, ELISS)
- Konstrukcyjne fakty z wiedza-biznesowa.md (110 kg, 24 mc gwarancji, 3-5 dni wysylki, stelaz z elastycznych listew brzozowych - system FLEX)

## Workflow per artykul

1. Read v1: `teksty/blog/2026-06/<slug>.md`
2. Codex brief: `plans/codex-blog-2026-06/audit-<X>.md` (link do v1 + audit 3x checklist + reguly humanizacji)
3. Codex exec: zapisz v2 do `teksty/blog/2026-06-v2/<slug>.md`
4. Claude QA: sprawdz zachowanie outline, zachowanie FAQ, 0 zakazow, polskie znaki, wzrost % konkretu
5. Generate-docs: dodac `teksty/blog/2026-06-v2` do DIRS, regenerowac docxy z suffix `-v2`
6. Upload do Drive subfolder "Blog 2026-06 v2 humanized"

## Lista 6 artykulow do humanizacji

| Slug v1 | Słów v1 | Cel v2 |
|---|---:|---:|
| lozko-dzieciece-z-barierka-bezpieczenstwo-do-jakiego-wieku | 1592 | 1500-1700 |
| wysokosc-biurka-dla-dziecka-tabela-cm-wzrost | 1200 | 1100-1300 |
| lozko-pietrowe-w-malym-pokoju-dzieciecym-jak-rozplanowac | 1539 | 1400-1700 |
| lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy | 1779 | 1700-1900 |
| pokoj-dziewczynki-meble-kolor-pelen-przewodnik | 2106 | 2000-2200 |
| materac-kokos-do-lozka-dzieciecego-opinie-kiedy-warto | 1100 | 1000-1200 |

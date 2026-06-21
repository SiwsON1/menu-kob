# Audyt 3x + humanizacja artykulu blogowego KOBI

ZADANIE: Przeczytaj plik `teksty/blog/2026-06/lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy.md` (wersja v1). Wykonaj audyt 3-pass + napisz zhumanizowana wersje v2 do pliku `teksty/blog/2026-06-v2/lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy.md`.

## Kontekst
- Klient: KOBI (meblekobi.pl), platforma IdoSell
- Czytelnik docelowy: rodzice nastolatkow
- Produkty wymienione w artykule: AUTO/ERYK/HELIOS
- Docelowa dlugosc v2: 1700-1900 slow
- Format: Markdown, encoding UTF-8 BEZ BOM, polskie znaki w 100% miejsc

## Pass 1 — Brand + Style (NIE LAMAC)
- Zachowaj 0 zakazow A1: NIE "lozka KOBI maja X", NIE "wszystkie nasze modele", NIE "produkcji KOBI"
- Zachowaj: "stelaz z elastycznych listew brzozowych – system FLEX" (NIE "FLEX z elastycznych listew")
- Zachowaj: "wysylka 3-5 dni roboczych" (NIE "48h")
- BEZ dynamicznych liczb (412 modeli) — uzywaj "szeroka oferta"
- Em-dashy "—" / polish dash "–" TYLKO w H1/H2, NIE w bodytext

## Pass 2 — EAV + Slownik konkretow
- Zachowaj WSZYSTKIE konkretne atrybuty z v1: wymiary (140x70, 160x80, 180x80), grubosci (16/18 mm), obciazenie (110 kg, 220 kg HELIOS), wysokosci (70-115 cm FLEXI), materace (7 cm pianka, upgrade pianka+kokos), gwarancja (24 mc)
- CTA w footer: "Sprawdz", "Zobacz", "Wybierz" (sprzedazowy, ale informacyjny — to BLOG)
- Cecha → korzysc: jezeli v1 mowi tylko "barierka demontowalna", w v2 dodaj "co znaczy ze mozesz ja zdjac gdy dziecko podrosnie i lozko sluzy dalej"

## Pass 3 — LLM-fluff + dlugosc + POV (GLOWNA HUMANIZACJA)

USUN te frazy generic:
- "Wybor odpowiedniego X to wazna decyzja"
- "Warto pamietac, ze..."
- "Nie zapominaj o tym, ze..."
- "To szczegolnie wazne w przypadku..."
- "Coraz wiecej rodzicow szuka..."
- "Nowoczesne X powinny byc..."
- "Kluczowa zaleta jest..."
- "Liczy sie..."

ZMIEN na konkrety:
- "dla mlodszego dziecka" → "dla 3-5 latka o wzroscie 95-115 cm"
- "starszego dziecka" → "8-12 latka (135-150 cm wzrostu)"
- "wielu rodzicow" → "rodzice najczesciej" lub konkretny przyklad
- "mozna" → "mozesz" (POV uzytkownika, 2 os.)
- "warto rozwazyc" → "wybierz X" lub "porownaj X z Y"
- "moze sie zdarzyc" → "zdarza sie, ze..." lub usun hedge

ZACHOWAJ:
- Cala strukture H1 + H2 outline (te same naglowki co v1, NIE zmieniac)
- Wszystkie linki internal [tekst](url) z v1
- Wszystkie FAQ pytania z v1 (mozesz lekko zhumanizowac odpowiedzi)
- Footer "**Artykul przygotowany przez zespol KOBI s.c.**" + krotki paragraf

DODAJ:
- **Pierwszy paragraf intro** zacznij od KONKRETNEJ sytuacji rodzica (przyklad: "Kiedy dziecko skonczy 5 lat i lozeczko niemowlece przestaje wystarczac, pojawia sie pytanie o pierwsze pelnowymiarowe lozko"), NIE od "Wybor odpowiedniego..."
- **1-2 anegdoty/cytaty** "rodzice najczesciej mowia, ze..." lub "w opiniach klientow czesto przewija sie..."
- **Mix dlugosci paragrafow**: 60% paragrafow 2-3 zdania, 30% 3-4 zdania, 10% 1 zdanie (dla emphasis)
- **Bold target keyword 8-12 razy** (NIE 15+, NIE 5-)

## Format wyjsciowy

Zapisz v2 do pliku: `teksty/blog/2026-06-v2/lozko-mlodziezowe-dla-chlopca-jaki-model-na-ile-lat-starczy.md`

Encoding UTF-8 BEZ BOM. Polskie znaki diakrytyczne (a, c, e, l, n, o, s, z, z) w 100% miejsc (nagłowkach, bold, paragrafach, FAQ, footer).

Zaden inny output – po zapisaniu pliku zakoncz.

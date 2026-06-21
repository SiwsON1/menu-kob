# Kobi Meble — kontekst klienta

## Podstawowe dane

- **Nazwa firmy:** Kobi Meble (producent: KOBI)
- **Domena:** meblekobi.pl (alternatywnie kobisc.pl — ten sam asortyment)
- **Typ klienta:** E-commerce
- **CMS:** IdoSell
- **Zasięg:** ogólnopolski
- **Folder projektu:** `D:/cursor/netim-seo-os/klienci/kobi-meble/`

## Zasady pisania treści dla KOBI (NIE łamać)

### 1. Merytoryka — weryfikacja ze strony PRZED pisaniem

Każdy opis produktu lub kategorii musi być oparty na danych z aktualnej karty produktu/kategorii na meblekobi.pl. **Nigdy nie pisz z pamięci ani z samego briefa.**

Proces:
1. Przed pisaniem — WebFetch lub Agent pobiera kartę produktu/kategorii.
2. Zapisz fakty do pliku `fakty-ze-strony-YYYY-MM-DD.md` (wzorzec: `fakty-ze-strony-2026-04-20.md`).
3. Pisz opis tylko na podstawie udokumentowanych faktów.
4. Jeśli czegoś brakuje na karcie (np. max obciążenie) — **nie zgaduj**. Pomiń lub zaznacz `[brak danych]` do weryfikacji z klientem.

**Złe przykłady (tego nie robić):**
- Opis kategorii "meble ogrodowe" mówiący tylko o aluminium, gdy kategoria ma 40 produktów z 6 różnych materiałów.
- FAQ "ile waży NICEA" z wymyśloną wartością "7 kg", skoro na karcie nie podano wagi.
- Opis półkotapczana "140x200 cm" w kategorii, która ma 4 wymiary (90/120/140/160×200).
- Opisywanie produktu z innego wariantu (np. "Helios biały" podczas pisania "Helios szary").

### 2. Sprzedażowy ton (klient wyraźnie o to prosi 2026-04-20)

Klient ocenił pierwszą iterację (2026-04-12) tak:
- **Kategorie** — dobre, zachować styl (lead + zastosowanie + FAQ)
- **Produkty** — za mało sprzedażowe, za mało pod klientów końcowych

Wszystkie opisy pisz zgodnie ze skillem `pl-copywriter-ecommerce`:
- Lead / bluff z czasownikiem transakcyjnym ("Zamów", "Kup", "Sprawdź") i kluczową korzyścią + ceną
- Framework PEAVT (Predicate-Entity-Attributes-Values-Trust)
- Cecha → korzyść (zawsze)
- Min. 3 słowa transakcyjne per opis (słownik Słowika: kup, zamów, sprawdź, wybierz, dodaj do koszyka)
- Trust layer: gwarancja 24 mies., wysyłka 48h, producent PL
- CTA na końcu z czasownikiem transakcyjnym

### 3. Uwagi klienta — stosować literalnie, nie parafrazować

Gdy klient pisze w dokumencie uwagę typu:
- `( dodajemy : ... )` — dodaj tekst w nawiasie (po dwukropku) w podanym miejscu
- `( usunąć - nie na temat )` — usuń poprzedzający fragment
- `( proszę zmienić na to - ... )` — zastąp poprzedzający fragment tekstem po myślniku

Stosuj dokładnie, nie parafrazuj. To jest decyzja klienta, nie sugestia.

### 4. Stała wiedza o KOBI (wynika z analizy wielu kart produktów)

Używaj tych faktów w opisach — są spójne dla całej oferty:
- **Gwarancja:** 24 miesiące producenta
- **Wysyłka:** 48 h z magazynu w Polsce (dla produktów dostępnych)
- **Produkcja:** polski producent
- **Łóżka dziecięce 160×80:** nośność 110 kg, materac 7 cm piankowy z pokrowcem, stelaż FLEX z listew brzozowych sprężynujących, obrzeże PCV zaokrąglone, barierka demontowalna (montaż lewo/prawo)
- **Biurka serii FLEXI:** regulacja 70–115 cm, panel LED, pamięć 2 ustawień, system antykolizyjny
- **Półkotapczany VERTO:** 4 wymiary (90/120/140/160 × 200), 4 dekory (biały, kaszmir, szary, dąb artisan), max materac 20 cm, mechanizm siłowniki gazowe + blokada mechaniczna, zaczepy ścienne w zestawie, tylko do ściany nośnej

## Workflow tworzenia i publikacji treści

### Struktura folderów (konwencja dat)

```
teksty/
  kategorie/
    <slug>.md                  # pierwsza wersja
    YYYY-MM-DD/<slug>.md       # kolejne iteracje (po uwagach klienta)
  produkty/
    <slug>.md                  # pierwsza wersja
    YYYY-MM-DD/<slug>.md       # kolejne iteracje
docs/
  <slug>.docx                   # wygenerowane z najnowszej wersji
fakty-ze-strony-YYYY-MM-DD.md  # zebrane fakty przed pisaniem
```

### Po napisaniu / poprawkach

1. `node generate-docs.mjs` — generuje .docx z .md (z osadzonymi hyperlinkami)
2. `node upload-to-drive.mjs` — wgrywa .docx na Google Drive (folder "Kobi Meble") z datą w nazwie
3. Klient dostaje .docx do recenzji w Google Docs
4. Uwagi klienta wracają jako adnotacje w dokumencie Google Docs (na czerwono / w nawiasach)
5. **Nigdy** nie publikujesz bezpośrednio do IdoSell — klient robi to ręcznie

### Po otrzymaniu uwag od klienta

1. Utwórz folder `teksty/{kategorie|produkty}/YYYY-MM-DD/` z dzisiejszą datą
2. Pobierz treści z Google Drive z uwagami (mcp__claude_ai_Google_Drive__read_file_content)
3. Przepisz opisy uwzględniając uwagi LITERALNIE
4. Dodatkowo: zweryfikuj aktualne dane ze strony meblekobi.pl (WebFetch + zapis do `fakty-ze-strony-YYYY-MM-DD.md`)
5. Zastosuj skill `pl-copywriter-ecommerce` dla nowych wersji
6. Wygeneruj .docx i wgraj na Drive

## Instrukcje dla Claude Code

Przed pracą z tym klientem przeczytaj w tej kolejności:
1. **`frazy-master-2026-05-05.md`** — MASTER LISTA fraz z mailem klienta (zaakceptowane + ODRZUCONE). **Przed zaproponowaniem jakiejkolwiek frazy, tematu artykułu, opisu produktu czy kategorii — sprawdź sekcję "🚫 ODRZUCONE". Jeśli fraza tam jest, NIE używaj jej i napisz dlaczego (np. "klient wykluczył w mailu z 2026-05-04 bo X").** Jeśli fraza jest podobna do odrzuconej (inna wersja wymiaru typu 80x160 zamiast 160x80, dziecięca tapicerka, akcesoria dla zwierząt) — flaga: zapytaj klienta przed pisaniem.
2. **`wiedza-biznesowa.md`** — JEDNO ŹRÓDŁO PRAWDY. Zasady biznesowe (A), fakty techniczne produktów (B), linki (C), workflow (D), historia uwag (E). Aktualizuj po każdej recenzji klienta.
3. `fakty-ze-strony-YYYY-MM-DD.md` (jeśli istnieje) — aktualne dane z sklepu z ostatniego scrapowania
4. `raport-uwagi-klienta-YYYY-MM-DD.md` (jeśli istnieje) — wyekstrahowane czerwone adnotacje z Google Docs
5. `klient.md` — firma, CSI, środowisko techniczne
6. `wiedza-firmowa/typy-klientow/ecommerce.md` — instrukcje per typ klienta

**KLUCZOWA ZASADA:** KOBI sprzedaje też produkty firm zewnętrznych — tego klientom końcowym NIE WOLNO zdradzać. Szczegóły w `wiedza-biznesowa.md` sekcja A1.

Używaj skilli:
- `pl-copywriter-ecommerce` — opisy produktów i kategorii
- `pl-humanizer` — po napisaniu, jeśli tekst brzmi "AI-owo"
- `bluf-generator` — do samego leada, jeśli potrzebujesz zagęścić otwarcie
- `eav-extractor` — audyt czyjegoś tekstu lub własnej wersji

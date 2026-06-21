$ErrorActionPreference = 'Stop'

$source = 'C:\Users\mahin\Downloads\Raport SEO Kwiecień - Meblekobi.docx'
$output = Join-Path $PSScriptRoot 'Raport SEO Maj 2026 - Meblekobi.docx'
$temp = Join-Path ([IO.Path]::GetTempPath()) ('kobi-report-' + [guid]::NewGuid())

$categories = @(
    @('Komody', 'https://meblekobi.pl/pl/menu/komody-157.html'),
    @('Łóżka młodzieżowe', 'https://meblekobi.pl/pl/menu/lozka-mlodziezowe-174.html'),
    @('Łóżka tapicerowane', 'https://meblekobi.pl/pl/menu/lozka-tapicerowane-619.html'),
    @('Szafy', 'https://meblekobi.pl/pl/menu/szafy-273.html'),
    @('Łóżka pojedyncze', 'https://meblekobi.pl/pl/menu/lozka-pojedyncze-153.html'),
    @('Szafy dziecięce', 'https://meblekobi.pl/pl/menu/szafy-dzieciece-175.html'),
    @('Toaletki', 'https://meblekobi.pl/pl/menu/toaletki-577.html'),
    @('Stoły', 'https://meblekobi.pl/pl/menu/stoly-166.html'),
    @('Szafki łazienkowe', 'https://meblekobi.pl/pl/menu/szafki-lazienkowe-169.html'),
    @('Szafki RTV', 'https://meblekobi.pl/pl/menu/szafki-rtv-158.html'),
    @('Wieszaki', 'https://meblekobi.pl/pl/menu/wieszaki-164.html'),
    @('Materace pianka-kokos', 'https://meblekobi.pl/pl/menu/pianka-kokos-557.html')
)

$products = @(
    @('Biurko FLEXI 140 cm dąb artisan / czarne', 'https://meblekobi.pl/pl/products/biurko-flexi-140-cm-regulowane-podnoszone-elektryczne-komputerowe-dab-artisan-czarny-14708.html'),
    @('Łóżko AUTO Batcar / Speed 160x80', 'https://meblekobi.pl/pl/products/lozko-dzieciece-z-serii-auto-160x80-grafika-materac-speed-13816.html'),
    @('Łóżko AUTO Turbo 4x4', 'https://meblekobi.pl/pl/products/lozko-dzieciece-z-serii-auto-140x70-grafika-materac-turbo-4x4-13817.html'),
    @('Łóżko podwójne EMMA II 160x80', 'https://meblekobi.pl/pl/products/lozko-podwojne-emma-ii-160x80-biale-rozowe-4509.html'),
    @('Łóżko podwójne HELIOS 200x160 z różowymi panelami', 'https://meblekobi.pl/pl/products/lozko-podwojne-helios-200x160-biale-panele-rozowe-12101.html'),
    @('Łóżko dziecięce KARETA 160x80', 'https://meblekobi.pl/pl/products/lozko-dzieciece-kareta-160x80-13971.html'),
    @('Łóżko LEO Montessori 160x80 bez materaca', 'https://meblekobi.pl/pl/products/lozko-dzieciece-leo-montessori-160x80-barierka-ochronna-bez-materaca-bialy-15438.html'),
    @('Materac NIKO piankowy 80x200', 'https://meblekobi.pl/pl/products/materac-niko-piankowy-z-pokrowcem-80x200-cm-15270.html'),
    @('Półkotapczan VERTO 90x200 biały', 'https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-90x200-skladany-w-szafe-bialy-14787.html'),
    @('Półkotapczan VERTO 120x200 biały', 'https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-120x200-skladany-w-szafe-bialy-14791.html'),
    @('Półkotapczan VERTO 160x200 biały', 'https://meblekobi.pl/pl/products/polkotapczan-pionowy-rozkladany-verto-160x200-skladany-w-szafe-bialy-14799.html'),
    @('Regał BARI 103 cm dąb Vicenza', 'https://meblekobi.pl/pl/products/regal-bari-103-cm-dab-vicenza-15172.html'),
    @('Regał JAPANDI 104 cm kaszmir', 'https://meblekobi.pl/pl/products/regal-japandi-104-cm-kaszmir-15092.html'),
    @('Szafka na buty ANDY z siedziskiem i wieszakiem', 'https://meblekobi.pl/pl/products/szafka-na-buty-z-siedziskiem-i-wieszakiem-andy-13794.html'),
    @('Szafka nocna MELI biała', 'https://meblekobi.pl/pl/products/szafka-nocna-meli-skandynawska-kolor-bialy-14529.html'),
    @('Toaletka RUBI z lustrem i siedziskiem', 'https://meblekobi.pl/pl/products/toaletka-rubi-z-lustrem-i-siedziskiem-biala-15660.html'),
    @('Zestaw półek CHMURKI biały', 'https://meblekobi.pl/pl/products/zestaw-3-polek-dzieciecych-chmurki-biale-11361.html'),
    @('Zestaw półek LEWIT dąb craft', 'https://meblekobi.pl/pl/products/zestaw-3-polek-samowiszacych-lewit-dab-craft-13829.html'),
    @('Konsola MELI różowa', 'https://meblekobi.pl/pl/products/konsola-meli-z-szuflada-skandynawska-boho-kolor-roz-13865.html'),
    @('Szafa STELLA Sweet Bear', 'https://meblekobi.pl/pl/products/szafa-stella-dwudrzwiowa-z-szuflada-i-grafika-sweet-bear-bialy-15443.html'),
    @('Stół rozkładany GUSTO dąb craft', 'https://meblekobi.pl/pl/products/stol-gusto-rozkladany-dab-craft-15658.html'),
    @('Zestaw łazienkowy AURA', 'https://meblekobi.pl/pl/products/zestaw-mebli-lazienkowych-aura-9087.html'),
    @('Komoda VENUS 73x137 kaszmir', 'https://meblekobi.pl/pl/products/komoda-venus-73x137-kaszmir-13391.html'),
    @('Komoda dziecięca EMILY biała / różowe uchwyty', 'https://meblekobi.pl/pl/products/komoda-dziecieca-emily-biala-uchwyty-rozowe-9740.html'),
    @('Łóżko NORDI 90x200 z drewna sosnowego', 'https://meblekobi.pl/pl/products/lozko-nordi-90x200-drewno-sosnowe-15225.html'),
    @('Szafka na buty ANDY różowa', 'https://meblekobi.pl/pl/products/szafka-na-buty-z-siedziskiem-i-wieszakiem-andy-rozowa-13793.html'),
    @('Szafka RTV FOCUS 135 loft', 'https://meblekobi.pl/pl/products/szafka-rtv-focus-135-loft-12922.html'),
    @('Materac MILO pianka / kokos / VISCO 160x80', 'https://meblekobi.pl/pl/products/materac-milo-pianka-kokos-visco-160x80-14784.html')
)

function Get-ParagraphText {
    param([System.Xml.XmlNode]$Paragraph, [System.Xml.XmlNamespaceManager]$Ns)
    return (($Paragraph.SelectNodes('.//w:t', $Ns) | ForEach-Object { $_.InnerText }) -join '')
}

function New-Paragraph {
    param(
        [xml]$Document,
        [string]$Text,
        [bool]$Bold = $false,
        [int]$Before = 0,
        [int]$After = 80
    )

    $ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    $p = $Document.CreateElement('w', 'p', $ns)
    $isHeading = $Text -match '^2\. Działania SEO'
    $pPr = $Document.CreateElement('w', 'pPr', $ns)
    $spacing = $Document.CreateElement('w', 'spacing', $ns)
    $spacing.SetAttribute('after', $ns, $(if ($isHeading) { '46' } else { '87' })) | Out-Null
    $spacing.SetAttribute('line', $ns, $(if ($isHeading) { '260' } else { '265' })) | Out-Null
    $spacing.SetAttribute('lineRule', $ns, 'auto') | Out-Null
    $pPr.AppendChild($spacing) | Out-Null
    if (-not $isHeading) {
        $indent = $Document.CreateElement('w', 'ind', $ns)
        $indent.SetAttribute('left', $ns, '355') | Out-Null
        $indent.SetAttribute('firstLine', $ns, '0') | Out-Null
        $pPr.AppendChild($indent) | Out-Null
    }
    $paragraphRunProperties = $Document.CreateElement('w', 'rPr', $ns)
    $paragraphFonts = $Document.CreateElement('w', 'rFonts', $ns)
    foreach ($fontAttribute in @('ascii', 'cs', 'eastAsia', 'hAnsi')) {
        $paragraphFonts.SetAttribute($fontAttribute, $ns, 'Poppins') | Out-Null
    }
    $paragraphRunProperties.AppendChild($paragraphFonts) | Out-Null
    $pPr.AppendChild($paragraphRunProperties) | Out-Null
    $p.AppendChild($pPr) | Out-Null

    $r = $Document.CreateElement('w', 'r', $ns)
    $rPr = $Document.CreateElement('w', 'rPr', $ns)
    $fonts = $Document.CreateElement('w', 'rFonts', $ns)
    foreach ($fontAttribute in @('ascii', 'cs', 'eastAsia', 'hAnsi')) {
        $fonts.SetAttribute($fontAttribute, $ns, 'Poppins') | Out-Null
    }
    $rPr.AppendChild($fonts) | Out-Null
    if ($Bold -or $isHeading) {
        $b = $Document.CreateElement('w', 'b', $ns)
        $b.SetAttribute('val', $ns, '1') | Out-Null
        $bCs = $Document.CreateElement('w', 'bCs', $ns)
        $bCs.SetAttribute('val', $ns, '1') | Out-Null
        $rPr.AppendChild($b) | Out-Null
        $rPr.AppendChild($bCs) | Out-Null
    }
    if ($isHeading) {
        $size = $Document.CreateElement('w', 'sz', $ns)
        $size.SetAttribute('val', $ns, '28') | Out-Null
        $sizeCs = $Document.CreateElement('w', 'szCs', $ns)
        $sizeCs.SetAttribute('val', $ns, '28') | Out-Null
        $rPr.AppendChild($size) | Out-Null
        $rPr.AppendChild($sizeCs) | Out-Null
    }
    $r.AppendChild($rPr) | Out-Null
    $t = $Document.CreateElement('w', 't', $ns)
    $t.SetAttribute('space', 'http://www.w3.org/XML/1998/namespace', 'preserve') | Out-Null
    $t.InnerText = $Text
    $r.AppendChild($t) | Out-Null
    $p.AppendChild($r) | Out-Null
    return (, $p)
}

function New-LinkParagraph {
    param(
        [xml]$Document,
        [string]$Url,
        [string]$RelationshipId,
        [int]$After = 40
    )

    $wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    $rNs = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    $p = $Document.CreateElement('w', 'p', $wNs)
    $pPr = $Document.CreateElement('w', 'pPr', $wNs)
    $spacing = $Document.CreateElement('w', 'spacing', $wNs)
    $spacing.SetAttribute('after', $wNs, '87') | Out-Null
    $spacing.SetAttribute('line', $wNs, '265') | Out-Null
    $spacing.SetAttribute('lineRule', $wNs, 'auto') | Out-Null
    $pPr.AppendChild($spacing) | Out-Null
    $indent = $Document.CreateElement('w', 'ind', $wNs)
    $indent.SetAttribute('left', $wNs, '355') | Out-Null
    $indent.SetAttribute('firstLine', $wNs, '0') | Out-Null
    $pPr.AppendChild($indent) | Out-Null
    $paragraphRunProperties = $Document.CreateElement('w', 'rPr', $wNs)
    $paragraphFonts = $Document.CreateElement('w', 'rFonts', $wNs)
    foreach ($fontAttribute in @('ascii', 'cs', 'eastAsia', 'hAnsi')) {
        $paragraphFonts.SetAttribute($fontAttribute, $wNs, 'Poppins') | Out-Null
    }
    $paragraphRunProperties.AppendChild($paragraphFonts) | Out-Null
    $pPr.AppendChild($paragraphRunProperties) | Out-Null
    $p.AppendChild($pPr) | Out-Null

    $labelRun = $Document.CreateElement('w', 'r', $wNs)
    $labelRunProperties = $Document.CreateElement('w', 'rPr', $wNs)
    $labelFonts = $Document.CreateElement('w', 'rFonts', $wNs)
    foreach ($fontAttribute in @('ascii', 'cs', 'eastAsia', 'hAnsi')) {
        $labelFonts.SetAttribute($fontAttribute, $wNs, 'Poppins') | Out-Null
    }
    $labelRunProperties.AppendChild($labelFonts) | Out-Null
    $labelRun.AppendChild($labelRunProperties) | Out-Null
    $labelText = $Document.CreateElement('w', 't', $wNs)
    $labelText.SetAttribute('space', 'http://www.w3.org/XML/1998/namespace', 'preserve') | Out-Null
    $labelText.InnerText = '    '
    $labelRun.AppendChild($labelText) | Out-Null
    $p.AppendChild($labelRun) | Out-Null

    $hyperlink = $Document.CreateElement('w', 'hyperlink', $wNs)
    $hyperlink.SetAttribute('id', $rNs, $RelationshipId) | Out-Null
    $linkRun = $Document.CreateElement('w', 'r', $wNs)
    $linkRunProperties = $Document.CreateElement('w', 'rPr', $wNs)
    $linkFonts = $Document.CreateElement('w', 'rFonts', $wNs)
    foreach ($fontAttribute in @('ascii', 'cs', 'eastAsia', 'hAnsi')) {
        $linkFonts.SetAttribute($fontAttribute, $wNs, 'Poppins') | Out-Null
    }
    $linkRunProperties.AppendChild($linkFonts) | Out-Null
    $color = $Document.CreateElement('w', 'color', $wNs)
    $color.SetAttribute('val', $wNs, '1155cc') | Out-Null
    $underline = $Document.CreateElement('w', 'u', $wNs)
    $underline.SetAttribute('val', $wNs, 'single') | Out-Null
    $linkRunProperties.AppendChild($color) | Out-Null
    $linkRunProperties.AppendChild($underline) | Out-Null
    $linkRun.AppendChild($linkRunProperties) | Out-Null
    $linkText = $Document.CreateElement('w', 't', $wNs)
    $linkText.InnerText = $Url
    $linkRun.AppendChild($linkText) | Out-Null
    $hyperlink.AppendChild($linkRun) | Out-Null
    $p.AppendChild($hyperlink) | Out-Null

    return (, $p)
}

function Add-HyperlinkRelationship {
    param(
        [xml]$RelationshipsDocument,
        [string]$Id,
        [string]$Url
    )

    $packageNs = 'http://schemas.openxmlformats.org/package/2006/relationships'
    $relationship = $RelationshipsDocument.CreateElement('Relationship', $packageNs)
    $relationship.SetAttribute('Id', $Id) | Out-Null
    $relationship.SetAttribute('Type', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink') | Out-Null
    $relationship.SetAttribute('Target', $Url) | Out-Null
    $relationship.SetAttribute('TargetMode', 'External') | Out-Null
    $RelationshipsDocument.DocumentElement.AppendChild($relationship) | Out-Null
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Directory]::CreateDirectory($temp) | Out-Null

try {
    [IO.Compression.ZipFile]::ExtractToDirectory($source, $temp)
    $documentPath = Join-Path $temp 'word\document.xml'
    $relationshipsPath = Join-Path $temp 'word\_rels\document.xml.rels'
    [xml]$doc = Get-Content -LiteralPath $documentPath -Raw -Encoding UTF8
    [xml]$relationshipsDoc = Get-Content -LiteralPath $relationshipsPath -Raw -Encoding UTF8

    $ns = New-Object Xml.XmlNamespaceManager($doc.NameTable)
    $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    $body = $doc.SelectSingleNode('//w:body', $ns)
    $paragraphs = @($body.SelectNodes('./w:p', $ns))

    $title = $paragraphs | Where-Object { (Get-ParagraphText $_ $ns) -eq 'Raport SEO Kwiecień 2026' } | Select-Object -First 1
    if ($title) {
        $titleText = $title.SelectSingleNode('.//w:t', $ns)
        $titleText.InnerText = 'Raport SEO Maj 2026'
    }

    $start = $paragraphs | Where-Object { (Get-ParagraphText $_ $ns) -match '^2\. Działania SEO' } | Select-Object -First 1
    $end = $paragraphs | Where-Object { (Get-ParagraphText $_ $ns) -eq 'Terminy użyte w specyfikacji' } | Select-Object -First 1
    if (-not $start -or -not $end) {
        throw 'Nie znaleziono granic sekcji Działania SEO.'
    }

    $cursor = $start
    while ($cursor -and $cursor -ne $end) {
        $next = $cursor.NextSibling
        $body.RemoveChild($cursor) | Out-Null
        $cursor = $next
    }

    $relationshipNumbers = @($relationshipsDoc.DocumentElement.ChildNodes | ForEach-Object {
        if ($_.Id -match '^rId(\d+)$') { [int]$matches[1] }
    })
    $nextRelationshipNumber = (($relationshipNumbers | Measure-Object -Maximum).Maximum) + 1

    $paragraph = New-Paragraph -Document $doc -Text '2. Działania SEO wykonane od poprzedniego raportu do 15 czerwca 2026' -Bold $true -Before 120 -After 160
    $body.InsertBefore($paragraph, $end) | Out-Null

    $paragraph = New-Paragraph -Document $doc -Text '● Opracowano i zoptymalizowano 12 opisów kategorii. Treści przygotowano pod intencje zakupowe, nagłówki H2, sekcje doradcze, FAQ oraz linkowanie wewnętrzne. Adresy stron docelowych:' -Bold $true -Before 80 -After 100
    $body.InsertBefore($paragraph, $end) | Out-Null
    foreach ($item in $categories) {
        $relationshipId = "rId$nextRelationshipNumber"
        $nextRelationshipNumber++
        Add-HyperlinkRelationship -RelationshipsDocument $relationshipsDoc -Id $relationshipId -Url $item[1]
        $paragraph = New-LinkParagraph -Document $doc -Url $item[1] -RelationshipId $relationshipId
        $body.InsertBefore($paragraph, $end) | Out-Null
    }

    $paragraph = New-Paragraph -Document $doc -Text '● Opracowano, poprawiono i zweryfikowano 28 opisów produktów. Teksty obejmują język korzyści, parametry techniczne, zastosowania, FAQ oraz informacje zgodne z kartami produktowymi. Adresy stron docelowych:' -Bold $true -Before 160 -After 100
    $body.InsertBefore($paragraph, $end) | Out-Null
    foreach ($item in $products) {
        $relationshipId = "rId$nextRelationshipNumber"
        $nextRelationshipNumber++
        Add-HyperlinkRelationship -RelationshipsDocument $relationshipsDoc -Id $relationshipId -Url $item[1]
        $paragraph = New-LinkParagraph -Document $doc -Url $item[1] -RelationshipId $relationshipId
        $body.InsertBefore($paragraph, $end) | Out-Null
    }

    $lines = @(
        @('● Przeprowadzono analizę i uporządkowanie fraz kluczowych:', $true, 160, 60),
        @('   - zbudowano główną listę fraz dla kategorii i produktów;', $false, 0, 40),
        @('   - uwzględniono uwagi klienta oraz rozdzielono 229 fraz zaakceptowanych i 58 fraz odrzuconych;', $false, 0, 40),
        @('   - przeanalizowano intencje wyszukiwania, potencjał long-tail i ryzyko kanibalizacji;', $false, 0, 40),
        @('   - przygotowano materiał do dalszego monitoringu pozycji i rozwoju widoczności.', $false, 0, 80),
        @('● Wykonano wieloetapową kontrolę jakości treści:', $true, 160, 60),
        @('   - porównano opisy z informacjami na aktualnych kartach produktów;', $false, 0, 40),
        @('   - zweryfikowano parametry, wymiary, warianty, wyposażenie zestawów i nazewnictwo;', $false, 0, 40),
        @('   - przeprowadzono audyty SEO, czytelności i zgodności opisów kategorii oraz produktów;', $false, 0, 40),
        @('   - wprowadzono poprawki wynikające z uwag klienta i usunięto informacje, których nie potwierdzała oferta sklepu.', $false, 0, 80),
        @('● Opracowano linkowanie wewnętrzne dla przygotowanych treści:', $true, 160, 60),
        @('   - przygotowano linkowanie dla 12 opisów kategorii i 28 opisów produktów;', $false, 0, 40),
        @('   - zaplanowano kontekstowe odnośniki między kategoriami, produktami i powiązanymi grupami asortymentu;', $false, 0, 40),
        @('   - przygotowano propozycje danych strukturalnych FAQ dla treści zawierających sekcje pytań i odpowiedzi.', $false, 0, 80)
    )
    foreach ($line in $lines) {
        $paragraph = New-Paragraph -Document $doc -Text $line[0] -Bold $line[1] -Before $line[2] -After $line[3]
        $body.InsertBefore($paragraph, $end) | Out-Null
    }

    $settings = New-Object Xml.XmlWriterSettings
    $settings.Encoding = New-Object Text.UTF8Encoding($false)
    $settings.Indent = $false
    $writer = [Xml.XmlWriter]::Create($documentPath, $settings)
    try {
        $doc.Save($writer)
    }
    finally {
        $writer.Dispose()
    }

    $relationshipsWriter = [Xml.XmlWriter]::Create($relationshipsPath, $settings)
    try {
        $relationshipsDoc.Save($relationshipsWriter)
    }
    finally {
        $relationshipsWriter.Dispose()
    }

    if (Test-Path -LiteralPath $output) {
        Remove-Item -LiteralPath $output -Force
    }
    [IO.Compression.ZipFile]::CreateFromDirectory($temp, $output, [IO.Compression.CompressionLevel]::Optimal, $false)
    Write-Output $output
}
finally {
    if (Test-Path -LiteralPath $temp) {
        Remove-Item -LiteralPath $temp -Recurse -Force
    }
}

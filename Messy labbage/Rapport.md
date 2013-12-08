# Rapport

## Optimering

Att mäta tider blir inte så precist då mina två webbhotell inte har stöd för SQLite och PDO, jag kör därför lokalt och försöker mäta så gått de går. I vissa fall gör jag ett eget exempel på webbhotellet.

### Rensat kod och minifierat css och js
Detta är egentligen flera regler i en och samma.

Mycket css och javascript har legat blandat med html:en, jag rensade det och stoppade in i separata filer. Sedan Lade jag all js/css i samma fil och minifierat den. Detta gör att jag minskar antalet filer med väldigt många! Mindre antal filer att hämta medför färre http-requests och alltså en snabbare laddtid. Att koden är komprimerad gör att storleken blir mindre och den går snabbare att hämta.
Källa: boken

Skillnaden ligger på cirka 3 sekunder i laddtid, den skillnaden beror framförallt på att en liten snutt css hämtades från en extern "seg" server. Jag kopierade ner den istället. Det bör ha blivit en viss skillnad ändå dock.

### Jquery med cdn
Istället för att hämta jquery från min egen server hämtar jag den från googles snabba och pålitliga servrar så kan jag spara tid.
Källa: boken

Eftersom jag bara kan köra lokalt med SQLite och PDO så la jag upp en tom sida bara för att testa jquery publikt. Här är resultaten.
utan cdn: ca 21ms
med cdn: ca 13ms

Här kan det skilja en del beroende på var min sitter men även för mig går det snabbare att hämta från cdn. Har man en populär webbsida kan man avbelasta sin server lite med hjälp av detta också

### Cachar bilder, css och js
Lägger till Expires i headern för att chacha filer med en viss filtyp. Sparar i 10 år, för att ändra något får jag ändra namn.
Källa: boken

Gick ner 100 ms på en annan testsida med endast tre saker inlänkade.

Har man mycket statiskt innehåll kan detta spara väldigt mycket laddtid då man slipper in och hämta tillexempel bilder på servern. css och js-filer ändras sällan så dessa bör alltid cachas

### G-zip
Mitt webbhotell kör litespeed istället för Apache så denna fungerar inte på samma sätt, jag har ändå ändrat i .htaccess-filen som återfinns på github.

Att komprimera vissa filer gör dom minde vilket gör att det går snabbare att hämta dom. Om en fil är för liten är det inte värt att komprimera den då det tar mer kraft att zippa upp den. Man bör hålla sig filer större än 1KB. Man bör hålla sig till js och css-filer.
Källa: boken
Källa: http://www.samaxes.com/2008/04/htaccess-gzip-and-cache-your-site-for-faster-loading-and-bandwidth-saving/

### JS i botten av sidan
Jag har flyttat alla script till botten av sidan. Skripten sätter allt som kommer efter på vänt så om det är ett stort skript kan det ta en liten stund innan användaren får någon feedback. Även om den totala tiden inte skiljer speciellt mycket så får användaren en känsla av det.

### Inte kopiera variabler
Jag har tagit bort kopierade variabler. Se exempel
$name = "Andreas"
echo $name;
Detta är möjligtvis mer läsbart men kan ta upp betydligt mer minne än vad man tror. Om man läser in en textsträng på 512KB så blir detta istället 1MB.

Går inte att testa om det blir några prestandaförluster.

### Databasöppning
Tanken är att inte öppna databaskopplingen för varje fråga utan att hålla den öppen med applikationen körs. Nu är applikationen uppbyggd på ett sådant sätt att min lösning inte hjälper så mkt mer än reducerar ett par rader kod.

Jag har skapat en statisk klass som öppnar databasen när en fil laddas snarare än när en viss funktion körs. Det hade som sagt fungerat bättre med en mer objektorienterad lösning.

Koden blir också mer lättläst.

## Säkerhet

### XSS 
Formulär är inte skyddade mot script, jag kan därför stoppa in javascript där jag hämtar kakorna och skickar dom till min sida. Sen kan jag logga in på sidan med PHPSESSID.

Jag rensar input innan den används för att lösa problemet.

### SQL injections
SQL-satser är inte skyddade mot farlig data. Jag kan tillexempel skriva in nya sql-satser som droppar tabeller etc.

För att lösa detta använder jag mig av prepared-statements med platshållare för datat. Satsen körs och sen stoppas min data in.

### CSRF
Om jag loggar in på sidan sparas sessionen så att jag hålls inloggad. Om jag sen besöker en annan "ond sida" kan den komma åt den andra sidan eftersom sessionen finns kvar. Den "onda sidan" kan tillexempel ha en gömd iframe där den kallar på min sida och utför handlingar. Tillexempel skriver ett meddelande till en leverantör i detta fall.

För att lösa detta har jag skapat en csrf-klass som hanterar tokens. Varje gång ett formulär laddas genererar jag en unik token, jag sparar samtidigt den i sessionen. När formuläret postas jämför jag om token stämmer överens i session och i formulär.

### Datavalidering
För att en användare inte ska kunna stoppa in en oändlig mängd data i som sparas i databasen måste vi ha validering. Även tomsträngar är bra att validera mot eftersom databasen inte alltid kan ta emot sådant.

Jag ändrar textfältens maxlängd på klientsidan och validerar även med strlen() med serversidans php.

## Long Polling - Extrauppgift 1
Jag har använts mig av av long polling för att lösa den uppgift. Det går på ut på att jag kör en ajax-request med en timestamp som kallar på en php-funktion. Här jämför jag timestampen med den senaste ändringen i databasen hela tiden, requesten blir "pending". När ändringen är nyare än timestampen i urlen så printar jag ut den nya posten och börjar om.

Denna lösning gör att det blir väldigt smidigt för användaren att se sin nya data. Man kan vara säker på att man alltid har det senaste.
Vissa webbservrar är inte anpassade för detta, apache ska tydligen inte hantera denna threading så bra så att sidan kan bli seg. Däremot finns det andra serverlösningar som är betydligt bättre.

Min applikation är en aning buggig. Första gången man laddar en producent får man en dubblett tillexempel. Men konceptet fungerar.










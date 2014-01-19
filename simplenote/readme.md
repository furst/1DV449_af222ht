# Rapport simplenote-cms

## Inledning
Jag har skapat en applikation för att hämta data från tjänsten anteckningstjänsten simplenote. Datat används för att strukturera upp en hemsida med en blogg och undersidor.
Ett CMS med simplenote helt enkelt.

Jag fick idéen genom att jag har jobbat en del med kunder som vill ha enkla hemsidor med ett nyhetsflöde och undersidor med enkel information. Det allra flesta av dagens cms är alldeles för avancerade för dessa ändamål och kunden tycker ofta det är klurigt att förstå systemen. Jag har därför skapat detta som är superenkelt att använda och även funkar i mobilen genom en app. Man behöver aldrig röra sin sida egentligen.

## Användbart
Github: https://github.com/furst/1DV449_af222ht/tree/master/simplenote

Videoredovisning: http://youtu.be/U-11f3rSyuc

Körbar app mailar jag på måndag. Vill inte lägga lösen på github.

Skapa notes och sätt tagg published för att skapa en ny post och sätt tagg published och page för att skapa en ny sida.

Markdown används som formatering

Den första texten med taggen # används som rubrik, sätts inte den används de första 40 bokstäverna som skrivs istället.

## Flöde
För att hämta data från api:et behövs först en authentisiering genom epost och lösen som man postar till en viss url. Jag får då tillbaka en token som jag använda för att hämta data från mitt konto.

Applikation kör php och ramverket laravel på serversidan. Datat hämtas genom en getfunktion som är kopplad till en viss route. Den funktionen kollar sedan om det är dags att hämta nytt data från webservicen eller om datat ska hämtas från databasen. Data kan max hämtas 1 gång per femte minut från webservicen.

På klienten ligger backbone.js som hjälper till att strukturera javascript-koden. Den hämtar json-data via ett restful api jag skapat i laravel. Det datat läggs sedan ut på sidan på lämpligt sätt. Alla hämtningar sker asynkront.

När det är dags att hämta data från webservicen sker ytterligare ett asynkront anrop eftersom det tar lite längre tid. Det anropet sparar datat i databasen så att nästa gång men laddar om sidan finns det nya datat där.

All data finns laddat. När man vill gå in på en sida använder jag mig av html pushstate för att få en fin url fortfarande med samma data. Man kan även backa och gå framåt i webbläsaren och datat ändras.

Vid fel från webservicen får användaren ingen feedback utan data hämtas istället från databasen.

## Reflektion
Det har gått väldigt bra och har varit superroligt. Det är mycket lättare när man brinner för något. Jag är också väldigt förtjust i laravel och javascript så det har gjort saken ännu mer spännande.
Problem har framförallt varit med att autentisiera sig via tjänsterna, jag skulle först jobba med evernote men fick det inte riktigt att fungera som jag ville. Jag böt sedan till simplenote och det var faktiskt bättre och mer likt min idé. Det var fortfarande klurigt med autentisieringen men det gick till slut. Hade jag använt evernote hade jag troligtvis varit tvungen att hosta alla sidor som använder cmset.
Det varit även svårt att få till pushstatet men det gick till slut.

Jag har lärt mig väldigt mycket på vägen, framförallt mer om rest och javascript som jag är väldigt intresserad av. Det blir det garanterat mer av. Backbone gillar jag verkligen, koden blir väldigt vacker och är lätt att utöka utan att det blir rörigt.

Jag tänker också byta till cURL för att göra request snabbare.

Jag skulle ha velat implementera en bildfunktion, jag gjorde ett försök men det kunde omöjligt hållas inom ramarna av tiden vi fick på oss. Tanken var att kunde sätta en enkel tagg som sedan hämtar bilden från tillexempel flickr.

Min tanke är att troligtvis släppa cms:et som en gratis nedladdning för utvecklare som vill hjälpa sina kunder att ha ett enkelt och bra cms. Jag kommer även att använda till mina egna projekt i framtiden.
Jag hoppas jag kan lägga ut det som ett paket inom kort. Måste titta på licenser och sånt.

## Risker
Om något skulle ändras i api:et skulle applikationen fortfarande fungera men den skulle inte uppdatera datat på ett korrekt sätt. 

Man måste skriva in sina uppgifter till simplenote i en config-fil, det är dock väldigt säkrat där det ligger på servern. "Farliga" requests sköts även den på servern så att ingen auth-token skulle läcka.

Antal request till api:et blir inte speciellt många så det ska inte vara någon fara. Jag bör ändå prata med dom på simplenote.

## Betygshöjande
Jag anser att detta är en kul och nyskapande idé och det hoppas jag kan vara till någon hjälp.
Jag har implementerat lite överdrivet på klientsidan möjligtvis. Jag kunde lika gärna ha kört på php för att rendera datat och endast hämta från webservicen asynkront, men jag har gjort det för att visa att jag kan och för att jag vill lära mig mer om single-page appar.
Pushstate för att få fina url:er och att kunna backa mellan sidor anser jag kan vara betygshöjande.
Jag har gjort designen responsiv men det har inte vart så avancerat i detta fall.
Jag har skött en mer avancerat request till ett api med inloggning, och även tänkt på säkerheten för att inte data ska kunna kapas.









# Studio-afwerking, verhalen, Bluesky-handle en Mastodon-verificatie

## 0. Inloggen eerst veiligstellen
In deze versie van de code zit nog de automatisch toegevoegde aanmeldlaag van een andere dienst. Die toont de melding "Missing … SUPABASE_URL" en blokkeert de beveiligingscontrole bij inloggen. Ik haal hem weg. Inloggen loopt al via de eigen ROUT-sessiecookie (Neon + Better Auth).

## 1. Strakke icoontjes in alle Studio-tabbladen
- Er komt één herbruikbaar kopje: een lijn-icoon in een klein afgerond, gekleurd vakje, met de titel ernaast.
- Elk hoofdkopje krijgt dat kopje in plaats van een emoji: Inhoud, Vormgeving, Statistieken, Identiteit en Instellingen. Voorbeelden: Betalingen (kaart), Data & domein (archief), SEO (label), Handle & identiteit (link), Badges (medaille), Steunpagina (hart), Subdomeinen (globe), Bluesky (vlinder/@), QR, privacy & delen (QR), Analytics (grafiek).

## 2. Profiel-QR-code uit Instellingen weg
- Het blok "Profiel-QR" verdwijnt uit Instellingen.
- "QR, privacy & delen" bij Inhoud blijft de enige plek. Naast "Stijl & download profiel-QR" (gaat naar de QR-pagina) komen daar dezelfde deelacties die het oude blok had: delen via het deelmenu van je telefoon, link kopiëren en PNG/PDF downloaden. Die volgen je opgeslagen QR-stijl en verwijzen altijd naar je rout.be-profiel.

## 3. Knoppen & Typografie zoals Achtergrond & Visual FX
- De aparte vakjes "Knoppen aanpassen" en "Naam & typografie aanpassen" met schakelaar verdwijnen.
- Rechts naast de woorden KNOPVORM en TYPOGRAFIE staat nu het ronde aanpas-knopje, net als bij ROUT-presets. Klik je erop, dan klapt de fijnregeling eronder open. De bestaande instellingen blijven ongewijzigd bewaard.

## 4. Anonieme vragen als verhaal
- Bij het beantwoorden kies je per antwoord: **24 uur** of **blijvend**. Daarnaast kies je waar je antwoord verschijnt:
  - **ROUT-profiel**: staat standaard aan, kan uit.
  - **Instagram-status, Snapchat, WhatsApp-status**: met het label "Binnenkort". Automatisch plaatsen kan bij die diensten niet voor gewone accounts.
- Heb je een actief verhaal, dan krijgt je profielfoto een gekleurde ring. Bezoekers tikken erop en zien de antwoorden als verhaal: schermvullend, met voortgangsbalkjes, swipen of tikken om verder te gaan, en sluiten.
- Een verhaal van 24 uur verdwijnt daarna vanzelf van je profiel. Het antwoord blijft in je inbox staan en je kan het opnieuw tonen.
- Elk antwoord krijgt een knop **Delen als afbeelding**. Die maakt een staande verhaalkaart en opent het deelmenu van je telefoon, zodat je die zelf in Instagram, Snapchat of WhatsApp plaatst. Dit werkt nu al.

## 5. Bluesky-handle claimen: oorzaak gevonden
De code werkt: `jdelplanche.u.rout.be` geeft je DID netjes terug. Het probleem zit in de DNS-instellingen van rout.be bij Infomaniak:
- `*.u.rout.be` en `*.r.rout.be` werken.
- `*.rout.be` staat ingesteld als **TXT-record** met de waarden "ns1.vercel-dns.com / ns2.vercel-dns.com". Daardoor heeft `jdelplanche.rout.be` voor de rest van het internet geen adres, en Bluesky zegt zelf "Unable to resolve handle".
- Wat jij moet doen (dat kan ik niet zelf): verwijder die twee TXT-records op `*`. Dan heb je twee keuzes:
  - **(a)** Zet de nameservers van rout.be over naar Vercel. Dat is nodig voor een echte wildcard met https. Kopieer eerst je e-mailrecords.
  - **(b)** Voeg per root-handle een CNAME toe naar `cname.vercel-dns.com` en voeg dat subdomein toe in Vercel.
- In de code: de wizard geeft een duidelijke melding met de echte oorzaak ("dit subdomein heeft nog geen DNS-adres"), in plaats van "Kon handle niet verifiëren". Hij stelt voor om tijdelijk je werkende `.u.rout.be`-adres te gebruiken.

## 6. Mastodon-verificatie van je ROUT-profiel
- Mastodon vinkt een link groen af als de pagina een onzichtbare link `rel="me"` naar je Mastodon-account bevat (zoals op je screenshot).
- Je profielpagina (`naam.u.rout.be`, `naam.rout.be` en `rout.be/naam`) zet die link automatisch in de pagina zelf, voor elke Mastodon- of fediverse-account die je gekoppeld hebt. Je hoeft geen code te plakken.
- In Studio bij die koppeling komt een stappenkaartje: "Kopieer je profieladres → plak het in Mastodon bij Extra velden (verwijder en voeg opnieuw toe als het er al staat)", met een kopieerknop.

## Technische details
- `src/start.ts`: verwijder de `attachSupabaseAuth`-import en zet `functionMiddleware` op `[]`.
- Nieuw `src/components/studio/SectionTitle.tsx` (icon + label, semantische tokens). Toegepast in `ProfileEditor.tsx`, `ProfileThemePicker.tsx`, `DesignTabEditor.tsx` en de studio-accordions.
- QR: verwijder het `profile_qr`-item uit Instellingen. Haal de deel-, kopieer- en downloadlogica uit `ProfileQrCard` naar een compacte `ProfileQrShareActions` in het blok "QR, privacy & delen".
- Knoppen/typografie: de `SlidersHorizontal`-toggle naast de labels zet `buttonsCustom`/`typographyCustom`. De `Switch`-vakjes in `DesignButtonsTypographySection` verdwijnen.
- Database (nieuwe migratie `db/95_question_stories.sql`, idempotent, via `migrate-gateway`): `profile_questions` krijgt `story_until timestamptz null` (null = blijvend) en `share_targets text[] default '{rout}'`. Een publieke read geeft alleen verhalen terug die gepubliceerd zijn, nog niet verlopen zijn, van een publiek profiel komen en waarvoor `questionsEnabled` aan staat (server-side). Nieuw `src/lib/question-story-rules.ts` met een test voor 24 u vs blijvend.
- Verhaalviewer: `ProfileStoryRing` + `QuestionStoryViewer` in `src/components/profile`. De verhaalkaart wordt in de browser getekend (canvas, 1080×1920) en gedeeld via `navigator.share({ files })`, met een download als terugval.
- Bluesky: `testAtprotoDid`/`linkBlueskyHandle` doen een DNS-check. Bij geen A/CNAME krijg je de reden `no_dns` met een Nederlandse uitleg.
- Mastodon: de profielroute-`head()` krijgt `links: [{ rel: "me", href }]` uit de geverifieerde fediverse-integraties/social links (alleen https-URL's).
- Verificatie: `tsgo --noEmit`, `bunx vitest run`, en een preview-controle van Vormgeving/Instellingen op mobiel.
- Roadmap bijwerken (DNS `*.rout.be` = wacht op jou; automatisch delen naar Instagram, Snapchat en WhatsApp = binnenkort).

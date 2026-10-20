# Roadmap
- [ ] Portaalscheiding: navigatie, aanmelding, servertoegang en afzonderlijke versies controleren en corrigeren
- [ ] Portaalscheiding: gerichte regressietests en openbare/browsercontrole
- [x] A: typecheck + tests groen
- [x] B: cleanup-assets cron (user_assets + shared_files, fail-safe) + schema docs
- [x] C: Opera/Chromium storage + SVG ids
- [x] D: Custom domain DNS stap
- [x] E: Telegram webhook secret + setWebhook script
- [x] F: Hybride identiteitsverificatie (db/81, server, UI)
- [x] G: SMS gateway payload fix + Telegram /start
- [x] H: Wachtwoord/2FA zonder wachtwoord via e-mailcode
- [x] I: Account samenvoegen (handle/ontwerp kiezen, e-mailcode, alles samen)
- [x] J: Opgeslagen kaartontwerpen

## Open (uit specificaties)
- [x] Mission Control: actieve leden, badges en actiepunten op /admin
- [x] Financieel beheer: IBAN-overzicht en exacte naamsignalering op /admin/finance
- [x] Infrastructuur: webhooklogboek, subdomeinen en aliassen op /admin/infra
- [x] Nieuwe beheermodules: autorisatie, 30 gerichte tests en echte Neon-reads
- [ ] Admin ingelogde eindcontrole (wacht op toegang tot een beheerderssessie; alleen uitgelogde redirects gecontroleerd)
- [ ] Publieke Q&A en thema's (geparkeerd op verzoek; geen implementatie)
- [x] Badges: wapenschilden (db/86), uploader/bewerken in /admin/custom-badges, interactieve pop-up op profiel
- [ ] Snapchat Login Kit + Bitmoji-picker + handmatige status/mood-widget (geen Snap Map/GPS) (wacht op Snap Kit client ID/secret)
- [x] Admin-portaal split (APP_MODE, rout.dlp.li, noindex) + harde build-split
- [x] Leden 360° statusfilter server-side
- [x] Sovereign Tip Jar (☕-knop + EPC-QR op profiel)
- [ ] Testsuite account-merge / security-code / sms-provider / telegram
- [x] Badge-uploads via Scaleway S3 (S3_* env vars) i.p.v. Vercel Blob
- [x] Digitaal paspoort: grid en interactieve details afwerken
- [x] Claim-a-Stamp: login-terugkeer, succesanimatie en veilige limieten (8 gerichte tests geslaagd)
- [ ] Ingelogde claim en paspoort-pop-up end-to-end controleren (wacht op een testaccount en badge/claimlink; geen openbare profielen met stempels aanwezig)
- [x] Publieke/admin shells + preview-schakelaar
- [x] db/92 toegepast in Neon via migrate-gateway

- [x] Inlogcrash op Vercel (connector-only databasecheck) verholpen; na deploy health + e-maillogin op rout.be en rout.dlp.li testen
- [x] Studio drie lagen: Integratiekluis in catalogus, Live Integraties onder Live Status, één toevoegknop
- [ ] Meerdere accounts per dienst in de kluis (vereist databasewijziging in user_integrations; nog niet gebouwd)
- [ ] Fediverse-berichten automatisch verbergen na 24 u

## Workspaces & beheer (okt 2026)
- [ ] Live voorbeelden/kaartjes tonen exact dezelfde foto, kader, decoratie, vinkje en lettertype als het profiel
- [ ] Onboarding: eerst inloggen, daarna keuze "Voor mezelf" of "Voor een bedrijf" (workspace met eigen handle)
- [ ] Workspaces: aanmaken, leden toevoegen, publieke pagina rout.be/space/<naam>, domeinverificatie (DNS/bestand/rel=me)
- [ ] Bedrijfsverificatie via workspace (aanvraag + bevestigingsmails), knop op profiel legt uit dat bedrijven een workspace zijn
- [ ] Infopagina over workspaces/bedrijven
- [ ] Beheer: Net actief (iedereen/selectie/uitsluiten) en Uitgelicht apart instellen
- [ ] Beheer: handles van profielen en workspaces vergrendelen/blokkeren/hernoemen, verificatie intrekken + gratis herverificatie
- [ ] "Binnenkort"-integraties: meld-me-aan + e-mail bij beschikbaarheid
- [ ] Subdomein-noodroute username.r.rout.be met statusmelding (wacht op DNS/Vercel-bevestiging)
- [ ] Studio: Profiel-QR uit Instellingen, customize-knop naast Knopvorm/Typografie, antwoorden als verhaal, Bluesky-handle, Mastodon rel=me
- Prijzen bedrijfsverificatie: NIET publiceren tot expliciet besluit

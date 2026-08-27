# CLAUDE.md

Guidance for anyone changing this repository.

**`STATUS.md` is the companion to this file.** This one holds durable constraints. That one
holds state. Update it in the same change that moves something.

`AGENTS.md` is the same file. Edit one, write the same bytes to the other.

## What this is

The public portfolio at **harigovindvalsakumar.com** — a static site for Harigovind Valsakumar.
It is meant for employers and anyone landing from the App Store / GitHub / LinkedIn. Personal,
and public from the start: nothing private belongs in the markup.

The contact form posts to a Cloudflare Pages Function (`functions/api/contact.js`) which sends
through Resend. Everything else is `index.html`, `main.css`, `main.js`, and `resume.html`.

## Audience

Public. Copy is for a hiring reader, not for the author. Client work stays generalised where
the contract requires it. Personal apps can be named, linked, and described as they actually
ship.

Write like a person. No résumé-stack sentences, no "unglamorous middle", no "parts nobody
demos", no three punchy fragment headings in a row. Say what the work was, then the tools.

`resume.html` is the printable résumé. It tracks the same facts as the page, plus education
(B.Tech CSE, FISAT Angamaly, May 2019, GPA 7.88) and the Feathersoft intern (June–July 2018).
Contact on the résumé is phone, `contact@harigovindvalsakumar.com`, and the site — no GitHub or
LinkedIn. Old Gmail stays off. The 2023—Now workflow product is not Gadgeon.
**SageMaker is not current work.**

## No framework, and don't add one

There is no bundler, no generator, no `package.json`. Bump the `?v=` query on `main.css` and
`main.js` when those files change, so a stale Cloudflare cache doesn't serve the old sheet.

## Timeline years are load-bearing

The About timeline is newest-first. The years attached to each job are:

| When | What |
| --- | --- |
| 2023 — Now | Workflow platform — **not Gadgeon** (React, Spring Boot, Flowable, Keycloak) |
| 2021 — 2023 | Gadgeon · Healthcare & shipping systems |
| 2019 — 2021 | Gadgeon · Fleet management & IoT |

Do not put the workflow product under Gadgeon. Do not swap those two older rows back.
**Current Gadgeon work does not include SageMaker.** Don't put it in the latest Gadgeon
entry or in the stack pills.

## Apps on this page, and where their URLs live

The Apps section is personal products, not Gadgeon work. Store and site links must be the live
ones, not guessed:

| App | Site | Install |
| --- | --- | --- |
| Inventory QR | https://inventoryqrapp.com/ | App Store `id6747960199` |
| Kiln | https://kilnpodcastplayer.app/ | TestFlight `https://testflight.apple.com/join/neDPMNEW` |
| Beam | https://beammediaplayer.com/ | Website only — not on a store yet |

Kiln's TestFlight URL is the **External** group's public link, not a personal `/v1/invite/…`
token. Don't substitute an invite from an Apple email.

Beam is listed more quietly on purpose: in development, site only.

The page order is **you, then the apps, then everything else.** Name, portrait, bio and
timeline at the top. Apps next, with the icon dock. Other work and older experiments after
that. Don't put the apps above the identity block again.

## Deploying

Cloudflare Pages, project wired to this repo. `deploy.sh` is the local path if Git integration
isn't what you want. The contact Function needs `RESEND_API_KEY` as a Pages secret; setting the
secret after a deploy does not rebind it — redeploy.

## Visual language

This is a **product gallery**, not a dark résumé. Cool aluminum ground `#e7ebf2`, ink `#16181e`,
cobalt `#2155ff`. Display face is Bricolage Grotesque; body is IBM Plex Sans. The signature is the iOS dock of the three real app icons in the Apps section — those files
live in `icons/` and come from each app's App Store asset, not a redraw.

**Do not go back to near-black plus lime.** That was the previous look, and it was rejected.

Client systems stay as text. They are under NDA; don't invent screenshots.

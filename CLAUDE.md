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
through Resend. Everything else is `index.html`, `main.css`, `main.js`.

## Audience

Public. Copy is for a hiring reader, not for the author. Client work stays generalised where
the contract requires it. Personal apps can be named, linked, and described as they actually
ship.

## No framework, and don't add one

There is no bundler, no generator, no `package.json`. Bump the `?v=` query on `main.css` and
`main.js` when those files change, so a stale Cloudflare cache doesn't serve the old sheet.

## Timeline years are load-bearing

The About timeline is newest-first. The years attached to each job are:

| When | What |
| --- | --- |
| 2023 — Now | Platform, workflow & ML |
| 2021 — 2023 | Healthcare & shipping systems |
| 2019 — 2021 | Fleet management & IoT |

Do not swap those two older rows back. **Current work does not include SageMaker.** Don't put
it back in the latest entry or in the stack pills.

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

## Deploying

Cloudflare Pages, project wired to this repo. `deploy.sh` is the local path if Git integration
isn't what you want. The contact Function needs `RESEND_API_KEY` as a Pages secret; setting the
secret after a deploy does not rebind it — redeploy.

## Visual language

Instrument Serif + Space Grotesk on near-black, lime `#b6e04c`. Motifs in Selected work are CSS,
not screenshots — those client systems are under NDA. Don't replace them with stock photos.

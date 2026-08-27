<div align="center">

# HV. Harigovind Valsakumar

**Personal portfolio — `harigovindvalsakumar.com`**

[![HTML](https://img.shields.io/badge/HTML-hand--written-e34c26?style=flat-square&logo=html5)](#-project-structure)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-live-f38020?style=flat-square&logo=cloudflare)](https://harigovindvalsakumar.com)
[![Dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen?style=flat-square)](#-tech-stack)

*One page: you first, then the apps, then other work, and a contact form that sends.*

</div>

---

## ✨ What It Does

A static portfolio for employers and anyone arriving from GitHub, LinkedIn or an App Store listing. Client systems stay generalised. Personal apps are named and linked as they actually ship.

### Highlights

- 👤 **You first** — name, portrait, timeline
- 📱 **Apps** — Inventory QR (App Store), Kiln (TestFlight), Beam (site), with the real icons
- 🗂 **Other work** — three platforms, details generalised where the contract requires it
- 📄 **Résumé** — printable page at `resume.html`
- 📬 **Contact** — Posts to a Cloudflare Pages Function, which sends through Resend

---

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| Markup | Hand-written HTML, CSS and JavaScript. No bundler, no `package.json` |
| Type | Bricolage Grotesque (display) + IBM Plex Sans, via Google Fonts |
| Hosting | Cloudflare Pages, custom domain `harigovindvalsakumar.com` |
| Contact | Pages Function at `POST /api/contact` → Resend |
| Dependencies | None in-repo |

---

## 🚀 Setup

### Requirements

- A browser, to look at it
- `npx` (Node) and a Cloudflare account, to deploy
- `RESEND_API_KEY` set as a Pages secret, for the contact form

### Preview

There is no build. Open `index.html`, or:

```bash
python3 -m http.server 8000
```

The contact form needs the deployed Function; locally it will fail the POST.

### Deploy

Cloudflare Pages is wired to this repo. A push to the tracked branch redeploys, including the Function.

Bump the `?v=` query on `main.css` and `main.js` in `index.html` when those files change, or a cached copy will keep serving.

`RESEND_API_KEY` is a Pages secret. Setting it after a deploy does not rebind an existing deployment — push again.

---

## 📁 Project Structure

```
index.html                 The page
resume.html                Printable résumé
main.css                   Visual language — aluminum, cobalt, the icon dock
main.js                    Nav, scroll-spy, repo filters, contact POST
icons/                     Real App Store icons for Inventory QR, Kiln, Beam
portrait.webp              About photo
functions/api/contact.js   Pages Function → Resend
CLAUDE.md / AGENTS.md      Constraints (identical files)
STATUS.md                  What's live vs pending
```

`STATUS.md` is where this actually stands. `CLAUDE.md` holds the constraints worth knowing before editing.

---

<div align="center">

Static HTML · Cloudflare Pages · Resend

</div>

# Portfolio — Status

Where the site actually is. `CLAUDE.md` holds the decisions; this holds state. If the two
disagree with the deployed page, the page wins and this gets corrected.

---

## Where it stands

**The portfolio is live at harigovindvalsakumar.com.** Static HTML/CSS/JS on Cloudflare Pages,
with a working contact form through a Pages Function and Resend.

The About timeline, stack, and Apps section match the 27 Aug 2026 copy pass: healthcare and
fleet years are in the right slots, SageMaker is out of current work, and the three personal
apps are on the page with live links.

---

## Done

- Hero, about, selected client work, GitHub "Also built" list, stack, contact form
- Portrait, custom domain, contact Function
- **Apps section** — Inventory QR (App Store + site), Kiln (TestFlight + site), Beam (site)
- Timeline: 2023–Now platform/workflow; 2021–2023 healthcare; 2019–2021 fleet
- SageMaker removed from the latest job and from the stack pills
- Nav includes Apps; SwiftUI added to Front-end

---

## In progress

Nothing in this repo.

---

## Pending

- Kiln's marketing site still says "TestFlight soon" even though a public link exists. That's
  `kiln-site`, not this repo.

---

## Known issues & debt

- Client project art is CSS motifs because those systems can't be screenshotted for a public
  page. Fine until a contract allows otherwise.
- `.DS_Store` was tracked; `.gitignore` now excludes it and `.wrangler/`. Stop tracking it on the next commit.

---

## Last verified

**27 August 2026.** Markup and CSS for the Apps section, timeline years, and SageMaker
removal. README rewritten to match the live site. Not opened in a browser.

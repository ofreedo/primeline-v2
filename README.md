# PrimeLine Painting & Coatings — Website Rebuild

Independent static rebuild of [primelinepc.com](https://www.primelinepc.com), replacing the
original Wix site. Built from a detailed brand/UX brief following the sequence:
**Brand Kit → Visual Specification → Sitemap/Architecture → Content → Build.**

## Running locally

No build step — plain HTML/CSS/JS. Serve the folder over HTTP (opening `index.html`
directly as a `file://` URL will break relative asset paths and JS in some browsers):

```bash
cd primeline-v2
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Project structure

```
primeline-v2/
├── index.html              Homepage (the design benchmark — all other pages inherit its system)
├── css/
│   ├── tokens.css          Design tokens: color, type scale, spacing, radius, motion
│   ├── base.css            Reset, typography, layout primitives, section rhythm
│   └── components.css      All reusable components (header, buttons, cards, footer, etc.)
├── js/
│   └── main.js             Header scroll state, mobile menu, FAQ accordion, gallery
│                            filters, before/after slider, scroll reveals, intro loader init
├── assets/
│   └── images/             Real brand + project photography (see Photography note below)
└── services/                (planned) individual service detail pages
```

## Design system

Tokens live in `css/tokens.css`. Two facts worth knowing before changing them:

- **Brand colors are sampled, not guessed.** `--pl-navy: #0E3055` and `--pl-red: #D2152B`
  were extracted via canvas pixel analysis of the actual logo asset — not eyeballed from
  a screenshot. Don't "correct" them back toward more generic-looking navy/red without
  re-sampling the source logo.
- **Body font sizes are intentionally larger than a typical spec** (`--fs-body: 1.3rem`)
  for readability/accessibility, per explicit client direction.

Primary typeface: **Manrope** (Google Fonts), loaded in every page's `<head>`.

## Content rules (do not violate)

These aren't style preferences — they came from the client directly and matter:

1. **PrimeLine is NOT licensed & insured.** This claim appeared in the original brief and
   the old Wix site, but the client confirmed it's false. It has been removed from the
   homepage entirely (meta description, trust bar, "PrimeLine Difference" section). Do not
   reintroduce it on any new page, even though the original brief's content list includes it.
2. **No reviews section exists yet.** The business has no Google/Yelp reviews at the time of
   this build. Don't add a "What Our Clients Say" section, a Reviews nav link, or any
   testimonials until the client explicitly provides real ones.
3. **Never invent trust claims, certifications, stats, or service areas.** Only use facts
   confirmed by the client or the original live site.

## Photography

Images in `assets/images/` are the same photos the original Wix site used. Several of them
are stock photography rather than authentic PrimeLine job-site photos — this was flagged to
the client, who chose to proceed with them anyway (matches what the business already shows
customers). If real project photography becomes available later, these are the files to
swap out; filenames are semantic (`service-exterior.jpg`, `work-1.jpg`, etc.) so replacements
should be drop-in.

## Known limitation: local environment has no working shell

Development happened in an environment where the Bash tool was non-functional (proxy
errors on every invocation). All file creation/edits went through direct file read/write
tools, not shell commands — including asset copying, which required the user to run `cp`
commands manually. If you're picking this project up with a working shell, this constraint
no longer applies to you.

## Paused work: homepage intro animation

The homepage has a built-but-disabled intro animation: the real logo fades in, a brush
(redrawn to match the flat gray-handled brush already in the logo artwork) paints the red
stripe left-to-right, matching the brand mark's own visual story. It's fully functional but
currently switched off to conserve effort/tokens mid-project.

**To re-enable:**
1. In `css/components.css`, find the `.intro-loader { display: none !important; }` override
   near the top of the `INTRO LOADER` section and delete that line.
2. In `index.html`, add the `intro-active` class back to `<body class="has-mobile-cta">`.

Everything else (markup, animation keyframes, JS cleanup logic) was left in place.

## Site map (planned)

```
/                              Homepage ✅ built
/services.html                 Services overview — not yet built
/services/exterior-painting.html
/services/interior-painting.html
/services/cabinet-painting.html
/services/commercial-coatings.html
/services/pressure-washing.html
/services/deck-staining.html
/our-work.html                 Project gallery with filtering — not yet built
/why-primeline.html            Trust/differentiation deep-dive — not yet built
/about.html                    Company story — not yet built
/faq.html                      Accordion FAQ — not yet built
/contact.html                  Estimate request form — not yet built
```

Every new page should reuse the existing header/footer markup and the components already
defined in `css/components.css` rather than introducing new one-off styles. The homepage is
the reference for section rhythm, spacing, and copy tone.

## Business facts (verified, safe to reuse)

- **Name:** PrimeLine Painting & Coatings
- **Location:** San Diego, CA
- **Phone:** (858) 650-9640
- **Email:** luis@primelinepc.com
- **Estimate flow:** links to `primelinepaintingandcoatings.dripjobs.com` (external, preserved from the original site)
- **Services:** Exterior Painting, Interior Painting, Cabinet Painting, Commercial Coatings, Pressure Washing, Wood Deck Staining

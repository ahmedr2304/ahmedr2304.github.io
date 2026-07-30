# Ahmed Ramadan — Professional Portfolio

This repository contains the production-ready static website for **ahmedr2304.github.io**.

## Technology
- Semantic HTML5
- Responsive CSS
- Vanilla JavaScript
- Anime.js 3.2.2 for hero sequencing, scroll reveals, counters, metric progress bars, navigation, and theme-toggle motion
- GitHub Pages compatible

## Main files
- `index.html` — website content and structure
- `assets/css/styles.css` — all visual styles and responsive layouts
- `assets/js/main.js` — theme switcher, animated navigation, hero timeline, reveal animations, counters, metric progress bars, and show-more controls
- `assets/data/site-content.json` — key personal links and maintenance notes
- `assets/documents/` — resume and professional PDF documents
- `assets/images/` — optimized images and social preview
- `DEPLOYMENT_GUIDE_AR.md` — Arabic publishing guide

## Important confidentiality rules
- Do not add the name of the current government entity.
- Do not add confidential system names, data, endpoints, screenshots, or operational details.
- Keep AI-assisted development and automation as a supporting learning and portfolio direction unless production experience changes.

## Local preview
Run from the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Final visual refinements
- All **Download Resume** buttons use a white treatment in both light and dark themes.
- Professional impact metrics use accessible SVG icons, stronger numeric hierarchy, animated counters, and progress indicators.
- Motion respects `prefers-reduced-motion`; the site remains usable when the Anime.js CDN is unavailable.


☕ Online Journal / Diary

A small, modern static diary site built with Vanilla JavaScript, SCSS and plain HTML.

Vanilla JS • HTML5 • CSS3 • License: MIT

✨ Features
- Responsive two-page spread layout (diary-style)
- SCSS source with modular partials (base / layout)
- Simple page navigation and annotations powered by small vanilla JS scripts
- Separate `cake/` mini-app included and copied into the public build
- Zero heavy runtime dependencies — easy to inspect and extend

Quick Start

Prerequisites
- Node.js & npm (to use the provided build scripts)
- A modern browser (Chrome, Firefox, Edge, Safari)

Installation

Clone the repository:

```pwsh
git clone https://github.com/wauxi/online_journal.git
cd online_journal
```

Install dev dependencies (optional, the build uses npx for sass if you don't):

```pwsh
npm install
```

Build once (compile SCSS, copy assets and HTML):

```pwsh
npm run build
```

Run a local server to preview `public/`:

```pwsh
npm start
```

Open in your browser: http://localhost:8080 (or the address printed by live-server)

📁 Project Structure

online_journal/
├── diary.html             # Source HTML (editable, copied into public/ during build)
├── package.json          # Build scripts (sass, copy, start)
├── scripts/
│   └── build-html.js     # Rewrites paths and writes public/diary.html
├── src/
│   ├── js/               # JS source files (pages.js, highlighting.js, turn.js, etc.)
│   ├── scss/             # SCSS sources and partials
│   └── assets/           # Images, cursors, fonts used by the SCSS and HTML
├── public/               # Built site (CSS, JS, assets, diary.html) — ready to deploy
├── cake/                 # Small separate demo app included in the site
└── README.md

⚙️ Configuration

- The editable `diary.html` lives in the repository root. The build step `npm run build:html` (run automatically as part of `npm run build`) copies it to `public/diary.html` and adjusts asset paths so the page works from `public/`.
- Build scripts are declared in `package.json`:
  - `build:css` — compile SCSS → `public/css`
  - `build:html` — rewrite and copy `diary.html` → `public/diary.html`
  - `copy:assets`, `copy:js`, `copy:cake` — copy source assets/JS/cake into `public/`
  - `build` — runs all steps in order
  - `start` — runs a tiny static server (`live-server`) serving `public/`

🛠️ Technologies Used
- Vanilla JavaScript (ES6)
- SCSS (Dart Sass)
- HTML5 & CSS3
- live-server (dev) for quick preview

Notes & Next Steps
- Sass warns about legacy `@import` in the current SCSS; migrating to `@use`/`@forward` is recommended for forward compatibility.
- If you prefer not to commit `public/`, add `public/` to `.gitignore` and configure CI (GitHub Actions) to build and deploy to GitHub Pages or another host.
- I can add a GitHub Action to build and deploy `public/` automatically — tell me if you'd like that.

Source HTML

- The editable source `diary.html` lives in the repository root. The build process copies and rewrites it into `public/diary.html` (fixing asset paths). The step is `npm run build:html` (run as part of `npm run build`).

If you want, I can also add a simple GitHub Actions workflow to build and deploy `public/` automatically.

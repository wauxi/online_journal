
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
├── diary.html             # Source HTML (uses ./public/ paths for development)
├── package.json          # Build scripts (sass, copy, start)
├── scripts/
│   └── build-html.js     # Converts paths for production build
├── src/
│   ├── js/               # JS source files (pages.js, highlighting.js, turn.js, etc.)
│   ├── scss/             # SCSS sources and partials
│   └── assets/           # Images, cursors, fonts used by the SCSS and HTML
├── public/               # Built site (CSS, JS, assets, diary.html) — ready to deploy
│   ├── diary.html        # Production HTML (uses ./ paths)
│   ├── css/              # Compiled CSS
│   ├── js/               # Copied JS files
│   └── assets/           # Copied assets (img, cursor, fronts, svg, cake)
├── cake/                 # Small separate demo app included in the site
└── README.md

⚙️ Configuration

- The editable `diary.html` lives in the repository root and uses paths like `./public/css/`, `./public/js/`, `./public/assets/` for development
- The build step `npm run build:html` copies it to `public/diary.html` and converts paths to `./css/`, `./js/`, `./assets/` for production
- You can open `diary.html` in the root during development (it will load resources from `public/`)
- Deploy the `public/` folder to your web server
- Build scripts are declared in `package.json`:
  - `build:css` — compile SCSS → `public/css`
  - `build:html` — convert paths and copy `diary.html` → `public/diary.html`
  - `copy:assets`, `copy:js`, `copy:cake` — copy source assets/JS/cake into `public/`
  - `build` — runs all steps in order
  - `start` — runs a tiny static server (`live-server`) opening root `diary.html`

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

- The editable source `diary.html` lives in the repository root and uses `./public/` paths for development
- The build process converts it to `public/diary.html` with standard relative paths (fixing asset paths)
- The build step is `npm run build:html` (run as part of `npm run build`)
- During development, you can open root `diary.html` directly — it will load all resources from `public/`
- For deployment, use the `public/` folder

If you want, I can also add a simple GitHub Actions workflow to build and deploy `public/` automatically.

Online Journal / Diary

This is a small static site (diary) built from SCSS and plain JavaScript. The repository contains:

- `src/` — source files (SCSS, JS, assets)
- `public/` — compiled static site (CSS, JS, assets) ready for deployment
- `cake/` — a separate mini-project used by the site (copied into `public/assets/cake` during build)

Quick start (Windows / PowerShell):

1. Install dev dependencies:

   npm install

2. Build once:

   npm run build

3. Run a local server (opens public/diary.html):

   npm start

During development you can watch SCSS:

   npm run watch:css

Notes

- `package.json` uses `sass` and `live-server` for a minimal workflow. You can replace with your preferred tooling (esbuild, rollup, webpack, parcel, etc.).
- `public/` is committed in this repo for convenience. If you prefer to regenerate `public/` in CI, add `public/` to `.gitignore` and configure CI to run `npm run build`.

If you want, I can also add a simple GitHub Actions workflow to build and deploy `public/` automatically.

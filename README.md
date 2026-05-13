# Cardly
🔗 **[Live Demo →](https://cardly-thumbnails.vercel.app/)**

A browser-based playground for designing Open Graph images, GitHub repo
thumbnails, YouTube covers, LinkedIn banners and other social cards. Same
engine as Vercel's [og-playground](https://og-playground.vercel.app/)
([Satori](https://github.com/vercel/satori)), but runs 100% in the browser,
with no server and no API calls, so it deploys as a static site to GitHub
Pages.

## Features

- Live preview. Monaco editor on the left, instant SVG render on the right.
- HTML + inline-CSS input. Same syntax as Satori on Vercel.
- PNG / SVG export at full resolution.
- Pre-built templates for GitHub repos, blog posts, YouTube, LinkedIn, X/Twitter, Product Hunt and Open Graph cards.
- Share via URL. Full source is encoded in the URL hash.
- Custom canvas size. Any width/height, not just 1200x630.
- Debug overlay. Turn on Satori's bounding-box overlay to debug layout.

## Stack

- Vite + React + TypeScript
- [Satori](https://github.com/vercel/satori) for HTML/CSS to SVG
- [@resvg/resvg-wasm](https://github.com/yisibl/resvg-js) for SVG to PNG in the browser
- [satori-html](https://github.com/natemoo-re/satori-html) for HTML string to JSX nodes
- [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) for the editor
- Tailwind CSS v3

## Local development

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
Before the first deploy, enable Pages on the repo:

1. Settings -> Pages -> Source: **GitHub Actions**
2. Push to `main`

For a custom subpath, set the repo variable `VITE_BASE` (e.g. `/my-path/`).

To deploy to Vercel instead, no config is needed. `npm run build` produces a
static `dist/` and Vercel auto-detects Vite.

## Notes on writing templates

Satori is stricter than a browser. Two rules to remember:

1. Every `div` with multiple children needs `display: flex` (or
   `display: contents` / `display: none`). This applies to leaf divs too. If
   you write `<div>...</div>` and even just whitespace falls inside, add
   `display: flex`.
2. Use inline styles only. External stylesheets and class selectors are not
   parsed.

Whitespace between tags is auto-collapsed before rendering so you can format
your HTML for readability without breaking the layout.

## License

MIT


# Sohazur Islam — 3D portfolio

The source for [sohazur.com](https://sohazur.com/): an interactive React Three Fiber portfolio with crawlable personal-identity metadata, profile links, representative images, and structured data.

## Local development

```bash
npm install
npm run check
npm run dev
```

Run `npm run build` to create the production bundle in `dist/`. Netlify uses the checked-in [`netlify.toml`](./netlify.toml) configuration.

## Identity and indexing

The canonical profile graph lives in [`index.html`](./index.html). Update the visible founder copy and the JSON-LD graph together whenever a role, company, canonical profile, or representative image changes. Crawl discovery files live in [`public/robots.txt`](./public/robots.txt) and [`public/sitemap.xml`](./public/sitemap.xml).

## Acknowledgment

The original 3D portfolio implementation was based on [Wawa Sensei's React Three Fiber tutorial](https://youtube.com/@WawaSensei) and has since been customized for Sohazur Islam.

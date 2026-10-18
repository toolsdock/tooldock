# ToolDock portal

This is the sixth independently deployed Next.js application in the Turborepo. It owns the root domain and the **image** and **audio** category pages. Individual tools remain separate applications and containers.

## Routes

- `/` — English landing page
- `/ru` — Russian landing page
- `/image`, `/audio` — English category pages
- `/ru/image`, `/ru/audio` — Russian category pages
- `/sitemap.xml` — portal sitemap (the gateway exposes it publicly as `/portal-sitemap.xml`)
- `/opengraph-image` — generated branded social image

Only the two categories containing real tools have routes. Upcoming categories are visible but have no indexable empty pages.

## Local development

```bash
pnpm install --frozen-lockfile
pnpm --filter @tools/portal dev
```

Visit http://localhost:3005. Tool cards link to `localhost:3000-3004` in development.

## Design

The card interaction uses CSS perspective, a pointer-following specular highlight, branded gradients and layered illustrations. It deliberately does **not** instantiate five PixiJS/WebGL contexts: that would increase JS payload and GPU/memory usage for a page where the cards' contents should render immediately for SEO. The effect has touch and `prefers-reduced-motion` fallbacks.

## SEO

Localized canonical URL, hreflang including x-default, meaningful category descriptions, Open Graph/Twitter images, structured data and a generated sitemap. On production, `NEXT_PUBLIC_PORTAL_SITE_URL` must equal `https://tooldock.pro` (set through Compose build args). Because these are `NEXT_PUBLIC_*` variables, changes require rebuilding the image.

The Nginx gateway continues to own origin `/robots.txt`, `/sitemap.xml` index and `/ads.txt`. The portal sitemap is included via `/portal-sitemap.xml`.

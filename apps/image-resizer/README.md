# Leafsize — Image Resizer

Run from the monorepo root: `pnpm install` then `pnpm --filter @tools/image-resizer dev`.

## Locales and themes
- `/` redirects using the browser `Accept-Language` header to `/ru` or `/en` (English fallback).
- The language switcher changes the URL; both pages have server-rendered localized copy.
- Dark theme is the default; the toggle stores preference under `leafsize-theme` in localStorage.
- Reusable providers live in `packages/theme` and `packages/i18n`. App-specific dictionaries live in `apps/image-resizer/src/shared/i18n`.

## SEO before deployment
Set `NEXT_PUBLIC_RESIZER_SITE_URL=https://your-real-domain.com` (no path) in the build environment, rebuild, and check `/en`, `/ru`, `/robots.txt`, `/sitemap.xml`. The example URL is intentionally not indexable until configured. Each language has its own canonical and hreflang. Add real OG imagery before public launch.

## Testing
Run `pnpm --filter @tools/image-resizer typecheck` and `pnpm --filter @tools/image-resizer build`. Test both themes, language switching, refresh, mobile viewport, real JPG/PNG/WebP resizing and downloaded dimensions.

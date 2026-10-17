# Leafsize theme / i18n / SEO patch

1. Extract this ZIP into the **monorepo root** (`web-tools/`) and overwrite files.
2. **Important:** remove the legacy `apps/image-resizer/src/app/layout.tsx` and `apps/image-resizer/src/app/page.tsx` because the localized `/en` and `/ru` routes now own the HTML layout. From the monorepo root run `powershell -ExecutionPolicy Bypass -File APPLY_WINDOWS.ps1` (Windows), or `sh APPLY_LINUX_MAC.sh` (macOS/Linux). Alternatively delete those two files manually.
3. `pnpm install`
4. `pnpm --filter @tools/image-resizer dev`
5. Visit http://localhost:3002/ — Accept-Language redirect to `/ru` or `/en`.
6. Check both themes, EN/RU, image resizing, `sitemap.xml`, `robots.txt`.

## SEO
Set `NEXT_PUBLIC_RESIZER_SITE_URL=https://your-production-domain` at build time. Until configured, robots disallows crawling, sitemap is empty, and metadata is noindex. Localized pages use canonical + hreflang and server-rendered content. Real domain and production deployment must be verified before release.

## Validation status
Source-level changes prepared. Build/browser tests could not run here because package installation is unavailable. Test on your machine before deploying.

# Web Tools — Turborepo

Monorepo for independent SEO-first browser utilities. First application: **Clearframe**, a privacy-first image metadata remover.

## Requirements
- Node.js 22+
- pnpm 10+

## Quick start
```bash
corepack enable
pnpm install
pnpm dev
```
Open http://localhost:3000.

## Commands
```bash
pnpm build
pnpm typecheck
pnpm check
pnpm --filter @tools/metadata-remover dev
```

## Structure
- `apps/metadata-remover` — Next.js application with FSD-style `app/pages/widgets/features/entities/shared` layering
- `packages/ui` — reusable visual primitives
- `packages/seo` — reusable SEO metadata helpers
- `packages/tsconfig` — shared strict TypeScript settings

## SEO setup
Before production set `NEXT_PUBLIC_SITE_URL=https://your-real-domain.com` in the app deployment environment. The application includes server-rendered landing copy, title/description, canonical URL, Open Graph, WebApplication JSON-LD, `robots.txt` and `sitemap.xml`. Replace the placeholder domain before indexing. Add a real OG image before launch.

## Image processing caveats
Images are processed locally via browser Canvas; no server upload. JPEG and WebP are **re-encoded** (quality can change), original EXIF/embedded metadata is not copied. Animated WebP becomes a static frame. Color profiles may change, and Canvas is not a forensic guarantee that *all possible* metadata in *all* browser encoders is absent. Supported input: JPG, PNG, static WebP, up to 20 MB and 50 MP. For production privacy claims, add automated tests that parse output metadata in major browsers.

## Next steps
Add an image metadata inspection feature, tests across browsers, accessibility checks, reusable theme tokens, analytics with consent, and standalone Docker/Nginx deployment for each app.

# Wavecut — Audio Cutter

Independent Next.js app in the web-tools Turborepo, using shared `@tools/theme` and `@tools/i18n` packages.

## Run

```bash
pnpm install
pnpm --filter @tools/wavecut typecheck
pnpm --filter @tools/wavecut dev
```

Open http://localhost:3003/en or /ru. Root / redirects based on Accept-Language.

## Features

- Drag/drop and file input; up to 40 MB; browser-native decodeAudioData.
- Select on waveform or via numeric fields (seconds), preview, export 16-bit PCM WAV.
- Browser-local processing; no media uploads.
- Dark theme default, light option, persisted per app.
- RU/EN translations via shared workspace packages.
- Localized title/description/canonical/hreflang, sitemap, robots, JSON-LD.

## Production SEO

Set `NEXT_PUBLIC_WAVECUT_SITE_URL=https://your-real-domain.com` at **build time**. Until then the `.invalid` placeholder disables indexing. Verify /robots.txt, /sitemap.xml, /en, /ru after deployment. Create unique social sharing images and real content before launch. SEO tags alone do not guarantee rankings.

## Known limitations

- WAV export only, 16-bit PCM. MP3/AAC re-encoding is not implemented; this is intentional, not mislabeled as lossless audio conversion.
- Source lossy artifacts are not recoverable; converting MP3 to WAV does not improve original audio quality.
- Decode format support depends on browser. Multi-channel audio >2 channels is downmixed to stereo.
- Large/long audio may consume significant browser memory; no server-side processing.
- Run manual browser testing on Chrome, Firefox, Safari and mobile, including long files, before production.

## Architecture

`app` routing; FSD-inspired `views`, `widgets`, `features`, `entities`, `shared` (avoid `src/pages` because Next.js reserves it).

# Soundshift

Browser-first audio converter for the web-tools Turborepo.

## Run

```bash
pnpm install
pnpm --filter @tools/soundshift typecheck
pnpm --filter @tools/soundshift dev
```

Open http://localhost:3004/en or http://localhost:3004/ru.

## Production domain

Set `NEXT_PUBLIC_SOUNDSHIFT_SITE_URL=https://your-domain.example` before a production build. The `.invalid` fallback intentionally disables indexing.

## Conversion engine

Audio files are processed locally with `ffmpeg.wasm`. The single-thread FFmpeg core is downloaded on the first conversion. Source audio is not uploaded to the Soundshift server.

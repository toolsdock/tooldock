# Skyconvert — HEIC to JPG / PNG

Second standalone app in the Turborepo workspace. Runs at http://localhost:3001.

```bash
pnpm install
pnpm --filter @tools/heic-converter dev
```

Set `NEXT_PUBLIC_HEIC_SITE_URL=https://your-real-domain.example` in deployment before publishing for correct canonical, sitemap and Open Graph URLs.

Uses `heic2any` dynamically in the browser. Supports HEIC/HEIF input and JPG/PNG output, including batch conversion (up to 15 files, 35 MB each). Some HEIC variants and devices may not work; failures are shown per file. Files are not uploaded. Converted images can lose original metadata, color profiles, or other HEIC features. No metadata-removal guarantee is made.

For production, run build, test actual iPhone photos in Safari/Chrome/Firefox, and verify browser decoder licensing and compatibility.

Quality checks: validates output MIME and decodes the output image before marking successful. Multi-image HEIC is rejected rather than silently dropping frames. HDR/wide-gamut and orientation still require real-device browser QA.

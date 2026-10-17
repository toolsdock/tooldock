# Typecheck fix for Clearframe and Skyconvert

Extract into the web-tools monorepo root. Then DELETE the old FSD files:

- apps/metadata-remover/src/pages/home/ui/home-page.tsx
- apps/heic-converter/src/pages/home/ui/home-page.tsx

Next.js treats src/pages as Pages Router; the FSD view was moved to src/views.

Run from monorepo root:

```sh
pnpm install
pnpm --filter @tools/metadata-remover typecheck
pnpm --filter @tools/heic-converter typecheck
pnpm --filter @tools/metadata-remover build
pnpm --filter @tools/heic-converter build
```

If .next/types still mentions src/pages, stop dev servers and delete the two apps' .next folders before rerunning. Do not delete src/app.

These are targeted source fixes; builds were not executed in this environment.

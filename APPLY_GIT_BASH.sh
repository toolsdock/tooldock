#!/usr/bin/env bash
set -e
rm -rf apps/heic-converter/src/pages apps/image-resizer/src/pages
rm -f apps/heic-converter/src/app/page.tsx apps/image-resizer/src/app/page.tsx
pnpm install
pnpm typecheck

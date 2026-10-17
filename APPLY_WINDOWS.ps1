$ErrorActionPreference = "Stop"
Remove-Item -Recurse -Force apps/heic-converter/src/pages -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps/image-resizer/src/pages -ErrorAction SilentlyContinue
Remove-Item -Force apps/heic-converter/src/app/page.tsx -ErrorAction SilentlyContinue
Remove-Item -Force apps/image-resizer/src/app/page.tsx -ErrorAction SilentlyContinue
pnpm install
pnpm typecheck

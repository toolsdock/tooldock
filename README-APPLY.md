# Apply this patch

Extract the archive into the root of your existing `web-tools` monorepo and replace files.

Then remove two obsolete Pages Router folders/files (they conflict with the App Router):

## Git Bash

```bash
rm -rf apps/heic-converter/src/pages apps/image-resizer/src/pages
rm -f apps/heic-converter/src/app/page.tsx apps/image-resizer/src/app/page.tsx
pnpm install
pnpm typecheck
```

## PowerShell

```powershell
Remove-Item -Recurse -Force apps/heic-converter/src/pages -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps/image-resizer/src/pages -ErrorAction SilentlyContinue
Remove-Item -Force apps/heic-converter/src/app/page.tsx -ErrorAction SilentlyContinue
Remove-Item -Force apps/image-resizer/src/app/page.tsx -ErrorAction SilentlyContinue
pnpm install
pnpm typecheck
```

See `README-MONETIZATION.md` for tool-network and AdSense configuration.

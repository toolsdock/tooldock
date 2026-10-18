# ToolDock portal — apply and deploy

This patch is meant for your **current** ToolDock monorepo. It adds `apps/portal` and updates only the root pnpm lockfile and production integration. It does not replace the five existing tool applications.

## 1. On your Windows development machine (Git Bash)

Extract the ZIP into the repository root, merging folders and replacing the changed files. Then run:

```bash
pnpm install --frozen-lockfile
pnpm --filter @tools/portal typecheck
pnpm --filter @tools/portal build
pnpm --filter @tools/portal dev
```

The portal opens at http://localhost:3005. Test EN, RU, categories, theme, search (including `/` shortcut), links and mobile layout.

**Important: remove the obsolete tracked Next.js pages** before the next complete Turborepo build. These four files were already removed manually on the production server after they broke the older tool builds:

```bash
git rm -f --ignore-unmatch \
  apps/heic-converter/src/app/page.tsx \
  apps/heic-converter/src/pages/home/ui/home-page.tsx \
  apps/image-resizer/src/app/page.tsx \
  apps/image-resizer/src/pages/home/ui/home-page.tsx
```

The active FSD pages remain in `src/views/`, with routes under `app/[locale]`. Run `git status` and review the changes before committing:

```bash
git add apps/portal production/compose.yml production/docker/Dockerfile.tool \
  production/nginx/conf.d/00-upstreams.conf production/nginx/templates/site.conf.template \
  production/README.md production/bin/smoke-portal.sh pnpm-lock.yaml TOOLDOCK-PORTAL-APPLY.md

git commit -m "feat(portal): launch ToolDock catalogue and categories"
git push origin main
```

## 2. On your AlmaLinux production server

The server previously had local **deletions** of the same four old pages. If `git status --short` still shows those `D` entries, restore only those four tracked files first, so the incoming commit can remove them cleanly:

```bash
cd /opt/tooldock
git status --short
git restore -- \
  apps/heic-converter/src/app/page.tsx \
  apps/heic-converter/src/pages/home/ui/home-page.tsx \
  apps/image-resizer/src/app/page.tsx \
  apps/image-resizer/src/pages/home/ui/home-page.tsx

git pull --ff-only origin main
```

Do **not** reset other local changes without reviewing them. Production env and TLS certs remain outside Git at `/var/tools`.

Regenerate the gateway config from the tracked template (the generated `site.conf` is intentionally gitignored):

```bash
set -a
. /var/tools/env/production.env
set +a
sed "s|\${DOMAIN}|${DOMAIN}|g" production/nginx/templates/site.conf.template \
  > production/nginx/conf.d/site.conf
```

Build/start **only the new portal** first; keep the five working tool containers running:

```bash
docker compose --env-file /var/tools/env/production.env -f production/compose.yml config --quiet
docker compose --env-file /var/tools/env/production.env -f production/compose.yml build portal
docker compose --env-file /var/tools/env/production.env -f production/compose.yml up -d --no-deps portal
docker compose --env-file /var/tools/env/production.env -f production/compose.yml ps portal
```

Check Nginx syntax using the freshly generated conf, then recreate only the gateway:

```bash
docker compose --env-file /var/tools/env/production.env -f production/compose.yml run --rm --no-deps nginx nginx -t
docker compose --env-file /var/tools/env/production.env -f production/compose.yml up -d --no-deps --force-recreate nginx
```

Verify:

```bash
curl -I https://tooldock.pro/
curl -I https://tooldock.pro/ru
curl -I https://tooldock.pro/image
curl -I https://tooldock.pro/audio
curl -I https://tooldock.pro/image/remove-metadata/en
curl -s https://tooldock.pro/sitemap.xml | grep portal-sitemap
curl -I https://tooldock.pro/portal-sitemap.xml
./production/bin/smoke-portal.sh
```

The landing root and categories should return `200` (a 307 locale redirect may occur for browsers whose `Accept-Language` prefers Russian). Existing tool routes should remain unchanged.

If portal fails to start or gateway config test fails, do not restart the five existing applications. Check logs and restore the previous Nginx template/configuration before retrying.

### Production architecture

```
Internet -> Nginx (HTTP/3 + Brotli + TLS)
  /, /ru, /image, /audio, /ru/*  -> portal:3000
  /image/remove-metadata/*       -> clearframe:3000
  /image/heic-to-jpg/*           -> skyconvert:3000
  /image/resize-images/*         -> leafsize:3000
  /audio/cut-audio/*             -> wavecut:3000
  /audio/convert-audio/*         -> soundshift:3000
```

The `/portal-sitemap.xml` path is exposed by Nginx from portal's `/sitemap.xml` to avoid colliding with the existing root sitemap index.

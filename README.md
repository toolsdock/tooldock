# ToolDock Portal — исправление production build

Этот архив содержит только три изменённых файла внутри `apps/portal/src/app/`.

Исправлено:
- `opengraph-image.tsx`: две строки заголовка теперь в явном flex-контейнере (Satori / ImageResponse).
- `layout.tsx`: корневой `metadataBase` использует `site.url`, который при production build берётся из `NEXT_PUBLIC_PORTAL_SITE_URL`.
- `globals.css`: flex-выравнивание с кроссбраузерными `flex-start`/`flex-end`.

## Локально

Распаковать в корень монорепозитория, затем:

```bash
pnpm --filter @tools/portal build
git add apps/portal/src/app
git commit -m "fix(portal): correct og image rendering and metadata base"
git push origin main
```

## Сервер (после push)

```bash
cd /opt/tooldock
git status --short
git pull --ff-only origin main
docker compose --env-file /var/tools/env/production.env -f production/compose.yml build portal
```

Далее сначала проверить собранный image и только потом запускать `up -d portal`.

**Примечание**: файлы проверены на структуру и корректность внесённых изменений, но полный Next.js build в этой среде не выполнен.

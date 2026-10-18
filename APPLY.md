# ToolDock production gateway fix

Use these three files in the root of the local monorepo and commit them.

- production/compose.yml: give Nginx both the private `tools` network and public `edge` network. Tool containers stay private.
- production/nginx/nginx.conf: rootless nginx PID/temp paths; remove unsupported brotli_vary directive.
- production/nginx/templates/site.conf.template: redirect www to canonical apex domain.

The site.conf file under production/nginx/conf.d is generated/ignored and is not included here.

Prior local fixes to persist in the same commit:

```bash
git rm -f apps/image-resizer/src/app/page.tsx apps/image-resizer/src/pages/home/ui/home-page.tsx
git rm -f apps/heic-converter/src/app/page.tsx apps/heic-converter/src/pages/home/ui/home-page.tsx
```

Verify those are obsolete before removal. For this project, the active App Router pages live under src/app/[locale]/page.tsx and FSD home pages under src/views/home/ui/home-page.tsx.

After committing and pushing locally, the server has uncommitted changes (nginx config and deleted pages). Check `git status --short` and preserve any other legitimate changes, then restore only the paths covered by the commit before pulling to avoid conflicts. Generated `production/nginx/conf.d/site.conf` remains untouched.

To deploy ONLY gateway change, on server after `git pull`:

```bash
docker compose --env-file /var/tools/env/production.env -f production/compose.yml config --quiet
docker compose --env-file /var/tools/env/production.env -f production/compose.yml up -d --no-deps --force-recreate nginx
docker compose --env-file /var/tools/env/production.env -f production/compose.yml ps nginx
```

# ToolDock production deployment

The production setup serves one ToolDock catalogue and five independent Next.js tools behind one Nginx gateway.

## Public routes

- `/` and `/ru` -> ToolDock portal
- `/image`, `/audio`, `/ru/image`, `/ru/audio` -> ToolDock categories

- `/image/remove-metadata/` -> Clearframe
- `/image/heic-to-jpg/` -> Skyconvert
- `/image/resize-images/` -> Leafsize
- `/audio/cut-audio/` -> Wavecut
- `/audio/convert-audio/` -> Soundshift

Each app still owns `/en` and `/ru` below its tool path. Visiting the tool root redirects according to the browser language.

The app `basePath` is supplied only during the production Docker build through `NEXT_PUBLIC_BASE_PATH`; normal local `pnpm dev` keeps the old localhost routes without a prefix.

## Architecture

```text
Internet
  -> :80 TCP / :443 TCP+UDP
  -> macbre/nginx-http3
       -> Portal      :3000
       -> Clearframe  :3000
       -> Skyconvert  :3000
       -> Leafsize    :3000
       -> Wavecut     :3000
       -> Soundshift  :3000
```

Nginx terminates TLS, serves HTTP/1.1 + HTTP/2 + HTTP/3, applies Brotli (gzip fallback), exposes root `robots.txt`, a sitemap index, and root `ads.txt`, then proxies each path to its own Next.js container.

## Server-owned files

The repository contains no production secrets or certificates. Keep these on the server:

```text
/var/tools/
├── env/
│   └── production.env
└── certs/
    ├── fullchain.pem
    └── privkey.pem
```

Run once from the repository root:

```bash
./production/bin/prepare-server.sh
```

Then edit `/var/tools/env/production.env` and install the certificate files.

## Required firewall ports

- `80/tcp` — HTTP -> HTTPS redirect
- `443/tcp` — HTTPS / HTTP2
- `443/udp` — QUIC / HTTP3

If UDP 443 is closed, the site still works over HTTP/2 but HTTP/3 will not negotiate.

## Deploy

```bash
./production/bin/deploy.sh
```

Useful commands:

```bash
./production/bin/logs.sh
./production/bin/logs.sh nginx
./production/bin/reload-nginx.sh
```

## TLS

Nginx expects exactly:

```text
/var/tools/certs/fullchain.pem
/var/tools/certs/privkey.pem
```

Certificate issuance/renewal can be done with host Certbot, acme.sh, or another ACME client. After renewal run `./production/bin/reload-nginx.sh`.

## SEO notes for the single-domain layout

`robots.txt` must be at the domain root, so the gateway owns it. `/sitemap.xml` is a sitemap index that points at the five app sitemaps. Each app receives its full canonical site URL during the Docker build, so canonical, hreflang, Open Graph and JSON-LD point to the public path rather than to an internal container address.

The portal is now publicly indexable on its canonical EN/RU URLs; the root sitemap index includes `portal-sitemap.xml` alongside the tool sitemaps. Do not accidentally restore the old static `noindex` root page.

## AdSense

`/ads.txt` at the domain root proxies Clearframe's shared ads.txt handler. Keep `ADSENSE_ENABLED=false` until AdSense approval. Publisher ID and slot IDs are public build-time values, not secrets.

Because all `NEXT_PUBLIC_*` values are baked into Next.js client bundles, changing the domain, tool URLs or AdSense IDs requires rebuilding the corresponding Docker images. `deploy.sh` already does this.

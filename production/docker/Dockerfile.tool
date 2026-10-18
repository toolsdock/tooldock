# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.18.0 --activate

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /repo

FROM base AS builder

# Warm the pnpm store from the lockfile first so source changes do not invalidate
# dependency downloads. BuildKit keeps this cache between image builds.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm fetch --frozen-lockfile

COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm install --offline --frozen-lockfile

ARG APP_PACKAGE
ARG APP_DIR
ARG NEXT_PUBLIC_BASE_PATH

# Public build-time configuration. NEXT_PUBLIC_* values are intentionally
# visible in the browser bundle and must never contain secrets.
ARG NEXT_PUBLIC_PORTAL_SITE_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_HEIC_SITE_URL
ARG NEXT_PUBLIC_RESIZER_SITE_URL
ARG NEXT_PUBLIC_WAVECUT_SITE_URL
ARG NEXT_PUBLIC_SOUNDSHIFT_SITE_URL

ARG NEXT_PUBLIC_CLEARFRAME_URL
ARG NEXT_PUBLIC_SKYCONVERT_URL
ARG NEXT_PUBLIC_LEAFSIZE_URL
ARG NEXT_PUBLIC_WAVECUT_URL
ARG NEXT_PUBLIC_SOUNDSHIFT_URL

ARG NEXT_PUBLIC_ADSENSE_ENABLED=false
ARG NEXT_PUBLIC_ADSENSE_CLIENT
ARG NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY
ARG NEXT_PUBLIC_ADSENSE_SLOT_SECONDARY
ARG NEXT_PUBLIC_ADS_PREVIEW=false

ENV NODE_ENV=production \
    NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH} \
    NEXT_PUBLIC_PORTAL_SITE_URL=${NEXT_PUBLIC_PORTAL_SITE_URL} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_HEIC_SITE_URL=${NEXT_PUBLIC_HEIC_SITE_URL} \
    NEXT_PUBLIC_RESIZER_SITE_URL=${NEXT_PUBLIC_RESIZER_SITE_URL} \
    NEXT_PUBLIC_WAVECUT_SITE_URL=${NEXT_PUBLIC_WAVECUT_SITE_URL} \
    NEXT_PUBLIC_SOUNDSHIFT_SITE_URL=${NEXT_PUBLIC_SOUNDSHIFT_SITE_URL} \
    NEXT_PUBLIC_CLEARFRAME_URL=${NEXT_PUBLIC_CLEARFRAME_URL} \
    NEXT_PUBLIC_SKYCONVERT_URL=${NEXT_PUBLIC_SKYCONVERT_URL} \
    NEXT_PUBLIC_LEAFSIZE_URL=${NEXT_PUBLIC_LEAFSIZE_URL} \
    NEXT_PUBLIC_WAVECUT_URL=${NEXT_PUBLIC_WAVECUT_URL} \
    NEXT_PUBLIC_SOUNDSHIFT_URL=${NEXT_PUBLIC_SOUNDSHIFT_URL} \
    NEXT_PUBLIC_ADSENSE_ENABLED=${NEXT_PUBLIC_ADSENSE_ENABLED} \
    NEXT_PUBLIC_ADSENSE_CLIENT=${NEXT_PUBLIC_ADSENSE_CLIENT} \
    NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY=${NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY} \
    NEXT_PUBLIC_ADSENSE_SLOT_SECONDARY=${NEXT_PUBLIC_ADSENSE_SLOT_SECONDARY} \
    NEXT_PUBLIC_ADS_PREVIEW=${NEXT_PUBLIC_ADS_PREVIEW}

RUN test -n "$APP_PACKAGE" && test -n "$APP_DIR"
RUN pnpm --filter "$APP_PACKAGE" build

# Next standalone in a monorepo keeps the app below apps/<app>/server.js.
# Assemble one fixed runtime directory so the runner stage stays generic.
RUN set -eux; \
    mkdir -p "/runtime/apps/${APP_DIR}/.next"; \
    cp -a "apps/${APP_DIR}/.next/standalone/." /runtime/; \
    cp -a "apps/${APP_DIR}/.next/static" "/runtime/apps/${APP_DIR}/.next/static"; \
    if [ -d "apps/${APP_DIR}/public" ]; then \
      cp -a "apps/${APP_DIR}/public" "/runtime/apps/${APP_DIR}/public"; \
    fi

FROM node:22-alpine AS runner

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

WORKDIR /app

ARG APP_DIR
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    APP_DIR=${APP_DIR}

COPY --from=builder --chown=nextjs:nodejs /runtime ./

USER nextjs
EXPOSE 3000

CMD ["sh", "-c", "exec node apps/$APP_DIR/server.js"]

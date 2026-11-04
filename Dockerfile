# syntax=docker/dockerfile:1.7
# csvtovcf.com — static site built with Astro, served by Caddy on :8080 as a non-root user.
# Target: final image ≤ 60 MB (the official Caddy binary is ~51 MB; it is UPX-compressed below).

ARG NODE_VERSION=24
ARG CADDY_VERSION=2.11.8
ARG ALPINE_VERSION=3.22

# ── 1. build ────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS build
ENV CI=true PNPM_HOME=/pnpm PATH=/pnpm:$PATH
WORKDIR /app
# An extra CA bundle can be passed as a build secret (corporate / sandbox TLS proxies):
#   docker build --secret id=ca,src=/path/ca.crt .
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/core/package.json packages/core/
COPY apps/web/package.json apps/web/
RUN --mount=type=secret,id=ca,required=false \
    if [ -f /run/secrets/ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/ca; fi; \
    npm i -g pnpm@10.28.0 --no-audit --no-fund >/dev/null && \
    pnpm install --frozen-lockfile
COPY . .
# Build-time settings (the site is static: changing them needs a rebuild)
ARG SITE_URL=https://csvtovcf.com
ARG ANALYTICS_PROVIDER=none
ARG PLAUSIBLE_DOMAIN=csvtovcf.com
ARG PLAUSIBLE_SRC=https://plausible.io/js/script.js
ARG ADS_ENABLED=false
ARG ADSENSE_CLIENT=
ARG ADSENSE_SLOT=
ARG GSC_VERIFICATION=
ARG BING_VERIFICATION=
ARG INDEXNOW_KEY=
# Limit the build to some languages (development only), e.g. CONTENT_LANGS=en,ru
ARG CONTENT_LANGS=
ENV SITE_URL=$SITE_URL ANALYTICS_PROVIDER=$ANALYTICS_PROVIDER PLAUSIBLE_DOMAIN=$PLAUSIBLE_DOMAIN PLAUSIBLE_SRC=$PLAUSIBLE_SRC \
    ADS_ENABLED=$ADS_ENABLED ADSENSE_CLIENT=$ADSENSE_CLIENT ADSENSE_SLOT=$ADSENSE_SLOT GSC_VERIFICATION=$GSC_VERIFICATION \
    BING_VERIFICATION=$BING_VERIFICATION INDEXNOW_KEY=$INDEXNOW_KEY CONTENT_LANGS=$CONTENT_LANGS
RUN pnpm --filter @csvtovcf/web build && \
    find apps/web/dist -name '*.woff' -delete

# ── 2. caddy binary, compressed ─────────────────────────────────────────────
FROM caddy:${CADDY_VERSION}-alpine AS caddy-official
FROM alpine:${ALPINE_VERSION} AS caddy
# UPX=0 skips compression (e.g. where the Alpine package repository is unreachable).
ARG UPX=1
COPY --from=caddy-official /usr/bin/caddy /usr/bin/caddy
RUN if [ "$UPX" = "1" ]; then \
      apk add --no-cache upx && upx --best --lzma /usr/bin/caddy && apk del upx; \
    fi && /usr/bin/caddy version

# ── 3. runtime ──────────────────────────────────────────────────────────────
FROM alpine:${ALPINE_VERSION}
ARG VERSION=dev
ARG REVISION=unknown
LABEL org.opencontainers.image.title="csvtovcf" \
      org.opencontainers.image.description="Contact spreadsheets to vCard, converted in the browser" \
      org.opencontainers.image.source="https://github.com/itensity-dev/csvtovcf" \
      org.opencontainers.image.url="https://csvtovcf.com" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.version="$VERSION" \
      org.opencontainers.image.revision="$REVISION"
RUN addgroup -S -g 10001 web && adduser -S -D -H -u 10001 -G web web && \
    mkdir -p /srv /config /data && chown web:web /config /data
COPY --from=caddy /usr/bin/caddy /usr/bin/caddy
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build --chown=root:root /app/apps/web/dist /srv
ENV XDG_CONFIG_HOME=/config XDG_DATA_HOME=/data CSP_CONNECT="'self'"
USER web
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]

#!/usr/bin/env sh
set -eu

DOMAIN="${DOMAIN:-tooldock.pro}"
BASE="https://${DOMAIN}"

check() {
  path="$1"
  printf '%-36s ' "$path"
  curl -fsS -o /dev/null -w '%{http_code}\n' "${BASE}${path}"
}

check '/'
check '/ru'
check '/image'
check '/audio'
check '/ru/image'
check '/ru/audio'
check '/image/remove-metadata/en'
check '/image/heic-to-jpg/en'
check '/image/resize-images/en'
check '/audio/cut-audio/en'
check '/audio/convert-audio/en'
check '/portal-sitemap.xml'

printf '\nCheck sitemap index contains the portal:\n'
curl -fsS "${BASE}/sitemap.xml" | grep -F 'portal-sitemap.xml'

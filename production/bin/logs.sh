#!/usr/bin/env sh
set -eu
docker compose --env-file /var/tools/env/production.env -f production/compose.yml logs -f --tail=200 "$@"

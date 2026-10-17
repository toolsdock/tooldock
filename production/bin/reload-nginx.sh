#!/usr/bin/env sh
set -eu
ENV_FILE=/var/tools/env/production.env
COMPOSE_FILE=production/compose.yml

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec nginx nginx -t
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec nginx nginx -s reload

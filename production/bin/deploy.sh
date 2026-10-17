#!/usr/bin/env sh
set -eu

ENV_FILE=/var/tools/env/production.env
COMPOSE_FILE=production/compose.yml

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi
if [ ! -f /var/tools/certs/fullchain.pem ] || [ ! -f /var/tools/certs/privkey.pem ]; then
  echo "Missing TLS files in /var/tools/certs (fullchain.pem + privkey.pem)" >&2
  exit 1
fi

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" config >/dev/null
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" build --pull
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --remove-orphans

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps

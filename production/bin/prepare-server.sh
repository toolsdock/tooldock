#!/usr/bin/env sh
set -eu

ROOT=/var/tools
ENV_DIR="$ROOT/env"
CERT_DIR="$ROOT/certs"

sudo mkdir -p "$ENV_DIR" "$CERT_DIR"
sudo chown -R "$(id -u):$(id -g)" "$ROOT"
chmod 700 "$ROOT" "$ENV_DIR" "$CERT_DIR"

if [ ! -f "$ENV_DIR/production.env" ]; then
  cp production/env/production.env.example "$ENV_DIR/production.env"
  chmod 600 "$ENV_DIR/production.env"
  echo "Created $ENV_DIR/production.env"
else
  echo "$ENV_DIR/production.env already exists; left unchanged"
fi

cat <<MSG

Server directories are ready.
Expected certificates:
  $CERT_DIR/fullchain.pem
  $CERT_DIR/privkey.pem

Next: edit $ENV_DIR/production.env and place the TLS certificate files.
MSG

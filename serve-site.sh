#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
PORT="${PORT:-4000}"

docker rm -f openj-jekyll >/dev/null 2>&1 || true

exec docker run --rm --name openj-jekyll \
  -p "${PORT}:4000" \
  -v "${ROOT_DIR}/docs:/srv/jekyll" \
  jekyll/jekyll:4.4.1 \
  jekyll serve \
    --host 0.0.0.0 \
    --source /srv/jekyll \
    --destination /srv/jekyll/_site

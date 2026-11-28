#!/usr/bin/env bash
# Runs the Masar checks and fails if any of them fails (used by .github/workflows/tests.yml).
set -u
cd "$(dirname "$0")/.."
fail=0
run(){ out=$("$@" 2>&1); if echo "$out" | grep -q "ALL OK" && ! echo "$out" | grep -q "^FAIL"; then echo "ok   $*"; else echo "FAIL $*"; echo "$out" | grep -E "^FAIL|Error" | head -20; fail=1; fi; }
export NODE_PATH="$(pwd)/node_modules${NODE_PATH:+:$NODE_PATH}"
AWS4=$(pwd)/node_modules/aws4 run node tests/server.mjs
mkdir -p .ci && cp tests/cloudsql.mjs .ci/ && ln -sfn ../node_modules .ci/node_modules && MASAR_MIG=$(pwd)/supabase/migrations run node .ci/cloudsql.mjs; rm -rf .ci
for t in home sub cloud admin pwa dlgx proptoggles svgvalid kshort; do run node tests/$t.js; done
exit $fail

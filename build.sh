#!/usr/bin/env bash
# Cloudflare Pages build: copies only the files the website needs into dist/ (tests, server code and notes stay out).
set -euo pipefail
rm -rf dist && mkdir -p dist/icons dist/models
cp masar.html admin.html masar-config.js manifest.webmanifest sw.js _redirects _headers dist/
cp icons/* dist/icons/
cp models/*.onnx models/README.md dist/models/
echo "Built dist/ with $(ls dist | wc -l) entries"

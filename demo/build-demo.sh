#!/usr/bin/env bash
# Makes masar-demo.html and admin-demo.html: the real pages with the in-page DEMO server instead of masar-config.js.
# Only for trying the subscription screens without a server. Never deploy these.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - <<'PY'
d=open('demo/demo-server.js',encoding='utf-8').read()
for src,dst in (('masar.html','demo/masar-demo.html'),('admin.html','demo/admin-demo.html')):
    s=open(src,encoding='utf-8').read()
    tag='<script src="masar-config.js"></script>'
    assert s.count(tag)==1,src
    s=s.replace(tag,'<script>\n'+d+'\n</script>').replace('<title>Masar</title>','<title>Masar (DEMO)</title>').replace('<title>Masar Admin</title>','<title>Masar Admin (DEMO)</title>')
    open(dst,'w',encoding='utf-8').write(s)
print('built demo/masar-demo.html and demo/admin-demo.html')
PY

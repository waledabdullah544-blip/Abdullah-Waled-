const L=require('./lib.js'),fs=require('fs');
(async()=>{
const H=await L.open({launch:{args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']},page:{ignoreHTTPSErrors:true}}),pg=H.pg,ctx=pg.context();let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const u=r.request().url(),dir=/onnxruntime-web@1\.20\.1/.test(u)?'/tmp/mdl/ort/':'/tmp/mdl/tf/',f=dir+u.split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
const b64=fs.readFileSync('/tmp/mdl/lowres.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="360" height="448" preserveAspectRatio="none"/>');sel=new Set([o]);window.__o=o;commit();draw();
 const c=document.createElement('canvas');c.width=90;c.height=112;const x=c.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,90,112);x.fillStyle='#fff';x.beginPath();x.ellipse(45,56,30,48,0,0,7);x.fill();
 await RBMASK.make(o,o.g.querySelector('image'),c);commit();draw()},b64);
await pg.waitForTimeout(500);
const info=()=>pg.evaluate(async()=>{const P=RBMASK.parts(__o.g),i=new Image();i.src=P.out.getAttribute('href');await i.decode();const s=new Image();s.src=P.sr.getAttribute('href');await s.decode();return{out:[i.naturalWidth,i.naturalHeight],src:[s.naturalWidth,s.naturalHeight],masked:RBMASK.masked(__o)}});
console.log('before',JSON.stringify(await info()));
await pg.evaluate(()=>window.rbUpscale());await pg.waitForTimeout(400);await pg.click('.fxm button[data-k=Upscale]');
await pg.waitForFunction(()=>!document.querySelector('.fxm'),null,{timeout:300000});await pg.waitForTimeout(1500);
const a=await info();console.log('after',JSON.stringify(a));
ok('masked image: source is now 360x448',a.src[0]===360&&a.src[1]===448&&a.masked);
ok('masked image: result re-rendered at the new resolution',a.out[0]===360&&a.out[1]===448);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(1500);const b=await info();ok('undo: back to 90x112 source and mask intact '+JSON.stringify(b),b.src[0]===90&&b.masked);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

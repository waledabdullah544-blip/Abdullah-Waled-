const L=require('./lib.js'),fs=require('fs'),cp=require('child_process');
(async()=>{
// a small low-resolution test picture
cp.execFileSync('/tmp/ortenv/bin/python',['-c',"from PIL import Image;im=Image.open('/tmp/mdl/p_portrait-of-woman_small.jpg').convert('RGB');im.resize((im.width//4,im.height//4),Image.BICUBIC).save('/tmp/mdl/lowres.jpg',quality=92)"]);
const H=await L.open({launch:{args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']},page:{ignoreHTTPSErrors:true}}),pg=H.pg,ctx=pg.context();let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const u=r.request().url();if(/\/gh\/.*\.onnx/.test(u)){const f=require('path').resolve(__dirname,'../models/'+u.split('/').pop());return r.fulfill({body:fs.readFileSync(f),contentType:'application/octet-stream',headers:{'access-control-allow-origin':'*'}})}const dir=/onnxruntime-web@1\.20\.1/.test(u)?'/tmp/mdl/ort/':'/tmp/mdl/tf/',f=dir+u.split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
pg.on('console',m=>{if(/error/i.test(m.type())&&!/W:onnx/.test(m.text()))console.log('CONSOLE',m.text().slice(0,200))});
const b64=fs.readFileSync('/tmp/mdl/lowres.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="360" height="448" preserveAspectRatio="none"/>');sel=new Set([o]);window.__o=o;commit();draw()},b64);
await pg.waitForTimeout(300);
ok('bar shows Upscale',await pg.evaluate(()=>getComputedStyle(document.querySelector('#rbctx .rbup')).display!=='none'));
await pg.click('#rbctx .rbup');await pg.waitForTimeout(400);
ok('Photo (RealPLKSR) is the default model, strength 90',await pg.evaluate(()=>document.querySelector('.fxm [data-k=mdl]').value==='photo'&&document.querySelector('.fxm [data-k=st]').value==='90'));
ok('dialog opens with size info',await pg.evaluate(()=>/90 × 112.*360 × 448/.test(document.getElementById('upinfo').textContent)));
const t0=Date.now();await pg.click('.fxm button[data-k=Upscale]');
await pg.waitForFunction(()=>!document.querySelector('.fxm'),null,{timeout:300000});
const r=await pg.evaluate(async()=>{const im=__o.g.querySelector('image'),h=im.getAttribute('href');const i=new Image();i.src=h;await i.decode();return{pre:h.slice(0,16),w:i.naturalWidth,h:i.naturalHeight,len:h.length,xywh:[im.getAttribute('x'),im.getAttribute('width')].join()}});
console.log('secs',(Date.now()-t0)/1000,JSON.stringify(r));
ok('image replaced with a 4x bigger picture (jpeg)',r.pre.startsWith('data:image/jpeg')&&r.w===360&&r.h===448);
ok('placed size unchanged',r.xywh==='100,360');
await pg.keyboard.press('Control+z');await pg.waitForTimeout(300);
ok('undo restores the small original',await pg.evaluate(async()=>{const h=__o.g.querySelector('image').getAttribute('href'),i=new Image();i.src=h;await i.decode();return i.naturalWidth===90}));
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(300);
// cancel mid-way
await pg.click('#rbctx .rbup');await pg.waitForTimeout(300);await pg.selectOption('.fxm [data-k=mdl]','detail');await pg.click('.fxm button[data-k=Upscale]');await pg.waitForTimeout(1500);
await pg.click('.fxm button[data-k=Cancel]');await pg.waitForTimeout(500);
ok('cancel closes the dialog and the job',await pg.evaluate(()=>!document.querySelector('.fxm')));
// keep original option
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.click('#rbctx .rbup');await pg.waitForTimeout(300);
await pg.selectOption('.fxm [data-k=sc]','2');await pg.evaluate(()=>{const c=document.querySelector('.fxm [data-k=keep]');c.checked=true});await pg.click('.fxm button[data-k=Upscale]');
await pg.waitForFunction(()=>!document.querySelector('.fxm'),null,{timeout:300000});
const k=await pg.evaluate(()=>({n:objs.length,nm:objs.map(o=>o.nm)}));ok('keep original adds a copy '+JSON.stringify(k),k.n===2&&/upscaled/.test(k.nm[1]));
await pg.screenshot({path:'/tmp/mdl/up1.png'});
try{const h=await pg.evaluate(()=>{const i=[...document.querySelectorAll('#layer image')].map(x=>x.getAttribute('href')).sort((a,b)=>b.length-a.length)[0];return i});if(h&&h.startsWith('data:'))require('fs').writeFileSync('/tmp/mdl/up_out.jpg',Buffer.from(h.split(',')[1],'base64'))}catch(_){}
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

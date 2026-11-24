const L=require('./lib.js'),fs=require('fs');
(async()=>{const H=await L.open({launch:{args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']},page:{ignoreHTTPSErrors:true}}),pg=H.pg,ctx=pg.context();
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const f='/tmp/mdl/tf/'+r.request().url().split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
const b64=fs.readFileSync('/tmp/mdl/p_portrait-of-woman_small.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="360" height="450" preserveAspectRatio="none"/>');sel=new Set([o]);window.__o=o;commit();draw()},b64);
await pg.waitForTimeout(300);await pg.click('#rbctx .rbgo');await pg.waitForFunction(()=>!window.RBAI.busy&&window.RBMASK.masked(__o),null,{timeout:200000});await pg.waitForTimeout(800);
// zoom 300% on the left hair edge
await pg.evaluate(()=>{sel=new Set();draw()});
const clip=await pg.evaluate(()=>{const b=wbox(__o);return{x:Math.round(cv.getBoundingClientRect().left+(b.x+b.w*.05)*z+px),y:Math.round(cv.getBoundingClientRect().top+(b.y+b.h*.28)*z+py),width:Math.round(b.w*.3*z),height:Math.round(b.h*.4*z)}});
await pg.screenshot({path:'/tmp/mdl/dc0.png',clip});
await pg.evaluate(()=>{const P=RBMASK.parts(__o.g);P.mk.setAttribute('data-rbdc','100');draw()});await pg.waitForTimeout(3500);
await pg.screenshot({path:'/tmp/mdl/dc100.png',clip});
const px=await pg.evaluate(async()=>{const P=RBMASK.parts(__o.g);return P.out.getAttribute('href').slice(0,5)});console.log(px,H.errs);await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

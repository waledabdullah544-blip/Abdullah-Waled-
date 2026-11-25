const L=require('./lib.js'),fs=require('fs');
(async()=>{const H=await L.open({launch:{args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']},page:{ignoreHTTPSErrors:true}}),pg=H.pg,ctx=pg.context();let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const f='/tmp/mdl/tf/'+r.request().url().split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
const b64=fs.readFileSync('/tmp/mdl/sun.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="300" height="400" preserveAspectRatio="none"/>');sel=new Set([o]);window.__o=o;commit();draw()},b64);
await pg.waitForTimeout(300);
ok('default model is Balanced',await pg.evaluate(()=>document.querySelector('#rbctx .rbmd').value==='balanced'));
ok('model list: Balanced, Studio, Fast',await pg.evaluate(()=>[...document.querySelectorAll('#rbctx .rbmd option')].map(o=>o.value).join()==='balanced,studio,fast'));
// X dismisses the bar for this selection, reselect brings it back
await pg.click('#rbctx .rbx');await pg.waitForTimeout(150);
ok('X hides the bar',await pg.evaluate(()=>getComputedStyle(document.getElementById('rbctx')).display==='none'));
await pg.evaluate(()=>{sel=new Set();draw()});await pg.evaluate(()=>{sel=new Set([__o]);draw()});await pg.waitForTimeout(150);
ok('bar returns after deselect + reselect',await pg.evaluate(()=>getComputedStyle(document.getElementById('rbctx')).display!=='none'));
// cancel while the AI works
await pg.click('#rbctx .rbgo');await pg.waitForTimeout(700);
ok('busy',await pg.evaluate(()=>window.RBAI.busy));
await pg.click('#rbctx .rbx');await pg.waitForFunction(()=>!window.RBAI.busy,null,{timeout:20000});await pg.waitForTimeout(200);
ok('X cancels the job, no mask, no alert',await pg.evaluate(()=>!RBMASK.masked(__o)&&!document.getElementById('aialert')&&/cancel/i.test(document.getElementById('hint').textContent)));
// full run with Balanced, then edit panel X
await pg.click('#rbctx .rbgo');await pg.waitForFunction(()=>!window.RBAI.busy&&window.RBMASK.masked(__o),null,{timeout:300000});await pg.waitForTimeout(600);
ok('Balanced produced a mask',await pg.evaluate(()=>RBMASK.masked(__o)));
await pg.click('#rbctx .rbed');await pg.waitForTimeout(700);
ok('edit panel open',await pg.evaluate(()=>window.rbEditing()));
await pg.click('#rbed .xb');await pg.waitForTimeout(400);
ok('edit panel X closes it',await pg.evaluate(()=>!window.rbEditing()&&getComputedStyle(document.getElementById('rbed')).display==='none'));
await pg.click('#rbctx .rbx');await pg.waitForTimeout(150);
ok('X hides the masked-image bar too',await pg.evaluate(()=>getComputedStyle(document.getElementById('rbctx')).display==='none'));
// Outline badge
await pg.keyboard.press('Control+y');await pg.waitForTimeout(200);
ok('Ctrl+Y shows the Outline badge',await pg.evaluate(()=>getComputedStyle(document.getElementById('olbadge')).display==='flex'&&cv.classList.contains('outlv')));
await pg.click('#olbadge button');await pg.waitForTimeout(200);
ok('badge button returns to Preview',await pg.evaluate(()=>getComputedStyle(document.getElementById('olbadge')).display==='none'&&!cv.classList.contains('outlv')&&/Preview/.test(document.getElementById('tab').textContent)));
// cursors: no pointing hand / grab hand on interface chrome
const cur=await pg.evaluate(()=>{const bad=[];document.querySelectorAll('button,.tb,[role=tab],select,label,.dkt,#tbgrip,.lyr,.swc,.sw').forEach(e=>{const c=getComputedStyle(e).cursor;if(c==='pointer'||c==='grab'||c==='grabbing')bad.push((e.id||e.className||e.tagName)+':'+c)});return[...new Set(bad)].slice(0,12)});
ok('no pointer/grab cursors on UI chrome '+JSON.stringify(cur),cur.length===0);
const hand=await pg.evaluate(()=>{setTool('h');const c=getComputedStyle(cv).cursor;setTool('v');return c});ok('Hand tool still shows the grab hand on the canvas: '+hand,/grab/.test(hand));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

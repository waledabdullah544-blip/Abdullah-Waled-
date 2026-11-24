const L=require('./lib.js'),fs=require('fs');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const b64=fs.readFileSync('/tmp/mdl/p_portrait-of-woman_small.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="360" height="450" preserveAspectRatio="none"/>');sel=new Set([o]);commit();draw();
 const c=document.createElement('canvas');c.width=360;c.height=450;const x=c.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,360,450);x.fillStyle='#fff';x.beginPath();x.ellipse(180,225,120,190,0,0,7);x.fill();
 window.__o=o;await RBMASK.make(o,o.g.querySelector('image'),c);commit();draw()},b64);await pg.waitForTimeout(400);
const r=await pg.evaluate(async()=>{const b0=wbox(__o);setW(__o,b0.x+20,b0.y+10,b0.w/2,b0.h/2);commit();draw();await new Promise(r=>setTimeout(r,300));const b=wbox(__o);return[Math.round(b.w),Math.round(b.h),RBMASK.masked(__o)]});ok('scale keeps mask '+r,r[0]===180&&r[1]===225&&r[2]);
await pg.keyboard.press('Control+c');await pg.keyboard.press('Control+v');await pg.waitForTimeout(500);
const d=await pg.evaluate(()=>({n:objs.length,m:objs.map(o=>RBMASK.masked(o)),hrefs:objs.map(o=>RBMASK.masked(o)?RBMASK.parts(o.g).out.getAttribute('href').slice(0,5):'-')}));ok('paste makes a 2nd masked object '+JSON.stringify(d),d.n===2&&d.m.every(Boolean)&&d.hrefs.every(h=>h==='blob:'));
await pg.evaluate(()=>{RBMASK.toggle(objs[1])});await pg.waitForTimeout(200);
const t=await pg.evaluate(()=>objs.map(o=>RBMASK.parts(o.g).mk.getAttribute('data-rbon')));ok('toggle only affects one copy '+t,t[0]!==t[1]);
await pg.keyboard.press('m');await H.drag(600,200,700,300);await pg.waitForTimeout(200);
ok('rectangle tool still creates a shape',await pg.evaluate(()=>objs.length===3));
await pg.evaluate(()=>{window.DK&&DK.open&&DK.open('layers')});await pg.waitForTimeout(300);
const th=await pg.$$('#lyp .rbmk');ok('mask thumbs in Layers: '+th.length,th.length===2);
if(th.length){const before=await pg.evaluate(()=>RBMASK.parts(objs[1].g).mk.getAttribute('data-rbon'));await th[0].click({modifiers:['Shift']});await pg.waitForTimeout(300);const after=await pg.evaluate(()=>RBMASK.parts(objs[1].g).mk.getAttribute('data-rbon'));ok('shift+click thumbnail toggles '+before+'->'+after,before!==after)}
await pg.screenshot({path:'/tmp/mdl/p2b.png'});
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

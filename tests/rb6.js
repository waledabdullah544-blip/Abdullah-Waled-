const L=require('./lib.js'),fs=require('fs');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const b64=fs.readFileSync('/tmp/mdl/p_portrait-of-woman_small.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="360" height="450" preserveAspectRatio="none"/>');sel=new Set([o]);commit();draw();
 const c=document.createElement('canvas');c.width=360;c.height=450;const x=c.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,360,450);x.fillStyle='#fff';x.beginPath();x.ellipse(180,225,120,190,0,0,7);x.fill();
 /* a hole */x.fillStyle='#000';x.beginPath();x.arc(180,225,40,0,7);x.fill();
 window.__o=o;await RBMASK.make(o,o.g.querySelector('image'),c);commit();draw()},b64);await pg.waitForTimeout(500);
ok('bar has Mask to Path / Die-Cut',await pg.evaluate(()=>getComputedStyle(document.querySelector('#rbctx .rbpt')).display!=='none'&&getComputedStyle(document.querySelector('#rbctx .rbdc')).display!=='none'));
// ---- Mask to path ----
await pg.click('#rbctx .rbpt');await pg.waitForTimeout(900);
let st=await pg.evaluate(()=>{const n=objs.length,p=objs[n-1],d=p.g.querySelector('path'),b=wbox(p);return{n,nm:p.nm,sub:(d.getAttribute('d').match(/M/g)||[]).length,bw:Math.round(b.w),bh:Math.round(b.h),dlg:!!document.querySelector('.fxm')}});
ok('preview path: 2 sub-paths (outer + hole), bbox ~240x380 '+JSON.stringify(st),st.dlg&&st.sub===2&&Math.abs(st.bw-240)<6&&Math.abs(st.bh-380)<6);
await pg.click('.fxm button[data-k=OK]');await pg.waitForTimeout(400);
st=await pg.evaluate(()=>({n:objs.length,sel:sel.size,dlg:!!document.querySelector('.fxm'),pts:parseD(objs[objs.length-1].g.querySelector('path').getAttribute('d')).length}));
ok('OK keeps path as a real, parseable object '+JSON.stringify(st),st.n===2&&st.sel===1&&!st.dlg&&st.pts===2);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(300);ok('undo removes the path',await pg.evaluate(()=>objs.length===1));
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(300);ok('redo brings it back',await pg.evaluate(()=>objs.length===2));
// the path is a Pen-editable path: direct select tool shows anchors
// ---- with clipping mask option ----
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.click('#rbctx .rbpt');await pg.waitForTimeout(600);
await pg.evaluate(()=>{const c=document.querySelector('.fxm [data-k=clip]');c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(300);
await pg.click('.fxm button[data-k=OK]');await pg.waitForTimeout(500);
st=await pg.evaluate(()=>({n:objs.length,clip:objs.some(o=>!!o.g.querySelector('[data-clipmask]')),nm:objs.map(o=>o.nm)}));
ok('clip option makes a clipping mask from a copy '+JSON.stringify(st),st.n===2&&st.clip);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(300);
// ---- Die-cut ----
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.click('#rbctx .rbdc');await pg.waitForTimeout(1200);
st=await pg.evaluate(()=>{const n=objs.length,p=objs.find(o=>o.nm==='Die-cut line'),b=wbox(p),d=p.g.querySelector('path');return{n,idx:objs.indexOf(p),sub:(d.getAttribute('d').match(/M/g)||[]).length,bw:Math.round(b.w),bh:Math.round(b.h),fill:d.getAttribute('fill')}});
ok('die-cut: single outer loop (holes filled), grows by ~2*16 px, sits below the image '+JSON.stringify(st),st.sub===1&&Math.abs(st.bw-(240+34))<8&&Math.abs(st.bh-(380+34))<8&&st.idx===0&&st.fill==='#ffffff');
await pg.screenshot({path:'/tmp/mdl/p4_die.png'});
await pg.evaluate(()=>{const s=document.querySelector('.fxm [data-k=off]');s.value=40;s.dispatchEvent(new Event('input',{bubbles:true}))});await pg.waitForTimeout(900);
const b2=await pg.evaluate(()=>{const p=objs.find(o=>o.nm==='Die-cut line'),b=wbox(p);return Math.round(b.w)});ok('offset 40 -> wider '+b2,Math.abs(b2-(240+82))<10);
await pg.click('.fxm button[data-k=OK]');await pg.waitForTimeout(400);
ok('die-cut committed (2 objects)',await pg.evaluate(()=>objs.length===2));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(300);ok('undo die-cut',await pg.evaluate(()=>objs.length===1));
// cancel leaves nothing behind
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.click('#rbctx .rbpt');await pg.waitForTimeout(700);await pg.click('.fxm button[data-k=Cancel]');await pg.waitForTimeout(300);
ok('cancel removes preview',await pg.evaluate(()=>objs.length===1&&!document.querySelector('.fxm')));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

const L=require('./lib.js'),fs=require('fs');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const b64=fs.readFileSync('/tmp/mdl/p_portrait-of-woman_small.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="360" height="450" preserveAspectRatio="none" data-placed="p.jpg"/>');sel=new Set([o]);commit();draw();
 // synthetic matte: ellipse
 const c=document.createElement('canvas');c.width=360;c.height=450;const x=c.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,360,450);x.fillStyle='#fff';x.beginPath();x.ellipse(180,225,120,190,0,0,7);x.fill();
 window.__o=o;await RBMASK.make(o,o.g.querySelector('image'),c);commit();draw()},b64);
await pg.waitForTimeout(500);
const info=()=>pg.evaluate(()=>{const o=__o,P=RBMASK.parts(o.g);return{masked:RBMASK.masked(o),n:objs.length,href:P&&P.out.getAttribute('href').slice(0,5),imgs:o.g.querySelectorAll('image').length,thumb:!!document.querySelector('#lyp .rbmk img'),bar:getComputedStyle(document.getElementById('rbctx')).display,tg:document.querySelector('#rbctx .rbtg').textContent,on:P&&P.mk.getAttribute('data-rbon')}});
let i=await info();ok('masked object has blob result image',i.masked&&i.href==='blob:');
ok('obj count 1',i.n===1);
const bb=await pg.evaluate(()=>{const b=wbox(__o);return[b.w,b.h]});ok('bbox still image size '+bb,Math.abs(bb[0]-360)<1&&Math.abs(bb[1]-450)<1);
ok('context bar shows Mask: On',i.bar==='flex'&&i.tg==='Mask: On');
// pixel check: render result image and sample corner (transparent) and center (opaque)
const px=await pg.evaluate(async()=>{const P=RBMASK.parts(__o.g),im=new Image();im.src=P.out.getAttribute('href');await im.decode();const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.drawImage(im,0,0);return{w:c.width,corner:x.getImageData(2,2,1,1).data[3],mid:x.getImageData(180,225,1,1).data[3]}});
ok('result: corner transparent, centre opaque '+JSON.stringify(px),px.corner===0&&px.mid===255);
// layers panel thumbnail
await pg.keyboard.press('F7').catch(()=>{});await pg.evaluate(()=>{window.DK&&DK.open&&DK.open('layers')});await pg.waitForTimeout(400);
i=await info();console.log('layers thumb present',i.thumb);
// toggle off
await pg.click('#rbctx .rbtg');await pg.waitForTimeout(300);i=await info();ok('toggle off -> on=0 and original shown',i.on==='0'&&i.tg==='Mask: Off'&&i.href==='data:');
await pg.keyboard.press('Control+z');await pg.waitForTimeout(400);i=await info();ok('undo toggle -> masked again blob',i.on==='1'&&i.href==='blob:');
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(400);i=await info();ok('redo toggle -> off',i.on==='0');
await pg.keyboard.press('Control+z');await pg.waitForTimeout(300);
// duplicate and undo through the mask creation
const px2=await pg.evaluate(async()=>{const P=RBMASK.parts(__o.g);return P.out.getAttribute('href').slice(0,5)});ok('after undo/redo cycle still blob',px2==='blob:');
// SVG export has real mask + original
const svg=await pg.evaluate(()=>fileSVGString());ok('export: has <mask> + original jpeg, no blob:',/<mask /.test(svg)&&/data:image\/jpeg/.test(svg)&&!/blob:/.test(svg));
// save/load roundtrip
const D=await pg.evaluate(()=>{const o=objs[0],h=window.rbPack(o);return{h:h.length,hasMd:/data-rbmd=/.test(h),noBlob:!/blob:/.test(h),noId:!/data-rbm="/.test(h)}});ok('save pack: embeds mask data, no blob/id '+JSON.stringify(D),D.hasMd&&D.noBlob&&D.noId);
const rt=await pg.evaluate(async()=>{const o=objs[0],r={a:{},h:window.rbPack(o),m:{...o.m},ly:o.ly,nm:o.nm,lh:o.lh};fileLoadMasar({masar:1,ab:[800,600],objs:[r]});await new Promise(r=>setTimeout(r,900));const q=objs[0],P=RBMASK.parts(q.g);return{masked:RBMASK.masked(q),blob:P&&P.out.getAttribute('href').slice(0,5),id:!!(P&&RBMASK.MSK.get(P.mk.getAttribute('data-rbm')))}});ok('load roundtrip restores mask '+JSON.stringify(rt),rt.masked&&rt.blob==='blob:'&&rt.id);
// remove mask
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.click('#rbctx .rbrm');await pg.waitForTimeout(300);
const rm=await pg.evaluate(()=>({m:RBMASK.masked(objs[0]),imgs:objs[0].g.querySelectorAll('image').length,h:objs[0].g.querySelector('image').getAttribute('href').slice(0,10)}));ok('remove mask restores single original image '+JSON.stringify(rm),!rm.m&&rm.imgs===1&&rm.h==='data:image');
await pg.keyboard.press('Control+z');await pg.waitForTimeout(500);
ok('undo remove -> masked again',await pg.evaluate(()=>RBMASK.masked(objs[0])));
await pg.screenshot({path:'/tmp/mdl/p2.png'});
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
const Q=()=>pg.evaluate(()=>{const o=objs[0],e=o.g.querySelector('path,rect');if(e.tagName==='rect'){const b=wbox(o);return[[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.h],[b.x,b.y+b.h]].map(q=>[Math.round(q[0]*z+px),Math.round(q[1]*z+py)])}
  const W=world.getCTM().inverse().multiply(e.getCTM()),n=(e.getAttribute('d').match(/-?\d*\.?\d+/g)||[]).map(Number),P=[];for(let i=0;i+1<n.length&&P.length<4;i+=2){const q=new DOMPoint(n[i],n[i+1]).matrixTransform(W);P.push([Math.round(q.x*z+px),Math.round(q.y*z+py)])}return P});
const fresh=async()=>{await H.reset();await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('e');await pg.waitForTimeout(150)};
await fresh();
ok('widget visible with the Free Transform tool',await pg.evaluate(()=>getComputedStyle(document.getElementById('ftw')).display==='flex'));
// Free Distort: drag the bottom-right corner only
await pg.click('#ftw [data-k=fd]');await H.drag(420,300,460,330);await pg.waitForTimeout(200);let q=await Q();
ok('Free Distort moves only the dragged corner',Math.abs(q[2][0]-460)<=2&&Math.abs(q[2][1]-330)<=2&&Math.abs(q[0][0]-300)<=2&&Math.abs(q[1][0]-420)<=2&&Math.abs(q[3][1]-300)<=2,JSON.stringify(q));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);
// Perspective: drag the top-right corner right -> top-left goes left (symmetric)
await fresh();await pg.click('#ftw [data-k=pd]');await H.drag(420,200,450,200);await pg.waitForTimeout(200);q=await Q();
ok('Perspective Distort moves the opposite corner of the edge the other way',q[1][0]>425&&q[0][0]<295&&Math.abs(q[2][0]-420)<=2&&Math.abs(q[3][0]-300)<=2,JSON.stringify(q));
// Constrain: scale keeps proportions
await fresh();await pg.click('#ftw [data-k=ft]');await pg.click('#ftw [data-k=c]');await H.drag(420,300,520,310);await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{const b=wbox(objs[0]);return b.w/b.h});ok('Constrain keeps the 6:5 proportion',Math.abs(r-1.2)<.03,String(r));
await pg.click('#ftw [data-k=c]');
await pg.keyboard.press('v');await pg.waitForTimeout(100);ok('widget hides with another tool',await pg.evaluate(()=>getComputedStyle(document.getElementById('ftw')).display==='none'));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

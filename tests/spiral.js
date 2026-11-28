const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
const chk=(dec)=>pg.evaluate(dec=>{const p=objs[objs.length-1].g.querySelector('path'),M=p.getCTM(),W=world.getCTM().inverse(),T=W.multiply(M),Lt=p.getTotalLength(),c=[300-px,250-py].map(v=>v/z);
  const P=[];for(let i=0;i<=400;i++){const q=p.getPointAtLength(Lt*i/400),r=new DOMPoint(q.x,q.y).matrixTransform(T);P.push(Math.hypot(r.x-c[0],r.y-c[1]))}
  let mono=true;for(let i=1;i<P.length;i++)if(dec?P[i]>P[i-1]+.5:P[i]<P[i-1]-.5)mono=false;return{mono,outer:Math.round(dec?P[0]:P[P.length-1]),segs:(p.getAttribute('d').match(/C/g)||[]).length}},dec);
await pg.evaluate(()=>setTool('spi'));
for(const ups of [0,10,40]){
  await pg.mouse.move(H.R.x+300,H.R.y+250);await pg.mouse.down();await pg.mouse.move(H.R.x+400,H.R.y+250,{steps:5});
  for(let i=0;i<ups;i++)await pg.keyboard.press('ArrowUp');await pg.mouse.move(H.R.x+400,H.R.y+250);await pg.mouse.up();await pg.waitForTimeout(150);
  const r=await chk(true);ok('spiral with +'+ups+' segments: winds inward smoothly, outer end stays under the pointer',r.mono&&Math.abs(r.outer-100)<2,JSON.stringify(r));
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();GOPT.spi.seg=10;commit();draw()})}
await pg.evaluate(()=>{GOPT.spi.decay=120});
await pg.mouse.move(H.R.x+300,H.R.y+250);await pg.mouse.down();await pg.mouse.move(H.R.x+400,H.R.y+250,{steps:5});await pg.mouse.up();await pg.waitForTimeout(150);
const r=await chk(false);ok('decay 120%: winds outward, outer end under the pointer',r.mono&&Math.abs(r.outer-100)<2,JSON.stringify(r));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

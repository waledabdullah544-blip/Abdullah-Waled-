const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
const hand=async(y,f)=>{await pg.mouse.move(H.R.x+150,H.R.y+y);await pg.mouse.down();let x=150;for(let i=0;i<60;i++){x+=2+((i*7)%5);await pg.mouse.move(H.R.x+x,H.R.y+y+f(i))}await pg.mouse.up();await pg.waitForTimeout(200)};
const jit=i=>Math.sin(i*1.7)*1.6+((i*13)%3-1)*.7;
for(const t of ['pc','br','bb']){await pg.evaluate(t=>setTool(t),t);await hand(150,jit);
  const r=await pg.evaluate(()=>{const p=objs[objs.length-1].g.querySelector('path'),d=p.getAttribute('d');return{segs:(d.match(/[CL]/g)||[]).length,d:d.slice(0,60)}});
  ok(t+': a shaky straight stroke becomes a straight line',t==='bb'?r.segs<=12:r.segs===1,JSON.stringify(r));
  await hand(250,i=>40*Math.sin(i/6)+jit(i));
  const c=await pg.evaluate(()=>{const p=objs[objs.length-1].g.querySelector('path'),b=p.getBBox();return{h:Math.round(b.height)}});
  ok(t+': a real curve stays a curve',c.h>60,JSON.stringify(c));
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()})}
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

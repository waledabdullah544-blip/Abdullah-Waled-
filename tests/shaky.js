const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};const R=H.R;await pg.evaluate(()=>{z=1;view()});
const S=(x,y)=>pg.evaluate(([x,y])=>w2s(x,y),[x,y]);let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647-.5};
const run=async(tool,fid,shape,amp)=>{await pg.evaluate(([t,f])=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();setTool(t);if(t==='pc')PCO.fid=f;else BRO.fid=f;commit();draw()},[tool,fid]);
  const ideal=[];for(let i=0;i<=80;i++){const t=i/80;ideal.push(shape==='line'?[100+t*400,150+t*150]:shape==='wave'?[100+t*480,250+Math.sin(t*Math.PI*8)*25]:[300+180*Math.cos(Math.PI*(1-t)),300-180*Math.sin(Math.PI*(1-t))])}
  const P=[];for(const q of ideal){const s=await S(q[0]+rnd()*2*amp,q[1]+rnd()*2*amp);P.push(s)}
  await pg.mouse.move(R.x+P[0][0],R.y+P[0][1]);await pg.mouse.down();for(const q of P.slice(1))await pg.mouse.move(R.x+q[0],R.y+q[1]);await pg.mouse.up();await pg.waitForTimeout(200);
  const r=await pg.evaluate(id=>{const o=objs[objs.length-1];const pe=o.g.querySelector('path[data-bc]')||o.g.querySelector('path');const sp=getSP(pe)[0];
    /* sample the result and measure its distance to the ideal curve */const L=pe.getTotalLength(),pts=[];for(let i=0;i<=200;i++){const q=pe.getPointAtLength(L*i/200);pts.push([q.x+o.m.tx,q.y+o.m.ty])}
    let mx=0,sum=0;for(const q of pts){let d=1e9;for(const w of id)d=Math.min(d,Math.hypot(q[0]-w[0],q[1]-w[1]));mx=Math.max(mx,d);sum+=d}
    /* wobble: how much the direction turns back and forth */let turn=0;for(let i=2;i<pts.length;i++){const a=Math.atan2(pts[i-1][1]-pts[i-2][1],pts[i-1][0]-pts[i-2][0]),b=Math.atan2(pts[i][1]-pts[i-1][1],pts[i][0]-pts[i-1][0]);let d=b-a;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;turn+=Math.abs(d)}
    return{anchors:sp.pts.length,max:+mx.toFixed(1),avg:+(sum/pts.length).toFixed(2),turn:+turn.toFixed(2)}},ideal);
  return r};
for(const tool of ['pc','br']){
  for(const shape of ['line','arc']){const r=await run(tool,3,shape,6);ok(tool+' (default smoothness): a strongly shaking '+shape+' comes out smooth',r.turn<(shape==='line'?8:9)&&r.anchors<25&&r.max<9,r)}
  const w=await run(tool,1,'wave',0);ok(tool+' (accurate): a steady wavy stroke keeps its waves',w.turn>12&&w.max<6,w)}
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

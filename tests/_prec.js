const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const circle=(cx,cy,r,n=60,j=0)=>Array.from({length:n+1},(_,i)=>[cx+r*Math.cos(i/n*6.2832)+(Math.random()-.5)*j,cy+r*Math.sin(i/n*6.2832)+(Math.random()-.5)*j]);
const stroke=async pts=>{await pg.mouse.move(H.R.x+pts[0][0],H.R.y+pts[0][1]);await pg.mouse.down();for(const p of pts.slice(1))await pg.mouse.move(H.R.x+p[0],H.R.y+p[1],{steps:2});await pg.mouse.up();await pg.waitForTimeout(150)};
const d=()=>pg.evaluate(()=>objs.map(o=>{const p=o.g.querySelector('path');return{n:(p?p.getAttribute('d').match(/[MLCZ]/g)||[]:[]).length,d:p?p.getAttribute('d').slice(0,90):null}}));
// Pencil: a precise circle drawn with 60 samples, no jitter
await pg.evaluate(()=>setTool('pc'));await stroke(circle(300,300,100,60,0));console.log('pencil circle',JSON.stringify(await d()));
// Pencil: wobbly letter-like zigzag
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});
await stroke([[200,200],[260,300],[320,200],[380,300],[440,200],[500,300]]);console.log('pencil zigzag',JSON.stringify(await d()));
// deviation of fitted path from raw: sample path vs raw polyline
const dev=await pg.evaluate(()=>{const p=objs[0].g.querySelector('path'),L=p.getTotalLength();let mx=0;const raw=[[200,200],[260,300],[320,200],[380,300],[440,200],[500,300]].map(([x,y])=>[(x-px)/z,(y-py)/z]);
 for(let i=0;i<=200;i++){const q=p.getPointAtLength(L*i/200);let best=1e9;for(let k=0;k<raw.length-1;k++){const a=raw[k],b=raw[k+1],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((q.x-a[0])*dx+(q.y-a[1])*dy)/(dx*dx+dy*dy))),e=Math.hypot(q.x-(a[0]+t*dx),q.y-(a[1]+t*dy));if(e<best)best=e}mx=Math.max(mx,best)}return{maxDev:+mx.toFixed(2),z}});console.log('pencil zigzag max deviation (doc px)',JSON.stringify(dev));
await pg.screenshot({path:'/tmp/mdl/prec_pencil.png',clip:{x:H.R.x+150,y:H.R.y+150,width:400,height:200}});
console.log('PCO',await pg.evaluate(()=>JSON.stringify(PCO)),'BBO',await pg.evaluate(()=>JSON.stringify(BBO)));
await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647-.5};
const poly=(V,close=true,per=14,j=3)=>{const P=[];const n=V.length;for(let i=0;i<(close?n:n-1);i++){const a=V[i],b=V[(i+1)%n],L=Math.hypot(b[0]-a[0],b[1]-a[1]),m=Math.max(2,Math.round(L/per));for(let k=0;k<m;k++)P.push([a[0]+(b[0]-a[0])*k/m+rnd()*j,a[1]+(b[1]-a[1])*k/m+rnd()*j])}P.push(P[0]);return P};
const ngon=(cx,cy,r,n,rot=0)=>Array.from({length:n},(_,i)=>[cx+r*Math.cos(rot+i/n*6.2832),cy+r*Math.sin(rot+i/n*6.2832)]);
const cases=[['rect',poly([[250,200],[500,200],[500,320],[250,320]])],['rotated rect',poly([[300,200],[480,230],[450,350],[270,320]])],['triangle',poly(ngon(380,260,110,3,-1.57))],['hexagon',poly(ngon(380,260,110,6))],['pentagon',poly(ngon(380,260,110,5,-1.57))],['circle',poly(ngon(380,260,100,40),true,9,3)],['ellipse',Array.from({length:50},(_,i)=>[380+160*Math.cos(i/49*6.2832)+rnd()*3,260+85*Math.sin(i/49*6.2832)+rnd()*3])],['line',poly([[250,250],[520,270]],false,12,2)],['star5',poly((()=>{const o=[];for(let i=0;i<10;i++){const r=i%2?50:110,a=-1.57+i/10*6.2832;o.push([380+r*Math.cos(a),270+r*Math.sin(a)])}return o})())]];
for(const [name,P] of cases){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});await pg.evaluate(()=>setTool('shp'));
  await pg.mouse.move(H.R.x+P[0][0],H.R.y+P[0][1]);await pg.mouse.down();for(const q of P.slice(1))await pg.mouse.move(H.R.x+q[0],H.R.y+q[1],{steps:2});await pg.mouse.up();await pg.waitForTimeout(350);
  const r=await pg.evaluate(()=>objs.map(o=>{const e=o.g.firstElementChild,b=wbox(o);return{tag:e&&e.tagName,shape:e&&e.getAttribute('data-shape'),n:(o.g.querySelector('path')?.getAttribute('d')||'').match(/[MLCZ]/g)?.length,bb:[b.x,b.y,b.w,b.h].map(v=>Math.round(v*z+(0)))}}));
  const gx=P.map(p=>p[0]),gy=P.map(p=>p[1]);
  console.log(name.padEnd(13),JSON.stringify(r.map(x=>({t:x.tag,s:x.shape,n:x.n}))),'gesture bbox w,h',Math.round(Math.max(...gx)-Math.min(...gx)),Math.round(Math.max(...gy)-Math.min(...gy)),'result w,h',r[0]?r[0].bb.slice(2).join(','):'-');
}
await H.b.close()})();

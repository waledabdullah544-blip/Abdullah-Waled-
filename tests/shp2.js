const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const nPts=()=>pg.evaluate(()=>{const o=objs[objs.length-1],p=JSON.parse(o.g.firstElementChild.getAttribute('data-p')||'{}');return{n:p.n,x:Math.round(wbox(o).x),y:Math.round(wbox(o).y),sd:SHD.po.n}});
await pg.evaluate(()=>setTool('po'));await H.drag(300,300,380,300);
let a=await nPts();ok('polygon default has 6 sides '+JSON.stringify(a),a.n===6&&a.sd===6);
for(let i=0;i<5;i++)await pg.keyboard.press('ArrowUp');await pg.waitForTimeout(150);
let b=await nPts();ok('plain Up arrows do NOT add sides (they nudge) '+JSON.stringify(b),b.n===6&&b.sd===6&&b.y<a.y);
await pg.keyboard.press('Alt+ArrowUp');await pg.waitForTimeout(100);let c=await nPts();ok('Alt+Up adds a side '+JSON.stringify(c),c.n===7);
await pg.keyboard.press('Alt+ArrowDown');await pg.keyboard.press('Alt+ArrowDown');await pg.waitForTimeout(100);
await pg.evaluate(()=>{SHD.po.n=6});
await H.drag(500,300,580,300);let d=await nPts();ok('the next polygon is a hexagon again '+JSON.stringify(d),d.n===6);
// Shaper: a rotated rectangle stays a rectangle, a circle stays an ellipse
const stroke=async P=>{await pg.evaluate(()=>setTool('shp'));await pg.mouse.move(H.R.x+P[0][0],H.R.y+P[0][1]);await pg.mouse.down();for(const q of P.slice(1))await pg.mouse.move(H.R.x+q[0],H.R.y+q[1],{steps:2});await pg.mouse.up();await pg.waitForTimeout(300)};
const seg=(a,b,n=14)=>Array.from({length:n},(_,i)=>[a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n]);
const V=[[300,200],[480,230],[450,350],[270,320]];const P=[...seg(V[0],V[1]),...seg(V[1],V[2]),...seg(V[2],V[3]),...seg(V[3],V[0]),V[0]];
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});await stroke(P);
const r=await pg.evaluate(()=>{const o=objs[objs.length-1],e=o.g.firstElementChild;return{shape:e.getAttribute('data-shape'),xf:e.getAttribute('data-xf')}});
ok('Shaper: tilted rectangle becomes a tilted rectangle '+JSON.stringify(r),r.shape==='rr'&&!!r.xf&&JSON.parse(r.xf)[1]>.1);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

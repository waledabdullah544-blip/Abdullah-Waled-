const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const stroke=async(P,steps=3)=>{await pg.mouse.move(H.R.x+P[0][0],H.R.y+P[0][1]);await pg.mouse.down();for(const q of P.slice(1))await pg.mouse.move(H.R.x+q[0],H.R.y+q[1],{steps});await pg.mouse.up();await pg.waitForTimeout(250)};
const info=()=>pg.evaluate(()=>objs.map(o=>{const p=o.g.querySelector('path'),L=p.getTotalLength();let ymin=1e9,ymax=-1e9;for(let i=0;i<=60;i++){const q=p.getPointAtLength(L*i/60);ymin=Math.min(ymin,q.y);ymax=Math.max(ymax,q.y)}return{n:objs.length,segs:(p.getAttribute('d').match(/[MLC]/g)||[]).length,len:Math.round(L),y:[Math.round(ymin),Math.round(ymax)],sel:sel.has(o),PCO:JSON.stringify(PCO)}}));
await pg.evaluate(()=>setTool('pc'));
// a gentle wave, left to right
const wave=[];for(let i=0;i<=40;i++)wave.push([200+i*10,300+30*Math.sin(i/6)]);
await stroke(wave);console.log('drawn wave',JSON.stringify(await info()));
// redraw the middle part as a big bump (starts and ends ON the path) -> should reshape the SAME path
const bump=[];for(let i=0;i<=20;i++)bump.push([300+i*10,300+30*Math.sin((i+10)/6)- (i>4&&i<16?60:0)]);
await stroke(bump);console.log('after redraw over the path (edit selected path)',JSON.stringify(await info()));
await H.b.close()})();

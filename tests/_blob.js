const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.evaluate(()=>{z=1;view()});
for(const t of ['bb','pc','br']){
await pg.evaluate(t=>setTool(t),t);
// hand-like straight line: small jitter, uneven speed
await pg.mouse.move(H.R.x+150,H.R.y+150+ (t==='bb'?0:t==='pc'?60:120));await pg.mouse.down();
let x=150;for(let i=0;i<60;i++){x+=2+((i*7)%5);await pg.mouse.move(H.R.x+x,H.R.y+150+(t==='bb'?0:t==='pc'?60:120)+Math.sin(i*1.7)*1.6+((i*13)%3-1)*.7)}
await pg.mouse.up();await pg.waitForTimeout(200);
console.log(t,await pg.evaluate(()=>{const o=objs[objs.length-1];const p=o.g.querySelector('path');return{d:p.getAttribute('d').slice(0,300),rings:(p.getAttribute('d').match(/M/g)||[]).length}}));
}
await pg.keyboard.press('Escape');await pg.evaluate(()=>{sel=new Set();draw()});
await pg.screenshot({path:'/tmp/mdl/blob.png',clip:{x:H.R.x+120,y:H.R.y+110,width:420,height:200}});
console.log(H.errs);await H.b.close()})();

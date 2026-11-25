const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const dump=()=>pg.evaluate(()=>objs.map(o=>[...o.g.querySelectorAll('path')].map(p=>p.getAttribute('d'))));
// two straight lines that meet near a corner, both ends loose
await pg.evaluate(()=>setTool('ln'));await H.drag(200,300,400,300);await H.drag(410,312,410,500);
console.log('before',JSON.stringify(await dump()));
await pg.evaluate(()=>setTool('jn'));
await pg.mouse.move(H.R.x+360,H.R.y+300);await pg.mouse.down();await pg.mouse.move(H.R.x+408,H.R.y+300,{steps:5});await pg.mouse.move(H.R.x+414,H.R.y+330,{steps:5});await pg.mouse.up();await pg.waitForTimeout(300);
console.log('after Join drag',JSON.stringify(await dump()));
// curved paths with Pen tool
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});
await pg.evaluate(()=>setTool('ln'));await H.drag(200,200,400,200);await H.drag(402,205,402,400);
await pg.evaluate(()=>setTool('jn'));await pg.mouse.move(H.R.x+390,H.R.y+200);await pg.mouse.down();await pg.mouse.move(H.R.x+402,H.R.y+203,{steps:4});await pg.mouse.up();await pg.waitForTimeout(300);
console.log('endpoints-only join',JSON.stringify(await dump()));
await H.b.close()})();

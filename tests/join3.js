const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const dump=()=>pg.evaluate(()=>objs.map(o=>[...o.g.querySelectorAll('path')].map(p=>p.getAttribute('d'))));
const scrub=async(pts)=>{await pg.evaluate(()=>setTool('jn'));await pg.mouse.move(H.R.x+pts[0][0],H.R.y+pts[0][1]);await pg.mouse.down();for(const q of pts.slice(1))await pg.mouse.move(H.R.x+q[0],H.R.y+q[1],{steps:3});await pg.mouse.up();await pg.waitForTimeout(300)};
await pg.evaluate(()=>setTool('ln'));await H.drag(200,300,460,300);await H.drag(360,180,360,420);
await scrub([[385,298],[455,302],[390,298],[455,302],[395,298],[455,302]]);
let d=await dump();const A=d[0][0];
ok('scrubbing the excess end trims it exactly at the crossing (no closing Z) '+A,!/Z/.test(A)&&/L123\.356 217\.45$/.test(A)&&d.length===2);
// both excess ends in one gesture -> one corner path
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});
await pg.evaluate(()=>setTool('ln'));await H.drag(200,300,460,300);await H.drag(360,180,360,420);
await scrub([[385,298],[455,302],[390,298],[455,302],[365,285],[358,200],[362,285],[358,195],[362,285]]);
d=await dump();console.log('both-ends gesture',JSON.stringify(d));
// T junction: end that stops just short of another path
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});
await pg.evaluate(()=>setTool('ln'));await H.drag(200,300,340,300);await H.drag(360,200,360,420);
await scrub([[330,300],[368,300],[330,300],[368,300]]);d=await dump();console.log('T junction',JSON.stringify(d));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

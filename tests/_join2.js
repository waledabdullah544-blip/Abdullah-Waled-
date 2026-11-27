const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const dump=()=>pg.evaluate(()=>objs.map(o=>[...o.g.querySelectorAll('path')].map(p=>p.getAttribute('d'))));
const scrub=async(pts)=>{await pg.evaluate(()=>setTool('jn'));await pg.mouse.move(H.R.x+pts[0][0],H.R.y+pts[0][1]);await pg.mouse.down();for(const q of pts.slice(1))await pg.mouse.move(H.R.x+q[0],H.R.y+q[1],{steps:3});await pg.mouse.up();await pg.waitForTimeout(300)};
const toDoc=(sx,sy)=>pg.evaluate(([x,y])=>[+((x-px)/z).toFixed(2),+((y-py)/z).toFixed(2)],[sx,sy]);
// '+' crossing: A horizontal, B vertical crossing at (360,300)
await pg.evaluate(()=>setTool('ln'));await H.drag(200,300,460,300);await H.drag(360,180,360,420);
const X=await toDoc(360,300);console.log('crossing at doc',JSON.stringify(X));
console.log('before',JSON.stringify(await dump()));
// scrub back and forth over the right excess end of A (x 380..460) and the top excess end of B (y 180..280)
await scrub([[385,298],[455,302],[390,298],[455,302],[395,298],[455,302]]);
console.log('after 1st scrub',JSON.stringify(await dump()));
await scrub([[358,190],[362,275],[358,195],[362,275],[358,200],[362,275]]);
console.log('after 2nd scrub',JSON.stringify(await dump()));
await pg.screenshot({path:'/tmp/mdl/join2.png',clip:{x:H.R.x+120,y:H.R.y+120,width:420,height:360}});
await H.b.close()})();

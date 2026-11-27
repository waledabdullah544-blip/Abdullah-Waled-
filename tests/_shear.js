const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const corners=()=>pg.evaluate(()=>{const o=[...sel][0]||objs[objs.length-1],e=o.g.querySelector('rect,path'),W=world.getCTM().inverse(),M=W.multiply(e.getCTM()),Z=z;let P;
 if(e.tagName==='rect'){const x=+e.getAttribute('x'),y=+e.getAttribute('y'),w=+e.getAttribute('width'),h=+e.getAttribute('height');P=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]}else{const nums=(e.getAttribute('d').replace(/[A-Za-z]/g,' ').match(/-?\d*\.?\d+/g)||[]).map(Number);P=[];for(let i=0;i+1<nums.length&&P.length<4;i+=2)P.push([nums[i],nums[i+1]])}
 return P.map(([x,y])=>{const q=new DOMPoint(x,y).matrixTransform(M);return[+(q.x*Z+px).toFixed(1),+(q.y*Z+py).toFixed(1)]})});
const fresh=async()=>{await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');await pg.waitForTimeout(100)};
await fresh();const c0=await corners();console.log('screen corners before (canvas px)',JSON.stringify(c0));
// Shear tool: drag from the top-right corner 40px to the right
await pg.evaluate(()=>setTool('sh'));
const tr=c0[1];await pg.mouse.move(H.R.x+tr[0],H.R.y+tr[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+tr[0]+20,H.R.y+tr[1],{steps:4});await pg.mouse.move(H.R.x+tr[0]+40,H.R.y+tr[1],{steps:4});
const mid=await corners();console.log('during drag',JSON.stringify(mid));
await pg.mouse.up();await pg.waitForTimeout(200);const c1=await corners();console.log('after drag ',JSON.stringify(c1));
console.log('top-right moved dx=',(c1.find(p=>Math.abs(p[1]-tr[1])<2&&p[0]>tr[0])||[0])[0]-tr[0]);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);console.log('after undo',JSON.stringify(await corners()));
// vertical shear: drag from right-middle downwards
await pg.evaluate(()=>setTool('sh'));await pg.mouse.move(H.R.x+tr[0],H.R.y+c0[2][1]-5);await pg.mouse.down();await pg.mouse.move(H.R.x+tr[0],H.R.y+c0[2][1]+25,{steps:6});await pg.mouse.up();await pg.waitForTimeout(200);
console.log('vertical shear',JSON.stringify(await corners()));
console.log('errs',H.errs);await H.b.close()})();

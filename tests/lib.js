const {chromium}=require('playwright');
exports.open=async()=>{const b=await chromium.launch(),pg=await b.newPage({viewport:{width:1500,height:900}});const errs=[];
pg.on('pageerror',e=>errs.push(String(e)));
await pg.goto('file://'+require('path').resolve(__dirname,'../masar.html'));await pg.waitForTimeout(700);
const r=await pg.evaluate(()=>{const c=document.getElementById('cv').getBoundingClientRect();return{x:c.left,y:c.top,w:c.width,h:c.height}});
const H={pg,b,errs,R:r,
 key:async k=>{await pg.keyboard.press(k);await pg.waitForTimeout(40)},
 // canvas-relative coords
 drag:async(x0,y0,x1,y1,mods=[])=>{for(const m of mods)await pg.keyboard.down(m);await pg.mouse.move(r.x+x0,r.y+y0);await pg.mouse.down();await pg.mouse.move(r.x+(x0+x1)/2,r.y+(y0+y1)/2,{steps:4});await pg.mouse.move(r.x+x1,r.y+y1,{steps:6});await pg.mouse.up();for(const m of mods.slice().reverse())await pg.keyboard.up(m);await pg.waitForTimeout(60)},
 click:async(x,y,mods=[])=>{for(const m of mods)await pg.keyboard.down(m);await pg.mouse.click(r.x+x,r.y+y);for(const m of mods.slice().reverse())await pg.keyboard.up(m);await pg.waitForTimeout(60)},
 state:()=>pg.evaluate(()=>({tool,n:objs.length,sel:sel.size,o:objs.map(o=>{const b=wbox(o);return{t:[...o.g.querySelectorAll('*')].map(e=>e.tagName).join(','),x:+(b.x*z+px).toFixed(1),y:+(b.y*z+py).toFixed(1),w:+(b.w*z).toFixed(1),h:+(b.h*z).toFixed(1)}})})),
 reset:async()=>{await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();dsSel=new Set();commit();draw()})}};
return H};

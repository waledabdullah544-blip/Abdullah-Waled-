const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const st=()=>pg.evaluate(()=>({n:objs.length,order:objs.map(o=>(o.g.querySelector('ellipse')?'ellipse':o.g.querySelector('rect')?'rect':o.g.querySelector('[data-clipmask]')?'clip':'other')),dm:window.drawMode(),clip:objs.some(o=>o.g.querySelector('[data-clipmask],[clip-path]'))}));
// Draw Behind: select rect, draw ellipse -> ellipse goes behind
await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');
await pg.keyboard.press('Shift+d');await pg.waitForTimeout(100);console.log('after Shift+D',await pg.evaluate(()=>window.drawMode()));
await pg.keyboard.press('l');await H.drag(340,240,460,340);await pg.waitForTimeout(250);console.log('Draw Behind result',JSON.stringify(await st()));
await pg.keyboard.press('Shift+d');await pg.waitForTimeout(100);console.log('after 2nd Shift+D mode',await pg.evaluate(()=>window.drawMode()));
// Draw Inside: select one object then draw
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});
await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');await pg.evaluate(()=>setDrawMode('i'));await pg.keyboard.press('l');await H.drag(380,240,500,340);await pg.waitForTimeout(300);
console.log('Draw Inside result',JSON.stringify(await st()));
await pg.screenshot({path:'/tmp/mdl/draw.png',clip:{x:H.R.x+200,y:H.R.y+150,width:400,height:250}});
// menu / button presence
console.log('dm button flyout',await pg.evaluate(()=>[...document.querySelectorAll('#fg-dm button')].map(b=>b.textContent.trim().replace(/\s+/g,' ')).join(' | ')));
console.log('errs',H.errs);await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.waitForTimeout(100);
console.log(await pg.evaluate(()=>({sel:sel.size,dm:typeof drawMode,wdm:typeof window.drawMode,tool})));
await pg.evaluate(()=>setDrawMode('i'));await pg.waitForTimeout(100);
console.log(await pg.evaluate(()=>({sel:sel.size,dm:window.drawMode&&window.drawMode(),paths:[...document.querySelectorAll('#selg path')].map(p=>p.getAttribute('stroke-dasharray')).join(',')})));
await H.drag(250,180,350,260);await pg.waitForTimeout(200);
console.log(await pg.evaluate(()=>({n:objs.length,h:objs.map(o=>o.g.innerHTML.slice(0,200)),dm:window.drawMode()})));
console.log(H.errs);await H.b.close()})();

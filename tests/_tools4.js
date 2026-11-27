const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const fresh=async()=>{await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()})};
// ---------- Measure tool ----------
await fresh();await pg.evaluate(()=>setTool('ms'));
await pg.mouse.move(H.R.x+300,H.R.y+300);await pg.mouse.down();await pg.mouse.move(H.R.x+420,H.R.y+250,{steps:6});
console.log('MEASURE during drag: hint=',await pg.evaluate(()=>document.getElementById('hint').textContent.slice(0,120)),'| overlay children',await pg.evaluate(()=>[...document.querySelectorAll('#peng *, #selg *, #hov *')].length));
await pg.mouse.up();await pg.waitForTimeout(200);
console.log('MEASURE after: Info panel exists?',await pg.evaluate(()=>!!DK.P.info),'| text',await pg.evaluate(()=>{DK.open('info');const e=document.querySelector('#infp, #inf, [id*=info i]');return e?e.textContent.replace(/\s+/g,' ').slice(0,200):'no info element'}));
// ---------- Width tool ----------
await fresh();await pg.keyboard.press('p');await H.click(250,300);await H.click(450,300);await pg.keyboard.press('Escape');await pg.keyboard.press('v');
await pg.evaluate(()=>{const o=objs[0];o.g.querySelector('path').setAttribute('stroke-width','10');});
await pg.evaluate(()=>setTool('wt'));await pg.mouse.move(H.R.x+350,H.R.y+300);await pg.mouse.down();await pg.mouse.move(H.R.x+350,H.R.y+325,{steps:5});await pg.mouse.up();await pg.waitForTimeout(250);
console.log('WIDTH after drag: wpts',await pg.evaluate(()=>JSON.stringify(objs[0].g.querySelector('path').getAttribute('data-wpts')||objs[0].g.getAttribute('data-wpts')).slice(0,160)),'| objs',await pg.evaluate(()=>objs.length));
// ---------- Artboard tool ----------
await fresh();await pg.evaluate(()=>setTool('abt'));await H.drag(700,150,900,300);await pg.waitForTimeout(300);
console.log('ARTBOARD tool drag: artboards',await pg.evaluate(()=>ARTS.length),JSON.stringify(await pg.evaluate(()=>ARTS.map(a=>[a.x,a.y,a.w,a.h].map(Math.round)))));
// ---------- Shape Builder ----------
await fresh();await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('l');await H.drag(380,240,500,340);await pg.keyboard.press('v');
await pg.evaluate(()=>{sel=new Set(objs);draw()});await pg.evaluate(()=>setTool('sbd'));
await pg.waitForTimeout(200);
console.log('SHAPE BUILDER hint',await pg.evaluate(()=>document.getElementById('hint').textContent.slice(0,200)));
await pg.mouse.move(H.R.x+330,H.R.y+250);await pg.mouse.down();await pg.mouse.move(H.R.x+400,H.R.y+280,{steps:5});await pg.mouse.up();await pg.waitForTimeout(300);
console.log('SHAPE BUILDER merge drag: objects',await pg.evaluate(()=>objs.length));
// ---------- Blend ----------
await fresh();await pg.keyboard.press('m');await H.drag(250,200,330,280);await pg.keyboard.press('l');await H.drag(550,250,650,350);await pg.keyboard.press('v');
await pg.evaluate(()=>{sel=new Set(objs);draw()});await pg.evaluate(()=>setTool('bl'));await pg.mouse.click(H.R.x+290,H.R.y+240);await pg.mouse.click(H.R.x+600,H.R.y+300);await pg.waitForTimeout(400);
console.log('BLEND: objects',await pg.evaluate(()=>objs.length),'children of blend group',await pg.evaluate(()=>objs.map(o=>o.g.children.length)));
console.log('errs',H.errs);await H.b.close()})();

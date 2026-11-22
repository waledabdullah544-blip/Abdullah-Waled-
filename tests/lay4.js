const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;
const rows=()=>pg.evaluate(()=>[...document.querySelectorAll('#lyl .lyr')].map(r=>r.dataset.k+':'+r.querySelector('.nm').textContent+(r.classList.contains('act')?'*':'')+(r.classList.contains('sel')?'^':'')));
await pg.click('.tb .tt:text-is("Layers")');await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.click('#lyNew');await H.key('m');await H.drag(300,400,380,450);await H.key('v');
console.log('rows',await rows());
// delete: select layer row (name) then trash
await pg.locator('#lyl .lyr.L .nm').first().click();await pg.waitForTimeout(100);console.log('after clicking layer name: sel=',(await H.state()).sel,'rows',await rows());
await pg.click('#lyDel');await pg.waitForTimeout(250);console.log('after trash: objs',(await H.state()).n,'rows',await rows(),'dialog:',await pg.evaluate(()=>(document.querySelector('.fxb')||{}).innerText||''));
// lock debug
await H.pg.evaluate(()=>{sel=new Set();draw()});const lk=pg.locator('#lyl .lyr.L .lk').first();await lk.click();await pg.waitForTimeout(100);console.log('locked?',await pg.evaluate(()=>objs.map(o=>!!o.g.dataset.lock)));
await H.click(340,240);console.log('sel when locked',(await H.state()).sel);await lk.click();await pg.waitForTimeout(150);console.log('unlocked?',await pg.evaluate(()=>objs.map(o=>!!o.g.dataset.lock)),'LAYERS',await pg.evaluate(()=>typeof LAYERS!=='undefined'?JSON.stringify(LAYERS.map(l=>[l.name,l.lock,l.vis])):'n/a'));
await H.click(340,240);console.log('sel after unlock',(await H.state()).sel, 'tool',await pg.evaluate('tool'));
await H.b.close()})();

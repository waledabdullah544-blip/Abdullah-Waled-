const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(300,200,420,300);
await pg.evaluate(()=>DK.open('appearance'));await pg.waitForTimeout(250);
const rows=()=>pg.evaluate(()=>[...document.querySelectorAll('#app .apr')].map(r=>r.dataset.k||r.textContent.trim().slice(0,10)));
const btn=t=>pg.click('#app button[title="'+t+'"]');
let r0=await rows();console.log('rows',JSON.stringify(r0));
await btn('Add New Fill');await pg.waitForTimeout(200);let r=await rows();ok('Add New Fill adds a row',r.length===r0.length+1,JSON.stringify(r));
ok('the object really has 2 fills (extra fill rendered)',await pg.evaluate(()=>objs[0].g.querySelectorAll('rect,path').length>=2),await pg.evaluate(()=>objs[0].g.innerHTML.slice(0,200)));
await btn('Add New Stroke');await pg.waitForTimeout(200);r=await rows();ok('Add New Stroke adds a row',r.length===r0.length+2,JSON.stringify(r));
await pg.keyboard.press('Control+z');await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);r=await rows();ok('Undo twice back to the start',r.length===r0.length,JSON.stringify(r));
// stroke weight from the row
await pg.evaluate(()=>{const w=document.querySelector('#app .apw');w.value='5';w.dispatchEvent(new Event('input',{bubbles:true}));w.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(150);
ok('stroke weight from the row',await pg.evaluate(()=>fillables(objs[0])[0].getAttribute('stroke-width')==='5'));
// click "Stroke" link opens the Stroke panel
await pg.click('#app .apr[data-k=stroke] .apn');await pg.waitForTimeout(200);
ok('clicking Stroke opens the Stroke panel',await pg.evaluate(()=>!!document.getElementById('stp')&&document.getElementById('stp').offsetParent!==null));
// fx
await btn('Add New Effect');await pg.waitForTimeout(200);const menu=await pg.evaluate(()=>[...document.querySelectorAll('.mdd button,#pmMn button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim()).slice(0,8));ok('Add New Effect shows the effects menu',menu.length>2,JSON.stringify(menu));
await pg.keyboard.press('Escape');
// Clear Appearance -> no fill no stroke (Illustrator)
await btn('Clear Appearance');await pg.waitForTimeout(200);
ok('Clear Appearance: fill none and stroke none',await pg.evaluate(()=>{const e=fillables(objs[0])[0];return(e.getAttribute('fill')==='none')&&(!e.getAttribute('stroke')||e.getAttribute('stroke')==='none')}));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);
// Duplicate selected item (stroke row selected) and delete
await pg.click('#app .apr[data-k=fill]',{position:{x:200,y:8}}).catch(()=>{});await btn('Duplicate Selected Item');await pg.waitForTimeout(200);r=await rows();
ok('Duplicate Selected Item duplicates the fill',r.length===r0.length+1,JSON.stringify(r));
await btn('Delete Selected Item');await pg.waitForTimeout(200);r=await rows();ok('Delete Selected Item removes it',r.length===r0.length,JSON.stringify(r));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

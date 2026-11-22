const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
await H.key('m');await H.drag(300,200,420,280);await H.key('v');
await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(400);
await pg.screenshot({path:d+'color.png',clip:{x:1195,y:60,width:305,height:830}});
console.log(await pg.evaluate(()=>{const p=document.getElementById('cop')||document.querySelector('#colp,#clp');return[...document.querySelectorAll('#coP,#clp,#cop,[id^=co]')].map(e=>e.id).slice(0,25).join(' ')}));
console.log(await pg.evaluate(()=>[...document.querySelectorAll('.tb .tt')].map(e=>e.textContent.trim()).join(' | ')));
await H.b.close()})();

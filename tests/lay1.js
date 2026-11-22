const {open}=require('./lib');
(async()=>{const H=await open();const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
await H.key('m');await H.drag(300,200,420,280);await H.key('l');await H.drag(500,200,620,280);await H.key('v');
await H.pg.click('.tb .tt:text-is("Layers")');await H.pg.waitForTimeout(300);
await H.pg.screenshot({path:d+'layers.png',clip:{x:1195,y:60,width:305,height:520}});
console.log(await H.pg.evaluate(()=>{const p=document.querySelector('#lyp,#layers,#lyr');return p?p.id:'?'}));
console.log(await H.pg.evaluate(()=>[...document.querySelectorAll('[id^=ly]')].map(e=>e.id).slice(0,40).join(' ')));
await H.b.close()})();

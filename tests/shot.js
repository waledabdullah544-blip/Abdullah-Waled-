const {open}=require('./lib');
(async()=>{const H=await open();const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
for(const t of ['ro','h','er']){const b=H.pg.locator('nav [data-t="'+t+'"]').first();await b.hover();await H.pg.waitForTimeout(2200);const bb=await H.pg.evaluate(()=>{const r=document.getElementById('rtip').getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}});await H.pg.screenshot({path:d+'card_'+t+'.png',clip:{x:bb.x-4,y:bb.y-4,width:bb.w+8,height:bb.h+8}});await H.pg.mouse.move(900,700);await H.pg.waitForTimeout(300)}
await H.b.close()})();

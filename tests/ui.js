const {open}=require('./lib');
(async()=>{const H=await open();const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
await H.key('m');await H.drag(300,200,500,320);await H.key('v');await H.pg.waitForTimeout(300);
await H.pg.screenshot({path:d+'ui.png'});await H.b.close()})();

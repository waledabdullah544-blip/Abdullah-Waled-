const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.dblclick('#fqf');await pg.waitForTimeout(300);
await pg.fill('#cpkhex','3A7BD5');await pg.press('#cpkhex','Tab');await pg.waitForTimeout(150);
await pg.screenshot({path:d+'cpfull.png'});console.log(await pg.evaluate(()=>{const r=document.querySelector('.cpb').getBoundingClientRect();return JSON.stringify([r.left,r.top,r.width,r.height])}));await H.b.close()})();

const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(400);
const pos=await pg.evaluate(()=>{const g=[...document.querySelectorAll('.dkt')].find(d=>/Color/.test(d.textContent));const b=[...g.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='≡');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}});await pg.mouse.click(pos.x,pos.y);await pg.waitForTimeout(250);
await pg.screenshot({path:d+'colmenu.png',clip:{x:900,y:40,width:600,height:420}});await H.b.close()})();

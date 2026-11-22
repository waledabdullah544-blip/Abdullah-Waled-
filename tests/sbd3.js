const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),pg=await b.newPage({viewport:{width:1500,height:900}});pg.on('console',m=>console.log('console:',m.text()));pg.on('pageerror',e=>console.log('pageerror',e));
await pg.goto('file:///home/user/Abdullah-Waled-/masar.html');await pg.waitForTimeout(700);const r=await pg.evaluate(()=>{const c=document.getElementById('cv').getBoundingClientRect();return{x:c.left,y:c.top}});
const drag=async(x0,y0,x1,y1)=>{await pg.mouse.move(r.x+x0,r.y+y0);await pg.mouse.down();await pg.mouse.move(r.x+x1,r.y+y1,{steps:5});await pg.mouse.up();await pg.waitForTimeout(80)};
await pg.keyboard.press('l');await drag(300,250,420,370);await drag(380,250,500,370);await pg.keyboard.press('v');await pg.keyboard.press('Control+a');await pg.keyboard.press('Shift+m');await pg.waitForTimeout(200);
await pg.mouse.move(r.x+400,r.y+310);await pg.waitForTimeout(200);await pg.mouse.down();await pg.waitForTimeout(100);await pg.mouse.up();await pg.waitForTimeout(500);console.log('objs',await pg.evaluate(()=>objs.length));await b.close()})();

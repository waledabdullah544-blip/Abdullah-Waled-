const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(6000);
await H.key('l');await H.drag(300,250,420,370);await H.drag(380,250,500,370);await H.key('v');await pg.keyboard.press('Control+a');await pg.keyboard.press('Shift+m');await pg.waitForTimeout(200);
console.log('tool',await pg.evaluate('tool'),'sel',await pg.evaluate('sel.size'));
await pg.mouse.move(H.R.x+400,H.R.y+310);await pg.waitForTimeout(200);console.log('hover paths',await pg.evaluate(()=>document.querySelectorAll('#peng path').length));
await pg.mouse.down();await pg.waitForTimeout(100);await pg.mouse.up();await pg.waitForTimeout(500);console.log('objs after click',await pg.evaluate(()=>objs.length),'errors',H.errs);
await H.b.close()})();

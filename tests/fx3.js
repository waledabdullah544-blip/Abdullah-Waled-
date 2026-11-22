const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(5000);
const D=()=>pg.evaluate(()=>objs.map(o=>o.g.innerHTML.slice(0,200)+' || fx='+(o.g.dataset.fx||'')+' || tx='+o.m.tx));
await H.key('m');await H.drag(300,200,420,280);await H.key('v');console.log('0',JSON.stringify(await D()));
await pg.locator('#mbar button:text-is("Effect")').click();await pg.locator('.mdd button',{hasText:'Distort'}).first().hover();await pg.locator('.msub button',{hasText:'Zig Zag'}).first().click();await pg.waitForTimeout(250);await pg.click('.fxb button.pri');await pg.waitForTimeout(250);
console.log('1',JSON.stringify(await D()));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(250);console.log('2 after undo',JSON.stringify(await D()),'objs',await pg.evaluate(()=>objs.length),'hi',await pg.evaluate(()=>hi));
await H.b.close()})();

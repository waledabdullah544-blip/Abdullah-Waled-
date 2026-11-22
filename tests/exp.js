const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(5000);
await H.key('m');await H.drag(300,200,380,250);await H.key('v');
await pg.locator('#mbar button:text-is("Effect")').click();await pg.locator('.mdd button',{hasText:'Distort'}).first().hover();await pg.locator('.msub button',{hasText:'Zig Zag'}).first().click();await pg.waitForTimeout(250);await pg.click('.fxb button.pri');await pg.waitForTimeout(300);
const svg=await pg.evaluate(()=>fileSVGString());console.log(svg.slice(0,900));await H.b.close()})();

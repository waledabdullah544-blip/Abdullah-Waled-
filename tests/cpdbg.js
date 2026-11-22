const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(3000);
await H.key('m');await H.drag(300,200,420,280);await H.key('v');
console.log('swgrid children before opening swatches:',await pg.evaluate(()=>document.querySelectorAll('#swgrid > *').length));
await pg.dblclick('#fqf');await pg.waitForTimeout(250);await pg.click('#cpksb');await pg.waitForTimeout(200);
console.log('cpsq count:',await pg.locator('.cpsq').count(),'swgrid now',await pg.evaluate(()=>document.querySelectorAll('#swgrid > *').length));
await H.b.close()})();

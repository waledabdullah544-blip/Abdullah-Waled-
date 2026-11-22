const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.evaluate(()=>DK.open('appearance'));await pg.waitForTimeout(300);
await pg.locator('#mbar button:text-is("Effect")').click();await pg.locator('.mdd button',{hasText:'Stylize'}).first().hover();await pg.locator('.msub button',{hasText:'Drop Shadow'}).first().click();await pg.waitForTimeout(250);await pg.click('.fxb button.pri');await pg.waitForTimeout(250);
console.log(await pg.evaluate(()=>[...document.querySelectorAll('#app .apr')].find(r=>/Drop Shadow/.test(r.textContent)).outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'<svg/>')));
const row=pg.locator('#app .apr',{hasText:'Drop Shadow'});
await row.locator('.apn').click();await pg.waitForTimeout(300);console.log('single click name → dialog:',await pg.locator('.fxb').count());await pg.keyboard.press('Escape');await pg.waitForTimeout(100);
await row.dblclick();await pg.waitForTimeout(300);console.log('dblclick row → dialog:',await pg.locator('.fxb').count());
await H.b.close()})();

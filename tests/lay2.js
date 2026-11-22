const {open}=require('./lib');
(async()=>{const H=await open();
await H.key('m');await H.drag(300,200,420,280);await H.key('l');await H.drag(500,200,620,280);await H.key('v');
await H.pg.click('.tb .tt:text-is("Layers")');await H.pg.waitForTimeout(300);
console.log(await H.pg.evaluate(()=>document.getElementById('lyl').outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'<svg/>').slice(0,1800)));
console.log('MENU:',await H.pg.evaluate(()=>{document.getElementById('lyMenu').click();return [...document.querySelectorAll('#lyMn button, .lymn button, [role=menu] button')].map(b=>b.textContent.trim()).filter(Boolean).slice(0,60).join(' | ')}));
await H.b.close()})();

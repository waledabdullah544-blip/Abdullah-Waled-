const {open}=require('./lib');
(async()=>{const H=await open();
await H.key('m');await H.drag(300,200,420,280);await H.key('v');await H.pg.click('.tb .tt:text-is("Layers")');await H.pg.click('#lyMenu');await H.pg.waitForTimeout(200);
console.log(await H.pg.evaluate(()=>{const m=document.getElementById('lyMn');return m?[...m.querySelectorAll('button,hr')].map(b=>b.tagName==='HR'?'---':b.textContent.trim()+(b.disabled?' (disabled)':'')).join(' | '):'no #lyMn'}));
await H.b.close()})();

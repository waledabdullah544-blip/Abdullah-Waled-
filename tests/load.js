const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),pg=await b.newPage();const errs=[];pg.on('pageerror',e=>errs.push(String(e)+' @ '+(e.stack||'').split('\n')[1]));pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
await pg.goto('file:///home/user/Abdullah-Waled-/masar.html');await pg.waitForTimeout(800);console.log(errs.join('\n')||'no errors');await b.close()})();

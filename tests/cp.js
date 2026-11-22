const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(300);
await pg.dblclick('#fqf');await pg.waitForTimeout(400);
console.log('picker after dblclick fill box:',await pg.evaluate(()=>{const e=document.querySelector('.fxm,.cpk,#dlg,[class*=picker]');const vis=[...document.querySelectorAll('.fxm,.cpk,#dlg,[class*=picker]')].filter(x=>getComputedStyle(x).display!=='none');return vis.map(x=>(x.className||x.id)+': '+x.innerText.replace(/\s+/g,' ').slice(0,160))}));
await H.b.close()})();

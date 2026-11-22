const {open}=require('./lib');
(async()=>{const H=await open();const ids=await H.pg.evaluate(()=>[...document.querySelectorAll('nav [data-t]')].map(b=>b.dataset.t));
for(const t of ids){const b=H.pg.locator('nav [data-t="'+t+'"]').first();await b.scrollIntoViewIfNeeded().catch(()=>{});await b.hover().catch(()=>{});await H.pg.waitForTimeout(750);
 const r=await H.pg.evaluate(()=>{const e=document.getElementById('rtip');return e&&getComputedStyle(e).display!=='none'?e.innerText.replace(/\s+/g,' ').slice(0,90):null});
 const ttl=await b.getAttribute('title');console.log(t.padEnd(4),'| tip:',r,'| title:',ttl);await H.pg.mouse.move(700,500);await H.pg.waitForTimeout(150)}
await H.b.close()})();

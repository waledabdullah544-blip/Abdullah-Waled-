const {open}=require('./lib');
(async()=>{const H=await open();const want=new Set(['rf','sh','sc','kn','tt','tp','vt','vat','vtp','er','ro','sl','ft','h','z','gr','ey','at','rr','po','sr','fl']);const res={};
const leaders=await H.pg.evaluate(()=>[...document.querySelectorAll('nav [data-t]')].map(b=>b.dataset.t));
for(const L of leaders){const b=H.pg.locator('nav [data-t="'+L+'"]').first();await b.click({button:'right'}).catch(()=>{});await H.pg.waitForTimeout(250);
 const items=await H.pg.evaluate(()=>{const out=[];document.querySelectorAll('[role=menu]').forEach(m=>{if(getComputedStyle(m).display!=='none')m.querySelectorAll('[data-t]').forEach(x=>out.push(x.dataset.t))});return out});
 for(const t of items){if(!want.has(t)||res[t]!==undefined)continue;const el=H.pg.locator('[role=menu] [data-t="'+t+'"]').first();await el.hover().catch(()=>{});await H.pg.waitForTimeout(800);
  res[t]=await H.pg.evaluate(()=>{const e=document.getElementById('rtip');return e&&getComputedStyle(e).display!=='none'?e.querySelector('.rn').innerText.replace(/\s+/g,' '):null})}
 await H.pg.keyboard.press('Escape');await H.pg.mouse.move(900,600);await H.pg.waitForTimeout(150)}
console.log(JSON.stringify(res));console.log('not found in any flyout:',[...want].filter(t=>res[t]===undefined).join(','));console.log('errors',H.errs);await H.b.close()})();

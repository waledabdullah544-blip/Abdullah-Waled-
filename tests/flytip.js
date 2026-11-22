const {open}=require('./lib');
(async()=>{const H=await open();const out={};
for(const [menu,ids] of [['fly',['rr','po','sr','fl']],['fly3',['at','tp','vt','vat','vtp','tt']],['fg-erBtn',['sc','kn']],['fg-roBtn',['rf']],['fg-slBtn',['sh']]]){
 const ok=await H.pg.evaluate(id=>{const m=document.getElementById(id);if(!m)return false;m.style.display='block';m.style.left='400px';m.style.top='200px';return true},menu);if(!ok){out[menu]='no menu';continue}
 for(const t of ids){const el=H.pg.locator('#'+menu+' [data-t="'+t+'"]').first();await el.hover({timeout:3000}).catch(()=>{});await H.pg.waitForTimeout(800);
  out[t]=await H.pg.evaluate(()=>{const e=document.getElementById('rtip');return e&&getComputedStyle(e).display!=='none'?e.querySelector('.rn').innerText.replace(/\s+/g,' '):null})}
 await H.pg.evaluate(id=>{document.getElementById(id).style.display='none'},menu);await H.pg.mouse.move(900,700);await H.pg.waitForTimeout(250)}
console.log(JSON.stringify(out));console.log('errors',H.errs);await H.b.close()})();

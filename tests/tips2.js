const {open}=require('./lib');
(async()=>{const H=await open();
// flyout tools: open each flyout via right-click / long-press on group leader and hover items
const groups=await H.pg.evaluate(()=>[...document.querySelectorAll('nav [data-t]')].map(b=>b.dataset.t));
const shots=[];
for(const t of ['ro','h','kn']){}
const seen=new Set(await H.pg.evaluate(()=>Object.keys(TIPS)));
const need=['rf','sh','sc','kn','tt','tp','vt','vat','vtp','ro','sl','ft','er','h','z','gr','ey'];
console.log('cards present for:',need.filter(t=>seen.has(t)).join(','),'| missing:',need.filter(t=>!seen.has(t)).join(',')||'none');
// render each demo to check for SVG parse errors
const bad=await H.pg.evaluate(need=>{const out=[];for(const t of need){const d=document.createElement('div');d.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="260" height="132" viewBox="0 -6 262 132">'+DEMO[t]+'</svg>';const sv=d.firstChild;if(!sv||sv.querySelector('parsererror')||!sv.children.length)out.push(t)}return out},need).catch(e=>'ERR '+e);
console.log('demo parse problems:',JSON.stringify(bad));
// screenshot of Rotate card + Hand card
for(const t of ['ro','h']){const b=H.pg.locator('nav [data-t="'+t+'"]').first();await b.hover();await H.pg.waitForTimeout(900);await H.pg.screenshot({path:'/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/card_'+t+'.png',clip:{x:0,y:0,width:700,height:900}});await H.pg.mouse.move(900,500);await H.pg.waitForTimeout(200)}
console.log('errors',H.errs);await H.b.close()})();

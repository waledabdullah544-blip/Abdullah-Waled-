const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(5000);
const D=()=>pg.evaluate(()=>objs.map(o=>[...o.g.querySelectorAll('path,rect,ellipse')].map(p=>p.getAttribute('d')||p.outerHTML).join('|')+'#'+(o.g.dataset.fx||'')).join('||'));
const menu=async(grp,it)=>{await pg.locator('#mbar button:text-is("Effect")').click();await pg.waitForTimeout(80);if(grp){await pg.locator('.mdd button',{hasText:grp}).first().hover();await pg.waitForTimeout(100);await pg.locator('.msub button',{hasText:it}).first().click()}else await pg.locator('.mdd button',{hasText:it}).first().click();await pg.waitForTimeout(250)};
await H.key('m');await H.drag(300,200,420,280);await H.key('v');
const d0=await D();
await menu('Distort & Transform','Zig Zag');await pg.click('.fxb button.pri');await pg.waitForTimeout(200);const d1=await D();chk('Zig Zag changes geometry',d1!==d0,null);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);chk('Undo restores the original after Zig Zag',(await D())===d0,null);
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(200);chk('Redo re-applies',(await D())===d1,null);
// apply last
await pg.keyboard.press('Control+Shift+e');await pg.waitForTimeout(250);const d2=await D();chk('Ctrl+Shift+E (Apply Last Effect) applies it again',d2!==d1,null);
// baked: can it be edited? appearance panel lists it?
await pg.evaluate(()=>wsApply('Essentials Classic'));await pg.click('.tb .tt:text-is("Align")').catch(()=>{});
await pg.evaluate(()=>{DK.open('appearance')});await pg.waitForTimeout(300);
const ap=await pg.evaluate(()=>[...document.querySelectorAll('#app .apr')].map(r=>r.innerText.replace(/\s+/g,' ').trim()));console.log('Appearance rows after Zig Zag x2:',JSON.stringify(ap));
chk('Zig Zag shows up in the Appearance panel (live effect)',ap.some(x=>/zig/i.test(x)),ap);
// live effect drop shadow
await H.reset();await H.key('m');await H.drag(300,200,420,280);await H.key('v');await menu('Stylize','Drop Shadow');await pg.click('.fxb button.pri');await pg.waitForTimeout(250);
const ap2=await pg.evaluate(()=>[...document.querySelectorAll('#app .apr')].map(r=>r.innerText.replace(/\s+/g,' ').trim()));console.log('Appearance rows after Drop Shadow:',JSON.stringify(ap2));chk('Drop Shadow listed in Appearance',ap2.some(x=>/shadow/i.test(x)),ap2);
await pg.screenshot({path:'/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/app.png',clip:{x:1195,y:60,width:305,height:520}});
// effect menu contents
await pg.locator('#mbar button:text-is("Effect")').click();await pg.waitForTimeout(100);const top=await pg.evaluate(()=>[...document.querySelectorAll('.mdd button')].filter(b=>b.offsetParent).map(b=>b.textContent.replace(/[▸]/g,'').trim()));console.log('Effect menu:',JSON.stringify(top));await pg.keyboard.press('Escape');
// multi-select
await pg.keyboard.press('Escape');await H.reset();await H.key('m');await H.drag(100,100,160,160);await H.drag(220,100,280,160);await H.key('v');await pg.keyboard.press('Control+a');await menu('Stylize','Round Corners');await pg.click('.fxb button.pri');await pg.waitForTimeout(250);
const both=await pg.evaluate(()=>objs.map(o=>/C|Q|A/.test([...o.g.querySelectorAll('path')].map(p=>p.getAttribute('d')).join(''))));chk('Effect applies to every selected object',both.every(Boolean),both);
// text
await H.reset();await H.key('t');await H.click(200,200);await pg.keyboard.type('Hi');await H.key('Escape');await menu('Stylize','Drop Shadow');await pg.click('.fxb button.pri').catch(()=>{});await pg.waitForTimeout(250);
chk('Live effect applies to text objects',await pg.evaluate(()=>!!objs[0].g.dataset.fx),null);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

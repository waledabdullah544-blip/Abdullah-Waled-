const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(5000);
await H.key('m');await H.drag(300,200,420,280);await H.key('v');
await pg.evaluate(()=>DK.open('appearance'));await pg.waitForTimeout(300);
await pg.locator('#mbar button:text-is("Effect")').click();await pg.locator('.mdd button',{hasText:'Stylize'}).first().hover();await pg.locator('.msub button',{hasText:'Drop Shadow'}).first().click();await pg.waitForTimeout(250);await pg.click('.fxb button.pri');await pg.waitForTimeout(250);
const fxs=()=>pg.evaluate(()=>JSON.parse([...sel][0].g.dataset.fx||'[]'));
let f=await fxs();chk('One live effect stored',f.length===1,f);
// toggle eye off
await pg.locator('#app .apr:has-text("Drop Shadow") .apey').click();await pg.waitForTimeout(150);f=await fxs();chk('Eye toggles the effect off (kept, disabled)',f.length===1&&f[0].off,f);
await pg.locator('#app .apr:has-text("Drop Shadow") .apey').click();await pg.waitForTimeout(150);
// edit by clicking name
await pg.locator('#app .apr:has-text("Drop Shadow") .apn, #app .apr:has-text("Drop Shadow") u').first().click();await pg.waitForTimeout(300);const t=await pg.evaluate(()=>(document.querySelector('.fxb')||{}).innerText||'');chk('Clicking the effect name reopens its dialog',/Drop Shadow/.test(t),t.slice(0,60));
await pg.keyboard.press('Escape');await pg.waitForTimeout(150);
// fx button menu
await pg.locator('#app button:has(svg) >> nth=1').click({timeout:1500}).catch(()=>{});
const fxBtn=await pg.evaluate(()=>[...document.querySelectorAll('#app button')].map(b=>b.title||b.textContent.trim()).join(' | '));console.log('Appearance buttons:',fxBtn);
// duplicate + remove
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

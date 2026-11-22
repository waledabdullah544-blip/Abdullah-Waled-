const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(400);
await pg.fill('#clhex','FF0000');await pg.press('#clhex','Enter');
// panel menu of the Color tab group (first Panel menu button)
const pos=await pg.evaluate(()=>{const g=[...document.querySelectorAll('.dkt')].find(d=>/Color/.test(d.textContent));const b=[...g.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='≡');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}});await pg.mouse.click(pos.x,pos.y);await pg.waitForTimeout(200);
console.log('COLOR PANEL MENU:',await pg.evaluate(()=>[...document.querySelectorAll('.mdd:not([style*="display: none"]) button, .fxm button, [role=menu]:not([style*="display: none"]) button')].map(b=>b.textContent.trim()).filter(Boolean).slice(0,30).join(' | ')));
await pg.keyboard.press('Escape');
for(const m of ['gray','hsb','cmyk','rgb']){await pg.evaluate(m=>{const s=document.getElementById('clm');s.value=m;s.dispatchEvent(new Event('change',{bubbles:true}))},m);await pg.waitForTimeout(150);
 console.log(m,'→',await pg.evaluate(()=>[...document.querySelectorAll('#clsl .row, #clsl > *')].map(r=>r.innerText.replace(/\s+/g,' ').trim()).join(' / ')+' | hex='+document.getElementById('clhex').value));}
await H.b.close()})();

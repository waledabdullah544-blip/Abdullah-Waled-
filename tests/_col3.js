const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const st=()=>pg.evaluate(()=>objs.map(o=>{const e=o.g.querySelector('rect,path,ellipse');return{fill:e&&e.getAttribute('fill'),stroke:e&&e.getAttribute('stroke'),sw:e&&e.getAttribute('stroke-width'),op:o.g.style.opacity||'',disp:o.g.style.display,cm:cv.classList.contains('outlv')}}).slice(-1)[0]);
await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.waitForTimeout(150);
console.log('drawn',JSON.stringify(await st()));
await pg.evaluate(()=>DK.open('swatches'));await pg.waitForTimeout(400);
const sw=await pg.evaluate(()=>[...document.querySelectorAll('#swp *')].filter(e=>e.children.length===0).length);console.log('swp elems',sw);
// click the 12th little swatch
const pos=await pg.evaluate(()=>{const cands=[...document.querySelectorAll('#swp [data-i],#swp .sw,#swp i,#swp button')].filter(e=>{const r=e.getBoundingClientRect();return r.width>8&&r.height>8&&r.width<40});const e=cands[12];if(!e)return null;const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,c:e.className,t:e.title}});console.log('swatch target',JSON.stringify(pos));
if(pos){await pg.mouse.click(pos.x,pos.y);await pg.waitForTimeout(300);console.log('after swatch click',JSON.stringify(await st()))}
// Color panel
await pg.evaluate(()=>DK.open('color'));await pg.waitForTimeout(400);
console.log('color panel inputs',await pg.evaluate(()=>[...document.querySelectorAll('#clp input,#clp select')].map(e=>(e.id||e.dataset.k||e.type)+'='+e.value).slice(0,14).join(' ')));
// CMYK mode then change C
await pg.evaluate(()=>{window.docMode&&docMode('CMYK')});await pg.waitForTimeout(300);
console.log('mode',await pg.evaluate(()=>window.DOCMODE));
await pg.screenshot({path:'/tmp/mdl/col3.png'});
console.log('errs',H.errs);await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.keyboard.press('m');await H.drag(200,200,400,350);await pg.keyboard.press('v');await pg.waitForTimeout(200);
const get=()=>pg.evaluate(()=>{const e=objs[0].g.querySelector('rect,path');return{fill:e.getAttribute('fill'),stroke:e.getAttribute('stroke'),outl:cv.classList.contains('outlv')}});
console.log('start',await get());
await pg.click('text=Window');await pg.waitForTimeout(200);await pg.click('.mdd >> text=Swatches');await pg.waitForTimeout(500);
const n=await pg.evaluate(()=>document.querySelectorAll('#swp [data-i], #swp .sw, #swp button').length);console.log('swatch controls',n);
const sw=await pg.evaluate(()=>[...document.querySelectorAll('#swp *')].filter(e=>e.children.length===0&&getComputedStyle(e).width!=='0px').slice(0,5).map(e=>e.tagName+'.'+e.className));console.log(sw);
const box=await pg.evaluate(()=>{const e=[...document.querySelectorAll('#swp .sw, #swp [data-c], #swp i')].find(x=>{const r=x.getBoundingClientRect();return r.width>8&&r.height>8});if(!e)return null;const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,cls:e.className}});console.log('target',box);
if(box){await pg.mouse.click(box.x+20,box.y);await pg.waitForTimeout(300);console.log('after fill swatch click',await get());
 await pg.keyboard.down('Shift');await pg.mouse.click(box.x+40,box.y);await pg.keyboard.up('Shift');await pg.waitForTimeout(300);console.log('after shift-click (stroke)',await get())}
await pg.keyboard.press('Control+y');await pg.waitForTimeout(150);console.log('Outline on ->',await get());
await H.b.close()})();

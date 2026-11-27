const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const st=()=>pg.evaluate(()=>{const o=objs[objs.length-1],e=o&&o.g.querySelector('rect,path,ellipse');return{n:objs.length,fill:e&&e.getAttribute('fill'),stroke:e&&e.getAttribute('stroke'),sw:e&&e.getAttribute('stroke-width'),dfill:DEF.fill,dstroke:DEF.stroke,act:window.FSACT||window.fsAct||null}});
await pg.evaluate(()=>DK.open('swatches'));await pg.waitForTimeout(300);
await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.waitForTimeout(150);
console.log('drawn',JSON.stringify(await st()));
console.log('toolbox chips',await pg.evaluate(()=>[...document.querySelectorAll('#fsbox *, #fs *, .fsw *')].slice(0,12).map(e=>e.id+'.'+e.className).join(' | ')));
// click on stroke chip (behind fill)
await pg.mouse.click(52,631);await pg.waitForTimeout(300);
console.log('after click stroke chip',JSON.stringify(await st()));
await pg.mouse.click(1382,672);await pg.waitForTimeout(300);
console.log('then blue swatch',JSON.stringify(await st()));
await pg.keyboard.press('x');await pg.mouse.click(1420,672);await pg.waitForTimeout(300);
console.log('X then swatch',JSON.stringify(await st()));
await pg.screenshot({path:'/tmp/mdl/col5.png',clip:{x:0,y:560,width:120,height:140}});
console.log('errs',H.errs);await H.b.close()})();

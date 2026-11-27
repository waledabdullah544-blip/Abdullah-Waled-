const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const st=()=>pg.evaluate(()=>objs.map(o=>{const e=o.g.querySelector('rect,path,ellipse');return{n:objs.length,fill:e&&e.getAttribute('fill'),stroke:e&&e.getAttribute('stroke'),sw:e&&e.getAttribute('stroke-width'),dfill:DEF.fill,dstroke:DEF.stroke,fc:getComputedStyle(e).fill,visible:o.g.style.display!=='none'}}).slice(-1)[0]);
await pg.evaluate(()=>DK.open('swatches'));await pg.waitForTimeout(300);
for(const mode of ['RGB','CMYK']){
  await pg.evaluate(m=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();window.docMode(m)},mode);await pg.waitForTimeout(200);
  await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.waitForTimeout(150);
  console.log(mode,'drawn',JSON.stringify(await st()));
  await pg.mouse.click(1306,672);await pg.waitForTimeout(300);console.log(mode,'click red swatch (fill active)',JSON.stringify(await st()));
  await pg.mouse.click(1344,672);await pg.waitForTimeout(300);console.log(mode,'click green swatch',JSON.stringify(await st()));
  // draw a second shape with a different tool
  await pg.evaluate(()=>setTool('l'));await H.drag(450,150,600,300);await pg.waitForTimeout(200);console.log(mode,'2nd shape',JSON.stringify(await st()));
  // set stroke active (X) then click swatch
  await pg.keyboard.press('x');await pg.mouse.click(1382,672);await pg.waitForTimeout(300);console.log(mode,'stroke active + blue swatch',JSON.stringify(await st()));
  await pg.keyboard.press('x');
}
await pg.screenshot({path:'/tmp/mdl/col4.png'});
console.log('errs',H.errs);await H.b.close()})();

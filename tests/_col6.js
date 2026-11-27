const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const st=()=>pg.evaluate(()=>{const o=objs[objs.length-1],e=o&&o.g.querySelector('rect,path,ellipse');return{n:objs.length,fill:e&&e.getAttribute('fill'),fc:e&&getComputedStyle(e).fill,stroke:e&&e.getAttribute('stroke'),op:o&&o.g.style.opacity,sel:o&&sel.has(o),dfill:DEF.fill}});
for(const mode of ['RGB','CMYK']){
  await pg.evaluate(m=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();window.docMode(m)},mode);
  await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.waitForTimeout(150);
  // double-click the Fill chip like the user does
  await pg.mouse.dblclick(36,617);await pg.waitForTimeout(400);
  console.log(mode,'dialog',await pg.evaluate(()=>!!document.querySelector('.cpb')));
  if(await pg.evaluate(()=>!!document.querySelector('.cpb'))){
    // click inside the colour field like a user
    const f=await pg.evaluate(()=>{const r=document.getElementById('cpkf').getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
    await pg.mouse.click(f.x+f.w*.8,f.y+f.h*.3);await pg.waitForTimeout(200);
    console.log(mode,'live preview while dialog open',JSON.stringify(await st()));
    await pg.fill('#cpkhex','22aa44');await pg.keyboard.press('Tab');await pg.waitForTimeout(200);
    console.log(mode,'hex typed',JSON.stringify(await st()));
    await pg.click('.cpb button.pri');await pg.waitForTimeout(300);
    console.log(mode,'after OK',JSON.stringify(await st()));
    // reopen then Cancel: must keep the previous colour
    await pg.mouse.dblclick(36,617);await pg.waitForTimeout(300);await pg.fill('#cpkhex','ff00ff');await pg.waitForTimeout(150);
    console.log(mode,'preview magenta',JSON.stringify(await st()));
    await pg.click('.cpb .fxf button:not(.pri)');await pg.waitForTimeout(300);
    console.log(mode,'after Cancel (must be 22aa44)',JSON.stringify(await st()));
  }
}
console.log('errs',H.errs);await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open({page:{deviceScaleFactor:1.5,viewport:{width:1366,height:768}}}),pg=H.pg;
const info=()=>pg.evaluate(()=>objs.map(o=>({n:o.g.querySelectorAll('text').length,txt:[...o.g.querySelectorAll('text')].map(t=>t.textContent.slice(0,25)),lines:[...o.g.querySelectorAll('text')].map(t=>t.querySelectorAll('tspan').length),paths:o.g.querySelectorAll('path,ellipse,rect,polygon').length,vis:o.g.style.display})));
for(const [label,key,mk,inside] of [['ellipse','l',[200,150,520,330],true],['star','st',null,true],['polygon','pg',null,true],['rect edge','m',[200,150,520,330],false]]){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();z=1;view()});
  await pg.keyboard.press('Escape');
  if(label==='star'){await pg.evaluate(()=>setTool('sr'));await H.drag(360,240,360,330)}else if(label==='polygon'){await pg.evaluate(()=>setTool('po'));await H.drag(360,240,360,330)}else{await pg.keyboard.press(key);await H.drag(...mk)}
  await pg.keyboard.press('v');await pg.waitForTimeout(150);
  await pg.evaluate(()=>setTool('at'));await pg.waitForTimeout(150);
  const b=await pg.evaluate(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});
  if(inside)await H.click(b.x+b.w/2,b.y+b.h/2);else await H.click(b.x+b.w/2,b.y);
  await pg.waitForTimeout(300);await pg.keyboard.type('Hello world this is area type in a shape',{delay:25});await pg.waitForTimeout(250);
  const during=await info();
  await pg.screenshot({path:'/tmp/mdl/ty2_'+label.replace(/\s/g,'_')+'_edit.png',clip:{x:H.R.x+100,y:H.R.y+60,width:600,height:380}});
  await pg.keyboard.press('Escape');await pg.waitForTimeout(400);
  const after=await info();
  await pg.screenshot({path:'/tmp/mdl/ty2_'+label.replace(/\s/g,'_')+'_done.png',clip:{x:H.R.x+100,y:H.R.y+60,width:600,height:380}});
  console.log(label,'DURING',JSON.stringify(during),'AFTER',JSON.stringify(after));
}
console.log('errs',H.errs);await H.b.close()})();

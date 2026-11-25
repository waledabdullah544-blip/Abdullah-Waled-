const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const info=()=>pg.evaluate(()=>objs.map(o=>({tr:o.g.getAttribute('transform'),m:o.m,txt:[...o.g.querySelectorAll('text')].map(t=>({c:t.textContent.slice(0,40),ts:t.querySelectorAll('tspan').length,fs:t.getAttribute('font-size'),tr:t.getAttribute('transform')})),bb:(()=>{const b=wbox(o);return[Math.round(b.x),Math.round(b.y),Math.round(b.w),Math.round(b.h)]})()})));
const cases=[['scaled+moved',async()=>{await pg.evaluate(()=>{const o=objs[0];const b=wbox(o);setW(o,b.x+40,b.y+30,b.w*1.5,b.h*.7);commit();draw()})}],
 ['rotated 25deg',async()=>{await pg.keyboard.press('v');await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.keyboard.press('r');const b=await pg.evaluate(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});await H.drag(b.x+b.w*.5+120,b.y+b.h*.5,b.x+b.w*.5+110,b.y+b.h*.5+70)}],
 ['sheared via shear',async()=>{await pg.evaluate(()=>{const o=objs[0];o.m={...o.m,sx:1.2,sy:1};apply(o);commit();draw()})}]];
for(const [label,tf] of cases){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();z=1;view()});
  await pg.keyboard.press('Escape');await pg.keyboard.press('m');await H.drag(220,150,480,300);await pg.keyboard.press('v');
  await tf();await pg.waitForTimeout(250);
  console.log(label,'shape',JSON.stringify((await info())[0]));
  await pg.evaluate(()=>setTool('at'));await pg.waitForTimeout(150);
  const b=await pg.evaluate(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});
  await H.click(b.x+b.w/2,b.y+b.h/2);await pg.waitForTimeout(300);await pg.keyboard.type('Hello world this is area type test',{delay:25});await pg.waitForTimeout(300);
  console.log(label,'TEXT',JSON.stringify(await info()));
  await pg.screenshot({path:'/tmp/mdl/ty3_'+label.replace(/\W/g,'_')+'.png',clip:{x:H.R.x+60,y:H.R.y+60,width:700,height:420}});
  await pg.keyboard.press('Escape');await pg.waitForTimeout(300);
  await pg.screenshot({path:'/tmp/mdl/ty3_'+label.replace(/\W/g,'_')+'_done.png',clip:{x:H.R.x+60,y:H.R.y+60,width:700,height:420}});
}
console.log('errs',H.errs);await H.b.close()})();

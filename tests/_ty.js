const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const dump=()=>pg.evaluate(()=>objs.map(o=>({kind:[...o.g.querySelectorAll('text')].map(t=>t.getAttribute('data-kind')),txt:[...o.g.querySelectorAll('text')].map(t=>({c:t.textContent.slice(0,30),ts:t.querySelectorAll('tspan').length,fs:t.getAttribute('font-size'),fill:t.getAttribute('fill'),ff:(t.getAttribute('font-family')||'').slice(0,30),dir:t.getAttribute('direction')||t.style.direction})),bb:(()=>{const b=wbox(o);return[Math.round(b.x),Math.round(b.y),Math.round(b.w),Math.round(b.h)]})()})));
for(const [label,tool,txt,zoom,fill] of [['AT en z63 red','at','Hello world area type test',.63,'#d33'],['AT ar z63','at','مرحبا بالعالم هذا اختبار للنص',.63,'#000'],['VAT en','vat','Hello world vertical area',1,'#000'],['TP en z63','tp','Hello text on a path test',.63,'#000'],['TP ar','tp','مرحبا نص على مسار',1,'#000'],['T en','t','Point type test',1,'#000']]){
  await pg.evaluate(async([zm,f])=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();if(zm!==1){z=zm;view()}else{z=1;view()}DEF.fill=f},[zoom,fill]);
  await pg.keyboard.press('Escape');
  const isPath=tool==='tp'||tool==='vtp';
  if(isPath){await pg.keyboard.press('p');await H.click(200,300);await H.click(420,220);await pg.keyboard.press('Escape');await pg.keyboard.press('v')}
  else if(tool!=='t'){await pg.keyboard.press('m');await H.drag(200,150,520,330);await pg.keyboard.press('v')}
  await pg.evaluate(t=>setTool(t),tool);await pg.waitForTimeout(150);
  const b=await pg.evaluate(()=>objs.length?(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}})():{x:250,y:200,w:0,h:0});
  if(tool==='t')await H.click(250,220);else if(isPath)await H.click(b.x+b.w/2,b.y+b.h/2);else await H.click(b.x+b.w/2,b.y);
  await pg.waitForTimeout(300);await pg.keyboard.type(txt,{delay:25});await pg.waitForTimeout(300);
  console.log(label,JSON.stringify(await dump()));
  await pg.screenshot({path:'/tmp/mdl/ty_'+label.replace(/\s/g,'_')+'.png',clip:{x:H.R.x+80,y:H.R.y+60,width:700,height:420}});
  await pg.keyboard.press('Escape');await pg.waitForTimeout(300);
}
console.log('errs',H.errs);await H.b.close()})();

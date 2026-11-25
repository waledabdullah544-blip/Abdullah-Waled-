const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const info=()=>pg.evaluate(()=>objs.map(o=>({shape:[...o.g.querySelectorAll('path,rect,ellipse')].map(e=>e.getAttribute('fill')+'/'+e.getAttribute('stroke')),text:[...o.g.querySelectorAll('text')].map(t=>({fill:t.getAttribute('fill'),op:t.getAttribute('opacity'),vis:t.getAttribute('visibility'),disp:t.getAttribute('display'),fo:t.getAttribute('fill-opacity'),cs:getComputedStyle(t).fill+'|'+getComputedStyle(t).opacity})) })));
for(const fill of ['#d33333','#ffffff','none']){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();z=1;view()});
  await pg.keyboard.press('Escape');await pg.keyboard.press('m');await H.drag(200,150,520,330);await pg.keyboard.press('v');
  await pg.evaluate(f=>{const e=objs[0].g.firstElementChild;e.setAttribute('fill',f);commit();draw()},fill);
  await pg.evaluate(()=>setTool('at'));await pg.waitForTimeout(150);
  const b=await pg.evaluate(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});
  await H.click(b.x+b.w/2,b.y+b.h/2);await pg.waitForTimeout(300);await pg.keyboard.type('Hello world area type',{delay:25});await pg.waitForTimeout(250);
  console.log('shape fill',fill,'->',JSON.stringify(await info()));
  await pg.screenshot({path:'/tmp/mdl/ty5_'+fill.replace('#','')+'.png',clip:{x:H.R.x+100,y:H.R.y+80,width:500,height:300}});
  await pg.keyboard.press('Escape');await pg.waitForTimeout(250);
}
await H.b.close()})();

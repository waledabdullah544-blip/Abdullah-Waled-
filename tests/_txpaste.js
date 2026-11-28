const L=require('./lib.js');
(async()=>{const H=await L.open({page:{permissions:['clipboard-read','clipboard-write']}}),pg=H.pg;
await pg.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:'null'}).catch(()=>{});
await pg.evaluate(()=>{z=1;view()});
const shot=async n=>pg.screenshot({path:'/tmp/mdl/'+n+'.png',clip:{x:H.R.x+150,y:H.R.y+120,width:500,height:330}});
// 1 point text paste
await pg.keyboard.press('t');await H.click(200,180);await pg.keyboard.type('Point text here ',{delay:3});
await pg.keyboard.down('Shift');for(let i=0;i<5;i++)await pg.keyboard.press('ArrowLeft');await pg.keyboard.up('Shift');
await pg.keyboard.press('Control+c');await pg.keyboard.press('End');for(let i=0;i<3;i++)await pg.keyboard.press('Control+v');
await pg.waitForTimeout(300);await pg.keyboard.press('Escape');
// 2 area type paste
await pg.keyboard.press('m');await H.drag(200,250,420,400);await pg.keyboard.press('v');await pg.evaluate(()=>setTool('at'));
const b=await pg.evaluate(()=>{const b=wbox(objs[objs.length-1]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z}});
await H.click(b.x+b.w/2,b.y);await pg.waitForTimeout(200);await pg.keyboard.type('Area text first words. ',{delay:3});
await pg.keyboard.press('Control+a');await pg.keyboard.press('Control+c');await pg.keyboard.press('End');
for(let i=0;i<4;i++)await pg.keyboard.press('Control+v');await pg.waitForTimeout(300);
await shot('paste1');
console.log(JSON.stringify(await pg.evaluate(()=>objs.map(o=>[...o.g.querySelectorAll('text tspan')].map(t=>{const q=t.getBBox();return[Math.round(q.x),Math.round(q.y),Math.round(q.width),t.textContent.slice(0,30)]})))));
await pg.keyboard.press('Escape');await pg.waitForTimeout(300);await shot('paste2');
console.log(H.errs);await H.b.close()})();

const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(6000);
await H.key('l');await H.drag(300,300,340,340);await H.key('m');await H.drag(560,280,640,360);
await pg.evaluate(()=>{objs[0].g.querySelector('ellipse,path').setAttribute('fill','#ff0000');objs[1].g.querySelector('rect,path').setAttribute('fill','#0000ff');draw()});
// spine path: a curve injected
await pg.evaluate(()=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML='<path d="M0 0C100 -150 250 150 400 0" fill="none" stroke="#000" stroke-width="1"/>';const o={g,bb:null,m:{sx:1,sy:1,tx:0,ty:0}};g.__o=o;objs.push(o);layer.replaceChildren(...objs.map(q=>q.g));touch(o);sel=new Set([]);draw()});
await pg.evaluate(()=>{sel=new Set([objs[0],objs[1]]);draw();blendMake();});
await pg.evaluate(()=>{blendOptions()});await pg.waitForTimeout(150);await pg.selectOption('.fxb [data-k="m"]','s');await pg.fill('.fxb [data-k="n"]','8');await pg.click('.fxb button.pri');
await pg.evaluate(()=>{sel=new Set(objs);draw();blendReplaceSpine()});await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>({n:objs.length,steps:objs[0].g.querySelectorAll('[data-bgen] path').length,ys:[...objs[0].g.querySelectorAll('[data-bgen] path')].map(p=>{const b=p.getBBox();return Math.round(b.y+b.height/2)})}));
chk('Replace Spine consumed the path and kept 8 steps',r.n===1&&r.steps===8,r);chk('steps follow the curved spine (y varies)',new Set(r.ys).size>3,r.ys);
await pg.screenshot({path:'/tmp/bl_spine.png'});
await pg.evaluate(()=>blendReverseSpine());await pg.waitForTimeout(200);
const r2=await pg.evaluate(()=>[...objs[0].g.querySelectorAll('[data-bgen] path')].map(p=>Math.round(p.getBBox().y+p.getBBox().height/2)));chk('Reverse Spine changes the arrangement',JSON.stringify(r2)!==JSON.stringify(r.ys),r2);
// align to path
await pg.evaluate(()=>{const m=JSON.parse(bnGet(objs[0].g));m.o='path';bnPut(objs[0].g,JSON.stringify(m));touch(objs[0]);draw()});await pg.waitForTimeout(200);
chk('Align to Path renders',await pg.evaluate(()=>objs[0].g.querySelectorAll('[data-bgen] path').length)===8,null);
await pg.screenshot({path:'/tmp/bl_path.png'});
// copy paste
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.keyboard.press('Control+c');await pg.keyboard.press('Control+v');await pg.waitForTimeout(300);
chk('Copy/Paste keeps the blend live',await pg.evaluate(()=>objs.length===2&&objs.every(o=>bnHas(o.g)&&o.g.querySelectorAll('[data-bgen] path').length===8)),await pg.evaluate(()=>objs.map(o=>bnHas(o.g))));
console.log(res.join('\n'),H.errs);await H.b.close()})();

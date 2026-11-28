const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view();localStorage.removeItem('masar.symbols.v1')});await pg.reload();await pg.waitForTimeout(700);await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(300,200,380,260);await pg.evaluate(()=>{fillables(objs[0])[0].setAttribute('fill','#e03131');commit()});
await pg.keyboard.press('l');await H.drag(340,220,420,290);await pg.keyboard.press('v');await pg.keyboard.press('Control+a');
const W0=await pg.evaluate(()=>{const u=uni([...sel]);return[u.x,u.y,u.w,u.h].map(v=>Math.round(v))});
await pg.keyboard.press('Control+Shift+F11');await pg.waitForTimeout(300);ok('Shift+Ctrl+F11 opens Symbols',await pg.evaluate(()=>document.getElementById('syp').offsetParent!==null));
await pg.click('#syp [data-a=new]');await pg.waitForTimeout(200);await pg.keyboard.press('Enter');await pg.waitForTimeout(250);
let r=await pg.evaluate(()=>({n:objs.length,inst:objs.map(o=>SYMS.instOf(o)),box:(b=>[b.x,b.y,b.w,b.h].map(v=>Math.round(v)))(wbox(objs[0])),sy:SYMS.list().length}));
ok('New Symbol: the artwork becomes one instance in the same place',r.n===1&&!!r.inst[0]&&r.sy===1&&r.box.every((v,i)=>Math.abs(v-W0[i])<=1),JSON.stringify([r,W0]));
// place 2 more: button + drag
await pg.click('#syp .si');await pg.click('#syp [data-a=place]');await pg.waitForTimeout(200);
const t=await pg.$('#syp .si');const tb=await t.boundingBox();await pg.mouse.move(tb.x+20,tb.y+20);await pg.mouse.down();await pg.mouse.move(H.R.x+600,H.R.y+400,{steps:8});await pg.mouse.up();await pg.waitForTimeout(250);
r=await pg.evaluate(()=>({n:objs.length,all:objs.every(o=>SYMS.instOf(o))}));ok('Place + drag onto the artboard add instances',r.n===3&&r.all,JSON.stringify(r));
const dropC=await pg.evaluate(()=>{const b=wbox(objs[2]);return[Math.round((b.x+b.w/2)*z+px),Math.round((b.y+b.h/2)*z+py)]});ok('dragged instance lands under the pointer',Math.abs(dropC[0]-600)<=2&&Math.abs(dropC[1]-400)<=2,JSON.stringify(dropC));
// redefine: change the colour inside a broken copy and redefine
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.click('#syp [data-a=brk]');await pg.waitForTimeout(200);
ok('Break Link: plain artwork again',await pg.evaluate(()=>!SYMS.instOf(objs[0])));
await pg.evaluate(()=>{fillables(objs[0]).forEach(e=>e.setAttribute('fill','#2f9e44'));commit();SYMS.select(0);SYMS.redefine()});await pg.waitForTimeout(250);
r=await pg.evaluate(()=>objs.filter(o=>SYMS.instOf(o)).map(o=>[...o.g.querySelectorAll('rect,path,ellipse')].map(e=>e.getAttribute('fill')).join(',')));
ok('Redefine Symbol updates every instance',r.length===2&&r.every(s=>/#2f9e44/.test(s)&&!/#e03131/.test(s)),JSON.stringify(r));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);
// scale an instance then it still is an instance
await pg.evaluate(()=>{const o=objs.find(q=>SYMS.instOf(q));o.m.sx=2;o.m.sy=2;apply(o);commit()});ok('scaled instance stays linked',await pg.evaluate(()=>objs.filter(o=>SYMS.instOf(o)).length===2));
await pg.reload();await pg.waitForTimeout(700);ok('symbols are remembered after reload',await pg.evaluate(()=>SYMS.list().length===1));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

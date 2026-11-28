const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{localStorage.removeItem('masar.symbols.v1');localStorage.removeItem('masar.spray.v1')});await pg.reload();await pg.waitForTimeout(700);await pg.evaluate(()=>{z=1;view()});
// a small star symbol
await pg.evaluate(()=>setTool('sr'));await H.drag(150,150,150,170);await pg.keyboard.press('v');await pg.keyboard.press('F8');await pg.waitForTimeout(200);await pg.keyboard.press('Enter');await pg.waitForTimeout(200);
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});
await pg.keyboard.press('Shift+s');await pg.waitForTimeout(100);ok('Shift+S = Symbol Sprayer',await pg.evaluate(()=>tool==='syn'));
await pg.mouse.move(H.R.x+300,H.R.y+300);await pg.mouse.down();for(let i=0;i<25;i++)await pg.mouse.move(H.R.x+300+i*12,H.R.y+300+Math.sin(i/3)*30);await pg.mouse.up();await pg.waitForTimeout(200);
let r=await pg.evaluate(()=>({n:objs.length,inst:objs[0]?objs[0].g.querySelectorAll(':scope > g[data-ssym]').length:0,grp:objs[0]&&isGroup(objs[0]),sel:sel.size}));
ok('spraying makes ONE symbol set with many instances',r.n===1&&r.inst>=10&&r.grp&&r.sel===1,JSON.stringify(r));
const inside=await pg.evaluate(()=>{const b=wbox(objs[0]);return[b.x*z+px,b.y*z+py,b.w*z,b.h*z].map(Math.round)});ok('instances land around the drag path',inside[0]>200&&inside[0]<330&&inside[2]>200,JSON.stringify(inside));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);ok('Undo removes the whole spray',await pg.evaluate(()=>objs.length===0));
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(150);
// Alt drag removes from the selected set
await pg.evaluate(()=>{sel=new Set(objs);draw()});const n0=await pg.evaluate(()=>objs[0].g.querySelectorAll(':scope > g[data-ssym]').length);
await pg.keyboard.down('Alt');await pg.mouse.move(H.R.x+300,H.R.y+300);await pg.mouse.down();for(let i=0;i<8;i++)await pg.mouse.move(H.R.x+300+i*12,H.R.y+300+Math.sin(i/3)*30);await pg.mouse.up();await pg.keyboard.up('Alt');await pg.waitForTimeout(200);
const n1=await pg.evaluate(()=>objs.length?objs[0].g.querySelectorAll(':scope > g[data-ssym]').length:0);ok('Alt+drag removes instances gradually',n1<n0&&n1>0,n0+'->'+n1);
// brush size keys + options
await pg.keyboard.press(']');ok('] grows the diameter',await pg.evaluate(()=>SPRAY.opts().dia===90));
// Redefine symbol updates sprayed instances
await pg.evaluate(()=>{const o=add(SYMS.current().h.replace(/fill="[^"]*"/g,'fill="#2f9e44"'));sel=new Set([o]);SYMS.select(0);SYMS.redefine();o.g.remove();objs.splice(objs.indexOf(o),1);sel=new Set(objs);commit();draw()});
ok('Redefine Symbol recolours the sprayed instances',await pg.evaluate(()=>{const f=[...objs[0].g.querySelectorAll('g[data-ssym] [fill]')].map(e=>e.getAttribute('fill'));return f.length>0&&f.every(v=>v==='#2f9e44'||v==='none')}));
ok('instances are real symbol instances (data-sym)',await pg.evaluate(()=>!!objs[0]&&!!objs[0].g.querySelector('g[data-sym]')));
await pg.keyboard.press('v');await pg.waitForTimeout(100);await pg.evaluate(()=>{sel=new Set(objs);draw()});await pg.keyboard.press('Control+Shift+g');await pg.waitForTimeout(150);
ok('the set can be ungrouped into single instances',await pg.evaluate(()=>objs.length>3));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

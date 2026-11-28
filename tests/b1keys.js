const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(100,100,160,160);await pg.keyboard.press('v');
for(const [k,v] of [['Digit5',50],['Digit1',10],['Digit0',100]]){await pg.keyboard.press(k);await pg.waitForTimeout(80);const op=await pg.evaluate(()=>styleOf(objs[0]).op);ok(k+' sets opacity '+v+'%',op==v,String(op))}
await pg.keyboard.press('Digit3');await pg.keyboard.press('Control+z');await pg.waitForTimeout(100);ok('undo opacity',await pg.evaluate(()=>styleOf(objs[0]).op==100));
// digits while typing text are text
await pg.keyboard.press('t');await H.click(300,300);await pg.keyboard.type('a5');await pg.keyboard.press('Escape');await pg.waitForTimeout(150);
ok('digits typed into text stay text',await pg.evaluate(()=>objs.some(o=>/a5/.test(o.g.textContent))));
// Alt pressed mid drag
await H.reset();await pg.keyboard.press('m');await H.drag(100,100,160,160);await pg.keyboard.press('v');
await pg.mouse.move(H.R.x+130,H.R.y+130);await pg.mouse.down();await pg.mouse.move(H.R.x+160,H.R.y+130,{steps:3});await pg.keyboard.down('Alt');await pg.mouse.move(H.R.x+230,H.R.y+130,{steps:3});await pg.mouse.up();await pg.keyboard.up('Alt');await pg.waitForTimeout(200);
const xs=await pg.evaluate(()=>objs.map(o=>Math.round(wbox(o).x*z+px)).sort((a,b)=>a-b));ok('Alt pressed during the drag: original stays, copy moved',xs.length===2&&Math.abs(xs[0]-100)<=1&&Math.abs(xs[1]-200)<=1,JSON.stringify(xs));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);const u=await pg.evaluate(()=>objs.map(o=>Math.round(wbox(o).x*z+px)));ok('one Undo removes the copy',u.length===1&&Math.abs(u[0]-100)<=1,JSON.stringify(u));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

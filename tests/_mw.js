const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;await pg.evaluate(()=>{z=1;view()});
await pg.evaluate(()=>{const a=add('<rect x="0" y="100" width="80" height="60" fill="#e03131"/>');const b=add('<ellipse cx="200" cy="140" rx="40" ry="30" fill="#e03131"/>');const c=add('<rect x="80" y="200" width="70" height="50" fill="#1971c2"/>');const d=add('<path d="M260 220L320 200L330 260Z" fill="#e03131"/>');commit();draw()});
await pg.keyboard.press('y');await pg.waitForTimeout(100);console.log(await pg.evaluate(()=>tool));
const p=await pg.evaluate(()=>[40*z+px,130*z+py]);await H.click(p[0],p[1]);await pg.waitForTimeout(200);
console.log(await pg.evaluate(()=>({sel:sel.size,ds:dsSel.size,selg:[...selg.children].map(e=>e.tagName).join(',')})));
await pg.screenshot({path:'/tmp/mdl/mw.png',clip:{x:H.R.x+150,y:H.R.y+50,width:450,height:330}});
await pg.keyboard.press('v');await pg.waitForTimeout(150);await pg.screenshot({path:'/tmp/mdl/mw2.png',clip:{x:H.R.x+150,y:H.R.y+50,width:450,height:330}});
await H.b.close()})();

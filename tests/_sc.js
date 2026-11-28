const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;await pg.evaluate(()=>{z=1;view()});
const S=()=>pg.evaluate(()=>objs.map(o=>{const p=o.g.querySelector('path,rect,ellipse');const b=wbox(o);return{t:p.tagName,d:(p.getAttribute('d')||'').slice(0,120),box:[b.x,b.y,b.w,b.h].map(Math.round),sel:sel.has(o)}}));
await pg.keyboard.press('m');await H.drag(200,150,400,300);
await pg.keyboard.press('c');await pg.waitForTimeout(100);console.log('tool',await pg.evaluate(()=>tool));
await H.click(300,150);await pg.waitForTimeout(200);console.log('after 1st cut',JSON.stringify(await S()));
await H.click(300,300);await pg.waitForTimeout(200);console.log('after 2nd cut',JSON.stringify(await S()));
await pg.screenshot({path:'/tmp/mdl/sc1.png',clip:{x:H.R.x+150,y:H.R.y+100,width:320,height:250}});
// ellipse with scaled transform
await H.reset();await pg.keyboard.press('l');await H.drag(200,150,400,300);await pg.keyboard.press('v');await pg.evaluate(()=>{const o=objs[0];o.m.sx=1.5;apply(o);touch(o);draw()});
const bb=await pg.evaluate(()=>{const b=wbox(objs[0]);return[b.x*z+px,b.y*z+py,b.w*z,b.h*z]});console.log('ell box',bb);
await pg.keyboard.press('c');await H.click(bb[0]+bb[2]/2,bb[1]);await H.click(bb[0]+bb[2]/2,bb[1]+bb[3]);await pg.waitForTimeout(200);
console.log('ellipse 2 cuts',JSON.stringify(await S()));
await pg.screenshot({path:'/tmp/mdl/sc2.png',clip:{x:H.R.x+100,y:H.R.y+100,width:500,height:250}});
console.log(H.errs);await H.b.close()})();

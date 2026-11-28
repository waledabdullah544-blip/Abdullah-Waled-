const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;await pg.evaluate(()=>{z=1;view()});
const B=()=>pg.evaluate(()=>{const o=objs[0],b=wbox(o);return{b:[b.x*z+px,b.y*z+py,b.w*z,b.h*z].map(v=>Math.round(v)),m:o.m,rot:(rotOf(o)*180/Math.PI).toFixed(1),d:(o.g.querySelector('path,rect')||{}).outerHTML.slice(0,140)}});
await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('e');await pg.waitForTimeout(150);
console.log('tool',await pg.evaluate(()=>tool),'handles',await pg.evaluate(()=>[...selg.querySelectorAll('[data-h]')].map(e=>e.dataset.h).join(',')),'widget',await pg.evaluate(()=>{const w=document.querySelector('#ftw,#ftwid,[id^=ftw]');return w?w.id+' '+getComputedStyle(w).display:'none'}));
console.log('start',JSON.stringify(await B()));
// 1 scale with bottom-right corner
await H.drag(420,300,470,340);await pg.waitForTimeout(150);console.log('scale corner',JSON.stringify(await B()));
// 2 rotate: drag from just outside top-right corner
let b=(await B()).b;await H.drag(b[0]+b[2]+12,b[1]-12,b[0]+b[2]+40,b[1]+60);await pg.waitForTimeout(150);console.log('rotate',JSON.stringify(await B()));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);
// 3 free distort: ctrl + drag corner
b=(await B()).b;await pg.keyboard.down('Control');await H.drag(b[0]+b[2],b[1]+b[3],b[0]+b[2]+40,b[1]+b[3]+10);await pg.keyboard.up('Control');await pg.waitForTimeout(150);console.log('distort',JSON.stringify(await B()));
// 4 shear: ctrl + drag side handle
await pg.keyboard.press('Control+z');b=(await B()).b;await pg.keyboard.down('Control');await H.drag(b[0]+b[2]/2,b[1],b[0]+b[2]/2+40,b[1]);await pg.keyboard.up('Control');await pg.waitForTimeout(150);console.log('shear',JSON.stringify(await B()));
// 5 move by dragging inside
await pg.keyboard.press('Control+z');b=(await B()).b;await H.drag(b[0]+b[2]/2,b[1]+b[3]/2,b[0]+b[2]/2+30,b[1]+b[3]/2+20);await pg.waitForTimeout(150);console.log('move inside',JSON.stringify(await B()));
await pg.screenshot({path:'/tmp/mdl/ft.png',clip:{x:H.R.x+200,y:H.R.y+100,width:400,height:350}});
console.log(H.errs);await H.b.close()})();

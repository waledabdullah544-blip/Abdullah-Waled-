const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.keyboard.press('m');await H.drag(300,200,500,330);await pg.keyboard.press('v');
await pg.keyboard.press('t');await H.click(250,420);await pg.keyboard.type('Hello text',{delay:10});await pg.keyboard.press('Escape');await pg.waitForTimeout(200);
const rel=()=>pg.evaluate(()=>{const ab=document.querySelector('#abg rect.abr').getBoundingClientRect();return objs.map(o=>{const b=o.g.getBoundingClientRect();return{kind:o.g.querySelector('text')?'text':'shape',fx:+((b.x-ab.x)/ab.width).toFixed(4),fy:+((b.y-ab.y)/ab.height).toFixed(4),fw:+(b.width/ab.width).toFixed(4),zoom:+z.toFixed(3)}})});
console.log('z~1',JSON.stringify(await rel()));
for(const dy of [1200,1200,2400]){await pg.mouse.move(H.R.x+700,H.R.y+300);await pg.keyboard.down('Control');await pg.mouse.wheel(0,dy);await pg.keyboard.up('Control');await pg.waitForTimeout(250);console.log('after zoom out',JSON.stringify(await rel()))}
for(const dy of [-3000,-3000,-3000]){await pg.mouse.move(H.R.x+700,H.R.y+300);await pg.keyboard.down('Control');await pg.mouse.wheel(0,dy);await pg.keyboard.up('Control');await pg.waitForTimeout(250)}
console.log('after zoom in',JSON.stringify(await rel()));
await pg.screenshot({path:'/tmp/mdl/zoom.png'});
console.log('errs',H.errs);await H.b.close()})();

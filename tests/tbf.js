const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
const g=await pg.locator('#tbgrip').boundingBox();
await pg.mouse.move(g.x+g.width/2,g.y+g.height/2);await pg.mouse.down();for(let i=1;i<=12;i++)await pg.mouse.move(g.x+60+i*30,g.y+100+i*15);await pg.mouse.up();await pg.waitForTimeout(250);
const r=()=>pg.evaluate(()=>{const n=document.querySelector('nav').getBoundingClientRect();return{x:Math.round(n.left),y:Math.round(n.top),w:Math.round(n.width),h:Math.round(n.height),TB:JSON.stringify(TB)}});
const a=await r();console.log('after drag out',JSON.stringify(a));
await pg.reload();await pg.waitForTimeout(900);console.log('after reload',JSON.stringify(await r()));
// toggle columns (double arrow in grip)
await pg.evaluate(()=>{const b=document.querySelector('#tbcols,#tbcol,nav .tbcol');return b&&b.id});
await H.b.close()})();

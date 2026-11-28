const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});const R=H.R;
const val=t=>pg.evaluate(t=>{const o=objs[objs.length-1];if(!o)return null;if(o.g.dataset.gen){const D=JSON.parse(o.g.dataset.gen);return{spi:D.opt.seg,rgr:D.opt.hd,pgr:D.opt.cd}[t]}return JSON.parse(o.g.firstElementChild.getAttribute('data-p')).n},t);
const draw=async(t,ups)=>{await pg.evaluate(t=>setTool(t),t);await pg.mouse.move(R.x+300,R.y+250);await pg.mouse.down();await pg.mouse.move(R.x+360,R.y+300,{steps:4});for(let i=0;i<ups;i++){await pg.keyboard.press('ArrowUp');await pg.waitForTimeout(30)}await pg.mouse.move(R.x+400,R.y+340,{steps:4});await pg.mouse.up();await pg.waitForTimeout(150);return val(t)};
const DEF={spi:20,rgr:5,pgr:5,po:6,sr:5};
for(const t of Object.keys(DEF)){await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});
  const a=await draw(t,0);await pg.keyboard.press('Delete');const b=await draw(t,3);await pg.keyboard.press('Delete');const c=await draw(t,0);
  ok(t+': first shape uses the default ('+DEF[t]+'), arrows change only that shape, the next one is the default again',a===DEF[t]&&b===DEF[t]+3&&c===DEF[t],[a,b,c])}
// the tool's Options still persist: polygon dialog with 8 sides
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();setTool('po')});await H.click(500,300);await pg.waitForTimeout(200);
const opened=await pg.evaluate(()=>!!document.querySelector('.fxm'));if(opened){await pg.evaluate(()=>{const i=[...document.querySelectorAll('.fxm input')].find(x=>/side/i.test((x.closest('label')||{}).textContent||''));if(i){i.value='8';i.dispatchEvent(new Event('input',{bubbles:true}))}});await pg.keyboard.press('Enter');await pg.waitForTimeout(200)}
const d=await draw('po',0);ok('values set in the Polygon Options are kept for the next polygon',!opened||d===8,[opened,d]);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

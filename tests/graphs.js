const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('j');await pg.waitForTimeout(100);ok('J = Column Graph Tool',await pg.evaluate(()=>tool==='gr_col'));
await H.drag(200,150,500,350);await pg.waitForTimeout(200);ok('the Graph Data window opens',await pg.evaluate(()=>/Graph Data/.test((document.querySelector('.fxb')||{}).innerText||'')));
await pg.evaluate(()=>{const s=(k,v)=>{const e=document.querySelector('.fxb [data-v="'+k+'"]');e.value=v};s('0,0',10);s('1,0',20);s('2,0',5);s('3,0',15)});
await pg.click('.fxb button.pri');await pg.waitForTimeout(200);
let r=await pg.evaluate(()=>{const o=objs[0];return{g:GRAPH.isGraph(o),bars:o.g.querySelectorAll('g[data-gpart=bar] rect').length,box:(b=>[b.w,b.h].map(Math.round))(wbox(o)),grp:isGroup(o)}});
ok('a column graph with 8 bars (4 rows × 2 series), a group',r.g&&r.bars===8&&r.grp,JSON.stringify(r));
ok('graph fits the dragged box',Math.abs(r.box[0]-300)<30&&Math.abs(r.box[1]-200)<30,JSON.stringify(r.box));
const h=await pg.evaluate(()=>[...objs[0].g.querySelectorAll('g[data-gpart=bar] rect')].filter((e,i)=>i%2===0).map(e=>Math.round(+e.getAttribute('height'))));
ok('bar heights follow the data (20 is the tallest, 5 the shortest)',h[1]===Math.max(...h)&&h[2]===Math.min(...h)&&Math.abs(h[1]/h[2]-4)<.2,JSON.stringify(h));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(100);ok('Undo',await pg.evaluate(()=>objs.length===0));await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(100);
// change type and data
await pg.evaluate(()=>{sel=new Set(objs);GRAPH.editType('pie')});ok('Object > Graph > Type > Pie',await pg.evaluate(()=>objs[0].g.querySelectorAll('g[data-gpart=slice] path, g[data-gpart=slice] ellipse').length===4));
await pg.evaluate(()=>GRAPH.editType('line'));ok('Line graph',await pg.evaluate(()=>objs[0].g.querySelectorAll('g[data-gpart=series] path').length===2));
await pg.evaluate(()=>GRAPH.editType('sbar'));ok('Stacked bar',await pg.evaluate(()=>objs[0].g.querySelectorAll('g[data-gpart=bar] rect').length===8));
await pg.evaluate(()=>GRAPH.editData());await pg.waitForTimeout(150);await pg.click('.fxb [data-g="r+"]');await pg.click('.fxb button.pri');await pg.waitForTimeout(150);
ok('Data… adds a row and rebuilds',await pg.evaluate(()=>objs[0].g.querySelectorAll('g[data-gpart=bar] rect').length===10));
// recolour a series part keeps working (plain shapes)
ok('parts are plain shapes that can be coloured',await pg.evaluate(()=>{const e=objs[0].g.querySelector('g[data-gpart=bar] rect');e.setAttribute('fill','#ff0000');return e.getAttribute('fill')==='#ff0000'}));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

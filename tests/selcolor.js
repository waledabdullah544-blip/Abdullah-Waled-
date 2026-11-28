const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view();const o=add('<path d="M200 150 L400 150 L400 300 L200 300 Z" fill="#e03131" stroke="#000"/>');sel=new Set([o]);setTool('v');commit();draw()});
const c=await pg.evaluate(()=>({lines:[...selg.querySelectorAll('path[fill="none"],rect[fill="none"]')].map(e=>e.getAttribute('stroke')),handles:[...selg.querySelectorAll('rect[data-h]')].map(e=>e.getAttribute('fill'))}));
ok('selection lines are grey',c.lines.length&&c.lines.every(s=>/^#8c8c8c$/i.test(s)),c.lines);ok('bounding box handles are gold',c.handles.length===8&&c.handles.every(f=>/^#f0c374$/i.test(f)),c.handles);
await pg.evaluate(()=>{setTool('a');dsSel=new Set([dsAnchors(objs[0])[0].key]);draw()});
const a=await pg.evaluate(()=>[...selg.querySelectorAll('rect')].map(e=>e.getAttribute('fill')+'/'+e.getAttribute('stroke')));
ok('Direct Selection: the selected point is solid gold, the others white with a gold edge',a.filter(x=>/^#F0C374\/#3a3a3a$/i.test(x)).length===1&&a.filter(x=>/^#fff\/#F0C374$/i.test(x)).length===3,a);
// Lasso never moves points
await pg.evaluate(()=>{sel=new Set(objs);dsSel=new Set([dsAnchors(objs[0])[0].key]);setTool('ls');draw()});
const d0=await pg.evaluate(()=>objs[0].g.querySelector('path').getAttribute('d'));const p=await pg.evaluate(()=>w2s(200,150));
await H.drag(p[0],p[1],p[0]+60,p[1]+80);await pg.waitForTimeout(200);
ok('a Lasso drag that starts on a selected point does not move it',await pg.evaluate(()=>objs[0].g.querySelector('path').getAttribute('d'))===d0);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

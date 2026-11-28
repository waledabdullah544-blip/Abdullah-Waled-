const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{localStorage.removeItem('masar.brushes.v1')});await pg.reload();await pg.waitForTimeout(700);await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('p');await H.click(250,300);await H.click(400,250);await H.click(520,320);await pg.keyboard.press('Escape');await pg.keyboard.press('v');await pg.evaluate(()=>{sel=new Set(objs);draw()});
await pg.keyboard.press('F5');await pg.waitForTimeout(300);
ok('F5 opens Brushes (and does not reload the page)',await pg.evaluate(()=>{const p=document.getElementById('bsp');return p&&p.offsetParent!==null&&objs.length===1}));
ok('built-in brushes listed with previews',await pg.evaluate(()=>document.querySelectorAll('#bsp .bi svg path').length>=4));
await pg.click('#bsp .bi[data-k=calli]');await pg.waitForTimeout(200);
ok('clicking a brush applies it to the selected path',await pg.evaluate(()=>!!objs[0].g.querySelector('path[data-bc="calli"]')&&!!objs[0].g.querySelector('path[data-bo]')));
await pg.click('#bsp [data-a=rm]');await pg.waitForTimeout(200);ok('Remove Brush Stroke goes back to a basic stroke',await pg.evaluate(()=>!objs[0].g.querySelector('[data-bc]')&&!objs[0].g.querySelector('[data-bo]')));
// new calligraphic brush
await pg.click('#bsp [data-a=new]');await pg.waitForTimeout(200);
await pg.evaluate(()=>{const d=[...document.querySelectorAll('.fxb')].pop();const s=(k,v)=>{const e=d.querySelector('[data-k="'+k+'"]');e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))};s('n','Wide Flat');s('d','20');s('a','0');s('r','20')});
ok('New Brush dialog shows a live preview',await pg.evaluate(()=>!!document.querySelector('#bspv svg path[d^="M"]')));
await pg.keyboard.press('Enter');await pg.waitForTimeout(250);
const id=await pg.evaluate(()=>BRP.custom().slice(-1)[0]&&BRP.custom().slice(-1)[0].id);ok('new brush saved and listed',!!id&&await pg.evaluate(id=>!!document.querySelector('#bsp .bi[data-k="'+id+'"]')&&[...document.getElementById('pbs').options].some(o=>o.value===id),id));
await pg.click('#bsp .bi[data-k="'+id+'"]');await pg.waitForTimeout(200);
const w1=await pg.evaluate(()=>{const o=objs[0].g.querySelector('path[data-bo]');return o?Math.round(o.getBBox().height):0});ok('the new brush draws a wide flat stroke',w1>60,String(w1));
// edit options -> paths update
await pg.dblclick('#bsp .bi[data-k="'+id+'"]');await pg.waitForTimeout(200);await pg.evaluate(()=>{const d=[...document.querySelectorAll('.fxb')].pop();const e=d.querySelector('[data-k="d"]');e.value='4';e.dispatchEvent(new Event('input',{bubbles:true}))});await pg.keyboard.press('Enter');await pg.waitForTimeout(250);
const w2=await pg.evaluate(()=>{const o=objs[0].g.querySelector('path[data-bo]');return o?Math.round(o.getBBox().height):0});ok('Brush Options updates the paths that use it',w2<w1,w1+'->'+w2);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);
// paintbrush uses the panel brush
await pg.evaluate(()=>{sel=new Set();draw();setTool('br')});await pg.evaluate(id=>{const s=document.getElementById('pbs');s.value=id;s.dispatchEvent(new Event('change'))},id);
await pg.mouse.move(H.R.x+250,H.R.y+450);await pg.mouse.down();for(let i=1;i<12;i++)await pg.mouse.move(H.R.x+250+i*20,H.R.y+450+Math.sin(i/2)*30);await pg.mouse.up();await pg.waitForTimeout(200);
ok('Paintbrush draws with the custom brush',await pg.evaluate(id=>!!objs[objs.length-1].g.querySelector('path[data-bc="'+id+'"]'),id));
await pg.reload();await pg.waitForTimeout(800);ok('custom brushes are remembered after reload',await pg.evaluate(id=>BRP.custom().some(b=>b.id===id)&&!!BRUSHES[id],id));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

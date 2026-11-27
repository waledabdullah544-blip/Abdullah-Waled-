const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
await pg.keyboard.press('m');await H.drag(250,150,520,330);await pg.keyboard.press('v');await pg.waitForTimeout(150);
await pg.evaluate(()=>window.gradPanelOpen());await pg.waitForTimeout(400);
ok('Gradient panel opens (no gradient yet)',await pg.evaluate(()=>/no gradient/.test(document.getElementById('grdp').textContent)));
await pg.click('#grdp [data-a=make]');await pg.waitForTimeout(250);
ok('Apply Gradient creates a linear white→black gradient',await pg.evaluate(()=>{const e=objs[0].g.querySelector('rect,path');const g=gradOf(e);return !!g&&g.s.length===2&&/url\(#gr-/.test(e.getAttribute('fill'))}));
// add a stop by clicking the bar
const bar=await pg.evaluate(()=>{const r=document.getElementById('grbar').getBoundingClientRect();return{x:r.x,y:r.y+r.height/2,w:r.width}});
await pg.mouse.click(bar.x+bar.w*.5,bar.y);await pg.waitForTimeout(250);
ok('click on the bar adds a stop',await pg.evaluate(()=>gradOf(objs[0].g.querySelector('rect,path')).s.length===3));
// stop colour + opacity + location
await pg.evaluate(()=>{const h=document.getElementById('gph');h.value='ff0000';h.dispatchEvent(new Event('input',{bubbles:true}));h.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(150);
await pg.evaluate(()=>{const o=document.getElementById('gpo');o.value='40';o.dispatchEvent(new Event('input',{bubbles:true}));o.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(150);
const st=await pg.evaluate(()=>{const e=objs[0].g.querySelector('rect,path'),g=gradOf(e),d=document.querySelector(e.getAttribute('fill').slice(4,-1));return{stops:g.s,dom:[...d.querySelectorAll('stop')].map(s=>s.getAttribute('stop-color')+'/'+s.getAttribute('stop-opacity'))}});
ok('selected stop is red with 40% opacity in the SVG '+JSON.stringify(st.dom),st.dom.some(x=>x==='#ff0000/0.4'));
// angle
await pg.evaluate(()=>{const a=document.getElementById('gpa');a.value='90';a.dispatchEvent(new Event('input',{bubbles:true}));a.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(150);
ok('angle 90° makes the gradient vertical',await pg.evaluate(()=>{const p=gradOf(objs[0].g.querySelector('rect,path')).p;return Math.abs(p[0]-p[2])<1e-6&&p[3]>p[1]}));
// radial + aspect ratio
await pg.click('#grdp [data-a=type][data-v=r]');await pg.waitForTimeout(200);
await pg.evaluate(()=>{const a=document.getElementById('gpr');a.value='50';a.dispatchEvent(new Event('input',{bubbles:true}));a.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(150);
ok('radial aspect ratio 50% sets a gradientTransform',await pg.evaluate(()=>{const e=objs[0].g.querySelector('rect,path'),d=document.querySelector(e.getAttribute('fill').slice(4,-1));return d.tagName==='radialGradient'&&/scale\(1 0\.5\)/.test(d.getAttribute('gradientTransform')||'')}));
// reverse
const before=await pg.evaluate(()=>gradOf(objs[0].g.querySelector('rect,path')).s.map(q=>q[1]).join());await pg.click('#grdp [data-a=rev]');await pg.waitForTimeout(200);
const after=await pg.evaluate(()=>gradOf(objs[0].g.querySelector('rect,path')).s.map(q=>q[1]).join());ok('Reverse flips the stops '+before+' → '+after,before.split(',').reverse().join()===after);
// delete a stop
await pg.click('#grdp [data-a=del]');await pg.waitForTimeout(200);ok('Delete removes the stop',await pg.evaluate(()=>gradOf(objs[0].g.querySelector('rect,path')).s.length===2));
// undo / redo through the panel edits
await pg.keyboard.press('Control+z');await pg.waitForTimeout(250);ok('Undo restores the deleted stop',await pg.evaluate(()=>gradOf(objs[0].g.querySelector('rect,path')).s.length===3));
// stroke gradient
await pg.click('#grdp [data-a=fa][data-v=stroke]');await pg.waitForTimeout(150);await pg.click('#grdp [data-a=make]');await pg.waitForTimeout(250);
ok('Apply to Stroke gives the stroke its own gradient',await pg.evaluate(()=>{const e=objs[0].g.querySelector('rect,path');return /url\(#gs-/.test(e.getAttribute('stroke'))&&/url\(#gr-/.test(e.getAttribute('fill'))}));
await pg.screenshot({path:'/tmp/mdl/gradp.png'});
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

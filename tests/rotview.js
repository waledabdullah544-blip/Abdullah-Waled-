const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');
const scr=()=>pg.evaluate(()=>{const e=objs[0].g.querySelector('rect,path'),b=e.getBoundingClientRect(),r=cv.getBoundingClientRect();return[b.left-r.left,b.top-r.top,b.width,b.height].map(Math.round)});
const s0=await scr();
await pg.keyboard.press('Shift+h');ok('Shift+H = Rotate View tool',await pg.evaluate(()=>tool==='rv'));
await pg.evaluate(()=>RVIEW.set(-30));const s1=await scr();
ok('the view turns (the rectangle looks rotated: its screen box grows)',s1[2]>s0[2]+20&&s1[3]>s0[3]+20,JSON.stringify([s0,s1]));
ok('the artwork itself is not rotated',await pg.evaluate(()=>{const e=objs[0].g.querySelector('rect');return!!e&&!objs[0].g.getAttribute('transform').includes('rotate')}));
// the pointer still maps to the right place: click on the rectangle's on-screen centre selects it
await pg.keyboard.press('v');await pg.evaluate(()=>{sel=new Set();draw()});await H.click(s1[0]+s1[2]/2,s1[1]+s1[3]/2);await pg.waitForTimeout(100);ok('clicking it in the rotated view selects it',await pg.evaluate(()=>sel.size===1));
// drag moves it by the on-screen distance (in the rotated frame)
const w0=await pg.evaluate(()=>{const b=wbox(objs[0]);return[b.x,b.y]});await H.drag(s1[0]+s1[2]/2,s1[1]+s1[3]/2,s1[0]+s1[2]/2+100,s1[1]+s1[3]/2);await pg.waitForTimeout(100);
const w1=await pg.evaluate(()=>{const b=wbox(objs[0]);return[b.x,b.y]});const dx=w1[0]-w0[0],dy=w1[1]-w0[1];
ok('dragging 100 px to the right on screen moves 100 px along the rotated axis',Math.abs(Math.hypot(dx,dy)-100)<2&&Math.abs(Math.atan2(dy,dx)*180/Math.PI-30)<2,JSON.stringify([dx.toFixed(1),dy.toFixed(1)]));
// a new rectangle is drawn in artwork axes, its diagonal under the drag
await pg.keyboard.press('m');await H.drag(600,300,700,380);await pg.waitForTimeout(100);ok('a rectangle drawn in a rotated view is a real rectangle (live shape)',await pg.evaluate(()=>objs.length===2&&!!objs[1].g.querySelector('rect')));
// zoom at the pointer keeps the point under it
await pg.evaluate(()=>setTool('v'));const before=await pg.evaluate(()=>{const e={clientX:cv.getBoundingClientRect().left+500,clientY:cv.getBoundingClientRect().top+300};return pt(e)});
await pg.mouse.move(H.R.x+500,H.R.y+300);await pg.keyboard.down('Control');await pg.mouse.wheel(0,-300);await pg.keyboard.up('Control');await pg.waitForTimeout(200);
const after=await pg.evaluate(()=>{const e={clientX:cv.getBoundingClientRect().left+500,clientY:cv.getBoundingClientRect().top+300};return pt(e)});ok('zooming at the pointer keeps the same artwork point under it',Math.abs(after.x-before.x)<2&&Math.abs(after.y-before.y)<2,JSON.stringify([before,after]));
ok('the rotation indicator shows 30°',await pg.evaluate(()=>/30/.test(document.getElementById('rvind').textContent)&&document.getElementById('rvind').style.display!=='none'));
// the remove-background bar and the text editor follow the rotated object
await pg.evaluate(()=>{const o=objs[0],b=o.g.getBoundingClientRect();window.__rb=b});
ok('rulers are dimmed while the view is rotated',await pg.evaluate(()=>document.body.classList.contains('vrot')));
const zp=await pg.evaluate(()=>{const p={x:200,y:200},q=w2s(p.x,p.y),r=cv.getBoundingClientRect();return pt({clientX:r.left+q[0],clientY:r.top+q[1]})});ok('w2s and pt are exact inverses',Math.abs(zp.x-200)<1e-6&&Math.abs(zp.y-200)<1e-6,JSON.stringify(zp));
await pg.keyboard.press('Control+Shift+1');await pg.waitForTimeout(100);ok('Shift+Ctrl+1 resets the view',await pg.evaluate(()=>RVIEW.get()===0&&!/rotate/.test(world.getAttribute('transform'))));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

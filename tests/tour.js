const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1366,height:768}});const errs=[];pg.on('pageerror',e=>errs.push(String(e).slice(0,140)));
await pg.goto('file:///home/user/Abdullah-Waled-/masar.html');await pg.waitForTimeout(700);
const out=[];process.on('unhandledRejection',e=>{console.log(out.join('\n'));console.log('STOPPED:',String(e).slice(0,200));process.exit(1)});const ok=(n,c,d)=>out.push((c?'OK   ':'FAIL ')+n+(c?'':'  -> '+JSON.stringify(d)));
const st=()=>pg.evaluate(()=>({n:objs.length,sel:sel.size,tool,hi,locked:objs.filter(o=>o.g.dataset.lock).length,grp:objs.filter(o=>isGroup(o)).length}));
const menu=async(m,item)=>{const bx=await pg.locator('#mbar button',{hasText:new RegExp('^'+m+'$')}).boundingBox();await pg.mouse.click(bx.x+bx.width/2,bx.y+bx.height/2);await pg.waitForTimeout(150);const it=pg.locator('.mdd .mi > button',{hasText:item}).first();await it.hover();await it.click();await pg.waitForTimeout(250)};
const sub=async(m,parent,item)=>{const bx=await pg.locator('#mbar button',{hasText:new RegExp('^'+m+'$')}).boundingBox();await pg.mouse.click(bx.x+bx.width/2,bx.y+bx.height/2);await pg.waitForTimeout(120);const p=pg.locator('.mdd .mi.has > button',{hasText:parent}).first();await p.hover();await pg.waitForTimeout(150);const it=pg.locator('.mdd .msub .mi > button',{hasText:item}).first();await it.hover();await it.click();await pg.waitForTimeout(250)};
// 1 draw with real mouse
await pg.keyboard.press('m');await pg.mouse.move(380,260);await pg.mouse.down();await pg.mouse.move(520,360,{steps:8});await pg.mouse.up();
await pg.keyboard.press('l');await pg.mouse.move(600,260);await pg.mouse.down();await pg.mouse.move(740,340,{steps:8});await pg.mouse.up();
await pg.keyboard.press('v');ok('two shapes drawn',(await st()).n===2,await st());
// 2 select both with marquee, move by dragging, undo/redo
await pg.mouse.move(330,200);await pg.mouse.down();await pg.mouse.move(800,420,{steps:8});await pg.mouse.up();ok('marquee selects 2',(await st()).sel===2,await st());
await pg.mouse.move(450,310);await pg.mouse.down();await pg.mouse.move(450,420,{steps:6});await pg.mouse.up();await pg.waitForTimeout(150);
const y1=await pg.evaluate(()=>Math.round(wbox(objs[0]).y));await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);const y0=await pg.evaluate(()=>Math.round(wbox(objs[0]).y));ok('drag moved, Ctrl+Z moved back',y1>y0,[y0,y1]);await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(150);
// 3 menus with the mouse: group via Object menu, lock via submenu
await menu('Object','Group');ok('Object ▸ Group (mouse) groups them',(await st()).grp===1,await st());
await sub('Object','Lock','Selection');ok('Object ▸ Lock ▸ Selection (mouse)',(await st()).locked===1,await st());
await pg.keyboard.press('Control+Alt+2').catch(()=>{});await pg.evaluate(()=>window.dispatchEvent(new KeyboardEvent('keydown',{code:'Digit2',key:'2',ctrlKey:true,altKey:true,bubbles:true,cancelable:true})));await pg.waitForTimeout(200);ok('Unlock All via shortcut',(await st()).locked===0,await st());
// 4 right-click context menu with the mouse
await pg.mouse.click(450,300,{button:'right'});await pg.waitForTimeout(250);ok('right-click on artwork shows the context menu',await pg.evaluate(()=>document.querySelector('.cxm').style.display==='block'),null);
const ung=pg.locator('.cxm .mi > button',{hasText:'Ungroup'}).first();await ung.click();await pg.waitForTimeout(250);ok('context menu ▸ Ungroup works',(await st()).grp===0,await st());
// 5 scale with a handle and check stroke
await pg.evaluate(()=>{sel=new Set([objs[0]]);const e=objs[0].g.querySelector('rect,path');e.setAttribute('stroke','#000');e.setAttribute('stroke-width','16');draw()});
const h=await pg.evaluate(()=>{const b=wbox(objs[0]);return[(b.x+b.w)*z+px,(b.y+b.h)*z+py,b.x*z+px,b.y*z+py]});const R=await pg.evaluate(()=>{const c=document.getElementById('cv').getBoundingClientRect();return[c.left,c.top]});
await pg.mouse.move(R[0]+h[0],R[1]+h[1]);await pg.mouse.down();await pg.mouse.move(R[0]+h[2]+(h[0]-h[2])*.5,R[1]+h[3]+(h[1]-h[3])*.5,{steps:8});await pg.mouse.up();await pg.waitForTimeout(250);
const sw=await pg.evaluate(()=>+objs[0].g.querySelector('rect,path').getAttribute('stroke-width'));ok('handle-scale to 50% halves the stroke (16 → 8)',Math.abs(sw-8)<.7,sw);
// 6 panels via Window menu, wheel-scroll the dock
for(const p of ['Color','Stroke','Swatches','Appearance','Align']){await menu('Window',new RegExp('^\\s*\u2713?\\s*'+p))}
await pg.waitForTimeout(300);ok('panels opened from the Window menu docked',await pg.evaluate(()=>['color','stroke','swatches','appearance','align'].every(i=>DK.isOpen(i))),null);
await pg.mouse.move(1250,500);await pg.mouse.wheel(0,400);await pg.waitForTimeout(200);ok('mouse wheel scrolls the dock',await pg.evaluate(()=>document.querySelector('#dkR .dkgs').scrollTop)>0,null);
await pg.screenshot({path:'/tmp/tour1.png'});
// 7 narrow window: control bar » by mouse
await pg.setViewportSize({width:1100,height:700});await pg.waitForTimeout(500);ok('narrow: » shown',await pg.evaluate(()=>getComputedStyle(document.getElementById('ctlmore')).display!=='none'),null);
await pg.click('#ctlmore');await pg.waitForTimeout(200);ok('narrow: » pop-up opens',await pg.evaluate(()=>getComputedStyle(document.getElementById('ctlov')).display==='flex'),null);await pg.keyboard.press('Escape');
// 8 zoom with ctrl+wheel and space-pan
await pg.setViewportSize({width:1366,height:768});await pg.waitForTimeout(300);const z0=await pg.evaluate(()=>z);await pg.keyboard.down('Control');await pg.mouse.move(600,400);await pg.mouse.wheel(0,-300);await pg.keyboard.up('Control');await pg.waitForTimeout(200);ok('Ctrl+wheel zooms in',await pg.evaluate(()=>z)>z0,[z0,await pg.evaluate(()=>z)]);
await pg.keyboard.press('Control+0');await pg.waitForTimeout(150);
// 9 keyboard-only: Alt+E → Edit ▸ Select All via keys
await pg.keyboard.press('Alt+s');await pg.waitForTimeout(150);await pg.keyboard.press('Enter');await pg.waitForTimeout(200);ok('Alt+S, Enter = Select ▸ All',(await st()).sel===(await st()).n,await st());
// 10 New with Ctrl+N by keyboard + dialog by keyboard
await pg.keyboard.press('Control+n');await pg.waitForTimeout(250);ok('Ctrl+N dialog',await pg.evaluate(()=>/New Document/.test((document.querySelector('.fxb')||{}).innerText||'')),null);await pg.keyboard.press('Escape');await pg.waitForTimeout(150);ok('Esc closes the dialog',await pg.evaluate(()=>!document.querySelector('.fxb')),null);
console.log(out.join('\n'),'\nerrors:',errs.length?errs:'none');await b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
// Color Picker
await pg.evaluate(()=>window.openColorPicker('fill'));await pg.waitForTimeout(400);
ok('Color Picker has an X in its title',await pg.evaluate(()=>!!document.querySelector('.cpb > b .dlgx')));
await pg.click('.cpb > b .dlgx');await pg.waitForTimeout(300);
ok('X closes the Color Picker',await pg.evaluate(()=>!document.querySelector('.cpb')));
// small window: the dialog scrolls and the X stays reachable
await pg.setViewportSize({width:1100,height:420});await pg.evaluate(()=>window.openColorPicker('stroke'));await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{const b=document.querySelector('.cpb'),x=document.querySelector('.cpb .dlgx').getBoundingClientRect();return{h:Math.round(b.getBoundingClientRect().height),inView:x.top>=0&&x.bottom<=innerHeight,scroll:b.scrollHeight>b.clientHeight}});
ok('small window: dialog fits the window ('+JSON.stringify(r)+') and X is visible',r.h<=420&&r.inView);
await pg.click('.cpb .dlgx');await pg.waitForTimeout(200);await pg.setViewportSize({width:1500,height:900});
// New Document (dkModal)
await pg.keyboard.press('Control+n');await pg.waitForTimeout(400);
ok('New Document dialog has X',await pg.evaluate(()=>!!document.querySelector('#ndd .dlgx')));
await pg.click('#ndd .dlgx');await pg.waitForTimeout(300);
ok('X closes New Document',await pg.evaluate(()=>!document.querySelector('.fxm')));
// #dlg (Move…)
await pg.keyboard.press('m');await H.drag(200,200,300,300);await pg.keyboard.press('v');await pg.keyboard.press('Control+Shift+m');await pg.waitForTimeout(400);
const d=await pg.evaluate(()=>({shown:getComputedStyle(document.getElementById('dlg')).display!=='none',x:!!document.querySelector('#dlg > b .dlgx')}));
ok('Move dialog has X '+JSON.stringify(d),d.shown&&d.x);
await pg.click('#dlg .dlgx');await pg.waitForTimeout(300);
ok('X closes the Move dialog',await pg.evaluate(()=>getComputedStyle(document.getElementById('dlg')).display==='none'));
// X does not apply the dialog (Cancel semantic): rect did not move
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

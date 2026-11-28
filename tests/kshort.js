const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{localStorage.removeItem('masar.keys.menu.v1');localStorage.removeItem('masar.keys.v1')});await pg.reload();await pg.waitForTimeout(700);
const two=async()=>{await H.reset();await pg.evaluate(()=>setTool('m'));await H.drag(200,200,260,260);await pg.evaluate(()=>setTool('m'));await H.drag(300,200,360,260);await pg.evaluate(()=>setTool('v'));await pg.evaluate(()=>{sel=new Set(objs);draw()})};
const grouped=()=>pg.evaluate(()=>objs.length===1&&isGroup(objs[0]));
// defaults = Illustrator
await two();await pg.keyboard.press('Control+g');await pg.waitForTimeout(150);ok('default Ctrl+G groups (Illustrator)',await grouped());
ok('Illustrator defaults are built in',await pg.evaluate(()=>{const d=KSM.defaults();return d['Object>Group']==='Ctrl+G'&&d['Edit>Undo']==='Ctrl+Z'&&d['File>Save']==='Ctrl+S'}));
// open dialog, remap Object > Group to Ctrl+Alt+G
await pg.keyboard.press('Control+Alt+Shift+K');await pg.waitForTimeout(250);ok('Ctrl+Alt+Shift+K opens Keyboard Shortcuts',await pg.evaluate(()=>!!document.querySelector('.ks2')));
await pg.fill('#ksq','group');await pg.waitForTimeout(100);await pg.click('.ks2 .ksr[data-id="Object>Group"]');await pg.keyboard.press('Control+Alt+g');await pg.waitForTimeout(100);
ok('the new key shows on the row (gold = changed)',await pg.evaluate(()=>{const r=document.querySelector('.ks2 .ksr[data-id="Object>Group"]');return r.classList.contains('ch')&&/Alt/.test(r.querySelector('kbd').textContent)}));
await pg.click('.ks2 .fxf button.pri');await pg.waitForTimeout(150);
await two();await pg.keyboard.press('Control+g');await pg.waitForTimeout(150);ok('old Ctrl+G no longer groups',!(await grouped()));
await pg.keyboard.press('Control+Alt+g');await pg.waitForTimeout(150);ok('new Ctrl+Alt+G groups',await grouped());
ok('the Object menu shows the new key',await pg.evaluate(()=>{document.getElementById('mbObject').click();const r=[...document.querySelectorAll('.mdd .mi button')].find(b=>/^Group/.test(b.querySelector('em').textContent));const t=r&&r.querySelector('span').textContent;document.getElementById('mbObject').click();return /Alt/.test(t||'')}));
// conflict: give Ctrl+S (Save) to Select All -> Save loses it
await pg.keyboard.press('Control+Alt+Shift+K');await pg.waitForTimeout(200);await pg.fill('#ksq','select all');await pg.click('.ks2 .ksr[data-id="Select>All"]');await pg.keyboard.press('Control+s');await pg.waitForTimeout(100);
ok('a key used elsewhere is moved, with a warning',await pg.evaluate(()=>/was used by File/.test(document.getElementById('ksm').textContent)));
// tools: Rectangle -> Shift+R
await pg.selectOption('#ksmode','tools');await pg.fill('#ksq','rect');await pg.click('.ks2 .ksr[data-id="m"]');await pg.keyboard.press('Shift+r');await pg.click('.ks2 .fxf button.pri');await pg.waitForTimeout(150);
await pg.keyboard.press('Escape');await pg.keyboard.press('Shift+r');await pg.waitForTimeout(100);ok('tool key changed: Shift+R = Rectangle',await pg.evaluate(()=>tool==='m'));
await pg.reload();await pg.waitForTimeout(800);await two();await pg.keyboard.press('Control+Alt+g');await pg.waitForTimeout(150);ok('custom keys survive a reload',await grouped());
// reset all
await pg.keyboard.press('Control+Alt+Shift+K');await pg.waitForTimeout(200);await pg.click('.ks2 .fxf button:has-text("Reset All")');await pg.click('.ks2 .fxf button.pri');await pg.waitForTimeout(150);
await two();await pg.keyboard.press('Control+g');await pg.waitForTimeout(150);ok('Reset All brings back Ctrl+G',await grouped());
await pg.keyboard.press('Escape');await pg.keyboard.press('m');ok('and M for Rectangle',await pg.evaluate(()=>tool==='m'));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

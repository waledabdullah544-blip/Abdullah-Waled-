const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await pg.keyboard.press('Shift+p');await pg.waitForTimeout(200);ok('Perspective Grid tool shows the grid',await pg.evaluate(()=>PGRID.get().on));
await pg.keyboard.press('v');await pg.waitForTimeout(100);ok('with another tool the grid stays (Illustrator) and the widget with × stays too',await pg.evaluate(()=>PGRID.get().on&&getComputedStyle(document.getElementById('pgwid')).display!=='none'&&!!document.querySelector('#pgwid [data-x]')));
await pg.click('#pgwid [data-x]');await pg.waitForTimeout(100);ok('× hides the grid and its widget',await pg.evaluate(()=>!PGRID.get().on&&getComputedStyle(document.getElementById('pgwid')).display==='none'&&!selg.querySelector('[stroke-dasharray]')));
await pg.keyboard.press('Control+Shift+i');await pg.waitForTimeout(100);await pg.waitForTimeout(1200);await pg.reload();await pg.waitForTimeout(700);ok('after reopening Masar the grid is hidden',await pg.evaluate(()=>!PGRID.get().on));
await pg.keyboard.press('Control+Shift+i');ok('Ctrl+Shift+I shows it',await pg.evaluate(()=>PGRID.get().on));await pg.evaluate(()=>window.docCreate(800,600,'x','px'));await pg.waitForTimeout(200);if(await pg.evaluate(()=>!!document.querySelector('.fxm')))await pg.click('.fxm button:has-text("Don\'t Save")').catch(()=>{});
ok('a new document starts without the grid',await pg.evaluate(()=>!PGRID.get().on));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

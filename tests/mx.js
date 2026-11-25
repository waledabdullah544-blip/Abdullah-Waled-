const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const vis=sel=>pg.evaluate(s=>{const e=document.querySelector(s);return!!e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>0},sel);
// menu bar dropdown
await pg.click('#menubar >> text=File').catch(async()=>{await pg.click('text=File')});await pg.waitForTimeout(300);
ok('File menu open',await vis('.mdd'));
ok('File menu has ✕',await pg.evaluate(()=>!!document.querySelector('.mdd:not(.msub) > .mxh .mx')));
await pg.screenshot({path:'/tmp/mdl/mx_menu.png',clip:{x:0,y:0,width:520,height:420}});
await pg.click('.mdd .mx');await pg.waitForTimeout(250);
ok('✕ closes the File menu',!(await vis('.mdd')));
ok('menu bar not stuck open (no active title)',await pg.evaluate(()=>!document.querySelector('.mb.on,.mbt.on,#menubar .on,#menubar .open')));
// menu still works afterwards (navigation unaffected by the header row)
await pg.click('text=Edit');await pg.waitForTimeout(250);
const items=await pg.evaluate(()=>[...document.querySelectorAll('.mdd:not(.msub) .mi')].length);ok('Edit menu still lists its items ('+items+')',items>5);
await pg.keyboard.press('ArrowDown');await pg.keyboard.press('Escape');await pg.waitForTimeout(200);ok('Esc still closes',!(await vis('.mdd')));
// context menu on canvas
await pg.mouse.click(H.R.x+300,H.R.y+300,{button:'right'});await pg.waitForTimeout(300);
ok('context menu open + ✕',await pg.evaluate(()=>{const c=document.querySelector('.cxm');return!!c&&getComputedStyle(c).display!=='none'&&!!c.querySelector(':scope > .mxh .mx')}));
await pg.click('.cxm .mx');await pg.waitForTimeout(250);ok('✕ closes the context menu',await pg.evaluate(()=>{const c=document.querySelector('.cxm');return!c||getComputedStyle(c).display==='none'}));
// popup menu (Layers panel menu / pmPopup)
await pg.evaluate(()=>window.pmPopup([{t:'One',f:()=>{}},{t:'Two',f:()=>{}}],300,300));await pg.waitForTimeout(250);
ok('pmPopup has ✕',await pg.evaluate(()=>{const m=document.getElementById('pmMn');return getComputedStyle(m).display!=='none'&&!!m.querySelector('.mx')}));
await pg.evaluate(()=>{document.getElementById('pmMn').querySelector('.mx').click()});await pg.waitForTimeout(250);
ok('✕ closes the popup',await pg.evaluate(()=>getComputedStyle(document.getElementById('pmMn')).display==='none'));
// tool flyout
await pg.evaluate(()=>{const g=[...document.querySelectorAll('#tb button, .tbtn')][0]});
const fl=await pg.evaluate(()=>typeof window.openFly);console.log('openFly',fl);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

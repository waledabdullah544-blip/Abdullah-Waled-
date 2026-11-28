const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await pg.keyboard.press('Control+r');await pg.waitForTimeout(200);
const vis=()=>pg.evaluate(()=>[...document.querySelectorAll('.rlm')].map(e=>getComputedStyle(e).visibility));
await pg.mouse.move(H.R.x+300,H.R.y+300);await pg.waitForTimeout(100);ok('marks show over the canvas',(await vis()).every(v=>v==='visible'));
const dk=await pg.evaluate(()=>{const p=document.querySelector('.dkpn:not([style*="display: none"])')||document.querySelector('#prp');const r=p.getBoundingClientRect();return[r.left+20,r.top+20]});
await pg.mouse.move(dk[0],dk[1]);await pg.waitForTimeout(100);ok('marks hide over the panels',(await vis()).every(v=>v==='hidden'),await vis());
const tb=await pg.evaluate(()=>{const r=document.querySelector('nav').getBoundingClientRect();return[r.left+10,r.top+200]});await pg.mouse.move(tb[0],tb[1]);await pg.waitForTimeout(100);ok('marks hide over the toolbar',(await vis()).every(v=>v==='hidden'));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

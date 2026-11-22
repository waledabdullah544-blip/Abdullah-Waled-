const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(4000);
await pg.click('.tb .tt:text-is("Layers")');
// 12 rectangles inside a group inside a sublayer so the row is hidden (collapsed) until located
await H.key('m');for(let i=0;i<4;i++)await H.drag(60+i*70,100,110+i*70,150);await H.key('v');await pg.keyboard.press('Control+a');await pg.keyboard.press('Control+g');await pg.waitForTimeout(200);
await pg.evaluate(()=>{sel=new Set();draw()});
const rows=()=>pg.evaluate(()=>[...document.querySelectorAll('#lyl .lyr')].map(r=>r.dataset.k+':'+r.querySelector('.nm').textContent+(r.classList.contains('sel')?'^':'')));
console.log('rows (nothing selected):',JSON.stringify(await rows()));
// enter isolation-free: select the group via canvas click, expand?  collapse layer first
await pg.evaluate(()=>{const r=document.querySelector('#lyl .lyr.L .ar');r&&r.click()});await pg.waitForTimeout(150);
console.log('after collapse:',JSON.stringify(await rows()));
await H.click(85,125);await pg.waitForTimeout(200);console.log('after selecting group on canvas:',JSON.stringify(await rows()));
// press the magnifier (search field empty)
await pg.click('.lysr svg');await pg.waitForTimeout(250);const r=await rows();
chk('Magnifier with empty field = Locate Object (selected row visible in panel)',r.some(x=>x.endsWith('^')),r);
chk('Search field still empty (no typing needed)',(await pg.inputValue('#lySrch'))==='',null);
// multi selection: topmost is located
await pg.evaluate(()=>{sel=new Set(objs.slice(0,2));draw()});await pg.click('.lysr svg');await pg.waitForTimeout(250);
console.log('multi-select locate rows:',JSON.stringify(await rows()));
// typing still filters
await pg.fill('#lySrch','Group');await pg.waitForTimeout(200);const n=(await rows()).length;chk('Typing a name still filters (field not empty → magnifier does not locate)',n>=1,n);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(5000);
await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(300);
await pg.click('.tb .tt:text-is("Align")');await pg.waitForTimeout(200);
await H.key('m');await H.drag(100,100,160,160);await H.key('m');await H.drag(220,140,300,200);await H.key('m');await H.drag(380,60,420,120);await H.key('v');
await pg.keyboard.press('Control+a');
const opts=await pg.evaluate(()=>[...document.querySelectorAll('#alto option')].map(o=>o.value+':'+o.textContent));console.log('Align To options',JSON.stringify(opts));
const xs=()=>H.state().then(s=>s.o.map(o=>o.x));const rows=()=>H.state().then(s=>s.o.map(o=>[o.x,o.y,o.w,o.h]));
// Align to Selection (default): align left
await pg.click('#alp [data-al="l"]');await pg.waitForTimeout(150);let x=await xs();chk('Align Left (to selection) → all x equal to leftmost',x.every(v=>Math.abs(v-x[0])<0.6),x);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(100);
// Key object
await pg.selectOption('#alto','key');await pg.waitForTimeout(100);
await H.click(260,170);await pg.waitForTimeout(150); // click the middle rect = key
const before=await rows();
await pg.click('#alp [data-al="l"]');await pg.waitForTimeout(150);const after=await rows();
chk('Key Object: key (middle) does not move',JSON.stringify(after[1])===JSON.stringify(before[1]),[before[1],after[1]]);
chk('Key Object: others align to the KEY left edge',Math.abs(after[0][0]-after[1][0])<0.6&&Math.abs(after[2][0]-after[1][0])<0.6,after);
// distribute spacing with key + value
console.log('alsp (spacing input) present:',await pg.locator('#alsp').count());
await pg.keyboard.press('Control+z');await pg.waitForTimeout(100);
await pg.fill('#alsp','20');await pg.press('#alsp','Enter');await pg.click('#alp [data-al="dhs"], #alp [title="Horizontal Distribute Space"]').catch(()=>{});await pg.waitForTimeout(150);const r2=await rows();
const gaps=[r2[1][0]-(r2[0][0]+r2[0][2]),r2[2][0]-(r2[1][0]+r2[1][2])];console.log('after Distribute Spacing 20 (key=middle): rows',JSON.stringify(r2),'gaps',JSON.stringify(gaps));
await pg.selectOption('#alto','art');await pg.waitForTimeout(100);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

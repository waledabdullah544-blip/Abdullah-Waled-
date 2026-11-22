const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(5000);
await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(300);
console.log('ALP ids',await pg.evaluate(()=>[...document.querySelectorAll('#alp [id], #alp select, #alp [data-al], #alp [data-to]')].map(e=>(e.id||e.dataset.al||e.dataset.to||e.tagName)).join(' ')));
await H.key('m');await H.drag(100,100,160,160);await H.key('m');await H.drag(220,140,300,200);await H.key('m');await H.drag(380,60,420,120);await H.key('v');
await pg.keyboard.press('Control+a');
console.log('align-to controls:',await pg.evaluate(()=>[...document.querySelectorAll('#alp button, #alp select')].map(e=>(e.title||e.id||e.textContent).trim()).slice(0,30).join(' | ')));
await H.b.close()})();

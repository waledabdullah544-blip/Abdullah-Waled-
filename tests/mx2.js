const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
for(const id of ['fly','fly2','fly3','fly4']){
  await pg.evaluate(i=>{const f=document.getElementById(i);if(i==='fly')openFly();else{f.style.display='block';f.style.left='140px';f.style.top='200px'}},id);await pg.waitForTimeout(200);
  const has=await pg.evaluate(i=>!!document.querySelector('#'+i+' > .mxh .mx'),id);ok('#'+id+' has ✕',has);
  if(id==='fly')await pg.screenshot({path:'/tmp/mdl/mx_fly.png',clip:{x:0,y:60,width:420,height:420}});
  await pg.click('#'+id+' .mx');await pg.waitForTimeout(200);
  ok('✕ closes #'+id,await pg.evaluate(i=>getComputedStyle(document.getElementById(i)).display==='none',id));
}
// control-bar overflow + dock flyout + Layers panel menu
await pg.keyboard.press('m');await H.drag(200,200,300,300);await pg.keyboard.press('v');await pg.waitForTimeout(200);
await pg.evaluate(()=>{const b=document.querySelector('#lyp .lymn, #lyp [title="Panel Menu"], .dkt .mn');if(b)b.click()});await pg.waitForTimeout(300);
const pm=await pg.evaluate(()=>{const m=document.getElementById('pmMn');return getComputedStyle(m).display!=='none'&&!!m.querySelector('.mx')});console.log('panel menu has ✕',pm);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

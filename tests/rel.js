const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('m');await H.drag(100,100,160,160);await H.drag(200,100,260,160);await H.drag(300,100,360,160);await H.key('v');
const cnt=()=>pg.evaluate(()=>({objs:objs.length,layers:LAYERS.map(l=>l.name+(l.par?'<'+l.par:'')),per:LAYERS.map(l=>objs.filter(o=>o.ly===l.id).length)}));
const mn=async t=>{await pg.evaluate(()=>document.getElementById('lyMenu').click());await pg.waitForTimeout(80);return pg.evaluate(t=>{const b=[...document.querySelectorAll('#lyMn button')].find(x=>x.textContent.includes(t));if(b&&!b.disabled){b.click();return true}return false},t)};
await pg.click('.tb .tt:text-is("Layers")');
console.log('before',JSON.stringify(await cnt()));console.log('Sequence clicked:',await mn('Release to Layers (Sequence)'));await pg.waitForTimeout(150);console.log('Sequence',JSON.stringify(await cnt()));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(100);console.log('undo',JSON.stringify(await cnt()));
console.log('Build clicked:',await mn('Release to Layers (Build)'));await pg.waitForTimeout(150);console.log('Build',JSON.stringify(await cnt()),'errors',H.errs);await H.b.close()})();

const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('B');await pg.keyboard.press('Shift+b');await pg.waitForTimeout(80);console.log('tool',await pg.evaluate('tool'));
await pg.mouse.move(H.R.x+100,H.R.y+200);await pg.mouse.down();for(let i=1;i<=10;i++)await pg.mouse.move(H.R.x+100+i*20,H.R.y+200+Math.sin(i)*20);
const ring=await pg.evaluate(()=>!!document.querySelector('#peng [data-bbring]'));const prev=await pg.evaluate(()=>document.querySelectorAll('#peng path').length);
console.log('ring while painting:',ring,'| preview paths:',prev);await pg.mouse.up();await pg.waitForTimeout(100);console.log('objects after:',(await H.state()).n,'errors',H.errs);await H.b.close()})();

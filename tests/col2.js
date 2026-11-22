const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(400);
console.log('CLP ids:',await pg.evaluate(()=>[...document.querySelectorAll('#clp [id]')].map(e=>e.id).join(' ')));
console.log('SWP ids:',await pg.evaluate(()=>[...document.querySelectorAll('#swp [id]')].map(e=>e.id).slice(0,40).join(' ')));
console.log('STROKE ids:',await pg.evaluate(()=>[...document.querySelectorAll('#stp [id],#strokep [id]')].map(e=>e.id).slice(0,40).join(' ')));
// color panel menu
await pg.evaluate(()=>{const b=document.querySelector('#clp .pmenu,#clp [class*=menu],#clp button[aria-label*=enu]');return b&&b.id});
const mbtn=await pg.evaluate(()=>[...document.querySelectorAll('.dkt, .tbs')].length);
await H.b.close()})();

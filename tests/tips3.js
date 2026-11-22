const {open}=require('./lib');
(async()=>{const H=await open();
const info=await H.pg.evaluate(()=>['fly','fly2','fly3','fly4','fly5'].map(id=>[id,[...document.querySelectorAll('#'+id+' [data-t]')].map(b=>b.dataset.t).join(',')]));console.log(JSON.stringify(info));
console.log(await H.pg.evaluate(()=>[...document.querySelectorAll('nav [data-t]')].map(b=>b.dataset.t+(b.dataset.g?':'+b.dataset.g:'')).join(' ')));
await H.b.close()})();

const {open}=require('./lib');
(async()=>{const H=await open();
const r=await H.pg.evaluate(()=>{const o={};document.querySelectorAll('[data-t]').forEach(b=>{const t=b.dataset.t;if(!b.closest('nav,[role=menu]'))return;(o[t]=o[t]||[]).push((b.__rt?'bound':'UNBOUND')+'@'+(b.closest('[role=menu]')?b.closest('[role=menu]').id:'nav'))});return o});
const un=Object.entries(r).filter(([t,a])=>a.some(x=>x.startsWith('UNBOUND')));console.log('unbound tooltip buttons:',JSON.stringify(un));
console.log('all tool buttons:',Object.keys(r).join(' '));await H.b.close()})();

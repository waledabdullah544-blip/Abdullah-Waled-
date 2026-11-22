const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;
await H.key('l');await H.drag(300,200,420,300);await H.key('v');
console.log('V selg:',await pg.evaluate(()=>[...document.getElementById('selg').children].map(e=>e.tagName+(e.hasAttribute('data-h')?'[h='+e.dataset.h+']':'')+(e.getAttribute('stroke')?'#'+e.getAttribute('stroke'):'')+':'+(e.getAttribute('d')||'').slice(0,12)).join(' | ')));
await H.key('a');await H.click(310,250);
console.log('A selg:',await pg.evaluate(()=>[...document.getElementById('selg').children].map(e=>e.tagName+(e.getAttribute('data-h')?'[h]':'')+(e.getAttribute('data-a')?'[a]':'')).join(' | ')));
console.log('ids',await pg.evaluate(()=>['selg','peng','hov','gridg','world','layer'].map(i=>i+':'+!!document.getElementById(i)).join(' ')));
console.log('artboard element:',await pg.evaluate(()=>[...document.querySelectorAll('#world > *')].map(e=>e.tagName+'#'+e.id).join(' ')));
await H.b.close()})();

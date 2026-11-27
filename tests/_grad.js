const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.keyboard.press('m');await H.drag(250,150,520,330);await pg.keyboard.press('v');await pg.waitForTimeout(150);
await pg.evaluate(()=>DK.open('gradient'));await pg.waitForTimeout(500);
console.log('panels',await pg.evaluate(()=>Object.keys(DK.P).join(',')));
console.log('gradient panel controls',await pg.evaluate(()=>{const p=DK.P.gradient;const e=p&&(p.el||document.getElementById('gdp')||document.querySelector('[id*=grad i]'));return e?e.id+': '+[...e.querySelectorAll('input,select,button')].map(x=>(x.id||x.dataset.k||x.title||x.textContent.trim().slice(0,12))+':'+x.type).join(' | '):'none'}));
// gradient tool drag
await pg.keyboard.press('g');await H.drag(260,160,500,320);await pg.waitForTimeout(300);
console.log('after Gradient tool drag',await pg.evaluate(()=>{const o=objs[0],e=o.g.querySelector('rect,path');const f=e.getAttribute('fill');const g=f&&f.startsWith('url')?document.querySelector(f.slice(4,-1)):null;return{fill:f,gradHTML:g?g.outerHTML.slice(0,400):null}}));
await pg.screenshot({path:'/tmp/mdl/grad1.png'});
await H.b.close()})();

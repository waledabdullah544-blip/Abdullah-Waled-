const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('t');await H.click(200,200);await pg.keyboard.type('Hello World');await H.key('Escape');
await pg.keyboard.press('Control+t');await pg.waitForTimeout(400);
console.log('CHP ids:',await pg.evaluate(()=>[...document.querySelectorAll('#chp [id]')].map(e=>e.id).join(' ')));
console.log('PAP ids:',await pg.evaluate(()=>{window.paToggle&&0;return [...document.querySelectorAll('#pap [id]')].map(e=>e.id).join(' ')}));
console.log('text obj:',await pg.evaluate(()=>{const o=[...sel][0]||objs[0];const t=o.g.querySelector('text');return t?t.outerHTML.slice(0,300):'no text'}));
await H.b.close()})();

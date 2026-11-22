const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('m');await H.drag(300,200,420,280);await H.key('v');
const ids=await pg.evaluate(()=>[...document.querySelectorAll('header input, header select')].map(i=>i.id+':'+i.type+':'+i.value));console.log(JSON.stringify(ids));
const o=()=>pg.evaluate(()=>objs[0].g.querySelector('rect,path').getAttribute('opacity'));
await pg.click('#prop');await pg.keyboard.press('ArrowDown');await pg.waitForTimeout(100);console.log('Properties opacity after Down:',await pg.inputValue('#prop'),'obj',await o());
await pg.keyboard.press('Shift+ArrowDown');await pg.waitForTimeout(100);console.log('after Shift+Down:',await pg.inputValue('#prop'),'obj',await o());
await H.b.close()})();

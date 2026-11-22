const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(4000);
await H.key('m');await H.drag(300,200,420,280);await H.key('v');
console.log('opacity inputs:',await pg.evaluate(()=>[...document.querySelectorAll('input')].filter(i=>/op/i.test(i.id)).map(i=>i.id+':'+i.type+':'+i.value+':step='+i.step)));
const id=await pg.evaluate(()=>{const i=[...document.querySelectorAll('header input')].find(i=>/op/i.test(i.id));return i&&i.id});console.log('control bar opacity id',id);
if(id){await pg.click('#'+id);await pg.keyboard.press('ArrowDown');await pg.waitForTimeout(100);console.log('after Down:',await pg.inputValue('#'+id),'obj opacity',await pg.evaluate(()=>objs[0].g.querySelector('rect,path').getAttribute('opacity')));
 await pg.keyboard.press('Shift+ArrowDown');await pg.waitForTimeout(100);console.log('after Shift+Down:',await pg.inputValue('#'+id),'obj opacity',await pg.evaluate(()=>objs[0].g.querySelector('rect,path').getAttribute('opacity')))}
await H.b.close()})();

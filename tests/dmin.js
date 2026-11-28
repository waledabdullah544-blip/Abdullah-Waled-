const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.waitForTimeout(100);
await pg.evaluate(()=>setDrawMode('i'));await pg.waitForTimeout(100);
ok('Draw Inside shows corner marks around the target',await pg.evaluate(()=>[...document.querySelectorAll('#selg path')].some(p=>p.getAttribute('stroke-dasharray'))));
await H.drag(250,180,350,260);await pg.waitForTimeout(200);
ok('a shape drawn inside goes into a clip group',await pg.evaluate(()=>objs.length===1&&!!objs[0].g.querySelector('[data-clipmask]')));
// deselect -> Draw Normal again
await pg.keyboard.press('v');await H.click(700,500);await pg.waitForTimeout(200);
ok('deselecting turns Draw Inside off',await pg.evaluate(()=>drawMode()==='n'));
await pg.keyboard.press('m');await H.drag(500,150,650,300);await pg.waitForTimeout(200);
ok('the next rectangle is a normal separate object',await pg.evaluate(()=>objs.length===2&&!objs[1].g.querySelector('[data-mem]')));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

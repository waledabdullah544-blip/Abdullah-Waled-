const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(300,200,400,280);await pg.keyboard.press('v');
await pg.evaluate(()=>DK.open('props'));await pg.waitForTimeout(250);
ok('Align buttons enabled for one object',await pg.evaluate(()=>[...document.querySelectorAll('#pral [data-al]')].every(b=>!b.disabled)));
await pg.click('#pral [data-al=l]');await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{const b=wbox(objs[0]),a=ARTS[ABI]||{x:0,y:0};return[Math.round(b.x),Math.round(a.x)]});
ok('Align Left with one object puts it on the artboard edge',r[0]===r[1],JSON.stringify(r));
await pg.click('#pral [data-al=b]');await pg.waitForTimeout(200);
const r2=await pg.evaluate(()=>{const b=wbox(objs[0]),a=ARTS[ABI]||{y:0,h:ABH};return[Math.round(b.y+b.h),Math.round(a.y+a.h)]});
ok('Align Bottom too',r2[0]===r2[1],JSON.stringify(r2));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);
ok('Undo works',await pg.evaluate(()=>Math.round(wbox(objs[0]).y+wbox(objs[0]).h))!==r2[1]);
// align panel too
await pg.evaluate(()=>DK.open('align'));await pg.waitForTimeout(200);
ok('Align panel buttons enabled for one object',await pg.evaluate(()=>{const b=document.querySelector('#alp [data-al="r"]');return b&&!b.disabled}));
// two objects keep aligning to each other
await pg.keyboard.press('m');await H.drag(500,300,560,360);await pg.keyboard.press('v');await pg.keyboard.press('Control+a');await pg.waitForTimeout(100);
await pg.evaluate(()=>DK.open('props'));await pg.waitForTimeout(150);
await pg.click('#pral [data-al=t]');await pg.waitForTimeout(200);
const t=await pg.evaluate(()=>objs.map(o=>Math.round(wbox(o).y)).concat([Math.round((ARTS[ABI]||{y:0}).y)]));ok('two objects align to each other (not to the artboard)',t[0]===t[1]&&t[0]!==t[2],JSON.stringify(t));
ok('both still exist and visible',await pg.evaluate(()=>objs.length===2&&objs.every(o=>o.g.isConnected&&o.g.style.display!=='none')));
// labels open panels
await pg.click('#prp .prlk[data-pn=stroke]');await pg.waitForTimeout(250);
ok('clicking "Stroke" opens the Stroke panel',await pg.evaluate(()=>{const p=DK.P&&DK.P.stroke;const e=document.querySelector('#stp,#strokep,[id^=stk]');return !!(p&&p.el?p.el.offsetParent:e&&e.offsetParent)||[...document.querySelectorAll('.dkt')].some(t=>/Stroke/.test(t.textContent)&&t.offsetParent)}));
await pg.click('#prp .prlk[data-pn=transparency]');await pg.waitForTimeout(250);
ok('clicking "Opacity" opens Transparency',await pg.evaluate(()=>[...document.querySelectorAll('.dkt, .dktab, [class*=dk] b')].some(t=>/Transparency/.test(t.textContent)&&t.offsetParent)));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
const lay=()=>pg.evaluate(()=>{const n=document.querySelector('nav').getBoundingClientRect(),g=DK.groupOf('layers'),l=document.getElementById('lyp').getBoundingClientRect();return{nav:[Math.round(n.left),Math.round(n.top)],navFloat:document.querySelector('nav').classList.contains('float'),ly:g?g.m:null,lyPos:[Math.round(l.left),Math.round(l.top)],lyOpen:DK.isOpen('layers')}});
// customise: toolbar floats, Layers floats
const gb=await (await pg.$('#tbgrip')).boundingBox();await pg.mouse.move(gb.x+30,gb.y+8);await pg.mouse.down();await pg.mouse.move(gb.x+330,gb.y+108,{steps:8});await pg.mouse.up();
await pg.evaluate(()=>DK.open('layers'));await pg.waitForTimeout(300);const tb=await (await pg.$('.dkt .tb[data-p=layers]')).boundingBox();await pg.mouse.move(tb.x+20,tb.y+8);await pg.mouse.down();await pg.mouse.move(tb.x-500,tb.y+200,{steps:10});await pg.mouse.up();await pg.waitForTimeout(200);
const A=await lay();ok('customised: toolbar and Layers float',A.navFloat&&A.ly==='float',JSON.stringify(A));
// save as workspace
await pg.evaluate(()=>wsNew());await pg.waitForTimeout(200);await pg.fill('#wsn','Mine');await pg.keyboard.press('Enter');await pg.waitForTimeout(200);
// reset
await pg.evaluate(()=>{const w=window.wsApply;window.wsApply&&wsApply('Essentials')});await pg.waitForTimeout(300);
const B=await lay();ok('Essentials puts things back',!B.navFloat&&B.ly!=='float',JSON.stringify(B));
await pg.evaluate(()=>wsApply('Mine'));await pg.waitForTimeout(300);const C=await lay();
ok('switching back to "Mine" restores the toolbar and the floating Layers panel',C.navFloat&&C.ly==='float'&&Math.abs(C.nav[0]-A.nav[0])<=2&&Math.abs(C.lyPos[0]-A.lyPos[0])<=4,JSON.stringify(C));
await pg.reload();await pg.waitForTimeout(800);const D=await lay();ok('after reload the layout is kept',D.navFloat&&D.ly==='float',JSON.stringify(D));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view();DK.open('swatches')});await pg.waitForTimeout(300);
const P='#swatchesP';
const dlg=()=>pg.evaluate(()=>{const d=[...document.querySelectorAll('.fxb')].pop();return d?d.innerText.replace(/\s+/g,' ').slice(0,160):''});
const closeDlg=async()=>{await pg.keyboard.press('Escape');await pg.waitForTimeout(150)};
const sw=()=>pg.$$(P+' button[title^="CMYK"], '+P+' button[title^="C="]');
// 1 double-click a swatch -> Swatch Options
let s=await sw();await s[2].dblclick();await pg.waitForTimeout(250);let t=await dlg();ok('double-click a swatch opens Swatch Options',/Swatch Options/i.test(t)&&/Global/i.test(t),t);await closeDlg();
// 2 New Swatch
const cnt=()=>pg.evaluate(p=>document.querySelectorAll(p+' button.sc[data-id]').length,P);const n0=await cnt();await pg.click(P+' button[title="New Swatch"]');await pg.waitForTimeout(250);t=await dlg();ok('New Swatch asks for name / colour type',/New Swatch/i.test(t)&&/Name/i.test(t),t);
await pg.evaluate(()=>{const d=[...document.querySelectorAll('.fxb')].pop();d.querySelector('[data-k="n"]').value='MyGlobal';const g=d.querySelector('[data-k="gl"]');if(!g.checked)g.click()});await pg.keyboard.press('Enter');await pg.waitForTimeout(250);const n1=await cnt();ok('Enter adds the swatch',n1===n0+1,n0+'->'+n1);
// 3 New Color Group
await pg.click(P+' button[title="New Color Group"]');await pg.waitForTimeout(250);t=await dlg();ok('New Color Group asks for a name',/Color Group/i.test(t),t);await pg.keyboard.press('Enter');await pg.waitForTimeout(250);
ok('a colour group folder appears',await pg.evaluate(p=>!!document.querySelector(p+' [data-g]'),P));
// 4 libraries menu
await pg.click(P+' button[title="Swatch Libraries Menu"]');await pg.waitForTimeout(250);const lib=await pg.evaluate(()=>[...document.querySelectorAll('#pmMn button,.mdd button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim()).slice(0,8));ok('Swatch Libraries menu lists libraries',lib.length>3,JSON.stringify(lib));await pg.keyboard.press('Escape');
// 5 list view via panel menu
let views=await pg.evaluate(()=>DK.P.swatches.menu().map(m=>m.t||''));
ok('panel menu has Small Thumbnail / List views',views.some(v=>/List View/i.test(v))&&views.some(v=>/Thumbnail/i.test(v)),JSON.stringify(views.slice(0,12)));
// 6 global swatch updates objects
await pg.keyboard.press('m');await H.drag(300,200,380,260);await pg.keyboard.press('m');await H.drag(400,200,480,260);await pg.keyboard.press('v');
await pg.keyboard.press('Control+a');await pg.click(P+' button.sc[title^="MyGlobal"]');await pg.waitForTimeout(200);
await pg.dblclick(P+' button.sc[title^="MyGlobal"]');await pg.waitForTimeout(250);await pg.evaluate(()=>{const d=[...document.querySelectorAll('.fxb')].pop();const h=d.querySelector('input[maxlength="6"],[data-k="hex"],input[type=text]:not([data-k="n"])');h.value='12ab34';h.dispatchEvent(new Event('input',{bubbles:true}));h.dispatchEvent(new Event('change',{bubbles:true}))});await pg.keyboard.press('Enter');await pg.waitForTimeout(250);
const fills=await pg.evaluate(()=>objs.map(o=>fillables(o)[0].getAttribute('fill')));ok('editing a global swatch recolours every object that uses it',fills.length===2&&fills.every(f=>/12ab34/i.test(f)),JSON.stringify(fills));
// 7 drag to reorder
const ord=()=>pg.evaluate(p=>[...document.querySelectorAll(p+' button.sc[data-id]')].map(b=>b.title),P);const o0=await ord(),i0=o0.findIndex(x=>/MyGlobal/.test(x));
const A=await pg.$(P+' button.sc[title^="MyGlobal"]'),B=(await pg.$$(P+' button.sc[data-id]'))[4];const a=await A.boundingBox(),b=await B.boundingBox();
await pg.mouse.move(a.x+a.width/2,a.y+a.height/2);await pg.mouse.down();await pg.mouse.move(b.x+2,b.y+b.height/2,{steps:8});await pg.mouse.up();await pg.waitForTimeout(250);const i1=(await ord()).findIndex(x=>/MyGlobal/.test(x));
ok('dragging a swatch reorders it',i1<i0,i0+'->'+i1);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

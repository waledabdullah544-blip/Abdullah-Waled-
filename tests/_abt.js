const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
const A=()=>pg.evaluate(()=>({n:ARTS.length,abi:ABI,a:ARTS.map(a=>[Math.round(a.x),Math.round(a.y),Math.round(a.w),Math.round(a.h)])}));
const scr=(dx,dy)=>pg.evaluate(([x,y])=>[x*z+px,y*z+py],[dx,dy]);
await pg.evaluate(()=>{z=.4;px=300;py=200;view()});await pg.waitForTimeout(150);
await pg.keyboard.press('Shift+o');await pg.waitForTimeout(150);
ok('Shift+O selects the Artboard tool',await pg.evaluate(()=>tool==='abt'));
let s=await A();console.log('start',JSON.stringify(s));
// 1) create a new artboard by dragging in empty space (right of artboard 1, which is 800 wide)
const p1=await scr(900,0),p2=await scr(1300,300);
await H.drag(p1[0],p1[1],p2[0],p2[1]);await pg.waitForTimeout(250);s=await A();ok('drag in empty space creates a new artboard',s.n===2,JSON.stringify(s));
// 2) control bar fields for the active artboard
const cb=await pg.evaluate(()=>[...document.querySelectorAll('#ctl input,#ctl select,#ctl button,#ctl label')].filter(e=>e.offsetParent).map(e=>(e.id||e.textContent.trim().slice(0,14)||e.type)).join(' | '));console.log('control bar:',cb);
// 3) resize with the bottom-right handle
const br=await scr(1300,300);const before=(await A()).a[1];
await pg.mouse.move(H.R.x+br[0],H.R.y+br[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+br[0]+40,H.R.y+br[1]+40,{steps:5});await pg.mouse.up();await pg.waitForTimeout(250);
const after=(await A()).a[1];ok('bottom-right handle resizes the artboard',after[2]>before[2]&&after[3]>before[3]&&after[0]===before[0],JSON.stringify(before)+'->'+JSON.stringify(after));
// 4) move by dragging inside
const c=await scr(1100,150);await pg.mouse.move(H.R.x+c[0],H.R.y+c[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+c[0]+30,H.R.y+c[1]+20,{steps:5});await pg.mouse.up();await pg.waitForTimeout(250);
const moved=(await A()).a[1];ok('dragging inside moves the artboard',moved[0]>after[0]&&moved[1]>after[1],JSON.stringify(after)+'->'+JSON.stringify(moved));
// 5) Alt+drag duplicates
const c2=await scr(moved[0]+100,moved[1]+100);await pg.keyboard.down('Alt');await pg.mouse.move(H.R.x+c2[0],H.R.y+c2[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+c2[0],H.R.y+c2[1]+160,{steps:5});await pg.mouse.up();await pg.keyboard.up('Alt');await pg.waitForTimeout(250);
s=await A();ok('Alt+drag duplicates the artboard',s.n===3,JSON.stringify(s));
// 6) undo / redo
await pg.keyboard.press('Control+z');await pg.waitForTimeout(250);s=await A();ok('Undo removes the duplicate',s.n===2,JSON.stringify(s));
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(250);s=await A();ok('Redo brings it back',s.n===3);
// 7) artwork moves with the artboard when the option is on
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);
await pg.evaluate(()=>{const o=add('<rect x="1000" y="50" width="60" height="40" fill="#f00"/>');o.__t=1;commit();draw()});
const r0=await pg.evaluate(()=>{const o=objs[objs.length-1],b=wbox(o);return[Math.round(b.x),Math.round(b.y)]});
const ai=await pg.evaluate(()=>ARTS.findIndex(a=>a.x>800));const aa=(await A()).a[ai];const c3=await scr(aa[0]+aa[2]/2,aa[1]+aa[3]/2);
await pg.mouse.move(H.R.x+c3[0],H.R.y+c3[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+c3[0]+30,H.R.y+c3[1],{steps:5});await pg.mouse.up();await pg.waitForTimeout(250);
const r1=await pg.evaluate(()=>{const o=objs[objs.length-1],b=wbox(o);return[Math.round(b.x),Math.round(b.y)]});console.log('artwork pos before/after artboard move',JSON.stringify(r0),JSON.stringify(r1));
// 8) Delete key deletes the active artboard
const n0=(await A()).n;await pg.keyboard.press('Delete');await pg.waitForTimeout(250);const n1=(await A()).n;ok('Delete removes the selected artboard',n1===n0-1,n0+'->'+n1);
// 9) Esc / switching tool leaves the artboard intact; Artboards panel lists
await pg.keyboard.press('v');await pg.waitForTimeout(100);ok('V leaves the Artboard tool',await pg.evaluate(()=>tool==='v'));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

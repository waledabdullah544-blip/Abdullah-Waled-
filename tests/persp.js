const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{localStorage.removeItem('masar.pgrid.v1')});await pg.reload();await pg.waitForTimeout(700);await pg.evaluate(()=>{z=.6;px=300;py=120;view()});
await pg.keyboard.press('Shift+p');await pg.waitForTimeout(150);ok('Shift+P = Perspective Grid tool, the grid shows',await pg.evaluate(()=>tool==='pg'&&!!selg.querySelector('[data-pgrid]')&&PGRID.get().on));
// maths: plane round trip and convergence
ok('plane <-> artboard mapping round-trips',await pg.evaluate(()=>['L','R','F'].every(pl=>{const w=PGRID.toW(pl,3.3,2.2),p=PGRID.toP(pl,w[0],w[1]);return Math.abs(p[0]-3.3)<1e-6&&Math.abs(p[1]-2.2)<1e-6})));
ok('far grid lines on the left wall converge to the left vanishing point',await pg.evaluate(()=>{const G=PGRID.get(),a=PGRID.toW('L',1e6,0),b=PGRID.toW('L',1e6,5);return Math.abs(a[0]-G.vl)<1&&Math.abs(a[1]-G.hY)<1&&Math.abs(b[1]-G.hY)<1}));
// draw a rectangle on the left plane: it becomes a perspective quad (top and bottom edges not parallel)
await pg.keyboard.press('1');ok('1 = left plane',await pg.evaluate(()=>PGRID.get().act==='L'));
const sc=await pg.evaluate(()=>{const a=PGRID.toW('L',1,1),b=PGRID.toW('L',3,4);return[a[0]*z+px,a[1]*z+py,b[0]*z+px,b[1]*z+py]});
await pg.keyboard.press('m');await H.drag(sc[0],sc[3],sc[2],sc[1]);await pg.waitForTimeout(200);
const q=await pg.evaluate(()=>{const e=objs[0].g.querySelector('path[data-psp]');if(!e)return null;const n=e.getAttribute('d').match(/-?\d*\.?\d+/g).map(Number);const P=[];for(let i=0;i+1<n.length&&P.length<4;i+=2)P.push([n[i],n[i+1]]);return P});
const slope=(a,b)=>(b[1]-a[1])/(b[0]-a[0]);ok('a rectangle drawn on the left plane follows the perspective',q&&Math.abs(slope(q[0],q[1])-slope(q[3],q[2]))>.01,JSON.stringify(q));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(150);
ok('Undo / Redo keep the perspective object',await pg.evaluate(()=>objs.length===1&&!!objs[0].g.querySelector('path[data-psp]')));
// perspective selection: moving deeper makes it smaller
await pg.keyboard.press('Shift+v');const w0=await pg.evaluate(()=>wbox(objs[0]).h);const c=await pg.evaluate(()=>{const b=wbox(objs[0]);return[(b.x+b.w/2)*z+px,(b.y+b.h/2)*z+py]});
const t=await pg.evaluate(()=>{const G=PGRID.get();return[G.vl*z+px,G.hY*z+py]});await H.drag(c[0],c[1],c[0]+(t[0]-c[0])*.4,c[1]+(t[1]-c[1])*.4);await pg.waitForTimeout(200);
const w1=await pg.evaluate(()=>wbox(objs[0]).h);ok('Perspective Selection: moving it towards the vanishing point makes it smaller',w1<w0*.85,w0.toFixed(1)+'->'+w1.toFixed(1));
// dragging the vanishing point re-projects attached objects
const before=await pg.evaluate(()=>objs[0].g.querySelector('path').getAttribute('d'));await pg.evaluate(()=>{PGRID.set({vl:PGRID.get().vl-200});objs.forEach(o=>PGRID.reproj(o))});
ok('moving the vanishing point redraws the objects on it',await pg.evaluate(b=>objs[0].g.querySelector('path').getAttribute('d')!==b,before));
// a flat object dragged with Perspective Selection attaches to the active plane
await pg.keyboard.press('3');await pg.evaluate(()=>{const o=add('<rect x="0" y="0" width="60" height="40" fill="#f0c374"/>');o.m.tx=(900-px)/z;o.m.ty=(500-py)/z;apply(o);commit();draw()});
const f=await pg.evaluate(()=>{const b=wbox(objs[1]);return[(b.x+b.w/2)*z+px,(b.y+b.h/2)*z+py]});await H.drag(f[0],f[1],f[0]-20,f[1]-10);await pg.waitForTimeout(200);
ok('a flat object dropped on the right plane is attached to it',await pg.evaluate(()=>{const e=objs[1].g.querySelector('path[data-psp]');return!!e&&JSON.parse(e.getAttribute('data-psp')).pl==='R'}));
await pg.keyboard.press('Control+Shift+i');ok('Ctrl+Shift+I hides the grid',await pg.evaluate(()=>!PGRID.get().on&&!selg.querySelector('[data-pgrid]')));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

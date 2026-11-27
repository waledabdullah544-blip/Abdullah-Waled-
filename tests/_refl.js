const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const corners=()=>pg.evaluate(()=>{const o=[...sel][0]||objs[objs.length-1],e=o.g.querySelector('rect,path'),W=world.getCTM().inverse(),M=W.multiply(e.getCTM()),Z=z;let P;
 if(e.tagName==='rect'){const x=+e.getAttribute('x'),y=+e.getAttribute('y'),w=+e.getAttribute('width'),h=+e.getAttribute('height');P=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]}else{const nums=(e.getAttribute('d').replace(/[A-Za-z]/g,' ').match(/-?\d*\.?\d+/g)||[]).map(Number);P=[];for(let i=0;i+1<nums.length&&P.length<4;i+=2)P.push([nums[i],nums[i+1]])}
 return P.map(([x,y])=>{const q=new DOMPoint(x,y).matrixTransform(M);return[+(q.x*Z+px).toFixed(1),+(q.y*Z+py).toFixed(1)]})});
const refl=(p,o,a)=>{const dx=p[0]-o[0],dy=p[1]-o[1],c=Math.cos(2*a),s=Math.sin(2*a);return[+(o[0]+dx*c+dy*s).toFixed(1),+(o[1]+dx*s-dy*c).toFixed(1)]};
const fresh=async()=>{await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();ORG=null;commit();draw()});await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');await pg.waitForTimeout(100)};
const same=(A,B)=>B.every(b=>A.some(a=>Math.hypot(a[0]-b[0],a[1]-b[1])<1.5));
// A) Reflect tool: drag from the centre outward at 90° (vertical axis through centre) = horizontal flip
await fresh();let c0=await corners();const cen=[360,250];
await pg.evaluate(()=>setTool('rf'));await pg.mouse.move(H.R.x+cen[0],H.R.y+cen[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+cen[0],H.R.y+cen[1]-40,{steps:5});await pg.mouse.up();await pg.waitForTimeout(250);
let c1=await corners();console.log('A drag axis vertical: before',JSON.stringify(c0),'after',JSON.stringify(c1),same(c1,c0.map(p=>refl(p,cen,-Math.PI/2)))?'OK':'WRONG');
// B) click sets the reference point, second click defines the axis angle (Illustrator method)
await fresh();c0=await corners();const O2=[300,200];
await pg.evaluate(()=>setTool('rf'));await pg.mouse.click(H.R.x+O2[0],H.R.y+O2[1]);await pg.waitForTimeout(150);
console.log('after 1st click ORG=',await pg.evaluate(()=>JSON.stringify(typeof ORG!=='undefined'?ORG:null)));
await pg.mouse.click(H.R.x+O2[0]+100,H.R.y+O2[1]+100);await pg.waitForTimeout(300);
c1=await corners();const a45=Math.PI/4;console.log('B two clicks axis 45° through (300,200): before',JSON.stringify(c0),'after',JSON.stringify(c1),same(c1,c0.map(p=>refl(p,O2,a45)))?'OK':'WRONG (expected reflect across the line)');
// C) Alt+drag = copy
await fresh();await pg.evaluate(()=>setTool('rf'));await pg.keyboard.down('Alt');await pg.mouse.move(H.R.x+cen[0],H.R.y+cen[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+cen[0],H.R.y+cen[1]-40,{steps:5});await pg.mouse.up();await pg.keyboard.up('Alt');await pg.waitForTimeout(250);
console.log('C Alt-drag copy: objects',await pg.evaluate(()=>objs.length));
// D) Shift constrains the axis to 45° multiples
await fresh();c0=await corners();await pg.evaluate(()=>setTool('rf'));await pg.keyboard.down('Shift');await pg.mouse.move(H.R.x+cen[0],H.R.y+cen[1]);await pg.mouse.down();await pg.mouse.move(H.R.x+cen[0]+60,H.R.y+cen[1]-52,{steps:6});await pg.mouse.up();await pg.keyboard.up('Shift');await pg.waitForTimeout(250);
c1=await corners();console.log('D Shift snaps ~40° drag to 45°:',same(c1,c0.map(p=>refl(p,cen,-Math.PI/4)))?'OK':'WRONG',JSON.stringify(c1));
// E) Reflect dialog 90 vertical
await fresh();c0=await corners();await pg.evaluate(()=>openDlg('rf'));await pg.waitForTimeout(250);console.log('E dialog',await pg.evaluate(()=>[...document.querySelectorAll('#dlg input,#dlg select,#dlg button')].map(e=>(e.id||e.dataset.k||e.textContent.trim()||e.type)+'='+(e.value||(e.checked?'on':''))).join(' | ')));
console.log('errs',H.errs);await H.b.close()})();

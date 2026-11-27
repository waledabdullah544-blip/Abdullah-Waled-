const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const pts=()=>pg.evaluate(()=>{const o=[...sel][0]||objs[objs.length-1],e=o.g.querySelector('rect,path'),W=world.getCTM().inverse(),M=W.multiply(e.getCTM());let P;
 if(e.tagName==='rect'){const x=+e.getAttribute('x'),y=+e.getAttribute('y'),w=+e.getAttribute('width'),h=+e.getAttribute('height');P=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]}
 else{const L=e.getTotalLength(),n=e.getAttribute('d'),segs=(n.match(/[ML]/g)||[]).length;const nums=(n.replace(/[A-Za-z]/g,' ').match(/-?\d*\.?\d+/g)||[]).map(Number);P=[];for(let i=0;i+1<nums.length;i+=2)P.push([nums[i],nums[i+1]])}
 return{tag:e.tagName,pts:P.slice(0,4).map(([x,y])=>{const q=new DOMPoint(x,y).matrixTransform(M);return[+q.x.toFixed(2),+q.y.toFixed(2)]}),d:(e.getAttribute('d')||'').slice(0,80)}});
const fresh=async()=>{await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw()});await pg.keyboard.press('m');await H.drag(300,200,400,300);await pg.keyboard.press('v')};
// ---- Shear via dialog ----
await fresh();const base=await pts();console.log('base',JSON.stringify(base));
await pg.evaluate(()=>openDlg('sh'));await pg.waitForTimeout(300);
console.log('shear dialog fields',await pg.evaluate(()=>[...document.querySelectorAll('#dlg input,#dlg select,#dlg button')].map(e=>(e.id||e.dataset.k||e.textContent.trim()||e.type)+'='+(e.value||'')).join(' | ')));

const run=async(angle,axis,ax)=>{await fresh();await pg.evaluate(()=>openDlg('sh'));await pg.waitForTimeout(250);
  await pg.fill('#dlg #d1',String(angle));await pg.check('#dlg input[value='+axis+']').catch(async()=>{await pg.evaluate(v=>{const r=[...document.querySelectorAll('#dlg input[type=radio]')].find(x=>x.value===v);r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))},axis)});
  if(axis==='a')await pg.fill('#dlg #d2',String(ax));await pg.click('#dlg #dok');await pg.waitForTimeout(300);return pts()};
const tan=a=>Math.tan(a*Math.PI/180);
for(const [ang,axis,ax] of [[30,'h',0],[-20,'h',0],[30,'v',0],[25,'a',45]]){
  const r=await run(ang,axis,ax);const cx=(75.03+155.57)/2,cy=(136.91+217.45)/2;
  const corners=[[75.03,136.91],[155.57,136.91],[155.57,217.45],[75.03,217.45]];
  let exp;
  if(axis==='h')exp=corners.map(([x,y])=>[x+tan(ang)*(y-cy),y]);
  else if(axis==='v')exp=corners.map(([x,y])=>[x,y+tan(ang)*(x-cx)]);
  else{const a=ax*Math.PI/180,ux=Math.cos(a),uy=Math.sin(a),nx=-uy,ny=ux,k=tan(ang);exp=corners.map(([x,y])=>{const dx=x-cx,dy=y-cy,along=dx*ux+dy*uy,perp=dx*nx+dy*ny;return[x+k*perp*ux,y+k*perp*uy]})}
  const got=r.pts,err=Math.max(...exp.map(e=>Math.min(...got.map(g=>Math.hypot(g[0]-e[0],g[1]-e[1])))));
  console.log('   got all',JSON.stringify(got),'exp all',JSON.stringify(exp.map(e=>e.map(v=>+v.toFixed(2)))));console.log('shear',ang,axis,ax,'max error px',+err.toFixed(2),err<.5?'OK':'WRONG','got',JSON.stringify(got[0]),'exp',JSON.stringify(exp[0].map(v=>+v.toFixed(2))));
}
await H.b.close()})();

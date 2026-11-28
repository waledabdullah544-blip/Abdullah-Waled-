const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{localStorage.removeItem('masar.brushes.v1')});await pg.reload();await pg.waitForTimeout(700);await pg.evaluate(()=>{z=1;view()});
// artwork: a red arrow-ish shape 120 x 30
await pg.evaluate(()=>{const a=add('<path d="M0 10H90V0L120 15L90 30V20H0Z" fill="#e03131"/>');a.m.tx=100;a.m.ty=100;apply(a);sel=new Set([a]);commit();draw()});
await pg.keyboard.press('F5');await pg.waitForTimeout(200);
const mk=async(type,extra)=>{await pg.click('#bsp [data-a=new]');await pg.waitForTimeout(200);await pg.selectOption('.fxb [data-k=k]',type);await pg.evaluate(e=>{for(const k in e){const i=document.querySelector('.fxb [data-k="'+k+'"]');i.value=e[k];i.dispatchEvent(new Event('input',{bubbles:true}))}},extra||{});
  const pv=await pg.evaluate(()=>document.querySelectorAll('#bspv svg path').length);await pg.keyboard.press('Enter');await pg.waitForTimeout(200);return pv};
let pv=await mk('art',{n:'Arrow Art'});ok('Art Brush from the selected artwork (live preview)',pv>=1,String(pv));
pv=await mk('scatter',{n:'Arrow Scatter',sp:'150'});ok('Scatter Brush preview has several copies',pv>=3,String(pv));
pv=await mk('pattern',{n:'Arrow Pattern'});ok('Pattern Brush preview repeats the tile',pv>=2,String(pv));
const ids=await pg.evaluate(()=>BRP.custom().map(b=>b.id+':'+b.k));ok('three new brushes saved',ids.length===3,JSON.stringify(ids));
// a long curved path, apply each brush
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];const o=add('<path d="M100 400C250 250 450 550 650 400" fill="none" stroke="#000" stroke-width="1"/>');sel=new Set([o]);commit();draw()});
for(const [i,k] of [[0,'art'],[1,'scatter'],[2,'pattern']]){await pg.click('#bsp .bi[data-k="'+ids[i].split(':')[0]+'"]');await pg.waitForTimeout(200);
  const r=await pg.evaluate(()=>{const g=objs[0].g.querySelector('g[data-bo]');if(!g)return null;const b=g.getBBox();return{n:g.children.length,w:Math.round(b.width),h:Math.round(b.height),fill:g.firstElementChild&&g.firstElementChild.getAttribute('fill')}});
  ok(k+' brush draws coloured artwork along the path',r&&r.n>=1&&r.w>450&&r.fill==='#e03131',JSON.stringify(r));
  if(k==='scatter')ok('scatter places several copies',r&&r.n>=3,String(r&&r.n));if(k==='pattern')ok('pattern repeats the tile',r&&r.n>=3,String(r&&r.n))}
ok('the path keeps being the editable spine (styleOf reads the path, not the pieces)',await pg.evaluate(()=>fillables(objs[0]).length===1));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);ok('Undo goes back to the previous brush',await pg.evaluate(()=>{const g=objs[0].g.querySelector('g[data-bo]');return!!g&&g.children.length>=3}));
// paintbrush with the art brush
await pg.evaluate(id=>{sel=new Set();draw();setTool('br');const s=document.getElementById('pbs');s.value=id;s.dispatchEvent(new Event('change'))},ids[0].split(':')[0]);
await pg.mouse.move(H.R.x+150,H.R.y+600);await pg.mouse.down();for(let i=1;i<15;i++)await pg.mouse.move(H.R.x+150+i*25,H.R.y+600-Math.sin(i/4)*40);await pg.mouse.up();await pg.waitForTimeout(200);
ok('Paintbrush paints with the Art Brush',await pg.evaluate(()=>{const o=objs[objs.length-1];return!!o.g.querySelector('g[data-bo] path')}));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
const S=(x,y)=>pg.evaluate(([x,y])=>w2s(x,y),[x,y]);
const setup=()=>pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();dsSel=new Set();lyLoad(JSON.stringify({L:[{id:2,name:'Layer 2',color:'#FF4F4F',vis:true,lock:false,par:0},{id:1,name:'Layer 1',color:'#8C8C8C',vis:true,lock:false,par:0}],A:1,N:2,I:2}));const L1=1,L2=2;
  const mk=(d,c,ly,nm)=>{const o=add('<path d="'+d+'" fill="'+c+'" stroke="#000"/>');o.ly=ly;o.nm=nm;return o};
  mk('M100 100H300V250H100Z','#e03131',L1,'A');mk('M250 150H400V300H250Z','#1971c2',L1,'B');mk('M120 400H320V520H120Z','#2f9e44',L2,'C');mk('M300 420H460V540H300Z','#f08c00',L2,'D');
  lyApply();commit();draw();window.__L={L1,L2};return{L1,L2}});
const state=()=>pg.evaluate(()=>({n:objs.length,ly:objs.map(o=>(o.nm||'?')+'@'+(lyBy(o.ly)?o.ly:'MISSING')),orphans:objs.filter(o=>!lyBy(o.ly)).length,dom:layer.children.length===objs.length,d:objs.map(o=>(o.nm||'?')+':'+(o.g.querySelector('path')||{getAttribute:()=>''}).getAttribute('d'))}));
const lock=(id,v)=>pg.evaluate(([id,v])=>{const l=lyBy(id);l.lock=v;lyApply();draw()},[id,v]);
const hide=(id,v)=>pg.evaluate(([id,v])=>{const l=lyBy(id);l.vis=!v;lyApply();draw()},[id,v]);
const drag=async(a,b,mods)=>{const p=await S(a[0],a[1]),q=await S(b[0],b[1]);await H.drag(p[0],p[1],q[0],q[1],mods||[])};
const dOf=async nm=>(await state()).d.find(x=>x.startsWith(nm+':'));
let {L1,L2}=await setup();let s0=await state();ok('setup: 4 objects on 2 layers',s0.n===4&&!s0.orphans,s0);
// 1) Eraser across everything, layer 2 locked: C and D must not change
await lock(L2,true);const c0=await dOf('C'),d0=await dOf('D');await pg.evaluate(()=>setTool('er'));await drag([90,110],[480,530]);await pg.waitForTimeout(300);
let s=await state();ok('eraser does not touch a locked layer',await dOf('C')===c0&&await dOf('D')===d0,s.d);ok('eraser: no orphans, DOM in sync',!s.orphans&&s.dom,s);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);s=await state();ok('undo eraser restores 4 objects on their layers',s.n===4&&s.ly.join()===s0.ly.join(),s.ly);
await setup();s0=await state();
// 2) Knife across all, layer 2 hidden
await hide(L2,true);await pg.evaluate(()=>setTool('kn'));await drag([80,200],[480,480]);await pg.waitForTimeout(300);
s=await state();ok('knife does not cut a hidden layer',await dOf('C')===c0&&await dOf('D')===d0,s.d);ok('knife pieces stay on layer 1',s.ly.filter(x=>x.endsWith('@'+L1)).length>=2&&!s.orphans,s.ly);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);await hide(L2,false);await lock(L2,false);s=await state();ok('undo knife',s.n===4&&s.ly.join()===s0.ly.join(),s.ly);
await setup();s0=await state();
// 3) Select All with layer 2 locked, Delete: C and D stay
await lock(L2,true);await pg.keyboard.press('v');await pg.keyboard.press('Control+a');await pg.keyboard.press('Delete');await pg.waitForTimeout(200);s=await state();
ok('Select All + Delete keeps objects on a locked layer',s.n===2&&s.ly.every(x=>x.endsWith('@'+L2)),s.ly);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);await lock(L2,false);s=await state();ok('undo delete',s.n===4,s.ly);
await setup();s0=await state();
// 4) hidden layer + Select All + Delete
await hide(L2,true);await pg.keyboard.press('Control+a');await pg.keyboard.press('Delete');await pg.waitForTimeout(200);s=await state();
ok('Select All + Delete keeps objects on a hidden layer',s.n===2&&s.ly.every(x=>x.endsWith('@'+L2)),s.ly);await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);await hide(L2,false);
await setup();s0=await state();
// 5) Shape builder merge A+B
await pg.evaluate(()=>{sel=new Set(objs.filter(o=>o.nm==='A'||o.nm==='B'));setTool('sb');draw()});await drag([150,150],[350,280]);await pg.waitForTimeout(300);s=await state();
ok('shape builder: merged shape stays on layer 1, C and D untouched',s.ly.filter(x=>x.endsWith('@'+L2)).length===2&&!s.orphans&&s.ly.filter(x=>x.endsWith('@'+L1)).length>=1,s.ly);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);
await setup();s0=await state();
// 6) Pathfinder Unite across layers (A on L1, C on L2): result goes to the top object's layer (L2), nothing else lost
await pg.evaluate(()=>{sel=new Set(objs.filter(o=>o.nm==='A'||o.nm==='C'));setTool('v');draw()});
const uni=await pg.evaluate(()=>{try{if(window.pfOp){pfOp('unite');return 'pfOp'}if(window.boolOp){boolOp('unite');return 'boolOp'}}catch(e){return 'err '+e.message}return 'none'});
await pg.waitForTimeout(300);s=await state();ok('unite across layers: B and D survive, no orphans ('+uni+')',s.ly.some(x=>x.startsWith('B@'))&&s.ly.some(x=>x.startsWith('D@'))&&!s.orphans,s.ly);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);
await setup();s0=await state();
// 7) Scissors on A (layer 1 active = 2?), pieces stay on A's layer
await pg.evaluate(()=>{sel=new Set();setTool('sc');draw()});const e1=await S(100,175);await H.click(e1[0],e1[1]);const e2=await S(300,175);await H.click(e2[0],e2[1]);await pg.waitForTimeout(200);s=await state();
ok('scissors pieces stay on the layer of the cut object',s.ly.filter(x=>x.endsWith('@'+L1)).length>=2&&!s.orphans,s.ly);
await pg.keyboard.press('Control+z');await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);
await setup();s0=await state();
// 8) delete layer 2 then undo

const delOk=await pg.evaluate(L2=>{const btn=document.querySelector('#lyp [data-a="del"],#lyp button[title*="Delete"]');if(btn){btn.click();return 'button'}return 'none'},L2);
await pg.waitForTimeout(300);if(await pg.evaluate(()=>!!document.querySelector('.fxm')))await pg.click('.fxm .fxb button.pri').catch(()=>{});await pg.waitForTimeout(200);s=await state();
console.log('delete layer via',delOk,s.ly);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);s=await state();ok('undo restores everything',s.n===4&&!s.orphans,s.ly);
await setup();s0=await state();
// 9) draw a new rectangle while a sublayer/other layer active: goes into the active layer
await pg.keyboard.press('m');await drag([600,100],[700,200]);s=await state();ok('new shape goes into the active layer',s.ly[s.ly.length-1].endsWith('@'+L1)||s.ly.some(x=>x.startsWith('?@'+L1)),s.ly);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

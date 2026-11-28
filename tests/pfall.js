const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view();DK.open('pathfinder')});await pg.waitForTimeout(200);
const setup=()=>pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();
  add('<ellipse cx="100" cy="150" rx="60" ry="60" fill="#e03131" stroke="#000" stroke-width="2"/>');add('<rect x="120" y="110" width="100" height="80" fill="#1971c2"/>');commit();sel=new Set(objs);draw()});
// area via sampling: count canvas pixels painted (use getBBox + point-in-fill tests)
const info=()=>pg.evaluate(()=>{const pts=[[60,150],[130,150],[200,150],[100,100],[180,180],[30,30]];
  const hit=(x,y)=>{const sv=document.getElementById('cv'),r=sv.getBoundingClientRect(),e=document.elementFromPoint(r.left+x*z+px,r.top+y*z+py);const g=e&&e.closest&&e.closest('#layer > g');if(!g)return'-';const f=e.getAttribute('fill');return f&&f!=='none'?f:'o'};
  return{n:objs.length,flat:objs.map(o=>o.g.querySelectorAll('path').length).join(','),samp:pts.map(p=>hit(p[0],p[1])).join(' ')}});
const exp={unite:{n:1,samp:/^#1971c2 #1971c2 #1971c2 #1971c2 #1971c2 -$/},minusfront:{n:1,samp:/^#e03131 - - #e03131 - -$/},intersect:{n:1,samp:/^- #1971c2 - - - -$/},exclude:{n:1,samp:/^#1971c2 - #1971c2 #1971c2 #1971c2 -$/},
  divide:{samp:/^#e03131 #1971c2 #1971c2 #e03131 #1971c2 -$/},trim:{samp:/^#e03131 #1971c2 #1971c2 #e03131 #1971c2 -$/},merge:{samp:/^#e03131 #1971c2 #1971c2 #e03131 #1971c2 -$/},crop:{samp:/^- #e03131 - - - -$/},minusback:{n:1,samp:/^- - #1971c2 - #1971c2 -$/}};
for(const k of Object.keys(exp)){await setup();await pg.click('#pfp button[data-pf='+k+'], [data-pf='+k+']');await pg.waitForTimeout(250);const r=await info();const e=exp[k];
  ok(k,(e.n==null||r.n===e.n)&&e.samp.test(r.samp),JSON.stringify(r));
  await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);const u=await info();ok(k+' undo',u.n===2,JSON.stringify(u))}
await setup();await pg.click('[data-pf=outline]');await pg.waitForTimeout(250);const o=await pg.evaluate(()=>objs.map(q=>[...q.g.querySelectorAll('path')].map(p=>p.getAttribute('fill')+'/'+p.getAttribute('stroke')).join(';')).join('|'));
ok('outline: unfilled paths stroked with the fill colours',/none\/#e03131/.test(o)&&/none\/#1971c2/.test(o),o.slice(0,200));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

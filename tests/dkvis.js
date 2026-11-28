const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.keyboard.press('m');await H.drag(300,200,420,300);
for(const k of ['stroke','transparency','appearance','gradient','layers','pathfinder','align','props']){await pg.evaluate(k=>DK.open(k),k);await pg.waitForTimeout(150);
  const r=await pg.evaluate(k=>{const e=DK.P[k].el;const g=e.closest('.dkg')||e,r=g.getBoundingClientRect(),col=g.closest('.dkgs');const c=col?col.getBoundingClientRect():{top:0,bottom:innerHeight};return{top:Math.round(r.top),bottom:Math.round(r.bottom),ct:Math.round(c.top),cb:Math.round(c.bottom),float:!col}},k);
  ok(k+' panel fully visible when opened',r.float||(r.bottom<=r.cb+1&&r.top>=r.ct-1)||(r.bottom-r.top>r.cb-r.ct&&r.top>=r.ct-1),JSON.stringify(r))}
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

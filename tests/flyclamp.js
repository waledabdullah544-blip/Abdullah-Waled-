const L=require('./lib.js');
(async()=>{const H=await L.open({page:{viewport:{width:1300,height:640}}}),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
// open every tool flyout that exists and check it fits in the window
const res=await pg.evaluate(async()=>{const out=[];const ids=['fly','fly2','fly3','fly4','fly5'];
 for(const id of ids){const f=document.getElementById(id);if(!f||!f.children.length)continue;f.style.left='80px';f.style.top=(innerHeight-60)+'px';f.style.display='block';await new Promise(r=>setTimeout(r,120));const r=f.getBoundingClientRect();out.push([id,Math.round(r.top),Math.round(r.bottom),innerHeight]);f.style.display='none'}
 return out});
for(const [id,top,bottom,h] of res)ok('#'+id+' flyout stays inside the window (top '+top+', bottom '+bottom+' of '+h+')',top>=0&&bottom<=h);
// the real lower toolbar buttons: right-click / long-press groups
const btns=await pg.evaluate(()=>[...document.querySelectorAll('#tb button[data-t], nav button[data-t]')].map(b=>{const r=b.getBoundingClientRect();return[b.dataset.t,Math.round(r.top),Math.round(r.height)]}).filter(x=>x[1]>400));
console.log('lower tool buttons',JSON.stringify(btns.slice(0,8)));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

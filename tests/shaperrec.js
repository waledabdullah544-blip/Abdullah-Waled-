const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;const R=H.R;await pg.evaluate(()=>{z=1;view()});
let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647-.5};
const shapes={rect:t=>{const p=t*4,s=Math.floor(p),f=p-s;const C=[[150,120],[400,120],[400,300],[150,300],[150,120]];return[C[s][0]+(C[s+1>4?4:s+1][0]-C[s][0])*f,C[s][1]+(C[s+1>4?4:s+1][1]-C[s][1])*f]},
  ellipse:t=>[275+130*Math.cos(t*2*Math.PI),210+90*Math.sin(t*2*Math.PI)],
  triangle:t=>{const C=[[275,100],[420,320],[130,320],[275,100]],p=t*3,s=Math.min(2,Math.floor(p)),f=p-s;return[C[s][0]+(C[s+1][0]-C[s][0])*f,C[s][1]+(C[s+1][1]-C[s][1])*f]},
  line:t=>[120+t*320,140+t*160]};
const res={};
for(const amp of [2,5,8])for(const k of Object.keys(shapes)){for(let trial=0;trial<3;trial++){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();setTool('shp');commit();draw()});
  const P=[];const N=k==='line'?30:90;for(let i=0;i<=N;i++){const q=shapes[k](k==='line'?i/N:Math.min(1,i/N*1.02));P.push(await pg.evaluate(([x,y])=>w2s(x,y),[q[0]+rnd()*2*amp,q[1]+rnd()*2*amp]))}
  await pg.mouse.move(R.x+P[0][0],R.y+P[0][1]);await pg.mouse.down();for(const q of P.slice(1))await pg.mouse.move(R.x+q[0],R.y+q[1]);await pg.mouse.up();await pg.waitForTimeout(150);
  const got=await pg.evaluate(()=>{const o=objs[objs.length-1];if(!o)return'nothing';const e=o.g.firstElementChild;const sh=e.getAttribute('data-shape');if(e.tagName==='rect')return'rect';if(e.tagName==='ellipse')return'ellipse';if(sh)return sh;const sp=getSP(o.g.querySelector('path'));return sp?'path'+sp[0].pts.length+(sp[0].closed?'c':'o'):'?'});
  const key=k+' ±'+amp;(res[key]=res[key]||[]).push(got)}}
let bad=0;const want={rect:'rect',ellipse:'ellipse',triangle:'po',line:'path2o'};for(const k in res){const ok=res[k].every(x=>x===want[k.split(' ')[0]]);console.log((ok?'PASS ':'FAIL ')+'Shaper recognises a shaky '+k+': '+res[k].join(', '));if(!ok)bad++}console.log(bad?'FAILED '+bad:'ALL OK');
console.log(H.errs);await H.b.close()})();

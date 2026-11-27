const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const EN='A long sentence that must never disappear even when it is much longer than the frame or the path. '.repeat(2);
const AR='هذه جملة طويلة جدا يجب ألا تختفي أبدا حتى لو كانت أطول بكثير من الشكل أو المسار المستخدم. '.repeat(2);
const stat=()=>pg.evaluate(()=>{const o=objs[objs.length-1];if(!o)return null;const ts=[...o.g.querySelectorAll('text')];const raw=(ts[0].getAttribute('data-raw')||'').replace(/\s/g,'').length;let shown=0;const tailEx=!!o.g.querySelector('text[data-tpt]'),ovf=!!o.g.querySelector('text[data-tpov]');ts.forEach(t=>{if(t.hasAttribute('data-tpt'))return;const tsp=[...t.querySelectorAll('tspan')];if(tsp.length&&tsp.some(s=>s.hasAttribute('data-r'))){shown+=tsp.filter(s=>s.getAttribute('display')!=='none'&&s.getAttribute('visibility')!=='hidden').map(s=>s.textContent).join('').replace(/\s/g,'').length}else shown+=t.textContent.replace(/\s/g,'').length});if(ovf&&tailEx){const tl=[...o.g.querySelectorAll('text[data-tpt]')].map(x=>x.textContent).join('').replace(/\s/g,'').length;shown=Math.min(raw,shown)+0;const mainShown=raw-tl;shown=mainShown+tl}return{raw,shown,texts:ts.length,tail:tailEx,ov:ovf,b:(()=>{const b=wbox(o);return[Math.round(b.w),Math.round(b.h)]})()}});
const frames={
 rect:async()=>{await pg.keyboard.press('m');await H.drag(300,200,420,260);await pg.keyboard.press('v')},
 path:async()=>{await pg.keyboard.press('p');await H.click(250,300);await H.click(400,250);await pg.keyboard.press('Escape');await pg.keyboard.press('v')},
 none:async()=>{}};
const cases=[['t','none','point type'],['at','rect','area type'],['tp','path','type on a path'],['vt','none','vertical type'],['vat','rect','vertical area type'],['vtp','path','vertical type on a path']];
for(const [tool,frame,name] of cases)for(const [lang,txt] of [['EN',EN],['AR',AR]]){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();z=1;view()});await pg.keyboard.press('Escape');
  await frames[frame]();await pg.evaluate(t=>setTool(t),tool);await pg.waitForTimeout(150);
  const b=await pg.evaluate(()=>objs.length?(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}})():{x:300,y:200,w:0,h:0});
  if(frame==='none')await H.click(b.x,b.y);else if(frame==='path')await H.click(b.x+b.w/2,b.y+b.h/2);else await H.click(b.x+b.w/2,b.y);
  await pg.waitForTimeout(250);await pg.keyboard.type(txt,{delay:4});await pg.waitForTimeout(400);
  const s1=await stat();
  ok(name+' '+lang+': all '+(s1&&s1.raw)+' characters visible while typing '+JSON.stringify(s1),!!s1&&s1.raw>0&&s1.shown>=s1.raw);
  await pg.keyboard.press('Escape');await pg.waitForTimeout(300);
  const s2=await stat();ok(name+' '+lang+': still fully visible after leaving the text',!!s2&&s2.shown>=s2.raw);
}
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

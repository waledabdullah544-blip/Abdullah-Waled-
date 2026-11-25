const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
for(const [label,key,box] of [['small rectangle','m',[300,200,420,260]],['ellipse','l',[300,200,420,300]]]){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();z=1;view()});await pg.keyboard.press('Escape');
  await pg.keyboard.press(key);await H.drag(...box);await pg.keyboard.press('v');await pg.evaluate(()=>setTool('at'));
  const b=await pg.evaluate(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});await H.click(b.x+b.w/2,b.y+b.h/2);await pg.waitForTimeout(250);
  const txt='A long sentence that must never disappear when it is longer than the frame. '.repeat(3);await pg.keyboard.type(txt,{delay:6});await pg.waitForTimeout(300);
  const r=await pg.evaluate(()=>{const t=objs[0].g.querySelector('text'),ch=[...t.querySelectorAll('tspan')].map(s=>s.textContent).join('').replace(/\s/g,'').length;return{chars:ch,lines:t.querySelectorAll('tspan').length,marker:!!objs[0].g.querySelector('[data-of],.ofm,[data-port]'),h:Math.round(wbox(objs[0]).h)}});
  ok(label+': every typed character is rendered '+JSON.stringify(r),r.chars===txt.replace(/\s/g,'').length&&r.lines>3);
  await pg.keyboard.press('Escape');await pg.waitForTimeout(250);
  ok(label+': still there after leaving the text',await pg.evaluate(()=>objs[0].g.querySelectorAll('tspan').length>3));
}
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

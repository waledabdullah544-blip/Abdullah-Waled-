const L=require('./lib.js'),fs=require('fs');
const FD='/tmp/fnt/node_modules/@fontsource/cairo/files/';
(async()=>{const H=await L.open(),pg=H.pg,ctx=pg.context();
// serve the real Cairo font like Google Fonts would
await ctx.route('https://fonts.googleapis.com/**',r=>{const css=[['arabic','U+0600-06FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE80-FEFC'],['latin','U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD']].flatMap(([s,u])=>[400,600,700].map(w=>"@font-face{font-family:'Cairo';font-style:normal;font-weight:"+w+";font-display:swap;src:url(https://fonts.gstatic.com/cairo-"+s+"-"+w+"-normal.woff2) format('woff2');unicode-range:"+u+"}")).join('\n');r.fulfill({body:css,contentType:'text/css',headers:{'access-control-allow-origin':'*'}})});
await ctx.route('https://fonts.gstatic.com/**',r=>{const f=FD+r.request().url().split('/').pop();if(!fs.existsSync(f))return r.fulfill({status:404,body:''});r.fulfill({body:fs.readFileSync(f),contentType:'font/woff2',headers:{'access-control-allow-origin':'*'}})});
await pg.goto('file:///home/user/Abdullah-Waled-/masar.html');await pg.waitForTimeout(1500);
console.log('Cairo loaded:',await pg.evaluate(async()=>{await document.fonts.load('12px Cairo','Hgجـ');await document.fonts.load('700 12px Cairo','Hg');return document.fonts.check('12px Cairo')+' '+[...document.fonts].filter(f=>f.status==='loaded').length}));
console.log('metrics',await pg.evaluate(()=>fontMetrics(12,"'Cairo',Cairo,'Segoe UI',Arial")));
const info=()=>pg.evaluate(()=>objs.map(o=>({txt:[...o.g.querySelectorAll('text')].map(t=>t.textContent.slice(0,30)),lines:[...o.g.querySelectorAll('text')].map(t=>t.querySelectorAll('tspan').length),ov:!!o.g.querySelector('[data-of]'),bb:(()=>{const b=wbox(o);return[Math.round(b.x),Math.round(b.y),Math.round(b.w),Math.round(b.h)]})()})));
for(const [label,txt] of [['en','Hello world this is area type test'],['ar','مرحبا بالعالم هذا اختبار للنص في المساحة']]){
  await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];sel=new Set();commit();draw();z=.63;view()});
  await pg.keyboard.press('Escape');await pg.keyboard.press('m');await H.drag(200,150,520,330);await pg.keyboard.press('v');await pg.evaluate(()=>setTool('at'));await pg.waitForTimeout(200);
  const b=await pg.evaluate(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});
  await H.click(b.x+b.w/2,b.y);await pg.waitForTimeout(400);await pg.keyboard.type(txt,{delay:30});await pg.waitForTimeout(400);
  console.log(label,JSON.stringify(await info()));
  await pg.screenshot({path:'/tmp/mdl/ty4_'+label+'.png',clip:{x:H.R.x+60,y:H.R.y+60,width:700,height:420}});
  await pg.keyboard.press('Escape');await pg.waitForTimeout(300);
}
console.log('errs',H.errs);await H.b.close()})();

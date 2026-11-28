const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(5000);
const bb=()=>pg.evaluate(()=>{const v=objs[0].g.querySelector('[data-pxo]'),b=v?(()=>{const q=v.getBBox();return{x:q.x,y:q.y,w:q.width,h:q.height}})():wbox(objs[0]);/* visible (effect) bounds */return{x:+b.x.toFixed(1),y:+b.y.toFixed(1),w:+b.w.toFixed(1),h:+b.h.toFixed(1),n:objs.length}});
const eff=async(grp,it,set)=>{await pg.locator('#mbar button:text-is("Effect")').click();await pg.locator('.mdd button',{hasText:grp}).first().hover();await pg.waitForTimeout(100);await pg.locator('.msub button',{hasText:it}).first().click();await pg.waitForTimeout(250);if(set)await set();await pg.click('.fxb button.pri');await pg.waitForTimeout(250)};
const fresh=async()=>{await H.reset();await H.key('m');await H.drag(300,200,400,260);await H.key('v')}; // world size 80.65 x 48.4 at 124%
const z=await pg.evaluate(()=>z);const W=100/z,Hh=60/z;
await fresh();let b0=await bb();console.log('base',JSON.stringify(b0));
await eff('Path','Offset Path',async()=>{await pg.fill('.fxb input[data-f="off"], .fxb input >> nth=0','10')});let b=await bb();chk('Offset Path +10 grows each side by 10 (w+20, h+20)',Math.abs(b.w-b0.w-20)<1.5&&Math.abs(b.h-b0.h-20)<1.5,[b0,b]);
await fresh();b0=await bb();await eff('Stylize','Round Corners',async()=>{await pg.fill('.fxb input >> nth=0','10')});const d=await pg.evaluate(()=>objs[0].g.querySelector('path').getAttribute('d'));chk('Round Corners keeps bbox and adds curves',/[CQA]/.test(d)&&Math.abs((await bb()).w-b0.w)<1.5,d.slice(0,80));
await fresh();b0=await bb();await eff('Convert to Shape','Ellipse');const tag=await pg.evaluate(()=>objs[0].g.firstElementChild.tagName+':'+(objs[0].g.firstElementChild.getAttribute('data-shape')||''));b=await bb();chk('Convert to Shape > Ellipse: same bbox, ellipse geometry',Math.abs(b.w-b0.w)<1.5,[tag,b0,b]);
await fresh();b0=await bb();await eff('Distort & Transform','Transform',async()=>{const i=pg.locator('.fxb input[type=number]');await i.nth(0).fill('50');await i.nth(1).fill('50')});b=await bb();chk('Transform effect scale 50% halves the size',Math.abs(b.w-b0.w/2)<2,[b0,b]);
await fresh();b0=await bb();await eff('Distort & Transform','Pucker & Bloat',async()=>{await pg.fill('.fxb input >> nth=0','50')});b=await bb();chk('Pucker & Bloat +50% (bloat) grows the bbox',b.w>b0.w,[b0,b]);
await fresh();b0=await bb();await eff('Warp','Arc');b=await bb();chk('Warp Arc 50% bends the shape (bbox height grows)',b.h>b0.h,[b0,b]);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

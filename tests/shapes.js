const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const last=async()=>{const s=await H.state();return s.o[s.o.length-1]||null};
// Rectangle plain
await H.key('m');await H.drag(100,100,260,200);let o=await last();
chk('rect drag size 160x100',o&&Math.abs(o.w-160)<1.5&&Math.abs(o.h-100)<1.5,o);
await H.reset();await H.key('m');await H.drag(100,100,260,150,['Shift']);o=await last();
chk('rect Shift=square',o&&Math.abs(o.w-o.h)<1.5,o);
await H.reset();await H.key('m');await H.drag(300,300,360,350,['Alt']);o=await last();
chk('rect Alt=from center (x=240,w=120)',o&&Math.abs(o.x-240)<2&&Math.abs(o.w-120)<2,o);
await H.reset();await H.key('m');await H.drag(300,300,360,330,['Shift','Alt']);o=await last();
chk('rect Shift+Alt square from center',o&&Math.abs(o.w-o.h)<2&&Math.abs(o.x+o.w/2-300)<2,o);
await H.reset();await H.key('l');await H.drag(100,100,220,160,['Shift']);o=await last();
chk('ellipse Shift=circle',o&&Math.abs(o.w-o.h)<1.5,o);
await H.reset();await H.key('l');await H.drag(300,300,350,340,['Alt']);o=await last();
chk('ellipse Alt=from center',o&&Math.abs(o.x-250)<2&&Math.abs(o.w-100)<2,o);
// polygon/star from the flyout: set via evaluate tool then draw
await H.reset();await H.pg.evaluate(()=>setTool('po'));await H.drag(300,300,360,300);let s=await H.state();
const polyPts=await H.pg.evaluate(()=>{const e=objs[objs.length-1].g.querySelector('path,polygon');return e?(e.getAttribute('d')||e.getAttribute('points')||'').split(/[LMlmZz ]+/).filter(Boolean).length:0});
chk('polygon created (default sides count = 6 in Illustrator)',s.n===1,{n:s.n});
console.log('polygon vertex tokens',polyPts);
await H.reset();await H.pg.evaluate(()=>setTool('sr'));await H.drag(300,300,360,300);s=await H.state();
const starPts=await H.pg.evaluate(()=>{const e=objs[objs.length-1].g.querySelector('path,polygon');return e?(e.getAttribute('d')||e.getAttribute('points')||'').split(/[LMlmZz ]+/).filter(Boolean).length:0});
console.log('star vertex tokens',starPts,'(Illustrator default star = 5 points → 10 vertices)');
// line
await H.reset();await H.key('\\');await H.drag(100,100,200,130,['Shift']);o=await last();
chk('line Shift snaps to 45° multiple (h≈0 or w≈h)',o&&(o.h<1.5||o.w<1.5||Math.abs(o.w-o.h)<1.5),o);
// undo
await H.reset();await H.key('m');await H.drag(100,100,200,200);await H.pg.keyboard.press('Control+z');await H.pg.waitForTimeout(80);s=await H.state();
chk('undo removes rectangle',s.n===0,s);
// click without drag opens dialog
await H.reset();await H.key('m');await H.click(200,200);const dlg=await H.pg.evaluate(()=>getComputedStyle(document.getElementById('dlg')).display);
chk('rectangle click opens options dialog',dlg!=='none',dlg);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

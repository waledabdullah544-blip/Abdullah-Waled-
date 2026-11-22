const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
await H.key('m');await H.drag(300,200,500,320);await H.key('v');
const v=()=>H.pg.evaluate(()=>({cx:+F.x.value,cy:+F.y.value,px:+document.querySelector('#prx').value,py:+document.querySelector('#pry').value,w:+F.w.value,box:(b=>[b.x,b.y,b.w,b.h])(uni([...sel]))}));
let a=await v();chk('Control bar X/Y equals Properties X/Y',Math.abs(a.cx-a.px)<.02&&Math.abs(a.cy-a.py)<.02,a);
chk('X is the CENTER (default reference point)',Math.abs(a.cx-(a.box[0]+a.box[2]/2))<.02,a);
// type new X in control bar → center moves, size unchanged
await H.pg.fill('#fx','300');await H.pg.press('#fx','Enter');await H.pg.waitForTimeout(100);a=await v();
chk('Typing X=300 puts the CENTER at 300 (size unchanged)',Math.abs(a.box[0]+a.box[2]/2-300)<.1&&Math.abs(a.box[2]-a.w)<.1,a);
// change W=100: center stays
await H.pg.fill('#fw','100');await H.pg.press('#fw','Enter');await H.pg.waitForTimeout(100);a=await v();
chk('Changing W keeps the reference point fixed (center 300)',Math.abs(a.box[0]+a.box[2]/2-300)<.1&&Math.abs(a.box[2]-100)<.1,a);
// reference = top-left: set via setRef
await H.pg.click('#prRef .prd[data-rx="0"][data-ry="0"]');await H.pg.waitForTimeout(100);a=await v();chk('Reference point top-left: X = left edge',Math.abs(a.cx-a.box[0])<.02,a);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

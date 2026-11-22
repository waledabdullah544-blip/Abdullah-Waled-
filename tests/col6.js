const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(4000);const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.evaluate(()=>{wsApply('Essentials Classic')});await pg.waitForTimeout(400);
const fill=()=>pg.evaluate(()=>{const o=[...sel][0];const e=o.g.querySelector('path,rect,ellipse');return e.getAttribute('fill')});
const menuClick=async t=>{const pos=await pg.evaluate(()=>{const g=[...document.querySelectorAll('.dkt')].find(d=>/Color/.test(d.textContent));const b=[...g.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='≡');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}});await pg.mouse.click(pos.x,pos.y);await pg.waitForTimeout(150);
 return pg.evaluate(t=>{const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&x.textContent.trim()===t)[0];if(b){b.click();return true}return false},t)};
await pg.fill('#clhex','804020');await pg.press('#clhex','Enter');await menuClick('Invert');await pg.waitForTimeout(100);let f=await fill();chk('Invert 804020 → 7FBFDF',/7fbfdf/i.test(f),f);
await pg.fill('#clhex','804020');await pg.press('#clhex','Enter');await menuClick('Complement');await pg.waitForTimeout(100);f=await fill();chk('Complement 804020 → 206080',/206080/i.test(f),f);
await pg.fill('#clhex','123456');await pg.press('#clhex','Enter');await menuClick('Web Safe RGB');await pg.waitForTimeout(100);f=await fill();console.log('Web Safe RGB toggled; hex field=',await pg.inputValue('#clhex'),'fill=',f);
// swatches
await pg.click('.tb .tt:text-is("Swatches")');await pg.waitForTimeout(300);
const sw=await pg.evaluate(()=>[...document.querySelectorAll('#swgrid > *')].map(e=>(e.title||e.dataset.n||e.getAttribute('aria-label')||'')+'|'+(e.style.background||e.style.backgroundColor||'')).slice(0,60));
console.log('swatch count',sw.length,JSON.stringify(sw.slice(0,12)));
await pg.screenshot({path:d+'sw.png',clip:{x:1195,y:60,width:305,height:330}});
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

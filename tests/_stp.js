const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(300,200,420,300);
await pg.evaluate(()=>DK.open('stroke'));await pg.waitForTimeout(300);
const info=await pg.evaluate(()=>{const p=[...document.querySelectorAll('.dkpn')].find(e=>e.offsetParent&&/Weight/.test(e.textContent));if(!p)return'no panel';const r=p.getBoundingClientRect();return{id:p.id,r:[r.x,r.y,r.width,r.height].map(Math.round),ctl:[...p.querySelectorAll('input,select,button')].map(e=>(e.id||e.dataset.k||e.title||e.textContent.trim()).slice(0,20)+(e.disabled?'(dis)':'')).join(' | ')}});
console.log(JSON.stringify(info));
if(info.r)await pg.screenshot({path:'/tmp/mdl/stp.png',clip:{x:info.r[0],y:info.r[1],width:info.r[2],height:Math.min(700,info.r[3])}});
console.log(H.errs);await H.b.close()})();

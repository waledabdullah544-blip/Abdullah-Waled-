const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>DK.open('props'));await pg.waitForTimeout(300);
const st=()=>pg.evaluate(()=>[...document.querySelectorAll('#prNone .pb')].map(x=>{const c=getComputedStyle(x);return c.backgroundColor+'|'+c.borderColor+'|'+c.color}));
let a=await st();ok('all Document toggles look the same (on and off)',new Set(a).size===1,JSON.stringify([...new Set(a)]));
const r0=await pg.evaluate(()=>RLON);await pg.click('#pdR');await pg.mouse.move(5,5);await pg.waitForTimeout(150);
ok('clicking Rulers toggles it and the gold tick follows',await pg.evaluate(r0=>RLON!==r0&&document.getElementById('pdR').classList.contains('ck')===!!RLON,r0));
a=await st();ok('still all the same colour after toggling',new Set(a).size===1);
for(const th of ['dark','md']){await pg.evaluate(t=>document.documentElement.setAttribute('data-theme',t),th);await pg.waitForTimeout(100);a=await st();ok('same colour in the '+th+' theme',new Set(a).size===1,JSON.stringify([...new Set(a)]));
  const g=await pg.evaluate(()=>{const r=document.getElementById('prNone').getBoundingClientRect();return[r.x,r.y,r.width,r.height]});await pg.screenshot({path:'/tmp/mdl/prn_'+th+'.png',clip:{x:g[0],y:g[1],width:g[2],height:g[3]}})}
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

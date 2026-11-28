const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const stroke=async P=>{await pg.mouse.move(H.R.x+P[0][0],H.R.y+P[0][1]);await pg.mouse.down();for(const q of P.slice(1))await pg.mouse.move(H.R.x+q[0],H.R.y+q[1],{steps:2});await pg.mouse.up();await pg.waitForTimeout(250)};
const segs=()=>pg.evaluate(()=>{const p=objs[0].g.querySelector('path');return{n:(p.getAttribute('d').match(/[CL]/g)||[]).length,f:p.getAttribute('data-pcf'),raw:!!p.getAttribute('data-pcr')}});
await pg.evaluate(()=>setTool('pc'));
ok('Accuracy control visible with the Pencil tool',await pg.evaluate(()=>getComputedStyle(document.getElementById('pcw')).display!=='none'));
// jittery hand-drawn line
let seed=3;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647-.5};const P=[];for(let i=0;i<=60;i++)P.push([200+i*6,300+40*Math.sin(i/9)+rnd()*5]);
await stroke(P);const a=await segs();ok('stroke stored for re-fitting '+JSON.stringify(a),a.raw&&a.f==='3');
await pg.evaluate(()=>{const s=document.getElementById('pcf');s.value=1;s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(200);const hi=await segs();
await pg.evaluate(()=>{const s=document.getElementById('pcf');s.value=5;s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(200);const lo=await segs();
ok('accuracy 1 uses more segments than 5 ('+hi.n+' vs '+lo.n+')',hi.n>lo.n&&lo.f==='5');
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);const un=await segs();ok('Undo goes back to the previous accuracy '+JSON.stringify(un),un.f==='1');
// editing by hand disables the re-fit (never overwrites)
await pg.evaluate(()=>{const o=objs[0],pe=o.g.querySelector('path');pe.setAttribute('d',pe.getAttribute('d').replace(/^M[\d.\-]+ [\d.\-]+/,m=>m+' '));pe.setAttribute('d','M0 0L10 10');});
const refit=await pg.evaluate(()=>pcRefit(objs[0],3));ok('a hand-edited path is never re-fitted',refit===false);
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

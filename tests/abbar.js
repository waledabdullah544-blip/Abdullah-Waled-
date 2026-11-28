const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.keyboard.press('Shift+o');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{const b=document.getElementById('abbar'),hd=document.querySelector('header'),vis=e=>e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>0;return{bar:vis(b),inHeader:b.parentElement===hd,nosel:vis(document.getElementById('nosel')),label:document.getElementById('ctl').textContent,fields:['abpre','abnm','abx0','aby0','abw0','abh0','abmv','abnw','abdl','abop','abcm','abch','abvs'].filter(id=>vis(document.getElementById(id))).length}});
ok('Artboard control bar is visible in the header (not hidden in the » overflow)',r.bar&&r.inHeader&&r.fields===13,JSON.stringify(r));
ok('generic "No Selection / Document Setup" group is hidden in this mode',!r.nosel&&r.label==='Artboard');
await pg.screenshot({path:'/tmp/mdl/abbar.png',clip:{x:0,y:0,width:1500,height:110}});
// edit through the bar
await pg.fill('#abw0','500');await pg.keyboard.press('Enter');await pg.waitForTimeout(200);await pg.fill('#abnm','Cover');await pg.keyboard.press('Enter');await pg.waitForTimeout(200);
ok('W and Name fields edit the artboard',await pg.evaluate(()=>ARTS[0].w===500&&ARTS[0].n==='Cover'),await pg.evaluate(()=>JSON.stringify(ARTS[0])));
await pg.selectOption('#abpre','2');await pg.waitForTimeout(200);console.log('preset ->',await pg.evaluate(()=>JSON.stringify([ARTS[0].w,ARTS[0].h])));
await pg.click('#abcm');await pg.click('#abch');await pg.click('#abvs');await pg.waitForTimeout(200);
ok('Center Mark, Cross Hairs, Video Safe Areas draw guides',await pg.evaluate(()=>document.querySelectorAll('#abg .abm').length>=6));
await pg.click('#abcm');await pg.waitForTimeout(150);ok('toggling off removes them',await pg.evaluate(()=>document.querySelectorAll('#abg .abm').length===4));
// the marks are never exported
ok('overlay guides are not in the exported SVG',await pg.evaluate(()=>!/class="abm"/.test(fileSVGString())));
await pg.keyboard.press('v');await pg.waitForTimeout(200);ok('leaving the tool brings the normal control bar back',await pg.evaluate(()=>getComputedStyle(document.getElementById('nosel')).display!=='none'));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

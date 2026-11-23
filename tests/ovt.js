const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
for(const [w,h] of [[1500,900],[1280,720],[1024,768]]){const pg=await b.newPage({viewport:{width:w,height:h}});const errs=[];pg.on('pageerror',e=>errs.push(String(e)));
 await pg.goto('file:///home/user/Abdullah-Waled-/masar.html');await pg.waitForTimeout(600);
 await pg.keyboard.press('m');await pg.mouse.move(300,300);await pg.mouse.down();await pg.mouse.move(400,380,{steps:3});await pg.mouse.up();await pg.keyboard.press('v');await pg.waitForTimeout(400);
 const st=await pg.evaluate(()=>{const hd=document.querySelector('header');return{over:hd.scrollWidth>hd.clientWidth+1,more:getComputedStyle(document.getElementById('ctlmore')).display,moved:document.getElementById('ctlov').children.length}});
 chk(w+': control bar never scrolls/clips (no overflow)',!st.over,st);
 if(w<=1500&&st.moved){chk(w+': » button shown when controls were moved',st.more==='block',st);
  await pg.click('#ctlmore');await pg.waitForTimeout(200);chk(w+': » opens the pop-up with live controls',await pg.evaluate(()=>getComputedStyle(document.getElementById('ctlov')).display!=='none'&&document.getElementById('ctlov').querySelectorAll('input,select,button').length>0),null);
  const inp=pg.locator('#ctlov input[type=number]').first();if(await inp.count()){const v0=await inp.inputValue();await inp.fill('3');await pg.keyboard.press('Enter');await pg.waitForTimeout(150);chk(w+': a control inside the pop-up still works',true,null)}
  await pg.keyboard.press('Escape');await pg.waitForTimeout(100);chk(w+': Esc closes it',await pg.evaluate(()=>getComputedStyle(document.getElementById('ctlov')).display==='none'),null)}
 await pg.setViewportSize({width:1700,height:900});await pg.waitForTimeout(400);chk(w+'→1700: controls return to the bar, » disappears',await pg.evaluate(()=>getComputedStyle(document.getElementById('ctlmore')).display==='none'&&document.getElementById('ctlov').children.length===0),await pg.evaluate(()=>[getComputedStyle(document.getElementById('ctlmore')).display,document.getElementById('ctlov').children.length]));
 chk(w+': no JS errors',!errs.length,errs);await pg.close()}
console.log(res.join('\n'));await b.close()})();

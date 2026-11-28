const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>localStorage.removeItem('masar.recent.v1'));
const g=await pg.evaluate(()=>{const r=e=>document.querySelector(e).getBoundingClientRect();return{l:r('#mblogo').x,h:r('#mbhome').x,f:r('#mbFile').x,hy:document.querySelector('header>.brand')&&getComputedStyle(document.querySelector('header>.brand')).display}});
ok('menu bar starts with the Masar logo, then Home, then File',g.l<g.h&&g.h<g.f,JSON.stringify(g));ok('the logo left the control bar',g.hy==='none');
await pg.screenshot({path:'/tmp/mdl/top.png',clip:{x:0,y:0,width:1000,height:100}});
await pg.click('#mbhome');await pg.waitForTimeout(150);ok('Home button opens the Home screen',await pg.evaluate(()=>HOME.isOpen()&&document.getElementById('mbhome').classList.contains('on')));
await pg.screenshot({path:'/tmp/mdl/home.png'});
ok('menus still work over Home',await pg.evaluate(()=>{const r=document.getElementById('home').getBoundingClientRect(),m=document.getElementById('mbar').getBoundingClientRect();return r.top>=m.bottom-1}));
await pg.click('#home .pc[data-p="0"]');await pg.waitForTimeout(200);ok('A4 preset creates an A4 document and closes Home',await pg.evaluate(()=>!HOME.isOpen()&&ARTS.length===1&&ARTS[0].w===595&&ARTS[0].h===842));
// recent: save then reopen
await pg.evaluate(()=>{add('<rect x="10" y="10" width="50" height="40" fill="#e03131"/>');commit();draw();window.fileDownload=()=>{}});await pg.evaluate(()=>fileSave());await pg.waitForTimeout(100);await pg.keyboard.press('Enter');await pg.waitForTimeout(100);
ok('saved file appears in Recent',await pg.evaluate(()=>recentList().length===1));
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];commit();draw();window.dkSaved&&dkSaved()});
await pg.click('#mbhome');await pg.waitForTimeout(150);await pg.click('#home tr.rf');await pg.waitForTimeout(250);ok('clicking a recent file opens it',await pg.evaluate(()=>objs.length===1&&!HOME.isOpen()));
await pg.click('#mbhome');await pg.keyboard.press('Escape');ok('Esc closes Home',await pg.evaluate(()=>!HOME.isOpen()));
await pg.click('#mbhome');await pg.click('#home [data-a=new]');await pg.waitForTimeout(150);ok('New file opens New Document',await pg.evaluate(()=>/New Document/.test(document.body.innerText)&&!HOME.isOpen()));await pg.keyboard.press('Escape');
ok('Alt+F still opens File',await(async()=>{await pg.keyboard.press('Alt+f');await pg.waitForTimeout(100);const r=await pg.evaluate(()=>document.getElementById('mbFile').classList.contains('on'));await pg.keyboard.press('Escape');return r})());
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pos=()=>H.pg.evaluate(()=>{const h=document.querySelector('header').getBoundingClientRect(),m=document.querySelector('main').getBoundingClientRect(),f=document.querySelector('footer').getBoundingClientRect();return{h:h.top,m:m.top,f:f.top,fb:f.bottom,vh:innerHeight}});
let p=await pos();chk('Control bar on top by default (above main)',p.h<p.m,p);
await H.pg.click('#ctlmenu');await H.pg.click('.mdd:visible >> text=Dock to Bottom');await H.pg.waitForTimeout(200);p=await pos();
chk('Dock to Bottom: control bar below the canvas area, above status bar',p.h>p.m&&p.h<p.f,p);
await H.pg.reload();await H.pg.waitForTimeout(800);p=await pos();chk('After reload the Control panel is docked at the top again (build 239: always opens at the top)',p.h<p.m,p);
await H.pg.click('#ctlmenu');await H.pg.click('.mdd:visible >> text=Dock to Top');await H.pg.waitForTimeout(200);p=await pos();chk('Dock to Top restores',p.h<p.m,p);
// manage workspaces
await H.pg.evaluate(()=>{wsApply('Typography')});await H.pg.evaluate(()=>{const x={ 'My WS':JSON.parse(JSON.stringify(DK.serialize()))};localStorage.setItem('masar-wsx',JSON.stringify(x))});
await H.pg.evaluate(()=>wsManage());await H.pg.waitForTimeout(150);
await H.pg.click('.fxb input[name=wsr]');await H.pg.fill('#wsmn','Renamed');await H.pg.click('.fxb button:has-text("Rename")');await H.pg.waitForTimeout(100);
let names=await H.pg.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('masar-wsx')||'{}')));chk('Manage Workspaces: rename',names.includes('Renamed')&&!names.includes('My WS'),names);
await H.pg.click('.fxb input[name=wsr]');await H.pg.click('.fxb button:has-text("Delete")');await H.pg.waitForTimeout(100);
names=await H.pg.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('masar-wsx')||'{}')));chk('Manage Workspaces: delete',names.length===0,names);
const menu=await H.pg.evaluate(()=>wsMenu().map(i=>i.t).join('|'));chk('Workspace menu lists Manage Workspaces…',/Manage Workspaces/.test(menu),menu);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

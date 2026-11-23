const {open}=require('./lib');process.on('unhandledRejection',e=>{console.log(global.__res.join('\n'));console.log('STOP',String(e).slice(0,160));process.exit(1)});
(async()=>{const H=await open(),res=global.__res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(4000);const R=H.R;
const A=()=>pg.evaluate(()=>ARTS.map(a=>[a.x,a.y,a.w,a.h,a.n].join(',')));
const dlg=()=>pg.evaluate(()=>{const d=document.querySelector('.fxb');return d?d.innerText.replace(/\s+/g,' '):''});
const w2s=async(x,y)=>pg.evaluate(([x,y])=>[x*z+px,y*z+py],[x,y]);
await H.key('m');await H.drag(200,150,300,250);await H.key('v');
chk('Starts with one artboard',(await A()).length===1,await A());
await pg.evaluate(()=>{z=.5;px=100;py=120;view()});await pg.keyboard.press('Shift+o');await pg.waitForTimeout(150);chk('Shift+O picks the Artboard tool',await pg.evaluate('tool')==='abt',await pg.evaluate('tool'));chk('help card registered',await pg.evaluate(()=>!!TIPAPI.TIPS.abt),null);
chk('Control bar shows the artboard options',await pg.evaluate(()=>getComputedStyle(document.getElementById('abbar')).display!=='none'),null);
// create by dragging in empty space to the right of the artboard (world 900..1100 x 100..300)
const p0=await w2s(900,100),p1=await w2s(1100,300);await pg.mouse.move(R.x+p0[0],R.y+p0[1]);await pg.mouse.down();await pg.mouse.move(R.x+p1[0],R.y+p1[1],{steps:6});await pg.mouse.up();await pg.waitForTimeout(250);
chk('Dragging on empty canvas creates an artboard (200 × 200)',(await A()).length===2&&/,200,200,/.test((await A())[1]),await A());chk('The new one is active',await pg.evaluate(()=>ABI)===1,null);
// move artboard 1 together with its artwork
await pg.evaluate(()=>abGo(0));const c0=await pg.evaluate(()=>wbox(objs[0]).x);const m0=await w2s(400,300),m1=await w2s(400,400);await pg.mouse.move(R.x+m0[0],R.y+m0[1]);await pg.mouse.down();await pg.mouse.move(R.x+m1[0],R.y+m1[1],{steps:6});await pg.mouse.up();await pg.waitForTimeout(250);
const a0=(await A())[0].split(',').map(Number),c1=await pg.evaluate(()=>wbox(objs[0]).y);chk('Dragging inside an artboard moves it by 100 px',a0[1]===100,a0);chk('…and its artwork moves with it',Math.abs(c1-(c0+100)<1?1:0)>=0&&Math.abs(c1-(await pg.evaluate(()=>wbox(objs[0]).y)))<1,c1);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);chk('Undo puts the artboard back',(await A())[0].split(',')[1]==='0',await A());
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(200);chk('Redo moves it again',(await A())[0].split(',')[1]==='100',await A());await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);
// resize with a handle
await pg.evaluate(()=>abGo(1));await pg.waitForTimeout(100);const h=await w2s(1100,300),h2=await w2s(1200,400);await pg.mouse.move(R.x+h[0],R.y+h[1]);await pg.mouse.down();await pg.mouse.move(R.x+h2[0],R.y+h2[1],{steps:6});await pg.mouse.up();await pg.waitForTimeout(250);
chk('Dragging the corner handle resizes (300 × 300)',/,300,300,/.test((await A())[1]),await A());
// options dialog via double click
const dc=await w2s(1000,200);await pg.mouse.dblclick(R.x+dc[0],R.y+dc[1]);await pg.waitForTimeout(300);chk('Double-click opens Artboard Options',/Artboard Options/.test(await dlg())&&/Preset/.test(await dlg()),(await dlg()).slice(0,80));
await pg.fill('.fxb [data-k="n"]','Cover');await pg.fill('.fxb [data-k="w"]','320');await pg.click('.fxb button.pri');await pg.waitForTimeout(250);chk('Options: rename + width 320',/Cover/.test((await A())[1])&&/,320,300,/.test((await A())[1]),await A());
// control bar
await pg.evaluate(()=>{const m=document.getElementById('ctlmore');if(getComputedStyle(m).display!=='none'&&getComputedStyle(document.getElementById('ctlov')).display==='none')m.click()});await pg.fill('#abx0','1000');await pg.keyboard.press('Enter');await pg.waitForTimeout(200);chk('Control bar X field moves the artboard',/^1000,/.test((await A())[1]),await A());
// alt-drag duplicate with artwork
await pg.evaluate(()=>abGo(0));const d0=await w2s(400,300),d1=await w2s(400,800);await pg.keyboard.down('Alt');await pg.mouse.move(R.x+d0[0],R.y+d0[1]);await pg.mouse.down();await pg.mouse.move(R.x+d1[0],R.y+d1[1],{steps:6});await pg.mouse.up();await pg.keyboard.up('Alt');await pg.waitForTimeout(250);
chk('Alt+drag copies the artboard and its artwork',(await A()).length===3&&await pg.evaluate(()=>objs.length)===2,[await A(),await pg.evaluate(()=>objs.length)]);
// delete
await pg.keyboard.press('Delete');await pg.waitForTimeout(200);chk('Delete removes the active artboard',(await A()).length===2,await A());
await pg.keyboard.press('Escape');await pg.waitForTimeout(150);chk('Esc returns to the Selection tool',await pg.evaluate('tool')==='v',await pg.evaluate('tool'));
// status bar
chk('Status bar shows "n / N"',/\/ 2/.test(await pg.evaluate(()=>document.getElementById('abi').textContent)),await pg.evaluate(()=>document.getElementById('abi').textContent));
await pg.evaluate(()=>abGo(0));await pg.click('#abx');await pg.waitForTimeout(250);chk('▶ goes to the next artboard and fits it',await pg.evaluate(()=>ABI)===1,await pg.evaluate(()=>ABI));await pg.click('#abp');await pg.waitForTimeout(200);chk('◀ goes back',await pg.evaluate(()=>ABI)===0,null);
// panel
await pg.evaluate(()=>DK.open('artboards'));await pg.waitForTimeout(250);chk('Artboards panel lists them',await pg.locator('#artboardsP .abrow').count()===2,await pg.locator('#artboardsP .abrow').count());
await pg.locator('#artboardsP .abrow').nth(1).click();await pg.waitForTimeout(250);chk('Clicking a row activates and fits that artboard',await pg.evaluate(()=>ABI)===1,await pg.evaluate(()=>ABI));
await pg.locator('#artboardsP .abm').nth(1).dblclick();await pg.keyboard.type('Back');await pg.keyboard.press('Enter');await pg.waitForTimeout(250);chk('Double-click renames inline',/Back/.test((await A())[1]),await A());
await pg.click('#artboardsP [data-b="new"]');await pg.waitForTimeout(250);chk('New Artboard button',(await A()).length===3,await A());
await pg.evaluate(()=>DK.P.artboards.menu().find(x=>x.t==='Delete Artboards').f());await pg.waitForTimeout(200);chk('Panel menu › Delete Artboards',(await A()).length===2,await A());
// rearrange
await pg.evaluate(()=>{abNew()});await pg.waitForTimeout(150);await pg.evaluate(()=>abRearrange());await pg.waitForTimeout(250);chk('Rearrange dialog',/Rearrange Artboards/.test(await dlg())&&/Grid by Row/.test(await dlg()),(await dlg()).slice(0,60));await pg.fill('.fxb [data-k="n"]','3');await pg.fill('.fxb [data-k="s"]','10');await pg.click('.fxb button.pri');await pg.waitForTimeout(300);
const ar=(await A()).map(r=>r.split(',').map(Number));chk('Grid by Row (3 columns, 10 px gap) puts them in one row',ar[0][1]===0&&ar[1][1]===0&&ar[2][1]===0&&ar[1][0]===ar[0][0]+ar[0][2]+10,ar);
// object › Artboards
await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.evaluate(()=>abConvert());await pg.waitForTimeout(200);chk('Convert to Artboards makes one from the selection',(await A()).length===4,await A());
await pg.evaluate(()=>{abGo(0);sel=new Set([objs[0]]);draw();abFitTo(abBounds([objs[0]]))});await pg.waitForTimeout(200);const fb=await pg.evaluate(()=>[ARTS[0].w,Math.round(wbox(objs[0]).w)]);chk('Fit Artboard to Selected Art',fb[0]===fb[1],fb);
// select all on active artboard
await pg.evaluate(()=>{abGo(0);abSelectAllActive()});chk('Select › All on Active Artboard selects only the artwork on it',await pg.evaluate(()=>sel.size)>=1,null);
// navigator
await pg.evaluate(()=>DK.open('navigator'));await pg.waitForTimeout(300);chk('Navigator draws the artboards and the view box',await pg.evaluate(()=>document.querySelectorAll('#navigatorP #nva rect').length===ARTS.length&&!!document.querySelector('#navigatorP #nvr')),null);
const zb=await pg.evaluate(()=>z);await pg.click('#navigatorP #nvl');await pg.waitForTimeout(200);chk('Navigator + zooms in',await pg.evaluate(()=>z)>zb,null);
const nb=await pg.locator('#navigatorP #nvs').boundingBox();const px0=await pg.evaluate(()=>px);await pg.mouse.click(nb.x+nb.width*0.9,nb.y+nb.height*0.5);await pg.waitForTimeout(200);chk('Clicking the Navigator pans the view',await pg.evaluate(()=>px)!==px0,null);
// smart guides / align
await pg.evaluate(()=>{abGo(1);sel=new Set([objs[0]]);draw();AL.to='art'});await pg.waitForTimeout(100);await pg.evaluate(()=>alAlign('l'));await pg.waitForTimeout(150);chk('Align to Artboard uses the ACTIVE artboard (left edge = its x)',await pg.evaluate(()=>Math.abs(wbox(objs[0]).x-ARTS[1].x)<.6),await pg.evaluate(()=>[wbox(objs[0]).x,ARTS[1].x]));
// export svg of each artboard
chk('SVG of an artboard has its own viewBox',await pg.evaluate(()=>{const s=fileSVGString(1);return s.indexOf('viewBox="'+ARTS[1].x+' '+ARTS[1].y+' '+ARTS[1].w+' '+ARTS[1].h+'"')>0}),null);
// save/load
const dlp=pg.waitForEvent('download');await pg.evaluate(()=>{window.DOCNAMED=true;fileSave()});const dl=await dlp;const txt=require('fs').readFileSync(await dl.path(),'utf8');const D=JSON.parse(txt);chk('Saved file keeps all artboards',D.arts&&D.arts.length===(await A()).length,D.arts&&D.arts.length);
await pg.evaluate(()=>{ARTS=[{id:1,n:'x',x:0,y:0,w:10,h:10}];ABI=0;abSync();abRender()});await pg.evaluate(t=>fileLoadMasar(JSON.parse(t)),txt);await pg.waitForTimeout(200);chk('Opening it restores them',(await A()).length===D.arts.length,await A());
// export all
const dls=[];pg.on('download',d=>dls.push(d.suggestedFilename()));await pg.evaluate(()=>abExportAll('svg'));await pg.waitForTimeout(1800);chk('Export All Artboards as SVG downloads one file each',dls.length===D.arts.length&&new Set(dls).size===dls.length,dls);
// menus
await pg.evaluate(()=>{[...document.querySelectorAll('#mbar > *')].find(x=>x.textContent==='Object').click()});await pg.waitForTimeout(150);chk('Object › Artboards submenu',await pg.evaluate(()=>/Artboards/.test(document.querySelector('.mdd').textContent)&&/Convert to Artboards/.test(document.querySelector('.mdd').textContent)),null);await pg.keyboard.press('Escape');
// undo of an artboard creation after a tool session
console.log(res.join('\n'),H.errs);await H.b.close()})();

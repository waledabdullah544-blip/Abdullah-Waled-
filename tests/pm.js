const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(4000);const R=H.R;
const setup=async()=>{await pg.reload();await pg.evaluate(()=>localStorage.clear());await pg.reload();await pg.waitForTimeout(600);await H.key('m');await H.drag(200,150,300,250);await H.drag(400,200,520,300);await H.key('v');await pg.evaluate(()=>{objs.forEach(o=>{const e=o.g.querySelector('rect,path');e.setAttribute('stroke','#000');e.setAttribute('stroke-width','10')});sel=new Set(objs);draw()})};
const menuOf=id=>pg.evaluate(id=>DK.P[id].menu?DK.P[id].menu().map(x=>x.sep?'---':x.t+(x.en===false?' (off)':'')+(x.c?' ✓':'')):null,id);
await setup();
for(const id of ['align','pathfinder','transparency','info','character','paragraph','props','assetexport']){await pg.evaluate(id=>DK.open(id),id)}
await pg.waitForTimeout(300);
for(const id of ['align','pathfinder','transparency','info','character','paragraph','props','assetexport']){const m=await menuOf(id);chk('Panel menu for '+id+' has items',m&&m.length>=1,m)}
// Align Show/Hide options
const vis=sel=>pg.evaluate(s=>{const e=document.querySelector(s);return !!e&&e.offsetParent!==null},sel);
chk('Align: Distribute Spacing visible by default',await pg.evaluate(()=>[...document.querySelectorAll('#alp .pt')].some(p=>/Spacing/.test(p.textContent)&&p.offsetParent!==null)),null);
await pg.evaluate(()=>DK.P.align.menu()[0].f());await pg.waitForTimeout(100);chk('Align › Hide Options hides Distribute Spacing and Align To',await pg.evaluate(()=>![...document.querySelectorAll('#alp .pt')].some(p=>/Spacing/.test(p.textContent)&&p.offsetParent!==null)),null);
chk('…and the label flips to Show Options',(await menuOf('align'))[0]==='Show Options',await menuOf('align'));
await pg.reload();await pg.waitForTimeout(600);await pg.evaluate(()=>DK.open('align'));await pg.waitForTimeout(200);chk('The Align option persists after reload',(await menuOf('align'))[0]==='Show Options',await menuOf('align'));
await pg.evaluate(()=>DK.P.align.menu()[0].f());
// Use Preview Bounds: two objects, strokes 10 → align left uses visual bounds
await setup();await pg.evaluate(()=>{DK.open('align');objs[0].m.tx+=0;sel=new Set(objs);draw()});
const lefts=async()=>pg.evaluate(()=>objs.map(o=>Math.round(wbox(o).x*10)/10));
await pg.evaluate(()=>{const e=objs[1].g.querySelector('rect,path');e.setAttribute('stroke-width','30');draw()});
const b0=await lefts();await pg.click('#alp [title^="Horizontal Align Left"]').catch(async()=>{await pg.evaluate(()=>{});});await pg.waitForTimeout(200);const g1=await lefts();
chk('Align Left (geometric bounds): both left edges equal',Math.abs(g1[0]-g1[1])<.2,g1);
await setup();await pg.evaluate(()=>{DK.open('align');const e=objs[1].g.querySelector('rect,path');e.setAttribute('stroke-width','30');AL.pb=true;sel=new Set(objs);draw()});await pg.waitForTimeout(200);await pg.click('#alp [title^="Horizontal Align Left"]');await pg.waitForTimeout(200);const g2=await lefts();
chk('Use Preview Bounds: the thicker stroke (30 vs 10) makes the left geometry edges differ by 10px',Math.abs((g2[1]-g2[0])-10)<.6,g2);
// Pathfinder repeat
await setup();await pg.evaluate(()=>{DK.open('pathfinder');sel=new Set(objs);draw()});await pg.waitForTimeout(200);
const n0=await pg.evaluate(()=>objs.length);await pg.click('#pfp [data-pf="unite"]').catch(()=>pg.click('#pfp [data-pf]'));await pg.waitForTimeout(250);const n1=await pg.evaluate(()=>objs.length);chk('Pathfinder op applies',n1<n0,[n0,n1]);
await pg.evaluate(()=>{});const m=await menuOf('pathfinder');chk('Pathfinder menu offers Repeat <op>',/^Repeat/.test(m[0]),m);
// Info options, transparency menu
await pg.evaluate(()=>DK.P.info.menu()[0].f());await pg.waitForTimeout(100);chk('Info › Hide Options hides detail rows',await pg.evaluate(()=>[...document.querySelectorAll('#infoP .inf > .ig')].filter(x=>x.offsetParent!==null).length)<=2,null);
// Layers context menu
await setup();await pg.evaluate(()=>DK.open('layers'));await pg.waitForTimeout(250);await pg.click('#lyp .lyr.L .nm',{button:'right'});await pg.waitForTimeout(250);const lm=await pg.evaluate(()=>{const m=document.getElementById('pmMn');return m&&m.style.display!=='none'?m.innerText.replace(/\s+/g,' ').slice(0,160):''});chk('Right-click a layer row opens the Layers menu',/New Layer/.test(lm)&&/Duplicate/.test(lm),lm);
await pg.keyboard.press('Escape');await pg.evaluate(()=>{sel=new Set();draw()});await pg.waitForTimeout(150);await pg.click('#lyp .lyr.O .nm',{button:'right'});await pg.waitForTimeout(250);chk('Right-click an object row selects it and opens the menu',await pg.evaluate(()=>sel.size)===1&&await pg.evaluate(()=>document.getElementById('pmMn').style.display!=='none'),null);await pg.keyboard.press('Escape');
console.log(res.join('\n'),H.errs);await H.b.close()})();

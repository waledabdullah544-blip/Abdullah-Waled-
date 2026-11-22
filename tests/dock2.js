
(async()=>{const H=await require('./lib').open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const dk=()=>H.pg.evaluate(()=>({L:DK.d.L.map(g=>g.t),R:DK.d.R.map(g=>g.t),F:DK.f.map(g=>g.t),dc:DK.dc}));
const tabPos=async name=>H.pg.evaluate(n=>{const e=[...document.querySelectorAll('.tb .tt')].find(x=>x.textContent.trim()===n);if(!e)return null;const r=e.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}},name);
const rawDrag=async(a,b)=>{await H.pg.mouse.move(a.x,a.y);await H.pg.mouse.down();for(let i=1;i<=12;i++)await H.pg.mouse.move(a.x+(b.x-a.x)*i/12,a.y+(b.y-a.y)*i/12);await H.pg.waitForTimeout(150);await H.pg.mouse.up();await H.pg.waitForTimeout(250)};
let p=await tabPos('Layers');
// 1. drag Layers tab to the left edge of the document area (just right of the toolbar)
await rawDrag(p,{x:110,y:500});let s=await dk();chk('Drag Layers tab to left edge docks it on the LEFT',s.L.flat().includes('layers'),s);
// 2. drag it out to canvas center => floating
p=await tabPos('Layers');if(p){await rawDrag(p,{x:700,y:450});s=await dk();chk('Drag tab onto canvas makes it a FLOATING panel',s.F.flat().includes('layers'),s)}else chk('Layers tab found after dock',false,s);
// 3. drag floating Layers back onto Properties tab strip => tabs merge
p=await tabPos('Layers');const q=await tabPos('Properties');if(p&&q){await rawDrag(p,{x:q.x+60,y:q.y});s=await dk();chk('Drop on the other panel tab strip → grouped as tabs',s.R.some(g=>g.includes('layers')&&g.includes('props')),s)}
// 4. Window menu toggles
await H.pg.evaluate(()=>DK.close('layers'));await H.pg.waitForTimeout(100);let isop=await H.pg.evaluate(()=>DK.isOpen("layers"));chk("Close panel hides it",!isop,isop);
await H.pg.evaluate(()=>DK.open('layers'));isop=await H.pg.evaluate(()=>DK.isOpen("layers"));chk("Window>Layers reopens it",isop,isop);
// 5. persistence: float a panel, reload, still floating
await H.pg.evaluate(()=>{DK.floatOut('layers');DK.save()});await H.pg.waitForTimeout(200);const before=await dk();
await H.pg.reload();await H.pg.waitForTimeout(900);const after=await dk();chk('Layout persists after reload',JSON.stringify(before)===JSON.stringify(after),{before,after});
// 6. workspaces
await H.pg.evaluate(()=>wsApply('Essentials Classic'));await H.pg.waitForTimeout(200);s=await dk();chk('Workspace "Essentials Classic" applies (Color panel docked)',s.R.flat().includes('color'),s);
await H.pg.evaluate(()=>wsApply('Typography'));s=await dk();chk('Workspace "Typography" (Character panel docked)',s.R.flat().includes('character'),s);
// 7. toolbar: Edit Toolbar exists + can drag toolbar? 
const eb=await H.pg.evaluate(()=>!!document.getElementById('tbedb'));chk('Edit Toolbar… present',eb,eb);
const ctrlHide=await H.pg.evaluate(()=>{document.body.classList.toggle('hide-ctrl');const h=getComputedStyle(document.querySelector('header')).display;document.body.classList.toggle('hide-ctrl');return h});console.log('control bar display when hidden:',ctrlHide);
// 8. dock to bottom for control bar? 
const bottom=await H.pg.evaluate(()=>/bottom|dockbottom/i.test(document.documentElement.outerHTML.match(/Control[^"]{0,80}/g)?.join(' ')||''));
console.log('control bar bottom-dock option mention:',bottom);
// 9. collapse to icons
await H.pg.evaluate(()=>wsApply('Essentials'));const dc0=await H.pg.evaluate(()=>JSON.stringify(DK.dc));
console.log('collapse state keys',dc0, 'has setCollapse:',await H.pg.evaluate(()=>Object.keys(DK).join(',')));
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

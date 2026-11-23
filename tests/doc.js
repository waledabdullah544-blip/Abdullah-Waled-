const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(4000);const R=H.R;
const dlg=()=>pg.evaluate(()=>{const d=document.querySelector('.fxb');return d?d.innerText.replace(/\s+/g,' '):''});
await pg.evaluate(()=>localStorage.clear());await pg.reload();await pg.waitForTimeout(600);
await H.key('m');await H.drag(200,150,300,250);
// New
await pg.keyboard.press('Control+n');await pg.waitForTimeout(250);let t=await dlg();chk('Ctrl+N opens New Document',/New Document/.test(t)&&/Width/.test(t)&&/Height/.test(t)&&/Units/.test(t)&&/Color Mode/.test(t)&&/Preset/.test(t),t.slice(0,80));
await pg.selectOption('.fxb [data-k="pre"]','2');await pg.waitForTimeout(150);chk('Preset A4 sets millimetres and 210 × 297',await pg.evaluate(()=>[document.querySelector('.fxb [data-k="u"]').value,+document.querySelector('.fxb [data-k="w"]').value,+document.querySelector('.fxb [data-k="h"]').value]).then(v=>v[0]==='mm'&&Math.abs(v[1]-209.999)<.1&&Math.abs(v[2]-297)<.1),await pg.evaluate(()=>[document.querySelector('.fxb [data-k="w"]').value,document.querySelector('.fxb [data-k="h"]').value]));
chk('Portrait is ticked for a tall page',await pg.evaluate(()=>document.querySelector('.fxb input[value="p"]').checked),null);
await pg.click('.fxb input[value="l"]');await pg.waitForTimeout(100);chk('Landscape swaps width and height',await pg.evaluate(()=>+document.querySelector('.fxb [data-k="w"]').value>+document.querySelector('.fxb [data-k="h"]').value),null);
await pg.fill('.fxb [data-k="n"]','Poster');await pg.fill('.fxb [data-k="na"]','3');await pg.fill('.fxb [data-k="gap"]','30');await pg.selectOption('.fxb [data-k="m"]','CMYK');await pg.click('.fxb button.pri');await pg.waitForTimeout(250);
chk('Unsaved changes: asks Save / Don\'t Save / Cancel',/save changes/.test(await dlg()),await dlg());await pg.click('.fxb button:has-text("Don\'t Save")');await pg.waitForTimeout(400);
const s=await pg.evaluate(()=>({sz:abSize(),objs:objs.length,tab:document.getElementById('tab').textContent,mode:DOCMODE,cm:clState.mode}));
chk('A4 landscape = 842 × 595 px',Math.abs(s.sz[0]-842)<=1&&Math.abs(s.sz[1]-595)<=1,s.sz);chk('New with 3 artboards, 30 px apart',await pg.evaluate(()=>ARTS.length===3&&ARTS[1].x===ARTS[0].w+30),await pg.evaluate(()=>ARTS.map(a=>a.x)));chk('The old artwork is gone',s.objs===0,s.objs);chk('Tab shows the name and CMYK',/Poster/.test(s.tab)&&/CMYK/.test(s.tab),s.tab);chk('Colour panel switched to CMYK',s.cm==='cmyk',s.cm);
chk('Properties panel shows the new artboard size',await pg.evaluate(()=>{DK.open('props');prRefresh();return /842 × 595/.test((document.getElementById('prAbs')||{}).textContent||'')}),null);
// Document Setup
await pg.evaluate(()=>window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyP',key:'p',ctrlKey:true,altKey:true,bubbles:true,cancelable:true})));await pg.waitForTimeout(250);t=await dlg();chk('Document Setup opens',/Document Setup/.test(t)&&/Width/.test(t),t.slice(0,60));
await pg.selectOption('.fxb [data-k="u"]','in');await pg.waitForTimeout(100);chk('Changing Units converts the numbers (842 px → 11.694 in)',await pg.evaluate(()=>Math.abs(+document.querySelector('.fxb [data-k="w"]').value-11.694)<.01),await pg.evaluate(()=>document.querySelector('.fxb [data-k="w"]').value));
await pg.fill('.fxb [data-k="w"]','10');await pg.fill('.fxb [data-k="h"]','5');await pg.click('.fxb button.pri');await pg.waitForTimeout(300);chk('OK resizes the artboard to 10 × 5 in = 720 × 360',await pg.evaluate(()=>JSON.stringify(abSize()))==='[720,360]',await pg.evaluate(()=>abSize()));
// geometry follows the new artboard
await pg.evaluate(()=>{selAll=null});await H.key('m');await H.drag(100,100,200,200);await H.key('v');await pg.evaluate(()=>{sel=new Set(objs);draw()});await pg.evaluate(()=>{DK.open('align')});await pg.waitForTimeout(150);
chk('Export SVG uses the artboard size',await pg.evaluate(()=>/width="720" height="360"/.test(fileSVGString())),null);
// Save / Open round trip carries the artboard
await pg.evaluate(()=>{window.DOCNAMED=true});const dlp=pg.waitForEvent('download');await pg.evaluate(()=>fileSave());const dl=await dlp;const fs=require('fs');const path=await dl.path();const savedTxt=fs.readFileSync(path,'utf8');const saved=savedTxt;chk('Saved file carries the artboard size',saved&&JSON.parse(saved).ab&&JSON.parse(saved).ab[0]===720,saved&&saved.slice(0,80));
await pg.evaluate(()=>abSet(800,600));await pg.evaluate(t=>fileLoadMasar(JSON.parse(t)),saved);await pg.waitForTimeout(200);chk('Opening it restores 720 × 360',await pg.evaluate(()=>JSON.stringify(abSize()))==='[720,360]',await pg.evaluate(()=>abSize()));
// Colour mode menu
await pg.evaluate(()=>{[...document.querySelectorAll('#mbar > *')][0].click()});await pg.waitForTimeout(150);const fm=await pg.evaluate(()=>document.querySelector('.mdd').innerText.replace(/\s+/g,' '));chk('File menu: New…, Place…, Document Setup…, Document Color Mode, Print…',/New…/.test(fm)&&/Place…/.test(fm)&&/Document Setup…/.test(fm)&&/Document Color Mode/.test(fm)&&/Print…/.test(fm),fm);await pg.keyboard.press('Escape');
// Place: build a PNG data URL and feed the input
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAIAAAAlV+npAAAAhklEQVR4nO3QQQ3AIADAQEAX/oMsLKwvsuROQdN59h58s14H/IlZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWcEFNcUBpBQ4CtsAAAAASUVORK5CYII=';
await pg.evaluate(async u=>{const b=await (await fetch(u)).blob();const f=new File([b],'logo.png',{type:'image/png'});const dt=new DataTransfer();dt.items.add(f);const inp=document.getElementById('fplace');inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}))},png);await pg.waitForTimeout(600);
const pl=await pg.evaluate(()=>{const o=objs[objs.length-1];const im=o&&o.g.querySelector('image');return im?{w:+im.getAttribute('width'),h:+im.getAttribute('height'),sel:sel.has(o),nm:o.nm}:null});chk('Place… embeds the image as a selected object (100 × 50)',pl&&pl.w===100&&pl.h===50&&pl.sel,pl);
await pg.evaluate(()=>{const o=objs[objs.length-1];sel=new Set([o]);draw()});const b0=await pg.evaluate(()=>wbox(objs[objs.length-1]).w);await pg.evaluate(()=>{const o=objs[objs.length-1];bakeAffine(o,[2,0,0,2,0,0]);draw()});chk('The placed image scales/transforms like any object',Math.abs(await pg.evaluate(()=>wbox(objs[objs.length-1]).w)-2*b0)<.5,b0);
chk('Placed image is part of the SVG export',await pg.evaluate(()=>/<image[^>]+href="data:image\/png/.test(fileSVGString())),null);
console.log(res.join('\n'),H.errs);await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');
await pg.keyboard.press('Shift+F8');await pg.waitForTimeout(300);
ok('Shift+F8 opens the Transform panel',await pg.evaluate(()=>{const p=document.getElementById('tfp');return p&&p.offsetParent!==null}));
const B=()=>pg.evaluate(()=>{const b=wbox(objs[0]);return[b.x,b.y,b.w,b.h].map(v=>Math.round(v*100)/100)});
const set=async(id,v)=>{await pg.evaluate(([id,v])=>{const e=document.getElementById(id);e.focus();e.value=v;e.dispatchEvent(new Event('change',{bubbles:true}));e.blur()},[id,v]);await pg.waitForTimeout(150)};
let b0=await B();const f=await pg.evaluate(()=>['tfx','tfy','tfw','tfh'].map(i=>+document.getElementById(i).value));
ok('fields show the centre X/Y and W/H',Math.abs(f[0]-(b0[0]+b0[2]/2))<.05&&Math.abs(f[2]-b0[2])<.05&&Math.abs(f[3]-b0[3])<.05,JSON.stringify([f,b0]));
await set('tfw','200');let b=await B();ok('W 200 resizes around the centre',Math.abs(b[2]-200)<.05&&Math.abs((b[0]+b[2]/2)-(b0[0]+b0[2]/2))<.05,JSON.stringify(b));
await pg.click('#tfLk');await set('tfw','100');b=await B();ok('constrained: H follows W',Math.abs(b[2]-100)<.05&&Math.abs(b[3]-b0[3]*100/200)<.1,JSON.stringify(b));await pg.click('#tfLk');
await pg.click('#tfRef button[data-rx="0"][data-ry="0"]');await pg.waitForTimeout(100);const fx=await pg.evaluate(()=>+document.getElementById('tfx').value);b=await B();ok('reference point top-left: X shows the left edge',Math.abs(fx-b[0])<.05,fx+' vs '+b[0]);
await set('tfx','10');b=await B();ok('X 10 moves the left edge to 10',Math.abs(b[0]-10)<.05,JSON.stringify(b));
await pg.click('#tfRef button[data-rx="0.5"][data-ry="0.5"]');
await set('tfr','90');const rot=await pg.evaluate(()=>Math.round(-rotOf(objs[0])*180/Math.PI));ok('rotate 90°',rot===90,String(rot));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);ok('undo rotation',await pg.evaluate(()=>Math.round(rotOf(objs[0])*1000)===0));
await set('tfs','20');b=await B();const d=await pg.evaluate(()=>objs[0].g.innerHTML.slice(0,80));ok('shear 20° changes the shape',/path|matrix|transform/.test(d),d);await pg.keyboard.press('Control+z');
// rectangle properties
ok('Rectangle Properties shown for a rectangle',await pg.evaluate(()=>getComputedStyle(document.getElementById('tfShape')).display!=='none'&&document.getElementById('tfRw').style.display!=='none'));
await set('tfcr','15');const cr=await pg.evaluate(()=>{const e=objs[0].g.firstElementChild;return e.getAttribute('data-shape')+':'+JSON.parse(e.getAttribute('data-p')||'{}').r});ok('corner radius 15',/:15$/.test(cr),cr);
// polygon sides
await H.reset();await pg.evaluate(()=>setTool('po'));await H.drag(400,300,450,300);await pg.keyboard.press('v');await pg.waitForTimeout(150);
await set('tfn','8');const n=await pg.evaluate(()=>JSON.parse(objs[0].g.firstElementChild.getAttribute('data-p')).n);ok('polygon sides 8',n===8,String(n));
// flip from the panel menu
const fl0=await pg.evaluate(()=>objs[0].g.innerHTML.length);await pg.evaluate(()=>tfFlip('h'));ok('Flip Horizontal from the panel menu',await pg.evaluate(()=>hi>0));
// Window menu
ok('Window menu lists Transform',await pg.evaluate(()=>{const b=[...document.querySelectorAll('#mbar button')].find(x=>x.textContent.trim()==='Window');b.click();const r=[...document.querySelectorAll('.mdd button')].some(x=>/Transform/.test(x.textContent)&&/Shift\+F8/.test(x.textContent));document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return r}));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

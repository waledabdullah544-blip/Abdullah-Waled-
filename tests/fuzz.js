const L=require('./lib.js');
const SEED=+(process.argv[2]||1),STEPS=+(process.argv[3]||150);
let seed=SEED;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};const pick=a=>a[Math.floor(rnd()*a.length)];
(async()=>{const H=await L.open(),pg=H.pg;const log=[];let viol=0;
await pg.evaluate(()=>{DK.open('layers');DK.open('swatches');DK.open('appearance')});await pg.waitForTimeout(400);
const inv=()=>pg.evaluate(()=>{const bad=[];const kids=[...layer.children];
 if(kids.length!==objs.length)bad.push('layer DOM children '+kids.length+' != objs '+objs.length);
 objs.forEach((o,i)=>{if(!o.g.isConnected)bad.push('obj '+i+' detached');const hid=o.g.style.display==='none'&&!o.lh,l=lyBy&&lyBy(o.ly);
   if(!hid){let b;try{b=o.g.getBBox()}catch(_){b=null}if(b&&b.width===0&&b.height===0&&o.g.querySelector('rect,path,ellipse,text,image'))bad.push('obj '+i+' has an empty bbox');}
   const e=o.g.querySelector('rect,path,ellipse');if(e){const f=e.getAttribute('fill'),s=e.getAttribute('stroke');if((f==='none'||f==null)&&(s==='none'||s==null)&&!o.g.querySelector('text,image,[data-clipmask]')&&!o.g.querySelector('g'))bad.push('obj '+i+' has no fill and no stroke (invisible)')}});
 const lr=[...document.querySelectorAll('#lyl .lyr.L')],allOpen=lr.length&&lr.every(r=>/▾/.test((r.querySelector('.ar')||{}).textContent||'')||true);
 const rows=document.querySelectorAll('#lyl .lyr.O').length;if(rows!==objs.length&&document.getElementById('lyl')&&document.getElementById('lyl').offsetParent)bad.push('Layers panel shows '+rows+' object rows but the document has '+objs.length+' objects');
 return bad});
const ops=[
 ['draw rect',async()=>{await pg.keyboard.press('Escape');await pg.keyboard.press('m');const x=200+rnd()*400,y=150+rnd()*250;await H.drag(x,y,x+40+rnd()*120,y+30+rnd()*100)}],
 ['draw ellipse',async()=>{await pg.keyboard.press('Escape');await pg.keyboard.press('l');const x=200+rnd()*400,y=150+rnd()*250;await H.drag(x,y,x+40+rnd()*120,y+30+rnd()*100)}],
 ['draw polygon',async()=>{await pg.evaluate(()=>setTool('po'));const x=300+rnd()*300,y=250+rnd()*150;await H.drag(x,y,x+50,y)}],
 ['draw star',async()=>{await pg.evaluate(()=>setTool('sr'));const x=300+rnd()*300,y=250+rnd()*150;await H.drag(x,y,x,y+50)}],
 ['draw pen path',async()=>{await pg.keyboard.press('p');const x=200+rnd()*300,y=150+rnd()*250;await H.click(x,y);await H.click(x+100,y+30);await H.click(x+60,y+90);await pg.keyboard.press('Escape')}],
 ['pencil',async()=>{await pg.evaluate(()=>setTool('pc'));const x=200+rnd()*300,y=150+rnd()*250;await pg.mouse.move(H.R.x+x,H.R.y+y);await pg.mouse.down();for(let i=1;i<12;i++)await pg.mouse.move(H.R.x+x+i*10,H.R.y+y+Math.sin(i)*12);await pg.mouse.up()}],
 ['select all',async()=>{await pg.keyboard.press('v');await pg.keyboard.press('Control+a')}],
 ['click select',async()=>{await pg.keyboard.press('v');await H.click(200+rnd()*400,150+rnd()*250)}],
 ['swatch fill',async()=>{const x=1230+Math.floor(rnd()*14)*19,y=672+Math.floor(rnd()*4)*19;await pg.mouse.click(x,y)}],
 ['fill via picker',async()=>{await pg.evaluate(()=>window.openColorPicker('fill'));await pg.waitForTimeout(150);await pg.fill('#cpkhex',Math.floor(rnd()*0xffffff).toString(16).padStart(6,'0'));await pg.click('.cpb button.pri').catch(()=>{})}],
 ['stroke colour (X + swatch)',async()=>{await pg.keyboard.press('x');await pg.mouse.click(1230+Math.floor(rnd()*14)*19,672);await pg.keyboard.press('x')}],
 ['fill none (/)',async()=>{await pg.keyboard.press('/')}],
 ['default colours (d)',async()=>{await pg.keyboard.press('d')}],
 ['swap fill/stroke (shift+x)',async()=>{await pg.keyboard.press('Shift+x')}],
 ['group',async()=>{await pg.keyboard.press('Control+g')}],
 ['ungroup',async()=>{await pg.keyboard.press('Control+Shift+g')}],
 ['duplicate (ctrl+c,v)',async()=>{await pg.keyboard.press('Control+c');await pg.keyboard.press('Control+v')}],
 ['bring to front',async()=>{await pg.keyboard.press('Control+Shift+]')}],
 ['send to back',async()=>{await pg.keyboard.press('Control+Shift+[')}],
 ['hide (ctrl+3)',async()=>{await pg.evaluate(()=>{const e=new KeyboardEvent('keydown',{key:'3',code:'Digit3',ctrlKey:true,bubbles:true});document.dispatchEvent(e)})}],
 ['show all (ctrl+alt+3)',async()=>{await pg.evaluate(()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'3',code:'Digit3',ctrlKey:true,altKey:true,bubbles:true}))})}],
 ['lock sel (ctrl+2)',async()=>{await pg.evaluate(()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'2',code:'Digit2',ctrlKey:true,bubbles:true}))})}],
 ['unlock all (ctrl+alt+2)',async()=>{await pg.evaluate(()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'2',code:'Digit2',ctrlKey:true,altKey:true,bubbles:true}))})}],
 ['move with arrows',async()=>{for(let i=0;i<3;i++)await pg.keyboard.press(pick(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']))}],
 ['scale via panel',async()=>{await pg.evaluate(()=>{const w=document.getElementById('prw');if(w&&w.offsetParent){w.value=String(20+Math.floor(rnd0()*200));w.dispatchEvent(new Event('input',{bubbles:true}));w.dispatchEvent(new Event('change',{bubbles:true}))}function rnd0(){return Math.random()}})}],
 ['opacity via panel',async()=>{await pg.evaluate(()=>{const w=document.getElementById('prop');if(w&&w.offsetParent){w.value=String(10+Math.floor(Math.random()*90));w.dispatchEvent(new Event('input',{bubbles:true}));w.dispatchEvent(new Event('change',{bubbles:true}))}})}],
 ['stroke weight via panel',async()=>{await pg.evaluate(()=>{const w=document.getElementById('prsw');if(w&&w.offsetParent){w.value=String(Math.floor(Math.random()*12));w.dispatchEvent(new Event('input',{bubbles:true}));w.dispatchEvent(new Event('change',{bubbles:true}))}})}],
 ['layers: new layer',async()=>{await pg.click('#lyNew').catch(()=>{})}],
 ['layers: click a row',async()=>{const rows=await pg.$$('#lyl .lyr');if(rows.length)await pick(rows).click({position:{x:90,y:8}}).catch(()=>{})}],
 ['layers: toggle an eye',async()=>{const e=await pg.$$('#lyl .lyr .ey');if(e.length)await pick(e).click().catch(()=>{})}],
 ['layers: toggle a lock',async()=>{const e=await pg.$$('#lyl .lyr .lk');if(e.length)await pick(e).click().catch(()=>{})}],
 ['layers: drag a row',async()=>{const rows=await pg.$$('#lyl .lyr');if(rows.length>1){const a=await pick(rows).boundingBox(),b=await pick(rows).boundingBox();if(a&&b){await pg.mouse.move(a.x+80,a.y+8);await pg.mouse.down();await pg.mouse.move(b.x+80,b.y+8,{steps:5});await pg.mouse.up()}}}],
 ['layers: new sublayer',async()=>{await pg.click('#lySub').catch(()=>{})}],
 ['layers: collapse/expand',async()=>{const e=await pg.$$('#lyl .lyr .ar');if(e.length)await pick(e).click().catch(()=>{})}],
 ['clipping mask',async()=>{await pg.keyboard.press('Control+7')}],
 ['release clip',async()=>{await pg.keyboard.press('Control+Alt+7')}],
 ['compound path',async()=>{await pg.keyboard.press('Control+8')}],
 ['release compound',async()=>{await pg.keyboard.press('Control+Alt+8')}],
 ['isolate (dbl-click)',async()=>{await pg.keyboard.press('v');await pg.mouse.dblclick(H.R.x+250+rnd()*300,H.R.y+200+rnd()*100)}],
 ['esc',async()=>{await pg.keyboard.press('Escape')}],
 ['pathfinder button',async()=>{await pg.evaluate(()=>{DK.open('pathfinder')});const b=await pg.$$('#pfp button[data-pf]');if(b.length)await pick(b).click().catch(()=>{})}],
 ['delete',async()=>{await pg.keyboard.press('Delete')}],
 ['undo',async()=>{await pg.keyboard.press('Control+z')}],
 ['redo',async()=>{await pg.keyboard.press('Control+Shift+z')}],
 ['outline toggle off',async()=>{await pg.evaluate(()=>{cv.classList.remove('outlv');view()})}],
 ['zoom out',async()=>{await pg.mouse.move(H.R.x+600,H.R.y+300);await pg.keyboard.down('Control');await pg.mouse.wheel(0,400);await pg.keyboard.up('Control')}],
 ['zoom in',async()=>{await pg.mouse.move(H.R.x+600,H.R.y+300);await pg.keyboard.down('Control');await pg.mouse.wheel(0,-400);await pg.keyboard.up('Control')}]
];
let prev=await pg.evaluate(()=>objs.length);
for(let s=0;s<STEPS;s++){const [name,f]=pick(ops);const before=await pg.evaluate(()=>({n:objs.length,vis:objs.filter(o=>o.g.style.display!=='none').length}));
  try{await f()}catch(e){log.push('step '+s+' '+name+' threw '+String(e.message).slice(0,80));continue}
  await pg.waitForTimeout(40);
  const bad=await inv();const after=await pg.evaluate(()=>({n:objs.length,vis:objs.filter(o=>o.g.style.display!=='none').length}));
  log.push(s+': '+name+'  objs '+before.n+'->'+after.n);
  if(bad.length){viol++;console.log('VIOLATION at step '+s+' after "'+name+'": '+bad.slice(0,3).join('; '));console.log('last ops:\n  '+log.slice(-6).join('\n  '));if(viol>=3)break}
}
console.log('errs',H.errs.slice(0,5));console.log('seed',SEED,'steps',STEPS,'violations',viol);await H.b.close()})();

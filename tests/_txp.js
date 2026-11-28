const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(300,200,480,330);await pg.keyboard.press('v');
await pg.evaluate(()=>setTool('at'));await pg.waitForTimeout(150);
const b=await pg.evaluate(()=>{const b=wbox(objs[0]);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});
await H.click(b.x+b.w/2,b.y);await pg.waitForTimeout(250);
await pg.keyboard.type('Hello world typing here ',{delay:5});
// paste
await pg.evaluate(()=>{const dt=new DataTransfer();dt.setData('text/plain','Pasted text that is quite long and should wrap inside the frame nicely without overlapping anything at all. مرحبا بالعالم نص ملصوق طويل');const ev=new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true});const t=document.activeElement;console.log('active',t&&t.id);t.dispatchEvent(ev);if(!ev.defaultPrevented)document.execCommand('insertText',false,dt.getData('text/plain'))});
await pg.waitForTimeout(500);
const info=()=>pg.evaluate(()=>{const o=objs[objs.length-1];const fr=wbox(o);return{fr:[fr.x,fr.y,fr.w,fr.h].map(Math.round),lines:[...o.g.querySelectorAll('text tspan')].slice(0,30).map(t=>{let bb;try{bb=t.getBBox()}catch(_){}return[t.getAttribute('x'),t.getAttribute('y'),bb&&Math.round(bb.x),bb&&Math.round(bb.width),t.textContent.slice(0,25)]}),ted:document.activeElement.id}});
console.log(JSON.stringify(await info(),null,0));
await pg.screenshot({path:'/tmp/mdl/txp1.png',clip:{x:H.R.x+250,y:H.R.y+150,width:350,height:300}});
await pg.keyboard.press('Escape');await pg.waitForTimeout(300);
console.log(JSON.stringify(await info()));
await pg.screenshot({path:'/tmp/mdl/txp2.png',clip:{x:H.R.x+250,y:H.R.y+150,width:350,height:300}});
console.log(H.errs);await H.b.close()})();

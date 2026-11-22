const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const S=()=>H.state(),L=async()=>{const s=await S();return s.o[s.o.length-1]};
// polygon / star defaults
await H.pg.evaluate(()=>setTool('po'));await H.drag(300,300,360,300);
console.log('polygon d=',await H.pg.evaluate(()=>objs[0].g.querySelector('path,polygon').outerHTML.slice(0,200)));await H.reset();
await H.pg.evaluate(()=>setTool('sr'));await H.drag(300,300,360,300);
console.log('star d=',await H.pg.evaluate(()=>objs[0].g.querySelector('path,polygon').outerHTML.slice(0,260)));await H.reset();
// selection tool
await H.key('m');await H.drag(100,100,200,180);await H.key('v');
let a=await L();
await H.drag(150,140,250,190);let b=await L();
chk('V drag moves by (100,50)',Math.abs(b.x-a.x-100)<1.5&&Math.abs(b.y-a.y-50)<1.5,{a,b});
await H.drag(250,190,350,215,['Shift']);let c=await L();
chk('V Shift+drag constrains to axis (horizontal here)',Math.abs(c.y-b.y)<1.5&&c.x-b.x>50,{b,c});
await H.drag(250,190,330,190,['Alt']);let s=await S();
chk('V Alt+drag duplicates (n=2)',s.n===2,s.n);
await H.pg.keyboard.press('Control+z');await H.pg.waitForTimeout(60);s=await S();
chk('undo duplicate (n=1)',s.n===1,s.n);
// arrows
const before=await L();await H.key('ArrowRight');await H.key('ArrowRight');await H.pg.keyboard.press('Shift+ArrowDown');await H.pg.waitForTimeout(60);const after=await L();
const z=await H.pg.evaluate(()=>z);
chk('arrow 1px ×2 right, Shift+Down 10px',Math.abs(after.x-before.x-2*z)<0.6&&Math.abs(after.y-before.y-10*z)<0.6,{before,after,z});
// scale handle: bottom-right handle drag with Shift keeps ratio
await H.reset();await H.key('m');await H.drag(100,100,200,150);await H.key('v');
const hnd=await H.pg.evaluate(()=>{const e=[...document.querySelectorAll('#selg [data-h]')].map(r=>({k:r.dataset.h,...(r=>({x:r.left,y:r.top,w:r.width,h:r.height}))(r.getBoundingClientRect())}));return e});
const se=hnd.find(h=>h.k==='se');
if(!se)chk('handles exist',false,hnd);else{const cx=se.x+se.w/2-H.R.x,cy=se.y+se.h/2-H.R.y;
 await H.drag(cx,cy,cx+60,cy+10,['Shift']);const o=await L();chk('scale Shift keeps ratio 2:1',Math.abs(o.w/o.h-2)<0.05,o);
 await H.pg.keyboard.press('Control+z');await H.pg.waitForTimeout(60);
 const o2=await L();const hnd2=await H.pg.evaluate(()=>[...document.querySelectorAll('#selg [data-h=se]')].map(r=>{const b=r.getBoundingClientRect();return{x:b.left+b.width/2,y:b.top+b.height/2}})[0]);
 await H.drag(hnd2.x-H.R.x,hnd2.y-H.R.y,hnd2.x-H.R.x+40,hnd2.y-H.R.y+20,['Alt']);const o3=await L();
 chk('scale Alt from center (center stays)',Math.abs((o3.x+o3.w/2)-(o2.x+o2.w/2))<1.5&&Math.abs((o3.y+o3.h/2)-(o2.y+o2.h/2))<1.5,{o2,o3});}
// marquee + Shift add + select all + delete
await H.reset();await H.key('m');await H.drag(50,50,100,100);await H.drag(200,50,250,100);await H.drag(350,50,400,100);await H.key('v');
await H.drag(30,30,270,120);s=await S();chk('marquee selects 2 of 3',s.sel===2,s.sel);
await H.click(375,75,['Shift']);s=await S();chk('Shift+click adds 3rd',s.sel===3,s.sel);
await H.click(375,75,['Shift']);s=await S();chk('Shift+click removes it (2)',s.sel===2,s.sel);
await H.click(600,500);s=await S();chk('click empty deselects',s.sel===0,s.sel);
await H.pg.keyboard.press('Control+a');await H.pg.waitForTimeout(50);s=await S();chk('Ctrl+A selects all 3',s.sel===3,s.sel);
await H.pg.keyboard.press('Control+g');await H.pg.waitForTimeout(80);s=await S();chk('Ctrl+G groups (n=1)',s.n===1,s.n);
await H.pg.keyboard.press('Control+Shift+g');await H.pg.waitForTimeout(80);s=await S();chk('Ctrl+Shift+G ungroup (n=3)',s.n===3,s.n);
await H.key('Delete');s=await S();chk('Delete removes selection',s.n===0,s.n);
await H.pg.keyboard.press('Control+z');await H.pg.waitForTimeout(60);s=await S();chk('undo delete (n=3)',s.n===3,s.n);
await H.pg.keyboard.press('Control+Shift+z');await H.pg.waitForTimeout(60);s=await S();chk('redo delete (n=0)',s.n===0,s.n);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

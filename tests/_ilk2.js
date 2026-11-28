const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');
const list=await pg.evaluate(()=>Object.entries(KSM.defaults()).filter(e=>e[1]));
await pg.evaluate(()=>{window.__np=null;addEventListener('keydown',e=>{if(['Control','Shift','Alt','Meta'].includes(e.key))return;window.__np=e.defaultPrevented},false)});
const skip=/^File>(Close|Exit|Print|Open|New|Place|Save|Export|Document Setup)|Hide All Panels|Hide Panels|Keyboard Shortcuts|Preferences/;
const toPw=k=>k.split('+').map(x=>x==='Ctrl'?'Control':x==='Up'?'ArrowUp':x==='Down'?'ArrowDown':x==='Left'?'ArrowLeft':x==='Right'?'ArrowRight':x==='Esc'?'Escape':x==='Space'?' ':x===','?'Comma':x==='.'?'Period':x==='['?'BracketLeft':x===']'?'BracketRight':x==='/'?'Slash':x==='\\'?'Backslash':x==='~'?'Backquote':x==='-'?'Minus':x==='='?'Equal':x===';'?'Semicolon':x==="'"?'Quote':x).join('+');
const miss=[];
for(const [p,k] of list){if(skip.test(p))continue;await pg.evaluate(()=>{window.__np=null;sel=new Set(objs);draw()});
  try{await pg.keyboard.press(toPw(k))}catch(e){miss.push(p+' '+k+' (cannot press)');continue}
  await pg.waitForTimeout(60);const np=await pg.evaluate(()=>window.__np);if(np===false)miss.push(p+'  '+k);
  await pg.keyboard.press('Escape');await pg.evaluate(()=>{document.querySelectorAll('.fxm').forEach(m=>m.remove());const d=document.getElementById('dlg');if(d)d.style.display='none';if(typeof ted_s!=='undefined'&&ted_s)finishText()});
  await pg.evaluate(()=>{if(!objs.length){const o=add('<rect x="100" y="100" width="80" height="60" fill="#fff" stroke="#000"/>');commit()}if(tool!=='v')setTool('v')})}
console.log('NOT HANDLED ('+miss.length+'):\n'+miss.join('\n'));console.log('errs',H.errs.slice(0,3));await H.b.close()})();

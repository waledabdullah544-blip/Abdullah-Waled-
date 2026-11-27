const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const st=()=>pg.evaluate(()=>objs.map(o=>{const e=o.g.querySelector('rect,path,ellipse,polygon');return{n:objs.length,tag:e&&e.tagName,fill:e&&e.getAttribute('fill'),stroke:e&&e.getAttribute('stroke'),op:o.g.style.opacity||'',disp:o.g.style.display,sel:sel.has(o),outl:cv.classList.contains('outlv')}}));
for(const [label,tool,drag] of [['rect','m',[200,150,360,280]],['ellipse','l',[400,150,560,280]],['polygon','po',[300,380,380,380]],['star','sr',[500,380,500,450]]]){
  if(tool==='po'||tool==='sr'){await pg.evaluate(t=>setTool(t),tool)}else await pg.keyboard.press(tool);
  await H.drag(...drag);await pg.waitForTimeout(200);
  console.log(label,'drawn',JSON.stringify((await st()).slice(-1)));
  // 1) colour picker dialog: set hex and press OK
  await pg.evaluate(()=>window.openColorPicker('fill'));await pg.waitForTimeout(300);
  await pg.fill('#cpkhex','2255dd');await pg.keyboard.press('Enter').catch(()=>{});await pg.waitForTimeout(150);
  const hasDlg=await pg.evaluate(()=>!!document.querySelector('.cpb'));if(hasDlg){await pg.click('.fxm button[data-k=OK]').catch(()=>{})}await pg.waitForTimeout(300);
  console.log(label,'after picker',JSON.stringify((await st()).slice(-1)));
  // 2) Color panel / swatch via API
}
await pg.screenshot({path:'/tmp/mdl/col2.png'});
console.log('errs',H.errs);await H.b.close()})();

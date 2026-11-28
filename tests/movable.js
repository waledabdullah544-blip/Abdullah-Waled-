const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
const pos=s=>pg.evaluate(s=>{const e=document.querySelector(s);if(!e||!e.offsetParent&&getComputedStyle(e).position!=='fixed')return null;const r=e.getBoundingClientRect();return r.width?[Math.round(r.left),Math.round(r.top)]:null},s);
const dragBy=async(handleSel,dx,dy)=>{const h=await pg.$(handleSel);if(!h)return'no handle';const b=await h.boundingBox();if(!b)return'hidden';const x=b.x+Math.min(30,b.width/2),y=b.y+Math.min(8,b.height/2);await pg.mouse.move(x,y);await pg.mouse.down();await pg.mouse.move(x+dx,y+dy,{steps:8});await pg.mouse.up();await pg.waitForTimeout(150);return'ok'};
let bad=0;const T=async(name,boxSel,handleSel,open)=>{if(open)await open();await pg.waitForTimeout(250);const a=await pos(boxSel);const r=await dragBy(handleSel,200,60);const b=await pos(boxSel);const mv=a&&b&&(Math.abs(b[0]-a[0])>40||Math.abs(b[1]-a[1])>30);if(!mv)bad++;console.log((mv?'PASS moves: ':'FAIL stuck: ')+name+'  '+JSON.stringify([a,b,r]))};
await pg.keyboard.press('m');await H.drag(300,200,420,300);await pg.keyboard.press('v');
await T('toolbar by its grip','nav','#tbgrip');
await T('modal dialog (Offset Path…) by title','.fxb','.fxb > b',()=>pg.evaluate(()=>window.pxDlg&&pxDlg('off')));await pg.keyboard.press('Escape');
await T('Color Picker by title','.cpb','.cpb > b',()=>pg.evaluate(()=>openColorPicker('fill')));await pg.keyboard.press('Escape');
await T('Rotate dialog (#dlg)','#dlg','#dlg b',()=>pg.evaluate(()=>openDlg('ro')));await pg.keyboard.press('Escape');
await T('Free Transform widget','#ftw','#ftw .ftgrip',()=>pg.keyboard.press('e'));await pg.keyboard.press('v');
await T('gradient stop popup','#gspop','#gspop .h b',()=>pg.evaluate(()=>{window.gradPanelOpen();document.querySelector('#grdp [data-a=make]')&&document.querySelector('#grdp [data-a=make]').click();gradStopPop(600,300)}));
await pg.keyboard.press('Escape');
// a moved dialog opens again where it was left
await pg.evaluate(()=>window.pxDlg&&pxDlg('off'));await pg.waitForTimeout(300);const p1=await pos('.fxb');await pg.keyboard.press('Escape');
const okr=p1&&Math.abs(p1[0]-810)<=2&&Math.abs(p1[1]-399)<=2;if(!okr)bad++;console.log((okr?'PASS':'FAIL')+' Offset Path reopens where it was moved',JSON.stringify(p1));
await pg.evaluate(()=>{localStorage.removeItem('masar-dlgpos');dlgPosReset()});await pg.evaluate(()=>window.pxDlg&&pxDlg('off'));await pg.waitForTimeout(300);const p2=await pos('.fxb');await pg.keyboard.press('Escape');
const okd=p2&&Math.abs(p2[0]-610)<=2;if(!okd)bad++;console.log((okd?'PASS':'FAIL')+' after reset it opens centred again',JSON.stringify(p2));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

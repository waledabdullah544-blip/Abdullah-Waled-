const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.keyboard.press('m');await H.drag(300,200,420,280);await pg.keyboard.press('l');await H.drag(350,220,460,300);
await pg.evaluate(()=>{sel=new Set(objs);draw();window.gradPanelOpen&&gradPanelOpen()});const mk=await pg.$('#grdp button[data-a=make]');if(mk)await mk.click();
const r=await pg.evaluate(()=>{const s=fileSVGString(),d=new DOMParser().parseFromString(s,'image/svg+xml'),err=d.querySelector('parsererror');return{ok:!err,len:s.length,defs:d.querySelectorAll('defs > *').length}});
console.log((r.ok&&r.defs>0?'PASS':'FAIL')+' exported SVG parses as XML with its defs',JSON.stringify(r));console.log(r.ok?'ALL OK':'FAILED');await H.b.close()})();

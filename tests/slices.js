const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(250,200,450,330);await pg.evaluate(()=>{fillables(objs[0])[0].setAttribute('fill','#e03131');commit()});
await pg.keyboard.press('Shift+k');await pg.waitForTimeout(100);ok('Shift+K = Slice Tool',await pg.evaluate(()=>tool==='slc'));
await H.drag(240,190,360,300);await pg.waitForTimeout(150);
let r=await pg.evaluate(()=>SLICES.list().map(o=>{const b=wbox(o);return[b.x,b.y,b.w,b.h].map(Math.round)}));ok('dragging draws a slice',r.length===1&&r[0][2]===120&&r[0][3]===110,JSON.stringify(r));
ok('the slice shows its number label',await pg.evaluate(()=>[...selg.querySelectorAll('.slbl text')].some(t=>t.textContent==='01')));
ok('slices are not part of the exported artwork',await pg.evaluate(()=>!/data-slice/.test(fileSVGString())&&/#e03131/.test(fileSVGString())));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(100);ok('Undo',await pg.evaluate(()=>SLICES.list().length===0));
// Object > Slice > Make from selection, divide
await pg.keyboard.press('v');await pg.evaluate(()=>{sel=new Set([objs[0]]);SLICES.makeFromSel()});ok('Make from selection = same bounds as the artwork',await pg.evaluate(()=>{const s=SLICES.list()[0],a=wbox(objs[0]),b=wbox(s);return Math.abs(a.w-b.w)<1.5&&Math.abs(a.h-b.h)<1.5}));
await pg.evaluate(()=>SLICES.divide());await pg.waitForTimeout(150);await pg.keyboard.press('Enter');await pg.waitForTimeout(150);ok('Divide Slice 2×2 = 4 slices',await pg.evaluate(()=>SLICES.list().length===4));
// export: a zip with 4 PNGs whose first one is red (top-left of the red rectangle)
const z=await pg.evaluate(async()=>{const b=await SLICES.exportSlices(1);const u=new Uint8Array(await b.arrayBuffer());let n=0;for(let i=0;i<u.length-4;i++)if(u[i]===0x50&&u[i+1]===0x4b&&u[i+2]===3&&u[i+3]===4)n++;
  /* first PNG: find its data and check a pixel */let p=u.indexOf(0x89);const end=u.length;const png=u.slice(p,end);const bl=new Blob([png],{type:'image/png'}),i=new Image();i.src=URL.createObjectURL(bl);try{await i.decode()}catch(e){return{n,dec:false}}const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);const d=x.getImageData(i.width>>1,i.height>>1,1,1).data;return{n,w:i.width,h:i.height,px:[...d]}});
ok('Export Slices: one ZIP with a PNG per slice',z.n===4,JSON.stringify(z));ok('the slice PNG has the artwork in it',z.px&&z.px[0]>200&&z.px[1]<80,JSON.stringify(z.px));
await pg.evaluate(()=>{setTool('slcs')});const bb=await pg.evaluate(()=>{const b=wbox(SLICES.list()[0]);return[b.x*z+px+5,b.y*z+py+5]});await H.drag(bb[0],bb[1],bb[0]+30,bb[1]+20);await pg.waitForTimeout(150);
ok('Slice Selection moves a slice only',await pg.evaluate(()=>{const s=SLICES.list()[0],b=wbox(s),a=wbox(objs[0]);return Math.round(b.x-a.x)===30}));
await pg.evaluate(()=>SLICES.delAll());ok('Delete All',await pg.evaluate(()=>SLICES.list().length===0&&objs.length===1));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

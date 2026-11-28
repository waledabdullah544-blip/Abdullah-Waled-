const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
await pg.keyboard.press('m');await H.drag(250,150,450,350);await pg.evaluate(()=>{fillables(objs[0])[0].setAttribute('fill','#3a3a3a');commit();draw()});
await pg.keyboard.press('u');await pg.waitForTimeout(100);ok('U = Mesh Tool',await pg.evaluate(()=>tool==='mesh'));
await pg.evaluate(()=>{DEF.fill='#f0c374'});await H.click(350,250);await pg.waitForTimeout(250);
let r=await pg.evaluate(()=>{const M=MESH.getM(objs[0]);return M&&{r:M.r,c:M.c,n:M.P.length,mid:M.P[4][2],img:!!objs[0].g.querySelector('image[data-meshimg]')}});
ok('click inside a shape makes a 2x2 mesh, the new point gets the fill colour',r&&r.r===2&&r.c===2&&r.n===9&&r.mid==='#f0c374'&&r.img,JSON.stringify(r));
await pg.evaluate(()=>{sel=new Set();draw()});await pg.screenshot({path:'/tmp/mdl/mesh_px.png'});
const cc=require('child_process').execSync("python3 -c \"from PIL import Image;im=Image.open('/tmp/mdl/mesh_px.png').convert('RGB');print(im.getpixel(("+Math.round(H.R.x+350)+","+Math.round(H.R.y+250)+")),im.getpixel(("+Math.round(H.R.x+256)+","+Math.round(H.R.y+156)+")))\"").toString().match(/\d+/g).map(Number);
ok('the colour field is gold in the middle and dark at the corner',cc[0]>200&&cc[1]>160&&cc[3]<110,JSON.stringify(cc));
await pg.evaluate(()=>{sel=new Set(objs);draw()});
// drag the middle point
await H.drag(350,250,380,270);await pg.waitForTimeout(200);ok('dragging a mesh point moves it',await pg.evaluate(()=>{const M=MESH.getM(objs[0]),q=M.P[4],b=objs[0];return Math.round(q[0]*b.m.sx+b.m.tx)===Math.round((380-px)/z)}));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);ok('Undo puts it back',await pg.evaluate(()=>{const q=MESH.getM(objs[0]).P[4];return Math.round(q[0]*objs[0].m.sx+objs[0].m.tx)===Math.round((350-px)/z)}));
// select a corner point and colour it from a swatch
await H.click(250,150);await pg.waitForTimeout(100);await pg.evaluate(()=>applyStyle({fill:'#2f9e44'},true));await pg.waitForTimeout(200);
ok('a selected point takes the swatch colour',await pg.evaluate(()=>MESH.getM(objs[0]).P[0][2]==='#2f9e44'));
// Alt+click removes lines
await pg.keyboard.down('Alt');await H.click(350,250);await pg.keyboard.up('Alt');await pg.waitForTimeout(200);ok('Alt+click on the middle point removes its lines',await pg.evaluate(()=>{const M=MESH.getM(objs[0]);return M.r===1&&M.c===1}));
// create gradient mesh dialog + release
await pg.evaluate(()=>{sel=new Set(objs);MESH.createDlg()});await pg.waitForTimeout(150);await pg.selectOption('.fxb [data-k=a]','center');await pg.click('.fxb button.pri');await pg.waitForTimeout(250);
ok('Object > Create Gradient Mesh 4x4 to center',await pg.evaluate(()=>{const M=MESH.getM(objs[0]);return M.r===4&&M.c===4&&M.P.length===25}));
await pg.evaluate(()=>MESH.expand());ok('Release Gradient Mesh gives a plain fill back',await pg.evaluate(()=>!MESH.getM(objs[0])&&!objs[0].g.querySelector('image[data-meshimg]')));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);ok('Undo brings the mesh and its picture back',await pg.evaluate(()=>!!MESH.getM(objs[0])&&!!objs[0].g.querySelector('image[data-meshimg]')));
ok('SVG export contains the mesh picture',await pg.evaluate(()=>/data-meshimg|<image/.test(fileSVGString())));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

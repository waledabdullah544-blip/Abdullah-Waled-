const L=require('./lib.js'),fs=require('fs');
(async()=>{const H=await L.open({launch:{args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']},page:{ignoreHTTPSErrors:true}}),pg=H.pg,ctx=pg.context();let bad=0;const ok=(n,c)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)bad++};
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const f='/tmp/mdl/tf/'+r.request().url().split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
const b64=fs.readFileSync('/tmp/mdl/p_portrait-of-woman_small.jpg').toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const o=add('<image href="'+u+'" x="100" y="100" width="360" height="450" preserveAspectRatio="none"/>');sel=new Set([o]);window.__o=o;commit();draw()},b64);
await pg.waitForTimeout(300);await pg.selectOption('#rbctx .rbmd','fast');await pg.click('#rbctx .rbgo');
await pg.waitForFunction(()=>!window.RBAI.busy&&window.RBMASK.masked(__o),null,{timeout:200000});await pg.waitForTimeout(800);
ok('AI mask created',await pg.evaluate(()=>RBMASK.masked(__o)));
const alphaAt=(fx,fy)=>pg.evaluate(async([fx,fy])=>{const P=RBMASK.parts(__o.g),im=new Image();im.src=P.out.getAttribute('href');await im.decode();const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.drawImage(im,0,0);return x.getImageData(Math.round(fx*c.width),Math.round(fy*c.height),1,1).data[3]},[fx,fy]);
const centre=await alphaAt(.5,.55);ok('face centre opaque before edit '+centre,centre>240);
await pg.click('#rbctx .rbed');await pg.waitForTimeout(800);
ok('edit session active, panel + capture shown',await pg.evaluate(()=>window.rbEditing()&&getComputedStyle(document.getElementById('rbed')).display==='block'&&getComputedStyle(document.getElementById('rbcap')).display==='block'));
const scr=await pg.evaluate(()=>{const b=wbox(__o);return{x:b.x*z+px,y:b.y*z+py,w:b.w*z,h:b.h*z}});
const R=H.R,cx=R.x+scr.x+scr.w*.5,cy=R.y+scr.y+scr.h*.55;
// big hide stroke across the face centre with the real mouse
await pg.evaluate(()=>{const s=document.querySelector('#rbed [data-k=size]');s.value=120;s.dispatchEvent(new Event('input',{bubbles:true}))});
await pg.mouse.move(cx-40,cy);await pg.mouse.down();await pg.mouse.move(cx,cy,{steps:6});await pg.mouse.move(cx+40,cy,{steps:6});await pg.mouse.up();
await pg.waitForTimeout(1500);
let a=await alphaAt(.5,.55);ok('hide stroke makes centre transparent '+a,a<30);
await pg.keyboard.press('Control+z');await pg.waitForTimeout(1500);a=await alphaAt(.5,.55);ok('undo restores centre '+a,a>240);
await pg.keyboard.press('Control+Shift+z');await pg.waitForTimeout(1500);a=await alphaAt(.5,.55);ok('redo hides again '+a,a<30);
// reveal with X
await pg.keyboard.press('x');await pg.mouse.move(cx-40,cy);await pg.mouse.down();await pg.mouse.move(cx+40,cy,{steps:10});await pg.mouse.up();await pg.waitForTimeout(1500);
a=await alphaAt(.5,.55);ok('reveal stroke restores centre '+a,a>200);
// edge sliders: detail + shift + feather (release = change event)
const before=await pg.evaluate(()=>RBMASK.parts(__o.g).mk.getAttribute('data-rbm'));
for(const [k,v] of [['detail',16],['shift',10],['feather',3]]){await pg.evaluate(([k,v])=>{const s=document.querySelector('#rbed [data-k='+k+']');s.value=v;s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}))},[k,v]);await pg.waitForTimeout(1800)}
const after=await pg.evaluate(()=>RBMASK.parts(__o.g).mk.getAttribute('data-rbm'));ok('edge refinement creates new mask versions',before!==after);
// colour fringe removal
await pg.evaluate(()=>{const s=document.querySelector('#rbed [data-k=dc]');s.value=90;s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}))});await pg.waitForTimeout(2500);
ok('dc attribute stored',await pg.evaluate(()=>RBMASK.parts(__o.g).mk.getAttribute('data-rbdc'))==='90');
await pg.screenshot({path:'/tmp/mdl/p3_edit.png'});
await pg.keyboard.press('Enter');await pg.waitForTimeout(1500);
ok('Enter ends session, out visible',await pg.evaluate(()=>!window.rbEditing()&&RBMASK.parts(__o.g).out.style.display!=='none'&&getComputedStyle(document.getElementById('rbed')).display==='none'));
ok('bar back to Mask: On',await pg.evaluate(()=>document.querySelector('#rbctx .rbtg').textContent==='Mask: On'));
// undo all the way: must never leave display:none in the DOM
await pg.keyboard.press('Control+z');await pg.waitForTimeout(800);
ok('no display:none leaked after undo',await pg.evaluate(()=>!/display:\s*none/.test(RBMASK.parts(__o.g).out.outerHTML)));
await pg.screenshot({path:'/tmp/mdl/p3_done.png'});
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});

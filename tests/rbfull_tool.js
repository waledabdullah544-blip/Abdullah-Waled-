const {chromium}=require('playwright'),fs=require('fs');
const html=process.argv[2],model=process.argv[3]||'pro',imf=process.argv[4]||'/tmp/mdl/afro.jpg',out=process.argv[5]||'/tmp/mdl/full.png',crop=(process.argv[6]||'0.25,0.02,0.5,0.35').split(',').map(Number);
(async()=>{const b=await chromium.launch({args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']}),pg=await b.newPage({viewport:{width:1500,height:900},ignoreHTTPSErrors:true}),ctx=pg.context();
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const f='/tmp/mdl/tf/'+r.request().url().split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
const errs=[];pg.on('pageerror',e=>errs.push(String(e)));
await pg.goto('file://'+html);await pg.waitForTimeout(700);
const b64=fs.readFileSync(imf).toString('base64');
await pg.evaluate(async b=>{const u='data:image/jpeg;base64,'+b;const i=new Image();i.src=u;await i.decode();const w=i.naturalWidth,h=i.naturalHeight,k=Math.min(1,500/Math.max(w,h));const o=add('<image href="'+u+'" x="100" y="100" width="'+w*k+'" height="'+h*k+'" preserveAspectRatio="none"/>');commit();sel=new Set([o]);draw()},b64);
await pg.waitForTimeout(300);await pg.selectOption('#rbctx .rbmd',model);const t0=Date.now();await pg.click('#rbctx .rbgo');await pg.waitForTimeout(1000);
const msgs=new Set();while(true){const s=await pg.evaluate(()=>({b:window.RBAI?RBAI.busy:RB.busy,st:(document.querySelector('#rbctx .rbst')||{}).textContent}));if(s.st)msgs.add(s.st.replace(/\d+/g,'#'));if(!s.b)break;await pg.waitForTimeout(1500)}
await pg.waitForTimeout(1500);
const png=await pg.evaluate(async c=>{const im=document.querySelector('image[data-rbo]');const i=new Image();i.src=im.getAttribute('href');await i.decode();const W=i.naturalWidth,H=i.naturalHeight,sx=c[0]*W,sy=c[1]*H,sw=c[2]*W,sh=c[3]*H,ow=700,oh=Math.round(sh*ow/sw);
  const cv=document.createElement('canvas');cv.width=ow;cv.height=oh;const x=cv.getContext('2d');for(let yy=0;yy<oh;yy+=10)for(let xx=0;xx<ow;xx+=10){x.fillStyle=((xx+yy)/10)%2?'#9ad':'#fff';x.fillRect(xx,yy,10,10)}x.drawImage(i,sx,sy,sw,sh,0,0,ow,oh);return{d:cv.toDataURL(),W,H}},crop);
fs.writeFileSync(out,Buffer.from(png.d.split(',')[1],'base64'));console.log('secs',((Date.now()-t0)/1000).toFixed(0),'out',png.W+'x'+png.H,[...msgs].join(' | ').slice(0,300),'errs',errs);await b.close()})();

const L=require('./lib.js'),fs=require('fs');
const models=(process.argv[2]||'pro,balanced').split(','),imgs=(process.argv[3]||'ex,8dc5adf3-image,afro').split(',');
(async()=>{const H=await L.open({launch:{args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']},page:{ignoreHTTPSErrors:true}}),pg=H.pg,ctx=pg.context();
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const f='/tmp/mdl/tf/'+r.request().url().split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
pg.on('console',m=>{if(/error/i.test(m.type()))console.log('CONSOLE',m.text().slice(0,200))});
for(const im of imgs){const b64=fs.readFileSync('/tmp/mdl/'+im+'.jpg').toString('base64');
  for(const md of models){const t0=Date.now();
    const r=await pg.evaluate(async([b,md])=>{const i=new Image();i.src='data:image/jpeg;base64,'+b;await i.decode();try{const res=await rbRun(i,md,null);
      const c=document.createElement('canvas'),W=Math.min(600,i.naturalWidth),Hh=Math.round(i.naturalHeight*W/i.naturalWidth);c.width=W*2;c.height=Hh;const x=c.getContext('2d');
      for(let yy=0;yy<Hh;yy+=12)for(let xx=0;xx<W;xx+=12){x.fillStyle=((xx+yy)/12)%2?'#ccc':'#fff';x.fillRect(W+xx,yy,12,12);x.fillRect(xx,yy,12,12)}
      const m=document.createElement('canvas');m.width=res.w;m.height=res.h;const mx=m.getContext('2d'),id=mx.createImageData(res.w,res.h);for(let k=0;k<res.data.length;k++){id.data[k*4]=id.data[k*4+1]=id.data[k*4+2]=255;id.data[k*4+3]=res.data[k]}mx.putImageData(id,0,0);
      const o=document.createElement('canvas');o.width=W;o.height=Hh;const ox=o.getContext('2d');ox.drawImage(i,0,0,W,Hh);ox.globalCompositeOperation='destination-in';ox.drawImage(m,0,0,W,Hh);
      x.drawImage(o,W,0);const mm=document.createElement('canvas');mm.width=W;mm.height=Hh;const mmx=mm.getContext('2d');mmx.fillStyle='#000';mmx.fillRect(0,0,W,Hh);mmx.drawImage(m,0,0,W,Hh);x.drawImage(mm,0,0);
      let s=0,h=0;for(const v of res.data){s+=v;if(v>20&&v<235)h++}return{png:c.toDataURL('image/png'),mean:Math.round(s/res.data.length),soft:+(h/res.data.length*100).toFixed(1),dev:res.dev}}catch(e){return{err:String(e.message||e)}}},[b64,md]);
    if(r.err){console.log(im,md,'ERROR',r.err);continue}
    fs.writeFileSync('/tmp/mdl/cmp_'+im+'_'+md+'.png',Buffer.from(r.png.split(',')[1],'base64'));console.log(im,md,((Date.now()-t0)/1000).toFixed(0)+'s','mean',r.mean,'soft%',r.soft,r.dev)}}
await H.b.close()})();

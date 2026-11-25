const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']}),pg=await b.newPage({ignoreHTTPSErrors:true});
await pg.route('https://cdn.jsdelivr.net/**',r=>{const f='/tmp/mdl/ort/'+r.request().url().split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:/js|mjs$/.test(f)?'text/javascript':'application/wasm',headers:{'access-control-allow-origin':'*'}})});
pg.on('console',m=>{const t=m.text();if(!/W:onnx/.test(t))console.log('C',t.slice(0,300))});
await pg.goto('file:///home/user/Abdullah-Waled-/masar.html');
console.log(await pg.evaluate(async()=>{
 await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/ort.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
 ort.env.wasm.wasmPaths='https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/';ort.env.wasm.numThreads=1;
 const buf=await (await fetch('https://huggingface.co/onnx-community/BiRefNet_lite-ONNX/resolve/main/onnx/model.onnx')).arrayBuffer();
 const out=[];for(const opt of [{graphOptimizationLevel:'disabled',enableCpuMemArena:false,enableMemPattern:false}]){
  try{const t0=performance.now();const s=await ort.InferenceSession.create(buf,{executionProviders:['wasm'],...opt});out.push('created '+Math.round(performance.now()-t0));
   for(const S of [1024]){try{const x=new ort.Tensor('float32',new Float32Array(3*S*S).fill(.1),[1,3,S,S]);const r=await s.run({input_image:x});out.push(JSON.stringify(opt)+' S'+S+' ok '+r[s.outputNames[0]].dims)}catch(e){out.push(JSON.stringify(opt)+' S'+S+' ERR '+(e.message||e))}}}
  catch(e){out.push('create ERR '+(e.message||e))}}
 return out.join('\n')}));await b.close()})()

const L=require('./lib.js'),fs=require('fs');
(async()=>{
const H=await L.open({launch:{args:['--host-resolver-rules=MAP huggingface.co 127.0.0.1:8443','--no-sandbox']},page:{ignoreHTTPSErrors:true}}),pg=H.pg,ctx=pg.context();
const ct=f=>/\.(js|mjs)$/.test(f)?'text/javascript':/wasm$/.test(f)?'application/wasm':'application/octet-stream';
await ctx.route('https://cdn.jsdelivr.net/**',r=>{const u=r.request().url(),dir=/onnxruntime-web@1\.20\.1/.test(u)?'/tmp/mdl/ort/':'/tmp/mdl/tf/',f=dir+u.split('/').pop().split('?')[0];if(!fs.existsSync(f))return r.fulfill({status:404,body:'no'});r.fulfill({body:fs.readFileSync(f),contentType:ct(f),headers:{'access-control-allow-origin':'*'}})});
const b64=fs.readFileSync('/tmp/mdl/lowres.jpg').toString('base64');
for(const model of ['faithful','general']){
const r=await pg.evaluate(async([b,m])=>{const blob=await (await fetch('data:image/jpeg;base64,'+b)).blob();const out=[];for(let i=0;i<2;i++){const t0=performance.now();let n=0;const res=await RBUP.run(blob,{model:m,scale:4,strength:1},p=>{if(p.phase==='tile')n=p.n});out.push({ms:Math.round(performance.now()-t0),tiles:n,dev:res.dev})}return out},[b64,model]);
console.log(model,JSON.stringify(r));}
await H.b.close()})();

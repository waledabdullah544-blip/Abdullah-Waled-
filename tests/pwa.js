// Serves the built site over http (like Cloudflare Pages) and checks the app parts: manifest, offline, file save.
const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path'),{execSync}=require('child_process');
(async()=>{let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
const root=path.resolve(__dirname,'..');execSync('bash build.sh',{cwd:root});const dist=path.join(root,'dist');
const red=fs.readFileSync(path.join(dist,'_redirects'),'utf8');ok('_redirects serves masar.html at /',/^\/\s+\/masar\.html\s+200/m.test(red));
const T={'.html':'text/html','.js':'text/javascript','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml','.onnx':'application/octet-stream'};
let online=true;const srv=http.createServer((q,r)=>{if(!online){q.socket.destroy();return}let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/masar.html';const f=path.join(dist,p);
  if(!f.startsWith(dist)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+srv.address().port+'/';
const b=await chromium.launch(),ctx=await b.newContext({viewport:{width:1400,height:850}}),pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(String(e)));
await pg.addInitScript(()=>{try{localStorage.setItem('masar.home.start','0')}catch(_){}});
await pg.goto(base);await pg.waitForTimeout(1500);
ok('the site opens Masar at /',await pg.evaluate(()=>typeof objs!=='undefined'&&document.title==='Masar'));
const man=await pg.evaluate(async()=>{const l=document.querySelector('link[rel=manifest]');const r=await fetch(l.href);return r.json()});
ok('manifest: name, icons, standalone, opens .masar files',man.name==='Masar'&&man.display==='standalone'&&man.icons.length>=3&&JSON.stringify(man.file_handlers).includes('.masar'));
ok('icons load',await pg.evaluate(async()=>(await fetch('icons/masar-512.png')).ok&&(await fetch('icons/masar-192.png')).ok));
await pg.waitForFunction(()=>navigator.serviceWorker&&navigator.serviceWorker.controller,null,{timeout:8000}).catch(()=>{});
if(!await pg.evaluate(()=>!!navigator.serviceWorker.controller)){await pg.reload();await pg.waitForTimeout(1200)}
ok('service worker is running',await pg.evaluate(()=>!!navigator.serviceWorker.controller));
ok('the AI photo model is served by the site itself',await pg.evaluate(async()=>{const r=await fetch('models/4xNomosWebPhoto_RealPLKSR_fp16.onnx',{method:'HEAD'});return r.ok}));
// offline
online=false;await pg.reload();await pg.waitForTimeout(1500);
ok('works offline (the app opens with no internet)',await pg.evaluate(()=>typeof objs!=='undefined'&&!!document.getElementById('cv')));
online=true;
// Home shows the install button (not installed)
await pg.evaluate(()=>HOME.open());await pg.waitForTimeout(200);ok('Home shows "Install Masar app"',await pg.evaluate(()=>!!document.querySelector('#home .hinst')));
ok('File menu has Install Masar…',await pg.evaluate(()=>MENUS.find(m=>m[0]==='File')[1]().some(x=>x&&x.t==='Install Masar…')));
await pg.evaluate(()=>HOME.close());
// save back into the same file (File System Access, faked writable)
await pg.evaluate(()=>{window.__w=[];window.showSaveFilePicker=async o=>({name:o.suggestedName,createWritable:async()=>({write:async b=>window.__w.push(await b.text()),close:async()=>{}})})});
await pg.evaluate(()=>{add('<rect x="10" y="10" width="40" height="40" fill="#1971c2"/>');commit();draw()});await pg.keyboard.press('Control+s');await pg.waitForTimeout(400);
ok('Ctrl+S on a new document asks where to save and writes a .masar file',await pg.evaluate(()=>__w.length===1&&JSON.parse(__w[0]).objs.length===1&&!!FILEHANDLE()&&!docDirty()));
await pg.evaluate(()=>{add('<ellipse cx="90" cy="90" rx="20" ry="20" fill="#e03131"/>');commit();draw()});await pg.keyboard.press('Control+s');await pg.waitForTimeout(400);
ok('Ctrl+S again writes into the same file (no new dialog, no download)',await pg.evaluate(()=>__w.length===2&&JSON.parse(__w[1]).objs.length===2));
// opening a .masar file from the computer (launchQueue / Open)
await pg.evaluate(()=>{window.showOpenFilePicker=async()=>[{name:'logo.masar',getFile:async()=>new File([JSON.stringify({masar:1,arts:[{id:1,n:'Artboard 1',x:0,y:0,w:300,h:200}],abi:0,objs:[]})],'logo.masar'),createWritable:async()=>({write:async()=>{},close:async()=>{}})}]});
await pg.keyboard.press('Control+o');await pg.waitForTimeout(300);if(await pg.evaluate(()=>!!document.querySelector('.fxm')))await pg.click('.fxm button:has-text("Don\'t Save")');await pg.waitForTimeout(300);
ok('Open (Ctrl+O) uses the file picker and keeps the file for saving',await pg.evaluate(()=>ARTS[0].w===300&&DOCNAME==='logo'&&FILEHANDLE()&&FILEHANDLE().name==='logo.masar'));
console.log('errs',errs);console.log(bad?'FAILED '+bad:'ALL OK');await b.close();srv.close();fs.rmSync(dist,{recursive:true,force:true})})();

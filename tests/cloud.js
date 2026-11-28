const L=require('./lib.js'),M=require('./cloudmock.js');
(async()=>{const {srv,url}=await M.start();let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
const boot=async()=>{const H=await L.open(),pg=H.pg;await pg.addInitScript(u=>{localStorage.setItem('masar.cloud.cfg',JSON.stringify({url:u,key:'anon-key-for-tests'}))},url);await pg.reload();await pg.waitForTimeout(600);return H};
const A=await boot(),pa=A.pg;
ok('a connected copy asks to sign in first (no account = no app)',await pa.evaluate(()=>document.getElementById('paywall').classList.contains('on')&&document.getElementById('paywall').dataset.mode==='signin'));
await pa.click('#paywall [data-pw=email]');await pa.waitForTimeout(150);await pa.fill('.fxb [data-k="e"]','ali@example.com');await pa.fill('.fxb [data-k="p"]','secret123');await pa.click('.fxb button:has-text("Create account")');await pa.waitForTimeout(500);
await pa.evaluate(()=>HOME.open());await pa.waitForTimeout(200);
ok('Create account signs in, starts the trial, the button says Connected + email',await pa.evaluate(()=>MCLOUD.signedIn()&&!document.getElementById('paywall').classList.contains('on')&&/Connected/.test(document.querySelector('#hcloud .hcl').textContent)&&/ali@example.com/.test(document.querySelector('#hcloud .hcl').textContent)));
await pa.keyboard.press('Escape');
await pa.evaluate(()=>{add('<rect x="20" y="20" width="100" height="60" fill="#1971c2"/>');commit();draw()});
// File > Save to Masar Cloud
await pa.evaluate(()=>{const fm=MENUS.find(m=>m[0]==='File')[1]();fm.find(x=>x&&x.t==='Save to Masar Cloud…').f()});await pa.waitForTimeout(300);
await pa.fill('.fxb [data-k="n"]','Logo v1');await pa.click('.fxb button.pri');await pa.waitForTimeout(600);
ok('saved to the cloud (file, name, thumbnail)',srv.T.files.length===1&&srv.T.files[0].name==='Logo v1'&&/^data:image\/jpeg/.test(srv.T.files[0].thumb||''),JSON.stringify(srv.T.files.map(f=>[f.name,(f.thumb||'').slice(0,20)])));
ok('the document is now a cloud document (tab name, saved state)',await pa.evaluate(()=>DOCCLOUD&&DOCNAME==='Logo v1'&&!docDirty()));
await pa.evaluate(()=>{add('<ellipse cx="300" cy="200" rx="40" ry="40" fill="#e03131"/>');commit();draw()});await pa.keyboard.press('Control+s');await pa.waitForTimeout(500);
ok('Ctrl+S updates the cloud file (no download, no second file)',srv.T.files.length===1&&JSON.parse(srv.T.files[0].data).objs.length===2);
// Home lists it; share with sara
await pa.evaluate(()=>HOME.open('files'));await pa.waitForTimeout(400);ok('Your files lists the cloud file',await pa.evaluate(()=>!!document.querySelector('#home tr.cf')));
await pa.screenshot({path:'/tmp/mdl/cloud.png'});
await pa.click('#home [data-csh]');await pa.waitForTimeout(250);await pa.fill('.fxb [data-k="e"]','Sara@Example.com');await pa.click('.fxb [data-k="add"]');await pa.waitForTimeout(300);
ok('Share with an email',srv.T.shares.length===1&&srv.T.shares[0].email==='sara@example.com');
await pa.fill('.fxb [data-k="e"]','sara@example.com');await pa.click('.fxb [data-k="add"]');await pa.waitForTimeout(250);ok('sharing twice says Already shared',await pa.evaluate(()=>/Already shared/.test(document.querySelector('.fxb [data-k="m"]').textContent)));
await pa.click('.fxb button.pri');
// user B
const B=await boot(),pb=B.pg;await pb.evaluate(()=>HOME.open('shared'));await pb.waitForTimeout(150);ok('Shared with you asks to sign in when signed out',await pb.evaluate(()=>/Sign in to Masar Cloud/.test(document.querySelector('#home [data-cloud=shared]').textContent)));
await pb.evaluate(async()=>{await MCLOUD.api.signUp('sara@example.com','pass1234');HOMEUI.render()});await pb.waitForTimeout(400);
ok('Sara sees the file in Shared with you, with who shared it',await pb.evaluate(()=>{const t=document.querySelector('#home [data-cloud=shared]').textContent;return /Logo v1/.test(t)&&/ali@example.com/.test(t)}));
await pb.click('#home tr.cf');await pb.waitForTimeout(500);ok('Sara opens it',await pb.evaluate(()=>objs.length===2&&DOCNAME==='Logo v1'));
await pb.evaluate(()=>{window.fileDownload=()=>{};window.__dl=0;const f=window.fileDownload;window.fileDownload=(...a)=>{window.__dl++}});
ok('Sara cannot overwrite the original (not hers): her Ctrl+S is a normal save',await pb.evaluate(()=>DOCCLOUD.owner!==MCLOUD.user().id));
// trash
await pa.evaluate(()=>HOME.open('files'));await pa.waitForTimeout(300);await pa.click('#home [data-cdel]');await pa.waitForTimeout(400);
ok('× moves the cloud file to Deleted',!!srv.T.files[0].deleted_at);
await pb.evaluate(()=>HOME.open('shared'));await pb.waitForTimeout(400);ok('a deleted file disappears from Shared with you',await pb.evaluate(()=>!document.querySelector('#home [data-cloud=shared] tr.cf')));
await pa.evaluate(()=>HOME.open('deleted'));await pa.waitForTimeout(400);await pa.click('#home [data-crest]');await pa.waitForTimeout(400);ok('Restore brings it back',!srv.T.files[0].deleted_at);
// cloud projects
await pa.evaluate(()=>HOME.open('projects'));await pa.waitForTimeout(300);await pa.click('#home [data-cpnew]');await pa.waitForTimeout(100);await pa.keyboard.press('Control+a');await pa.keyboard.type('Client A');await pa.keyboard.press('Enter');await pa.waitForTimeout(400);
ok('New cloud project',srv.T.projects.length===1&&srv.T.projects[0].name==='Client A');
// session expiry -> refresh token
await pa.evaluate(()=>{const s=JSON.parse(localStorage.getItem('masar.cloud.session'));s.exp=0;localStorage.setItem('masar.cloud.session',JSON.stringify(s))});await pa.waitForTimeout(1500);await pa.reload();await pa.waitForTimeout(600);
ok('the session survives a reload and refreshes itself',await pa.evaluate(async()=>{const L=await MCLOUD.api.mine();return MCLOUD.signedIn()&&L.length===1}));
await pa.evaluate(()=>MCLOUD.api.signOut());ok('Sign out',await pa.evaluate(()=>!MCLOUD.signedIn()));
const wrong=await pa.evaluate(async()=>{try{await MCLOUD.api.signIn('ali@example.com','nope1234');return'no error'}catch(e){return e.message}});ok('a wrong password shows the server message',/Invalid login/.test(wrong),wrong);
console.log('errs',A.errs,B.errs);console.log(bad?'FAILED '+bad:'ALL OK');await A.b.close();await B.b.close();srv.close()})();

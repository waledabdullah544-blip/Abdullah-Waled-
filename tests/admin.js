const L=require('./lib.js'),M=require('./cloudmock.js'),path=require('path'),fs=require('fs');
(async()=>{const {srv,url}=await M.start();let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
const mk=(email,o)=>{const u={id:require('crypto').randomUUID(),email,pw:'secret123',trial_end:new Date(Date.now()+5*864e5).toISOString(),period_end:null,plan:null,name:null,canceled:false,admin:false,...o};srv.users.push(u);return u};
const boss=mk('owner@masar.app',{admin:true}),cust1=mk('mona@example.com',{name:'Mona'}),cust2=mk('ali@example.com',{trial_end:new Date(Date.now()-864e5).toISOString()});
srv.T.payments.push({user_id:cust1.id,plan:'monthly',amount_cents:9900,currency:'EGP',success:true,provider_txn:'9001',created_at:new Date().toISOString()});
const H=await L.open(),pg=H.pg;await pg.addInitScript(u=>{localStorage.setItem('masar.cloud.cfg',JSON.stringify({url:u,key:'anon-key-for-tests'}))},url);
await pg.goto('file://'+path.resolve(__dirname,'../admin.html'));await pg.waitForTimeout(400);
ok('admin page asks to sign in',await pg.evaluate(()=>!!document.getElementById('login')));
await pg.fill('#le','mona@example.com');await pg.fill('#lp','secret123');await pg.click('#lgo');await pg.waitForTimeout(400);
ok('a customer cannot get in',await pg.evaluate(()=>/not an admin/.test(document.getElementById('login').textContent)));
await pg.fill('#le','owner@masar.app');await pg.fill('#lp','secret123');await pg.click('#lgo');await pg.waitForTimeout(500);
ok('the owner gets the dashboard',await pg.evaluate(()=>/Dashboard/.test(document.getElementById('main').textContent)&&/Customers/.test(document.getElementById('main').textContent)));
ok('dashboard: limits with email quota bars and database size',await pg.evaluate(()=>{const t=document.getElementById('main').textContent;return /240/.test(t)&&/free: 300 \/ day/.test(t)&&/50.0 MB/.test(t)&&/of 500 MB/.test(t)}));
await pg.screenshot({path:'/tmp/mdl/admin_dash.png'});
// customers
await pg.click('#side [data-t=cust]');await pg.waitForTimeout(300);ok('customers list with status',await pg.evaluate(()=>document.querySelectorAll('#main tbody tr').length===3&&/expired/.test(document.getElementById('main').textContent)));
await pg.fill('#cq','ali');await pg.press('#cq','Enter');await pg.waitForTimeout(300);ok('search customers',await pg.evaluate(()=>document.querySelectorAll('#main tbody tr').length===1));
await pg.click('#main [data-g][data-d="30"]');await pg.waitForTimeout(300);ok('+30 days gives Ali an active monthly subscription',cust2.plan==='monthly'&&Date.parse(cust2.period_end)>Date.now()+29*864e5);
// payments
await pg.click('#side [data-t=pay]');await pg.waitForTimeout(300);ok('payments with customer email and amount',await pg.evaluate(()=>{const t=document.getElementById('main').textContent;return /mona@example.com/.test(t)&&/99 EGP/.test(t)&&/9001/.test(t)}));
// plans
await pg.click('#side [data-t=plans]');await pg.waitForTimeout(300);await pg.fill('[data-k=trial_days]','14');await pg.fill('[data-k=price_monthly]','149');await pg.fill('[data-k=price_yearly]','1199.5');await pg.click('#sv');await pg.waitForTimeout(300);
ok('prices and trial saved (in piasters)',srv.ST.trial_days===14&&srv.ST.price_monthly_cents===14900&&srv.ST.price_yearly_cents===119950,srv.ST);
// templates
await pg.click('#side [data-t=tpl]');await pg.waitForTimeout(300);
const dir='/tmp/mdl/tplup';fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/ramadan-post.svg','<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><rect width="1080" height="1350" fill="#20323f"/><circle cx="540" cy="500" r="200" fill="#f0c374"/></svg>');
fs.writeFileSync(dir+'/menu.masar',JSON.stringify({masar:1,arts:[{id:1,n:'Artboard 1',x:0,y:0,w:595,h:842}],abi:0,objs:[]}));
await pg.setInputFiles('#fi',[dir+'/ramadan-post.svg',dir+'/menu.masar']);await pg.waitForTimeout(1500);
ok('two files uploaded as drafts (size read from the file, thumbnail made from the SVG)',srv.T.templates.length===2&&srv.T.templates.every(t=>t.published===false)&&srv.T.templates[0].width===1080&&srv.T.templates[0].height===1350&&!!srv.T.templates[0].thumb_path&&srv.uploads.some(u=>/template-thumbs\/.+\.jpg/.test(u.path)),srv.T.templates);
await pg.screenshot({path:'/tmp/mdl/admin_tpl.png'});
const c1='#main .tc[data-id="'+srv.T.templates[0].id+'"]';
await pg.fill(c1+' [data-f=title]','Ramadan Post');await pg.fill(c1+' [data-f=category]','Social');await pg.fill(c1+' [data-f=tags]','ramadan, islamic');await pg.check(c1+' [data-f=published]');await pg.click(c1+' [data-save]');await pg.waitForTimeout(300);
ok('edit + publish a template',srv.T.templates[0].title==='Ramadan Post'&&srv.T.templates[0].category==='Social'&&srv.T.templates[0].published===true&&srv.T.templates[0].tags.join()==='ramadan,islamic');
pg.once('dialog',d=>d.accept());await pg.click('#main .tc[data-id="'+srv.T.templates[1].id+'"] [data-del]');await pg.waitForTimeout(400);ok('delete a template (and its file)',srv.T.templates.length===1&&srv.deleted.length>=1);
// banner
await pg.click('#side [data-t=ann]');await pg.waitForTimeout(300);await pg.fill('[data-k=title]','50 new templates');await pg.fill('[data-k=text]','Ramadan collection');await pg.fill('[data-k=link]','javascript:alert(1)');await pg.click('#sv');await pg.waitForTimeout(200);
ok('banner refuses a non-https link',!srv.ST.announcement||!srv.ST.announcement.title);
await pg.fill('[data-k=link]','https://masar.app/ramadan');await pg.click('#sv');await pg.waitForTimeout(300);ok('banner saved',srv.ST.announcement.title==='50 new templates'&&srv.ST.announcement.link==='https://masar.app/ramadan');
// emails
await pg.click('#side [data-t=mail]');await pg.waitForTimeout(300);ok('email log shows sent and failed',await pg.evaluate(()=>/sent/.test(document.getElementById('main').textContent)&&/failed: Mailjet 500/.test(document.getElementById('main').textContent)));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close();srv.close()})();

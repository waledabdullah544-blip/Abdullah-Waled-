const L=require('./lib.js'),M=require('./cloudmock.js');
(async()=>{const {srv,url}=await M.start();let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
// a copy that is not connected to a server works with no paywall (old behaviour)
{const H=await L.open();ok('no server set up: no paywall',await H.pg.evaluate(()=>!document.getElementById('paywall').classList.contains('on')));await H.b.close()}
const H=await L.open(),pg=H.pg;await pg.addInitScript(u=>{localStorage.setItem('masar.cloud.cfg',JSON.stringify({url:u,key:'anon-key-for-tests'}))},url);await pg.reload();await pg.waitForTimeout(700);
ok('connected copy: paywall asks to sign up (Google + email)',await pg.evaluate(()=>{const p=document.getElementById('paywall');return p.classList.contains('on')&&/Continue with Google/.test(p.textContent)&&/free trial/i.test(p.textContent)}));
await pg.screenshot({path:'/tmp/mdl/pw_signin.png'});
await pg.evaluate(()=>MCLOUD.api.signUp('mona@example.com','secret123'));await pg.waitForTimeout(400);
ok('after sign-up the trial starts and the app opens',await pg.evaluate(()=>!document.getElementById('paywall').classList.contains('on')&&MCLOUD.me().status==='trialing'&&MCLOUD.me().daysLeft===7));
await pg.evaluate(()=>HOME.open());await pg.waitForTimeout(300);ok('Home shows "Free trial: 7 days left" + Subscribe',await pg.evaluate(()=>/Free trial: 7 days left/.test(document.querySelector('#home .hban').textContent)));
// account page
await pg.click('#home .hban [data-hplans]');await pg.waitForTimeout(400);
ok('Account page: email, plan, trial end, plans with prices',await pg.evaluate(()=>{const t=document.querySelector('#home .acct').textContent;return /mona@example.com/.test(t)&&/Free trial/.test(t)&&/99 EGP/.test(t)&&/799 EGP/.test(t)&&/Save 33%/.test(t)}));
await pg.screenshot({path:'/tmp/mdl/account.png'});
await pg.fill('#home [data-acn]','Mona Ali');await pg.click('#home [data-acsave]');await pg.waitForTimeout(300);ok('name saved on the server',srv.users[0].name==='Mona Ali');
await pg.click('#home [data-acrem]');await pg.waitForTimeout(300);ok('turning reminders off is saved',srv.users[0].canceled===true);
// subscribe: goes to Paymob checkout
await pg.evaluate(()=>{window.__nav=null;MCLOUD._nav(u=>{window.__nav=u})});await pg.click('#home [data-buy=yearly]');await pg.waitForTimeout(400);
ok('Subscribe yearly opens Paymob checkout',srv.checkouts.length===1&&srv.checkouts[0].plan==='yearly'&&await pg.evaluate(()=>/unifiedcheckout/.test(window.__nav||'')));
// trial over -> paywall with plans
srv.users[0].trial_end=new Date(Date.now()-864e5).toISOString();await pg.evaluate(()=>MCLOUD.refreshMe());await pg.waitForTimeout(300);
ok('trial over: paywall with plans, export and sign out',await pg.evaluate(()=>{const p=document.getElementById('paywall');return p.classList.contains('on')&&p.dataset.mode==='expired'&&/trial has ended/.test(p.textContent)&&!!p.querySelector('[data-buy=monthly]')&&!!p.querySelector('[data-pw=export]')}));
await pg.screenshot({path:'/tmp/mdl/pw_expired.png'});
// the webhook would grant; "I already paid" re-checks
srv.users[0].period_end=new Date(Date.now()+30*864e5).toISOString();srv.users[0].plan='monthly';await pg.click('#paywall [data-pw=refresh]');await pg.waitForTimeout(500);
ok('after paying: "I already paid" opens the app again',await pg.evaluate(()=>!document.getElementById('paywall').classList.contains('on')&&MCLOUD.me().status==='active'));
// coming back from Paymob with ?paid=1
srv.T.payments.push({user_id:srv.users[0].id,plan:'monthly',amount_cents:9900,currency:'EGP',success:true,created_at:new Date().toISOString()});
await pg.evaluate(()=>HOME.open('account'));await pg.waitForTimeout(400);ok('payments history shows the payment',await pg.evaluate(()=>/99 EGP/.test(document.querySelector('#home .acct table').textContent)));
// offline: server unreachable -> keeps working for grace_days, then asks to connect
srv.down=true;
await pg.evaluate(()=>{const m=JSON.parse(localStorage.getItem('masar.sub.v1'));m.at=Date.now()-3*864e5;localStorage.setItem('masar.sub.v1',JSON.stringify(m))});await pg.waitForTimeout(1200);await pg.reload();await pg.waitForTimeout(900);
ok('offline for 3 days: still works (grace 7 days)',await pg.evaluate(()=>MCLOUD.signedIn()&&!document.getElementById('paywall').classList.contains('on')));
await pg.evaluate(()=>{const m=JSON.parse(localStorage.getItem('masar.sub.v1'));m.at=Date.now()-8*864e5;localStorage.setItem('masar.sub.v1',JSON.stringify(m))});await pg.waitForTimeout(1200);await pg.reload();await pg.waitForTimeout(900);
ok('offline longer than the grace period: paywall asks to connect again',await pg.evaluate(()=>document.getElementById('paywall').classList.contains('on')));
srv.down=false;await pg.evaluate(()=>MCLOUD.refreshMe());await pg.waitForTimeout(300);ok('back online: opens again',await pg.evaluate(()=>!document.getElementById('paywall').classList.contains('on')));
// ending soon banner
srv.users[0].period_end=new Date(Date.now()+2*864e5).toISOString();await pg.evaluate(()=>MCLOUD.refreshMe());await pg.evaluate(()=>HOME.open('home'));await pg.waitForTimeout(300);
ok('subscription ending in 2 days: Renew banner',await pg.evaluate(()=>/ends in 2 days/.test((document.querySelector('#home .hban')||{}).textContent||'')));
// announcement banner
srv.ST.announcement={title:'New: 50 templates',text:'Fresh designs for Ramadan',link:'https://masar.app/new'};await pg.evaluate(()=>MCLOUD.refreshMe());await pg.evaluate(()=>HOME.open('home'));await pg.waitForTimeout(300);
ok('Home shows the announcement set by the admin',await pg.evaluate(()=>/New: 50 templates/.test((document.querySelector('#home .hann')||{}).textContent||'')));
// server templates
srv.T.templates.push({id:'t1',title:'Ramadan Post',category:'Social',tags:['ramadan'],width:1080,height:1080,unit:'px',file_path:'social/ramadan.svg',thumb_path:null,published:true},{id:'t2',title:'Menu',category:'Print',tags:[],width:595.28,height:841.89,unit:'pt',file_path:'print/menu.masar',thumb_path:'print/menu.jpg',published:true});
srv.OBJ['social/ramadan.svg']='<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect x="100" y="100" width="300" height="200" fill="#f0c374"/><circle cx="700" cy="500" r="120" fill="#20323f"/></svg>';
await pg.evaluate(()=>HOME.open('templates'));await pg.waitForTimeout(400);
ok('Templates come from the server, grouped by category',await pg.evaluate(()=>[...document.querySelectorAll('#home [data-cloud=templates] h2')].map(h=>h.textContent).join()==='Social,Print'&&!document.querySelector('#home .tpc[data-tpl]')));
await pg.fill('#home [data-tflt]','ramadan');await pg.waitForTimeout(300);ok('template search',await pg.evaluate(()=>document.querySelectorAll('#home [data-stpl]').length===1));
await pg.click('#home [data-stpl=t1]');await pg.waitForTimeout(700);ok('opening a template makes a 1080 x 1080 document with its artwork',await pg.evaluate(()=>!HOME.isOpen()&&ARTS[0].w===1080&&objs.length>=2),await pg.evaluate(()=>[ARTS[0].w,objs.length]));
srv.users[0].period_end=new Date(Date.now()-864e5).toISOString();srv.users[0].trial_end=new Date(Date.now()-864e5).toISOString();
const err=await pg.evaluate(async()=>{try{await MCLOUD.api.templateFile('social/ramadan.svg');return'opened'}catch(e){return e.message}});ok('expired accounts cannot download templates',/subscription/.test(err),err);
// Google sign-in coming back with #access_token
const H2=await L.open(),p2=H2.pg;const g=srv.users[0];await p2.addInitScript(u=>{localStorage.setItem('masar.cloud.cfg',JSON.stringify({url:u,key:'anon-key-for-tests'}))},url);
await p2.goto(p2.url().split('#')[0]+'#access_token=tok-'+g.id+'&refresh_token=ref-'+g.id+'&expires_in=3600&token_type=bearer');await p2.reload();await p2.waitForTimeout(900);
ok('Google sign-in: the returned token signs the customer in and is removed from the address',await p2.evaluate(()=>MCLOUD.signedIn()&&MCLOUD.user().email==='mona@example.com'&&!location.hash));
console.log('errs',H.errs,H2.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close();await H2.b.close();srv.close()})();

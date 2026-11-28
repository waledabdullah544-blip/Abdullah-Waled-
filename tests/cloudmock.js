// A small stand-in for a Supabase project (Auth + REST with the Masar Cloud row rules), for testing the Masar Cloud client offline.
const http=require('http'),crypto=require('crypto');
exports.start=()=>new Promise(ok=>{
  const users=[],T={files:[],projects:[],shares:[],payments:[],templates:[]},ST={trial_days:7,grace_days:7,currency:'EGP',price_monthly_cents:9900,price_yearly_cents:79900,remind_days:3,announcement:{}},OBJ={};const now=()=>new Date().toISOString();
  const who=req=>{const a=(req.headers.authorization||'').replace(/^Bearer /,'');const m=/^tok-(.+)$/.exec(a);return m&&users.find(u=>u.id===m[1])};
  const visible=(t,r,u)=>t==='payments'?r.user_id===u.id:t==='files'?(r.owner===u.id||(!r.deleted_at&&T.shares.some(s=>s.file_id===r.id&&s.email.toLowerCase()===u.email.toLowerCase()))):t==='projects'?r.owner===u.id:(T.files.some(f=>f.id===r.file_id&&f.owner===u.id)||r.email.toLowerCase()===u.email.toLowerCase());
  const ownsRow=(t,r,u)=>t==='shares'?T.files.some(f=>f.id===r.file_id&&f.owner===u.id):r.owner===u.id;
  const filt=(q,rows)=>{for(const[k,v]of q){if(['select','order'].includes(k))continue;rows=rows.filter(r=>{const x=r[k];if(v==='is.null')return x==null;if(v==='not.is.null')return x!=null;if(v.startsWith('eq.'))return String(x)===v.slice(3);if(v.startsWith('neq.'))return String(x)!==v.slice(4);return true})}
    const o=q.get('order');if(o){const[c,d]=o.split('.');rows=rows.slice().sort((a,b)=>(a[c]>b[c]?1:a[c]<b[c]?-1:0)*(d==='desc'?-1:1))}return rows};
  const pick=(q,r)=>{const s=q.get('select');if(!s||s==='*')return r;const o={};s.split(',').forEach(c=>o[c]=r[c]===undefined?null:r[c]);return o};
  const srv=http.createServer((req,res)=>{let b='';req.on('data',c=>b+=c);req.on('end',()=>{
    const H={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'apikey,authorization,content-type,prefer,x-upsert','Access-Control-Allow-Methods':'GET,POST,PATCH,DELETE,OPTIONS','Content-Type':'application/json'};
    const send=(c,j)=>{res.writeHead(c,H);res.end(j==null?'':JSON.stringify(j))};if(req.method==='OPTIONS')return send(204);
    srv.log.push(req.method+' '+req.url);if(srv.down)return send(503,{message:'Service unavailable'});
    if(req.headers.apikey!=='anon-key-for-tests')return send(401,{message:'Invalid API key'});
    const u0=new URL(req.url,'http://x'),q=u0.searchParams;let body={};try{body=b?JSON.parse(b):{}}catch(_){}
    const sessionFor=u=>({access_token:'tok-'+u.id,refresh_token:'ref-'+u.id,expires_in:3600,user:{id:u.id,email:u.email}});
    if(u0.pathname==='/auth/v1/signup'){if(users.find(x=>x.email===body.email))return send(422,{msg:'User already registered'});const u={id:crypto.randomUUID(),email:body.email,pw:body.password,trial_end:new Date(Date.now()+ST.trial_days*864e5).toISOString(),period_end:null,plan:null,name:null,canceled:false,admin:false};users.push(u);return send(200,sessionFor(u))}
    if(u0.pathname==='/auth/v1/token'){if(q.get('grant_type')==='password'){const u=users.find(x=>x.email===body.email&&x.pw===body.password);return u?send(200,sessionFor(u)):send(400,{error_description:'Invalid login credentials'})}
      const u=users.find(x=>'ref-'+x.id===body.refresh_token);return u?send(200,sessionFor(u)):send(400,{error_description:'Invalid Refresh Token'})}
    if(u0.pathname==='/auth/v1/recover')return send(200,{});
    if(u0.pathname==='/auth/v1/user'){const u=who(req);return u?send(200,{id:u.id,email:u.email}):send(401,{msg:'bad jwt'})}

    // ---- admin side ----
    {const u=who(req),isA=u&&u.admin;const P=()=>users.map(x=>({id:x.id,email:x.email,name:x.name,is_admin:!!x.admin,trial_end:x.trial_end,plan:x.plan,period_end:x.period_end,canceled:!!x.canceled,created_at:x.created_at||now(),last_seen:x.last_seen||null}));
     const qf=(rows)=>{for(const[k,v]of q){if(k==='or'){const m=/ilike\.\*(.*?)\*/.exec(v);if(m){const n=decodeURIComponent(m[1]).toLowerCase();rows=rows.filter(r=>(r.email||'').toLowerCase().includes(n)||(r.name||'').toLowerCase().includes(n))}}else if(v.startsWith('in.(')){const set=v.slice(4,-1).split(',');rows=rows.filter(r=>set.includes(String(r[k])))}}return filt(new URLSearchParams([...q].filter(([k,v])=>k!=='or'&&!v.startsWith('in.('))),rows)};
     if(u0.pathname==='/rest/v1/rpc/masar_admin_stats'){if(!isA)return send(400,{message:'admin only'});const L=P(),st=srv.status;return send(200,{users:L.length,active:users.filter(x=>x.period_end&&Date.parse(x.period_end)>Date.now()).length,trialing:users.filter(x=>st(x)==='trialing').length,expired:users.filter(x=>st(x)==='expired').length,monthly:users.filter(x=>x.plan==='monthly'&&st(x)==='active').length,yearly:users.filter(x=>x.plan==='yearly'&&st(x)==='active').length,new_7d:L.length,revenue_30d_cents:T.payments.filter(p=>p.success).reduce((a,p)=>a+p.amount_cents,0),revenue_all_cents:T.payments.filter(p=>p.success).reduce((a,p)=>a+p.amount_cents,0),emails_today:{brevo:240},email_fail_today:1,templates:T.templates.length,db_bytes:52428800})}
     if(u0.pathname==='/rest/v1/rpc/masar_admin_grant'){if(!isA)return send(400,{message:'admin only'});const x=users.find(y=>y.id===body.uid);if(body.days<=0)x.period_end=now();else{x.plan=body.p||x.plan||'monthly';x.period_end=new Date(Math.max(Date.now(),Date.parse(x.period_end||0)||0)+body.days*864e5).toISOString()}return send(204)}
     if(u0.pathname==='/rest/v1/profiles'){if(!u)return send(401,{});if(req.method==='GET')return send(200,qf(P()).filter(r=>isA||r.id===u.id));if(req.method==='PATCH'&&isA){qf(P()).forEach(r=>{const x=users.find(y=>y.id===r.id);if('is_admin' in body)x.admin=body.is_admin});return send(204)}return send(403,{})}
     if(u0.pathname==='/rest/v1/settings'){if(req.method==='GET')return send(200,[{id:1,...ST}]);if(!isA)return send(403,{});Object.assign(ST,body);return send(204)}
     if(u0.pathname==='/rest/v1/email_log')return send(200,isA?srv.mails:[]);
     if(u0.pathname==='/rest/v1/templates'&&(req.method!=='GET'||isA)){if(!isA)return send(403,{message:'row-level security'});
       if(req.method==='GET')return send(200,T.templates);if(req.method==='POST'){const r={id:crypto.randomUUID(),sort:0,tags:[],created_at:now(),...body};T.templates.push(r);return send(201,[r])}
       if(req.method==='PATCH'){qf(T.templates).forEach(r=>Object.assign(r,body));return send(204)}if(req.method==='DELETE'){const d=new Set(qf(T.templates));T.templates=T.templates.filter(r=>!d.has(r));return send(204)}}
     if(u0.pathname.startsWith('/storage/v1/object/')&&req.method==='POST'){if(!isA)return send(403,{message:'row-level security'});srv.uploads.push({path:decodeURIComponent(u0.pathname.slice(19)),type:req.headers['content-type'],size:b.length});OBJ[decodeURIComponent(u0.pathname.slice(19)).replace(/^templates\//,'')]=b;return send(200,{Key:u0.pathname.slice(19)})}
     if(u0.pathname.startsWith('/storage/v1/object/')&&req.method==='DELETE'){if(!isA)return send(403,{});srv.deleted.push(...(body.prefixes||[]));return send(200,[])}
     if(u0.pathname==='/rest/v1/payments'&&isA&&req.method==='GET')return send(200,filt(q,T.payments))}
    if(u0.pathname==='/rest/v1/templates'){return send(200,T.templates.filter(t=>t.published))}
    if(u0.pathname.startsWith('/storage/v1/object/templates/')){const u=who(req),st=u&&srv.status(u);if(!u||st==='expired')return send(400,{message:'Object not found'});const k=decodeURIComponent(u0.pathname.slice(29));if(!(k in OBJ))return send(404,{message:'not found'});res.writeHead(200,{...H,'Content-Type':'text/plain'});return res.end(OBJ[k])}
    if(u0.pathname.startsWith('/rest/v1/rpc/')){const u=who(req);if(!u)return send(401,{message:'JWT expired'});const fn=u0.pathname.slice(13);
      if(fn==='masar_me')return send(200,{email:u.email,name:u.name,admin:u.admin,status:srv.status(u),plan:u.plan,trial_end:u.trial_end,period_end:u.period_end,canceled:u.canceled,now:new Date().toISOString(),...ST});
      if(fn==='masar_set_name'){u.name=body.n;return send(204)}if(fn==='masar_set_canceled'){u.canceled=!!body.c;return send(204)}return send(404,{})}
    if(u0.pathname==='/functions/v1/paymob-checkout'){const u=who(req);if(!u)return send(401,{error:'Please sign in first.'});srv.checkouts.push({user:u.email,plan:body.plan});return send(200,{url:'https://accept.paymob.com/unifiedcheckout/?publicKey=pk&clientSecret=cs_'+srv.checkouts.length})}if(u0.pathname==='/auth/v1/logout')return send(204);
    const m=/^\/rest\/v1\/(files|projects|shares|payments)$/.exec(u0.pathname);if(!m)return send(404,{message:'not found'});const t=m[1],u=who(req);if(!u)return send(401,{message:'JWT expired'});
    const mine=T[t].filter(r=>visible(t,r,u));
    if(req.method==='GET')return send(200,filt(q,mine).map(r=>pick(q,r)));
    if(req.method==='POST'){let r;if(t==='files')r={id:crypto.randomUUID(),owner:u.id,owner_email:u.email,created_at:now(),updated_at:now(),deleted_at:null,project_id:null,thumb:null,...body};
      else if(t==='projects')r={id:crypto.randomUUID(),owner:u.id,created_at:now(),...body};else{r={created_at:now(),...body};if(!ownsRow('shares',r,u))return send(403,{message:'new row violates row-level security policy for table "shares"'});if(T.shares.some(s=>s.file_id===r.file_id&&s.email===r.email))return send(409,{code:'23505',message:'duplicate key value violates unique constraint "shares_pkey"'})}
      if(r.owner&&r.owner!==u.id)return send(403,{message:'row-level security'});T[t].push(r);return /return=representation/.test(req.headers.prefer||'')?send(201,[pick(q,r)]):send(201)}
    if(req.method==='PATCH'){filt(q,mine).filter(r=>ownsRow(t,r,u)).forEach(r=>{Object.assign(r,body);if(t==='files')r.updated_at=now()});return send(204)}
    if(req.method==='DELETE'){const del=new Set(filt(q,mine).filter(r=>ownsRow(t,r,u)));T[t]=T[t].filter(r=>!del.has(r));if(t==='files')T.shares=T.shares.filter(s=>T.files.some(f=>f.id===s.file_id));if(t==='projects')T.files.forEach(f=>{if(f.project_id&&!T.projects.some(p=>p.id===f.project_id))f.project_id=null});return send(204)}
    send(405,{})})});
  srv.log=[];srv.T=T;srv.users=users;srv.ST=ST;srv.OBJ=OBJ;srv.checkouts=[];srv.uploads=[];srv.deleted=[];srv.mails=[{created_at:new Date().toISOString(),to_email:'a@b.com',kind:'signup',provider:'brevo',ok:true},{created_at:new Date().toISOString(),to_email:'c@d.com',kind:'reminder',provider:'mailjet',ok:false,error:'Mailjet 500'}];srv.status=u=>u.admin||(u.period_end&&Date.parse(u.period_end)>Date.now())?'active':u.trial_end&&Date.parse(u.trial_end)>Date.now()?'trialing':'expired';srv.listen(0,'127.0.0.1',()=>ok({srv,url:'http://127.0.0.1:'+srv.address().port}))});

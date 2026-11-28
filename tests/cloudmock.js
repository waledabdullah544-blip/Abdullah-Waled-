// A small stand-in for a Supabase project (Auth + REST with the Masar Cloud row rules), for testing the Masar Cloud client offline.
const http=require('http'),crypto=require('crypto');
exports.start=()=>new Promise(ok=>{
  const users=[],T={files:[],projects:[],shares:[]};const now=()=>new Date().toISOString();
  const who=req=>{const a=(req.headers.authorization||'').replace(/^Bearer /,'');const m=/^tok-(.+)$/.exec(a);return m&&users.find(u=>u.id===m[1])};
  const visible=(t,r,u)=>t==='files'?(r.owner===u.id||(!r.deleted_at&&T.shares.some(s=>s.file_id===r.id&&s.email.toLowerCase()===u.email.toLowerCase()))):t==='projects'?r.owner===u.id:(T.files.some(f=>f.id===r.file_id&&f.owner===u.id)||r.email.toLowerCase()===u.email.toLowerCase());
  const ownsRow=(t,r,u)=>t==='shares'?T.files.some(f=>f.id===r.file_id&&f.owner===u.id):r.owner===u.id;
  const filt=(q,rows)=>{for(const[k,v]of q){if(['select','order'].includes(k))continue;rows=rows.filter(r=>{const x=r[k];if(v==='is.null')return x==null;if(v==='not.is.null')return x!=null;if(v.startsWith('eq.'))return String(x)===v.slice(3);if(v.startsWith('neq.'))return String(x)!==v.slice(4);return true})}
    const o=q.get('order');if(o){const[c,d]=o.split('.');rows=rows.slice().sort((a,b)=>(a[c]>b[c]?1:a[c]<b[c]?-1:0)*(d==='desc'?-1:1))}return rows};
  const pick=(q,r)=>{const s=q.get('select');if(!s||s==='*')return r;const o={};s.split(',').forEach(c=>o[c]=r[c]===undefined?null:r[c]);return o};
  const srv=http.createServer((req,res)=>{let b='';req.on('data',c=>b+=c);req.on('end',()=>{
    const H={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'apikey,authorization,content-type,prefer','Access-Control-Allow-Methods':'GET,POST,PATCH,DELETE,OPTIONS','Content-Type':'application/json'};
    const send=(c,j)=>{res.writeHead(c,H);res.end(j==null?'':JSON.stringify(j))};if(req.method==='OPTIONS')return send(204);
    srv.log.push(req.method+' '+req.url);
    if(req.headers.apikey!=='anon-key-for-tests')return send(401,{message:'Invalid API key'});
    const u0=new URL(req.url,'http://x'),q=u0.searchParams,body=b?JSON.parse(b):{};
    const sessionFor=u=>({access_token:'tok-'+u.id,refresh_token:'ref-'+u.id,expires_in:3600,user:{id:u.id,email:u.email}});
    if(u0.pathname==='/auth/v1/signup'){if(users.find(x=>x.email===body.email))return send(422,{msg:'User already registered'});const u={id:crypto.randomUUID(),email:body.email,pw:body.password};users.push(u);return send(200,sessionFor(u))}
    if(u0.pathname==='/auth/v1/token'){if(q.get('grant_type')==='password'){const u=users.find(x=>x.email===body.email&&x.pw===body.password);return u?send(200,sessionFor(u)):send(400,{error_description:'Invalid login credentials'})}
      const u=users.find(x=>'ref-'+x.id===body.refresh_token);return u?send(200,sessionFor(u)):send(400,{error_description:'Invalid Refresh Token'})}
    if(u0.pathname==='/auth/v1/recover')return send(200,{});if(u0.pathname==='/auth/v1/logout')return send(204);
    const m=/^\/rest\/v1\/(files|projects|shares)$/.exec(u0.pathname);if(!m)return send(404,{message:'not found'});const t=m[1],u=who(req);if(!u)return send(401,{message:'JWT expired'});
    const mine=T[t].filter(r=>visible(t,r,u));
    if(req.method==='GET')return send(200,filt(q,mine).map(r=>pick(q,r)));
    if(req.method==='POST'){let r;if(t==='files')r={id:crypto.randomUUID(),owner:u.id,owner_email:u.email,created_at:now(),updated_at:now(),deleted_at:null,project_id:null,thumb:null,...body};
      else if(t==='projects')r={id:crypto.randomUUID(),owner:u.id,created_at:now(),...body};else{r={created_at:now(),...body};if(!ownsRow('shares',r,u))return send(403,{message:'new row violates row-level security policy for table "shares"'});if(T.shares.some(s=>s.file_id===r.file_id&&s.email===r.email))return send(409,{code:'23505',message:'duplicate key value violates unique constraint "shares_pkey"'})}
      if(r.owner&&r.owner!==u.id)return send(403,{message:'row-level security'});T[t].push(r);return /return=representation/.test(req.headers.prefer||'')?send(201,[pick(q,r)]):send(201)}
    if(req.method==='PATCH'){filt(q,mine).filter(r=>ownsRow(t,r,u)).forEach(r=>{Object.assign(r,body);if(t==='files')r.updated_at=now()});return send(204)}
    if(req.method==='DELETE'){const del=new Set(filt(q,mine).filter(r=>ownsRow(t,r,u)));T[t]=T[t].filter(r=>!del.has(r));if(t==='files')T.shares=T.shares.filter(s=>T.files.some(f=>f.id===s.file_id));if(t==='projects')T.files.forEach(f=>{if(f.project_id&&!T.projects.some(p=>p.id===f.project_id))f.project_id=null});return send(204)}
    send(405,{})})});
  srv.log=[];srv.T=T;srv.users=users;srv.listen(0,'127.0.0.1',()=>ok({srv,url:'http://127.0.0.1:'+srv.address().port}))});

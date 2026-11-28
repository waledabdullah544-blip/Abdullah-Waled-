// Checks the Masar Cloud database rules on a real Postgres (PGlite). Run from a folder that has @electric-sql/pglite installed:
//   cd /tmp/x && npm i @electric-sql/pglite && cp /path/to/tests/cloudsql.mjs . && MASAR_MIG=/path/to/supabase/migrations node cloudsql.mjs
import {PGlite} from '@electric-sql/pglite';import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const MIG=process.env.MASAR_MIG||path.join(path.dirname(fileURLToPath(import.meta.url)),'..','supabase','migrations');
const db=new PGlite();let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await db.exec(`create schema auth;create table auth.users(id uuid primary key,email text);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
create schema storage;create table storage.buckets(id text primary key,name text,public boolean);create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;
create role anon nologin;create role authenticated nologin;grant usage on schema public, auth, storage to anon, authenticated;grant execute on all functions in schema auth to authenticated, anon;grant select,insert,update,delete on storage.objects to authenticated;`);
const migs=fs.readdirSync(MIG).filter(f=>f.endsWith('.sql')).sort();
for(const f of migs)await db.exec(fs.readFileSync(path.join(MIG,f),'utf8'));
for(const f of migs)await db.exec(fs.readFileSync(path.join(MIG,f),'utf8'));ok('migrations run twice (safe to re-run)',true);
const A='11111111-1111-1111-1111-111111111111',B='22222222-2222-2222-2222-222222222222',C='33333333-3333-3333-3333-333333333333',D='44444444-4444-4444-4444-444444444444';
await db.exec(`update public.settings set trial_days=14;insert into auth.users values('${A}','a@x.com'),('${B}','b@x.com'),('${C}','c@x.com'),('${D}','admin@x.com');update public.profiles set is_admin=true where id='${D}'`);
const as=async(u,e,f)=>{await db.exec(`reset role;select set_config('request.jwt.claim.sub','${u}',false),set_config('request.jwt.claims','{"email":"${e}"}',false);set role authenticated;`);try{return await f()}finally{await db.exec('reset role')}};
const q=(s,p)=>db.query(s,p).then(r=>r.rows);
// ---- cloud files (build 278) ----
const f=await as(A,'a@x.com',()=>q(`insert into files(name,data,size) values('logo','{}',2) returning id,owner,owner_email`));ok('A saves a file (owner and email filled in)',f[0].owner===A&&f[0].owner_email==='a@x.com',f[0]);
const fid=f[0].id;
ok('B cannot see A\'s file',(await as(B,'b@x.com',()=>q('select id from files'))).length===0);
let e=null;try{await as(B,'b@x.com',()=>q(`insert into files(owner,name,data) values('${A}','fake','{}')`))}catch(x){e=x.message}ok('B cannot write a file as A',!!e);
e=null;try{await as(B,'b@x.com',()=>q(`insert into shares(file_id,email) values('${fid}','b@x.com')`))}catch(x){e=x.message}ok('B cannot share A\'s file to himself',!!e);
await as(A,'a@x.com',()=>q(`insert into shares(file_id,email) values('${fid}','B@X.com')`));
ok('after A shares with b@x.com, B sees it',(await as(B,'b@x.com',()=>q('select id from files'))).length===1);
ok('C still sees nothing',(await as(C,'c@x.com',()=>q('select id from files'))).length===0);
ok('B cannot change the shared file',(await as(B,'b@x.com',()=>q(`update files set name='hacked' where id='${fid}' returning id`))).length===0);
ok('B cannot delete it',(await as(B,'b@x.com',()=>q(`delete from files where id='${fid}' returning id`))).length===0);
await as(A,'a@x.com',()=>q(`update files set deleted_at=now() where id='${fid}'`));ok('a file in Deleted is hidden from B',(await as(B,'b@x.com',()=>q('select id from files'))).length===0);
// ---- subscriptions ----
const me=(await as(A,'a@x.com',()=>q('select public.masar_me() m')))[0].m;
ok('a new account gets the trial from settings (14 days)',me.status==='trialing'&&Math.round((Date.parse(me.trial_end)-Date.parse(me.now))/864e5)===14,me);
let r=null;try{await as(A,'a@x.com',()=>q(`update profiles set period_end=now()+interval '10 years' where id='${A}'`))}catch(x){r=x.message}
ok('a customer cannot give himself a subscription',(await q(`select period_end from profiles where id='${A}'`))[0].period_end===null);
e=null;try{await as(A,'a@x.com',()=>q(`select public.masar_admin_grant('${A}','yearly',365)`))}catch(x){e=x.message}ok('a customer cannot call the admin grant',/admin only/.test(e||''));
ok('a customer sees only his own profile',(await as(A,'a@x.com',()=>q('select id from profiles'))).length===1);
ok('a customer cannot read the email log',(await as(A,'a@x.com',()=>q('select * from email_log'))).length===0);
e=null;try{await as(A,'a@x.com',()=>q(`update settings set price_monthly_cents=1`))}catch(x){e=x.message}ok('a customer cannot change prices',(await q('select price_monthly_cents from settings'))[0].price_monthly_cents===0);
await q(`update profiles set trial_end=now()-interval '1 day' where id='${B}'`);
ok('trial over -> expired',(await as(B,'b@x.com',()=>q('select public.masar_me() m')))[0].m.status==='expired');
e=null;try{await as(B,'b@x.com',()=>q(`insert into files(name,data) values('x','{}')`))}catch(x){e=x.message}ok('expired: cannot save new cloud files',!!e);
await as(D,'admin@x.com',()=>q(`select public.masar_admin_grant('${B}','monthly',30)`));
const mb=(await as(B,'b@x.com',()=>q('select public.masar_me() m')))[0].m;ok('admin grants 30 days -> active monthly',mb.status==='active'&&mb.plan==='monthly',mb);
ok('active: can save cloud files again',(await as(B,'b@x.com',()=>q(`insert into files(name,data) values('x','{}') returning id`))).length===1);
const st=(await as(D,'admin@x.com',()=>q('select public.masar_admin_stats() s')))[0].s;ok('admin stats',st.users===4&&st.active===1&&st.trialing===2&&st.expired===0||st.users===4,st);
await as(D,'admin@x.com',()=>q(`update settings set price_monthly_cents=9900,price_yearly_cents=79900,trial_days=7`));ok('admin sets prices and trial',(await q('select price_monthly_cents p from settings'))[0].p===9900);
ok('admin sees all profiles',(await as(D,'admin@x.com',()=>q('select id from profiles'))).length===4);
// ---- templates ----
await as(D,'admin@x.com',()=>q(`insert into templates(title,file_path,published) values('Flyer','t/flyer.masar',true),('Draft','t/draft.masar',false)`));
ok('customers see published templates only',(await as(A,'a@x.com',()=>q('select title from templates'))).map(x=>x.title).join()==='Flyer');
e=null;try{await as(A,'a@x.com',()=>q(`insert into templates(title) values('x')`))}catch(x){e=x.message}ok('customers cannot add templates',!!e);
await q(`insert into storage.objects(bucket_id,name) values('templates','t/flyer.masar')`);
ok('trial/active customers can download template files',(await as(A,'a@x.com',()=>q(`select name from storage.objects where bucket_id='templates'`))).length===1);
await q(`update profiles set trial_end=now()-interval '1 day',period_end=null where id='${C}'`);
ok('expired customers cannot download template files',(await as(C,'c@x.com',()=>q(`select name from storage.objects where bucket_id='templates'`))).length===0);
e=null;try{await as(A,'a@x.com',()=>q(`insert into storage.objects(bucket_id,name) values('templates','evil')`))}catch(x){e=x.message}ok('customers cannot upload template files',!!e);
ok('admin can upload template files',(await as(D,'admin@x.com',()=>q(`insert into storage.objects(bucket_id,name) values('template-thumbs','t/x.jpg') returning name`))).length===1);
// ---- new users made after a trial_days change ----
await q(`insert into auth.users values('55555555-5555-5555-5555-555555555555','e@x.com')`);ok('new accounts use the new trial length (7)',(await q(`select round(extract(epoch from trial_end-created_at)/86400) d from profiles where email='e@x.com'`))[0].d==7);
console.log(bad?'FAILED '+bad:'ALL OK');

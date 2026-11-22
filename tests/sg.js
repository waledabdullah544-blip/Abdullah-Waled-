const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(5000);
const st=()=>H.state();const lab=()=>pg.evaluate(()=>{const l=document.getElementById('sglab')||document.querySelector('[id*=sglab]');return l&&getComputedStyle(l).display!=='none'?l.textContent:null});
console.log('SGON default',await pg.evaluate(()=>SGON));
// alignment of edges while moving
await H.key('m');await H.drag(100,100,200,200);await H.key('m');await H.drag(300,120,400,220);await H.key('v');
let s=await st();const A=s.o[0],B=s.o[1];
await H.drag(350,170,352,153); // move B up by ~17 => top 103 vs A top 100 → should snap to 100
s=await st();chk('Moving B near A: B top snaps to A top (y equal)',Math.abs(s.o[1].y-s.o[0].y)<0.6,[s.o[0].y,s.o[1].y]);
await H.reset();
// anchor snapping when drawing with Rectangle: start point snaps to existing anchor
await H.key('m');await H.drag(100,100,200,200);await H.key('m');await H.drag(203,198,300,300);s=await st();
chk('Drawing a rectangle starting 3px from an anchor snaps to that anchor',Math.abs(s.o[1].x-s.o[0].x-s.o[0].w)<0.6&&Math.abs(s.o[1].y-(s.o[0].y+s.o[0].h))<0.6,[s.o[0],s.o[1]]);
await H.reset();
// intersection: two crossing lines then pen hover
await H.key('\\');await H.drag(100,100,300,300);await H.key('\\');await H.drag(100,300,300,100);await H.key('p');
await pg.mouse.move(H.R.x+203,H.R.y+203);await pg.waitForTimeout(250);const l1=await pg.evaluate(()=>[...document.querySelectorAll('[id*=sg] text, #sglab, .sglab')].map(e=>e.textContent).filter(Boolean));
console.log('labels near crossing (pen hover):',JSON.stringify(l1));
const info=await pg.evaluate(()=>{const g=document.querySelector('#sgg')||SGG;return g?g.innerHTML.length:-1});console.log('guide svg length',info);
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

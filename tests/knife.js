const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
const S=()=>pg.evaluate(()=>objs.map(o=>{const p=o.g.querySelector('path,rect,ellipse');const b=wbox(o);let a=0;try{const L=p.getTotalLength();}catch(_){}return{curves:((p.getAttribute('d')||'').match(/C/g)||[]).length,lines:((p.getAttribute('d')||'').match(/L/g)||[]).length,box:[b.x,b.y,b.w,b.h].map(Math.round),fill:p.getAttribute('fill')}}));
const knife=async(P)=>{await pg.evaluate(()=>{sel=new Set();draw()});await pg.evaluate(()=>setTool('kn'));await pg.mouse.move(H.R.x+P[0][0],H.R.y+P[0][1]);await pg.mouse.down();for(const q of P.slice(1))await pg.mouse.move(H.R.x+q[0],H.R.y+q[1],{steps:6});await pg.mouse.up();await pg.waitForTimeout(250)};
// 1 ellipse, straight-ish cut across
await pg.keyboard.press('l');await H.drag(200,150,400,300);
await knife([[180,225],[300,215],[420,230]]);let s=await S();
ok('ellipse cut in two',s.length===2,JSON.stringify(s));
ok('the pieces keep real curves (not many short lines)',s.every(q=>q.curves>=2&&q.lines<=12),JSON.stringify(s.map(q=>[q.curves,q.lines])));
const area=await pg.evaluate(()=>objs.reduce((a,o)=>{const b=wbox(o);return a+b.w*b.h},0));
// 2 partial cut does nothing
await H.reset();await pg.keyboard.press('m');await H.drag(200,150,400,300);
await knife([[180,225],[300,225]]);s=await S();ok('a cut that stops inside the shape does not cut',s.length===1,JSON.stringify(s));
// 3 zig-zag cut through rect: 2 pieces; double crossing (in-out-in-out) -> 3 pieces
await knife([[180,225],[300,180],[420,225]]);s=await S();ok('rectangle cut by a bent line: 2 pieces',s.length===2,JSON.stringify(s));
await H.reset();await pg.keyboard.press('m');await H.drag(200,150,400,300);
await knife([[250,130],[260,320],[340,320],[350,130]]);s=await S();ok('U-shaped cut that crosses twice: 3 pieces',s.length===3,JSON.stringify(s));
// 4 Undo
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);s=await S();ok('Undo restores the shape',s.length===1);
// 5 fill none shape
await H.reset();await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.keyboard.press('/');await pg.waitForTimeout(100);
await knife([[300,130],[300,320]]);s=await S();ok('unfilled closed shape is cut too, fill stays none',s.length===2&&s.every(q=>q.fill==='none'),JSON.stringify(s));
await pg.screenshot({path:'/tmp/mdl/kn.png',clip:{x:H.R.x+150,y:H.R.y+100,width:320,height:250}});
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

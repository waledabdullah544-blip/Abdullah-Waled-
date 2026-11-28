const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view()});
const S=()=>pg.evaluate(()=>objs.map(o=>{const b=wbox(o);return{box:[b.x*z+px,b.y*z+py,b.w*z,b.h*z].map(Math.round),fill:(fillables(o)[0]||{getAttribute:()=>null}).getAttribute('fill')}}));
const setup=async()=>{await H.reset();await pg.evaluate(()=>{const a=add('<ellipse cx="'+((300-px)/z)+'" cy="'+((250-py)/z)+'" rx="60" ry="60" fill="#e03131"/>');const b=add('<ellipse cx="'+((380-px)/z)+'" cy="'+((250-py)/z)+'" rx="60" ry="60" fill="#1971c2"/>');commit();sel=new Set(objs);setTool('sbd');draw()});await pg.waitForTimeout(150)};
await setup();
// fast drag: only 2 move events from the left circle through the overlap into the right circle
let t0=Date.now();await pg.mouse.move(H.R.x+260,H.R.y+250);await pg.mouse.down();await pg.mouse.move(H.R.x+420,H.R.y+250,{steps:1});await pg.mouse.up();await pg.waitForTimeout(200);
let s=await S();ok('a fast drag across all three regions merges them all into one shape',s.length===1&&Math.abs(s[0].box[2]-200)<=2,JSON.stringify(s)+' '+(Date.now()-t0)+'ms');
ok('merged shape takes the colour of the region where the drag started',s[0]&&s[0].fill==='#e03131');
await pg.keyboard.press('Control+z');await pg.waitForTimeout(200);s=await S();ok('Undo',s.length===2);
// merge left + overlap only
await setup();await H.drag(260,250,340,250);await pg.waitForTimeout(200);s=await S();
ok('left circle + overlap merged, right crescent stays a separate object',s.length===2,JSON.stringify(s));
// click the overlap: it becomes a separate shape
await setup();await H.click(340,250);await pg.waitForTimeout(200);s=await S();ok('clicking the overlap separates it (3 objects)',s.length===3,JSON.stringify(s));
// Alt+click deletes the overlap
await setup();await pg.keyboard.down('Alt');await H.click(340,250);await pg.keyboard.up('Alt');await pg.waitForTimeout(200);s=await S();
ok('Alt+click deletes the overlap: 2 crescents',s.length===2&&s.every(q=>q.box[2]<125),JSON.stringify(s));
// trail line while dragging
await setup();await pg.mouse.move(H.R.x+260,H.R.y+250);await pg.mouse.down();await pg.mouse.move(H.R.x+300,H.R.y+260,{steps:3});
ok('a trail line follows the drag',await pg.evaluate(()=>!!peng.querySelector('[data-sbtrail]')));
await pg.mouse.up();
// speed: 8 overlapping shapes, hover time
await H.reset();await pg.evaluate(()=>{for(let i=0;i<8;i++)add('<ellipse cx="'+(i*35)+'" cy="'+(150+(i%2)*30)+'" rx="50" ry="50" fill="#'+(['e03131','1971c2','2f9e44','f08c00'][i%4])+'"/>');commit();sel=new Set(objs);setTool('sbd');draw()});
t0=Date.now();await pg.mouse.move(H.R.x+250,H.R.y+300);await pg.mouse.move(H.R.x+300,H.R.y+300);const tf=Date.now()-t0;
ok('first hover with 8 shapes is quick (<1500ms)',tf<1500,tf+'ms');
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await pg.context().grantPermissions(['clipboard-read','clipboard-write']);await pg.evaluate(()=>{z=1;view()});
// 1) a long word inside a star: it breaks over lines from the top, nothing disappears
await pg.evaluate(()=>setTool('sr'));await H.drag(420,330,560,470);await pg.evaluate(()=>setTool('at'));
const p=await pg.evaluate(()=>{const b=objs[0].g.getBoundingClientRect(),r=cv.getBoundingClientRect();return[b.left-r.left+b.width*0.5,b.top-r.top+b.height*0.5]});
await H.click(p[0],p[1]);await pg.waitForTimeout(200);await pg.keyboard.type('w'.repeat(90),{delay:1});await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{const t=objs[0].g.querySelector('text'),ts=[...t.querySelectorAll('tspan')];return{lines:ts.length,chars:ts.map(x=>x.textContent).join('').length,of:t.getAttribute('data-of')}});
ok('a long word in a star breaks over several lines, every letter shows',r.lines>=5&&r.chars===90&&!r.of,r);
await pg.keyboard.press('Escape');
// 2) copy a text object, paste while typing: only the words go in (no SVG code)
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];commit();draw()});
await pg.keyboard.press('t');await H.click(150,150);await pg.keyboard.type('Copied words',{delay:3});await pg.keyboard.press('Escape');
await pg.keyboard.press('v');await pg.evaluate(()=>{sel=new Set([objs[0]]);draw()});await pg.keyboard.press('Control+c');await pg.waitForTimeout(200);
ok('copying a text object puts artwork on the clipboard',/^<svg/.test(await pg.evaluate(()=>navigator.clipboard.readText())));
await pg.keyboard.press('t');await H.click(150,300);await pg.keyboard.type('Start: ',{delay:3});await pg.keyboard.press('Control+v');await pg.waitForTimeout(300);await pg.keyboard.press('Escape');
const raw=await pg.evaluate(()=>objs.map(o=>o.g.querySelector('text').getAttribute('data-raw')));
ok('pasting it into text inserts only "Copied words"',raw.includes('Start: Copied words')&&!raw.some(x=>/<svg|data-raw/.test(x)),raw);
// 3) a copied shape (no text) pastes nothing into text
await pg.keyboard.press('v');await pg.evaluate(()=>{const o=add('<rect x="10" y="10" width="50" height="50" fill="#f00"/>');sel=new Set([o]);commit();draw()});await pg.keyboard.press('Control+c');await pg.waitForTimeout(200);
await pg.keyboard.press('t');await H.click(150,400);await pg.keyboard.type('Only this',{delay:3});await pg.keyboard.press('Control+v');await pg.waitForTimeout(300);await pg.keyboard.press('Escape');
ok('a copied shape pastes no code into text',await pg.evaluate(()=>objs.some(o=>{const t=o.g.querySelector('text');return t&&t.getAttribute('data-raw')==='Only this'})));
// 4) plain text from another app still pastes
await pg.evaluate(()=>navigator.clipboard.writeText('From another app'));await pg.keyboard.press('t');await H.click(400,150);await pg.keyboard.press('Control+v');await pg.waitForTimeout(300);await pg.keyboard.press('Escape');
ok('plain text from other apps pastes normally',await pg.evaluate(()=>objs.some(o=>{const t=o.g.querySelector('text');return t&&t.getAttribute('data-raw')==='From another app'})));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

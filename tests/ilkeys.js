const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
await pg.evaluate(()=>{z=1;view();localStorage.removeItem('masar.symbols.v1')});
// every Illustrator panel key opens its panel
const panels={'Shift+F7':'align','Shift+F6':'appearance','Control+F11':'attributes','F5':'brushes','F6':'color','Shift+F3':'colorguide','Control+F9':'gradient','Shift+F5':'gstyles','Control+F8':'info','F7':'layers','Shift+Control+F9':'pathfinder','Control+F10':'stroke','Shift+Control+F11':'symbols','Shift+F8':'transform','Shift+Control+F10':'transparency','Control+t':'character','Control+Alt+t':'paragraph','Control+Alt+Shift+t':'opentype','Control+Shift+t':'tabs'};
for(const [k,id] of Object.entries(panels)){await pg.evaluate(id=>DK.close(id),id);await pg.keyboard.press(k);await pg.waitForTimeout(120);const o=await pg.evaluate(id=>DK.isOpen(id),id);ok(k+' opens '+id,o);await pg.evaluate(id=>DK.close(id),id)}
// F8 = New Symbol
await pg.keyboard.press('m');await H.drag(300,200,380,260);await pg.keyboard.press('v');await pg.keyboard.press('F8');await pg.waitForTimeout(200);await pg.keyboard.press('Enter');await pg.waitForTimeout(200);
ok('F8 makes a New Symbol from the selection',await pg.evaluate(()=>SYMS.list().length===1&&!!SYMS.instOf(objs[0])));
// Color Guide applies colours
await H.reset();await pg.keyboard.press('m');await H.drag(300,200,380,260);await pg.keyboard.press('v');await pg.evaluate(()=>{fillables(objs[0])[0].setAttribute('fill','#ff0000');FSA='fill';commit();draw()});
await pg.keyboard.press('Shift+F3');await pg.waitForTimeout(200);await pg.selectOption('#cgr','Triad');await pg.waitForTimeout(100);
const cg=await pg.evaluate(()=>[...document.querySelectorAll('#cgp .row .sw[data-c]')].map(b=>b.dataset.c));ok('Color Guide Triad from red',cg.length===3&&cg[0]==='#ff0000'&&cg[1]==='#00ff00'&&cg[2]==='#0000ff',JSON.stringify(cg));
await pg.click('#cgp .row .sw[data-c="#00ff00"]');await pg.waitForTimeout(150);ok('clicking a guide colour fills the object',await pg.evaluate(()=>fillables(objs[0])[0].getAttribute('fill')==='#00ff00'));
const ng=await pg.evaluate(()=>SWAPI.all().length);await pg.click('#cgp [data-save]');await pg.waitForTimeout(150);ok('Save Group to Swatch Panel adds the colours',await pg.evaluate(n=>SWAPI.all().length>=n+3,ng));
// Attributes: fill rule + center
await pg.keyboard.press('Control+F11');await pg.waitForTimeout(200);await pg.click('#atp [data-a=eo]');await pg.waitForTimeout(100);ok('Attributes: Even-Odd fill rule',await pg.evaluate(()=>fillables(objs[0])[0].getAttribute('fill-rule')==='evenodd'));
await pg.click('#atp [data-a=hc]');await pg.waitForTimeout(100);ok("Don't Show Center hides the centre point",await pg.evaluate(()=>{const b=wbox(objs[0]),cx=b.x+b.w/2,cy=b.y+b.h/2;return![...selg.querySelectorAll('g[data-selhl] > rect')].some(q=>Math.abs(+q.getAttribute('x')+(+q.getAttribute('width'))/2-cx)<1&&Math.abs(+q.getAttribute('y')+(+q.getAttribute('height'))/2-cy)<1)}));
await pg.keyboard.press('Control+z');await pg.keyboard.press('Control+z');
// OpenType on text
await pg.keyboard.press('t');await H.click(300,400);await pg.keyboard.type('office 1/2 1st');await pg.keyboard.press('Escape');await pg.keyboard.press('v');await pg.evaluate(()=>{sel=new Set([objs[objs.length-1]]);draw()});
await pg.keyboard.press('Control+Alt+Shift+t');await pg.waitForTimeout(200);await pg.click('#otp [data-f=frac]');await pg.waitForTimeout(150);
ok('OpenType Fractions sets the font feature',await pg.evaluate(()=>/"frac"( 1)?($|,)/.test(objs[objs.length-1].g.querySelector("text").style.fontFeatureSettings)));
await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);ok('Undo removes it',await pg.evaluate(()=>!/frac/.test(objs[objs.length-1].g.querySelector('text').getAttribute('style')||'')));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

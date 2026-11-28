const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x!==undefined&&!c?' '+JSON.stringify(x):''));if(!c)bad++};
await pg.keyboard.press('Control+n');await pg.waitForTimeout(200);
ok('title bar "New Document" + tabs incl. Branding, Social, Free Templates',await pg.evaluate(()=>{const t=[...document.querySelectorAll('#ndd .ndt [data-tab]')].map(b=>b.textContent);return /New Document/.test(document.querySelector('#ndd .ndhd').textContent)&&t.includes('Branding')&&t.includes('Social')&&t.includes('Free Templates')}));
// move the window by its title bar
const r0=await pg.evaluate(()=>{const r=document.querySelector('#ndd .ndb').getBoundingClientRect();return[r.left,r.top]});
await pg.mouse.move(r0[0]+100,r0[1]+12);await pg.mouse.down();await pg.mouse.move(r0[0]+40,r0[1]-20,{steps:5});await pg.mouse.up();
const r1=await pg.evaluate(()=>{const r=document.querySelector('#ndd .ndb').getBoundingClientRect();return[r.left,r.top]});ok('the window moves by its title bar',Math.abs(r1[0]-(r0[0]-60))<3&&Math.abs(r1[1]-(r0[1]-32))<3,[r0,r1]);
// tabs scroll sideways in a narrow window
await pg.setViewportSize({width:900,height:800});await pg.waitForTimeout(150);
const sc=await pg.evaluate(()=>{const t=document.querySelector('#ndd .ndt');const a=t.scrollLeft;t.dispatchEvent(new WheelEvent('wheel',{deltaY:200,bubbles:true,cancelable:true}));return[t.scrollWidth>t.clientWidth,t.scrollLeft>a]});ok('the tab row scrolls when it does not fit',sc[0]&&sc[1],sc);
await pg.setViewportSize({width:1500,height:900});
// branding + social sizes
await pg.click('#ndd [data-tab=branding]');ok('Branding: Square Logo 160 x 160 px',await pg.evaluate(()=>/Square Logo/.test(document.querySelector('#ndd .ndl').textContent)&&/160 x 160 px/.test(document.querySelector('#ndd .ndl').textContent)));
await pg.click('#ndd [data-tab=social]');ok('Social: Ads - Half Page 300 x 600 px, Instagram Story',await pg.evaluate(()=>/Ads - Half Page/.test(document.querySelector('#ndd .ndl').textContent)&&/Instagram Story/.test(document.querySelector('#ndd .ndl').textContent)));
await pg.click('#ndd .ndc[title="Ads - Half Page"]');
// bleed linked: changing top changes all
await pg.fill('#ndbt','9');await pg.waitForTimeout(100);ok('linked bleed: 9 on top sets all four',await pg.evaluate(()=>['ndbt','ndbb','ndbl','ndbr'].every(i=>document.getElementById(i).value==='9')));
await pg.click('#ndblk');await pg.fill('#ndbl','3');ok('unlinked: left alone changes',await pg.evaluate(()=>document.getElementById('ndbl').value==='3'&&document.getElementById('ndbt').value==='9'));
await pg.selectOption('#ndbg','color');await pg.evaluate(()=>{const c=document.getElementById('ndbgc');c.value='#ffeecc';c.dispatchEvent(new Event('input',{bubbles:true}))});
await pg.click('#ndadv');await pg.selectOption('#ndres','300');ok('advanced options open (colour mode, raster effects)',await pg.evaluate(()=>!document.querySelector('#ndd .ndadvb').hidden));
await pg.screenshot({path:'/tmp/mdl/ndoc.png'});
await pg.click('#ndcreate');await pg.waitForTimeout(300);
const m=await pg.evaluate(()=>({meta:DOCMETA,ab:[ARTS[0].w,ARTS[0].h],bleed:[...document.querySelectorAll('#abg rect.abbleed')].map(r=>[+r.getAttribute('x'),+r.getAttribute('y'),+r.getAttribute('width'),+r.getAttribute('height')]),fill:document.querySelector('#abg rect.abr').getAttribute('fill')}));
ok('document made with the bleed, background colour and 300 ppi',m.ab.join()==='300,600'&&m.meta.bleed.t===9&&m.meta.bleed.l===3&&m.meta.bg==='#ffeecc'&&m.meta.res===300,m);
ok('the bleed shows as a red line around the artboard',m.bleed.length===1&&m.bleed[0].join()==='-3,-9,312,618',m.bleed);ok('the artboard takes the background colour',m.fill==='#ffeecc');
// saved in the file and back
const js=await pg.evaluate(()=>docJSON());await pg.evaluate(()=>{docClear();abRender()});ok('New / clear resets them',await pg.evaluate(()=>!DOCMETA&&!document.querySelector('#abg rect.abbleed')));
await pg.evaluate(j=>{fileLoadMasar(JSON.parse(j));abRender()},js);ok('saved in the .masar file and loaded back',await pg.evaluate(()=>DOCMETA&&DOCMETA.bleed.t===9&&!!document.querySelector('#abg rect.abbleed')));
// Document Setup edits the bleed
await pg.evaluate(()=>window.docSetup());await pg.waitForTimeout(200);await pg.fill('.fxb [data-k="blt"]','20');await pg.click('.fxb button.pri');await pg.waitForTimeout(200);
ok('Document Setup changes the bleed',await pg.evaluate(()=>DOCMETA.bleed.t===20));
// free templates
await pg.keyboard.press('Control+n');await pg.waitForTimeout(200);await pg.click('#ndd [data-tab=tpl]');await pg.waitForTimeout(300);
ok('Free Templates lists Masar templates with previews',await pg.evaluate(()=>document.querySelectorAll('#ndd .ndtpl').length>=8&&!!document.querySelector('#ndd .ndtpl svg')));
await pg.fill('#ndq','card');await pg.waitForTimeout(200);ok('template search',await pg.evaluate(()=>document.querySelectorAll('#ndd .ndtpl').length===1));
await pg.click('#ndd .ndtpl');await pg.click('#ndcreate');await pg.waitForTimeout(400);if(await pg.evaluate(()=>!!document.querySelector('.fxm')))await pg.click('.fxm button:has-text("Don\'t Save")').catch(()=>{});await pg.waitForTimeout(300);
ok('creating from a template opens it',await pg.evaluate(()=>ARTS[0].w===252&&objs.length>=5));
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

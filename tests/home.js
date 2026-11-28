const L=require('./lib.js');
(async()=>{const H=await L.open({home:true}),pg=H.pg;let bad=0;const ok=(n,c,x)=>{console.log((c?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!c)bad++};
ok('Home shows at startup (first thing the customer sees)',await pg.evaluate(()=>HOME.isOpen()));
await pg.screenshot({path:'/tmp/mdl/home.png'});
const g=await pg.evaluate(()=>{const r=e=>document.querySelector(e).getBoundingClientRect();return{l:r('#mblogo').x,h:r('#mbhome').x,f:r('#mbFile').x}});
ok('menu bar: Masar logo, Home, then File',g.l<g.h&&g.h<g.f,JSON.stringify(g));
ok('sidebar like Illustrator',await pg.evaluate(()=>[...document.querySelectorAll('#home .hnav a span,#home .hnav .hsec')].map(a=>a.textContent).join('|')==='Home|Learn|MASAR AI|Generation history|FILES|Your files|Shared with you|Projects|Templates|Deleted'),await pg.evaluate(()=>[...document.querySelectorAll('#home .hnav a span,#home .hnav .hsec')].map(a=>a.textContent).join('|')));
ok('back arrow and big logo on top, Masar Cloud at the bottom',await pg.evaluate(()=>!!document.querySelector('#home .hback')&&!!document.querySelector('#home .hlogo svg')&&!!document.querySelector('#home #hcloud .hcl')));
// templates
await pg.click('#home .hnav a[data-t=templates]');ok('Templates page lists the starter designs',await pg.evaluate(()=>document.querySelectorAll('#home .tpc').length===TEMPLATES.length&&TEMPLATES.length>=8));
await pg.screenshot({path:'/tmp/mdl/tpl.png'});
await pg.click('#home .tpc[title="Use Business Card"]');await pg.waitForTimeout(250);ok('a template opens as a real, editable document',await pg.evaluate(()=>!HOME.isOpen()&&ARTS[0].w===252&&objs.length===7&&objs.filter(isText).length===4));
await pg.evaluate(()=>{window.dkSaved&&dkSaved()});
// generation history
await pg.evaluate(async()=>{const c=document.createElement('canvas');c.width=40;c.height=30;const x=c.getContext('2d');x.fillStyle='#f00';x.fillRect(0,0,40,30);await genAdd('Remove Background',c.toDataURL('image/png'),40,30)});
await pg.click('#mbhome');await pg.click('#home .hnav a[data-t=gen]');await pg.waitForTimeout(300);ok('Generation history shows the result',await pg.evaluate(()=>document.querySelectorAll('#home .hgc.gen').length===1));
const n0=await pg.evaluate(()=>objs.length);await pg.click('#home [data-gp]');await pg.waitForTimeout(300);ok('Place puts it back into the document',await pg.evaluate(n0=>objs.length===n0+1&&!!objs[objs.length-1].g.querySelector('image'),n0));
await pg.evaluate(()=>{window.dkSaved&&dkSaved()});
// projects
await pg.click('#mbhome');await pg.click('#home .hnav a[data-t=projects]');await pg.click('#home [data-pnew]');await pg.waitForTimeout(100);await pg.keyboard.press('Control+a');await pg.keyboard.type('Client A');await pg.keyboard.press('Enter');await pg.waitForTimeout(100);
ok('New project',await pg.evaluate(()=>document.querySelectorAll('#home .hgc.prj').length===1));await pg.keyboard.press('Escape');
await pg.evaluate(()=>HOME.open('home'));
ok('quick start: Letter, A4, Postcard, Common, iPhone X, HDV/HDTV 1080, More presets',await pg.evaluate(()=>[...document.querySelectorAll('#home .pc b')].map(b=>b.textContent).join('|')==='Letter|A4|Postcard|Common|iPhone X|HDV/HDTV 1080|More presets'));
ok('Letter card reads 612 x 792 pt',await pg.evaluate(()=>/612 x 792 pt/.test(document.querySelector('#home .pc span').textContent)));
await pg.click('#home .pc[data-qn="iPhone X"]');await pg.waitForTimeout(200);ok('iPhone X preset creates a 375 x 812 document and closes Home',await pg.evaluate(()=>!HOME.isOpen()&&ARTS.length===1&&ARTS[0].w===375&&ARTS[0].h===812));
// recent
await pg.evaluate(()=>{add('<rect x="10" y="10" width="50" height="40" fill="#e03131"/>');commit();draw();window.fileDownload=()=>{}});await pg.evaluate(()=>fileSave());await pg.waitForTimeout(100);await pg.keyboard.press('Enter');await pg.waitForTimeout(100);
ok('saved file appears in Recent',await pg.evaluate(()=>recentList().length===1));
await pg.evaluate(()=>{objs.slice().forEach(o=>o.g.remove());objs=[];commit();draw();window.dkSaved&&dkSaved()});
await pg.click('#mbhome');await pg.waitForTimeout(150);await pg.click('#home .hnav a[data-t=files]');await pg.selectOption('#home [data-mv]',{label:'Client A'});ok('a file can be put in a project',await pg.evaluate(()=>JSON.parse(localStorage.getItem('masar.recent.v1'))[0].p));await pg.click('#home .hnav a[data-t=home]');await pg.click('#home [data-view=grid]');ok('grid view',await pg.evaluate(()=>!!document.querySelector('#home .hgc')));
await pg.fill('#home [data-flt]','zzz');ok('filter hides non-matching files',await pg.evaluate(()=>!document.querySelector('#home .rf')));await pg.fill('#home [data-flt]','');
await pg.click('#home [data-view=list]');await pg.click('#home tr.rf');await pg.waitForTimeout(250);ok('clicking a recent file opens it',await pg.evaluate(()=>objs.length===1&&!HOME.isOpen()));
await pg.click('#mbhome');await pg.click('#home tr.rf .rdel');ok('× moves it to Deleted',await pg.evaluate(()=>recentList().length===0));
await pg.click('#home .hnav a[data-t=deleted]');await pg.click('#home [data-rest="0"]');ok('Restore puts it back',await pg.evaluate(()=>recentList().length===1));
await pg.click('#home .hnav a[data-t=learn]');ok('Learn lists the tools',await pg.evaluate(()=>document.querySelectorAll('#home .hlc').length>40));
await pg.fill('#home [data-lflt]','pen');ok('Learn search',await pg.evaluate(()=>[...document.querySelectorAll('#home .hlc')].filter(c=>c.style.display!=='none').length<10));
await pg.click('#home .hlc[data-tool=p]');ok('Learn card picks the tool',await pg.evaluate(()=>tool==='p'&&!HOME.isOpen()));
// New Document dialog
await pg.click('#mbhome');await pg.click('#home .hs [data-a=new]');await pg.waitForTimeout(150);
ok('New file opens the New Document dialog',await pg.evaluate(()=>!!document.getElementById('ndd')&&!HOME.isOpen()));
ok('tabs like Illustrator',await pg.evaluate(()=>[...document.querySelectorAll('#ndd .ndt [data-tab]')].map(b=>b.textContent).join('|')==='Recent|Saved|Mobile|Web|Print|Branding|Social|Art & Illustration|Film & Video|Free Templates'));
await pg.screenshot({path:'/tmp/mdl/newdoc.png'});
await pg.click('#ndd [data-tab=print]');await pg.click('#ndd .ndc[title="A4"]');ok('A4 fills the details (595.28 x 841.89 pt)',await pg.evaluate(()=>document.getElementById('ndw').value==='595'||document.getElementById('ndw').value==='595.28'),await pg.evaluate(()=>document.getElementById('ndw').value));
await pg.selectOption('#ndu','mm');ok('units switch to mm shows 210',await pg.evaluate(()=>Math.abs(+document.getElementById('ndw').value-210)<0.05),await pg.evaluate(()=>document.getElementById('ndw').value));
await pg.click('#ndd [data-or=l]');ok('Landscape swaps width and height',await pg.evaluate(()=>Math.abs(+document.getElementById('ndw').value-297)<0.05));
await pg.fill('#ndna','3');await pg.click('#ndsave');await pg.waitForTimeout(100);await pg.keyboard.press('Enter');await pg.waitForTimeout(100);ok('Save Preset adds to Saved',await pg.evaluate(()=>document.querySelector('#ndd .ndt button.on').dataset.tab==='saved'&&document.querySelectorAll('#ndd .ndc').length===1));
await pg.click('#ndcreate');await pg.waitForTimeout(250);ok('Create makes 3 landscape A4 artboards',await pg.evaluate(()=>ARTS.length===3&&Math.round(ARTS[0].w)===842&&Math.round(ARTS[0].h)===595));
await pg.keyboard.press('Control+n');await pg.waitForTimeout(150);ok('Ctrl+N opens the dialog, Recent remembers the last size',await pg.evaluate(()=>{const d=document.getElementById('ndd');if(!d)return false;d.querySelector('[data-tab=recent]').click();return d.querySelectorAll('.ndc').length>=1}));
await pg.keyboard.press('Escape');ok('Esc closes it',await pg.evaluate(()=>!document.getElementById('ndd')));
await pg.click('#mbhome');await pg.click('#home [data-start]');ok('Show Home at startup can be turned off',await pg.evaluate(()=>localStorage.getItem('masar.home.start')==='0'));await pg.keyboard.press('Escape');
ok('Alt+F still opens File',await(async()=>{await pg.keyboard.press('Alt+f');await pg.waitForTimeout(100);const r=await pg.evaluate(()=>document.getElementById('mbFile').classList.contains('on'));await pg.keyboard.press('Escape');return r})());
console.log('errs',H.errs);console.log(bad?'FAILED '+bad:'ALL OK');await H.b.close()})();

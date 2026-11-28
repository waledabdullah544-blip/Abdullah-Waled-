const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.evaluate(()=>{localStorage.setItem('masar-ctl','bottom')});await pg.reload();await pg.waitForTimeout(800);
const r=await pg.evaluate(()=>({bottom:document.body.classList.contains('ctl-bottom'),top:document.querySelector('header').getBoundingClientRect().top}));
console.log((!r.bottom&&r.top<80?'PASS':'FAIL')+' control bar opens at the top',JSON.stringify(r));
await pg.keyboard.press('m');await H.drag(200,150,400,300);await pg.keyboard.press('Shift+d');await pg.keyboard.press('Shift+d');
console.log((await pg.evaluate(()=>drawMode()==='i'&&[...document.querySelectorAll('#selg path')].some(p=>p.getAttribute('stroke-dasharray')))?'PASS':'FAIL')+' Shift+D to Draw Inside shows the marks at once');
console.log('errs',H.errs);await H.b.close()})();

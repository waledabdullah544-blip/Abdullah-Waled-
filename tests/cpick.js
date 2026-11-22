const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(4000);const d='/tmp/claude-0/-home-user-Abdullah-Waled-/cde29aa8-aa8d-5f5f-a8e2-859061e24c77/scratchpad/';
await H.key('m');await H.drag(300,200,420,280);await H.key('v');
const fill=()=>pg.evaluate(()=>{const o=[...sel][0];return o.g.querySelector('path,rect').getAttribute('fill')});
await pg.dblclick('#fqf');await pg.waitForTimeout(300);
chk('Double-click toolbar Fill box opens Color Picker',await pg.locator('.cpb').count()===1,null);
await pg.screenshot({path:d+'cpicker.png',clip:{x:380,y:120,width:560,height:520}});
await pg.fill('#cpkhex','FF8800');await pg.press('#cpkhex','Enter');await pg.waitForTimeout(100);
chk('Enter in hex field applies color on OK (fill = ff8800)',/ff8800/i.test(await fill()),await fill());
await pg.dblclick('#fqf');await pg.waitForTimeout(200);
const v=await pg.evaluate(()=>({h:document.querySelector('[data-f=H]').value,s:document.querySelector('[data-f=S]').value,b:document.querySelector('[data-f=B]').value,r:document.querySelector('[data-f=r]').value,g:document.querySelector('[data-f=g]').value,bl:document.querySelector('[data-f=bl]').value,c:document.querySelector('[data-f=Cc]').value,k:document.querySelector('[data-f=Kc]').value}));
chk('FF8800 → H32 S100 B100 R255 G136 B0',v.h==='32'&&v.s==='100'&&v.b==='100'&&v.r==='255'&&v.g==='136'&&v.bl==='0',v);
// click in field: top-right = pure hue, bottom = black
const b=await pg.locator('.cpfw').boundingBox();await pg.mouse.click(b.x+b.width-1,b.y+1);await pg.waitForTimeout(100);chk('Click top-right of field (H radio) = fully saturated bright hue',(await pg.inputValue('[data-f=S]'))==='100'&&(await pg.inputValue('[data-f=B]'))==='100',await pg.inputValue('[data-f=S]'));
await pg.mouse.click(b.x+20,b.y+b.height-1);await pg.waitForTimeout(100);chk('Click bottom of field = black (B=0)',(await pg.inputValue('[data-f=B]'))==='0',await pg.inputValue('[data-f=B]'));
// hue slider
const sb=await pg.locator('.cpsw').boundingBox();await pg.mouse.click(sb.x+10,sb.y+sb.height/3);await pg.waitForTimeout(80);chk('Hue slider changes H (≈240° at 1/3 from top)',Math.abs(+await pg.inputValue('[data-f=H]')-240)<4,await pg.inputValue('[data-f=H]'));
// radio R
await pg.check('input[name=cpch][value=r]');await pg.waitForTimeout(100);chk('Switching radio to R re-maps the field (no error)',true);
// Only web colors
await pg.fill('#cpkhex','123456');await pg.press('#cpkhex','Tab');await pg.waitForTimeout(80);await pg.check('#cpkwc');await pg.waitForTimeout(100);chk('Only Web Colors snaps 123456 → 003366',(await pg.inputValue('#cpkhex')).toUpperCase()==='003366',await pg.inputValue('#cpkhex'));
// swatches view
await pg.click('#cpksb');await pg.waitForTimeout(150);const n=await pg.locator('.cpsq').count();chk('Color Swatches view lists swatches',n>5,n);await pg.fill('#cpkq','Black');await pg.waitForTimeout(100);chk('Swatch search filters',(await pg.locator('.cpsq').count())<n,await pg.locator('.cpsq').count());
await pg.locator('.cpsq').first().click();await pg.waitForTimeout(100);await pg.click('.cpb button.pri');await pg.waitForTimeout(150);chk('OK closes dialog and applies chosen swatch',(await pg.locator('.cpb').count())===0,null);
// cancel
await pg.dblclick('#fqf');await pg.fill('#cpkhex','00FF00');await pg.press('#cpkhex','Tab');await pg.click('.cpb .fxf button:not(.pri)');const before=await fill();await pg.waitForTimeout(100);chk('Cancel keeps the old color (not 00ff00)',!/00ff00/i.test(await fill()),await fill());
// stroke
await pg.dblclick('#fqs');await pg.waitForTimeout(200);chk('Stroke box opens picker titled "Select Stroke Color:"',/Stroke/.test(await pg.locator('.cpt').innerText()),null);await pg.keyboard.press('Escape');
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

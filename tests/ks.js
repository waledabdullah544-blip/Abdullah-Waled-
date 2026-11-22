const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const pg=H.pg;pg.setDefaultTimeout(5000);const T=()=>pg.evaluate('tool');
await pg.keyboard.press('Control+Alt+Shift+K');await pg.waitForTimeout(250);chk('Ctrl+Alt+Shift+K opens Keyboard Shortcuts',await pg.locator('.ksb').count()===1,null);
await pg.locator('.ksr[data-id="m"]').click();await pg.keyboard.press('Shift+U');await pg.waitForTimeout(100);
const warn=await pg.locator('#ksm').innerText();console.log('msg',JSON.stringify(warn));
await pg.locator('.ksr[data-id="l"]').click();await pg.keyboard.press('Shift+U');await pg.waitForTimeout(100);const w2=await pg.locator('#ksm').innerText();chk('Conflict message when a key is already used',/was assigned to Rectangle/.test(w2),w2);
await pg.locator('.ksr[data-id="sc"]').click();await pg.keyboard.press('X');await pg.waitForTimeout(80);
await pg.click('.ksb button.pri');await pg.waitForTimeout(150);
await pg.keyboard.press('Shift+U');await pg.waitForTimeout(100);chk('New key works: Shift+U = Ellipse (moved from Rectangle)',await T()==='l',await T());
await pg.keyboard.press('v');await pg.keyboard.press('m');await pg.waitForTimeout(80);chk('Old default M no longer selects Rectangle (cleared)',await T()==='v',await T());
await pg.keyboard.press('x');await pg.waitForTimeout(80);console.log('key X now ->',await T(),'(Scissors expected; X is also fill/stroke toggle in Illustrator)');
await pg.keyboard.press('l');await pg.waitForTimeout(80);chk('Old default L no longer selects Ellipse',await T()!=='l',await T());
await pg.reload();await pg.waitForTimeout(800);await pg.keyboard.press('Shift+U');await pg.waitForTimeout(100);chk('Shortcuts persist after reload',await T()==='l',await T());
// reset all
await pg.keyboard.press('Control+Alt+Shift+K');await pg.waitForTimeout(200);await pg.click('.ksb button:has-text("Reset All")');await pg.click('.ksb button.pri');await pg.waitForTimeout(150);
await pg.keyboard.press('v');await pg.keyboard.press('m');await pg.waitForTimeout(80);chk('Reset All restores M = Rectangle',await T()==='m',await T());
console.log(res.join('\n'));console.log('errors',H.errs);await H.b.close()})();

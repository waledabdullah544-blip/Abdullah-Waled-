const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(5000);
const ITEMS=[['Convert to Shape','Rectangle'],['Convert to Shape','Rounded Rectangle'],['Convert to Shape','Ellipse'],['Distort & Transform','Pucker & Bloat'],['Distort & Transform','Roughen'],['Distort & Transform','Transform'],['Distort & Transform','Tweak'],['Distort & Transform','Twist'],['Distort & Transform','Zig Zag'],['Path','Offset Path'],['Stylize','Drop Shadow'],['Stylize','Feather'],['Stylize','Inner Glow'],['Stylize','Outer Glow'],['Stylize','Round Corners'],['Stylize','Scribble'],['Warp','Arc'],['Warp','Flag'],['Warp','Wave'],['Blur','Gaussian Blur']];
const dsnap=()=>pg.evaluate(()=>{const o=[...sel][0];if(!o)return null;const ps=[...o.g.querySelectorAll('path,rect,ellipse')];return{tags:ps.map(p=>p.tagName).join(','),dlen:ps.map(p=>(p.getAttribute('d')||'').length).join(','),fx:o.g.dataset.fx||null,px:o.g.dataset.px||null,attrs:[...o.g.attributes].map(a=>a.name).filter(n=>/data-(fx|px|ef|live)/.test(n)).join(',')}});
for(const [grp,it] of ITEMS){await H.reset();await H.key('m');await H.drag(300,200,420,280);await H.key('v');await pg.waitForTimeout(80);
 const before=await dsnap();
 await pg.locator('#mbar button:text-is("Effect")').click();await pg.waitForTimeout(80);await pg.locator('.mdd button',{hasText:grp}).first().hover();await pg.waitForTimeout(120);
 const btn=pg.locator('.msub button',{hasText:it}).first();if(!(await btn.count())){console.log(it.padEnd(18),'MENU ITEM MISSING');await pg.keyboard.press('Escape');continue}
 await btn.click();await pg.waitForTimeout(250);
 const dlg=await pg.evaluate(()=>{const b=document.querySelector('.fxb');if(!b)return null;return{title:b.querySelector('b').textContent,fields:[...b.querySelectorAll('label')].map(l=>l.innerText.trim().replace(/\s+/g,' ')+'='+((l.querySelector('input,select')||{}).value??'')+((l.querySelector('input[type=checkbox]')||{}).checked?'[x]':'')).join(' | ')}});
 if(dlg){const ok=pg.locator('.fxb button.pri');await ok.click();await pg.waitForTimeout(250)}
 const after=await dsnap();const changed=JSON.stringify(before)!==JSON.stringify(after);
 await pg.keyboard.press('Control+z');await pg.waitForTimeout(150);const undone=await dsnap();
 const ap=await pg.evaluate(()=>{const e=document.querySelectorAll('#app .apr');return e.length});
 console.log(it.padEnd(18),'| dlg:',dlg?dlg.title+' :: '+dlg.fields:'(no dialog)','| changed:',changed,'| live-attr:',after&&(after.fx||after.px||after.attrs)?'yes':'no','| undo restores:',JSON.stringify(undone)===JSON.stringify(before));
}
console.log('errors',H.errs);await H.b.close()})();

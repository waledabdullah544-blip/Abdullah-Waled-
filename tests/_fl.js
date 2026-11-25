const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;
await pg.evaluate(()=>openFly());await pg.waitForTimeout(200);
console.log(await pg.evaluate(()=>{const h=document.querySelector('#fly > .mxh'),f=document.getElementById('fly'),b=h.firstChild,cs=getComputedStyle(h),fs=getComputedStyle(f),bs=getComputedStyle(b);return{hw:h.getBoundingClientRect().width,fw:f.getBoundingClientRect().width,disp:cs.display,jc:cs.justifyContent,fdisp:fs.display,fdir:fs.flexDirection,bw:bs.width,bmarginL:bs.marginLeft,bdisp:bs.display,bflex:bs.flex,bpos:bs.position,fpad:fs.paddingLeft}}));
await H.b.close()})();

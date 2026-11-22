const {open}=require('./lib');
(async()=>{const H=await open(),pg=H.pg;pg.setDefaultTimeout(5000);
await H.key('\\');await H.drag(100,100,300,300);await H.key('\\');await H.drag(100,200,300,150);await H.key('p');
const lab=async(x,y)=>{await pg.mouse.move(H.R.x+x,H.R.y+y);await pg.waitForTimeout(250);return pg.evaluate(()=>[...SGG.querySelectorAll('text')].map(e=>e.textContent).concat([(document.getElementById('sglab')||{}).textContent||'']).filter(Boolean))};
console.log('near intersection (183,183):',JSON.stringify(await lab(183,183)));
console.log('on path far from anchors (150,150):',JSON.stringify(await lab(150,152)));
console.log('near anchor (101,101):',JSON.stringify(await lab(102,102)));
console.log('empty area (500,400):',JSON.stringify(await lab(500,400)));
// select tool with line selected: path highlight
await H.b.close()})();

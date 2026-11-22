const {open}=require('./lib');
(async()=>{const H=await open();await H.key('m');await H.drag(100,100,200,180);await H.key('v');
await H.drag(150,140,260,140,['Alt']);let s=await H.state();console.log('Alt+drag n=',s.n,JSON.stringify(s.o.map(o=>[o.x,o.y])));
await H.pg.keyboard.press('Control+z');await H.pg.waitForTimeout(60);s=await H.state();console.log('after undo n=',s.n);
console.log(await H.pg.evaluate(()=>JSON.stringify(typeof SHD!=='undefined'?SHD:null)));await H.b.close()})();

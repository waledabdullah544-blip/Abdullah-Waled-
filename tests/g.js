const {open}=require('./lib');
(async()=>{const H=await open();await H.key('m');await H.drag(100,100,300,200);await H.key('g');await H.drag(100,150,300,150);
console.log(await H.pg.evaluate(()=>objs[0].g.innerHTML.slice(0,300)));console.log(await H.pg.evaluate(()=>({tool,sel:sel.size})));await H.b.close()})();

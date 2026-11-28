const L=require('./lib.js');
(async()=>{const H=await L.open(),pg=H.pg;await pg.evaluate(()=>{z=1;view()});
await pg.evaluate(()=>setTool('spi'));
await pg.mouse.move(H.R.x+300,H.R.y+250);await pg.mouse.down();await pg.mouse.move(H.R.x+400,H.R.y+250,{steps:5});
for(let i=0;i<14;i++)await pg.keyboard.press('ArrowUp');await pg.mouse.move(H.R.x+402,H.R.y+252,{steps:2});
await pg.screenshot({path:'/tmp/mdl/spi1.png',clip:{x:H.R.x+150,y:H.R.y+100,width:400,height:300}});
await pg.mouse.up();await pg.waitForTimeout(200);
console.log(await pg.evaluate(()=>({n:objs.length,seg:(objs[0].g.querySelector('path').getAttribute('d').match(/C/g)||[]).length})));
await pg.screenshot({path:'/tmp/mdl/spi2.png',clip:{x:H.R.x+150,y:H.R.y+100,width:400,height:300}});
// second spiral: draw after (are segments kept?), then Down to few
await pg.mouse.move(H.R.x+300,H.R.y+450);await pg.mouse.down();await pg.mouse.move(H.R.x+380,H.R.y+450,{steps:5});
for(let i=0;i<40;i++)await pg.keyboard.press('ArrowUp');await pg.mouse.move(H.R.x+381,H.R.y+451);await pg.mouse.up();await pg.waitForTimeout(200);
console.log(await pg.evaluate(()=>({n:objs.length,seg:(objs[1].g.querySelector('path').getAttribute('d').match(/C/g)||[]).length,d:objs[1].g.querySelector('path').getAttribute('d').slice(-200)})));
await pg.screenshot({path:'/tmp/mdl/spi3.png',clip:{x:H.R.x+150,y:H.R.y+330,width:400,height:240}});
console.log(H.errs);await H.b.close()})();

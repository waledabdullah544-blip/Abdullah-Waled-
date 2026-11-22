const {open}=require('./lib');
(async()=>{const H=await open(),res=[];const chk=(n,ok,d)=>res.push((ok?'PASS ':'FAIL ')+n+(ok?'':'  -> '+JSON.stringify(d)));
const dk=()=>H.pg.evaluate(()=>JSON.stringify({L:DK.d.L.map(g=>g.t),R:DK.d.R.map(g=>g.t),F:DK.f.map(g=>g.t),dc:DK.dc,dw:DK.dw}));
console.log('initial',await dk());
// find tab elements
const tabs=await H.pg.evaluate(()=>[...document.querySelectorAll('[data-dkt],.dktab,.tabs [data-id],.dkt')].slice(0,12).map(e=>e.className+'|'+(e.dataset.id||e.dataset.dkt||e.textContent.trim().slice(0,20))));
console.log('tab-like els',JSON.stringify(tabs));
const hdr=await H.pg.evaluate(()=>[...document.querySelectorAll('#dkR *,.dkR *,[id*=dock] *')].filter(e=>/^(Layers|Properties)$/.test((e.textContent||'').trim())&&e.children.length===0).map(e=>({c:e.className,t:e.tagName,p:e.parentElement.className,r:(r=>({x:r.left,y:r.top,w:r.width,h:r.height}))(e.getBoundingClientRect())})));
console.log('headers',JSON.stringify(hdr));
await H.b.close()})();

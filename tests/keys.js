const {open}=require('./lib');
// Illustrator default tool shortcuts (Adobe helpx "Default keyboard shortcuts") -> masar tool id for the tools Masar HAS.
const HAVE=[['v','v'],['a','a'],['y','mw'],['q','ls'],['p','p'],['+','ap'],['-','dp'],['C','cp'],['t','t'],['T','tt'],['\\','ln'],['m','m'],['l','l'],['b','br'],['B','bb'],['n','pc'],['N','shp'],['E','er'],['c','sc'],['r','ro'],['o','rf'],['s','sl'],['e','ft'],['g','gr'],['i','ey'],['h','h'],['z','z'],['R','wa']];
// Illustrator shortcuts of tools Masar does NOT have yet: pressing them must NOT switch to some other tool.
const MISSING=['M','L','P','V','w','W','u','k','K','j','S','O','H','A','Y'];
const CODE=ch=>/[a-z]/i.test(ch)?'Key'+ch.toUpperCase():({'+':'Equal','-':'Minus','\\':'Backslash'})[ch];
(async()=>{const H=await open(),bad=[];
const press=async(ch,m={})=>H.pg.evaluate(([k,c,m])=>document.body.dispatchEvent(new KeyboardEvent('keydown',{key:k,code:c,bubbles:true,cancelable:true,...m})),[ch,CODE(ch),m]);
for(const [ch,id] of HAVE){await H.pg.evaluate(()=>setTool('v'));await H.pg.evaluate(()=>setTool('p'));await press(ch,{shiftKey:/[A-Z+]/.test(ch)});const t=await H.pg.evaluate('tool');if(t!==id)bad.push(`key ${ch} -> ${t}, expected ${id}`)}
for(const ch of MISSING){await H.pg.evaluate(()=>setTool('l'));await press(ch,{shiftKey:/[A-Z]/.test(ch)});const t=await H.pg.evaluate('tool');if(t!=='l')bad.push(`Illustrator-only key ${ch} wrongly switched tool to ${t}`)}
await H.pg.evaluate(()=>setTool('l'));await press('=',{});let t=await H.pg.evaluate('tool');if(t!=='l')bad.push('plain = switched tool to '+t);
// Arabic layout
const AR=[['ر','R','ro'],['ق','E','ft'],['م','M','m'],['ا','H','h']];
for(const [k,c,id] of AR){await H.pg.evaluate(()=>setTool('p'));await H.pg.evaluate(([k,c])=>document.body.dispatchEvent(new KeyboardEvent('keydown',{key:k,code:'Key'+c,bubbles:true,cancelable:true})),[k,c]);const tt=await H.pg.evaluate('tool');if(tt!==id)bad.push(`arabic ${k} (Key${c}) -> ${tt}, expected ${id}`)}
console.log(bad.length?'FAILURES:\n'+bad.join('\n'):'ALL TOOL SHORTCUTS MATCH ('+(HAVE.length+MISSING.length+5)+' checks)','errors',H.errs);await H.b.close()})();

/* Real local Chrome headless checks via built-in Node WebSocket/CDP; no installs. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process'),{pathToFileURL}=require('node:url');
const OUT=__dirname,profile=path.join(OUT,'browser-profile'),report={status:'RUNNING',checks:[],errors:[],physicalDevice:false};
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const chrome=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>fs.existsSync(p));
if(!chrome)throw new Error('No local Chromium binary; record browser QA unavailable');
fs.mkdirSync(profile,{recursive:true});
const portFile=path.join(profile,'DevToolsActivePort');if(fs.existsSync(portFile))fs.unlinkSync(portFile);
const log=fs.openSync(path.join(OUT,'browser-console.log'),'w');
const child=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-sync','--disable-component-update','--disable-extensions','--disable-breakpad','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
let socket,serial=0;const pending=new Map();
function send(method,params={}){return new Promise((resolve,reject)=>{const id=++serial;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout: '+method));},15000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;}
async function settle(){await evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');}
async function control(id,value){await evaluate(`(()=>{const e=document.getElementById(${JSON.stringify(id)});${typeof value==='boolean'?'e.checked='+value:'e.value='+JSON.stringify(value)};e.dispatchEvent(new Event('change',{bubbles:true}));})()`);await settle();}
async function click(id){await evaluate(`document.getElementById(${JSON.stringify(id)}).click()`);await settle();}
async function state(){return evaluate('window.__prototypeVerification');}
async function viewport(width,dpr=1){await send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:dpr,mobile:false});await settle();}
async function pointer(type,p){await send('Input.dispatchMouseEvent',{type,x:p.x,y:p.y,button:type==='mouseMoved'?'none':'left',clickCount:1,buttons:type==='mouseReleased'?0:1});}
async function point(x,y){await evaluate('document.getElementById("viewport").scrollIntoView({block:"center"})');await settle();return evaluate(`(()=>{const v=document.getElementById('viewport').getBoundingClientRect(),q=PrototypeCore.forward(window.__prototypeVerification.camera,{x:${x},y:${y}});return {x:v.left+q.x,y:v.top+q.y};})()`);}
async function tap(x,y){const p=await point(x,y);await pointer('mousePressed',p);await pointer('mouseReleased',p);await settle();}
function pass(name){report.checks.push(name);}
(async()=>{
 try{
  let port;for(let i=0;i<100;i++){const file=path.join(profile,'DevToolsActivePort');if(fs.existsSync(file)){port=fs.readFileSync(file,'utf8').split('\n')[0];break;}await delay(100);}
  if(!port)throw new Error('Browser launch failed; see browser-console.log');
  const pages=await fetch('http://127.0.0.1:'+port+'/json/list').then(r=>r.json());const page=pages.find(x=>x.type==='page');
  socket=new WebSocket(page.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  socket.onmessage=event=>{const message=JSON.parse(String(event.data));if(message.id&&pending.has(message.id)){const task=pending.get(message.id);pending.delete(message.id);clearTimeout(task.timer);message.error?task.reject(new Error(JSON.stringify(message.error))):task.resolve(message.result);}if(message.method==='Runtime.exceptionThrown')report.errors.push(message.params.exceptionDetails.text);};
  await send('Runtime.enable');await send('Page.enable');report.browser=await send('Browser.getVersion');
  await send('Page.navigate',{url:pathToFileURL(path.join(OUT,'index.html')).href});
  for(let i=0;i<100;i++){if(await evaluate('Boolean(window.__prototypeVerification?.diagnostics.loaded)'))break;await delay(100);}
  assert.equal((await state()).diagnostics.loaded,true);pass('file:// local script/image preload in real Chrome');
  assert.equal(await evaluate('document.getElementById("art").naturalWidth'),960);pass('native pair dimensions 960×540');
  for(const width of [320,390,430,768,960]){
   // Desktop classic scrollbars consume layout width; give the requested scene room.
   await viewport(width+32);await control('width',String(width));await control('snapshot','original');
   const s=await state();assert.ok(Math.abs(s.diagnostics.actualViewport[0]-width)<.1);assert.ok(Math.abs(s.diagnostics.effectiveFitWidth-width)<.1);assert.equal(s.camera.z,1);
   const full=await evaluate(`(()=>{const a=document.getElementById('art').getBoundingClientRect(),v=document.getElementById('viewport').getBoundingClientRect();return {ratio:a.width/a.height,contained:a.left>=v.left-.1&&a.top>=v.top-.1&&a.right<=v.right+.1&&a.bottom<=v.bottom+.1,overflow:document.documentElement.scrollWidth>innerWidth};})()`);
   assert.ok(Math.abs(full.ratio-16/9)<.001);assert.equal(full.contained,true);assert.equal(full.overflow,false);pass(width+' CSS px complete fit, aspect and page overflow');
  }
  await viewport(320);await control('width','320');assert.ok((await state()).diagnostics.actualViewport[0]<=320);pass('narrow desktop viewport reports available width rather than pretending requested width');
  await viewport(352,2);await control('width','320');await control('snapshot','changed');await tap(720,135);assert.equal((await state()).lastSelection.objectId,'object-stand-12');pass('actual browser pointer canonical stand hit at DPR 2');
  await tap(172.8,351);assert.equal((await state()).lastSelection.objectId,'object-passport');pass('missing passport region remains selectable');
  await control('tall',true);assert.ok((await state()).diagnostics.letterbox[1]>0);await tap(720,135);assert.equal((await state()).lastSelection.objectId,'object-stand-12');pass('letterbox inverse pointer mapping');
  await control('tall',false);await control('safe','16');assert.ok(Math.abs((await state()).diagnostics.actualViewport[0]-288)<.1);pass('simulated safe insets produce measured 288px scene, not claimed 320');await control('safe','0');
  await click('zoom');assert.equal((await state()).camera.z,2);await click('right');assert.ok((await state()).camera.tx<0);pass('investigation 2× and pan button');
  await tap(720,135);assert.equal((await state()).lastSelection.objectId,'object-stand-12');pass('zoom/pan pointer inverse canonical hit');
  await click('overview');assert.equal((await state()).camera.z,1);pass('Overview resets camera');
  let s=await state(),count=s.selectionCount;let p=await point(720,135);await pointer('mousePressed',p);await pointer('mouseMoved',{x:p.x+12,y:p.y});await pointer('mouseReleased',{x:p.x+12,y:p.y});await settle();assert.equal((await state()).selectionCount,count);pass('move over threshold cancels selection');
  p=await point(720,135);await pointer('mousePressed',p);await control('width','390');await pointer('mouseReleased',p);await settle();assert.equal((await state()).selectionCount,count);pass('resize cancels in-flight pointer selection');
  await viewport(422);await control('width','390');await control('snapshot','original');assert.equal(await evaluate('document.getElementById("zoom").disabled'),true);await tap(720,135);assert.equal((await state()).selectionCount,count);pass('original inspection disables app zoom and selection');
  await control('snapshot','changed');await click('zoom');await control('snapshot','original');assert.equal((await state()).camera.z,1);pass('snapshot inspection switch resets overview');
  await control('regions',true);assert.equal(await evaluate('document.querySelectorAll("#overlay rect").length'),4);await control('clues',true);assert.ok(await evaluate('document.querySelectorAll("#overlay rect").length>4'));pass('separate SVG target and visual diagnostics');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await settle();assert.equal((await state()).diagnostics.reducedMotion,true);assert.equal(await evaluate('getComputedStyle(document.getElementById("art")).transitionDuration'),'0s');pass('reduced-motion media and no scene animation');
  await evaluate('document.getElementById("overview").focus()');assert.equal(await evaluate('document.activeElement.id'),'overview');await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});pass('external button focus and keyboard activation');
  await control('snapshot','changed');await evaluate('document.getElementById("viewport").focus()');await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});assert.equal(await evaluate('document.getElementById("cursor").hidden'),false);pass('keyboard spatial cursor');
  for(let i=0;i<12;i++)await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
  for(let i=0;i<4;i++)await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowUp',code:'ArrowUp',windowsVirtualKeyCode:38});
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});assert.equal((await state()).lastSelection.objectId,'object-stand-12');pass('keyboard Enter resolves same canonical stand');
  await viewport(422,2);await control('width','390');await control('regions',false);await control('clues',false);await control('snapshot','original');await evaluate('document.getElementById("viewport").scrollIntoView({block:"center"})');await settle();
  let shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(OUT,'browser-390-original.png'),Buffer.from(shot.data,'base64'));
  await control('snapshot','changed');await control('regions',true);await settle();shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(OUT,'browser-390-targets.png'),Buffer.from(shot.data,'base64'));pass('real browser screenshot records');
  assert.deepEqual(report.errors,[]);report.status='PASS';
 }catch(error){report.status='FAIL';report.failure=error.stack;process.exitCode=1;}
 finally{
  fs.writeFileSync(path.join(OUT,'browser-results.json'),JSON.stringify(report,null,2)+'\n');
  if(socket&&socket.readyState===1){try{await send('Browser.close');}catch{}socket.close();}
  for(const task of pending.values()){clearTimeout(task.timer);task.reject(new Error('Browser closed'));}pending.clear();
  if(child.exitCode===null)child.kill();fs.closeSync(log);
  console.log(JSON.stringify(report,null,2));
 }
})();

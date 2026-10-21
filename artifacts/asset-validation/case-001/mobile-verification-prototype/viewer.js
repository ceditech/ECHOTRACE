(function(){
 'use strict';
 const $=id=>document.getElementById(id),C=PrototypeCore,D=PROTOTYPE_DATA,view=$('viewport');
 const targets=D.scenes[1].interactionRegions,gesture=C.transaction(),pointers=new Set();
 let cam=C.camera(320,180),epoch=0,loaded=false,blocked=false,drag=null,cursor={x:160,y:90},lastSelection=null,selectionCount=0;
 const changed=()=>$('snapshot').value==='changed';
 function invalidate(){epoch++;gesture.cancel();drag=null;}
 function cameraUpdate(next){invalidate();cam=next;paint();}
 function layout(){
  const old=cam;$('safe-frame').style.width=$('width').value+'px';$('safe-frame').style.setProperty('--sim-safe',$('safe').value+'px');
  const frame=$('safe-frame'),style=getComputedStyle(frame),width=frame.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
  const height=$('tall').checked?Math.max(300,width*9/16+120):width*9/16;
  view.style.width=width+'px';view.style.height=height+'px';
  const rect=view.getBoundingClientRect();
  cam=changed()?C.resize(old,rect.width,rect.height):C.camera(rect.width,rect.height);
  cursor={x:Math.min(cursor.x,rect.width-1),y:Math.min(cursor.y,rect.height-1)};invalidate();paint();
 }
 function polygonRect(box,stroke,dash){
  const a=C.forward(cam,{x:box[0],y:box[1]}),b=C.forward(cam,{x:box[2],y:box[3]});
  const element=document.createElementNS('http://www.w3.org/2000/svg','rect');
  for(const [name,value] of Object.entries({x:a.x,y:a.y,width:b.x-a.x,height:b.y-a.y,fill:'none',stroke,'stroke-width':2,'stroke-dasharray':dash}))element.setAttribute(name,String(value));
  $('overlay').append(element);
 }
 function paint(){
  const start=C.forward(cam,{x:0,y:0}),art=$('art');
  art.style.left=start.x+'px';art.style.top=start.y+'px';art.style.width=cam.s*cam.z*960+'px';art.style.height=cam.s*cam.z*540+'px';
  view.classList.toggle('zoomed',cam.z>1);$('overlay').replaceChildren();
  if($('regions').checked)for(const r of targets){const g=r.geometry;polygonRect([g.origin.x*960,g.origin.y*540,(g.origin.x+g.size.width)*960,(g.origin.y+g.size.height)*540],'#00ffff','6 3');}
  const scene=D.scenes[changed()?1:0];
  if($('clues').checked)for(const v of scene.visuals){if(!['asset-table','asset-owen-backpack'].includes(v.asset.id))polygonRect([(v.position.x-v.size.width/2)*960,(v.position.y-v.size.height/2)*540,(v.position.x+v.size.width/2)*960,(v.position.y+v.size.height/2)*540],'#ff59cc','2 3');}
  $('cursor').style.left=cursor.x+'px';$('cursor').style.top=cursor.y+'px';
  $('zoom').disabled=!loaded||!changed();$('zoom').textContent=cam.z===1?'Zoom 2×':'Zoom 1×';
  for(const id of ['left','right','up','down'])$(id).disabled=!loaded||!changed()||cam.z===1;
  const effective=960*cam.s,rows=D.measurements[scene.id].filter(r=>['object-passport','object-star-wallet','object-stand-12','object-stand-21'].includes(r.objectId)).map(r=>({objectId:r.objectId,visualEnvelopeCSS:[r.canonical_size.width*effective,r.canonical_size.height*effective*9/16]}));
  const diagnostics={researchOnly:true,snapshot:$('snapshot').value,requestedWidth:Number($('width').value),actualViewport:[cam.width,cam.height],effectiveFitWidth:effective,zoom:cam.z,pan:[cam.tx,cam.ty],letterbox:[cam.ox,cam.oy],dpr:devicePixelRatio,browserVisualScale:window.visualViewport?.scale??null,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,targetSizeCSS:[.18*effective*cam.z,.3*effective*9/16*cam.z],targetRowGapCSS:.1*effective*9/16*cam.z,clueSizesAtOverview:rows,epoch,loaded};
  $('diagnostics').textContent=JSON.stringify(diagnostics,null,2);
  window.__prototypeVerification={diagnostics,camera:{...cam},lastSelection,selectionCount,gestureActive:gesture.active()};
 }
 function select(q){
  if(!changed()||!loaded)return;
  const result=C.hit(cam,q,targets);lastSelection=result; if(result.status==='hit')selectionCount++;
  $('selection').textContent=result.status==='hit'?'Research canonical hit: '+result.objectId+' (no evidence or score)': 'Research hit result: '+result.status;paint();
 }
 function local(event){const r=view.getBoundingClientRect();return {x:event.clientX-r.left,y:event.clientY-r.top};}
 function resetSnapshot(){invalidate();pointers.clear();blocked=false;cam=C.camera(cam.width,cam.height);lastSelection=null;gesture.cancel();$('cursor').hidden=true;$('art').src='images/'+$('snapshot').value+'.png';$('selection').textContent=changed()?'Changed inspection: canonical hit testing enabled.':'Original inspection: no selection or app zoom.';paint();}
 $('snapshot').onchange=resetSnapshot;
 for(const id of ['width','safe','tall'])$(id).onchange=layout;
 for(const id of ['regions','clues'])$(id).onchange=paint;
 $('zoom').onclick=()=>cameraUpdate(C.camera(cam.width,cam.height,cam.z===1?2:1));
 $('overview').onclick=()=>cameraUpdate(C.camera(cam.width,cam.height));
 function pan(x,y){if(changed()&&cam.z>1)cameraUpdate(C.camera(cam.width,cam.height,cam.z,cam.tx+x,cam.ty+y));}
 for(const [id,x,y] of [['left',40,0],['right',-40,0],['up',0,40],['down',0,-40]])$(id).onclick=()=>pan(x,y);
 view.addEventListener('pointerdown',event=>{
  pointers.add(event.pointerId);
  if(pointers.size>1){blocked=true;gesture.cancel();drag=null;return;}
  if(!loaded||!changed()||blocked||event.button!==0)return;
  const q=local(event),result=C.hit(cam,q,targets);gesture.begin(event.pointerId,q,epoch,result.status==='hit'?result.objectId:null);
  drag={id:event.pointerId,start:q,tx:cam.tx,ty:cam.ty,pan:false};view.setPointerCapture(event.pointerId);paint();
 });
 view.addEventListener('pointermove',event=>{
  const q=local(event);gesture.move(event.pointerId,q);
  if(drag&&drag.id===event.pointerId&&!blocked&&cam.z>1){
   if(Math.hypot(q.x-drag.start.x,q.y-drag.start.y)>8)drag.pan=true;
   if(drag.pan){gesture.cancel();cam=C.camera(cam.width,cam.height,cam.z,drag.tx+q.x-drag.start.x,drag.ty+q.y-drag.start.y);epoch++;paint();}
  }
 });
 view.addEventListener('pointerup',event=>{
  const q=local(event);gesture.move(event.pointerId,q);const result=C.hit(cam,q,targets);
  const accepted=!blocked&&gesture.end(event.pointerId,epoch,result.status==='hit'?result.objectId:null);
  pointers.delete(event.pointerId);if(!pointers.size)blocked=false;drag=null;
  if(accepted)select(q);else paint();
 });
 for(const name of ['pointercancel','lostpointercapture'])view.addEventListener(name,event=>{pointers.delete(event.pointerId);gesture.cancel();drag=null;if(!pointers.size)blocked=false;paint();});
 view.addEventListener('keydown',event=>{
  if(event.key==='Escape'){invalidate();$('cursor').hidden=true;paint();return;}
  const directions={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]};
  if(directions[event.key]){event.preventDefault();const [dx,dy]=directions[event.key];if(event.shiftKey)pan(-dx*4,-dy*4);else{cursor={x:Math.max(0,Math.min(cam.width-1,cursor.x+dx)),y:Math.max(0,Math.min(cam.height-1,cursor.y+dy))};$('cursor').hidden=false;paint();}}
  if(event.key==='Enter'||event.key===' '){event.preventDefault();select(cursor);}
 });
 const observer=new ResizeObserver(layout);observer.observe(document.body);
 window.addEventListener('resize',layout);window.visualViewport?.addEventListener('resize',layout);
 document.addEventListener('visibilitychange',()=>{invalidate();pointers.clear();blocked=false;paint();});
 window.addEventListener('blur',()=>{invalidate();pointers.clear();blocked=false;paint();});
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',paint);
 Promise.all(['original','changed'].map(name=>{const im=new Image();im.src='images/'+name+'.png';return im.decode();})).then(()=>{loaded=true;resetSnapshot();layout();}).catch(error=>{$('art').hidden=true;$('selection').textContent='Candidate image decode failed: '+error.message;invalidate();paint();});
 layout();
})();

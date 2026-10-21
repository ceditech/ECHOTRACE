const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const C=require('./core.js');const ctx={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'data.js'),'utf8'),ctx);const data=JSON.parse(JSON.stringify(ctx.PROTOTYPE_DATA)),regions=data.scenes[1].interactionRegions;
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
test('full fit and inverse round trips across width, letterbox, zoom, pan',()=>{
 for(const w of [320,390,430,768,960])for(const h of [w*9/16,w*9/16+120,150])for(const z of [1,1.5,2]){
  const c=C.camera(w,h,z,10000,-10000);
  for(const p of [{x:0,y:0},{x:960,y:540},{x:180,y:351},{x:720,y:135}]){const q=C.forward(c,p),back=C.inverse(c,q);near(back.x,p.x);near(back.y,p.y);}
  if(z===1){const tl=C.forward(c,{x:0,y:0}),br=C.forward(c,{x:960,y:540});assert.ok(tl.x>=-1e-8&&tl.y>=-1e-8&&br.x<=w+1e-8&&br.y<=h+1e-8);near(c.tx,0);near(c.ty,0);}
 }
});
test('canonical centers resolve exact ObjectIds at every width and zoom',()=>{
 for(const w of [320,390,430,768,960])for(const z of [1,2])for(const region of regions){const g=region.geometry,p={x:(g.origin.x+g.size.width/2)*960,y:(g.origin.y+g.size.height/2)*540};let c=C.camera(w,w*9/16,z);const projected=C.forward(c,p);c=C.camera(w,w*9/16,z,w/2-projected.x,w*9/32-projected.y);const result=C.hit(c,C.forward(c,p),regions);assert.equal(result.status,'hit');assert.equal(result.objectId,region.objectId);}
});
test('origin inclusive, far edges exclusive, adjacent gap and letterbox reject',()=>{
 for(const w of [320,390,960]){const c=C.camera(w,w*9/16),q=(x,y)=>C.forward(c,{x:x*960,y:y*540});
  assert.equal(C.hit(c,q(.09,.5),regions).objectId,'object-passport');
  assert.equal(C.hit(c,q(.27,.65),regions).status,'miss');assert.equal(C.hit(c,q(.18,.8),regions).status,'miss');
  assert.equal(C.hit(c,q(.70,.45),regions).status,'miss');assert.equal(C.hit(c,q(.70,.399999),regions).objectId,'object-stand-12');
  assert.equal(C.hit(c,q(.70,.4),regions).status,'miss');assert.equal(C.hit(c,q(.70,.5),regions).objectId,'object-star-wallet');
 }
 const c=C.camera(320,300);assert.equal(C.hit(c,{x:160,y:5},regions).status,'letterbox');assert.equal(C.hit(c,{x:-1,y:100},regions).status,'outside');
});
test('ambiguous geometry is rejected independently of array ordering',()=>{const c=C.camera(960,540),duplicate={...regions[0],objectId:'another-object'};assert.equal(C.hit(c,{x:172.8,y:351},[...regions,duplicate]).status,'ambiguous');});
test('zoom and pan clamp; resize preserves center source point where possible',()=>{
 assert.equal(C.camera(320,180,99).z,2);assert.equal(C.camera(320,180,-3).z,1);
 const c=C.camera(320,180,2,999,-999);near(c.tx,160);near(c.ty,-90);
 const old=C.camera(320,180,2,40,20),p=C.inverse(old,{x:160,y:90}),next=C.resize(old,390,219.375),p2=C.inverse(next,{x:195,y:109.6875});near(p.x,p2.x);near(p.y,p2.y);
 assert.throws(()=>C.camera(0,180),RangeError);
});
test('tap transaction rejects >8px movement, stale resize/camera epoch, cancel and different target',()=>{
 const t=C.transaction(),q={x:0,y:0};t.begin(1,q,7,'a');t.move(1,{x:8,y:0});assert.equal(t.end(1,7,'a'),true);
 t.begin(1,q,7,'a');t.move(1,{x:8.01,y:0});assert.equal(t.end(1,7,'a'),false);
 t.begin(1,q,7,'a');assert.equal(t.end(1,8,'a'),false);
 t.begin(1,q,7,'a');t.cancel();assert.equal(t.end(1,7,'a'),false);
 t.begin(1,q,7,'a');assert.equal(t.end(1,7,'b'),false);assert.equal(t.end(1,7,'a'),false);
});
test('canonical snapshots preserve exactly three authored events and all other visual definitions',()=>{
 assert.deepEqual(data.changes.map(c=>[c.id,c.kind]),[['change-passport-removed','object_removed'],['change-stands-exchanged','object_exchanged'],['change-wallet-moved','object_moved']]);
 assert.ok(data.changes.every(c=>c.isRequired&&c.significance==='meaningful'));
 const [a,b]=data.scenes.map(s=>new Map(s.visuals.map(v=>[v.objectId,v])));
 assert.ok(a.has('object-passport')&&!b.has('object-passport'));
 for(const key of ['object-table-window','object-table-plant','object-document-mat','object-owen-backpack'])assert.deepEqual(a.get(key),b.get(key));
 assert.deepEqual(a.get('object-stand-12').position,b.get('object-stand-21').position);assert.deepEqual(a.get('object-stand-21').position,b.get('object-stand-12').position);
 for(const key of ['object-star-wallet','object-stand-12','object-stand-21']){assert.deepEqual(a.get(key).asset,b.get(key).asset);assert.deepEqual(a.get(key).size,b.get(key).size);assert.equal(a.get(key).rotationDegrees,b.get(key).rotationDegrees);}
 assert.deepEqual(b.get('object-star-wallet').position,data.changes[2].to);assert.deepEqual(a.get('object-star-wallet').position,data.changes[2].from);
});

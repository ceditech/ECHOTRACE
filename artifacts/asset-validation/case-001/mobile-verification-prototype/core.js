(function(root){
  'use strict';
  function camera(width,height,zoom=1,tx=0,ty=0){
    if(![width,height,zoom,tx,ty].every(Number.isFinite)||width<=0||height<=0)throw new RangeError('Invalid camera');
    const s=Math.min(width/960,height/540),z=Math.max(1,Math.min(2,zoom));
    const limitX=Math.max(0,(z*s*960-width)/2),limitY=Math.max(0,(z*s*540-height)/2);
    return {width,height,s,z,ox:(width-960*s)/2,oy:(height-540*s)/2,tx:Math.max(-limitX,Math.min(limitX,tx)),ty:Math.max(-limitY,Math.min(limitY,ty))};
  }
  function forward(c,p){return {x:c.width/2+c.z*(c.ox+c.s*p.x-c.width/2)+c.tx,y:c.height/2+c.z*(c.oy+c.s*p.y-c.height/2)+c.ty};}
  function inverse(c,q){return {x:((q.x-c.tx-c.width/2)/c.z+c.width/2-c.ox)/c.s,y:((q.y-c.ty-c.height/2)/c.z+c.height/2-c.oy)/c.s};}
  function hit(c,q,regions){
    if(q.x<0||q.y<0||q.x>=c.width||q.y>=c.height)return {status:'outside'};
    const p=inverse(c,q);if(p.x<0||p.y<0||p.x>=960||p.y>=540)return {status:'letterbox'};
    // Stabilize floating-point round trips, not user-visible hit slop.
    const precision=x=>Math.round(x*1e12)/1e12,n={x:precision(p.x/960),y:precision(p.y/540)};
    const matches=regions.filter(r=>{const g=r.geometry;if(g.kind!=='rectangle')throw new Error('Unsupported canonical geometry');return n.x>=precision(g.origin.x)&&n.y>=precision(g.origin.y)&&n.x<precision(g.origin.x+g.size.width)&&n.y<precision(g.origin.y+g.size.height);});
    const ids=[...new Set(matches.map(r=>r.objectId))];
    return ids.length===1?{status:'hit',objectId:ids[0],source:p}:ids.length?{status:'ambiguous',source:p}:{status:'miss',source:p};
  }
  function transaction(){
    let pending=null;
    return {begin(id,q,epoch,target){pending={id,start:q,epoch,target,cancelled:false};},move(id,q){if(pending&&pending.id===id&&Math.hypot(q.x-pending.start.x,q.y-pending.start.y)>8)pending.cancelled=true;},cancel(){pending=null;},end(id,epoch,target){const p=pending;pending=null;return Boolean(p&&p.id===id&&!p.cancelled&&p.epoch===epoch&&p.target&&p.target===target);},active(){return pending!==null;}};
  }
  function resize(c,width,height){const center=inverse(c,{x:c.width/2,y:c.height/2});const next=camera(width,height,c.z);return camera(width,height,c.z,-next.z*(next.ox+next.s*center.x-width/2),-next.z*(next.oy+next.s*center.y-height/2));}
  const api={camera,forward,inverse,hit,transaction,resize};root.PrototypeCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);

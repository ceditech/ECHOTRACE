function dimensions(width,approach,zoomed){
 const imageWidth=approach==='tall'?533:width*(approach==='zoom'&&zoomed?2:1);
 return {imageWidth,imageHeight:imageWidth*9/16,viewportWidth:width,viewportHeight:approach==='tall'?300:width*9/16};
}
if(typeof document!=='undefined'){
 const $=id=>document.getElementById(id);let zoomed=false;
 function render(preserve=false){
  const x=$('viewport').scrollLeft,y=$('viewport').scrollTop;
  const width=Number($('width').value),approach=$('approach').value,d=dimensions(width,approach,zoomed);
  $('viewport').style.width=d.viewportWidth+'px';$('viewport').style.height=d.viewportHeight+'px';
  $('scene').style.width=d.imageWidth+'px';$('scene').style.height=d.imageHeight+'px';
  $('scene').src='images/'+$('snapshot').value+'.png';
  $('viewport').scrollLeft=preserve?x:approach==='tall'?Math.max(0,(d.imageWidth-width)/2):0;
  $('viewport').scrollTop=preserve?y:0;
  $('zoom').disabled=approach!=='zoom';$('zoom').textContent=zoomed?'Zoom 1×':'Zoom 2×';
  $('status').textContent=`Requested viewport ${width}px; image ${d.imageWidth}px; ${approach==='fit'?'full composition':approach==='tall'?'clipped default, not recommended for observation':zoomed?'enlarged partial view':'full overview'}. Actual viewport ${$('viewport').getBoundingClientRect().width}px.`;
 }
 $('snapshot').onchange=()=>render(true);
 $('width').onchange=$('approach').onchange=()=>{zoomed=false;render();};
 $('zoom').onclick=()=>{zoomed=!zoomed;render();};
 $('overview').onclick=()=>{$('approach').value='fit';zoomed=false;render();};
 $('viewport').onkeydown=e=>{const step=40;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();$('viewport').scrollLeft+=e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0;$('viewport').scrollTop+=e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0;}};
 render();
}
if(typeof module!=='undefined')module.exports={dimensions};

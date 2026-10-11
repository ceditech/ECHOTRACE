const assert=require('node:assert/strict');const {dimensions}=require('./prototype.js');
for(const width of [320,390,960]){
 const fit=dimensions(width,'fit',false),zoom=dimensions(width,'zoom',true);
 assert.equal(fit.imageWidth,width);assert.equal(fit.imageHeight,width*9/16);
 assert.equal(zoom.imageWidth,2*width);assert.equal(zoom.viewportWidth,width);
 assert.equal(zoom.imageHeight/zoom.imageWidth,9/16);
 const tall=dimensions(width,'tall',false);assert.equal(tall.imageWidth,533);
}
console.log('PASS: uniform fit/zoom dimensions, 16:9 preservation, camera dimensions');

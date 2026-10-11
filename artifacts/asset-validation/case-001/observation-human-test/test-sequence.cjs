const assert = require('node:assert/strict');
const { TIMING, createSequence } = require('./viewer.js');
let time = 0, serial = 0;
const pending = new Map(), shown = [];
const sequence = createSequence({ now:()=>time, schedule:(fn,ms)=>{pending.set(++serial,{fn,at:time+ms});return serial;}, cancel:id=>pending.delete(id), show:state=>shown.push(state), notify:()=>{} });
function advance(ms) { const target=time+ms; while(true){const next=[...pending].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>target)break;time=next[1].at;pending.delete(next[0]);next[1].fn();} time=target; }
assert.deepEqual(TIMING,{observation:25000,blank:2000,recall:60000});
sequence.start(); advance(24999); assert.equal(sequence.state(),'original');
sequence.start(); advance(1); assert.equal(sequence.state(),'blank');
advance(1999); assert.equal(sequence.state(),'blank'); advance(1); assert.equal(sequence.state(),'recall');
advance(59999); assert.equal(sequence.state(),'recall'); advance(1); assert.equal(sequence.state(),'ended');
assert.deepEqual(shown,['original','blank','recall','ended']);
sequence.start(); assert.equal(sequence.state(),'ended');
sequence.reset(); sequence.start(); advance(100); sequence.reset(); advance(100000); assert.equal(sequence.state(),'ready');
sequence.start(); advance(27000); sequence.end(); assert.equal(sequence.state(),'ended'); advance(60000); assert.equal(sequence.state(),'ended');
sequence.reset(); sequence.start(); sequence.invalidate(); advance(100000); assert.equal(sequence.state(),'invalid');
console.log('PASS: boundaries, forward-only start, reset cancellation, facilitator end, invalidation');

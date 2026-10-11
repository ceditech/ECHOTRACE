/* Standalone test preparation; no production runtime imports. */
const TIMING = Object.freeze({ observation: 25000, blank: 2000, recall: 60000 });
function createSequence({ now, schedule, cancel, show, notify }) {
  let state = 'ready', timer = null, entered = 0;
  function move(next) {
    if (timer !== null) cancel(timer);
    timer = null; state = next; entered = now(); show(state); notify(state, entered);
    if (next === 'original') timer = schedule(() => move('blank'), TIMING.observation);
    if (next === 'blank') timer = schedule(() => move('recall'), TIMING.blank);
    if (next === 'recall') timer = schedule(() => move('ended'), TIMING.recall);
  }
  return {
    start() { if (state === 'ready') move('original'); },
    reset() { move('ready'); },
    end() { if (state === 'recall') move('ended'); },
    invalidate() { move('invalid'); },
    state() { return state; }
  };
}
if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  const isParticipant = new URLSearchParams(location.search).has('participant');
  if (isParticipant) {
    $('participant').hidden = false;
    const original = new Image(), changed = new Image();
    original.src = 'images/scene-a.png'; changed.src = 'images/scene-b.png';
    let loaded = false, width = 960;
    const post = (state, at) => {
      const bounds = $('scene').getBoundingClientRect();
      if (window.opener) window.opener.postMessage({ kind: 'observation-status', state, at,
        viewport: [innerWidth, innerHeight], requestedWidth: width,
        displayedWidth: bounds.width, displayedHeight: bounds.height,
        devicePixelRatio, displayScale: window.visualViewport?.scale ?? null,
        userAgent: navigator.userAgent }, '*');
    };
    const sequence = createSequence({ now: () => performance.now(), schedule: setTimeout, cancel: clearTimeout,
      show(state) {
        const img = $('scene');
        img.hidden = true; img.removeAttribute('src');
        if (state === 'original' || state === 'recall') {
          img.src = state === 'original' ? original.src : changed.src; img.hidden = false;
        }
      }, notify: post });
    Promise.all([original.decode(), changed.decode()]).then(() => {
      loaded = true; post('ready', performance.now());
    }).catch(() => post('load-error', performance.now()));
    window.addEventListener('message', event => {
      if (event.source !== window.opener || event.data?.kind !== 'observation-control') return;
      const { command, mode } = event.data;
      if (command === 'start' && loaded && [320,390,960].includes(mode)) {
        width = mode; $('scene').style.setProperty('--scene-width', width + 'px');
        if (innerWidth < width || innerHeight < width * 9 / 16) { post('viewport-too-small', performance.now()); return; }
        sequence.start();
      }
      if (command === 'reset' && loaded) sequence.reset();
      if (command === 'end') sequence.end();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && ['original','blank','recall'].includes(sequence.state())) sequence.invalidate();
    });
    window.addEventListener('resize', () => {
      if (['original','blank','recall'].includes(sequence.state())) sequence.invalidate();
    });
    document.addEventListener('contextmenu', event => event.preventDefault());
  } else {
    $('facilitator').hidden = false;
    let participantWindow = null;
    const send = command => {
      if (!participantWindow || participantWindow.closed) { $('status').textContent = 'Participant screen is closed.'; return; }
      participantWindow.postMessage({ kind:'observation-control', command, mode:Number($('mode').value) }, '*');
    };
    $('open').onclick = () => {
      if (participantWindow && !participantWindow.closed) { participantWindow.focus(); return; }
      participantWindow = window.open('index.html?participant', 'observation-participant', 'popup,width=1000,height=650');
      $('status').textContent = participantWindow ? 'Waiting for image preload.' : 'Popup blocked: allow local popups and retry.';
    };
    $('start').onclick = () => send('start'); $('reset').onclick = () => send('reset'); $('end').onclick = () => send('end');
    window.addEventListener('message', event => {
      if (event.source !== participantWindow || event.data?.kind !== 'observation-status') return;
      const data = event.data;
      $('status').textContent = data.state === 'recall' ? 'Recall started: ask “What changed?” End recall or wait for the 60-second limit.' : 'Phase: ' + data.state;
      $('metrics').textContent = JSON.stringify(data,null,2);
      $('start').disabled = data.state !== 'ready';
      $('end').disabled = data.state !== 'recall';
      $('reset').disabled = data.state === 'load-error';
      $('mode').disabled = ['original','blank','recall'].includes(data.state);
    });
  }
}
if (typeof module !== 'undefined') module.exports = { TIMING, createSequence };

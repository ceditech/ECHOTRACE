/* Dependency-free real desktop Chromium/CDP verification, adapted from the earlier isolated harness. */
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict"),
  { spawn } = require("node:child_process"),
  { pathToFileURL } = require("node:url");
const OUT = __dirname,
  profile = path.join(OUT, "browser-profile"),
  report = {
    status: "RUNNING",
    checks: [],
    errors: [],
    dimensions: [],
    physicalDevice: false,
    focusedDiagnostic: Boolean(process.env.MIV_BROWSER_FOCUS),
  };
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const executable = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => fs.existsSync(p));
if (!executable)
  throw new Error(
    "No local Chrome/Edge binary; record browser testing unavailable",
  );
fs.mkdirSync(profile, { recursive: true });
const portFile = path.join(profile, "DevToolsActivePort");
if (fs.existsSync(portFile)) fs.unlinkSync(portFile);
const log = fs.openSync(path.join(OUT, "browser-console.log"), "w");
const child = spawn(
  executable,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-sync",
    "--disable-component-update",
    "--disable-extensions",
    "--disable-breakpad",
    "--remote-debugging-port=0",
    "--user-data-dir=" + profile,
    "about:blank",
  ],
  { windowsHide: true, stdio: ["ignore", log, log] },
);
let socket,
  serial = 0;
const pending = new Map();
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++serial,
      timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error("CDP timeout " + method));
      }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
async function settle() {
  await evaluate(
    "new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))",
  );
}
async function state() {
  return evaluate("window.__miv");
}
async function control(id, value) {
  await evaluate(
    `(()=>{const e=document.getElementById(${JSON.stringify(id)});${typeof value === "boolean" ? "e.checked=" + value : "e.value=" + JSON.stringify(value)};e.dispatchEvent(new Event('change',{bubbles:true}));})()`,
  );
  await settle();
}
async function click(id) {
  await evaluate(`document.getElementById(${JSON.stringify(id)}).click()`);
  await settle();
}
async function viewport(width, dpr = 1, height = 1100) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: dpr,
    mobile: false,
  });
  await settle();
}
async function point(source) {
  await evaluate(
    'document.getElementById("viewport").scrollIntoView({block:"center"})',
  );
  await settle();
  return evaluate(
    `(()=>{const r=document.getElementById('viewport').getBoundingClientRect(),q=MIVCore.forward(window.__miv.camera,${JSON.stringify(source)});return {x:r.left+q.x,y:r.top+q.y};})()`,
  );
}
async function pointer(type, p, pointerType = "mouse", button = "left") {
  await send("Input.dispatchMouseEvent", {
    type,
    x: p.x,
    y: p.y,
    button,
    clickCount: 1,
    buttons: type === "mouseReleased" ? 0 : button === "right" ? 2 : 1,
    pointerType,
  });
}
async function tap(source, type = "mouse") {
  const p = await point(source);
  await pointer("mousePressed", p, type);
  await pointer("mouseReleased", p, type);
  await settle();
}
async function makeVisible(source) {
  for (let i = 0; i < 30; i++) {
    const q = await evaluate(
        `MIVCore.forward(window.__miv.camera,${JSON.stringify(source)})`,
      ),
      s = await state();
    if (q.x < 5) await click("left");
    else if (q.x > s.camera.width - 5) await click("right");
    else if (q.y < 5) await click("up");
    else if (q.y > s.camera.height - 5) await click("down");
    else return;
  }
  throw new Error("Cannot bring source point into view");
}
function pass(name) {
  report.checks.push(name);
}
const targets = [
  { id: "object-passport", p: { x: 0.22 * 960, y: 0.605 * 540 } },
  { id: "object-stand-21", p: { x: 0.35 * 960, y: 0.285 * 540 } },
  { id: "object-stand-12", p: { x: 0.75 * 960, y: 0.285 * 540 } },
  { id: "object-star-wallet", p: { x: 0.75 * 960, y: 0.605 * 540 } },
];
const stand = targets[2].p;
(async () => {
  try {
    let port;
    for (let i = 0; i < 100; i++) {
      if (fs.existsSync(portFile)) {
        port = fs.readFileSync(portFile, "utf8").split("\n")[0];
        break;
      }
      await delay(100);
    }
    if (!port) throw new Error("Chromium launch failed");
    const pages = await fetch("http://127.0.0.1:" + port + "/json/list").then(
      (r) => r.json(),
    );
    socket = new WebSocket(
      pages.find((p) => p.type === "page").webSocketDebuggerUrl,
    );
    await new Promise((resolve, reject) => {
      socket.onopen = resolve;
      socket.onerror = reject;
    });
    socket.onmessage = (event) => {
      const m = JSON.parse(String(event.data));
      if (m.id && pending.has(m.id)) {
        const p = pending.get(m.id);
        pending.delete(m.id);
        clearTimeout(p.timer);
        m.error
          ? p.reject(new Error(JSON.stringify(m.error)))
          : p.resolve(m.result);
      }
      if (m.method === "Runtime.exceptionThrown")
        report.errors.push(m.params.exceptionDetails.text);
      if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
        report.errors.push({
          kind: "console.error",
          arguments: m.params.args.map((a) => a.value ?? a.description),
        });
    };
    await send("Page.enable");
    await send("Runtime.enable");
    report.browser = await send("Browser.getVersion");
    report.executable = executable;
    await send("Page.navigate", {
      url: pathToFileURL(path.join(OUT, "index.html")).href,
    });
    for (let i = 0; i < 100; i++) {
      if (await evaluate("Boolean(window.__miv?.diagnostics.loaded)")) break;
      await delay(100);
    }
    assert.equal((await state()).diagnostics.loaded, true);
    assert.equal(
      await evaluate('document.getElementById("art").naturalWidth'),
      960,
    );
    pass("file:// pair preload and native dimensions");
    if (!report.focusedDiagnostic)
      for (const dpr of [1, 2, 3])
        for (const width of [320, 390, 430, 768, 960]) {
          await viewport(width + 32, dpr);
          await control("width", String(width));
          await control("snapshot", "changed");
          for (const zoom of [1, 1.5, 2]) {
            await control("zoom", String(zoom));
            const s = await state();
            assert.ok(Math.abs(s.diagnostics.effectiveFitWidth - width) < 0.02);
            assert.equal(s.diagnostics.dpr, dpr);
            assert.ok(
              Math.abs(s.diagnostics.targetSizeAtOverview[0] - 0.18 * width) <
                0.02,
            );
            assert.ok(
              Math.abs(
                s.diagnostics.targetSizeAtOverview[1] - (0.27 * width * 9) / 16,
              ) < 0.02,
            );
            assert.ok(
              Math.abs(
                s.diagnostics.minimumGapAtOverview - (0.05 * width * 9) / 16,
              ) < 0.02,
            );
            for (const target of targets) {
              await makeVisible(target.p);
              await tap(target.p);
              assert.equal((await state()).lastSelection.objectId, target.id);
            }
            const shape = await evaluate(
              `(()=>{const a=document.getElementById('art').getBoundingClientRect(),v=document.getElementById('viewport').getBoundingClientRect();return {ratio:a.width/a.height,contained:a.left>=v.left-.01&&a.top>=v.top-.01&&a.right<=v.right+.01&&a.bottom<=v.bottom+.01,overflow:document.documentElement.scrollWidth>innerWidth};})()`,
            );
            assert.ok(Math.abs(shape.ratio - 16 / 9) < 0.001);
            assert.equal(shape.overflow, false);
            if (zoom === 1) assert.equal(shape.contained, true);
            report.dimensions.push({
              frameWidth: width,
              dpr,
              zoom,
              effectiveFitWidth: s.diagnostics.effectiveFitWidth,
              targetSize: s.diagnostics.targetSizeAtOverview,
              gap: s.diagnostics.minimumGapAtOverview,
            });
            pass(`fit, four IDs, zoom ${zoom}, ${width}px, DPR ${dpr}`);
          }
        }
    await viewport(352, 2);
    await control("width", "320");
    await control("snapshot", "changed");
    await control("zoom", "1");
    for (const arrangement of ["tall", "short"]) {
      await control("arrangement", arrangement);
      for (const zoom of [1, 1.5, 2]) {
        await control("zoom", String(zoom));
        for (const target of targets) {
          await makeVisible(target.p);
          await tap(target.p);
          assert.equal((await state()).lastSelection.objectId, target.id);
        }
      }
      pass(
        arrangement + " viewport coordinate/letterbox invariance at 3 zooms",
      );
    }
    await control("arrangement", "tall");
    await click("overview");
    let count = (await state()).selectionCount;
    let box = await evaluate(
      '(()=>{const r=document.getElementById("viewport").getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom};})()',
    );
    await pointer("mousePressed", { x: box.left + 160, y: box.top + 5 });
    await pointer("mouseReleased", { x: box.left + 160, y: box.top + 5 });
    await settle();
    assert.equal((await state()).selectionCount, count);
    pass("letterbox tap rejected");
    await control("arrangement", "fit");
    for (const inset of [16, 32]) {
      await control("safe", String(inset));
      const s = await state(),
        width = 320 - 2 * inset;
      assert.ok(Math.abs(s.diagnostics.effectiveFitWidth - width) < 0.02);
      assert.equal(s.diagnostics.comfortHeightAtOverview, false);
      report.dimensions.push({
        frameWidth: 320,
        simulatedInset: inset,
        effectiveFitWidth: s.diagnostics.effectiveFitWidth,
        targetSize: s.diagnostics.targetSizeAtOverview,
        gap: s.diagnostics.minimumGapAtOverview,
        comfortHeight: false,
      });
      pass(
        width +
          "px effective width is reported and fails comfort height honestly",
      );
    }
    await control("safe", "0");
    await viewport(320);
    const narrow = (await state()).diagnostics;
    assert.ok(narrow.effectiveFitWidth <= 320);
    report.dimensions.push({
      browserWidth: 320,
      sceneWidth: narrow.effectiveFitWidth,
      reason: "desktop classic scrollbar space",
    });
    pass("scrollbar-induced available width measured");
    await viewport(352);
    // Portrait/landscape arrangements are browser windows, not mobile OS orientations.
    await viewport(1000, 1, 700);
    await control("width", "768");
    await tap(stand);
    assert.equal((await state()).lastSelection.objectId, "object-stand-12");
    pass("landscape desktop window and viewport resize mapping");
    await viewport(352, 2);
    await control("width", "320");
    const p = await point(stand);
    count = (await state()).selectionCount;
    await pointer("mousePressed", p);
    assert.equal((await state()).selectionCount, count);
    assert.equal(
      await evaluate(
        'document.getElementById("viewport").hasPointerCapture(window.__miv.gestures.activeId)',
      ),
      true,
    );
    await pointer("mouseReleased", p);
    await settle();
    assert.equal((await state()).selectionCount, count + 1);
    pass("capture and no commit until primary pointer-up");
    for (const distance of [8, 9]) {
      const q = await point(stand);
      count = (await state()).selectionCount;
      await pointer("mousePressed", q);
      await pointer("mouseMoved", { x: q.x + distance, y: q.y });
      await pointer("mouseReleased", { x: q.x + distance, y: q.y });
      await settle();
      assert.equal(
        (await state()).selectionCount,
        count + (distance === 8 ? 1 : 0),
      );
    }
    pass("actual mouse 8px inclusive and 9px cancelled");
    count = (await state()).selectionCount;
    let q = await point(stand);
    await pointer("mousePressed", q);
    await evaluate(
      `document.getElementById('viewport').dispatchEvent(new PointerEvent('pointerup',{pointerId:999,clientX:${q.x},clientY:${q.y},bubbles:true}))`,
    );
    assert.equal((await state()).selectionCount, count);
    await pointer("mouseReleased", q);
    await settle();
    assert.equal((await state()).selectionCount, count + 1);
    pass("unrelated pointer ID cannot commit or consume active pointer");
    count = (await state()).selectionCount;
    q = await point(stand);
    await pointer("mousePressed", q);
    await evaluate(
      'document.getElementById("viewport").releasePointerCapture(window.__miv.gestures.activeId)',
    );
    await pointer("mouseMoved", q);
    await pointer("mouseReleased", q);
    await settle();
    assert.equal((await state()).selectionCount, count);
    pass("real pointer capture release/lost capture cancels");
    for (const [id, value] of [
      ["width", "390"],
      ["snapshot", "original"],
      ["zoom", "1.5"],
    ]) {
      await control("snapshot", "changed");
      await control("width", "320");
      await click("overview");
      q = await point(stand);
      count = (await state()).selectionCount;
      await pointer("mousePressed", q);
      await control(id, value);
      await pointer("mouseReleased", q);
      await settle();
      assert.equal((await state()).selectionCount, count);
      pass(id + " change cancels in-flight pointer");
    }
    await control("snapshot", "changed");
    await control("width", "320");
    await control("zoom", "2");
    await makeVisible(stand);
    q = await point(stand);
    count = (await state()).selectionCount;
    await pointer("mousePressed", q);
    await click("right");
    await pointer("mouseReleased", q);
    await settle();
    assert.equal((await state()).selectionCount, count);
    pass("external pan cancels pending pointer");
    await click("overview");
    await control("zoom", "2");
    q = await point({ x: 480, y: 270 });
    count = (await state()).selectionCount;
    const before = (await state()).camera.tx;
    await pointer("mousePressed", q);
    await pointer("mouseMoved", { x: q.x + 20, y: q.y });
    await pointer("mouseMoved", { x: q.x + 40, y: q.y });
    await pointer("mouseReleased", { x: q.x + 40, y: q.y });
    await settle();
    assert.notEqual((await state()).camera.tx, before);
    assert.equal((await state()).selectionCount, count);
    pass("continuous drag pan moves camera without selecting");
    await click("overview");
    count = (await state()).selectionCount;
    await tap({ x: 720, y: 0.445 * 540 });
    assert.equal((await state()).selectionCount, count);
    pass("upper/lower gap tap has no target");
    // Exact integral top edge and one-pixel-outside check; all exact far edges are covered by core tests.
    const top = { x: 0.75 * 960, y: 0.15 * 540 };
    await tap(top);
    assert.equal((await state()).lastSelection.objectId, "object-stand-12");
    count = (await state()).selectionCount;
    await tap({ x: top.x, y: top.y - 3 });
    assert.equal((await state()).selectionCount, count);
    pass("browser top boundary inclusive, one CSS pixel above excluded");
    box = await evaluate(
      '(()=>{const r=document.getElementById("viewport").getBoundingClientRect();return {right:r.right,top:r.top};})()',
    );
    count = (await state()).selectionCount;
    await pointer("mousePressed", { x: box.right + 2, y: box.top + 15 });
    await pointer("mouseReleased", { x: box.right + 2, y: box.top + 15 });
    await settle();
    assert.equal((await state()).selectionCount, count);
    pass("outside viewport tap cannot select an offscreen source");
    count = (await state()).selectionCount;
    for (let i = 0; i < 5; i++) await tap(stand);
    assert.equal((await state()).selectionCount, count + 5);
    pass(
      "five rapid independent taps yield five diagnostics, no duplicate commits",
    );
    count = (await state()).selectionCount;
    await tap(stand, "pen");
    assert.equal((await state()).selectionCount, count + 1);
    pass("CDP pen pointer routes identically");
    await send("Emulation.setTouchEmulationEnabled", {
      enabled: true,
      maxTouchPoints: 5,
    });
    q = await point(stand);
    count = (await state()).selectionCount;
    await send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ id: 1, x: q.x, y: q.y }],
    });
    await send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await settle();
    assert.equal((await state()).selectionCount, count + 1);
    pass("CDP simulated single touch routes identically");
    q = await point(stand);
    count = (await state()).selectionCount;
    await send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ id: 1, x: q.x, y: q.y }],
    });
    await send("Input.dispatchTouchEvent", {
      type: "touchCancel",
      touchPoints: [],
    });
    await settle();
    assert.equal((await state()).selectionCount, count);
    pass("CDP touchCancel has no selection");
    await send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ id: 1, x: q.x, y: q.y }],
    });
    await send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [
        { id: 1, x: q.x, y: q.y },
        { id: 2, x: q.x - 20, y: q.y + 10 },
      ],
    });
    await send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await settle();
    assert.equal((await state()).selectionCount, count);
    pass(
      "CDP two-touch sequence cancels selection (not physical pinch evidence)",
    );
    await send("Emulation.setTouchEmulationEnabled", { enabled: false });
    await control("snapshot", "original");
    assert.equal(
      await evaluate('document.getElementById("zoom").disabled'),
      true,
    );
    count = (await state()).selectionCount;
    await tap(stand);
    assert.equal((await state()).selectionCount, count);
    pass("Original disables selection and application zoom");
    await control("snapshot", "changed");
    await control("zoom", "2");
    await control("snapshot", "original");
    assert.equal((await state()).camera.z, 1);
    assert.equal((await state()).camera.tx, 0);
    pass("snapshot reset returns to complete overview");
    await control("snapshot", "changed");
    await control("regions", true);
    assert.equal(
      await evaluate('document.querySelectorAll("#overlay rect").length'),
      4,
    );
    await control("clues", true);
    assert.ok(
      await evaluate('document.querySelectorAll("#overlay rect").length>4'),
    );
    pass("separate research-only SVG visual versus target overlays");
    await send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    await settle();
    assert.equal((await state()).diagnostics.reducedMotion, true);
    assert.equal(
      await evaluate(
        'getComputedStyle(document.getElementById("art")).transitionDuration',
      ),
      "0s",
    );
    pass("reduced-motion media with no scene animation");
    await evaluate('document.getElementById("overview").focus()');
    await send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Enter",
      code: "Enter",
      windowsVirtualKeyCode: 13,
    });
    await send("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "Enter",
      code: "Enter",
      windowsVirtualKeyCode: 13,
    });
    assert.equal((await state()).camera.z, 1);
    pass("external button keyboard focus/activation");
    await evaluate('document.getElementById("viewport").focus()');
    const wanted = await evaluate(
      `MIVCore.forward(window.__miv.camera,${JSON.stringify(stand)})`,
    );
    for (let i = 0; i < 100; i++) {
      const c = (await state()).cursor;
      const dx = wanted.x - c.x,
        dy = wanted.y - c.y;
      if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) break;
      const key =
        Math.abs(dx) > 5
          ? dx > 0
            ? "ArrowRight"
            : "ArrowLeft"
          : dy > 0
            ? "ArrowDown"
            : "ArrowUp";
      await send("Input.dispatchKeyEvent", {
        type: "keyDown",
        key,
        code: key,
        windowsVirtualKeyCode: {
          ArrowRight: 39,
          ArrowLeft: 37,
          ArrowDown: 40,
          ArrowUp: 38,
        }[key],
      });
    }
    await send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Enter",
      code: "Enter",
      windowsVirtualKeyCode: 13,
    });
    assert.equal((await state()).lastSelection.objectId, "object-stand-12");
    pass("neutral keyboard spatial selection matches pointer ID");
    await viewport(422, 2);
    await control("width", "390");
    await control("regions", false);
    await control("clues", false);
    await control("snapshot", "original");
    await point({ x: 480, y: 270 });
    let shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(
      path.join(OUT, "browser-390-original.png"),
      Buffer.from(shot.data, "base64"),
    );
    await control("snapshot", "changed");
    await control("regions", true);
    await settle();
    shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(
      path.join(OUT, "browser-390-targets.png"),
      Buffer.from(shot.data, "base64"),
    );
    pass("real browser screenshot evidence");
    assert.deepEqual(report.errors, []);
    report.status = "PASS";
  } catch (error) {
    report.status = "FAIL";
    report.failure = error.stack;
    try {
      report.failureState = await state();
    } catch {}
    process.exitCode = 1;
  } finally {
    fs.writeFileSync(
      path.join(OUT, "browser-results.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
    if (socket && socket.readyState === 1) {
      try {
        await send("Browser.close");
      } catch {}
      socket.close();
    }
    for (const task of pending.values()) clearTimeout(task.timer);
    pending.clear();
    if (child.exitCode === null) child.kill();
    fs.closeSync(log);
    console.log(
      JSON.stringify(
        {
          status: report.status,
          checks: report.checks.length,
          browser: report.browser,
          failure: report.failure,
        },
        null,
        2,
      ),
    );
  }
})();

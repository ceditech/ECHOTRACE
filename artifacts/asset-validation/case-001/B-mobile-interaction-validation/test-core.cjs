const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const C = require("./core.js"),
  candidate = JSON.parse(
    fs.readFileSync(path.join(__dirname, "candidate.json"), "utf8"),
  ).candidate,
  regions = candidate.scenes[1].interactionRegions;
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
const center = (r) => ({
  x: (r.geometry.origin.x + r.geometry.size.width / 2) * 960,
  y: (r.geometry.origin.y + r.geometry.size.height / 2) * 540,
});
const start = (id = 1, extra = {}) => ({
  id,
  q: { x: 0, y: 0 },
  epoch: 1,
  target: "a",
  ...extra,
});
test("fit/inverse matrix: all widths, 3 zooms, portrait/landscape/letterbox, multiple pans", () => {
  for (const w of [256, 288, 320, 390, 430, 768, 960])
    for (const h of [(w * 9) / 16, (w * 9) / 16 + 120, 120])
      for (const z of [1, 1.5, 2])
        for (const [tx, ty] of [
          [0, 0],
          [30, -20],
          [-45, 30],
          [999, 999],
          [-999, -999],
        ]) {
          const c = C.camera(w, h, z, tx, ty);
          for (const p of [
            { x: 0, y: 0 },
            { x: 960, y: 540 },
            { x: 211.2, y: 288.9 },
            { x: 720, y: 180.9 },
          ]) {
            const back = C.inverse(c, C.forward(c, p));
            near(back.x, p.x);
            near(back.y, p.y);
          }
          if (z === 1) {
            const a = C.forward(c, { x: 0, y: 0 }),
              b = C.forward(c, { x: 960, y: 540 });
            assert.ok(
              a.x >= -1e-8 &&
                a.y >= -1e-8 &&
                b.x <= w + 1e-8 &&
                b.y <= h + 1e-8,
            );
          }
        }
});
test("target IDs invariant across valid transformed visible centers", () => {
  for (const w of [320, 390, 430, 768, 960])
    for (const h of [(w * 9) / 16, (w * 9) / 16 + 120, 120])
      for (const z of [1, 1.5, 2])
        for (const r of regions) {
          const p = center(r),
            base = C.camera(w, h, z),
            q = C.forward(base, p),
            c = C.camera(w, h, z, w / 2 - q.x, h / 2 - q.y);
          assert.equal(C.hit(c, C.forward(c, p), regions).objectId, r.objectId);
        }
});
test("half-open exact transformed edges, no tolerance/slop", () => {
  for (const w of [320, 390, 430, 768, 960])
    for (const z of [1, 1.5, 2])
      for (const r of regions) {
        const p = center(r),
          base = C.camera(w, (w * 9) / 16, z),
          q = C.forward(base, p),
          c = C.camera(w, (w * 9) / 16, z, w / 2 - q.x, (w * 9) / 32 - q.y),
          box = C.rectangle(c, r.geometry);
        const middleY = (box.top + box.bottom) / 2,
          middleX = (box.left + box.right) / 2;
        if (
          box.left >= 0 &&
          box.left < c.width &&
          middleY >= 0 &&
          middleY < c.height
        )
          assert.equal(
            C.hit(c, { x: box.left, y: middleY }, regions).objectId,
            r.objectId,
          );
        if (
          box.top >= 0 &&
          box.top < c.height &&
          middleX >= 0 &&
          middleX < c.width
        )
          assert.equal(
            C.hit(c, { x: middleX, y: box.top }, regions).objectId,
            r.objectId,
          );
        assert.notEqual(
          C.hit(c, { x: box.right, y: middleY }, regions).objectId,
          r.objectId,
        );
        assert.notEqual(
          C.hit(c, { x: middleX, y: box.bottom }, regions).objectId,
          r.objectId,
        );
      }
  assert.equal(C.decimalSum(0.15, 0.27), 0.42);
  assert.equal(C.decimalSum(0.13, 0.18), 0.31);
});
test("adjacent gap is empty, overlapping targets reject ambiguity", () => {
  const c = C.camera(960, 540);
  assert.equal(C.hit(c, { x: 720, y: 0.445 * 540 }, regions).status, "miss");
  const r = regions[0],
    p = center(r);
  assert.equal(
    C.hit(c, p, [...regions, { ...r, objectId: "duplicate" }]).status,
    "ambiguous",
  );
});
test("viewport clipping wins even if inverse point belongs to offscreen object", () => {
  const c = C.camera(320, 180, 2),
    point = C.forward(c, { x: 0.75 * 960, y: 0.6 * 540 });
  assert.ok(point.x >= 320);
  assert.equal(C.hit(c, point, regions).status, "outside");
  assert.equal(
    C.hit(C.camera(320, 300), { x: 160, y: 0 }, regions).status,
    "letterbox",
  );
  assert.equal(C.hit(c, { x: 320, y: 50 }, regions).status, "outside");
});
test("zoom bounds, pan clamps, invalid camera and resize center mapping", () => {
  assert.equal(C.camera(320, 180, 4).z, 2);
  assert.equal(C.camera(320, 180, 0.2).z, 1);
  const c = C.camera(320, 180, 2, 999, -999);
  near(c.tx, 160);
  near(c.ty, -90);
  const a = C.camera(320, 180, 1.5, 20, 10),
    p = C.inverse(a, { x: 160, y: 90 }),
    b = C.resize(a, 390, 219.375),
    p2 = C.inverse(b, { x: 195, y: 109.6875 });
  near(p.x, p2.x);
  near(p.y, p2.y);
  assert.throws(() => C.camera(0, 100));
});
test("single tap commits only on matching pointer-up, at most once", () => {
  const g = C.gestures();
  assert.equal(g.down(start()).reason, "pending");
  assert.equal(g.inspect().activeId, 1);
  assert.equal(
    g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    true,
  );
  assert.equal(
    g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    false,
  );
});
test("8px threshold: inclusive, >8 rejects, return to start cannot resurrect", () => {
  for (const [distance, expected] of [
    [8, true],
    [8.01, false],
  ]) {
    const g = C.gestures();
    g.down(start());
    g.move({ id: 1, q: { x: distance, y: 0 }, epoch: 1 });
    assert.equal(
      g.up({ id: 1, q: { x: distance, y: 0 }, epoch: 1, target: "a" }).commit,
      expected,
    );
  }
  const g = C.gestures();
  g.down(start());
  g.move({ id: 1, q: { x: 12, y: 0 }, epoch: 1 });
  g.move({ id: 1, q: { x: 0, y: 0 }, epoch: 1 });
  assert.equal(
    g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    false,
  );
});
test("pointer-up displacement alone and changed down/up targets reject", () => {
  for (const [q, target] of [
    [{ x: 9, y: 0 }, "a"],
    [{ x: 0, y: 0 }, "b"],
    [{ x: 0, y: 0 }, null],
  ]) {
    const g = C.gestures();
    g.down(start());
    assert.equal(g.up({ id: 1, q, epoch: 1, target }).commit, false);
  }
});
test("unknown pointer IDs neither commit nor destroy another pending tap", () => {
  const g = C.gestures();
  g.down(start());
  assert.equal(
    g.up({ id: 2, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    false,
  );
  g.move({ id: 2, q: { x: 100, y: 0 }, epoch: 1 });
  assert.equal(g.inspect().activeId, 1);
  assert.equal(
    g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    true,
  );
});
test("pointercancel and lost capture cancel only tracked gestures", () => {
  for (const reason of ["pointercancel", "lostpointercapture"]) {
    const g = C.gestures();
    g.down(start());
    g.cancel(1, reason);
    assert.equal(
      g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
      false,
    );
  }
});
test("multi-pointer activity blocks until every pointer releases", () => {
  const g = C.gestures();
  g.down(start());
  assert.equal(g.down(start(2, { primary: false })).reason, "multi-pointer");
  assert.equal(
    g.up({ id: 2, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    false,
  );
  assert.equal(g.inspect().blocked, true);
  assert.equal(
    g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    false,
  );
  assert.equal(g.inspect().blocked, false);
  g.down(start(3));
  assert.equal(
    g.up({ id: 3, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    true,
  );
});
test("resize/snapshot/camera epochs and explicit invalidation reject stale ups", () => {
  const g = C.gestures();
  g.down(start());
  assert.equal(
    g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 2, target: "a" }).commit,
    false,
  );
  for (const reason of [
    "resize",
    "snapshot",
    "zoom",
    "pan",
    "blur",
    "scroll",
  ]) {
    g.down(start());
    g.invalidate(reason);
    assert.equal(
      g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
      false,
    );
  }
});
test("pan emits CSS deltas, survives its own camera epoch, never commits tap", () => {
  const g = C.gestures();
  g.down(start());
  assert.equal(
    g.move({ id: 1, q: { x: 12, y: 0 }, epoch: 1, canPan: true }).reason,
    "pan",
  );
  const move = g.move({ id: 1, q: { x: 18, y: 5 }, epoch: 2, canPan: true });
  assert.equal(move.dx, 6);
  assert.equal(move.dy, 5);
  assert.equal(
    g.up({ id: 1, q: { x: 18, y: 5 }, epoch: 3, target: "a" }).commit,
    false,
  );
});
test("mouse/touch/pen fresh taps; nonprimary/disabled never select", () => {
  for (const type of ["mouse", "touch", "pen"]) {
    const g = C.gestures();
    g.down(start(1, { type }));
    assert.equal(
      g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
      true,
    );
  }
  for (const extra of [
    { primary: false },
    { enabled: false },
    { button: 2 },
    { type: "unsupported" },
  ]) {
    const g = C.gestures();
    g.down(start(1, extra));
    assert.equal(
      g.up({ id: 1, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
      false,
    );
  }
});
test("rapid independent taps are reported once each without score/evidence semantics", () => {
  const g = C.gestures();
  let commits = 0;
  for (let i = 0; i < 25; i++) {
    g.down(start(i));
    commits += Number(
      g.up({ id: i, q: { x: 0, y: 0 }, epoch: 1, target: "a" }).commit,
    );
  }
  assert.equal(commits, 25);
});

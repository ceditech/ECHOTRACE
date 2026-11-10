const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto"),
  vm = require("node:vm");
const read = (p) =>
    JSON.parse(fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "")),
  root = path.resolve(__dirname, "../../../.."),
  source = path.join(__dirname, "../composition-correction-study"),
  candidate = read(path.join(__dirname, "candidate.json")).candidate,
  canonical = read(path.join(root, "src/cases/content/case-001/case.json"));
const digest = (p) =>
  crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
test("isolated copy is exact refined B, never historical B or canonical substitution", () => {
  assert.equal(
    digest(path.join(__dirname, "candidate.json")),
    digest(path.join(source, "B-proposed-case.json")),
  );
  const context = {};
  vm.runInNewContext(
    fs.readFileSync(path.join(__dirname, "data.js"), "utf8"),
    context,
  );
  const projection = JSON.parse(JSON.stringify(context.MIV_DATA));
  assert.deepEqual(projection.scenes, candidate.scenes);
  assert.deepEqual(projection.changes, candidate.changes);
  const expected = [
    ["object-passport", 0.13, 0.47],
    ["object-stand-21", 0.26, 0.15],
    ["object-stand-12", 0.66, 0.15],
    ["object-star-wallet", 0.66, 0.47],
  ];
  assert.deepEqual(
    candidate.scenes[1].interactionRegions.map((r) => [
      r.objectId,
      r.geometry.origin.x,
      r.geometry.origin.y,
    ]),
    expected,
  );
  assert.ok(
    candidate.scenes[1].interactionRegions.every(
      (r) => r.geometry.size.width === 0.18 && r.geometry.size.height === 0.27,
    ),
  );
});
test("exactly three events, stable environment, shared closed wallet and stand exchange", () => {
  assert.deepEqual(
    candidate.changes.map((c) => [c.id, c.kind]),
    [
      ["change-passport-removed", "object_removed"],
      ["change-stands-exchanged", "object_exchanged"],
      ["change-wallet-moved", "object_moved"],
    ],
  );
  assert.ok(
    candidate.changes.every(
      (c) => c.isRequired && c.significance === "meaningful",
    ),
  );
  const [a, b] = candidate.scenes.map(
    (s) => new Map(s.visuals.map((v) => [v.objectId, v])),
  );
  assert.ok(a.has("object-passport") && !b.has("object-passport"));
  assert.equal(a.size - b.size, 1);
  for (const key of [
    "object-table-window",
    "object-table-plant",
    "object-document-mat",
    "object-owen-backpack",
  ])
    assert.deepEqual(a.get(key), b.get(key));
  for (const key of [
    "object-star-wallet",
    "object-stand-12",
    "object-stand-21",
  ]) {
    assert.deepEqual(a.get(key).asset, b.get(key).asset);
    assert.deepEqual(a.get(key).size, b.get(key).size);
    assert.equal(a.get(key).rotationDegrees, b.get(key).rotationDegrees);
  }
  assert.deepEqual(
    a.get("object-stand-12").position,
    b.get("object-stand-21").position,
  );
  assert.deepEqual(
    a.get("object-stand-21").position,
    b.get("object-stand-12").position,
  );
  assert.deepEqual(
    candidate.changes[2].from,
    a.get("object-star-wallet").position,
  );
  assert.deepEqual(
    candidate.changes[2].to,
    b.get("object-star-wallet").position,
  );
});
test("scoring/evidence/deduction and all nonvisual candidate truth match canonical", () => {
  const a = structuredClone(candidate),
    b = structuredClone(canonical);
  delete a.scenes;
  delete b.scenes;
  delete a.changes;
  delete b.changes;
  assert.deepEqual(a, b);
});
test("target nonoverlap, known full fit and narrower comfort-height failures", () => {
  const regions = candidate.scenes[1].interactionRegions;
  for (let i = 0; i < regions.length; i++)
    for (const b of regions.slice(i + 1)) {
      const a = regions[i].geometry,
        g = b.geometry;
      const dx = Math.max(
          0,
          Math.min(a.origin.x + a.size.width, g.origin.x + g.size.width) -
            Math.max(a.origin.x, g.origin.x),
        ),
        dy = Math.max(
          0,
          Math.min(a.origin.y + a.size.height, g.origin.y + g.size.height) -
            Math.max(a.origin.y, g.origin.y),
        );
      assert.equal(dx * dy, 0);
    }
  for (const [width, height, gap] of [
    [320, 48.6, 9],
    [390, 59.23125, 10.96875],
    [288, 43.74, 8.1],
    [256, 38.88, 7.2],
  ]) {
    assert.ok(Math.abs((0.27 * width * 9) / 16 - height) < 1e-9);
    assert.ok(Math.abs((0.05 * width * 9) / 16 - gap) < 1e-9);
    assert.equal(height >= 48, width >= 320);
  }
});
test("paired images are byte-exact study outputs", () => {
  for (const stem of ["original", "changed"])
    assert.equal(
      digest(path.join(__dirname, "images", stem + ".png")),
      digest(path.join(source, "B", stem + "-960.png")),
    );
});

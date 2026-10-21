import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const artifacts = resolve(root, "artifacts/asset-validation");
const textExtensions = new Set([
  ".json",
  ".js",
  ".cjs",
  ".css",
  ".html",
  ".md",
  ".py",
  ".txt",
  ".log",
]);
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const readJson = (path) =>
  JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
let verifiedHashes = 0;
const eolTranslations = [];

function inside(base, name) {
  const path = resolve(base, name);
  const local = relative(base, path);
  assert(
    !isAbsolute(local) && local !== ".." && !local.startsWith(`..${sep}`),
    `Path escapes manifest base: ${name}`,
  );
  assert(!local.startsWith(sep), `Invalid manifest path: ${name}`);
  return path;
}

function verifyHash(path, expected) {
  assert.match(expected, /^[a-f0-9]{64}$/);
  const bytes = readFileSync(path);
  if (digest(bytes) !== expected) {
    // Git may translate text EOLs on checkout. Never normalize binary evidence.
    assert(textExtensions.has(extname(path)), `Binary hash mismatch: ${path}`);
    const text = bytes.toString("utf8");
    assert(Buffer.from(text).equals(bytes), `Invalid UTF-8: ${path}`);
    const lf = text.replace(/\r\n/g, "\n");
    assert(
      digest(lf) === expected || digest(lf.replace(/\n/g, "\r\n")) === expected,
      `Content hash mismatch: ${path}`,
    );
    eolTranslations.push(relative(root, path));
  }
  verifiedHashes++;
}

function allJson(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return allJson(path);
    return entry.isFile() && extname(path) === ".json" ? [path] : [];
  });
}

const jsonFiles = allJson(artifacts);
for (const path of jsonFiles) readJson(path);
const caseRoot = resolve(artifacts, "case-001");
const prototype = resolve(caseRoot, "mobile-verification-prototype");
const manifest = readJson(resolve(prototype, "asset-manifest.json"));
for (const [path, hash] of Object.entries(manifest.source_files))
  verifyHash(inside(root, path), hash);
for (const [path, hash] of Object.entries(manifest.outputs))
  verifyHash(inside(prototype, path), hash);
const inventory = readJson(resolve(prototype, "FILE_INVENTORY.json"));
for (const entry of inventory.files) {
  if (entry.sha256 === null) {
    assert.equal(entry.path, "FILE_INVENTORY.json");
    continue;
  }
  verifyHash(inside(prototype, entry.path), entry.sha256);
}
assert.equal(inventory.file_count_including_inventory, inventory.files.length);

for (const directory of ["observation-human-test", "mobile-usability-study"]) {
  const base = resolve(caseRoot, directory);
  const manifest = readJson(resolve(base, "image-manifest.json"));
  for (const entry of manifest.images ?? manifest) {
    verifyHash(inside(base, entry.copy), entry.sha256);
    verifyHash(inside(root, entry.source), entry.sha256);
  }
}

const canonical = readJson(
  resolve(root, "src/cases/content/case-001/case.json"),
);
const measurements = readJson(resolve(prototype, "measurements.json"));
assert.deepEqual(measurements.scenes, canonical.scenes);
assert.deepEqual(measurements.changes, canonical.changes);
assert.deepEqual(
  canonical.changes.map(({ id, kind }) => [id, kind]),
  [
    ["change-passport-removed", "object_removed"],
    ["change-stands-exchanged", "object_exchanged"],
    ["change-wallet-moved", "object_moved"],
  ],
);
console.log(
  `PASS: ${jsonFiles.length} artifact JSON files parsed; ${verifiedHashes} evidence hashes verified; canonical scenes/three changes preserved.`,
);
if (eolTranslations.length)
  console.log(
    `Git text EOL translations accepted (no files rewritten): ${eolTranslations.join(", ")}`,
  );

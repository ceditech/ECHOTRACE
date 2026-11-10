(function (root) {
  "use strict";
  // Finite decimal addition defines authored rectangle edges without hit tolerance.
  function decimalSum(a, b) {
    const places = (x) => (String(x).split(".")[1] || "").length;
    const scale = 10 ** Math.max(places(a), places(b));
    return (Math.round(a * scale) + Math.round(b * scale)) / scale;
  }
  function camera(width, height, zoom = 1, tx = 0, ty = 0) {
    if (
      ![width, height, zoom, tx, ty].every(Number.isFinite) ||
      width <= 0 ||
      height <= 0
    )
      throw new RangeError("Invalid camera");
    const s = Math.min(width / 960, height / 540),
      z = Math.min(2, Math.max(1, zoom));
    const lx = Math.max(0, (z * s * 960 - width) / 2),
      ly = Math.max(0, (z * s * 540 - height) / 2);
    return {
      width,
      height,
      s,
      z,
      ox: (width - 960 * s) / 2,
      oy: (height - 540 * s) / 2,
      tx: Math.max(-lx, Math.min(lx, tx)),
      ty: Math.max(-ly, Math.min(ly, ty)),
    };
  }
  function forward(c, p) {
    return {
      x: c.width / 2 + c.z * (c.ox + c.s * p.x - c.width / 2) + c.tx,
      y: c.height / 2 + c.z * (c.oy + c.s * p.y - c.height / 2) + c.ty,
    };
  }
  function inverse(c, q) {
    return {
      x: ((q.x - c.tx - c.width / 2) / c.z + c.width / 2 - c.ox) / c.s,
      y: ((q.y - c.ty - c.height / 2) / c.z + c.height / 2 - c.oy) / c.s,
    };
  }
  function rectangle(c, g) {
    if (g.kind !== "rectangle")
      throw new Error("Only verified candidate rectangles are supported");
    const a = forward(c, { x: g.origin.x * 960, y: g.origin.y * 540 });
    const b = forward(c, {
      x: decimalSum(g.origin.x, g.size.width) * 960,
      y: decimalSum(g.origin.y, g.size.height) * 540,
    });
    return { left: a.x, top: a.y, right: b.x, bottom: b.y };
  }
  function hit(c, q, regions) {
    if (
      !Number.isFinite(q.x) ||
      !Number.isFinite(q.y) ||
      q.x < 0 ||
      q.y < 0 ||
      q.x >= c.width ||
      q.y >= c.height
    )
      return { status: "outside" };
    const a = forward(c, { x: 0, y: 0 }),
      b = forward(c, { x: 960, y: 540 });
    if (q.x < a.x || q.y < a.y || q.x >= b.x || q.y >= b.y)
      return { status: "letterbox" };
    const matches = regions.filter((r) => {
      const box = rectangle(c, r.geometry);
      return (
        q.x >= box.left && q.x < box.right && q.y >= box.top && q.y < box.bottom
      );
    });
    const source = inverse(c, q);
    return matches.length === 1
      ? { status: "hit", objectId: matches[0].objectId, source }
      : matches.length > 1
        ? { status: "ambiguous", source }
        : { status: "miss", source };
  }
  function resize(c, width, height) {
    const center = inverse(c, { x: c.width / 2, y: c.height / 2 }),
      next = camera(width, height, c.z);
    return camera(
      width,
      height,
      c.z,
      -next.z * (next.ox + next.s * center.x - width / 2),
      -next.z * (next.oy + next.s * center.y - height / 2),
    );
  }
  function gestures() {
    const pointers = new Set();
    let active = null,
      blocked = false;
    function release(id) {
      pointers.delete(id);
      if (!pointers.size) blocked = false;
    }
    return {
      down({
        id,
        q,
        epoch,
        target,
        enabled = true,
        primary = true,
        button = 0,
        type = "mouse",
      }) {
        if (pointers.has(id)) {
          active = null;
          blocked = true;
          return { reason: "duplicate-down" };
        }
        pointers.add(id);
        if (pointers.size > 1) {
          active = null;
          blocked = true;
          return { reason: "multi-pointer" };
        }
        if (
          blocked ||
          !enabled ||
          !primary ||
          button !== 0 ||
          !["mouse", "touch", "pen"].includes(type)
        )
          return { reason: "disabled-or-nonprimary" };
        active = {
          id,
          start: { ...q },
          last: { ...q },
          max: 0,
          epoch,
          target,
          cancelled: false,
          panning: false,
        };
        return { reason: "pending", capture: true };
      },
      move({ id, q, epoch, canPan = false }) {
        if (!active || active.id !== id || !pointers.has(id))
          return { reason: "unrelated-pointer" };
        if (active.epoch !== epoch && !active.panning) {
          active = null;
          blocked = true;
          return { reason: "stale-epoch" };
        }
        const dx = q.x - active.last.x,
          dy = q.y - active.last.y;
        active.max = Math.max(
          active.max,
          Math.hypot(q.x - active.start.x, q.y - active.start.y),
        );
        active.last = { ...q };
        if (active.max > 8) active.cancelled = true;
        if (canPan && active.cancelled && !blocked) {
          active.panning = true;
          return { reason: "pan", dx, dy };
        }
        return {
          reason: active.cancelled ? "moved-over-threshold" : "pending",
          maxDisplacement: active.max,
        };
      },
      up({ id, q, epoch, target }) {
        if (!pointers.has(id))
          return { reason: "unrelated-pointer", commit: false };
        const a = active;
        if (a && a.id === id) {
          a.max = Math.max(a.max, Math.hypot(q.x - a.start.x, q.y - a.start.y));
          active = null;
        }
        const commit = Boolean(
          a &&
          a.id === id &&
          !blocked &&
          !a.cancelled &&
          !a.panning &&
          a.max <= 8 &&
          a.epoch === epoch &&
          a.target &&
          a.target === target,
        );
        release(id);
        return {
          reason: commit ? "tap" : "cancelled-up",
          commit,
          objectId: commit ? target : null,
          maxDisplacement: a?.max ?? null,
          startingEpoch: a?.epoch ?? null,
          endingEpoch: epoch,
        };
      },
      cancel(id, reason = "pointercancel") {
        if (!pointers.has(id)) return { reason: "unrelated-cancel" };
        if (active?.id === id) active = null;
        release(id);
        if (pointers.size) blocked = true;
        return { reason };
      },
      invalidate(reason = "stale-epoch") {
        active = null;
        blocked = pointers.size > 0;
        return { reason };
      },
      reset() {
        active = null;
        pointers.clear();
        blocked = false;
      },
      inspect() {
        return {
          activeId: active?.id ?? null,
          count: pointers.size,
          blocked,
          panning: active?.panning ?? false,
        };
      },
    };
  }
  const api = {
    camera,
    forward,
    inverse,
    rectangle,
    hit,
    resize,
    gestures,
    decimalSum,
  };
  root.MIVCore = api;
  if (typeof module !== "undefined") module.exports = api;
})(globalThis);

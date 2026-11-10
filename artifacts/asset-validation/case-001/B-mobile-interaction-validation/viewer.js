(function () {
  "use strict";
  const $ = (id) => document.getElementById(id),
    C = MIVCore,
    D = MIV_DATA,
    view = $("viewport"),
    targets = D.scenes[1].interactionRegions,
    gestures = C.gestures();
  let cam = C.camera(320, 180),
    epoch = 0,
    loaded = false,
    lastSelection = null,
    selectionCount = 0,
    cursor = { x: 160, y: 90 },
    lastGesture = "idle",
    lastLayout = "";
  const events = [],
    establishedCaptures = new Set();
  const changed = () => $("snapshot").value === "changed";
  function trace(result) {
    lastGesture = result.reason;
    events.push(result);
    if (events.length > 40) events.shift();
  }
  function invalidate(reason) {
    epoch++;
    trace(gestures.invalidate(reason));
  }
  function applyCamera(next, reason) {
    invalidate(reason);
    cam = next;
    paint();
  }
  function layout() {
    const frame = $("safe-frame");
    frame.style.width = $("width").value + "px";
    frame.style.setProperty("--sim-safe", $("safe").value + "px");
    const style = getComputedStyle(frame),
      width =
        frame.getBoundingClientRect().width -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
    const mode = $("arrangement").value,
      height =
        mode === "short" ? 120 : (width * 9) / 16 + (mode === "tall" ? 120 : 0);
    view.style.width = width + "px";
    view.style.height = height + "px";
    const rect = view.getBoundingClientRect();
    const key = [
      rect.width,
      rect.height,
      rect.left,
      rect.top,
      window.visualViewport?.scale,
    ].join("|");
    if (lastLayout !== key) {
      cam = changed()
        ? C.resize(cam, rect.width, rect.height)
        : C.camera(rect.width, rect.height);
      invalidate("layout-change");
      lastLayout = key;
    }
    cursor = {
      x: Math.min(cursor.x, cam.width - 1),
      y: Math.min(cursor.y, cam.height - 1),
    };
    paint();
  }
  function outline(box, color, dash) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    for (const [key, value] of Object.entries({
      x: box.left,
      y: box.top,
      width: box.right - box.left,
      height: box.bottom - box.top,
      fill: "none",
      stroke: color,
      "stroke-width": 2,
      "stroke-dasharray": dash,
    }))
      rect.setAttribute(key, String(value));
    $("overlay").append(rect);
  }
  function paint() {
    const start = C.forward(cam, { x: 0, y: 0 }),
      image = $("art");
    image.style.left = start.x + "px";
    image.style.top = start.y + "px";
    image.style.width = cam.z * cam.s * 960 + "px";
    image.style.height = cam.z * cam.s * 540 + "px";
    view.classList.toggle("zoomed", cam.z > 1);
    $("zoom").value = String(cam.z);
    $("zoom").disabled = !loaded || !changed();
    for (const id of ["left", "right", "up", "down"])
      $(id).disabled = !loaded || !changed() || cam.z === 1;
    $("overlay").replaceChildren();
    if (changed() && $("regions").checked)
      for (const r of targets)
        outline(C.rectangle(cam, r.geometry), "#00ffff", "6 3");
    const current = D.scenes[changed() ? 1 : 0];
    if ($("clues").checked)
      for (const v of current.visuals) {
        if (
          v.objectId.startsWith("object-table-") ||
          v.objectId === "object-owen-backpack"
        )
          continue;
        outline(
          C.rectangle(cam, {
            kind: "rectangle",
            origin: {
              x: v.position.x - v.size.width / 2,
              y: v.position.y - v.size.height / 2,
            },
            size: v.size,
          }),
          "#ff59cc",
          "2 3",
        );
      }
    $("cursor").style.left = cursor.x + "px";
    $("cursor").style.top = cursor.y + "px";
    const effective = 960 * cam.s,
      clues = D.measurements[changed() ? 1 : 0].visuals
        .filter((v) =>
          [
            "object-passport",
            "object-document-mat",
            "object-star-wallet",
            "object-stand-12",
            "object-stand-21",
          ].includes(v.objectId),
        )
        .map((v) => ({
          objectId: v.objectId,
          solidAtOverview: [
            (v.solid_bbox[2] - v.solid_bbox[0]) * cam.s,
            (v.solid_bbox[3] - v.solid_bbox[1]) * cam.s,
          ],
        }));
    const diagnostics = {
      researchOnly: true,
      geometry: "REFINED B, NOT CANONICAL",
      snapshot: $("snapshot").value,
      requestedFrameWidth: Number($("width").value),
      viewport: [cam.width, cam.height],
      effectiveFitWidth: effective,
      zoom: cam.z,
      pan: [cam.tx, cam.ty],
      letterbox: [cam.ox, cam.oy],
      targetSizeAtOverview: [0.18 * effective, (0.27 * effective * 9) / 16],
      minimumGapAtOverview: (0.05 * effective * 9) / 16,
      comfortHeightAtOverview: (0.27 * effective * 9) / 16 >= 48,
      clues,
      epoch,
      dpr: devicePixelRatio,
      visualViewportScale: window.visualViewport?.scale ?? null,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      loaded,
      lastGesture,
    };
    $("diagnostics").textContent = JSON.stringify(diagnostics, null, 2);
    window.__miv = {
      diagnostics,
      camera: { ...cam },
      cursor: { ...cursor },
      lastSelection,
      selectionCount,
      gestures: gestures.inspect(),
      recentEvents: [...events],
    };
  }
  function inspectSelection(q) {
    if (!loaded || !changed()) return;
    const result = C.hit(cam, q, targets);
    lastSelection = result;
    if (result.status === "hit") selectionCount++;
    $("selection").textContent =
      result.status === "hit"
        ? "Research candidate hit: " +
          result.objectId +
          " — no evidence or score"
        : "Research hit result: " + result.status;
    paint();
  }
  function local(event) {
    const rect = view.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function target(q) {
    const h = C.hit(cam, q, targets);
    return h.status === "hit" ? h.objectId : null;
  }
  function switchSnapshot() {
    invalidate("snapshot-change");
    cam = C.camera(cam.width, cam.height);
    lastSelection = null;
    $("cursor").hidden = true;
    $("art").src = "images/" + $("snapshot").value + ".png";
    $("selection").textContent = changed()
      ? "Changed inspection: exact candidate targets enabled."
      : "Original inspection: selection and app zoom disabled.";
    paint();
  }
  $("snapshot").onchange = switchSnapshot;
  for (const id of ["width", "arrangement", "safe"])
    $(id).onchange = () => {
      invalidate("layout-control");
      layout();
    };
  for (const id of ["regions", "clues"]) $(id).onchange = paint;
  $("zoom").onchange = () => {
    if (changed() && loaded)
      applyCamera(
        C.camera(cam.width, cam.height, Number($("zoom").value)),
        "zoom-change",
      );
  };
  $("overview").onclick = () =>
    applyCamera(C.camera(cam.width, cam.height), "overview");
  function pan(dx, dy) {
    if (changed() && loaded && cam.z > 1)
      applyCamera(
        C.camera(cam.width, cam.height, cam.z, cam.tx + dx, cam.ty + dy),
        "pan-control",
      );
  }
  for (const [id, dx, dy] of [
    ["left", 40, 0],
    ["right", -40, 0],
    ["up", 0, 40],
    ["down", 0, -40],
  ])
    $(id).onclick = () => pan(dx, dy);
  view.addEventListener("pointerdown", (event) => {
    establishedCaptures.delete(event.pointerId);
    const q = local(event),
      result = gestures.down({
        id: event.pointerId,
        q,
        epoch,
        target: target(q),
        enabled: loaded && changed(),
        primary: event.isPrimary,
        button: event.button,
        type: event.pointerType,
      });
    trace(result);
    if (result.capture) {
      try {
        view.setPointerCapture(event.pointerId);
      } catch {
        trace(gestures.cancel(event.pointerId, "capture-unavailable"));
      }
    }
    trace({
      reason: "pointer-down-sample",
      id: event.pointerId,
      button: event.button,
      buttons: event.buttons,
      capture: view.hasPointerCapture(event.pointerId),
    });
    paint();
  });
  view.addEventListener("pointermove", (event) => {
    if (gestures.inspect().activeId === event.pointerId)
      trace({
        reason: "pointer-move-sample",
        id: event.pointerId,
        button: event.button,
        buttons: event.buttons,
        capture: view.hasPointerCapture(event.pointerId),
        established: establishedCaptures.has(event.pointerId),
      });
    if (
      gestures.inspect().activeId === event.pointerId &&
      !view.hasPointerCapture(event.pointerId)
    ) {
      trace(gestures.cancel(event.pointerId, "capture-lost-during-move"));
      paint();
      return;
    }
    const result = gestures.move({
      id: event.pointerId,
      q: local(event),
      epoch,
      canPan: changed() && cam.z > 1,
    });
    trace(result);
    if (result.reason === "pan") {
      cam = C.camera(
        cam.width,
        cam.height,
        cam.z,
        cam.tx + result.dx,
        cam.ty + result.dy,
      );
      epoch++;
    }
    paint();
  });
  view.addEventListener("pointerup", (event) => {
    // A pending capture request can be released before got/lostcapture is emitted.
    // Some Chromium pointer-ups report implicit capture release before this check.
    // A previously established capture remains valid until its lostcapture event;
    // a cancelled pending request has neither establishment nor current ownership.
    if (
      gestures.inspect().activeId === event.pointerId &&
      !view.hasPointerCapture(event.pointerId) &&
      !establishedCaptures.has(event.pointerId)
    )
      trace(gestures.cancel(event.pointerId, "capture-lost-before-up"));
    const q = local(event),
      result = gestures.up({
        id: event.pointerId,
        q,
        epoch,
        target: target(q),
      });
    trace(result);
    if (result.commit) inspectSelection(q);
    else paint();
    establishedCaptures.delete(event.pointerId);
  });
  view.addEventListener("gotpointercapture", (event) => {
    establishedCaptures.add(event.pointerId);
    trace({ reason: "capture-established" });
    paint();
  });
  for (const name of ["pointercancel", "lostpointercapture"])
    view.addEventListener(name, (event) => {
      establishedCaptures.delete(event.pointerId);
      trace(gestures.cancel(event.pointerId, name));
      paint();
    });
  view.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      invalidate("escape");
      $("cursor").hidden = true;
      paint();
      return;
    }
    const dirs = {
      ArrowLeft: [-10, 0],
      ArrowRight: [10, 0],
      ArrowUp: [0, -10],
      ArrowDown: [0, 10],
    };
    if (dirs[event.key]) {
      event.preventDefault();
      const [dx, dy] = dirs[event.key];
      if (event.shiftKey) pan(-4 * dx, -4 * dy);
      else {
        cursor = {
          x: Math.max(0, Math.min(cam.width - 1, cursor.x + dx)),
          y: Math.max(0, Math.min(cam.height - 1, cursor.y + dy)),
        };
        $("cursor").hidden = false;
        paint();
      }
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      invalidate("keyboard-select");
      inspectSelection(cursor);
    }
  });
  const observer = new ResizeObserver(layout);
  observer.observe($("safe-frame"));
  window.addEventListener("resize", layout);
  window.visualViewport?.addEventListener("resize", layout);
  window.addEventListener(
    "scroll",
    () => {
      invalidate("page-scroll");
      paint();
    },
    { passive: true },
  );
  for (const type of ["blur", "pagehide"])
    window.addEventListener(type, () => {
      invalidate(type);
      gestures.reset();
      paint();
    });
  document.addEventListener("visibilitychange", () => {
    invalidate("visibility");
    gestures.reset();
    paint();
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener(
    "change",
    paint,
  );
  Promise.all(
    ["original", "changed"].map((stem) => {
      const image = new Image();
      image.src = "images/" + stem + ".png";
      return image.decode();
    }),
  )
    .then(() => {
      loaded = true;
      $("art").hidden = false;
      switchSnapshot();
      layout();
    })
    .catch((error) => {
      $("art").hidden = true;
      loaded = false;
      invalidate("load-error");
      $("selection").textContent =
        "Candidate image load failed: " + error.message;
      paint();
    });
  layout();
})();

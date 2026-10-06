import type { ReportIssue, ValidationPath } from "./result";

// Inspect descriptors instead of reading properties so authored getters are never invoked.
// The explicit stack also rejects cycles before a recursive schema parser encounters them.
export function checkDeclarativeData(
  input: unknown,
  report: ReportIssue,
): void {
  const ancestors = new WeakSet<object>();
  const stack: { value: unknown; path: ValidationPath; leaving?: boolean }[] = [
    { value: input, path: [] },
  ];
  while (stack.length > 0) {
    const entry = stack.pop();
    if (!entry) break;
    const { value, path } = entry;
    if (
      value === null ||
      typeof value === "string" ||
      typeof value === "boolean"
    )
      continue;
    if (typeof value === "number" && Number.isFinite(value)) continue;
    if (typeof value !== "object" || value === null) {
      report(
        "structure",
        "non_json_value",
        path,
        "Expected finite JSON-compatible declarative data",
      );
      continue;
    }
    if (entry.leaving) {
      ancestors.delete(value);
      continue;
    }
    if (ancestors.has(value)) {
      report(
        "structure",
        "cyclic_data",
        path,
        "Case data cannot contain circular references",
      );
      continue;
    }
    const array = Array.isArray(value);
    const prototype: unknown = Object.getPrototypeOf(value);
    if (
      prototype !== (array ? Array.prototype : Object.prototype) &&
      prototype !== null
    ) {
      report(
        "structure",
        "non_json_object",
        path,
        "Expected a plain JSON object or array",
      );
      continue;
    }
    ancestors.add(value);
    stack.push({ value, path, leaving: true });
    const descriptors = Object.getOwnPropertyDescriptors(value);
    for (const key of Reflect.ownKeys(descriptors)) {
      if (array && key === "length") continue;
      const descriptor = typeof key === "string" ? descriptors[key] : undefined;
      const part =
        array && typeof key === "string" && /^(0|[1-9][0-9]*)$/.test(key)
          ? Number(key)
          : String(key);
      const childPath = [...path, part];
      if (
        !descriptor ||
        !descriptor.enumerable ||
        !("value" in descriptor) ||
        (array && typeof part !== "number")
      ) {
        report(
          "structure",
          "non_json_property",
          childPath,
          "Only enumerable JSON data properties are allowed; no accessors or symbols",
        );
        continue;
      }
      stack.push({ value: descriptor.value, path: childPath });
    }
  }
}

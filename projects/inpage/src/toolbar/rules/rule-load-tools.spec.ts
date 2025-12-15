import { describe, expect, test, beforeAll, vi } from "vitest";
import { prefixBase64, prefixJson64 } from "../../constants/rules";
import { RuleLoadTools } from "./rule-load-tools";

function toBase64Utf8(text: string) {
  return Buffer.from(text, "utf-8").toString("base64");
}

beforeAll(() => {
  // Using `window.atob(...)` for base64 decoding.
  const atobFn = (b64: string) => Buffer.from(b64, "base64").toString("utf-8");
  vi.stubGlobal("atob", atobFn);
  vi.stubGlobal("window", { atob: atobFn } as any);
});

describe("RuleLoadTools.splitUrlSections", () => {
// xy({ a: 0, b: 8} satisfies { a: number; b: number });

  // const cases = ;

  test.each([
    // Empty
    ["", { key: undefined, params: undefined, button: undefined }],
    // undefined
    [undefined, { key: 'undefined', params: undefined, button: undefined }],
    // null
    [null, { key: 'null', params: undefined, button: undefined }], 
    // Key only (various forms)
    ["edit", { key: "edit", params: undefined, button: undefined }],
    // Ensures the key may start with "+" and is preserved verbatim.
    ["+edit", { key: "+edit", params: undefined, button: undefined }],
    // Ensures the key may start with "-" and is preserved verbatim.
    ["-edit", { key: "-edit", params: undefined, button: undefined }],
    // key + params + button
    ["edit?x=1#but=ok", { key: "edit", params: "x=1", button: "but=ok" }],
    // key containing "=" is still just a key (no ? / # present)
    ["group=myGroup", { key: "group=myGroup", params: undefined, button: undefined }],
  ] satisfies [any, { key?: string; params?: string; button?: string }][]
  )("splitUrlSections(%o) -> %o", (input, expected) => {
    // Run
    const result = RuleLoadTools.splitUrlSections(input);
    expect(result.key).toBe(expected.key);
    expect(result.params).toBe(expected.params);
    expect(result.button).toBe(expected.button);
  });
});

describe("RuleLoadTools.splitParamsArray", () => {
  const cases: Array<[string | null | undefined, Array<[string, any]>]> = [
    ["", []],
    [null as any, []],
    [undefined as any, []],
    // Simple params, numeric strings are cast to numbers
    ["x=1", [["x", 1]]],
    ["x=1&y=2", [["x", 1], ["y", 2]]],
    // Keys without values, empty string becomes 0 due to isNaN check
    ["x", [["x", 0]]],
    ["x=", [["x", 0]]], // explicit empty value also becomes 0
    ["x&y=2", [["x", 0], ["y", 2]]],
    // URL-encoded values
    ["name=John%20Doe", [["name", "John Doe"]]],
    // Boolean and number casting
    ["enabled=true&disabled=false&count=42", [["enabled", true], ["disabled", false], ["count", 42]]],
    // Base64 encoded values, must use prefixBase64 prefix
    [`data=${prefixBase64}${toBase64Utf8("hello")}`, [["data", "hello"]]],
    // Edge case: value containing '=' is preserved (indexOf finds first '=' only)
    ["url=https://example.com?foo=bar", [["url", "https://example.com?foo=bar"]]],
  ];

  test.each(cases)("input: %s -> array of [key, value]", (input, expected) => {
    const result = RuleLoadTools.splitParamsArray(input);
    expect(result).toEqual(expected);
  });
});

describe("RuleLoadTools.splitParamsDic", () => {
  const cases: Array<[string, Record<string, any>]> = [
    ["", {}],
    // Numeric strings are cast to numbers
    ["x=1", { x: 1 }],
    ["x=1&y=2&z=3", { x: 1, y: 2, z: 3 }],
    ["enabled=true&count=42", { enabled: true, count: 42 }],
    // URL decode works; numeric strings still cast to numbers
    ["name=John%20Doe&age=30", { name: "John Doe", age: 30 }],
  ];

  test.each(cases)("input: %s -> { key: value, ... }", (input, expected) => {
    const result = RuleLoadTools.splitParamsDic(input);
    expect(result).toEqual(expected);
  });
});

describe("RuleLoadTools.dicToArray", () => {
  const cases: Array<[string[][], Record<string, string>]> = [
    [[], {}],
    [[["x", "1"]], { x: "1" }],
    [[["x", "1"], ["y", "2"]], { x: "1", y: "2" }],
    [[["name", "Alice"], ["role", "admin"]], { name: "Alice", role: "admin" }],
  ];

  test.each(cases)("converts array of pairs -> object", (input, expected) => {
    const result = RuleLoadTools.dicToArray(input as any);
    expect(result).toEqual(expected);
  });
});

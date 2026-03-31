import { describe, expect, it, vi } from "vitest";
import { SxcWebApi } from "./sxc-web-api";

vi.mock("../../../../core", () => ({
  NoJQ: {
    param: (obj: Record<string, unknown>) =>
      new URLSearchParams(obj as Record<string, string>).toString(),
  },
}));

describe("SxcWebApi.url", () => {
  function createApi() {
    const sxc = {
      http: {
        apiUrl: vi.fn((url: string) => `https://host/${url}`),
      },
    } as any;

    return new SxcWebApi(sxc);
  }

  function runUrlCases(cases: Array<[string, unknown, string]>) {
    it.each(cases) (
      "builds url correctly: %s + %o",
      (inputUrl, params, expected) => {
        const api = createApi();
        const result = api.url(inputUrl, params);
        expect(result).toBe(expected);
      },
    );
  }

  describe("url with id-string-params combinations", () => {
    const expectedUrl = "https://host/app/auto/api/Blog/Posts?id=1";
    runUrlCases([
      // accepts params starting without anything
      ["Blog/Posts", "id=1", expectedUrl],

      // accepts params starting with ?
      ["Blog/Posts", "?id=1", expectedUrl],

      // accepts params starting with &
      ["Blog/Posts", "&id=1", expectedUrl],

      // tests with leading and trailing spaces - will not work, just left here for documentation of the current behavior.
      // ["Blog/Posts", "  id=1  ", expectedUrl],
    ]);
  });

  describe("url with object-params combinations", () =>
    runUrlCases([
      // no params
      ["Blog/Posts", undefined, "https://host/app/auto/api/Blog/Posts"],
      // no params
      ["Blog/Posts", null, "https://host/app/auto/api/Blog/Posts"],
      // empty params
      ["Blog/Posts", {}, "https://host/app/auto/api/Blog/Posts"],
      // object params
      ["Blog/Posts", { id: 1 }, "https://host/app/auto/api/Blog/Posts?id=1"],
      // multiple params
      ["Blog/Posts", { id: 1, lang: "en" }, "https://host/app/auto/api/Blog/Posts?id=1&lang=en"],
      // multiple params
      ["Blog/Posts", { id: 1, lang: "en", color: "red" }, "https://host/app/auto/api/Blog/Posts?id=1&lang=en&color=red"],
    ])
  );

  describe("problematic separators", () => {
    runUrlCases([
      // ignores hash fragments
      [
        "Blog/Posts?cat=news#abc",
        null,
        "https://host/app/auto/api/Blog/Posts?cat=news",
      ],
      // ignores hash fragments with params
      [
        "Blog/Posts?cat=news#abc",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],

      // drops empty query separators
      [
        "Blog/Posts?&&a=1&&",
        "&b=2&&",
        "https://host/app/auto/api/Blog/Posts?a=1&b=2",
      ],
    ]);
  });

  describe("url with params + more params merged", () => {
    runUrlCases([
      // merges object params with existing query
      [
        "Blog/Posts?cat=news",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],

      // merges string params with existing query
      [
        "Blog/Posts?cat=news",
        "page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      
      // merges leading & params into existing query
      [
        "Blog/Posts?cat=news",
        "&page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
    ]);
  });

  describe("OData scenarios", () => {
    runUrlCases([
      // accepts $select as param key
      [
        "Blog/Posts",
        { $select: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id",
      ],
      [
        "Blog/Posts",
        { $filter: "Title eq 'Test'" },
        "https://host/app/auto/api/Blog/Posts?$filter=Title+eq+%27Test%27",
      ],
      // combines multiple OData params
      [
        "Blog/Posts",
        { $select: "Title,Id", $filter: "Title eq 'Test'" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id&$filter=Title+eq+%27Test%27",
      ],
    ]);
  });


  describe("url normalization", () => {
    const cases: Array<[string, string]> = [
      ["Blog/Posts", "app/auto/api/Blog/Posts"],
      ["app/auto/api/Blog/Posts", "app/auto/api/Blog/Posts"],
    ];

    it.each(cases)("normalizes url: %s", (input, expectedInner) => {
      const sxc = {
        http: {
          apiUrl: vi.fn((url: string) => `https://host/${url}`),
        },
      } as any;

      const api = new SxcWebApi(sxc);
      api.url(input);

      expect(sxc.http.apiUrl).toHaveBeenCalledWith(expectedInner);
    });
  });

  it("returns null if url is null", () => {
    const api = createApi();
    expect(api.url(null as any)).toBeNull();
  });
});

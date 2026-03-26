import { describe, expect, it, vi } from "vitest";

vi.mock("../../../../core", () => ({
  NoJQ: {
    param: (obj: Record<string, unknown>) =>
      new URLSearchParams(obj as Record<string, string>).toString(),
  },
}));

import { SxcWebApi } from "./sxc-web-api";

describe("SxcWebApi.url", () => {
  function createApi() {
    const sxc = {
      http: {
        apiUrl: vi.fn((url: string) => `https://host/${url}`),
      },
    } as any;

    return new SxcWebApi(sxc);
  }

  describe("url + params combinations", () => {
    const cases: Array<[string, any, string]> = [
      // no params
      ["Blog/Posts", undefined, "https://host/app/auto/api/Blog/Posts"],
      // object params
      ["Blog/Posts", { id: 1 }, "https://host/app/auto/api/Blog/Posts?id=1"],
      // multiple params
      [
        "Blog/Posts",
        { id: 1, lang: "en" },
        "https://host/app/auto/api/Blog/Posts?id=1&lang=en",
      ],

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
      
      // Test Fails
      // accepts params starting with ?
      ["Blog/Posts", "?id=1", "https://host/app/auto/api/Blog/Posts?id=1"],

      // accepts params starting with &
      ["Blog/Posts", "&id=1", "https://host/app/auto/api/Blog/Posts?id=1"],

      // merges leading & params into existing query
      [
        "Blog/Posts?cat=news",
        "&page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],

      // ignores hash fragments
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

      // accepts $select as param key
      [
        "Blog/Posts",
        { $select: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id",
      ],
    ] as const;

    it.each(cases)(
      "builds url correctly: %s + %o",
      (inputUrl, params, expected) => {
        const api = createApi();
        const result = api.url(inputUrl as any, params as any);

        expect(result).toBe(expected);
      },
    );
  });

  describe("url normalization", () => {
    const cases = [
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

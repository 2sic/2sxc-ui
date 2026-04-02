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

  describe("short url expansion", () => {
    const cases: Array<[string, string]> = [
      ["Blog/Posts", "https://host/app/auto/api/Blog/Posts"],
      ["News/GetOne", "https://host/app/auto/api/News/GetOne"],
    ];

    it.each(cases)("expands %s to an app api url", (inputUrl, expected) => {
      const api = createApi();

      expect(api.url(inputUrl)).toBe(expected);
    });
  });

  describe("full and medium urls", () => {
    const cases: Array<[string, string]> = [
      ["app/auto/api/Blog/Posts", "https://host/app/auto/api/Blog/Posts"],
      ["custom/path/test", "https://host/custom/path/test"],
      ["https://remote.example/api/posts", "https://host/https://remote.example/api/posts"],
    ];

    it.each(cases)("passes %s through apiUrl", (inputUrl, expected) => {
      const api = createApi();

      expect(api.url(inputUrl)).toBe(expected);
    });
  });

  describe("object params", () => {
    const cases: Array<[string, Record<string, unknown>, string]> = [
      [
        "Blog/Posts",
        { id: 1 },
        "https://host/app/auto/api/Blog/Posts?id=1",
      ],
      [
        "Blog/Posts",
        { id: 1, lang: "en" },
        "https://host/app/auto/api/Blog/Posts?id=1&lang=en",
      ],
      [
        "Blog/Posts",
        { category: "tech news", page: 2 },
        "https://host/app/auto/api/Blog/Posts?category=tech+news&page=2",
      ],
      [
        "Blog/Posts",
        { active: true, archived: false },
        "https://host/app/auto/api/Blog/Posts?active=true&archived=false",
      ],
    ];

    it.each(cases)("adds object params for %s", (inputUrl, params, expected) => {
      const api = createApi();

      expect(api.url(inputUrl, params)).toBe(expected);
    });
  });

  describe("existing query handling", () => {
    const cases: Array<[string, string | Record<string, unknown>, string]> = [
      [
        "Blog/Posts?cat=news",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "Blog/Posts?cat=news",
        "page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "Blog/Posts?cat=news&sort=title",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&sort=title&page=2",
      ],
      [
        "Blog/Posts?cat=news",
        { cat: "sports" },
        "https://host/app/auto/api/Blog/Posts?cat=news&cat=sports",
      ],
    ];

    it.each(cases)(
      "merges params into existing query: %s + %o",
      (inputUrl, params, expected) => {
        const api = createApi();

        expect(api.url(inputUrl, params)).toBe(expected);
      },
    );
  });

  describe("separator normalization", () => {
    const cases: Array<[string, string | Record<string, unknown> | undefined, string]> = [
      [
        "Blog/Posts",
        "?id=1",
        "https://host/app/auto/api/Blog/Posts?id=1",
      ],
      [
        "Blog/Posts",
        "&id=1",
        "https://host/app/auto/api/Blog/Posts?id=1",
      ],
      [
        "Blog/Posts?cat=news",
        "&page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "Blog/Posts?cat=news",
        "?page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "Blog/Posts?&&a=1&&",
        "&b=2&&",
        "https://host/app/auto/api/Blog/Posts?a=1&b=2",
      ],
      [
        "Blog/Posts?",
        "",
        "https://host/app/auto/api/Blog/Posts",
      ],
      [
        "Blog/Posts?&",
        undefined,
        "https://host/app/auto/api/Blog/Posts",
      ],
    ];

    it.each(cases)(
      "normalizes separators: %s + %o",
      (inputUrl, params, expected) => {
        const api = createApi();

        expect(api.url(inputUrl, params as any)).toBe(expected);
      },
    );
  });

  describe("hash fragment handling", () => {
    const cases: Array<[string, string | Record<string, unknown> | undefined, string]> = [
      [
        "Blog/Posts#abc",
        undefined,
        "https://host/app/auto/api/Blog/Posts",
      ],
      [
        "Blog/Posts?cat=news#abc",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "Blog/Posts#abc",
        { id: 1 },
        "https://host/app/auto/api/Blog/Posts?id=1",
      ],
    ];

    it.each(cases)(
      "removes hash fragments: %s + %o",
      (inputUrl, params, expected) => {
        const api = createApi();

        expect(api.url(inputUrl, params as any)).toBe(expected);
      },
    );
  });

  describe("OData parameter handling", () => {
    const cases: Array<[string, string | Record<string, unknown>, string]> = [
      [
        "Blog/Posts",
        { $select: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id",
      ],
      [
        "Blog/Posts",
        { $filter: "Id eq 1" },
        "https://host/app/auto/api/Blog/Posts?$filter=Id+eq+1",
      ],
      [
        "Blog/Posts",
        { $orderby: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$orderby=Title,Id",
      ],
      [
        "Blog/Posts?$select=Title",
        { $top: 10 },
        "https://host/app/auto/api/Blog/Posts?$select=Title&$top=10",
      ],
      [
        "Blog/Posts",
        "$filter=Title eq 'Hello'&$top=5",
        "https://host/app/auto/api/Blog/Posts?$filter=Title eq 'Hello'&$top=5",
      ],
    ];

    it.each(cases)(
      "keeps OData params readable: %s + %o",
      (inputUrl, params, expected) => {
        const api = createApi();

        expect(api.url(inputUrl, params)).toBe(expected);
      },
    );
  });

  describe("apiUrl call normalization", () => {
    const cases: Array<[string, string]> = [
      ["Blog/Posts", "app/auto/api/Blog/Posts"],
      ["app/auto/api/Blog/Posts", "app/auto/api/Blog/Posts"],
    ];

    it.each(cases)("calls apiUrl with %s normalized", (input, expectedInner) => {
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

  describe("null handling", () => {
    it("returns null if url is null", () => {
      const api = createApi();

      expect(api.url(null as any)).toBeNull();
    });
  });
});
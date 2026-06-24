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

  function expectUrl(inputUrl: any, params: unknown, expected: string) {
    const api = createApi();
    expect(api.url(inputUrl, params as any)).toBe(expected);
  }

  function expectNoParamsEffect(params: unknown) {
    expectUrl(
      "Blog/Posts",
      params,
      "https://host/app/auto/api/Blog/Posts",
    );
  }

  describe("null and empty handling", () => {
    it("returns null if url is null", () => {
      const api = createApi();
      expect(api.url(null as any)).toBeNull();
    });

    it.each([
      ["undefined", undefined],
      ["null", null],
      ["empty object", {}],
      ["empty string", ""],
      ["whitespace string", "   "],
    ])("keeps %s params undefined", (_label, params) => {
      expectNoParamsEffect(params);
    });
  });

  describe("short and medium url normalization", () => {
    it.each([
      ["Blog/Posts", "app/auto/api/Blog/Posts"],
      ["app/auto/api/Blog/Posts", "app/auto/api/Blog/Posts"],
      ["https://external.example/api/test", "https://external.example/api/test"],
    ])("passes normalized url to apiUrl for %s", (input, expectedInner) => {
      const sxc = {
        http: {
          apiUrl: vi.fn((url: string) => `https://host/${url}`),
        },
      } as any;

      const api = new SxcWebApi(sxc);
      api.url(input);

      expect(sxc.http.apiUrl).toHaveBeenCalledWith(expectedInner);
    });

    it("converts controller/action shorthand to app/auto/api url", () => {
      expectUrl(
        "Blog/Posts",
        undefined,
        "https://host/app/auto/api/Blog/Posts",
      );
    });

    it("does not rewrite already expanded app/auto/api urls", () => {
      expectUrl(
        "app/auto/api/Blog/Posts",
        undefined,
        "https://host/app/auto/api/Blog/Posts",
      );
    });

    it("does not rewrite long urls", () => {
      expectUrl(
        "https://external.example/api/posts",
        undefined,
        "https://host/https://external.example/api/posts",
      );
    });
  });

  describe("object params", () => {
    it.each([
      [
        { id: 1 },
        "https://host/app/auto/api/Blog/Posts?id=1",
      ],
      [
        { id: 1, lang: "en" },
        "https://host/app/auto/api/Blog/Posts?id=1&lang=en",
      ],
      [
        { id: 1, lang: "en", color: "red" },
        "https://host/app/auto/api/Blog/Posts?id=1&lang=en&color=red",
      ],
      [
        { active: true },
        "https://host/app/auto/api/Blog/Posts?active=true",
      ],
      [
        { count: 0 },
        "https://host/app/auto/api/Blog/Posts?count=0",
      ],
    ])("serializes object params %o", (params, expected) => {
      expectUrl("Blog/Posts", params, expected);
    });
  });

  describe("string params without existing url query", () => {
    it.each([
      ["id=1", "https://host/app/auto/api/Blog/Posts?id=1"],
      ["?id=1", "https://host/app/auto/api/Blog/Posts?id=1"],
      ["&id=1", "https://host/app/auto/api/Blog/Posts?id=1"],
      ["&&id=1&&", "https://host/app/auto/api/Blog/Posts?id=1"],
      ["id=1&lang=en", "https://host/app/auto/api/Blog/Posts?id=1&lang=en"],
      ["?id=1&lang=en", "https://host/app/auto/api/Blog/Posts?id=1&lang=en"],
      ["&id=1&lang=en", "https://host/app/auto/api/Blog/Posts?id=1&lang=en"],
    ])("accepts string params %s", (params, expected) => {
      expectUrl("Blog/Posts", params, expected);
    });
  });

  describe("existing query params in url", () => {
    it.each([
      [
        "keeps existing query params if no additional params are provided",
        "Blog/Posts?cat=news",
        undefined,
        "https://host/app/auto/api/Blog/Posts?cat=news",
      ],
      [
        "merges existing query with object params",
        "Blog/Posts?cat=news",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "merges existing query with plain string params",
        "Blog/Posts?cat=news",
        "page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "merges existing query with string params starting with ?",
        "Blog/Posts?cat=news",
        "?page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "merges existing query with string params starting with &",
        "Blog/Posts?cat=news",
        "&page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "drops duplicate separator noise when merging",
        "Blog/Posts?&&a=1&&",
        "&b=2&&",
        "https://host/app/auto/api/Blog/Posts?a=1&b=2",
      ],
      [
        "keeps multiple existing query params and appends new object params",
        "Blog/Posts?cat=news&lang=en",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&lang=en&page=2",
      ],
    ])("%s", (_label, inputUrl, params, expected) => {
      expectUrl(inputUrl, params, expected);
    });
  });

  describe("hash fragment handling", () => {
    it.each([
      [
        "removes hash fragments when no extra params exist",
        "Blog/Posts?cat=news#abc",
        null,
        "https://host/app/auto/api/Blog/Posts?cat=news",
      ],
      [
        "removes hash fragments and appends object params",
        "Blog/Posts?cat=news#abc",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      ],
      [
        "removes hash fragments without query params",
        "Blog/Posts#abc",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?page=2",
      ],
    ])("%s", (_label, inputUrl, params, expected) => {
      expectUrl(inputUrl, params, expected);
    });
  });

  describe("separator normalization", () => {
    it.each([
      [
        "removes leading ? from final params",
        "?page=2",
        "https://host/app/auto/api/Blog/Posts?page=2",
      ],
      [
        "removes leading & from final params",
        "&page=2",
        "https://host/app/auto/api/Blog/Posts?page=2",
      ],
      [
        "drops empty param entries caused by repeated separators",
        "&&page=2&&lang=en&&",
        "https://host/app/auto/api/Blog/Posts?page=2&lang=en",
      ],
      [
        "does not add a trailing ? when params normalize to empty",
        "&&",
        "https://host/app/auto/api/Blog/Posts",
      ],
    ])("%s", (_label, params, expected) => {
      expectUrl("Blog/Posts", params, expected);
    });
  });

  describe("OData-style params", () => {
    it.each([
      [
        "keeps $select readable",
        "Blog/Posts",
        { $select: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id",
      ],
      [
        "keeps $orderby readable",
        "Blog/Posts",
        { $orderby: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$orderby=Title,Id",
      ],
      [
        "encodes filter values but unescapes $",
        "Blog/Posts",
        { $filter: "Title eq 'Test'" },
        "https://host/app/auto/api/Blog/Posts?$filter=Title+eq+%27Test%27",
      ],
      [
        "combines multiple OData params",
        "Blog/Posts",
        { $select: "Title,Id", $filter: "Title eq 'Test'" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id&$filter=Title+eq+%27Test%27",
      ],
      [
        "merges OData params with existing query params",
        "Blog/Posts?lang=en",
        { $select: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?lang=en&$select=Title,Id",
      ],
    ])("%s", (_label, inputUrl, params, expected) => {
      expectUrl(inputUrl, params, expected);
    });
  });

  describe("whitespace normalization", () => {
    it.each([
      [
        "trims surrounding whitespace in string params",
        "  id=1  ",
        "https://host/app/auto/api/Blog/Posts?id=1",
      ],
      [
        "treats whitespace-only string params as empty",
        "   ",
        "https://host/app/auto/api/Blog/Posts",
      ],
    ])("%s", (_label, params, expected) => {
      expectUrl("Blog/Posts", params, expected);
    });
  });
});
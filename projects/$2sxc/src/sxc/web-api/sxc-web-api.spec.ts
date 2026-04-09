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

  describe("null and empty handling", () => {
    it("returns null if url is null", () => {
      const api = createApi();
      expect(api.url(null as any)).toBeNull();
    });

    it("keeps empty params undefined", () => {
      expectUrl(
        "Blog/Posts",
        undefined,
        "https://host/app/auto/api/Blog/Posts",
      );
    });

    it("keeps null params undefined", () => {
      expectUrl(
        "Blog/Posts",
        null,
        "https://host/app/auto/api/Blog/Posts",
      );
    });

    it("keeps empty object params undefined", () => {
      expectUrl(
        "Blog/Posts",
        {},
        "https://host/app/auto/api/Blog/Posts",
      );
    });

    it("keeps empty string params undefined", () => {
      expectUrl(
        "Blog/Posts",
        "",
        "https://host/app/auto/api/Blog/Posts",
      );
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
    it("keeps existing query params if no additional params are provided", () => {
      expectUrl(
        "Blog/Posts?cat=news",
        undefined,
        "https://host/app/auto/api/Blog/Posts?cat=news",
      );
    });

    it("merges existing query with object params", () => {
      expectUrl(
        "Blog/Posts?cat=news",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      );
    });

    it("merges existing query with plain string params", () => {
      expectUrl(
        "Blog/Posts?cat=news",
        "page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      );
    });

    it("merges existing query with string params starting with ?", () => {
      expectUrl(
        "Blog/Posts?cat=news",
        "?page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      );
    });

    it("merges existing query with string params starting with &", () => {
      expectUrl(
        "Blog/Posts?cat=news",
        "&page=2",
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      );
    });

    it("drops duplicate separator noise when merging", () => {
      expectUrl(
        "Blog/Posts?&&a=1&&",
        "&b=2&&",
        "https://host/app/auto/api/Blog/Posts?a=1&b=2",
      );
    });

    it("keeps multiple existing query params and appends new object params", () => {
      expectUrl(
        "Blog/Posts?cat=news&lang=en",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&lang=en&page=2",
      );
    });
  });

  describe("hash fragment handling", () => {
    it("removes hash fragments when no extra params exist", () => {
      expectUrl(
        "Blog/Posts?cat=news#abc",
        null,
        "https://host/app/auto/api/Blog/Posts?cat=news",
      );
    });

    it("removes hash fragments and appends object params", () => {
      expectUrl(
        "Blog/Posts?cat=news#abc",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?cat=news&page=2",
      );
    });

    it("removes hash fragments without query params", () => {
      expectUrl(
        "Blog/Posts#abc",
        { page: 2 },
        "https://host/app/auto/api/Blog/Posts?page=2",
      );
    });
  });

  describe("separator normalization", () => {
    it("removes leading ? from final params", () => {
      expectUrl(
        "Blog/Posts",
        "?page=2",
        "https://host/app/auto/api/Blog/Posts?page=2",
      );
    });

    it("removes leading & from final params", () => {
      expectUrl(
        "Blog/Posts",
        "&page=2",
        "https://host/app/auto/api/Blog/Posts?page=2",
      );
    });

    it("drops empty param entries caused by repeated separators", () => {
      expectUrl(
        "Blog/Posts",
        "&&page=2&&lang=en&&",
        "https://host/app/auto/api/Blog/Posts?page=2&lang=en",
      );
    });

    it("does not add a trailing ? when params normalize to empty", () => {
      expectUrl(
        "Blog/Posts",
        "&&",
        "https://host/app/auto/api/Blog/Posts",
      );
    });
  });

  describe("OData-style params", () => {
    it("keeps $select readable", () => {
      expectUrl(
        "Blog/Posts",
        { $select: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id",
      );
    });

    it("keeps $orderby readable", () => {
      expectUrl(
        "Blog/Posts",
        { $orderby: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?$orderby=Title,Id",
      );
    });

    it("encodes filter values but unescapes $", () => {
      expectUrl(
        "Blog/Posts",
        { $filter: "Title eq 'Test'" },
        "https://host/app/auto/api/Blog/Posts?$filter=Title+eq+%27Test%27",
      );
    });

    it("combines multiple OData params", () => {
      expectUrl(
        "Blog/Posts",
        { $select: "Title,Id", $filter: "Title eq 'Test'" },
        "https://host/app/auto/api/Blog/Posts?$select=Title,Id&$filter=Title+eq+%27Test%27",
      );
    });

    it("merges OData params with existing query params", () => {
      expectUrl(
        "Blog/Posts?lang=en",
        { $select: "Title,Id" },
        "https://host/app/auto/api/Blog/Posts?lang=en&$select=Title,Id",
      );
    });
  });

  describe("behavior documentation for current edge cases", () => {
    it("does not trim whitespace in string params", () => {
      expectUrl(
        "Blog/Posts",
        "  id=1  ",
        "https://host/app/auto/api/Blog/Posts?++id=1++",
      );
    });
  });
});
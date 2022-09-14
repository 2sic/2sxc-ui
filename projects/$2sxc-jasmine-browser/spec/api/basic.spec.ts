import { Sxc } from "../../../sxc-typings/index";

describe("2sxc.api basic initialize a Sxc object", function () {
  let sxc: Sxc;

  it("isEditMode() is false", function () {
    sxc = $2sxc(1)
    expect(sxc.isEditMode()).toBe(false);
  });

  it("with moduleId=42 => id is 42", function () {
    sxc = $2sxc(42)
    expect(sxc.id).toBe(42);
  });

  it("with moduleId=111 and contentBlockId=24 => cbid is 24", function () {
    sxc = $2sxc(111, 24)
    expect(sxc.cbid).toBe(24);
  });

  // xit("root.sysinfo.version is 'test'", function () {
  //   expect(sxc.root.sysinfo.version).toBe('test');
  // });

  // xit("root.env.header.page is 42", function () {
  //   expect(() => sxc.root.env.header.page).toBe(42);
  // });

  // xit("root.env.header.api is 'mock.apiRoot'", function () {
  //   expect(() => sxc.root.env.header.api).toBe('mock.apiRoot');
  // });

  // xit("root.env.header.rvt is 'mock-AntiForgeryValue'", function () {
  //   expect(sxc.root.env.header.rvt).toBe('mock-AntiForgeryValue');
  // });
});

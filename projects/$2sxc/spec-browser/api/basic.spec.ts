// import type * as sxc2 from '../../src/'
describe("2sxc.api suite", function () {

  it("id is 42", function () {
    var sxc = (window as any).$2sxc(42);
    // console.log("sxc", sxc);
    expect(sxc.id).toBe(42);
  });

  it("cbid is 42", function () {
    var sxc = (window as any).$2sxc(42);
    expect(sxc.cbid).toBe(42);
  });

  it("root.sysinfo.version is 'test'", function () {
    var sxc = (window as any).$2sxc(42);
    expect(sxc.root.sysinfo.version).toBe('test');
  });

  xit("root.env.header.page is 42", function () {
    var sxc = (window as any).$2sxc(42);
    expect(() => sxc.root.env.header.page).toBe(42);
  });

  xit("root.env.header.api is 'mock.apiRoot'", function () {
    var sxc = (window as any).$2sxc(42);
    expect(() => sxc.root.env.header.api).toBe('mock.apiRoot');
  });

  xit("root.env.header.rvt is 'mock-AntiForgeryValue'", function () {
    var sxc = (window as any).$2sxc(42);
    expect(sxc.root.env.header.rvt).toBe('mock-AntiForgeryValue');
  });

  it("isEditMode() is false", function () {
    var sxc = (window as any).$2sxc(42);
    expect(sxc.isEditMode()).toBe(false);
  });
});

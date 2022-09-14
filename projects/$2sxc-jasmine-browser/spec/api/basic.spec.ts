describe("2sxc.api suite", function () {
  var sxc = $2sxc(42);
  console.log("sxc", sxc);

  it("isEditMode() is false", function () {
   expect(sxc.isEditMode()).toBe(false);
  });

  it("id is 42", function () {
    expect(sxc.id).toBe(42);
  });

  it("cbid is 42", function () {
    expect(sxc.cbid).toBe(42);
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

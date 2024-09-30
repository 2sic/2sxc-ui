import { ContextIdentifier, Sxc } from "../../../sxc-typings/index";

describe("2sxc.api initialize a Sxc object with ContextIdentifier", function () {
  let sxc: Sxc;
  let contextIdentifier: ContextIdentifier;

  it("ContextIdentifier full", function () {
    contextIdentifier = {
      /** ZoneId of this Context */
      zoneId: 10,
      /** AppId of this Context */
      appId: 20,
      /** PageId of this Context (optional) */
      pageId: 30,
      /** ModuleId of this Context (optional) */
      moduleId: 40
    } as ContextIdentifier;
    sxc = $2sxc(contextIdentifier)
    expect(sxc.isEditMode()).toBe(false);
  });

  it("ContextIdentifier without pageId", function () {
    contextIdentifier = {
      /** ZoneId of this Context */
      zoneId: 10,
      /** AppId of this Context */
      appId: 20,
      /** ModuleId of this Context (optional) */
      moduleId: 40
    } as ContextIdentifier;
    sxc = $2sxc(contextIdentifier)
    expect(sxc.isEditMode()).toBe(false);
  });

  it("ContextIdentifier without moduleId", function () {
    contextIdentifier = {
      /** ZoneId of this Context */
      zoneId: 10,
      /** AppId of this Context */
      appId: 20,
      /** PageId of this Context (optional) */
      pageId: 30
    } as ContextIdentifier;
    sxc = $2sxc(contextIdentifier)
    expect(sxc.isEditMode()).toBe(false);
  });

  it("ContextIdentifier without pageId and moduleId", function () {
    contextIdentifier = {
      /** ZoneId of this Context */
      zoneId: 10,
      /** AppId of this Context */
      appId: 20
    } as ContextIdentifier;
    sxc = $2sxc(contextIdentifier)
    expect(sxc.isEditMode()).toBe(false);
  });

  xit("ContextIdentifier empty", function () {
    contextIdentifier = { } as ContextIdentifier;
    sxc = $2sxc(contextIdentifier)
    expect(sxc.isEditMode()).toBe(false);
  });
});

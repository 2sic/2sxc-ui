import { Sxc } from '../../../sxc-typings/index';

describe('2sxc.api html fixtures', () => {

  var fixture: JQuery;
  var sxc: Sxc;

  describe('2sxc.api simple html fixtures', () => {

    beforeEach(function () {
      fixture = $("<div class='sc-content-block'  data-cb-instance='123' data-cb-id='345'>mock</div>");
      console.log("fixture", fixture[0]);
      sxc = $2sxc(fixture[0]);
      console.log("sxc", sxc);
    });

    it("isEditMode()=false", function () {
      expect(sxc.isEditMode()).toBe(false);
    });

    it("data-cb-instance='123'", function () {
      expect(sxc.id).toBe(123);
    });

    it("data-cb-id='345'", function () {
      expect(sxc.cbid).toBe(345);
    });
  });



  describe('2sxc.api data-edit-context html fixtures', () => {

    beforeEach(function () {
      fixture = $(`<div class='sc-content-block'  data-cb-instance='385' data-cb-id='385'
      data-edit-context='{"Environment":{"WebsiteId":0,"WebsiteUrl":"//dnn9102-farm2.dnndev.me/","PageId":35,"PageUrl":"http://dnn9102-farm2.dnndev.me/Redis","parameters":[],"InstanceId":385,"SxcVersion":"14.7.5.1662979741","SxcRootUrl":"/","IsEditable":true},"User":{"CanDevelop":true,"CanAdmin":true},"Language":{"Current":"en-us","Primary":"en-us","All":[]},"contentBlockReference":{"publishingMode":"DraftOptional","id":385,"parentIndex":0,"partOfPage":true},"contentBlock":{"IsCreated":true,"IsList":false,"TemplateId":2568,"QueryId":null,"ContentTypeName":"0c67f102-307a-4743-9575-fb1d14d79a8e","AppUrl":"/Portals/0/2sxc/acache","AppSharedUrl":"/Portals/_default/2sxc/acache","AppSettingsId":null,"AppResourcesId":null,"IsContent":false,"HasContent":true,"SupportsAjax":false,"TemplatePath":"/_v1.cshtml","TemplateIsShared":false,"ZoneId":2,"AppId":27,"Guid":"243f3f38-a350-4964-9cee-44e05148bbf3","Id":2570},"error":{"type":null,"Message":null},"Ui":{"AutoToolbar":true}}'>
    `);
      console.log("fixture", fixture[0]);

      sxc = $2sxc(fixture[0]);
      console.log("sxc", sxc);
    });

    it("isEditMode()=false", function () {
      expect(sxc.isEditMode()).toBe(false);
    });

    it("id=385", function () {
      expect(sxc.id).toBe(385);
    });

    it("cbid=385", function () {
      expect(sxc.cbid).toBe(385);
    });

    // xit("data-edit-context", function () {
    //   expect(sxc.id).toBe(385);
    //   expect(sxc.cbid).toBe(345);
    //   const env = sxc.webApi.env;
    //   console.log("env", env);
    // });
  });
});

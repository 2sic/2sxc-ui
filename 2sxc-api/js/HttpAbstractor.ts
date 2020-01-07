import { SxcInstance } from './ToSic.Sxc.Instance';

declare const $2sxc_jQSuperlight: JQuery;

// 2sxc specific header
const HeaderContentBlockId = 'ContentBlockId';

// headers as defined by DNN
const HeaderModuleId = 'ModuleId';
const HeaderTabId = 'TabId';
const HeaderRvt = 'RequestVerificationToken';

export class HttpAbstractor {
  constructor(private sxc: SxcInstance) {
  }

  public makePromise(settings: any): any {
    var headers = this.GetHeaders();

    const promise = $2sxc_jQSuperlight.ajax({
      async: true,
      dataType: settings.dataType || 'json', // default is json if not specified
      data: JSON.stringify(settings.data),
      contentType: 'application/json',
      type: settings.method,
      url: this.getActionUrl(settings),
      beforeSend(xhr: any) {
        for (var key in headers)
          if (headers.hasOwnProperty(key))
            xhr.setRequestHeader(key, headers[key]);
      },
    });

    if (!settings.preventAutoFail)
        promise.fail(this.sxc.showDetailedHttpError);

    return promise;
  }
  
  private GetHeaders(): any {
    const id = this.sxc.id;
    const cbid = this.sxc.cbid; // must read here, as the "this" will change inside the method
    const env = this.sxc.env;

    const fHeaders = {};
    fHeaders[HeaderContentBlockId] = cbid;
    fHeaders[HeaderModuleId] = id;
    fHeaders[HeaderTabId] = env.page();
    fHeaders[HeaderRvt] = env.rvt();
    return fHeaders;
  }


  /**
   * Generate the correct WebApi url
   * @param settings the settings as they would be in jQuery
   */
  private getActionUrl(settings: any): string {
    const base = (settings.url)
      ? this.sxc.resolveServiceUrl(settings.url)  // use url
      : this.sxc.env.apiRoot('2sxc')               // use controller/action
        + 'app/auto/api/' + settings.controller + '/' + settings.action;
    return base + (!settings.params ? '' : ('?' + $2sxc_jQSuperlight.param(settings.params)));
  }
}

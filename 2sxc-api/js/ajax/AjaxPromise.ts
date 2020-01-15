import { SxcInstance } from '../instance/SxcInstance';
import { AjaxSettings } from './AjaxSettings';
import { SxcWebApi } from '../instance/SxcWebApi';
import { ToSxcName } from '../constants';

declare const $2sxc_jQSuperlight: JQuery;

export class AjaxPromise {
  constructor(private api: SxcWebApi, private sxc: SxcInstance) {
  }

  public makePromise(settings: AjaxSettings): JQueryPromise<any> {
    var headers = this.api.headers();
    const promise = $2sxc_jQSuperlight.ajax({
      async: true,
      dataType: settings.dataType || 'json', // default is json if not specified
      data: JSON.stringify(settings.data),
      contentType: 'application/json',
      type: settings.method,
      url: this.getActionUrl(settings),
      beforeSend(xhr: JQueryXHR) {
        for (var key in headers)
          if (headers.hasOwnProperty(key))
            xhr.setRequestHeader(key, headers[key]);
      },
    }) as JQueryPromise<any>;

    if (!settings.preventAutoFail)
        promise.fail(this.sxc.showDetailedHttpError);

    return promise;
  }


  /**
   * Generate the correct WebApi url
   * @param settings the settings as they would be in jQuery
   */
  private getActionUrl(settings: AjaxSettings): string {
    let env = this.sxc.root.env;
    var endpoint = settings.endpoint || ToSxcName;
    var base = this.sxc.root.http.apiUrl(
        settings.url || 'app/auto/api/' + settings.controller + '/' + settings.action, endpoint);
    // let base = (settings.url)
    //   ? this.sxc.root.http.apiUrl(settings.url) // this.sxc.resolveServiceUrl(settings.url)  // use url -> TODO: change this to use the new root.http.apiUrl
    //   : env.apiRoot('2sxc')               // use controller/action
    //     + 'app/auto/api/' + settings.controller + '/' + settings.action;

    // if(settings.endpoint)
    //     base = base.replace(env.apiRoot('2sxc'), 
    //         env.apiRoot(settings.endpoint));

    return base + (!settings.params ? '' : ('?' + $2sxc_jQSuperlight.param(settings.params)));
  }
}

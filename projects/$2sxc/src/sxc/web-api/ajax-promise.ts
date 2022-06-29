import { Sxc, SxcWebApi } from '..';
import { NoJQ } from '../../../../core';
import { ZzzAjaxSettingsDeprecated } from './ajax-settings';

/** @internal */
export class AjaxPromise {
  constructor(private api: SxcWebApi, private sxc: Sxc) {
  }

  /**
   * Make a jQuery style promise request
   * @param settings: settings
   * @returns JQueryPromise<any>
   */
  public makePromise(settings: ZzzAjaxSettingsDeprecated): any {
    var headers = this.api.headers();
    // debugger;
    if (window.$ == null) {
      throw new Error('JQuery is now removed from 2sxc installation. Please use newer api like fetch or include JQuery in your project');
    }
    const promise = window.$.ajax({
      async: true,
      dataType: (settings as any).dataType || 'json', // default is json if not specified
      data: JSON.stringify((settings as any).data),
      contentType: 'application/json',
      type: (settings as any).method,
      url: this.getActionUrl(settings),
      beforeSend(xhr: any) {
        for (var key in headers)
          if (headers.hasOwnProperty(key))
            xhr.setRequestHeader(key, headers[key]);
      },
    }) as any;

    if (!settings.preventAutoFail)
      promise.fail(this.sxc.showDetailedHttpError);

    return promise;
  }


  /**
   * Generate the correct WebApi url
   * @param settings the settings as they would be in jQuery
   */
  private getActionUrl(settings: ZzzAjaxSettingsDeprecated): string {
    var url = (settings as any).url || 'app/auto/api/' + settings.controller + '/' + settings.action;
    // 2020-03-13 stop adding 2sxc endpoint-name, it's already happening in apiUrl so with this it happens 2x
    // var endpoint = settings.endpoint || ToSxcName;
    var base = this.sxc.root.http.apiUrl(url, settings.endpoint);

    return base + (!settings.params ? '' : ('?' + NoJQ.param(settings.params)));
  }
}

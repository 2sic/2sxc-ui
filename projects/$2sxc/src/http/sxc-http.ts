import * as Public from '../../../sxc-typings';
import { ApiExtensionPlaceholder, PlatformDnn, PlatformOqtane } from '../constants';
import { AppApiMarker, HeaderNames, ToSxcName } from '..';
import { Environment, HasLog } from '..';

export class SxcHttp extends HasLog implements Omit<Public.Http, 'log'> {
    constructor(private env: Environment) {
        super('Sxc.Http');
    }

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(id?: number, cbid?: number): Public.Dictionary<string> {
        const cl = this.log.call('headers', `${id}, ${cbid}`);
        const fHeaders : Public.Dictionary<string> = {}; // as any;
        const pageId = this.env.page().toString();
        if(id) fHeaders[HeaderNames.ModuleId] = id.toString();
        if(cbid) fHeaders[HeaderNames.ContentBlockId] = cbid.toString();
        // if(id != cbid && cbid < 0) {
        //   var blockIds = this.getBlockIds(id);
        //   console.log('stv: *** blockIds', blockIds, id, cbid);
        //   if(blockIds && blockIds.length > 0) fHeaders['BlockIds'] = blockIds;
        // }
        fHeaders[HeaderNames.TabId] = pageId;
        fHeaders[HeaderNames.PageId] = pageId;
        fHeaders[this.env.rvtHeader()] = this.env.rvt();
        return cl.return(fHeaders, `headers(id:${id}, cbid:${cbid})`);
    }

    /**
     * Get the API-Root path for a specific extension/endpoint
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
     */
    apiRoot(endpointName: string): string {
        const cl = this.log.call('apiRoot');
        var result = this.env.api().replace(ApiExtensionPlaceholder, endpointName);
        return cl.return(result, `apiRoot('${endpointName}')`);
    }

    /**
     * Get the API-Root path for Apps
     * new in v12
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
     */
     appApiRoot(): string {
        const cl = this.log.call('appApiRoot');
        // try to get it, or fall back to the previous / old convention
        var result = this.env.appApi() ?? this.apiRoot(ToSxcName);
        return cl.return(result, `appApiRoot()`);
    }

    /**
     * Get the URL for a specific web API endpoint
     * Will ignore urls which clearly already are the full url.
     * @param {string} url
     * @param {string} [endpointName]
     * @returns
     * @memberof SxcHttp
     */
    apiUrl(url: string, endpointName?: string)
    {
        const cl = this.log.call('apiUrl');
        this.log.add(`apiUrl(url:'${url}', endpointName:'${endpointName}')`);

        // null/undefined check
        if(url == null) return url;

        // if starts with http: or https: then ignore
        if(!url || url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('//') == 0)
            return cl.return(url);

        // if no endpoint specified, then also skip absolute and relative urls
        if(!endpointName && (url.indexOf('/') == 0 || url.indexOf('.') == 0))
            return cl.return(url);

        var baseUrl = url.toLocaleLowerCase().startsWith(AppApiMarker)
            ? this.appApiRoot()
            : this.apiRoot(endpointName || ToSxcName);


        // ensure base ends with slash
        if(baseUrl[baseUrl.length-1] != '/') baseUrl += '/';
        // ensure url doesn't start with slash
        if(url[0] == '/') url = url.slice(1);
        return cl.return(baseUrl + url);
    }




  /**** POC */

  // getBlockIds(id: number): string {
  //   var blocks = new Array<string>();
  //   var elements = window.document.querySelectorAll(`div[data-cb-instance='${id}']`);
  //   elements.forEach(element => {
  //     var cts = this.getEditContextOfTag(element);
  //     blocks.push(this.getBlockId(cts));
  //   });
  //   return blocks.join(',');
  // }

  // getEditContextOfTag(htmlTag: any): any {
  //   const attr = htmlTag.getAttribute('data-edit-context');
  //   return JSON.parse(attr || '{ }');
  // }

  // getBlockId(ctx: any): string {
  //   return `${ctx.Environment.InstanceId}:${ctx.contentBlockReference.id}`;
  //   // return `${ctx.contentBlock.AppId}:${ctx.contentBlock.ContentTypeName}`;
  // }
}

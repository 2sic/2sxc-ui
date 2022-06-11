import { ContextIdentifier } from '../sxc-root/context-identifier';
import { SxcWebApi } from './web-api/sxc-web-api';
import { ApiUrlRoots, HasLog, ToSxcName } from '../../../core';
import { SxcManage } from './sxc-manage';
import { SxcData } from './data/sxc-data';
import { SxcQuery } from './data/sxc-query';
import { SxcCms } from './sxc-cms';
import { SxcGlobal } from '..';

// const serviceScopes = ['app', 'app-sys', 'app-api', 'app-query', 'app-content', 'eav', 'view', 'dnn'];

/**
* The typical sxc-instance object for a specific DNN module or content-block
*/
export class Sxc extends HasLog {
  /** @internal */
  private _isSxcInstance = true;


  webApi: SxcWebApi;

  /**
   * manage object which provides access to additional content-management features
   * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
   * @memberof SxcInstance
   * @internal
   */
  manage: SxcManage = null; // initialize correctly later on

  /**
   * CMS operations on this sxc-instance.
   */
  cms = new SxcCms(this, 'cms');
  
  /** @internal */
  constructor(
    /** the sxc-instance ID, which is usually the DNN Module Id */
    public id: number,
    /**
     * content-block ID, which is either the module ID, or the content-block definition entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    public cbid: number,
    /** 
     * the id/key of this instance in the cache for reset
     * @internal
     */
    public cacheKey: string,
    /** 
     * The environment information, important for http-calls 
     * @internal
     */
    public readonly root: SxcGlobal,
    /** 
     * Custom context information provided by the constructor - will replace auto-context detection
     * @internal
     */
    public ctx?: ContextIdentifier,
  ) {
    super('SxcInstance', null, 'Generating for ' + id + ':' + cbid);
    this.webApi = new SxcWebApi(this);
    
    // add manage property, but not within initializer, because inside the manage-initializer it may reference 2sxc again
    try { // sometimes the manage can't be built, like before installing
      if (root._manage) root._manage.initInstance(this);
    } catch (e) {
      console.error('error in 2sxc - will only log but not throw', e);
    }

    // ensure that data-APIs used incorrectly shows good warnings
    patchDataWithWarnings(this.data);
    
    // this only works when manage exists (not installing) and translator exists too
    if (root._translateInit && this.manage)
    // ensure that we really have a manage context, otherwise we can't initialize i18n and it doesn't make sense
    if (this.manage.context && this.manage.context.app && this.manage.context.app.currentLanguage)
    root._translateInit(this.manage);    // init translate, not really nice, but ok for now
  }

  /**
   * TypeGuard for TypeScript to verify this is a SxcInstance
   * @param thing 
   * @returns 
   */
  public static is(thing: unknown): thing is Sxc {
    return (thing as Sxc)._isSxcInstance;
  }

  /**
   * Get a data service for a specific content-type.
   *
   * @param {string} contentType name of the content type which this service will get
   * @returns SxcData<T>
   * @memberof SxcInstance
   */
  data<T = unknown>(contentType: string) : SxcData<T> {
    return new SxcData<T>(this, contentType);
  }
  
  /**
   * 
   * @param query 
   * @returns SxcQuery
   * @memberof SxcInstance
   */
  query(query: string) : SxcQuery {
    return new SxcQuery(this, query);
  }
    
    
  /**
  * converts a short api-call path like "/app/Blog/query/xyz" to the DNN full path
  * which varies from installation to installation like "/desktopmodules/api/2sxc/app/..."
  * @deprecated use http.apiUrl instead
  * @param virtualPath
  * @returns mapped path
  * @internal
  */
  resolveServiceUrl(virtualPath: string) {
    const scope = virtualPath.split('/')[0].toLowerCase();
    
    // stop if it's not one of our special paths
    if (ApiUrlRoots.indexOf(scope) === -1)
    return virtualPath;
    
    return this.root.http.apiRoot(ToSxcName) + scope + '/' + virtualPath.substring(virtualPath.indexOf('/') + 1);
  }
    
    
  /**
   * Show a nice error with more infos around 2sxc
   * @param result 
   * @returns 
   * @internal
   */
  showDetailedHttpError(result: any): any {
    if (window.console)
    console.log(result);
    
    // check if the error was just because a language file couldn't be loaded - then don't show a message
    if (result.status === 404 &&
      result.config &&
      result.config.url &&
      result.config.url.indexOf('/dist/i18n/') > -1) {
        if (window.console)
        console.log('just fyi: failed to load language resource; will have to use default');
        return result;
    }
      
    // if it's an unspecified 0-error, it's probably not an error but a cancelled request,
    // (happens when closing popups containing angularJS)
    if (result.status === 0 || result.status === -1)
    return result;
    
    // let's try to show good messages in most cases
    let infoText = 'Had an error talking to the server (status ' + result.status + ').';
    const srvResp = result.responseText
    ? JSON.parse(result.responseText) // for jquery ajax errors
    : result.data; // for angular $http
    if (srvResp) {
      const msg = srvResp.Message;
      if (msg) infoText += '\nMessage: ' + msg;
      const msgDet = srvResp.MessageDetail || srvResp.ExceptionMessage;
      if (msgDet) infoText += '\nDetail: ' + msgDet;
      
      
      if (msgDet && msgDet.indexOf('No action was found') === 0)
      if (msgDet.indexOf('that matches the name') > 0)
      infoText += '\n\nTip from 2sxc: you probably got the action-name wrong in your JS.';
      else if (msgDet.indexOf('that matches the request.') > 0)
      infoText += '\n\nTip from 2sxc: Seems like the parameters are the wrong amount or type.';
      
      if (msg && msg.indexOf('Controller') === 0 && msg.indexOf('not found') > 0)
      infoText +=
      // tslint:disable-next-line:max-line-length
      "\n\nTip from 2sxc: you probably spelled the controller name wrong or forgot to remove the word 'controller' from the call in JS. To call a controller called 'DemoController' only use 'Demo'.";
      
    }
    // tslint:disable-next-line:max-line-length
    infoText += '\n\nif you are an advanced user you can learn more about what went wrong - discover how on 2sxc.org/help?tag=debug';
    alert(infoText);
    
    return result;
  }
    
  /**
   * Test if the current code is in edit-mode and additional javascripts have been loaded to make it work
   * @returns true if we are in edit-mode
   */
  isEditMode(): boolean {
    return this.manage?._isEditMode() === true;
  }

  /**
   * 
   * @param resetCache 
   * @returns 
   * @internal
   */
  recreate(resetCache: boolean): Sxc {
    if (resetCache) delete this.root._controllers[this.cacheKey]; // clear cache
    return this.root(this.id, this.cbid) as any as Sxc; // generate new
  }
}

// Help cach error on call of old code
// Background: From v3 to v12 data had a unusualy system for retrieving data belonging to the module
// We believe it's almost never used, but the TimelineJs App always used it, and we believe
// 2-3 other examples may have as well. 
// Now in v13 sxc.data is used to get any kind of data,
// and we want to make sure that old code will show a warning helping people fix this
// All the old code would have started with sxc.data.on('load', ...) so this is where we give them the error
// We only do this if it hasn't been done already
function patchDataWithWarnings(data: any) {
  if (!(data as any).on) {
    (data as any).on = () => { throw warning };
    Object.defineProperty(data, 'sourceUrl', {
        get: function() { throw warning }
    });
  }
}

const warning = 'Warning Obsolete Feature on 2sxc JS: the .data has been obsolete for a long time and is repurposed. \n'
+ 'If you are calling ".data.on(...)" or ".data.sourceUrl" you are running very old code. \n' 
+ 'Guidance to fix this: https://r.2sxc.org/brc-13-id.';
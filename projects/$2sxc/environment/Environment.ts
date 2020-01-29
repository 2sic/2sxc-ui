import * as Public from '../../../typings/index';
import { JsInfo } from './JsInfo';
import { EnvironmentMetaLoader } from './envMetaLoader';
import { ApiExtensionPlaceholder } from '../constants';
import { HasLog } from '../logging/HasLog';

declare const _jsApi: JsInfo;

/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 */
export class Environment extends HasLog implements Public.Environment {
  private header: JsInfo;
  public ready = false;
  public source = '';

//   public log: Log;
  public metaLoader: EnvironmentMetaLoader;

  constructor() {
      super('Environment', 'starting');
    // this.log = new Log();
    this.metaLoader = new EnvironmentMetaLoader(this);

    // check if a global variable was already set which we should use
    if(typeof _jsApi !== typeof undefined)
    {
      this.log.add('found _jsApi, will use');
      this.load(_jsApi, 'global variable _jsApi');
    }
    else
    {
      this.log.add('will start initializing');
      this.metaLoader.loadMetaFromHeader();
    }
  }

  /**
   * Load a new jsInfo - must be public, as it's used in iframes where jquery is missing
   * @param newJsInfo new info to load
   */
  public load(newJsInfo: JsInfo, source?: string){
    this.header = newJsInfo;
    this.ready = true;
    this.source = source || 'external/unknown';
    this.log.add('loaded from ' + this.source);
  }

  public api(): string {
    this.ensureReadyOrThrow();
    return this.header.api;
  }

  // TODO: DEPRECATE - only use the $2.http.apiRoot
  public apiRoot(name: string): string {
    console.error("don't use the env.apiRoot any more, use the http.apiRoot istead. Will be removed in 2sxc 10.27");
    return this.api().replace(ApiExtensionPlaceholder, name);
  }
  

  public page(): number { 
    this.ensureReadyOrThrow(); 
    return this.header.page; 
  }

  public rvt(): string { 
    this.ensureReadyOrThrow(); 
    return this.header.rvt; 
  }


  private ensureReadyOrThrow(): void {
    if(this.ready) return;

    // try one last time - usually it should really be ready by now
    this.log.add('ensureReady - force last attempt to load MetaHeader')
    this.metaLoader.loadMetaFromHeader(true);

    // if still not ready, throw exception to console log
    if(this.ready) return;
    throw "Can't find apiRoot - something went wrong, pls contact 2sxc.org"
  }

}

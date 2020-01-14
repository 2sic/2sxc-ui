import { JsInfo } from './JsInfo';
import { Log } from '../tools/Log';
import { EnvironmentMetaLoader } from './envMetaLoader';

const extensionPlaceholder = '{extension}';
declare const _jsApi: JsInfo;

/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 */
export class Environment {
  private header: JsInfo;
  public ready = false;
  public source = '';

  public log: Log;
  public metaLoader: EnvironmentMetaLoader;

  constructor() {
    this.log = new Log('Environment', 'starting');
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


  public apiRoot(name: string): string {
    this.ensureReadyOrThrow();
    return this.header.api.replace(extensionPlaceholder, name);
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


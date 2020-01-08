import { JsInfo } from './JsInfo';
import { Log } from './log';

const extensionPlaceholder = '{extension}';
const maxRetries = 10;
declare const _jsApi: JsInfo;
const helpAutoDetect = 'You must either include jQuery on the page or inject the jsApi parameters to prevent auto-detection.';

export class Environment {
  public header: JsInfo;
  public ready = false;
  public retries = 0;
  public source = '';

  public log: Log;

  constructor() {
    this.log = new Log('Environment', 'starting');
    // console.log('loading environment');
    // check if a global variable was already set which we should use
    if(typeof _jsApi !== typeof undefined)
    {
      this.log.add('found _jsApi, will use');
      this.load(_jsApi, 'global variable _jsApi');
    }
    else
    {
      this.log.add('will start initializing');
      this.loadMetaFromHeader();
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
    if(!this.ready) throw "Can't find API root - something went wrong, pls contact 2sxc.org";
    return this.header.api.replace(extensionPlaceholder, name);
  }

  public page(): number { return this.header.page; }

  public rvt(): string { return this.header.rvt; }


  //#region Initialization from headers

  private loadMetaFromHeader(): void {
    this.log.add('loadMetaFromHeader: start, retry:' + this.retries);
    const meta = this.getMeta('_jsApi');
    if(!meta) {
      this.retries++;
      if(this.retries < maxRetries) 
        setTimeout(() => { this.loadMetaFromHeader();}, 1);
      else
        this.dnnSfFallback();
      return;
    }
    this.load(JSON.parse(meta) as JsInfo, 'meta header');
  }

  private getMeta(metaName): string {
    const metas = document.getElementsByTagName('meta');
  
    for (let i = 0; i < metas.length; i++)
      if (metas[i].getAttribute('name') === metaName) 
        return metas[i].getAttribute('content');

    return '';
  }

  //#endregion

  //#region Initialization code with DNN SF

  /**
   * This will assume the new parameter injection failed and it will attempt to fallback
   * it's for backward compatibility, in case something is using $2sxc and doesn't provide the new
   * implementation
   */
  private dnnSfFallback(): void {
    this.log.add('dnnSfFallback start');
    if(typeof $ === 'undefined') 
      throw `Can't load pageid, moduleid, etc. and $ is not available. \n ${helpAutoDetect}`;
    // await page-ready to then initialize the stuff
    $(() => this.dnnSfLoadWhenDocumentReady());
  }

  private dnnSfLoadWhenDocumentReady(): void {
    this.log.add('dnnSfLoadWhenDocumentReady start');
    const sf = ($ as any).ServicesFramework as any;
    if(typeof sf === 'undefined')
      throw `can't load pageid, moduleid etc. and DNN SF is not available. \n ${helpAutoDetect}`;

    const dnnSf = sf(0);
    var sfJsInfo = {
      page: dnnSf.getTabId(),
      root: 'unknown',
      api: dnnSf.getServiceRoot('2sxc'),
      rvt: dnnSf.getAntiForgeryValue()
    };
    this.load(sfJsInfo, 'dnn SF');
  }
  //#endregion DNN SF

}


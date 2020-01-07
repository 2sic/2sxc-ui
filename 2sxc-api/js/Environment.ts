import { JsInfo } from './JsInfo';

const extensionPlaceholder = '{extension}';
const maxRetries = 3;
declare const _jsApi: JsInfo;

export class Environment {
  public header: JsInfo;
  public ready = false;

  constructor() {
    // console.log('loading environment');
    if(typeof _jsApi !== typeof undefined)
    {
      this.header = _jsApi;
      this.ready = true;
    }
    else
      this.loadMetaFromHeader();
  }

  public load(newJsInfo: JsInfo){
    this.header = newJsInfo;
    this.ready = true;
  }

  public retries = 0;

  private loadMetaFromHeader(): void {
    const meta = this.getMeta('_jsApi');
    if(!meta) {
      this.retries++;
      if(this.retries < maxRetries) 
        setTimeout(() => { this.loadMetaFromHeader();}, 0);
      else
        this.fallbackToDnnSf();
      return;
    }
    this.load(JSON.parse(meta) as JsInfo);
  }

  /**
   * This will assume the new parameter injection failed and it will attempt to fallback
   * it's for backward compatibility, in case something is using $2sxc and doesn't provide the new
   * implementation
   */
  private fallbackToDnnSf(): void {
    if(typeof $ === 'undefined') 
      throw "Can't load pageid, moduleid, etc. and $ is not available.";
    const sf = ($ as any).ServicesFramework as any;
    if(typeof sf === 'undefined')
      throw "can't load pageid, moduleid etc. and DNN Services Framework is not available.";
    const dnnSf = sf(0);
    var sfJsInfo = {
      page: dnnSf.getTabId(),
      root: 'unknown',
      api: dnnSf.getServiceRoot('2sxc'),
      rvt: dnnSf.getAntiForgeryValue()
    };
    this.load(sfJsInfo);
  }

  public apiRoot(name: string): string {
    if(!this.ready) throw "Can't find API root - something went wrong, pls contact 2sxc.org";
    return this.header.api.replace(extensionPlaceholder, name);
  }

  public page(): number { return this.header.page; }

  public rvt(): string { return this.header.rvt; }

  private getMeta(metaName): string {
    const metas = document.getElementsByTagName('meta');
  
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }
  
    return '';
  }

}


import { JsInfo } from './JsInfo';

const extensionPlaceholder = '{extension}';
const maxRetries = 5;
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
        console.warn("Tried to load _jsApi header values but failed despite " + maxRetries + 'attempts.');
      return;
    }
    this.load(JSON.parse(meta) as JsInfo);
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


import { JsInfo } from './JsInfo';

const extensionPlaceholder = '{extension}';
const maxRetries = 5;

export class Environment {
  constructor() {
    // console.log('loading environment');
    this.load();
  }

  public header: JsInfo;
  public ready = false;

  public retries = 0;

  private load(): void {
    const meta = this.getMeta('_jsApi');
    if(!meta) {
      this.retries++;
      if(this.retries < maxRetries) 
        setTimeout(() => { this.load();}, 0);
      else
        throw "Tried to load _jsApi header values but failed despite " + maxRetries + 'attempts.';
      return;
    }
    this.header = JSON.parse(meta) as JsInfo;
    this.ready = true;
    // console.log(this.header);
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


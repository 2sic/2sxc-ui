import { Environment } from './Environment';
import { Log } from '../logging/Log';
import { JsInfo } from './JsInfo';
import { EnvironmentDnnSfLoader } from './envDnnSfLoader';
import { MetaHeaderJsApi } from '../constants';

const maxRetries = 10;

/**
 * This loads environment information from the meta-header tag. 
 * Because of timing issues, it will try multiple times
 */
export class EnvironmentMetaLoader {
  public retries = 0;

  public log: Log;

  constructor(private env: Environment) {
    this.log = env.log;        
  }

  public loadMetaFromHeader(forceFallback = false): void {
    // avoid duplicate execution
    if(this.env.ready) {
        this.log.add('loadMeta - ready - no further loading');
        return;
    }

    this.log.add('loadMetaFromHeader: start, retry:' + this.retries + ', force fallback: ' + forceFallback);
    const meta = this.getMeta(MetaHeaderJsApi);
    if(!meta) {
      this.retries++;
      if(forceFallback || this.retries >= maxRetries)
        new EnvironmentDnnSfLoader(this.env).dnnSfFallback();
      else
      {
        setTimeout(() => { this.loadMetaFromHeader();}, 1);
      }
      return;
    }
    this.env.load(JSON.parse(meta) as JsInfo, 'meta header');
  }
    
  private getMeta(metaName): string {
  const metas = document.getElementsByTagName('meta');
  
  for (let i = 0; i < metas.length; i++)
    if (metas[i].getAttribute('name') === metaName) 
    return metas[i].getAttribute('content');

  return '';
  }
}
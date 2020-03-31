import { Environment } from '.';
import { JsInfo } from './js-info';
import { EnvironmentDnnSfLoader } from './env-loader-dnn-sf';
import { MetaHeaderJsApi } from '../constants';
import * as Log from '../logging';

const maxRetries = 10;

function logTest(): boolean
{
    console.log('test');
    return true;
}
/**
 * This loads environment information from the meta-header tag. 
 * Because of timing issues, it will try multiple times
 */
export class EnvironmentMetaLoader extends Log.HasLog {
    public retries = 0;

    public log: Log.Log;

    constructor(private env: Environment) {
        super('Env.MetaLd', logTest ? env.log : env.log);
    }

    public loadMetaFromHeader(forceFallback = false): void {
        const cl = this.log.call('loadMetaFromHeader', `${forceFallback}`);
        // avoid duplicate execution
        if(this.env.ready) return cl.done('loadMeta - ready');

        this.log.add('loadMetaFromHeader: start, retry:' + this.retries + ', force fallback: ' + forceFallback);
        const meta = this.getMeta(MetaHeaderJsApi);
        if(!meta) {
            this.retries++;
            if(forceFallback || this.retries >= maxRetries) {
                new EnvironmentDnnSfLoader(this.env).dnnSfFallback();
                return cl.done()
            }
            setTimeout(() => { this.loadMetaFromHeader();}, 1);
            return cl.done('will retry');
        }
        this.env.load(JSON.parse(meta) as JsInfo, 'meta header');
        cl.done()
    }
    
    private getMeta(metaName: string): string {
        const metas = document.getElementsByTagName('meta');
        
        for (let i = 0; i < metas.length; i++)
            if (metas[i].getAttribute('name') === metaName) 
            return metas[i].getAttribute('content');

        return '';
    }
}
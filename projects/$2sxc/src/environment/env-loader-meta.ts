import * as Public from '../../../sxc-typings/index';
import { Environment } from '.';
import { EnvironmentDnnSfLoader } from './env-loader-dnn-sf';
import { MetaHeaderJsApi } from '../constants';
import * as Log from '..';

// temp: usually 10, but because Oqtane has some delays, we'll temporarily increase to 100 till we're safe
const maxRetries = 100;
const retryMs = 10;

const MetaSourceId = 'meta header';

const MetaProperty = 'content';

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
            setTimeout(() => { this.loadMetaFromHeader(); }, retryMs);
            return cl.done('will retry');
        }
        // Load the settings
        this.env.load(JSON.parse(meta) as Public.JsInfo, MetaSourceId);

        // monitor setting changes - important for Oqtane
        this.startObserver();
        cl.done();
    }

    private getMeta(metaName: string): string {
        const metas = document.getElementsByTagName('meta');
        
        for (let i = 0; i < metas.length; i++)
            if (metas[i].getAttribute('name') === metaName) 
                return metas[i].getAttribute(MetaProperty);

        return '';
    }

    private getJsApiMetaTag() {
        return document.querySelector(`meta[name=${MetaHeaderJsApi}]`);    
    }

    private observer: MutationObserver;

    /**
     * Watch for changes in our special meta header, to update the variables.
     * Important for Oqtane, which changes the page on the fly without reloading.
     */
    private startObserver(): void {
        if (!!this.observer) return;
        this.observer = new MutationObserver((m) => this.mutationCallback(m));
        this.log.add('start observing');
        this.observer.observe(this.getJsApiMetaTag(), { attributes: true, childList: false, subtree: false });
    }
    
    private mutationCallback(mutationsList: MutationRecord[]) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === MetaProperty) {
                this.log.add('meta env info updated');
                this.env.load(JSON.parse(this.getMeta(MetaHeaderJsApi)) as Public.JsInfo, MetaSourceId);
            }
        }
    }
}
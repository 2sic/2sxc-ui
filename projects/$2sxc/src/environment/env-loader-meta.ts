import * as Public from '../../../sxc-typings/index';
import { Environment } from '.';
import { EnvironmentDnnSfLoader } from './env-loader-dnn-sf';
import { MetaHeaderJsApi, PlatformOqtane } from '../constants';
import * as Log from '..';
import { EnvironmentLoaderDynamic } from './env-loader-dynamic';

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

    private dynamicPageHelper: EnvironmentLoaderDynamic;

    constructor(public env: Environment) {
        super('Env.MetaLd', logTest ? env.log : env.log);
        this.dynamicPageHelper = new EnvironmentLoaderDynamic(this);
    }

    public loadMetaFromHeader(forceFallback = false): void {
        const cl = this.log.call('loadMetaFromHeader', `${forceFallback}`);
        // avoid duplicate execution
        if(this.env.ready) return cl.done('loadMeta - ready');

        this.log.add('loadMetaFromHeader: start, retry:' + this.retries + ', force fallback: ' + forceFallback);
        const meta = this.getMetaContent();
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
        this.updateEnv(JSON.parse(meta) as Public.JsInfo);

        // monitor setting changes - important for Oqtane
        this.dynamicPageHelper.startMetaTagObserver(MetaProperty);
        cl.done();
    }

    public updateEnv(newJsInfo: Public.JsInfo) {
        this.log.add('meta env info updated');
        this.env.load(newJsInfo, MetaSourceId);
        if(newJsInfo.platform === PlatformOqtane)
            this.dynamicPageHelper.startInputRvtObserver();
    }

    public getMetaContent(): string {
        const ourMeta = this.getJsApiMetaTag();
        if (!ourMeta) return null;
        return ourMeta.getAttribute(MetaProperty)
    }

    public getJsApiMetaTag() {
        return document.querySelector(`meta[name=${MetaHeaderJsApi}]`);
    }


    /**
     * Watch for changes in our special meta header, to update the variables.
     * Important for Oqtane, which changes the page on the fly without reloading.
     */
    public startMetaTagObserver(): void {
      if (!!this.observer) return;
      this.observer = new MutationObserver((mutationsList: MutationRecord[]) => {
        for(const mut of mutationsList)
          if (mut.type === 'attributes' && mut.attributeName === MetaProperty)
            this.updateEnv(JSON.parse(this.getMetaContent()) as Public.JsInfo)
      });
      this.log.add('start observing meta tag');
      this.observer.observe(this.getJsApiMetaTag(), { attributes: true, childList: false, subtree: false });
    }
    private observer: MutationObserver;

}

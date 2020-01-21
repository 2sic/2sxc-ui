import { Environment } from './Environment';

const helpAutoDetect = 'You must either include jQuery on the page or inject the jsApi parameters to prevent auto-detection.';

/**
 * This helps load environment information from DNN ServicesFramework - it's a fallback in case the other mechanisms fail
 */
export class EnvironmentDnnSfLoader {
    constructor(public env: Environment) {
        
    }


  /**
   * This will assume the new parameter injection failed and it will attempt to fallback
   * it's for backward compatibility, in case something is using $2sxc and doesn't provide the new
   * implementation
   */
  dnnSfFallback(): void {
    this.env.log.add('dnnSfFallback start');
    if(typeof $ === 'undefined') 
      throw `Can't load pageid, moduleid, etc. and $ is not available. \n ${helpAutoDetect}`;
    // await page-ready to then initialize the stuff
    $(() => this.dnnSfLoadWhenDocumentReady());
  }

  private dnnSfLoadWhenDocumentReady(): void {
    this.env.log.add('dnnSfLoadWhenDocumentReady start');
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
    this.env.load(sfJsInfo, 'dnn SF');
  }
}
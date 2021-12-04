import { SxcRootInternals } from '../sxc-root/sxc-root-internals';
import { SxcRoot } from '../sxc-root/sxc-root';
import { SxcInstance } from '.';
import { ContextIdentifier } from '../sxc-root/context-identifier';

export class SxcInstanceWithInternals extends SxcInstance {
  source: any = null;
  isLoaded = false;
  lastRefresh: Date = null;
  
  constructor(
    public id: number,
    public cbid: number,
    public cacheKey: string,
    protected $2sxc: SxcRoot & SxcRootInternals,
    ctx?: ContextIdentifier
    ) {
      super(id, cbid, $2sxc, ctx);
      
      // Help cach error on call of old code
      // Background: From v3 to v12 data had a unusualy system for retrieving data belonging to the module
      // We believe it's almost never used, but the TimelineJs App always used it, and we believe
      // 2-3 other examples may have as well. 
      // Now in v13 sxc.data is used to get any kind of data,
      // and we want to make sure that old code will show a warning helping people fix this
      // All the old code would have started with sxc.data.on('load', ...) so this is where we give them the error
      (this.data as any).on = () => { 
        throw 'Warning Obsolete Feature on 2sxc JS: the .data has been obsolete for a long time and is repurposed. \n'
        + 'If you are calling .data.on(...) you are running very old code. \n' 
        + 'Guidance to fix this: https://r.2sxc.org/brc-13-id.' 
      };
  }

  recreate(resetCache: boolean): SxcInstanceWithInternals {
    if (resetCache) delete this.$2sxc._controllers[this.cacheKey]; // clear cache
    return this.$2sxc(this.id, this.cbid) as any as SxcInstanceWithInternals; // generate new
  }
}

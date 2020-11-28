import { SxcRootInternals } from '../sxc-root/sxc-root-internals';
import { SxcRoot } from '../sxc-root/sxc-root';
import { SxcInstance, SxcInstanceDataDeprecated } from '.';
import { ContextIdentifier } from '../sxc-root/context-identifier';

export class SxcInstanceWithInternals extends SxcInstance {
    data: SxcInstanceDataDeprecated;
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
        this.data = new SxcInstanceDataDeprecated(this);
    }

    recreate(resetCache: boolean): SxcInstanceWithInternals {
        if (resetCache) delete this.$2sxc._controllers[this.cacheKey]; // clear cache
        return this.$2sxc(this.id, this.cbid) as any as SxcInstanceWithInternals; // generate new
    }
}

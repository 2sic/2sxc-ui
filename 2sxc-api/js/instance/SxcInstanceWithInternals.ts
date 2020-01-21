import { SxcInstanceDataDeprecated } from './SxcInstanceDataDeprecated';
import { SxcInstanceWithEditing } from './SxcInstanceWithEditing';
import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';
import { SxcRoot } from '../SxcRoot/SxcRoot';

export class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    data: SxcInstanceDataDeprecated;
    source: any = null;
    isLoaded = false;
    lastRefresh: Date = null;

    constructor(
        public id: number,
        public cbid: number,
        private cacheKey: string,
        protected $2sxc: SxcRoot & SxcRootInternals,
    ) {
        super(id, cbid, $2sxc);
        this.data = new SxcInstanceDataDeprecated(this);
    }

    recreate(resetCache: boolean): SxcInstanceWithInternals {
        if (resetCache) delete this.$2sxc._controllers[this.cacheKey]; // clear cache
        return this.$2sxc(this.id, this.cbid) as any as SxcInstanceWithInternals; // generate new
    }
}

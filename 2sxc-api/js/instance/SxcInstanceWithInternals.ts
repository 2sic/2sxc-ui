import { SxcDataWithInternals } from './ToSic.Sxc.Data';
import { SxcInstanceWithEditing } from './SxcInstanceWithEditing';
import { SxcControllerInternals } from '../$2sxc/SxcControllerInternals';
import { SxcController } from '../$2sxc/SxcController';

export class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    data: SxcDataWithInternals;
    source: any = null;
    isLoaded = false;
    lastRefresh: Date = null;

    constructor(
        public id: number,
        public cbid: number,
        private cacheKey: string,
        protected $2sxc: SxcController & SxcControllerInternals,
    ) {
        super(id, cbid, $2sxc);
        this.data = new SxcDataWithInternals(this);
    }

    recreate(resetCache: boolean): SxcInstanceWithInternals {
        if (resetCache) delete this.$2sxc._controllers[this.cacheKey]; // clear cache
        return this.$2sxc(this.id, this.cbid) as any as SxcInstanceWithInternals; // generate new
    }
}

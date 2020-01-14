import { SxcDataWithInternals } from './ToSic.Sxc.Data';
import { Environment } from '../environment/Environment';
import { SxcInstanceWithEditing } from './SxcInstanceWithEditing';
import { SxcControllerInternals } from '../$2sxc/SxcControllerWithInternals';
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
        public readonly env: Environment,
    ) {
        super(id, cbid, $2sxc, env);
        this.data = new SxcDataWithInternals(this);
    }

    recreate(resetCache: boolean): SxcInstanceWithInternals {
        if (resetCache) delete this.$2sxc._controllers[this.cacheKey]; // clear cache
        return this.$2sxc(this.id, this.cbid) as any as SxcInstanceWithInternals; // generate new
    }
}

import { SxcInstanceDataDeprecated } from './SxcInstanceDataDeprecated';
import { SxcInstanceWithEditing } from './SxcInstanceWithEditing';
import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';
import { SxcRoot } from '../SxcRoot/SxcRoot';
export declare class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    id: number;
    cbid: number;
    private cacheKey;
    protected $2sxc: SxcRoot & SxcRootInternals;
    data: SxcInstanceDataDeprecated;
    source: any;
    isLoaded: boolean;
    lastRefresh: Date;
    constructor(id: number, cbid: number, cacheKey: string, $2sxc: SxcRoot & SxcRootInternals);
    recreate(resetCache: boolean): SxcInstanceWithInternals;
}

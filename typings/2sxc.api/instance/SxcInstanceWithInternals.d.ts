import { SxcDataWithInternals } from './ToSic.Sxc.Data';
import { SxcInstanceWithEditing } from './SxcInstanceWithEditing';
import { SxcControllerInternals } from '../$2sxc/SxcControllerInternals';
import { SxcController } from '../$2sxc/SxcController';
export declare class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    id: number;
    cbid: number;
    private cacheKey;
    protected $2sxc: SxcController & SxcControllerInternals;
    data: SxcDataWithInternals;
    source: any;
    isLoaded: boolean;
    lastRefresh: Date;
    constructor(id: number, cbid: number, cacheKey: string, $2sxc: SxcController & SxcControllerInternals);
    recreate(resetCache: boolean): SxcInstanceWithInternals;
}

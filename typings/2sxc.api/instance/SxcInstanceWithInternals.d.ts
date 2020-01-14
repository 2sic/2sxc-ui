import { SxcDataWithInternals } from './ToSic.Sxc.Data';
import { Environment } from '../environment/Environment';
import { SxcInstanceWithEditing } from './SxcInstanceWithEditing';
import { SxcControllerInternals } from '../$2sxc/SxcControllerInternals';
import { SxcController } from '../$2sxc/SxcController';
export declare class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    id: number;
    cbid: number;
    private cacheKey;
    protected $2sxc: SxcController & SxcControllerInternals;
    readonly env: Environment;
    data: SxcDataWithInternals;
    source: any;
    isLoaded: boolean;
    lastRefresh: Date;
    constructor(id: number, cbid: number, cacheKey: string, $2sxc: SxcController & SxcControllerInternals, env: Environment);
    recreate(resetCache: boolean): SxcInstanceWithInternals;
}

import { SxcControllerWithInternals } from './ToSic.Sxc.Controller';
import { SxcDataWithInternals } from './ToSic.Sxc.Data';
import { SxcWebApiWithInternals } from './ToSic.Sxc.WebApi';
import { Environment } from './environment/Environment';
export declare class SxcInstance {
    id: number;
    cbid: number;
    readonly env: Environment;
    webApi: SxcWebApiWithInternals;
    protected serviceRoot: string;
    private readonly serviceScopes;
    constructor(id: number, cbid: number, env: Environment);
    resolveServiceUrl(virtualPath: string): string;
    showDetailedHttpError(result: any): any;
}
export declare class SxcInstanceWithEditing extends SxcInstance {
    id: number;
    cbid: number;
    protected $2sxc: SxcControllerWithInternals;
    readonly env: Environment;
    manage: any;
    constructor(id: number, cbid: number, $2sxc: SxcControllerWithInternals, env: Environment);
    isEditMode(): any;
}
export declare class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    id: number;
    cbid: number;
    private cacheKey;
    protected $2sxc: SxcControllerWithInternals;
    readonly env: Environment;
    data: SxcDataWithInternals;
    source: any;
    isLoaded: boolean;
    lastRefresh: Date;
    constructor(id: number, cbid: number, cacheKey: string, $2sxc: SxcControllerWithInternals, env: Environment);
    recreate(resetCache: boolean): SxcInstanceWithInternals;
}

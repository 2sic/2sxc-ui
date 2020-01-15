import { SxcWebApi } from './SxcWebApi';
import { SxcRootV2 } from '../$2/SxcRootV2';
export declare class SxcInstance {
    id: number;
    cbid: number;
    readonly root: SxcRootV2;
    webApi: SxcWebApi;
    constructor(id: number, cbid: number, root: SxcRootV2);
    resolveServiceUrl(virtualPath: string): string;
    showDetailedHttpError(result: any): any;
}

import { SxcWebApi } from './SxcWebApi';
import { SxcRoot } from '../SxcRoot/SxcRoot';
import { HasLog } from '../logging/HasLog';
export declare class SxcInstance extends HasLog {
    id: number;
    cbid: number;
    readonly root: SxcRoot;
    webApi: SxcWebApi;
    constructor(id: number, cbid: number, root: SxcRoot);
    resolveServiceUrl(virtualPath: string): string;
    showDetailedHttpError(result: any): any;
}

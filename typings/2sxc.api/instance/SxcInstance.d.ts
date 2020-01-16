import { SxcWebApi } from './SxcWebApi';
import { SxcController } from '../$2sxc/SxcController';
export declare class SxcInstance {
    id: number;
    cbid: number;
    readonly root: SxcController;
    webApi: SxcWebApi;
    constructor(id: number, cbid: number, root: SxcController);
    resolveServiceUrl(virtualPath: string): string;
    showDetailedHttpError(result: any): any;
}

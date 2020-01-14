import { SxcWebApi } from './SxcWebApi';
import { Environment } from '../environment/Environment';
export declare class SxcInstance {
    id: number;
    cbid: number;
    readonly env: Environment;
    webApi: SxcWebApi;
    constructor(id: number, cbid: number, env: Environment);
    resolveServiceUrl(virtualPath: string): string;
    showDetailedHttpError(result: any): any;
}

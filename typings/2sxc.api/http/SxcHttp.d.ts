import { Dictionary } from '../tools/Dictionary_T';
import { Environment } from '../environment/Environment';
export declare class SxcHttp {
    private env;
    constructor(env: Environment);
    headers(id?: number, cbid?: number): Dictionary<string>;
    apiRoot(endpointName: string): string;
    apiUrl(url: string, endpointName?: string): string;
}

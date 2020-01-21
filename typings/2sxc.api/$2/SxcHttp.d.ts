import { Dictionary } from '../tools/Dictionary_T';
import { SxcRootV2 } from './SxcRootV2';
export declare class SxcHttp {
    private root;
    constructor(root: SxcRootV2);
    headers(id?: number, cbid?: number): Dictionary<string>;
    apiRoot(endpointName: string): string;
    apiUrl(url: string, endpointName?: string): string;
}

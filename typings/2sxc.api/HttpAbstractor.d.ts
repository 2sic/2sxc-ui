import { SxcInstance } from './ToSic.Sxc.Instance';
export declare class HttpAbstractor {
    private sxc;
    constructor(sxc: SxcInstance);
    makePromise(settings: any): any;
    private GetHeaders;
    private getActionUrl;
}

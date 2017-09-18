declare const $: any;
interface Window {
    $2sxc: SxcControllerWithInternals;
}
declare class SxcC {
}
interface SxcController {
    (id: number | HTMLElement, cbid?: number): SxcInstance;
    sysinfo: {
        version: string;
        description: string;
    };
}
interface SxcControllerWithInternals extends SxcController {
    totalPopup: {
        open(url: string, callback: Function): void;
        close(): void;
        closeThis(): void;
        frame: HTMLIFrameElement;
        callback: Function;
    };
    urlParams: {
        get(name: string): string;
        require(name: string): string;
    };
    beta: any;
    _controllers: any;
    _data: any;
    _manage: any;
    _translateInit: any;
    debug: any;
    parts: any;
}
declare class SxcInstance {
    protected readonly dnnSf: any;
    webApi: SxcWebApiWithInternals;
    protected serviceRoot: string;
    private readonly serviceScopes;
    constructor(id: number, cbid: number, dnnSf: any);
    resolveServiceUrl(virtualPath: string): string;
    showDetailedHttpError(result: any): any;
}
declare class SxcInstanceWithEditing extends SxcInstance {
    protected $2sxc: SxcControllerWithInternals;
    protected readonly dnnSf: any;
    manage: any;
    constructor(id: number, cbid: number, $2sxc: SxcControllerWithInternals, dnnSf: any);
    isEditMode(): any;
}
declare class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    private id;
    private cbid;
    private cacheKey;
    protected $2sxc: SxcControllerWithInternals;
    protected readonly dnnSf: any;
    data: SxcDataWithInternals;
    source: any;
    isLoaded: boolean;
    lastRefresh: Date;
    constructor(id: number, cbid: number, cacheKey: string, $2sxc: SxcControllerWithInternals, dnnSf: any);
    recreate(resetCache: boolean): SxcInstanceWithInternals;
}
declare class SxcDataWithInternals {
    private controller;
    source: any;
    "in": any;
    List: any;
    constructor(controller: SxcInstanceWithInternals);
    sourceUrl(params?: string): string;
    load(source?: any): SxcDataWithInternals;
    reload(): this;
    on(events: any, callback: any): any;
    _triggerLoaded(): any;
    one(events: any, callback: any): any;
}
declare class SxcWebApiWithInternals {
    private readonly controller;
    private readonly id;
    private readonly cbid;
    constructor(controller: SxcInstance, id: number, cbid: number);
    get(settingsOrUrl: any, params?: any, data?: any, preventAutoFail?: boolean): any;
    post(settingsOrUrl: any, params?: any, data?: any, preventAutoFail?: boolean): any;
    delete(settingsOrUrl: any, params?: any, data?: any, preventAutoFail?: boolean): any;
    put(settingsOrUrl: any, params?: any, data?: any, preventAutoFail?: boolean): any;
    private _action(settings, params, data, preventAutoFail, method);
    private getActionUrl(settings);
}

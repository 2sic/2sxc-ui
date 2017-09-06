// Type definitions for 2sxc 09.05.00
// Project: 2sxc Content-Management and App System
// Definitions by: Daniel Mettler (iJungleboy) www.2sxc.org




interface SxcControllerWithInternals extends SxcController {
    (id: number | HTMLElement, cbid?: number): SxcInstanceWithInternals,
    totalPopup: {
        open(url: string, callback: Function): void,
        close(): void,
        closeThis(): void,
        frame: HTMLIFrameElement,
        callback: Function;
    },
    urlParams: {
        get(name: string): string,
        require(name: string): string,
    },
    beta: any,
    _controllers: any,
    _data: any,
    _manage: any,
    _translateInit: any,
    debug: any,
    parts: any,

}


interface SxcWebApiWithInternals extends SxcWebApi {
    _action(settings?, params?, data?, preventAutoFail?, method?): any,
    getActionUrl(settings: any): string,
}


interface SxcInstanceWithInternals extends SxcInstanceWithDeprecated {
    isLoaded: boolean,
    lastRefresh: Date,
    manage: any,
    serviceScopes: string[];
    serviceRoot: string;
    source: any,
    cacheKey: string,
    recreate(resetCache?: boolean): SxcInstanceWithInternals,
    showDetailedHttpError(result: any): any,
    webApi: SxcWebApiWithInternals,
}

// Type definitions for 2sxc 09.05.00
// Project: 2sxc Content-Management and App System
// Definitions by: Daniel Mettler (iJungleboy) www.2sxc.org


/**
 * special old setup to retrieve data belonging to this sxc-instance
 * it was created before the time of promises, so it uses a strange API
 * @deprecated please avoid using this, and use the webApi object instead
 */
interface SxcData {
    "in": any,
// ReSharper disable once InconsistentNaming
    List: any[],
    // controller // 2017-09-05 2dm: remove this, don't believe anybody is using this - leave comment till 2018, then remove completely
    load(source: any): SxcData,
    reload(): SxcData,
    on(events, callback): SxcData,
    one(events, callback): SxcData,
}

interface SxcDataWithInternals extends SxcData {
    sourceUrl(params?: string): string,
    source: any,
}

interface SxcInstanceWithDeprecated extends SxcInstanceWithEditing {
    /**
     * the data access object to retrieve data belonging to this instance
     * @deprecated please avoid using this, as it will be deprecated - use web-api calls instead which deliver more standard js-promises
     */
    data: SxcDataWithInternals,
}

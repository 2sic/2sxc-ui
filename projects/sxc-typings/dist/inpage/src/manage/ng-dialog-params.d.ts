import { ContextComplete } from '../context/bundles/context-bundle-button';
/**
 * This is for building/serializing the main url params when opening a dialog.
 * It does not contain the "params" / "items" part
 * @export
 * @class NgUrlValuesWithoutParams
 * @internal
 */
export declare class NgUrlValuesWithoutParams {
    readonly zoneId: number;
    readonly appId: number;
    readonly mid: number;
    readonly cbid: number;
    readonly partOfPage?: boolean;
    readonly publishing?: string;
    /** The api root for all 2sxc API calls - will vary by platform */
    /** new in 10.27 - for quick-dialog */
    readonly apps?: string;
    /** features of App - this is to tell the UI it can show advanced features of an app like permissions, API, REST etc. */
    /** request verification token header name */
    /** request verification token value */
    constructor(context: ContextComplete, partOfPage: boolean);
}

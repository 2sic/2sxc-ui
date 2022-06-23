/**
 * These are all the url params the UI needs to function
 * @internal
 */
export declare const urlParams: {
    pageId: string;
    /**
     *  request verification token header name
     */
    requestVerificationTokenHeader: string;
    /**
     *  request verification token value
     */
    requestVerificationToken: string;
    api: string;
    /**
     * Context: App we're on.
     * This is often 0 (zero) as initially it's not known.
     */
    appId: string;
    /**
     * Selection of what apps should be shown by the dialog
     * this is an optional parameter
     */
    apps: string;
    /** Context: Module we're on */
    moduleId: string;
    /** Context: ContentBlock we're on */
    contentBlockId: string;
};

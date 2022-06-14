/**
 * A context information for the current page, helping the JS talk with the backend
 */
export interface EnvironmentSpecs {
    /** Page ID */
    page: number;
    /** Optional API key - optional if set from external, because it's auto derived from root */
    api: string;
    /** Optional App API Root - required because in Oqtane we'll have a different root for appAPIs */
    appApi: string;
    /** Portal root path - used for various things incl. the API root */
    root: string;
    /** Request verification token header name */
    rvtHeader: string;
    /** Request verification token value */
    rvt: string;
    /** The platform code like 'dnn' or 'oqt' */
    platform: string;
}

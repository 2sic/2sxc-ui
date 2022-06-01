/**
 * ContextIdentifier is used to initialize a Sxc object outside of the default context.
 */
export declare class ContextIdentifier {
    /**
     * ZoneId of this Context
     * @requires zoneId
     */
    zoneId: number;
    /**
     * AppId of this Context
     * @requires appId
     */
    appId: number;
    /**
     * PageId of this Context (optional)
     * @optional
     */
    pageId?: number;
    /**
     * ModuleId of this Context (optional)
     * @optional
     */
    moduleId?: number;
}

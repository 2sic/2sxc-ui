/**
 * ContextIdentifier is used to initialize a Sxc object outside of the default context.
 * @public
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
    /**
     * Exclude pageId and moduleId headers in web requests
     * @internal
     */
    _ignoreHeaders?: boolean;
    /**
     * Marks the context as complete, so it won't merge in anything else
     * WIP #CustomContext ATM for the updated edit-ui
     * @internal
     */
    complete?: boolean;
    /**
     * WIP #CustomContext not really used yet
     * @internal
     */
    blockId?: number;
    /**
     * Type Guard to determine if an object is a ContextIdentifier
     * @param original
     * @returns
     * @internal
     */
    static is(original: unknown): original is ContextIdentifier;
    /**
     * Internal
     * @param ctx
     * @internal
     */
    static ensureCompleteOrThrow(ctx: ContextIdentifier): ContextIdentifier;
}

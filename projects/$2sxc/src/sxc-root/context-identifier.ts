/**
 * ContextIdentifier is used to initialize a Sxc object outside of the default context.
 */
export class ContextIdentifier {
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
  static is(original: unknown): original is ContextIdentifier {
    const origAsContextId = original as ContextIdentifier;
    return origAsContextId.zoneId !== undefined && origAsContextId.appId !== undefined;
  }

  /**
   * Internal
   * @param ctx 
   * @internal
   */
  static ensureCompleteOrThrow(ctx: ContextIdentifier): ContextIdentifier {
    // if it's fulfills the minimum requirements
    if (ctx.zoneId && ctx.appId) return ctx; 
  
    const msg = `It looks like the id given is a ContextIdentifier, but it's missing either zoneId or appId.`;
    console.error(msg, ctx);
    throw msg;
  }
  
}

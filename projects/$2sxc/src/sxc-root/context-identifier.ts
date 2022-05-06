/**
 * ContextIdentifier is used to initialize a Sxc object outside of the default context.
 */
export class ContextIdentifier {
  /** ZoneId of this Context */
  zoneId: number;
  /** AppId of this Context */
  appId: number;
  /** PageId of this Context (optional) */
  pageId?: number;
  /** ModuleId of this Context (optional) */
  moduleId?: number;
  /** Exclude pageId and moduleId headers in web requests */
  _ignoreHeaders?: boolean;
}

export function isContextIdentifier(original: unknown): original is ContextIdentifier {
  const origAsContextId = original as ContextIdentifier;
  return origAsContextId.zoneId !== undefined && origAsContextId.appId !== undefined;
}

export function ensureCompleteOrThrow(ctx: ContextIdentifier): ContextIdentifier {
  // if it's fulfills the minimum requirements
  if (ctx.zoneId && ctx.appId) return ctx; 

  const msg = `It looks like the id given is a ContextIdentifier, but it's missing either zoneId or appId.`;
  console.error(msg, ctx);
  throw msg;
}

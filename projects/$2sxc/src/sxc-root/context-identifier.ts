
export class ContextIdentifier {
  zoneId: number;
  appId: number;
  pageId?: number;
  moduleId?: number;
}

export function isContextIdentifier(original: unknown): original is ContextIdentifier{
    const origAsContextId = original as ContextIdentifier;
    return origAsContextId.zoneId !== undefined && origAsContextId.appId !== undefined;
}

export function throwIfIncomplete(ctx: ContextIdentifier) {
    if (ctx.zoneId && ctx.appId) return;
    const msg = `It looks like the id given is a ContextIdentifier, but it's missing either zoneId or appId.`;
    console.error(msg, ctx);
    throw msg;
}
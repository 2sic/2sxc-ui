

export class ContextBundleBase {
  // tbd

// ReSharper disable once InconsistentNaming
  _isContext = true;
}



export function isContext(thing: any): thing is ContextBundleBase {
  const maybeButton = thing as ContextBundleBase;
  return maybeButton._isContext !== undefined;
}

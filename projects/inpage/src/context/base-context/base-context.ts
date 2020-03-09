

export class BaseContext {
  // tbd

// ReSharper disable once InconsistentNaming
  _isContext = true;
}



export function isContext(thing: any): thing is BaseContext {
  const maybeButton = thing as BaseContext;
  return maybeButton._isContext !== undefined;
}
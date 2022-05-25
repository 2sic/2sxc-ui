
/** @internal */
export function urlClean(original: string): string {
  return original.replace(/(\/+)/g, '/');
}

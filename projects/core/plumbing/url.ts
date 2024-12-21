
/** @internal */
export function flattenSlashes(original: string): string {
  return original.replace(/(\/+)/g, '/');
}

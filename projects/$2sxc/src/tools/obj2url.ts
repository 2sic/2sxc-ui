
// Test code
// window.beta.toUrl({ hello: 7, name: "daniel", sub: { subname: "mettler", subage: 27, subsub: { and: "like"} }, final: 42, null: null}, "test")

// $2sxc.urlParams.toObj($2sxc.urlParams.toUrl({ v1: 1, v2: 2, v3: { v31: 0, v32: { v321: "daniel" } }, v4: 4}));

/**
 * Custom converter to pass objects into a URL and back.
 * @internal
 */
export class ToolUrlObjects {

  toUrl(obj: any, encode: boolean = true): string {
    if (!obj) return '';
    if (Array.isArray(obj)) throw new Error("only objects can be toUrl(), arrays don't work. Put the array in an object property.");
    var result = this
      .toUrlRecursive(obj, null, 0, encode)
      .filter(x => x != null && x.length > 0);
    return result.join('&');
  }

  toObj(value: string, decode: boolean = true, debug: boolean = false): unknown {
    const parts = this.back(value, decode);
    if (debug) return parts;
    return unflatStringsToObj(parts);
  }


  /**
   * Converts an object to a compact notation with dots.
   * Recursive, as it needs to also handle sub-objects
   * @param obj 
   * @param key 
   * @param depth 
   * @returns 
   */
  private toUrlRecursive(obj: any, key: string, depth: number, encode: boolean): string[] {
    if (obj == null) return [];
    const prefix = depth > 0 ? '.'.repeat(depth - 1) : '';

    if (typeof obj !== 'object') 
      return [`${prefix}${key}=${encode ? encodeURIComponent(obj) : obj}`];

    const subItem: string[][] = Object.keys(obj)
      .map(key => this.toUrlRecursive(obj[key], key, depth + 1, encode));
    if (subItem.length === 0) return [];

    var all = subItem.reduce(function (acc, val) {
      return acc.concat(Array.isArray(val) ? arrayFlat(val, 2) : val);
    }, []);

    // Add header entry so the object structure is complete
    const header = depth > 0 ? [`${prefix}${key}`, null] : [];
    return header.concat(all);
  }

  public back(val: string, decode: boolean): Record<string, any> {
    if (!val || val.length === 0) return [];
    const parts = val.split('&').filter(x => x.length > 0);

    let result: Record<string, string> = {};
    let stack: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      const element = parts[i];
      const pair = element.split('=');
      const key = pair[0];

      // count initial dots
      const dotCount = !key.startsWith('.') ? 0 : key.match(/^\.*/g)[0].length

      // Reset stack?
      if (dotCount === 0) {
        stack = key.split('.'); // could have multiple components
      } else {
        if (dotCount > stack.length)
          throw new Error(`Invalid key: ${key} when current stack is ${stack.join('.')}`);
        const subKey = key.substring(dotCount);
        stack = stack.slice(0, dotCount);
        stack.push(subKey);
        pair[0] = stack.join('.');
      }
      result[pair[0]] = pair.length > 1 
        ? (decode ? decodeURIComponent(pair[1]) : pair[1])
        : null;
    }
    return result;
  }

}


// Recursively reduce sub-arrays to the specified depth
function arrayFlat(arr: any[], depth: number): any[] {

  // If depth is 0, return the array as-is
  if (depth < 1) return arr.slice();

  // Otherwise, concatenate into the parent array
  return arr.reduce(function (acc, val) {
    return acc.concat(Array.isArray(val) ? arrayFlat(val, depth - 1) : val);
  }, []);
};

// https://stackoverflow.com/questions/42694980/how-to-unflatten-a-javascript-object-in-a-daisy-chain-dot-notation-into-an-objec
function unflatStringsToObj(data: Record<string, any>): any {
  var result: any = {};
  for (var rec in data) {
    var keys = rec.split('.');
    keys.reduce(function(list, key, j) {
      return list[key] || (list[key] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[rec] : {}) : [])
    }, result)
  }
  return result
}
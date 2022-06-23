
// Test code
// window.beta.toUrl({ hello: 7, name: "daniel", sub: { subname: "mettler", subage: 27, subsub: { and: "like"} }, final: 42, null: null}, "test")

import { TypeValue } from '../../../core';

// $2sxc.urlParams.toObj($2sxc.urlParams.toUrl({ v1: 1, v2: 2, v3: { v31: 0, v32: { v321: "daniel" } }, v4: 4}));

const equals = '=';
const dot = '.';
const separator = '~';
const sepEsc = '~~';
const stringPrefix = separator;
const space = ' ';
const spaceMarker = '_';
const spaceMarkerEsc = '~_';
const restoreSep = '#'; // can never exist unencoded in the fragment
const innerStringPrefix = '¶';
const bools = ['true', 'false'];
const specialValues = bools.concat(['null']);

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
    const urlParam = result.join(separator);
    return urlParam ? separator + urlParam : '';
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
    const prefix = depth > 0 ? dot.repeat(depth) : '';
    if (typeof obj !== 'object') 
      return [`${prefix}${key}=${encode ? customEncode(obj) : obj}`];

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
    
    const parts = val
      .replaceAll(equals + stringPrefix, equals + innerStringPrefix) // prot. string prefix
      .replaceAll(sepEsc, restoreSep)                  // Protect escaped separators
      .split(separator + dot)
      .map(v => v?.replaceAll(restoreSep, separator))  // Restore escaped separators
      .filter(x => x.length > 0);

    let result: Record<string, TypeValue> = {};
    let stack: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      const pair = parts[i].split(equals);
      const key = pair[0];

      // count leading dots
      const dotCount = key.match(/^\.*/g)[0].length;

      // Reset stack?
      if (dotCount === 0) {
        stack = key.split(dot); // could have multiple components
      } else {
        if (dotCount > stack.length)
          throw new Error(`Invalid key: ${key} when current stack is ${stack.join(dot)}`);
        const subKey = key.substring(dotCount);
        stack = stack.slice(0, dotCount);
        stack.push(subKey);
        pair[0] = stack.join(dot);
      }
      result[pair[0]] = pair.length > 1 
        ? (decode ? restoreValue(decodeURIComponent(pair[1])) : pair[1])
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
    var keys = rec.split(dot);
    keys.reduce(function(list, key, j) {
      return list[key] || (list[key] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[rec] : {}) : [])
    }, result)
  }
  return result
}



// https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str: string) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


/**
 * Mark strings which contain values that look like a bool/number
 */
function customEncode(value: any) {
  var mark = false;
  // Not a string (a bool/number) - leave as is
  if (typeof value === 'string') { // return value;

    // Escape strings which look like booleans or numbers
    if (specialValues.includes(value) || isNumeric(value as any))
      mark = true;
      // return `${innerStringPrefix}${value}`;
  
    // Mark any characters which look like the encoding chars
    value = value
      .replaceAll(separator, sepEsc)
      .replaceAll(spaceMarker, spaceMarkerEsc)
      .replaceAll(' ', spaceMarker);
  }
  const enc = encodeURIComponent(value);
  // marc after encoding
  return (mark ? stringPrefix : '') + enc;
}

/**
 * Restore a value to the real type. 
 * Explicitly marked strings will not be re-typed
 */
function restoreValue(value: string) {
  // if explicitly marked string, unwrap and return string
console.log('value', value);

  if (value?.length > 0 && value[0] === innerStringPrefix)
    return restoreString(value.slice(1));
  if (bools.includes(value))
    return value === 'true';
  if (isNumeric(value)) return parseFloat(value);
  return restoreString(value);
}

function restoreString(value: string) {
  const spaceMarkerTemp = String.fromCharCode(1);
  return value
    .replaceAll(spaceMarkerEsc, spaceMarkerTemp)
    .replaceAll(spaceMarker, space)
    .replaceAll(spaceMarkerTemp, spaceMarker);
}

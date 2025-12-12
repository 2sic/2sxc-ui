import { prefixBase64, prefixJson64 } from '../../constants/rules';

/**
 * Helper class to split URL-style rules into their parts
 */
export class RuleLoadTools {

  static splitUrlSections(str: string): { key: string; params: string; button: string; } | undefined {
    // dev link: https://regex101.com/r/vK4rV7/519
    // inspired by https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
    const regex = /^([^\/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?/i;
    // const str = `+edit&something=other&els=ok?aoeuaoeu=5&aoeuaou=aoeu#but=thi&aouoaeu`;
    const m = regex.exec(str);

    if (m && m !== null)
      return { key: m[1], params: m[4], button: m[6] };
    return undefined;
  }


  
  static dicToArray(original: string[][]): Record<string, string> {
    return original.reduce((map, obj) => {
      map[obj[0]] = obj[1];
      return map;
    }, {} as Record<string, string>);
  }

  static splitParamsDic(original: string): Record<string, string> {
    return this.dicToArray(this.splitParamsArray(original));
  }

  static splitParamsArray(original: string): string[][] {
    if (!original) return [];
    const split1 = original.split('&');
    const split2 = split1.map((p) => {
      let i = p.indexOf('=');
      if (i < 0) i = p.length;
      const keyValues = [p.slice(0,i), p.slice(i+1)];
      // 2022-08-15 2dm before - would have lost cases where '=' occurs in the value a few times
      // const keyValues = p.split('=');
      const key = keyValues[0];
      let val: any = keyValues[1];
      // disabled, don't see a use case for this
      // check if the value had '=' - then re-join
      // if (keyValues.length > 1)
      //     val = keyValues.slice(1).join('=');

      // fix url encoding
      if (val?.indexOf('%') > -1) val = decodeURIComponent(val);
      // fix C# typed true/false or string representations
      if (val === 'True' || val === 'true')
        return [key, true];
      if (val === 'False' || val === 'false')
        return [key, false];

      // cast numbers to proper number objects
      if (!isNaN(+val))
        return [key, Number(val)];

      // revert base64 encoding
      if (typeof(val) === 'string' && val.startsWith(prefixBase64)) {
        const afterPrefix = val.split(prefixBase64)[1];
        return [key, window.atob(afterPrefix)];
      }

      if (typeof(val) === 'string' && val.startsWith(prefixJson64)) {
        const afterPrefix = val.split(prefixJson64)[1];
        return [key, JSON.parse(window.atob(afterPrefix))];
      }

      return [key, val];
    });
    return split2;
  }

}

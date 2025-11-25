
/**
 * Object manipulator helpers
 * @internal
 */
export class Obj {
    // 2025-11-25 2dm deprecated, shouldn't use any more
    // /**
    //  * This is the same as Object.assign, but type-safe.
    //  * Use it as a replacement for Object.Assign(this, ... ) in constructors
    //  */
    // static TypeSafeAssign <T, K extends keyof T>(...args: T[]) {
    //     args.reduce( (result, current) =>
    //         (Object.keys(current) as K[]).reduce((target, key) => {
    //             target[key] = current[key];
    //             return target;
    //         }, result)
    //     , args[0]);
    // }

    static DeepClone<T>(original: T, ignoreCircular = false): T {
        if(original === undefined || original === null)
            return original;
        const str = ignoreCircular ? JSON.stringify(original, getCircularReplacer) : JSON.stringify(original);
        if(str === undefined || str === null)
            return original;
        return JSON.parse(str) as T;
    }
}


const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_:any, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };


/**
 * This is the same as Object.assign, but type-safe.
 * Use it as a replacetment for Object.Assign(this, ... ) in constructors
 */
export function TypeSafeAssign <T, K extends keyof T>(...args: T[]) {
    args.reduce( (result, current) =>
        (Object.keys(current) as K[]).reduce((target, key) => {
            target[key] = current[key];
            return target;
        }, result)
    , args[0]);
}
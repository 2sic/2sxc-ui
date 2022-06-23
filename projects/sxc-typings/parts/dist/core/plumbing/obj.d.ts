/**
 * Object manipulator helpers
 * @internal
 */
export declare class Obj {
    /**
     * This is the same as Object.assign, but type-safe.
     * Use it as a replacetment for Object.Assign(this, ... ) in constructors
     */
    static TypeSafeAssign<T, K extends keyof T>(...args: T[]): void;
    static DeepClone<T>(original: T, ignoreCircular?: boolean): T;
}

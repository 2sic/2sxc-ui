/**
 * TypeTbd is a replacement for the any-type, in places where we explicitly want to check the type
 * @internal
 */
export declare type TypeTbD = any;
/**
 * TypeUnsafe is used in code where we explicitly want to cast to any and then to something else
 * @internal
 */
export declare type TypeUnsafe = any;
/**
 * TypeWeDontCare is used in places where we really want to cast something to any
 * @internal
 */
export declare type TypeWeDontCare = any;
/**
 * @internal
 */
export declare function isNothing(thing: unknown): boolean;

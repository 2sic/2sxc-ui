// These types here are alias-types used for conversions and casting
// We created aliases, so we can specifically see where/why we are doing this

/** TypeTbd is a replacement for the any-type, in places where we explicitly want to check the type */
export type TypeTbD = any;

/** TypeUnsafe is used in code where we explicitly want to cast to any and then to something else */
export type TypeUnsafe = any;

/** TypeWeDontCare is used in places where we really want to cast something to any */
export type TypeWeDontCare = any;

export function isNothing(thing: unknown) {
    return thing === undefined || thing === null;
}

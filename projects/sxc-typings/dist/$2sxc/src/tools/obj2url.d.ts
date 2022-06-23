/**
 * Custom converter to pass objects into a URL and back.
 * @internal
 */
export declare class ToolUrlObjects {
    toUrl(obj: any, encode?: boolean): string;
    toObj(value: string, decode?: boolean, debug?: boolean): unknown;
    /**
     * Converts an object to a compact notation with dots.
     * Recursive, as it needs to also handle sub-objects
     * @param obj
     * @param key
     * @param depth
     * @returns
     */
    private toUrlRecursive;
    back(val: string, decode: boolean): Record<string, any>;
}

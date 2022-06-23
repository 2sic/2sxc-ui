import { HasLog } from '../core';
/**
 * This object helps persist / load / reset
 * a setting in the session-state
 * @internal
 */
export declare class SessionStateHandler<T> extends HasLog {
    private readonly key;
    constructor(key: string);
    set(value: string): void;
    remove(): void;
    get(): T;
}

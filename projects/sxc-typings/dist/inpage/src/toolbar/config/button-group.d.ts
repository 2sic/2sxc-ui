import { Button } from '.';
import { TypeValue } from '../../plumbing';
/**
 * @internal
 */
export declare class ButtonGroup {
    buttons: Button[];
    /**
     * Group name - for identification
     * It's automatically set if using toolbar templates, otherwise it'll probably be undefined
     */
    name?: string;
    defaults: Record<string, TypeValue>;
    constructor(buttons: Button[]);
    /** Detect if this is a ButtonGroup */
    static is(thing: unknown): thing is ButtonGroup;
    /** Detect if this is a ButtonGroup */
    static isArray(thing: unknown[]): thing is ButtonGroup[];
}

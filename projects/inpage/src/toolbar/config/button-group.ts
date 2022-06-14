import { Button } from '.';
import { TypeValue } from '../../plumbing';

/**
 * @internal
 */
export class ButtonGroup {
    /**
     * Group name - for identification
     * It's automatically set if using toolbar templates, otherwise it'll probably be undefined
     */
    name?: string;

    defaults: Record<string, TypeValue> = {};

    constructor(public buttons: Button[]) {
        // adds these to the items
        this.buttons = buttons || [];
    }

    /** Detect if this is a ButtonGroup */
    static is(thing: unknown): thing is ButtonGroup {
        return (thing as ButtonGroup).buttons !== undefined;
    }

    /** Detect if this is a ButtonGroup */
    static isArray(thing: unknown[]): thing is ButtonGroup[] {
        return thing.length && (thing[0] as ButtonGroup).buttons !== undefined;
    }
}

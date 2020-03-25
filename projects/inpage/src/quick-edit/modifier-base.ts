import { Selection } from '.';
import { HasLog } from '../logging';

/**
 * Base class for module / content-block editors
 */
export abstract class ModifierBase extends HasLog {
    constructor(name: string) {
        super(name);
    }

    abstract delete(clip: Selection): Promise<void>;
}

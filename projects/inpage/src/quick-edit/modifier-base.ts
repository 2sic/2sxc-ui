import { Selection } from '.';
import { HasLog } from '../core';

/**
 * Base class for module / content-block editors
 * @internal
 */
export abstract class ModifierBase extends HasLog {
    constructor(name: string) {
        super(name);
    }

    abstract delete(clip: Selection): Promise<void>;

    abstract isRealMove(oldClip: Selection, newClip: Selection): boolean;

    abstract move(oldClip: Selection, newClip: Selection): void;
}

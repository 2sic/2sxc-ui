import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be everything about the current system, like system / api -paths etc.
 */
export class ContextOfSystem {
    error: string;

    constructor(editCtx: AttrJsonEditContext) {
        if (editCtx.error) {
            this.error = editCtx.error.type;
        }
    }
}

import { HasLog } from '../../logging';
import { ToolbarRenderer } from './toolbar-renderer';

/**
 * Base class for inner part renderers.
 * The goal is that we have the code in own objects, but that these can only be used
 * from the primary parent object of the type ToolbarRenderer
 *
 * @export
 * @class RenderPart
 * @internal
 */
export class RenderPart extends HasLog {
    constructor(protected parent: ToolbarRenderer, logName: string) {
        super(logName, parent.log);
    }

}

import { ToolbarRenderer } from './toolbar-renderer';

/**
 * Base class for inner part renderers.
 * The goal is that we have the code in own objects, but that these can only be used
 * from the primary parent object of the type ToolbarRenderer
 *
 * @export
 * @class RenderPart
 */
export class RenderPart {
    constructor(protected parent: ToolbarRenderer) { }

}

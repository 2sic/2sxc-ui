import { HasLog } from '../../core';
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
export declare class RenderPart extends HasLog {
    protected parent: ToolbarRenderer;
    constructor(parent: ToolbarRenderer, logName: string);
}

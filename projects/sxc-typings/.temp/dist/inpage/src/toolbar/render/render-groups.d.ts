import { ContextBundleToolbar } from '../../context/bundles/context-bundle-toolbar';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';
/**
 * @internal
 */
export declare class RenderButtonGroups extends RenderPart {
    constructor(parent: ToolbarRenderer);
    generate(context: ContextBundleToolbar): HTMLElement[];
    private generateGroup;
}

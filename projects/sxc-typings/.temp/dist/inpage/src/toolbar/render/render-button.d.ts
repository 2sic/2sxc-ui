import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';
/**
 * @internal
 */
export declare class RenderButton extends RenderPart {
    constructor(parent: ToolbarRenderer);
    render(ctx: ContextComplete, groupIndex: number): HTMLElement;
    private setTitle;
    private processColorRules;
    private generateRunJs;
    private iconTag;
}

import { ContextBundleToolbar } from '../../context/bundles/context-bundle-toolbar';
import { HasLog } from '../../core';
import { RenderButton } from './render-button';
/**
 * @internal
 */
export declare class ToolbarRenderer extends HasLog {
    private context;
    private readonly groups;
    readonly button: RenderButton;
    constructor(context: ContextBundleToolbar);
    /**
     * Convert a generated Toolbar into an HTML-string.
     * AFAIK it's only used in external scripts through older APIs, and never called directly.
     */
    render(): string;
    /**
     * Generate an HTML toolbar tag for adding to the page
     */
    generate(): HTMLUListElement;
}

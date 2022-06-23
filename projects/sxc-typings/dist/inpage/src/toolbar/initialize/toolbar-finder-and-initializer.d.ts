import { HasLog } from '../../core';
import { ToolbarManager } from '../toolbar-manager';
/**
 * @internal
 */
export declare const toolbarSelector: string;
/**
 * This class is responsible for finding toolbar configurations in the doom
 * and then initializing them.
 * @internal
 */
export declare class ToolbarConfigFinderAndInitializer extends HasLog {
    private tlbManager;
    /**
     * Special constructor which only allows this builder to be instatiated from the TagManager
     * This is to simplify program control flow
     */
    constructor(tlbManager: ToolbarManager);
    /**
     * Generate toolbars inside a MODULE tag (usually a div with class sc-edit-context)
     * @param parentTag
     * @param optionalId
     */
    buildDnnModule(parentTag: HTMLElement): void;
    /**
     * Build toolbar, but allow an html node as target
     * Will automatically find a wrapping sc-edit-context and all containing toolbars
     * @param node
     */
    build(node: HTMLElement): void;
    /**
     * find current toolbars inside this wrapper-tag
     */
    private findChildTagsWithConfig;
    /**
     * Setup a toolbar for a specific tag/node by loading its self-contained configuration
     * and replacing / preparing the toolbar as needed.
     * @param node
     */
    private loadConfigAndInitialize;
    /**
     * Take a configuration and convert into a toolbar-menu; also attach the hover-attribute
     * @param tag
     * @param config
     */
    private convertConfigToToolbars;
    /**
     * add hover-attribute to tag which is responsible for the menu to appear/disappear
     */
    private addHoverAttributeToTag;
}

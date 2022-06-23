import { SxcManage } from '../../../$2sxc/src';
import { CommandParams } from '../commands';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { AttrJsonEditContext } from '../context/html-attribute/edit-context-root';
import { TypeUnsafe } from '../plumbing';
import { ToolbarSettings } from '../toolbar/config';
import { InPageButtonJson } from '../toolbar/config-loaders';
/**
 * Instance specific edit manager
 * @internal
 */
export declare class EditManager implements SxcManage {
    editContext: AttrJsonEditContext;
    context: ContextComplete;
    constructor(editContext: AttrJsonEditContext, context: ContextComplete);
    /**
     * run a command - command used in toolbars and custom buttons
     * it is publicly used out of inpage, so take a care to preserve function signature
     */
    run<T>(nameOrSettings: string | CommandParams, eventOrSettings?: CommandParams | MouseEvent, event?: MouseEvent): Promise<void | T>;
    /**
     * Generate a button (an <a>-tag) for one specific toolbar-action.
     * @param {InPageButtonJson} actDef - settings, an object containing the spec for the expected button
     * @param {int} groupIndex - number what button-group it's in'
     * @returns {string} html of a button
     * it is publicly used out of inpage, so take a care to preserve function signature
     */
    getButton(actDef: InPageButtonJson, groupIndex: number): string;
    /**
     * Builds the toolbar and returns it as HTML
     * @param {Object} tbConfig - general toolbar config
     * @param {ToolbarSettings} moreSettings - additional / override settings
     * @returns {string} html of the current toolbar
     *
     * it is publicly used in Razor scripts of inpage, so take a care to preserve function signature
     */
    getToolbar(tbConfig: TypeUnsafe, moreSettings: ToolbarSettings): string;
    /**
     * internal method to find out if it's in edit-mode
     */
    _isEditMode: () => boolean;
    /**
     * change config by replacing the guid, and refreshing dependent sub-objects
     */
    _updateContentGroupGuid(context: ContextComplete, newGuid: string): void;
}

﻿import { SxcInstanceManage } from '../../../$2sxc/src';
import { SxcInstanceEngine } from '../commands';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { AttrJsonEditContext } from '../context/html-attribute/edit-context-root';
import { ContextOfUser } from '../context/parts/context-user';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { TypeUnsafe } from '../plumbing';
import { ToolbarManager } from '../toolbar';
import { ToolbarSettings } from '../toolbar/config';
import { InPageButtonJson } from '../toolbar/config-loaders';
import { ToolbarRenderer } from '../toolbar/render/toolbar-renderer';

/**
 * Instance specific edit manager
 */
export class EditManager implements SxcInstanceManage {

    constructor(
        private sxc: SxcEdit,
        private editContext: AttrJsonEditContext,
        private userInfo: ContextOfUser,
        private cmdEngine: SxcInstanceEngine,
        public context: ContextComplete,
    ) {
    }

    //#region Official, public properties and commands, which are stable for use from the outside

    /**
     * run a command - command used in toolbars and custom buttons
     * it is publicly used out of inpage, so take a care to preserve function signature
     */
    run = this.cmdEngine.run;

    /**
     * Generate a button (an <a>-tag) for one specific toolbar-action.
     * @param {InPageButtonJson} actDef - settings, an object containing the spec for the expected button
     * @param {int} groupIndex - number what button-group it's in'
     * @returns {string} html of a button
     * it is publicly used out of inpage, so take a care to preserve function signature
     */
    getButton(actDef: InPageButtonJson, groupIndex: number): string {
        this.context.button = ToolbarManager.singleton().getLoader('getButton')
            .groups.convertToButton(actDef, {}, {}, {});
        const button = new ToolbarRenderer(this.context).button.render(this.context, groupIndex);
        return button.outerHTML;
    }

    /**
     * Builds the toolbar and returns it as HTML
     * @param {Object} tbConfig - general toolbar config
     * @param {ToolbarSettings} moreSettings - additional / override settings
     * @returns {string} html of the current toolbar
     *
     * it is publicly used in Razor scripts of inpage, so take a care to preserve function signature
     */
    getToolbar(tbConfig: TypeUnsafe, moreSettings: ToolbarSettings): string {
        // if toolbar is an array, use as-is, otherwise assume properties are params
        const toolbar = Array.isArray(tbConfig) ? tbConfig : { ...tbConfig };
        tbConfig = { settings: { ...tbConfig.settings, ...moreSettings }, toolbar: toolbar };
        const toolbarConfig = ToolbarManager.singleton().loadConfig(this.context, tbConfig);
        this.context.toolbar = toolbarConfig;
        return new ToolbarRenderer(this.context).render();
    }

    //#endregion official, public properties - everything below this can change

    _context = this.context;

    /**
     * internal method to find out if it's in edit-mode
     */
    _isEditMode = () => this.editContext.Environment.IsEditable ?? false;

    /**
     * used for various dialogues
     */
    _reloadWithAjax = this.context.app.supportsAjax;

    /** metadata necessary to know what/how to edit */
    _editContext = this.editContext;

    /** used to handle the commands for this content-block */
    _commands = this.cmdEngine;

    _user = this.userInfo;



    /**
     * change config by replacing the guid, and refreshing dependent sub-objects
     */
    _updateContentGroupGuid(context: ContextComplete, newGuid: string) {
        context.contentBlock.contentGroupId = newGuid;
        this.editContext.contentBlock.Guid = newGuid;
    }

}

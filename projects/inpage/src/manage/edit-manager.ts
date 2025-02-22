﻿import { SxcManage } from '../../../$2sxc/src/sxc/sxc-manage';
import { RunParamsWithContext } from '../../../$2sxc/src/cms/run-params';
import { SxcGlobalCms } from '../cms/sxc-global-cms';
import { CommandParams } from '../commands';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { AttrJsonEditContext } from '../context/html-attribute/edit-context-root';
import { HasLog, Log } from '../plumbing';
import { InPageToolbarConfigVariations, ToolbarInitConfig, ToolbarManager } from '../toolbar';
import { ToolbarSettings } from '../toolbar/config';
import { InPageButtonJson } from '../toolbar/config-loaders';
import { ToolbarRenderer } from '../toolbar/render/toolbar-renderer';

/**
 * Instance specific edit manager
 * @internal
 */
export class EditManager extends HasLog implements SxcManage {

    constructor(
        public editContext: AttrJsonEditContext,
        public context: ContextComplete,
        parentLog?: Log
    ) {
        super('Edit.Mng', parentLog, 'start');
    }

    //#region Official, public properties and commands, which are stable for use from the outside

    /**
     * run a command - command used in toolbars and custom buttons
     * it is publicly used out of inpage, so take a care to preserve function signature
     */
    run<T>(
      nameOrSettings: string | CommandParams,
      eventOrSettings?: CommandParams | MouseEvent,
      event?: MouseEvent,
      triggeredBy?: string,
    ): Promise<void | T> {
      const cl = this.log.call('run<T>', `triggeredBy: ${triggeredBy}`);
      // Capture cases where this is called using the new/modern params, which is a mistake
      if ((nameOrSettings as RunParamsWithContext).context || (nameOrSettings as RunParamsWithContext).workflows)
        throw "You are calling '.manage.run(...)' with a parameter 'context' or workflows. You should probably be calling the new '.cms.run(...)' instead.";
      const cntx = ContextComplete.findContext(this.context.sxc);
      cl.done();
      return new SxcGlobalCms().runInternal(cntx, nameOrSettings, eventOrSettings, event, 'editManager.run');
    }
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
    getToolbar(tbConfig: ToolbarInitConfig | InPageToolbarConfigVariations, moreSettings: ToolbarSettings): string {
        // if toolbar is an array, use as-is, otherwise assume properties are params
        const toolbar = Array.isArray(tbConfig) ? tbConfig : { ...tbConfig };
        const typedConfig = {
          settings: { ...(tbConfig as ToolbarInitConfig).settings, ...moreSettings },
          toolbar: toolbar as InPageToolbarConfigVariations,
        } satisfies ToolbarInitConfig;
        const toolbarConfig = ToolbarManager.singleton().loadConfig(this.context, typedConfig);
        this.context.toolbar = toolbarConfig;
        return new ToolbarRenderer(this.context).render();
    }

    //#endregion official, public properties - everything below this can change

    /**
     * internal method to find out if it's in edit-mode
     */
    _isEditMode = () => this.editContext.Environment.IsEditable ?? false;

    /**
     * change config by replacing the guid, and refreshing dependent sub-objects
     */
    _updateContentGroupGuid(context: ContextComplete, newGuid: string) {
        context.contentBlock.contentGroupId = newGuid;
        this.editContext.contentBlock.Guid = newGuid;
    }

}

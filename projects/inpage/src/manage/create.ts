import { SxcInstanceManage } from '../../../$2sxc/src/edit-interfaces/sxc-instance-manage';
import { InstanceEngine } from '../commands/execute/instance-engine';
import { Manipulator } from '../contentBlock/manipulate';
import { AttrJsonEditContext } from '../context/html-attribute/edit-context-root';
import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { TypeUnsafe } from '../plumbing/TypeTbD';
import { buttonConfigAdapter } from '../toolbar/adapters/button-config-adapter';
import { InPageButtonConfiguration } from '../toolbar/config/button/in-page-button-configuration';
import { ToolbarSettings } from '../toolbar/settings/toolbar-settings';
import { ToolbarRenderer } from '../toolbar/render/toolbar-renderer';
import { expandToolbarConfig } from '../toolbar/toolbar/toolbar-expand-config';
import { getTag} from './api';
import { UserOfEditContext } from './user-of-edit-context';
/**
 * Instance specific edit manager
 */
export class EditManager implements SxcInstanceManage {

  constructor(private sxc: SxcIntanceEditable,
              private editContext: AttrJsonEditContext,
              private userInfo: UserOfEditContext,
              private cmdEngine: InstanceEngine,
              public context: ContextBundleButton) {
  }

  //#region Official, public properties and commands, which are stable for use from the outside

  /**
   * run a command - command used in toolbars and custom buttons
   * it is publicly used out of inpage, so take a care to preserve function signature
   */
  run = this.cmdEngine.run;

  /**
   * Generate a button (an <a>-tag) for one specific toolbar-action.
   * @param {InPageButtonConfiguration} actDef - settings, an object containing the spec for the expected button
   * @param {int} groupIndex - number what button-group it's in'
   * @returns {string} html of a button
   * it is publicly used out of inpage, so take a care to preserve function signature
   */
  getButton(actDef: InPageButtonConfiguration, groupIndex: number): string {
    this.context.button = buttonConfigAdapter(actDef);
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
    const toolbarConfig = expandToolbarConfig(this.context, tbConfig, moreSettings);
    this.context.toolbar = toolbarConfig;
    return new ToolbarRenderer(this.context).render(); // renderToolbar(this.context);
  }

  //#endregion official, public properties - everything below this can change

  _context = this.context;

  // ReSharper disable InconsistentNaming
  /**
   * internal method to find out if it's in edit-mode
   */
  _isEditMode = () => this.editContext.Environment.IsEditable;

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
  _updateContentGroupGuid(context: ContextBundleButton, newGuid: string) {
    context.contentBlock.contentGroupId = newGuid;
    this.editContext.ContentGroup.Guid = newGuid;
    // 2dm disabled, doesn't seem used -
    // todo q2stv - question, pls confirm
    // this._instanceConfig = InstanceConfig.fromContext(context);// 2dm simplified buildInstanceConfig(context);
  }

  _getCbManipulator = () => new Manipulator(this.sxc); // manipulator(this.sxc);
  // ReSharper restore InconsistentNaming

  /**
   * init this object
   */
  init = (): void => {
    const tag = getTag(this.sxc);
    // enhance UI in case there are known errors / issues
    const isErrorState = this.editContext && this.editContext.error && this.editContext.error.type;
    if (isErrorState)
      handleErrors(this.editContext.error.type, tag);
  }
}


/**
 * private: show error when the app-data hasn't been installed yet for this imported-module
 */
function handleErrors(errType: string, cbTag: HTMLElement): void {
  const errWrapper = $('<div class="dnnFormMessage dnnFormWarning sc-element"></div>');
  let msg = '';
  const toolbar = $("<ul class='sc-menu'></ul>");
  if (errType === 'DataIsMissing') {
    msg =
      'Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import';
    toolbar.attr('data-toolbar', '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
  }
  errWrapper.append(msg);
  errWrapper.append(toolbar);
  $(cbTag).append(errWrapper);
}

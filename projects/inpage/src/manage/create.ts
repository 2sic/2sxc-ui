import { InstanceEngine } from '../commands/instance-engine';
import { manipulator } from '../contentBlock/manipulate';
import { context } from '../context/context';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { ButtonDefinition } from '../toolbar/button/button-definition';
import { renderButton } from '../toolbar/item/render-button';
import { renderToolbar } from '../toolbar/item/render-toolbar';
import { expandToolbarConfig } from '../toolbar/toolbar/toolbar-expand-config';
import { getEditContext, getTag} from './api';
import { UserOfEditContext } from './user-of-edit-context';
import { buttonConfigAdapter } from '../toolbar/adapters/button-config-adapter';
import { ToolbarSettings } from '../toolbar/toolbar/toolbar-settings';
import { ContextOfButton } from '../context/context-of-button';

/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 * @param sxc
 *
 * we must keep signature of initInstance for compatibility because it is used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
 */
export function initInstance(sxc: SxcInstanceWithInternals) {
  try {
    _initInstance(sxc);
  } catch (e) {
    console.error('error in 2sxc - will log but not throw', e);
  }
}

// ReSharper disable once InconsistentNaming
function _initInstance(sxc: SxcInstanceWithInternals) {
  const myContext = context(sxc);
  const editContext = getEditContext(myContext.sxc);

  const userInfo = UserOfEditContext.fromContext(myContext);// 2dm simplified getUserOfEditContext(context);
  const cmdEngine = new InstanceEngine(myContext.sxc);

  const editManager = new EditManager(myContext.sxc, editContext, userInfo, cmdEngine, myContext);
  sxc.manage = editManager;
  editManager.init(); 
  return editManager;
}

export class EditManager {

  constructor(private sxc: SxcInstanceWithInternals,
    private editContext: DataEditContext,
    private userInfo: UserOfEditContext,
    private cmdEngine: InstanceEngine,
    private context: ContextOfButton) {
  }

  //#region Official, public properties and commands, which are stable for use from the outside

  /**
   * run a command - command used in toolbars and custom buttons
   * it is publicly used out of inpage, so take a care to preserve function signature
   */
  run = this.cmdEngine.run;

  /**
   * Generate a button (an <a>-tag) for one specific toolbar-action.
   * @param {Object<any>} actDef - settings, an object containing the spec for the expected button
   * @param {int} groupIndex - number what button-group it's in'
   * @returns {string} html of a button
   * it is publicly used out of inpage, so take a care to preserve function signature
   */
  getButton = (actDef: ButtonDefinition, groupIndex: number): string => {
    //const tag: any = getTag(this.sxc);
    //const myContext = context(tag);

    const newButtonConfig = buttonConfigAdapter(
      // this.context,
      actDef,
      // groupIndex
      );

    this.context.button = newButtonConfig;
 
    const button = renderButton(this.context, groupIndex);

    return button.outerHTML;
  }

  /**
   * Builds the toolbar and returns it as HTML
   * @param {Object<any>} tbConfig - general toolbar config
   * @param {Object<any>} moreSettings - additional / override settings
   * @returns {string} html of the current toolbar
   *
   * it is publicly used out of inpage, so take a care to preserve function signature
   */
  getToolbar = (tbConfig: any, moreSettings: ToolbarSettings): string => {
    //const tag: any = getTag(this.sxc);
    //const myContext = context(tag);
    const toolbarConfig = expandToolbarConfig(
      this.context,
      tbConfig,
      moreSettings);

    this.context.toolbar = toolbarConfig;

    return renderToolbar(this.context);
  };

  //#endregion official, public properties - everything below this can change at any time

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

  // #region 2dm disabled / todo q2stv
  // todo q2stv - I think we don't need this any more
  // 
  //_dialogParameters = buildNgDialogParams(this.context);

   // 2dm disabled
  // todo q2stv - I think we don't need this any more
 /**
   * used to configure buttons / toolbars
   */
  //_instanceConfig = buildInstanceConfig(this.context);
  // 2dm disabled
  // todo q2stv - I think we don't need this any more
  /**
   * used for in-page dialogues
   */
  //_quickDialogConfig = buildQuickDialogConfig(this.context);

  //#endregion

  /** metadata necessary to know what/how to edit */
  _editContext = this.editContext;

  /** used to handle the commands for this content-block */
  _commands = this.cmdEngine;

  _user = this.userInfo;



  /**
   * change config by replacing the guid, and refreshing dependent sub-objects
   */
  _updateContentGroupGuid(context: ContextOfButton, newGuid: string) {
    context.contentBlock.contentGroupId = newGuid;
    this.editContext.ContentGroup.Guid = newGuid;
    // 2dm disabled, doesn't seem used - 
    // todo q2stv - question, pls confirm
    //this._instanceConfig = InstanceConfig.fromContext(context);// 2dm simplified buildInstanceConfig(context);
  }

  _getCbManipulator = () => manipulator(this.sxc);
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
function handleErrors(errType: any, cbTag: any): void {
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
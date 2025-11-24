import { SxcGlobalEnvironment } from '../../../$2sxc/src';
import { ItemUrlParameters } from '../../../$2sxc/src/cms/item-identifiers';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Log } from '../core';
import { DialogCoreParams } from '../manage/dialog-core-params';
import { NoJQ, flattenSlashes } from '../plumbing';
import { ButtonSafe } from '../toolbar/config';
import { CommandLinkItems } from './command-link-items';

/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 * @internal
 */
export class CommandLinkGenerator extends HasLog {

  constructor(private buttonSafe: ButtonSafe, public readonly context: ContextComplete, parentLog: Log) {
    super('Cmd.LnkGen', parentLog);
    
    // WIP
    this.log.liveDump = true;

    const l = this.log.call('constructor');
    l.done();
  }

  #getUrlParams(): ItemUrlParameters {
    const l = this.log.call('getUrlParams');
    const btnSafe = this.buttonSafe;

    l.data('btnSafe.parameters', btnSafe.parametersSafe());
    l.data('button.btnCommand().params', btnSafe.btnCommand().params);
    l.data('this.context', this.context);
    // initialize params
    const dialog = btnSafe.dialogSafe();
    // This corrects how the variable to name the dialog changed in the history of 2sxc from action to dialog
    const { items: _, ...otherParams } = btnSafe.parametersSafe();
    const urlParams = {
      dialog: dialog || btnSafe.btnCommand().name,
      ...otherParams
    } satisfies ItemUrlParameters;
    l.data('urlParams', urlParams);
    return urlParams;
  }

  /**
   * build the link, combining specific params with global ones and put all in the url
   */
  getLink() {
    const context = this.context;
    const button = this.buttonSafe; // new ButtonSafe(context.button, context);
    const params = button.btnCommand().params;

    debugger;

    // initialize params
    const urlItems = context.button.tweakGeneratedUrlParameters
      ? context.button.tweakGeneratedUrlParameters(context, this.#getUrlParams())
      : this.#getUrlParams();

    // Only add items if button doesn't forbid it - new v18.03
    if (!button.skipAutoAddItemsSafe()) {
      const commandLinkItems = new CommandLinkItems(button, context, this.log);
      urlItems.items = commandLinkItems.getItemsForUrl(params);
    }

    // drop root prefill property as it was transferred to items
    delete urlItems.prefill;

    // clone the params and adjust parts based on partOfPage settings...
    const partOfPage = button.partOfPageSafe();
    const ngDialogParams = new DialogCoreParams(context, partOfPage);

    // initialize root url to dialog
    const rootUrl = this.#getDialogUrl(context);

    // preserve debug param if present
    const debugUrlParam = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';
    // clean/replace escaped "/" in url parameters
    const dialogParams = NoJQ.param(ngDialogParams).replace(/%2F/g, '/');
    return`${rootUrl}#${dialogParams}&${NoJQ.param(urlItems)}${debugUrlParam}`;
  }

  /**
   * Determine the url to open a dialog, based on the settings which UI version to use
   */
  #getDialogUrl(context: ContextComplete): string {
    const env = context.sxc?.env ?? window.$2sxc.env;
    let customParams = env.dialogQuery();
    if (customParams && !customParams.startsWith('&'))
      customParams = '&' + customParams;
    const baseUrl = flattenSlashes(`${env.uiRoot()}${C.DialogPaths.eavUi}`);
    return `${baseUrl}?pageId=${env.page()}&wpk=${this.#withPublicKey(env)}&sxcver=${context.instance.sxcVersion}${customParams}`;
  }

  #withPublicKey(env: SxcGlobalEnvironment): boolean {
    return env.publicKey() !== null;
  }


}


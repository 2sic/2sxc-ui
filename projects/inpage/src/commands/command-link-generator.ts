import { CmdParHlp } from '.';
import { SxcGlobalEnvironment } from '../../../$2sxc/src';
import { CommandParams } from '../../../$2sxc/src/cms/command-params';
import { AnyIdentifier, ItemIdentifierInList, ItemIdentifierSimple, ItemUrlParameters } from '../../../$2sxc/src/cms/item-identifiers';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Log } from '../core';
import { DialogCoreParams } from '../manage/dialog-core-params';
import { NoJQ, flattenSlashes } from '../plumbing';
import { ButtonSafe } from '../toolbar/config';

/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 * @internal
 */
export class CommandLinkGenerator extends HasLog {
  private items: AnyIdentifier[];

  constructor(private buttonSafe: ButtonSafe, public readonly context: ContextComplete, parentLog: Log) {
    super('Cmd.LnkGen', parentLog);
    
    // WIP
    this.log.liveDump = true;

    const l = this.log.call('constructor');
    const command = buttonSafe.btnCommand();

    // Initialize Items - use predefined or create empty array
    var items: AnyIdentifier[] = command.params.items || [];
    l.data('items', items);

    items = this.#buildItemsList(items, buttonSafe);

    // if the command has own configuration stuff, do that now
    if (context.button.customItems)
      items = context.button.customItems(context, items);

    this.items = items;
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
   * Generate items for editing/changing or simple item depending on the scenario.
   */
  #buildItemsList(items: AnyIdentifier[], button: ButtonSafe): AnyIdentifier[] {
    const params = button.btnCommand().params;
    if (params.useModuleList)
      items = this.#addContentGroupItems(items, true);
    else if (params.parent)
      items = this.#addItemInList(items);
    else
      items = this.#addItem(items);
    return items;
  }

  /**
   * build the link, combining specific params with global ones and put all in the url
   */
  getLink() {
    const context = this.context;
    const button = new ButtonSafe(context.button, context);
    const params = button.btnCommand().params;

    debugger;

    // initialize params
    const urlItems = context.button.tweakGeneratedUrlParameters
      ? context.button.tweakGeneratedUrlParameters(context, this.#getUrlParams())
      : this.#getUrlParams();

    var items = this.items;

    // steps for all actions: prefill, serialize, open-dialog
    // when doing new, there may be a prefill in the link to initialize the new item
    if (params.prefill)
      items = items.map(itm => this.#addFieldsAndParameters(itm as ItemIdentifierSimple, params));

    // drop root prefill property as it was transferred to items
    delete urlItems.prefill;

    // Only add items if button doesn't forbid it - new v18.03
    if (!button.skipAutoAddItemsSafe())
      urlItems.items = JSON.stringify(items); // Serialize/json-ify the complex items-list

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

  #addItem(items: AnyIdentifier[]) {
    const item = {} as ItemIdentifierSimple;
    const params = this.context.button.command.params;

    // two ways to name the content-type-name this, v 7.2+ and older
    const ct = params.contentType || (params as CommandParams & { attributeSetName: string }).attributeSetName;
    if (params.entityId)
      item.EntityId = params.entityId;
    if (ct)
      item.ContentTypeName = ct;

    // only add if there was stuff to add
    return (item.EntityId || item.ContentTypeName) 
      ? [...items, this.#addFieldsAndParameters(item, params)]
      : items;
  }

  #addFieldsAndParameters<T extends AnyIdentifier>(item: T, params: CommandParams): T {
    if (params == null)
      return item;
    const itemIdentifier = item as ItemIdentifierSimple;
    return { ...itemIdentifier,
      ...(params.prefill ? { Prefill: params.prefill } : {}),
      ...(params.uifields ? { UiFields: params.uifields } : {}),
      ...(params.form ? { Parameters: params.form } : {}),
    } as T;
    // if (params.prefill)
    //   itemIdentifier.Prefill = params.prefill;
    // if (params.uifields)
    //   itemIdentifier.UiFields = params.uifields;
    // if (params.form)
    //   itemIdentifier.Parameters = params.form;
    // return item;
  }

  /**
   * this will tell the command to edit a item from the sorted list in the group,
   * optionally together with the presentation item
   */
  #addContentGroupItems(items: AnyIdentifier[], withPresentation: boolean) {
    const cl = this.log.call('addContentGroupItems', `${withPresentation}`);
    // const params = this.context.button.command.params;
    const i = CmdParHlp.getIndex(this.context);
    const isContentAndNotHeader = (i !== -1);
    const index = isContentAndNotHeader ? i : 0;
    const isAdd = this.context.button.command.name === 'new';
    const groupId = this.context.contentBlock.contentGroupId;
    const params = this.context.button.command.params;

    const fields: string[] = [this.#findPartName(true)];
    if (withPresentation)
      fields.push(this.#findPartName(false));
    const newItems = fields.map((f) => this.#addContentGroupItem(groupId, index, f, isAdd, params));
    return cl.return([...items, ...newItems]);
  }



  /**
   * this adds an item of the content-group, based on the group GUID and the sequence number
   */
  #addContentGroupItem(guid: string, index: number, part: string, isAdd: boolean, params: CommandParams): AnyIdentifier {
    const cl = this.log.call('addContentGroupItem', `${guid}, ${index}, ${part}, ${isAdd}`);
    const item = {
      Add: isAdd,
      Index: index,
      Parent: guid,
      Field: part.toLocaleLowerCase(),
    };
    const newItem = this.#addFieldsAndParameters(item, params);
    return cl.return(newItem);
  }


  /**
   * If a parent is specified, use that
   * this will tell the command to edit a item which also belongs to a list
   * this is relevant when adding new items
   */
  #addItemInList(items: AnyIdentifier[]) {
    const params = this.context.button.command.params;
    const index = CmdParHlp.getIndex(params);
    const isAdd = this.context.button.command.name === 'new';
    const groupId = params.parent;

    // New in 10.27 - if params has a field, use that
    if (!params.fields)
      return items;
    // if (params.fields)
    const moreItems = params.fields.split(',').map((f) => { 
      const item = {
        EntityId: isAdd ? 0 : params.entityId,
        Field: f,
        Parent: groupId,
        Add: isAdd,
        Index: index,
      } as ItemIdentifierInList;
      
      return this.#addFieldsAndParameters(item, params);
    });
    return [...items, ...moreItems];
  }

  /**
   * find the part name for both the API to give the right item (when using groups) and for i18n
   */
  #findPartName(content: boolean): string {
    const isContentAndNotHeader = (CmdParHlp.getIndex(this.context) !== -1);
    return (isContentAndNotHeader ? '' : 'List') + (content ? 'Content' : 'Presentation');
  }
}


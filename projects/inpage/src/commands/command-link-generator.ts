import { CmdParHlp } from '.';
import { CommandParams, ItemIdentifierCopy, ItemIdentifierInList, ItemIdentifierSimple, TemplateIdentifier } from '../../../$2sxc/src/cms';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Log } from '../core';
import { NgUrlValuesWithoutParams } from '../manage/ng-dialog-params';
import { NoJQ, TypeUnsafe, TypeValue, urlClean } from '../plumbing';
import { ButtonSafe } from '../toolbar/config';

// 2022-06-16 2dm experimental
const urlMode2 = false;

type AnyIdentifier = (
  | ItemIdentifierSimple
  | ItemIdentifierCopy
  | ItemIdentifierInList
  | TemplateIdentifier
);

/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 * @internal
 */
export class CommandLinkGenerator extends HasLog {
  public items: AnyIdentifier[];
  public readonly urlParams: UrlItemParams;
  private readonly debugUrlParam: string;

  constructor(public readonly context: ContextComplete, parentLog: Log) {
    super('Cmd.LnkGen', parentLog);
    const cl = this.log.call('constructor');
    const button = new ButtonSafe(context.button, context);
    const command = button.action();
    // Initialize Items - use predefined or create empty array
    this.items = command.params.items || [];
    cl.data('items', this.items);

    // initialize params
    this.urlParams = button.addParamsToLink() as unknown;
    const dialog = button.dialog();
    // note: this corrects how the variable to name the dialog changed in the history of 2sxc from action to dialog
    this.urlParams = { ...{ dialog: dialog || command.name }, ...this.urlParams };
    cl.data('urlParams', this.urlParams);

    // get isDebug url Parameter
    this.debugUrlParam = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';

    this.buildItemsList(button);

    // if the command has own configuration stuff, do that now
    if (context.button.configureLinkGenerator)
      context.button.configureLinkGenerator(context, this);
    cl.done();
  }


  /**
   * Generate items for editing/changing or simple item depending on the scenario.
   */
  private buildItemsList(button: ButtonSafe) {
    if (button.action().params.useModuleList)
      this.addContentGroupItems(true);
    else if (button.action().params.parent)
      this.addItemInList();
    else
      this.addItem();
  }

  /**
   * build the link, combining specific params with global ones and put all in the url
   */
  getLink() {
    const context = this.context;
    const button = new ButtonSafe(context.button, context);
    const params = button.action().params;
    const urlItems = this.urlParams as unknown as UrlItemParams;

    // steps for all actions: prefill, serialize, open-dialog
    // when doing new, there may be a prefill in the link to initialize the new item
    if (params.prefill)
      for (let i = 0; i < this.items.length; i++)
        (this.items[i] as ItemIdentifierSimple).Prefill = params.prefill;

    delete urlItems.prefill; // added 2020-03-11, seemed strange that it's not removed
    urlItems.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list

    // clone the params and adjust parts based on partOfPage settings...
    const partOfPage = button.partOfPage();
    const ngDialogParams = new NgUrlValuesWithoutParams(context, partOfPage);

    // initialize root url to dialog
    const rootUrl = this.getDialogUrl(context);

    let items2 = '';
    if (urlMode2 && this.items) {
      try {
        items2 = '&' + window.$2sxc.urlParams.toUrl({ i2: this.items } );
        // console.log('items2', items2);
      } catch (e) { /* ignore */ }
    }

    return `${rootUrl}#${NoJQ.param(ngDialogParams).replace(/%2F/g, '/')}&${NoJQ.param(urlItems)}${this.debugUrlParam}`
      + items2;
  }

  /**
   * Determine the url to open a dialog, based on the settings which UI version to use
   */
  private getDialogUrl(context: ContextComplete): string {
    const env = window.$2sxc.env;
    let customParams = env.dialogQuery();
    if (customParams && !customParams.startsWith('&')) customParams = '&' + customParams;
    return urlClean(`${env.uiRoot()}${C.DialogPaths.eavUi}`) + `?pageId=${env.page()}&sxcver=${context.instance.sxcVersion}${customParams}`;
  }

  private addItem() {
    const item = {} as ItemIdentifierSimple;
    const params = this.context.button.command.params;

    // two ways to name the content-type-name this, v 7.2+ and older
    const ct = params.contentType || (params as TypeUnsafe).attributeSetName;
    if (params.entityId) item.EntityId = params.entityId;
    if (ct) item.ContentTypeName = ct;

    // only add if there was stuff to add
    if (item.EntityId || item.ContentTypeName) {
      this.items.push(this.addFieldsAndParameters(item, params));
    }
  }

  private addFieldsAndParameters<T extends AnyIdentifier>(item: T, params: CommandParams): T {
    if (params?.fields)
      (item as ItemIdentifierSimple).Fields = params.fields;
    return item;
  }

  /**
   * this will tell the command to edit a item from the sorted list in the group,
   * optionally together with the presentation item
   */
  private addContentGroupItems(withPresentation: boolean) {
    const cl = this.log.call('addContentGroupItems', `${withPresentation}`);
    // const params = this.context.button.command.params;
    const i = CmdParHlp.getIndex(this.context);
    const isContentAndNotHeader = (i !== -1);
    const index = isContentAndNotHeader ? i : 0;
    const isAdd = this.context.button.command.name === 'new';
    const groupId = this.context.contentBlock.contentGroupId;
    const params = this.context.button.command.params;

    const fields: string[] = [this.findPartName(true)];
    if (withPresentation) fields.push(this.findPartName(false));
    fields.map((f) => this.addContentGroupItem(groupId, index, f, isAdd, params));
    cl.done();
  }



  /**
   * this adds an item of the content-group, based on the group GUID and the sequence number
   */
  private addContentGroupItem(guid: string, index: number, part: string, isAdd: boolean, params: CommandParams) {
    const cl = this.log.call('addContentGroupItem', `${guid}, ${index}, ${part}, ${isAdd}`);
    const item = {
      Add: isAdd,
      Index: index,
      Parent: guid,
      Field: part.toLocaleLowerCase(),
    };
    this.items.push(this.addFieldsAndParameters(item, params));
    cl.done();
  }


  /**
   * If a parent is specified, use that
   * this will tell the command to edit a item which also belongs to a list
   * this is relevant when adding new items
   */
  private addItemInList() {
    const params = this.context.button.command.params;
    const index = CmdParHlp.getIndex(params);
    const isAdd = this.context.button.command.name === 'new';
    const groupId = params.parent;

    // New in 10.27 - if params has a field, use that
    if (params.fields)
      params.fields.split(',').map((f) => { 
        const item = {
          EntityId: isAdd ? 0 : params.entityId,
          Field: f,
          Parent: groupId,
          Add: isAdd,
          Index: index,
        } as ItemIdentifierInList;
        this.items.push(this.addFieldsAndParameters(item, params));
    });
  }

  /**
   * find the part name for both the API to give the right item (when using groups) and for i18n
   */
  private findPartName(content: boolean): string {
    const isContentAndNotHeader = (CmdParHlp.getIndex(this.context) !== -1);
    return (isContentAndNotHeader ? '' : 'List') + (content ? 'Content' : 'Presentation');
  }
}

interface UrlItemParams {
    prefill?: Record<string, TypeValue>;
    items?: string;
    contentTypeName?: string;
    filters?: string;
}

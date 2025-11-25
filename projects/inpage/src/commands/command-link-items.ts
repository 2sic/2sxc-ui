import { CmdParHlp } from '.';
import { CommandParams } from '../../../$2sxc/src/cms/command-params';
import { AnyIdentifier, ItemIdentifierCopy, ItemIdentifierInList, ItemIdentifierSimple, ItemUrlParameters } from '../../../$2sxc/src/cms/item-identifiers';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Log } from '../core';
import { ButtonWithContext } from '../toolbar/config';

/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 * @internal
 */
export class CommandLinkItems extends HasLog {

  constructor(private buttonAndCtx: ButtonWithContext, private readonly context: ContextComplete, parentLog: Log) {
    super('Cmd.LnkGenItems', parentLog);
    
    // WIP
    this.log.liveDump = true;

    const l = this.log.call('constructor');
    l.done();
  }

  getItemsForUrl(params: CommandParams): string {
    const l = this.log.call('getItemsForUrl');
    var items: AnyIdentifier[] = params.items || [];
    l.data('items', items);
    l.data('params', params);

    items = this.#buildItemsList(items, this.buttonAndCtx);

    // if the command has own configuration stuff, do that now
    const btnDef = this.context.button.definition;
    if (btnDef.customItems)
      items = btnDef.customItems(this.context, items);

    // steps for all actions: prefill, serialize, open-dialog
    // when doing new, there may be a prefill in the link to initialize the new item
    if (params.prefill)
      items = items.map(itm => this.#addFieldsAndParameters(itm as ItemIdentifierSimple, params));

    const str = JSON.stringify(items); // Serialize/json-ify the complex items-list
    return l.return(str, 'done');
  }


  /**
   * Generate items for editing/changing or simple item depending on the scenario.
   */
  #buildItemsList(items: AnyIdentifier[], button: ButtonWithContext): AnyIdentifier[] {
    const params = button.btnCommand().params;
    if (params.useModuleList)
      items = this.#addContentGroupItems(items, true);
    else if (params.parent)
      items = this.#addItemInList(items);
    else
      items = this.#addItem(items);
    return items;
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
    console.log('2dm - addFieldsAndParameters', { item, params });
    const itemIdentifier = item as ItemIdentifierSimple;
    const result = { ...itemIdentifier,
      ...(params.prefill ? { Prefill: params.prefill } : {}),
      ...(params.uifields ? { UiFields: params.uifields } : {}),
      ...(params.form ? { Parameters: params.form } : {}),
      ...(params.copyId ? ({ DuplicateEntity: params.copyId } ) : {}),
    } satisfies Partial<ItemIdentifierCopy>;
    return result as T;
  }

  /**
   * this will tell the command to edit a item from the sorted list in the group,
   * optionally together with the presentation item
   */
  #addContentGroupItems(items: AnyIdentifier[], withPresentation: boolean): AnyIdentifier[] {
    const cl = this.log.call('addContentGroupItems', `${withPresentation}`);
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


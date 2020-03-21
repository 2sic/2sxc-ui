﻿import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { ItemIdentifierGroup, ItemIdentifierSimple, ItemInField } from '../interfaces/item-identifiers';
import { NgUrlValuesWithoutParams } from '../manage/ng-dialog-params';
import { DictionaryValue, TypeUnsafe } from '../plumbing';
import { DialogPaths } from '../settings/DialogPaths';
import { ButtonPropertyGenerator } from '../toolbar/config';
import { translate } from '../translate/2sxc.translate';
import { isatty } from 'tty';

/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 */
export class CommandLinkGenerator {
  public items: Array<ItemIdentifierSimple | ItemIdentifierGroup>;
  public readonly urlParams: UrlItemParams;
  private readonly rootUrl: string;
  private readonly debugUrlParam: string;

  constructor(public readonly context: ContextBundleButton) {
    // Initialize Items
    this.items = context.button.action.params.items || []; // use predefined or create empty array

    // initialize params
    // todo: stv, clean this
    this.urlParams = this.evalPropOrFunction(context.button.params, context, {} as unknown);
    const dialog = this.evalPropOrFunction(context.button.dialog, context, '');
    // note: this corrects how the variable to name the dialog changed in the history of 2sxc from action to dialog
    this.urlParams = {...{ dialog: dialog || context.button.action.name }, ...this.urlParams};
    // this.params = O.bject.assign({ dialog: dialog || context.button.action.name }, params);

    // initialize root url to dialog
    this.rootUrl = this.getDialogUrl();

    // get isDebug url Parameter
    this.debugUrlParam = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';

      // activate items for list or simple item depending on the scenario
    if (context.button.action.params.useModuleList)
      this.addContentGroupItems(true);
    if (context.button.action.params.parent)
      this.addItemInList();
    else
      this.addItem();

    // if the command has own configuration stuff, do that now
    if (context.button.configureCommand)
      context.button.configureCommand(context, this);
  }


  /**
   * build the link, combining specific params with global ones and put all in the url
   */
  getLink() {
    const context = this.context;
    const params = context.button.action.params;
    const urlItems = this.urlParams as unknown as UrlItemParams;

    // steps for all actions: prefill, serialize, open-dialog
    // when doing new, there may be a prefill in the link to initialize the new item
    if (params.prefill)
      for (let i = 0; i < this.items.length; i++)
        this.items[i].Prefill = params.prefill;

    delete urlItems.prefill; // added 2020-03-11, seemed strange that it's not removed
    urlItems.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list

    // clone the params and adjust parts based on partOfPage settings...
    const partOfPage = context.button.partOfPage(context);
    const ngDialogParams = new NgUrlValuesWithoutParams(context, partOfPage); // 2dm simplified buildNgDialogParams

    return `${this.rootUrl}#${$.param(ngDialogParams)}&${$.param(urlItems)}${this.debugUrlParam}`;
  }

  /**
   * Determine the url to open a dialog, based on the settings which UI version to use
   */
  private getDialogUrl(): string {
    const context = this.context;
    return `${context.instance.sxcRootUrl}desktopmodules/tosic_sexycontent/${(context.ui.form === 'ng8'
        && context.button.dialog(context) === 'edit')
    ? DialogPaths.ng8
    : DialogPaths.ng1}?sxcver=${context.instance.sxcVersion}`;
  }


  private evalPropOrFunction<T>(propOrFunction: ButtonPropertyGenerator<T>, context: ContextBundleButton, fallback: T): T {
    return (propOrFunction === undefined || propOrFunction === null)
        ? fallback
        : (typeof (propOrFunction) === 'function' ? propOrFunction(context) : propOrFunction);
  }

  private addItem() {
    const item = {} as ItemIdentifierSimple;
    const params = this.context.button.action.params;

    // two ways to name the content-type-name this, v 7.2+ and older
    const ct = params.contentType || (params as TypeUnsafe).attributeSetName;
    if (params.entityId) item.EntityId = params.entityId;
    if (ct) item.ContentTypeName = ct;

    // only add if there was stuff to add
    if (item.EntityId || item.ContentTypeName) {
      console.warn('used the simple item header - test if dialog still works!');
      // this.items.push(item);
      this.items.push({ ...item, Title: translate(this.findTranslationKey(this.findPartName(true))) });
    }
  }


  /**
   * this will tell the command to edit a item from the sorted list in the group,
   * optionally together with the presentation item
   */
  private addContentGroupItems(withPresentation: boolean) {
    const params = this.context.button.action.params;
    const isContentAndNotHeader = (params.sortOrder !== -1);
    const index = isContentAndNotHeader ? params.sortOrder : 0;
    const isAdd = this.context.button.action.name === 'new';
    const groupId = this.context.contentBlock.contentGroupId;

    const fields: string[] = [this.findPartName(true)];
    if (withPresentation) fields.push(this.findPartName(false));
    fields.map((f) => this.addContentGroupItem(groupId, index, f, isAdd));
    // previous code before 10.27
    // this.addContentGroupItem(groupId, index, this.findPartName(true), isAdd);

    // if (withPresentation)
    //   this.addContentGroupItem(groupId, index, this.findPartName(false), isAdd);
  }



  /**
   * this adds an item of the content-group, based on the group GUID and the sequence number
   */
  private addContentGroupItem(guid: string, index: number, part: string, isAdd: boolean) {
    this.items.push({
      Group: {
        Guid: guid,
        Index: index,
        Part: part.toLocaleLowerCase(),
        Add: isAdd,
      },
      Title: translate(this.findTranslationKey(part)),
    });
  }


    /**
     * EXPERIMENTAL in 10.27, if a parent is specified, use that
     * this will tell the command to edit a item which also belongs to a list
     * this is relevant when adding new items
     */
    private addItemInList() {
        const params = this.context.button.action.params;
        const index = params.sortOrder;
        const isAdd = this.context.button.action.name === 'new';
        const groupId = params.parent;


        // New in 10.27 - if params has a field, use that
        if (params.fields)
            params.fields.split(',').map((f) => this.items.push({
                    EntityId: params.entityId,
                    Field: f,
                    Parent: groupId,
                    Add: isAdd,
                    Index: index,
                    } as ItemInField));
    }

  /**
   * find the part name for both the API to give the right item (when using groups) and for i18n
   */
  private findPartName(content: boolean): string {
    const isContentAndNotHeader = (this.context.button.action.params.sortOrder !== -1);
    return (isContentAndNotHeader ? '' : 'List') + (content ? 'Content' : 'Presentation');
  }

  /**
   * find the correct i18n key for this part
   */
  private findTranslationKey(partName: string): string {
    return `EditFormTitle.${partName}`;
  }

}

interface UrlItemParams {
    prefill?: DictionaryValue;
    items?: string;
    contentTypeName?: string;
    filters?: string;
}

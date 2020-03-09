import { ContextOfButton } from '../context/context-of-button';
import { ItemIdentifierGroup, ItemIdentifierSimple } from '../interfaces/item-identifiers';
import { NgDialogParams } from '../manage/ng-dialog-params';
import { translate } from '../translate/2sxc.translate';
import { Params } from './params';


export class Command {
  items: Array<ItemIdentifierSimple | ItemIdentifierGroup>;
  params: Params;

  constructor(public context: ContextOfButton, public ngDialogUrl: string, public isDebug: string) {
    // this.settings = settings;
    this.items = context.button.action.params.items || []; // use predefined or create empty array
    // todo: stv, clean this
    const params = this.evalPropOrFunction(context.button.params, context, {});
    const dialog = this.evalPropOrFunction(context.button.dialog, context, {});
    this.params = Object.assign({
      dialog: dialog || context.button.action.name, // the variable used to name the dialog changed in the history of 2sxc from action to dialog
    }, params) as Params;

  }

  private evalPropOrFunction = (propOrFunction: any, context: ContextOfButton, fallback: any) => {
    if (propOrFunction === undefined || propOrFunction === null) {
      return fallback;
    }
    return (typeof (propOrFunction) === 'function' ? propOrFunction(context) : propOrFunction);
  }

  addSimpleItem = () => {
    const item = {} as ItemIdentifierSimple;
    const params = this.context.button.action.params;
    const ct = params.contentType || params.attributeSetName; // two ways to name the content-type-name this, v 7.2+ and older
    if (params.entityId)
      item.EntityId = params.entityId;

    if (ct)
      item.ContentTypeName = ct;

    // only add if there was stuff to add
    if (item.EntityId || item.ContentTypeName) {
      console.warn('used the simple item header - test if dialog still works!');
      // this.items.push(item);
      this.items.push({ ...item, Title: translate(this.findTranslationKey(this.findPartName(true))) });
    }
  }

  // this adds an item of the content-group, based on the group GUID and the sequence number
  addContentGroupItem(
    guid: string,
    index: number,
    part: string,
    isAdd: boolean,
    // isEntity: boolean,
    // cbid: number,
    // sectionLanguageKey: string
    ) {
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

  // this will tell the command to edit a item from the sorted list in the group, optionally together with the presentation item
  addContentGroupItemSetsToEditList = (withPresentation: boolean) => {
    const isContentAndNotHeader = (this.context.button.action.params.sortOrder !== -1);
    const index = isContentAndNotHeader ? this.context.button.action.params.sortOrder : 0;
    const cTerm = this.findPartName(true);
    const pTerm = this.findPartName(false);
    const isAdd = this.context.button.action.name === 'new';
    const groupId = this.context.contentBlock.contentGroupId;

    this.addContentGroupItem(groupId, index, cTerm, isAdd);

    if (withPresentation)
      this.addContentGroupItem(groupId, index, pTerm, isAdd);
  }

  /** find the part name for both the API to give the right item (when using groups) and for i18n */
  findPartName(content: boolean): string {
    const isContentAndNotHeader = (this.context.button.action.params.sortOrder !== -1);
    return (isContentAndNotHeader ? '' : 'List') + (content ? 'Content' : 'Presentation');
  }

  /** find the correct i18n key for this part */
  findTranslationKey(partName: string): string {
    return `EditFormTitle.${partName}`;
  }

  // build the link, combining specific params with global ones and put all in the url
  generateLink = (context: ContextOfButton) => {
    // if there is no items-array, create an empty one (it's required later on)
    if (!context.button.action.params.items) {
      context.button.action.params.items = [];
    }
    //#region steps for all actions: prefill, serialize, open-dialog
    // when doing new, there may be a prefill in the link to initialize the new item
    if (context.button.action.params.prefill) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].Prefill = context.button.action.params.prefill;
      }
    }
    this.params.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list

    // clone the params and adjust parts based on partOfPage settings...
    const ngDialogParams = NgDialogParams.fromContext(context); // 2dm simplified buildNgDialogParams(context);
    const sharedParams = Object.assign({}, ngDialogParams) as NgDialogParams;
    const partOfPage = context.button.partOfPage(context);
    if (!partOfPage) {
      delete sharedParams.versioningRequirements;
      delete sharedParams.publishing;
      sharedParams.partOfPage = false;
    }

    return this.ngDialogUrl +
      '#' +
      $.param(sharedParams) +
      '&' +
      $.param(this.params) +
      this.isDebug;
    //#endregion
  }
}

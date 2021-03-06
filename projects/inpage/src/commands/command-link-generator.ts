﻿import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { translate } from '../i18n';
import { ItemIdentifierGroup, ItemIdentifierSimple, ItemInField } from '../interfaces/item-identifiers';
import { $2sxcInPage } from '../interfaces/sxc-controller-in-page';
import { HasLog, Log } from '../logging';
import { NgUrlValuesWithoutParams } from '../manage/ng-dialog-params';
import { DictionaryValue, TypeUnsafe, urlClean } from '../plumbing';
import { ButtonSafe } from '../toolbar/config';

/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 */
export class CommandLinkGenerator extends HasLog {
    public items: Array<ItemIdentifierSimple | ItemIdentifierGroup>;
    public readonly urlParams: UrlItemParams;
    private readonly rootUrl: string;
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
        this.urlParams = {...{ dialog: dialog || command.name }, ...this.urlParams};
        cl.data('urlParmas', this.urlParams);

        // initialize root url to dialog
        this.rootUrl = this.getDialogUrl(dialog);

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
                this.items[i].Prefill = params.prefill;

        delete urlItems.prefill; // added 2020-03-11, seemed strange that it's not removed
        urlItems.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list

        // clone the params and adjust parts based on partOfPage settings...
        const partOfPage = button.partOfPage();
        const ngDialogParams = new NgUrlValuesWithoutParams(context, partOfPage);

        return `${this.rootUrl}#${$.param(ngDialogParams).replace(/%2F/g, '/')}&${$.param(urlItems)}${this.debugUrlParam}`;
    }

    /**
     * Determine the url to open a dialog, based on the settings which UI version to use
     */
    private getDialogUrl(dialogName: string): string {
        const context = this.context;
        // const path = (context.ui.form === 'ng8') // v11 applies to all forms, not just edit: //  && dialogName === 'edit')
        //     ? C.DialogPaths.ng8
        //     : C.DialogPaths.ng1;
        return urlClean(`${$2sxcInPage.env.uiRoot()}${C.DialogPaths.ng8}`) + `?sxcver=${context.instance.sxcVersion}`;
        // old till 11.11.02 return urlClean(`${context.instance.sxcRootUrl}${$2sxcInPage.env.uiRoot()}${C.DialogPaths.ng8}`) + `?sxcver=${context.instance.sxcVersion}`;
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
        const cl = this.log.call('addContentGroupItems', `${withPresentation}`);
        const params = this.context.button.command.params;
        const isContentAndNotHeader = (params.sortOrder !== -1);
        const index = isContentAndNotHeader ? params.sortOrder : 0;
        const isAdd = this.context.button.command.name === 'new';
        const groupId = this.context.contentBlock.contentGroupId;

        const fields: string[] = [this.findPartName(true)];
        if (withPresentation) fields.push(this.findPartName(false));
        fields.map((f) => this.addContentGroupItem(groupId, index, f, isAdd));
        cl.done();
    }



    /**
     * this adds an item of the content-group, based on the group GUID and the sequence number
     */
    private addContentGroupItem(guid: string, index: number, part: string, isAdd: boolean) {
        const cl = this.log.call('addContentGroupItem', `${guid}, ${index}, ${part}, ${isAdd}`);
        this.items.push({
            Group: {
                Guid: guid,
                Index: index,
                Part: part.toLocaleLowerCase(),
                Add: isAdd,
            },
            Title: translate(this.findTranslationKey(part)),
        });
        cl.done();
    }


    /**
     * EXPERIMENTAL in 10.27, if a parent is specified, use that
     * this will tell the command to edit a item which also belongs to a list
     * this is relevant when adding new items
     */
    private addItemInList() {
        const params = this.context.button.command.params;
        const index = params.sortOrder;
        const isAdd = this.context.button.command.name === 'new';
        const groupId = params.parent;


        // New in 10.27 - if params has a field, use that
        if (params.fields)
            params.fields.split(',').map((f) => this.items.push({
                    EntityId: isAdd ? 0 : params.entityId,
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
        const isContentAndNotHeader = (this.context.button.command.params.sortOrder !== -1);
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

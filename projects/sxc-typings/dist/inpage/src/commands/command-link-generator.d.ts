import { ItemIdentifierCopy, ItemIdentifierGroup, ItemIdentifierSimple, TemplateIdentifier } from '../../../$2sxc/src/cms';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Log } from '../core';
import { TypeValue } from '../plumbing';
/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 * @internal
 */
export declare class CommandLinkGenerator extends HasLog {
    readonly context: ContextComplete;
    items: Array<ItemIdentifierSimple | ItemIdentifierCopy | ItemIdentifierGroup | TemplateIdentifier>;
    readonly urlParams: UrlItemParams;
    private readonly debugUrlParam;
    constructor(context: ContextComplete, parentLog: Log);
    /**
     * Generate items for editing/changing or simple item depending on the scenario.
     */
    private buildItemsList;
    /**
     * build the link, combining specific params with global ones and put all in the url
     */
    getLink(): string;
    /**
     * Determine the url to open a dialog, based on the settings which UI version to use
     */
    private getDialogUrl;
    private addItem;
    /**
     * this will tell the command to edit a item from the sorted list in the group,
     * optionally together with the presentation item
     */
    private addContentGroupItems;
    /**
     * this adds an item of the content-group, based on the group GUID and the sequence number
     */
    private addContentGroupItem;
    /**
     * EXPERIMENTAL in 10.27, if a parent is specified, use that
     * this will tell the command to edit a item which also belongs to a list
     * this is relevant when adding new items
     */
    private addItemInList;
    /**
     * find the part name for both the API to give the right item (when using groups) and for i18n
     */
    private findPartName;
}
interface UrlItemParams {
    prefill?: Record<string, TypeValue>;
    items?: string;
    contentTypeName?: string;
    filters?: string;
}
export {};

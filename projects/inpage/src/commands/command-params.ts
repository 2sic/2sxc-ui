import { MetadataFor } from '.';
import { ItemIdentifierGroup, ItemIdentifierSimple } from '../interfaces/item-identifiers';
import { DictionaryValue } from '../plumbing';

/**
 * Command parameters are handed over to a command for execution
 * @internal
 */
export interface CommandParams {
    /** The action is used in scenarios where the command name must be included */
    action?: string;
    items?: Array<ItemIdentifierSimple | ItemIdentifierGroup>;
    mode?: string;

    // both contentType and contentTypeName were used historically, so both variations may exist in Razor templaets
    contentType?: string;
    contentTypeName?: string;

    pipelineId?: number;
    filters?: string;
    dialog?: string;
    sortOrder?: number;
    entityId?: number;

    /** The guid - for people creating custom toolbars before 10.27 or automatically added since 10.27 */
    entityGuid?: string;

    /** The manually added title from before 10.27 - automatically enabled the delete-button */
    entityTitle?: string;

    title?: string;

    useModuleList?: boolean;
    metadata?: MetadataFor;

    isPublished?: boolean;
    prefill?: DictionaryValue;

    /** Custom Code in the previous V9 standard */
    customCode?: string;

    /** Custom Code function name only in the new V10.27 standard */
    call?: string;


    /** New in 10.27 - list of apps for the quick dialog */
    apps?: string;

    /** Experimental in 10.27 */
    parent?: string;
    /** Experimental in 10.27 */
    fields?: string;

    /** for template edit dialog */
    isshared?: boolean;
}

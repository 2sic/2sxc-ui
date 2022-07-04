import { CommandNames, ItemIdentifierGroup, ItemIdentifierSimple, CommandParamsMetadata } from '.';
import { TypeValue } from '../../../inpage/src/plumbing';

/**
 * Command parameters are handed over to a command for execution
 * @public
 */
export interface CommandParams {
    /** 
     * The action is used in scenarios where the command name must be included
     * @internal - wait with publishing this, it shouldn't actually be here. we may need to create another type which includes it
     */
    action?: CommandNames;

    /** @internal */
    items?: Array<ItemIdentifierSimple | ItemIdentifierGroup>;
    /** @internal */
    mode?: string;

    // both contentType and contentTypeName were used historically, so both variations may exist in Razor templaets
    /** @internal */
    contentType?: string;
    /** @internal */
    contentTypeName?: string;

    /** @internal */
    pipelineId?: number;
    /** @internal */
    filters?: string;
    /** @internal */
    dialog?: string;

    /** 
     * @internal 
     * @deprecated but probably still in use
     */
    sortOrder?: number;

    /** 
     * Position in a list (content-block or field of another entity)
     * index was added in v14.04 to replace the `sortOrder` which had a confusing name. 
     * @internal
     */
    index?: number;

    /** @internal */
    entityId?: number;

    /**
     * The guid - for people creating custom toolbars before 10.27 or automatically added since 10.27 
     * @internal
     */
    entityGuid?: string;

    /**
     * The manually added title from before 10.27 - automatically enabled the delete-button
     * @internal
     */
    entityTitle?: string;

    /** @internal */
    title?: string;

    /** @internal */
    useModuleList?: boolean;
    /** @internal */
    metadata?: CommandParamsMetadata;

    /** @internal */
    isPublished?: boolean;
    /** @internal */
    prefill?: Record<string, TypeValue>;

    /**
     * Custom Code in the previous V9 standard
     * @internal
     */
    customCode?: string;

    /**
     * Custom Code function name only in the new V10.27 standard
     * @internal
     */
    call?: string;


    /**
     * New in 10.27 - list of apps for the quick dialog
     * @internal
     */
    apps?: string;

    /**
     * Experimental in 10.27
     * @internal
     */
    parent?: string;
    /**
     * Experimental in 10.27
     * @internal
     */
    fields?: string;

    /**
     * for template edit dialog 
     * @internal
     */
    isshared?: boolean;
}

import { TypeValue } from '../../../core/plumbing/type-value';
import { CommandNames } from './command-names';
import { CommandParamsMetadata } from './command-params-metadata';
import { ItemIdentifierInList, ItemIdentifierSimple } from './item-identifiers';

/**
 * Command parameters are handed over to a command for execution.
 * It contains all possible combinations of parameters that can be used in a command. 
 * 
 * We will try to improve how this is documented, but ATM it just has all parameters, 
 * even though you may need none, or just a few. 
 * 
 * _Note: For your specific commands, you can also pass other parameters._
 * 
 * **Important for the docs**
 * 
 * Most properties are actually not visible (you will get them in the types though).
 * So actually you will usually create one of these:
 * * [](xref:Api.Js.SxcJs.CommandParamsEntityById)
 * * [](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock)
 * * [](xref:Api.Js.SxcJs.CommandParamsEntityInList)
 * * [](xref:Api.Js.SxcJs.CommandAddParams)
 * * [](xref:Api.Js.SxcJs.CommandAddExistingParams)
 * * [](xref:Api.Js.SxcJs.CommandDataParams)
 * * [](xref:Api.Js.SxcJs.CommandCopyParams)
 * * [](xref:Api.Js.SxcJs.CommandCodeParams)
 * * [](xref:Api.Js.SxcJs.CommandDeleteParams)
 * * [](xref:Api.Js.SxcJs.CommandMetadataParams)
 * * [](xref:Api.Js.SxcJs.CommandNewParams)
 * 
 * Because of this, most of the properties below are NOT documented, as their purpose can change depending on the command used. 
 * @public
 */
export interface CommandParams extends Record<string, unknown>
  // We cannot extend from the real parameters, because this won't make it into the documentation
  // extends Partial<CommandParamsEntityById>, Partial<CommandParamsEntity>
  {
    /** 
     * The action is used in scenarios where the command name must be included
     * @internal - wait with publishing this, it shouldn't actually be here. we may need to create another type which includes it
     */
    action?: CommandNames;

    /** @internal */
    items?: Array<ItemIdentifierSimple | ItemIdentifierInList>;

    /** 
     * Special change of dialogs, for example to change the edit-dialog into a new-dialog. 
     * @internal - not sure how this matches / replaces dialog, probably internal only
     */
    mode?: string;

    // both contentType and contentTypeName were used historically, so both variations may exist in Razor templaets
    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    contentType?: string;

    /** @internal old */
    contentTypeName?: string;

    /** @internal */
    pipelineId?: number;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    filters?: string;
    
    /** @internal */
    dialog?: string;

    /** 
     * @internal 
     * @deprecated but still in use
     */
    sortOrder?: number;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    index?: number;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    entityId?: number;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    entityGuid?: string;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    entityTitle?: string;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    title?: string;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * This is only for the module-specific list of items.
     * When using parent/fields, this is not relevant.
     * @public
     */
    useModuleList?: true;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    metadata?: CommandParamsMetadata;

    /** @internal */
    isPublished?: boolean;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    prefill?: Record<string, boolean | string | number | Date>;

    /**
     * Custom Code in the previous V9 standard
     * @internal
     */
    customCode?: string;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    call?: string;


    /**
     * New in 10.27 - list of apps for the quick dialog
     * @internal
     */
    apps?: string;

    /** 
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    parent?: string;

    /** 
     * Combined with the parent property determines what to edit
     * @internal
     */
    fields?: string;

    /**
     * 
     * New 16.00 - not public yet
     * @internal
     */
    uifields?: string;

    /** 
     * Form parameters
     * 
     * New 16.02 - not public yet
     * @internal
     */
    form?: Record<string, TypeValue>;

    /**
     * for template edit dialog 
     * @internal
     */
    isshared?: boolean;


    /**
     * for copying an entity - the id of the entity to copy - new 20.09
     * EXPERIMENTAL - WILL PROBABLY BE REMOVED AGAIN
     * @internal
     */
    copyId?: number;

    /**
     * Settings to pass to the dialog.
     * 
     * @internal v18.07 - not public - trying to finalize v20 (believe it was not used yet)
     */
    settings?: unknown;
}

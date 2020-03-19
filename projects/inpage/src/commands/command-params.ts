import { MetadataFor } from '.';
import { ItemIdentifierGroup, ItemIdentifierSimple } from '../interfaces/item-identifiers';
import { DictionaryValue } from '../plumbing';

/**
 * Command parameters are handed over to a command for execution
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
    entityGuid?: string;
    entityTitle?: string;
    useModuleList?: boolean;
    metadata?: MetadataFor;

    isPublished?: boolean;
    prefill?: DictionaryValue;

    // 2020-03-11 2dm in this case it seems that it's a string according to the code
    // but I'm simply not sure if this is true...
    customCode?: string;
}

// 2020-03-18 - this was an old class that was often used where we now have
// CommandParams in use
// We'll leave it here for a while in case we realize we missed something


// export class Settings {
// //   code: a.ny;
// //   configureCommand: a.ny;
// //   items: a.ny; // string | string[];
// //   metadata: MetadataFor;
// //   prefill: {[key: string]: a.ny};
//   //
//   action: string;
// //   appId: number;
// //   attributeSetName: string;
// //   cbId: number;
// //   cbIsEntity: boolean;
// //   contentGroupId: number;
//   contentType: string;
// //   contentTypeId: string;
//   customCode: string;
//   dialog: string;
//   entityGuid: string;
//   entityId: number;
// //   entityTitle: string;
// //   filters: string;
// //   fullScreen: boolean;
//   hasContent: boolean;
//   inlineWindow: boolean;
//   isContent: boolean;
//   isList: boolean;
//   isPublished: boolean;
//   newWindow: boolean;
//   partOfPage: boolean;
//   sortOrder: number;
//   supportsAjax: boolean;
// //   templateChooserVisible: boolean;
// //   templateId: number;
//   useModuleList: boolean;
//   user: UserOfEditContext;
//   //
//   name: string;
// }

import { AttrJsonEditContext } from '../html-attribute';

/**
 * information related to the current contentBlock, incl
 */
export class ContextOfContentBlock {
    // ContentGroup
    isCreated: boolean;
    isList: boolean;
    queryId: number;
    templateId: number;
    contentTypeId: string;
    contentGroupId: string;

    constructor(editCtx: AttrJsonEditContext) {
        // Initialize Content-Group Values
        if (editCtx.contentBlock) {
            this.isCreated = editCtx.contentBlock.IsCreated;
            this.isList = editCtx.contentBlock.IsList;
            this.queryId = editCtx.contentBlock.QueryId;
            this.templateId = editCtx.contentBlock.TemplateId;
            this.contentTypeId = editCtx.contentBlock.ContentTypeName;
            this.contentGroupId = editCtx.contentBlock.Guid;
        }

    }

}

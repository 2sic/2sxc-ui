import { NumberNotDefinedHuge } from '../../../../core';
import { AttrJsonEditContext } from '../html-attribute';

/**
 * information related to the current contentBlock, incl
 */
export class ContextOfContentBlock {
    // ContentBlock
    id: number = NumberNotDefinedHuge; // the CB ID
    versioningRequirements: string;
    parentFieldName: string;
    parentFieldSortOrder: number;
    partOfPage: boolean;

    // ContentGroup
    isCreated: boolean;
    isList: boolean;
    queryId: number;
    templateId: number;
    contentTypeId: string;
    contentGroupId: string;

    constructor(editCtx: AttrJsonEditContext) {
        // Initialize Content-Block values
        if (editCtx.ContentBlock) {
            this.id = editCtx.ContentBlock.Id;
            this.versioningRequirements = editCtx.ContentBlock.VersioningRequirements;
            this.parentFieldName = editCtx.ContentBlock.ParentFieldName;
            this.parentFieldSortOrder = editCtx.ContentBlock.ParentFieldSortOrder;
            this.partOfPage = editCtx.ContentBlock.PartOfPage;
        }

        // Initialize Content-Group Values
        if (editCtx.ContentGroup) {
            this.isCreated = editCtx.ContentGroup.IsCreated;
            this.isList = editCtx.ContentGroup.IsList;
            this.queryId = editCtx.ContentGroup.QueryId;
            this.templateId = editCtx.ContentGroup.TemplateId;
            this.contentTypeId = editCtx.ContentGroup.ContentTypeName;
            this.contentGroupId = editCtx.ContentGroup.Guid;
        }

    }

}

﻿import { AttrJsonEditContext } from '../html-attribute';

/**
 * information related to the current contentBlock, incl
 */
export class ContextOfContentBlock {
    // ContentBlock
    id: number; // the CB ID
    isEntity: boolean;
    showTemplatePicker: boolean;
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
            this.id = editCtx.ContentBlock.Id; // or sxc.cbid or InstanceConfig.cbid
            this.isEntity = editCtx.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
            this.showTemplatePicker = editCtx.ContentBlock.ShowTemplatePicker;
            this.versioningRequirements = editCtx.ContentBlock.VersioningRequirements;
            this.parentFieldName = editCtx.ContentBlock.ParentFieldName;
            this.parentFieldSortOrder = editCtx.ContentBlock.ParentFieldSortOrder;
            this.partOfPage = editCtx.ContentBlock.PartOfPage; // NgDialogParams.partOfPage
        }

        // Initialize Content-Group Values
        if (editCtx.ContentGroup) {
            this.isCreated = editCtx.ContentGroup.IsCreated;
            this.isList = editCtx.ContentGroup.IsList; // ex: InstanceConfig.isList
            this.queryId = editCtx.ContentGroup.QueryId;
            this.templateId = editCtx.ContentGroup.TemplateId;
            this.contentTypeId = editCtx.ContentGroup.ContentTypeName;
            this.contentGroupId = editCtx.ContentGroup.Guid; // ex: InstanceConfig.contentGroupId
        }

    }

}

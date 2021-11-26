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

  // TemplateEdition for better editing
  // New in 12.11
  templatePath?: string;

  // New in 12.11
  edition?: string;

  constructor(editCtx: AttrJsonEditContext) {
    // Initialize Content-Group Values
    const cb = editCtx.contentBlock;
    if (!cb) return;
    this.isCreated = cb.IsCreated;
    this.isList = cb.IsList;
    this.queryId = cb.QueryId;
    this.templateId = cb.TemplateId;
    this.templatePath = cb.TemplatePath;
    this.templatePath = cb.TemplatePath;
    this.contentTypeId = cb.ContentTypeName;
    this.contentGroupId = cb.Guid;
  }

}

import { AttrJsonEditContext } from '../html-attribute';

export class ContentBlockUnifiedInCtxAndAttr {
  /**
   * Informs if the razor file is from a shared location - usually false.
   * Important for opening the code editor.
   * 
   * True if the template comes from the shared location - new in v13
   * Changed to lower case in v17 and unified in v17
   */
  templateIsShared: boolean;

  /**
   * View name for showing in the layout infos - new v17
   */
  viewName: string;

  // /**
  //  * App name for showing in the layout infos - new v17
  //  */
  // appName: string;

  renderMs: number;
  renderLightspeed: boolean;

  /**
   * Disable the view switching, typically because the current view was triggered by a url parameter.
   */
  viewSwitchDisabled?: boolean;
} 

/**
 * information related to the current contentBlock, incl
 * @internal
 */
export class ContextOfContentBlock extends ContentBlockUnifiedInCtxAndAttr {
  // ContentGroup
  isCreated: boolean;
  isList: boolean;
  queryId: number;
  /** new v17.07 for layout-info only ATM */
  queryName: string;
  /** new v17.07 for layout-info only ATM */
  queryInfo: string;
  templateId: number;
  contentTypeId: string;
  contentGroupId: string;

  // TemplateEdition for better editing
  // New in 12.11
  templatePath?: string;

  

  // New in 12.11
  edition?: string;

  /**
   * new 17.08, CSV of editions
   */
  editions?: string;

  constructor(editCtx: AttrJsonEditContext) {
    super();
    // Initialize Content-Group Values
    const cb = editCtx.contentBlock;
    if (!cb) return;
    this.isCreated = cb.IsCreated;
    this.isList = cb.IsList;

    this.queryId = cb.QueryId;
    this.queryName = cb.queryName;
    this.queryInfo = cb.queryInfo;
    this.templateId = cb.TemplateId;
    this.templatePath = cb.TemplatePath;
    this.templateIsShared = cb.templateIsShared;
    this.edition = cb.Edition ?? null;
    this.editions = cb.editions ?? null;
    this.contentTypeId = cb.ContentTypeName;
    this.contentGroupId = cb.Guid;

    this.viewName = cb.viewName;
    this.renderMs = cb.renderMs;
    this.renderLightspeed = cb.renderLightspeed;

    this.viewSwitchDisabled = cb.viewSwitchDisabled;
  }
}

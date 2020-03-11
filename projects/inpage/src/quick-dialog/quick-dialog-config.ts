import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { IQuickDialogConfig } from '../interfaces/iquick-dialog-config';
import { UserOfEditContext } from '../manage/user-of-edit-context';


export class QuickDialogConfig implements IQuickDialogConfig {
  appId: number;
  isContent: boolean;
  isInnerContent: boolean;
  hasContent: boolean;
  isList: boolean;
  templateId: number;
  contentTypeId: string;
  // templateChooserVisible: boolean;
  user: UserOfEditContext;
  supportsAjax: boolean;
  debug: boolean;

  // constructor(editContext: DataEditContext) {
  //  this.appId = editContext.ContentGroup.AppId;
  //  this.isContent = editContext.ContentGroup.IsContent;
  //  this.hasContent = editContext.ContentGroup.HasContent;
  //  this.isList = editContext.ContentGroup.IsList;
  //  this.templateId = editContext.ContentGroup.TemplateId;
  //  this.contentTypeId = editContext.ContentGroup.ContentTypeName;
  //  this.templateChooserVisible = editContext.ContentBlock.ShowTemplatePicker; // todo = maybe move to content-group
  //  this.user = getUserOfEditContext(editContext);
  //  this.supportsAjax = editContext.ContentGroup.SupportsAjax;
  // }

  static fromContext(context: ContextBundleButton): QuickDialogConfig {
    const config = new QuickDialogConfig();
    config.appId = context.app.id;
    config.isContent = context.app.isContent;
    config.isInnerContent = context.instance.id !== context.contentBlock.id; // if it differs, it's inner
    config.hasContent = context.app.hasContent;
    config.isList = context.contentBlock.isList;
    config.templateId = context.contentBlock.templateId;
    config.contentTypeId = context.contentBlock.contentTypeId;
    config.user = UserOfEditContext.fromContext(context);
    config.supportsAjax = context.app.supportsAjax;
    config.debug = window.$2sxc.debug.load;
    return config;
  }
}

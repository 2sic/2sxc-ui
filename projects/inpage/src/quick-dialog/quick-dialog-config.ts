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
  user: UserOfEditContext;
  supportsAjax: boolean;
  debug: boolean;

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

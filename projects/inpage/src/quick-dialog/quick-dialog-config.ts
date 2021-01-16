import { ContextComplete } from '../context';
import { ContextOfUser } from '../context';
import { IQuickDialogConfig } from '../interfaces/iquick-dialog-config';


export class QuickDialogConfig implements IQuickDialogConfig {
    appId: number;
    /**
     * This will cause the quick-dialog to start in a different mode
     * True means it starts with Content-Type picker and then view
     * False means it starts with App-Picker and then View
     */
    isContent: boolean;
    isInnerContent: boolean;
    hasContent: boolean;
    isList: boolean;
    templateId: number;
    contentTypeId: string;
    user: ContextOfUser;
    supportsAjax: boolean;
    debug: boolean;

    static fromContext(context: ContextComplete): QuickDialogConfig {
        const config = new QuickDialogConfig();
        config.appId = context.app.id;
        config.isContent = context.app.isContent;
        config.isInnerContent = context.instance.id !== context.contentBlockReference.id; // if it differs, it's inner
        config.hasContent = context.app.hasContent;
        config.isList = context.contentBlock.isList;
        config.templateId = context.contentBlock.templateId;
        config.contentTypeId = context.contentBlock.contentTypeId;
        config.user = ContextOfUser.fromContext(context);
        config.supportsAjax = context.app.supportsAjax;
        config.debug = window.$2sxc.debug.load;
        return config;
    }
}

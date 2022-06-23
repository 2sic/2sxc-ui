import { IQuickDialogConfig } from '../../../connect-parts/inpage-quick-dialog';
import { ContextComplete } from '../context';
/**
 * @internal
 */
export declare class QuickDialogConfig implements IQuickDialogConfig {
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
    supportsAjax: boolean;
    debug: boolean;
    static fromContext(context: ContextComplete): QuickDialogConfig;
}

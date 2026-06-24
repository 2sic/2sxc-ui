/**
 * configuration for quick-dialog, so it can adjust the UI
 * @internal
 */
export interface IQuickDialogConfig {
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
}

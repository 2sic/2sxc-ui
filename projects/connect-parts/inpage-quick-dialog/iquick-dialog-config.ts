/**
 * configuration for quick-dialog, so it can adjust the UI
 */
export interface IQuickDialogConfig {
  appId: number;
  isContent: boolean;
  isInnerContent: boolean;
  hasContent: boolean;
  isList: boolean;
  templateId: number;
  contentTypeId: string;
  supportsAjax: boolean;
  debug: boolean;
}

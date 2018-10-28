//
// Note: this interface is copied/shared between this and angular quick-edit
//

import { IQuickDialogConfig } from './iquick-dialog-config';

/**
 * Connection object between inpage and quick-edit dialog for messaging back and forth
 */
export interface IIFrameBridge {
  getAdditionalDashboardConfig(): IQuickDialogConfig;
  hide(): void;
  run(verb: string): void;
  showMessage(message: string): void;
  reloadAndReInit(): Promise<IQuickDialogConfig>;
  setTemplate(templateId: number, templateName: string, closeDialog: boolean): Promise<any>;

  /**
   * the cancel callback to close this dialog cancelling changes
   */
  cancel(): void;
}


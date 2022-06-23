import { IQuickDialogConfig } from './iquick-dialog-config';
/**
 * Connection object between inpage and quick-edit dialog for messaging back and forth
 * @internal
 */
export interface IIFrameBridge {
    getAdditionalDashboardConfig(): IQuickDialogConfig;
    hide(): void;
    run(verb: string): void;
    showMessage(message: string): void;
    reloadAndReInit(): Promise<IQuickDialogConfig>;
    setTemplate(templateId: number, templateName: string, closeDialog: boolean): Promise<boolean>;
    /**
     * the cancel callback to close this dialog cancelling changes
     */
    cancel(): void;
    changed: boolean;
}

export interface IDialogFrameElement extends HTMLIFrameElement {
    getAdditionalDashboardConfig(): any;
    isDirty(): boolean;
    scrollToTarget(): void;
    persistDia(): void;
    //sxc: any;
    toggle(action: boolean): void;
    run(verb): void;
    showMessage(message);
    reloadAndReInit(): Promise<any>;
    saveTemplate(templateId): Promise<any>;
    previewTemplate(templateId): Promise<any>;
}
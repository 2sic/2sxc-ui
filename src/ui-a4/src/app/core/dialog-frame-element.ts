export interface IDialogFrameElement extends HTMLIFrameElement {
    getAdditionalDashboardConfig(): any;
    isDirty(): boolean;
    scrollToTarget(): void;
    sxc: any;
}
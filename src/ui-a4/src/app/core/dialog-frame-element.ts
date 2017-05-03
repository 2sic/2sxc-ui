export interface IDialogFrameElement extends HTMLIFrameElement {
    getAdditionalDashboardConfig(): any;
    isDirty(): boolean;
    sxc: any;
}
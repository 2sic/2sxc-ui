export interface IDialogFrameElement extends HTMLIFrameElement {
    getAdditionalDashboardConfig(): any;
    isDirty(): boolean;
    scrollToTarget(): void;
    persistDia(): void;
    sxc: any;
    toggle(action: boolean): void;
}
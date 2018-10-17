import { IIFrameBridge } from './iiframe-bridge';


export interface IDialogFrameElement extends HTMLIFrameElement {

    bridge: IIFrameBridge;

    // getAdditionalDashboardConfig(): any;
    isDirty(): boolean;
    // scrollToTarget(): void;
    // persistDia(): void;
    // toggle(action: boolean): void;
    // run(verb): void;
    // getManageInfo(): any;
    // showMessage(message);
    // reloadAndReInit(): Promise<any>;
    // saveTemplate(templateId): Promise<any>;
    // previewTemplate(templateId): Promise<any>;

    // /**
    //  * the cancel callback to close this dialog cancelling changes
    //  */
    // cancel(): void;
}

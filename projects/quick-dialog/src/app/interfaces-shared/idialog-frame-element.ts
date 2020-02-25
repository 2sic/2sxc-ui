import { IIFrameBridge } from './iiframe-bridge';


export interface IDialogFrameElement extends HTMLIFrameElement {
    bridge: IIFrameBridge;

}

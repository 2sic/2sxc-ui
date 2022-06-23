import { IIFrameBridge } from './iiframe-bridge';
/**
 * @internal
 */
export interface IDialogFrameElement extends HTMLIFrameElement {
    /** The bridge object which can handle commands from the other side */
    bridge: IIFrameBridge;
    /** store previous height for changing again later on */
    previousHeight: number;
}

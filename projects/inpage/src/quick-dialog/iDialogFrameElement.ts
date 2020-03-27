import { IFrameBridge } from './iframe-bridge';
import { QuickDialogContainer } from './quick-dialog-container';

//
// Note: NOT shared between this project and angular, because that object is a bit different
//

export class IDialogFrameElement extends HTMLIFrameElement {
    bridge: IFrameBridge;

    /** store previous height for changing again later on */
    previousHeight: number;

    static build(iFrame: HTMLIFrameElement, parent: QuickDialogContainer): IDialogFrameElement {
        const callLog = parent.log.call('build');
        callLog.data('prototype', IFrameBridge.prototype);
        const iFrameExtended = iFrame as IDialogFrameElement;
        iFrameExtended.bridge = new IFrameBridge(parent);
        callLog.data('extensions', iFrameExtended.bridge);
        return callLog.return(iFrameExtended);
    }
}

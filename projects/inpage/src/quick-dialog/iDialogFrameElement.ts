﻿import { Log } from '../logging';
import { IFrameBridge } from './iframe-bridge';

//
// Note: NOT shared between this project and angular, because that object is a bit different
//

export class IDialogFrameElement extends HTMLIFrameElement {
    bridge: IFrameBridge;

    /** store previous height for changing again later on */
    previousHeight: number;

    static build(iFrame: HTMLIFrameElement, log: Log): IDialogFrameElement {
        const callLog = log.call('build');
        callLog.addData('prototype', IFrameBridge.prototype);
        const iFrameExtended = iFrame as IDialogFrameElement;
        iFrameExtended.bridge = new IFrameBridge(log);
        callLog.addData('extensions', iFrameExtended.bridge);
        return callLog.return(iFrameExtended);
    }
}

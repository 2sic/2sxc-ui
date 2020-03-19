import { IFrameBridge } from './iframe-bridge';

//
// Note: NOT shared between this project and angular, because that object is a bit different
//

export class IDialogFrameElement extends HTMLIFrameElement {
  bridge: IFrameBridge;

  /** store previous height for changing again later on */
  previousHeight: number;

  static build(iFrame: HTMLIFrameElement): IDialogFrameElement {
    console.log('prot: ', IFrameBridge.prototype);
    const iFrameExtended = iFrame as IDialogFrameElement;
    iFrameExtended.bridge = new IFrameBridge();
    console.log('extensions: ', iFrameExtended.bridge);
    return iFrameExtended;
  }
}

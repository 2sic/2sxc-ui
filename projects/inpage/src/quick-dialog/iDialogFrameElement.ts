import { IFrameBridge } from './iframe-bridge';

//
// Note: NOT shared between this project and angular, because that object is a bit different
//

export interface IDialogFrameElement extends HTMLIFrameElement {
  bridge: IFrameBridge;

  /** store previous height for changing again later on */
  previousHeight: number;

}

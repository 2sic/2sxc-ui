// import { Window as sxcWindow } from '../../../$2sxc/src/index';
import { DnnActionMenu } from '../dnn/dnn-menu-helper/dnn-inpage-edit';
import { TypeWeDontCare } from '../plumbing';
import { QuickE } from '../quick-edit/quick-e';
import { SxcRoot } from './sxc-controller-in-page';

// ReSharper disable InconsistentNaming
export interface WindowInPage extends Window {
  $2sxc: SxcRoot;
  // event: Event;
  dnn_tabVersioningEnabled: boolean;
  dnn: TypeWeDontCare;
  $quickE: QuickE ;
  $2sxcActionMenuMapper: (moduleId: number) => DnnActionMenu;
}
// ReSharper restore InconsistentNaming

export const windowInPage: WindowInPage = window as unknown as WindowInPage;

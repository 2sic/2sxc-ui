import { Window as sxcWindow } from '../../../$2sxc/src/index';
import { ActionMenuMapper } from '../dnn/dnn-menu-helper/dnn-inpage-edit';
import { TypeWeDontCare } from '../plumbing';
import { $quickE } from '../quick-edit/quick-e';
import { SxcControllerInPage } from './sxc-controller-in-page';

// ReSharper disable InconsistentNaming
export interface WindowInPage extends Window, sxcWindow {
  $2sxc: SxcControllerInPage;
  // event: Event;
  dnn_tabVersioningEnabled: boolean;
  dnn: TypeWeDontCare;
  $quickE: typeof $quickE ;
  $2sxcActionMenuMapper: (moduleId: number) => ActionMenuMapper;
}
// ReSharper restore InconsistentNaming

export const windowInPage: WindowInPage = window as unknown as WindowInPage;

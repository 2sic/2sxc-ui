import { SxcControllerInPage } from './sxc-controller-in-page';

// ReSharper disable InconsistentNaming
export interface WindowInPage extends Window {
  $2sxc: SxcControllerInPage;
  // event: Event;
  dnn_tabVersioningEnabled: boolean;
  dnn: any;
  $quickE: any;
  i18next: any;
  i18nextXHRBackend: any;
  $2sxcActionMenuMapper: any; // (moduleId: number) => ActionMenuMapper,
}
// ReSharper restore InconsistentNaming

export const windowInPage: WindowInPage = window as any as WindowInPage;

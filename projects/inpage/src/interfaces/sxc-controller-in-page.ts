import { Cms } from '../cms/Cms';
import { windowInPage as window } from './window-in-page';
// import { SxcRoot} from '@2sic.com/2sxc-typings'
/**
 * $2sxc interface declaration merging for in-page
 */
// ReSharper disable InconsistentNaming
export interface SxcControllerInPage extends SxcControllerWithInternals {
  api: any;
  _commands: any;
  _contentBlock: any;
  _lib: any;
  _quickDialog: any;
  _toolbarManager: any;
  c: any;
  consts: any;
  contentItems: any;
  system: any;
  translate: any;
  context: any;
  cms: Cms;
}
// ReSharper restore InconsistentNaming

export const $2sxcInPage: SxcControllerInPage = window.$2sxc;

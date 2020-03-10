import { SxcRootWithInternals } from '../../../$2sxc/src/index';
import { Constants } from '../2sxc-extensions/2sxc.consts';
import { SystemUpgrader } from '../2sxc-extensions/2sxc.system';
import { Cms } from '../cms/Cms';
import { Commands } from '../commands/commands';
import { MainContentBlock } from '../contentBlock/main-content-block';
import { context } from '../context/context';
import { Manage } from '../manage/manage';
import { QuickDialogManager } from '../quick-dialog/quick-dialog';
import { ToolbarManager } from '../toolbar/toolbar-manager';
import { windowInPage as window } from './window-in-page';


/**
 * $2sxc interface declaration merging for in-page
 */
// ReSharper disable InconsistentNaming
export interface SxcControllerInPage extends SxcRootWithInternals {
  _commands: Commands;
  _contentBlock: MainContentBlock;
  _quickDialog: QuickDialogManager;
  _toolbarManager: ToolbarManager;
  _manage: Manage;
  c: Constants;
  consts: Constants;
  contentItems: any;
  system: SystemUpgrader;
  translate(key: string): string;
  context: typeof context;
  cms: Cms;
}
// ReSharper restore InconsistentNaming

export const $2sxcInPage: SxcControllerInPage = window.$2sxc;

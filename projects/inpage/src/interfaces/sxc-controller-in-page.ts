import { SxcRootWithInternals } from '../../../$2sxc/src/index';
import { SystemUpgrader } from '../system/2sxc.system';
import { Cms } from '../cms/Cms';
import { Commands as Commands } from '../commands/commands';
import { MainContentBlock } from '../contentBlock/main-content-block';
import { context } from '../context/context';
import { Manage } from '../manage/manage';
import { QuickDialogManager } from '../quick-dialog/quick-dialog';
import { ToolbarManager } from '../toolbar/toolbar-manager';
import { SxcIntanceEditable } from './sxc-instance-editable';
import { windowInPage as window } from './window-in-page';


/**
 * $2sxc interface declaration merging for in-page
 */
// ReSharper disable InconsistentNaming
export interface SxcControllerInPage extends SxcRootWithInternals {
  /**
   * Get's an SxcInstance
   * @param id number | HTMLElement
   * @param cbid number
   * @returns SxcInstance
   */
  (id: number | HTMLElement | JQuery, cbid?: number): SxcIntanceEditable;
  _commands: typeof Commands;
  _contentBlock: MainContentBlock;
  _quickDialog: QuickDialogManager;
  _toolbarManager: ToolbarManager;
  _manage: Manage;
  system: SystemUpgrader;
  translate(key: string): string;
  context: typeof context;
  cms: Cms;
}
// ReSharper restore InconsistentNaming

export const $2sxcInPage: SxcControllerInPage = window.$2sxc;

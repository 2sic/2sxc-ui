import { ContextIdentifier, Sxc, SxcGlobal } from '../../../$2sxc/src/index';
import { Cms } from '../cms/Cms';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { Manage } from '../manage/manage';
import { SystemUpgrader } from '../system/2sxc.system';
import { SxcEdit } from './sxc-instance-editable';
import { windowInPage as window } from './window-in-page';


/**
 * $2sxc interface declaration merging for in-page
 */
// ReSharper disable InconsistentNaming
export interface SxcRoot extends SxcGlobal {
  /**
   * Get's an Sxc
   * @param id number | HTMLElement
   * @param cbid number
   * @returns Sxc
   */
  // 2021-09-17 spm assume this function doesn't use jquery
  (id: number | ContextIdentifier | HTMLElement | Sxc , cbid?: number): SxcEdit;
  // insights: typeof Insights;
  _manage: Manage;
  system: SystemUpgrader;
  translate(key: string): string;
  context: typeof ContextComplete.findContext;
  cms: Cms;
}
// ReSharper restore InconsistentNaming

export const $2sxcInPage: SxcRoot = window.$2sxc;

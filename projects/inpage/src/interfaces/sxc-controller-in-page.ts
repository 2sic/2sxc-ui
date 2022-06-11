import { ContextIdentifier, Sxc, SxcGlobal } from '../../../$2sxc/src/index';
import { Cms } from '../cms/Cms';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { Manage } from '../manage/manage';
import { SystemUpgrader } from '../system/2sxc.system';

/**
 * $2sxc interface declaration merging for in-page
 * @internal
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
  (id: number | ContextIdentifier | HTMLElement | Sxc , cbid?: number): Sxc;
  // insights: typeof Insights;
  _manage: Manage;
  system: SystemUpgrader;
  translate(key: string): string;
  context: typeof ContextComplete.findContext;
  cms: Cms;
}
// ReSharper restore InconsistentNaming


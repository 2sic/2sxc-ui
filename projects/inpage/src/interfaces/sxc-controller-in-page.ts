import { SxcGlobal } from '../../../$2sxc/src/index';
import { Cms } from '../cms/Cms';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { SxcGlobalManage } from '../manage/sxc-global-manage';
import { SystemUpgrader } from '../system/2sxc.system';

/**
 * $2sxc interface declaration merging for in-page
 * @internal
 */
// ReSharper disable InconsistentNaming
export interface SxcRoot extends SxcGlobal {
  _manage: SxcGlobalManage;
  system: SystemUpgrader;
  translate(key: string): string;
  context: typeof ContextComplete.findContext;
  cms: Cms;
}
// ReSharper restore InconsistentNaming


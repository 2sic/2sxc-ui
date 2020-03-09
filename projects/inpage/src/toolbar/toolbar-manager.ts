import { HasLog } from '../logging/has-log';
import { Log } from '../logging/log';
import { buildToolbars, disable, isDisabled } from './build-toolbars';
import { renderButton } from './item/render-button';
import { renderToolbar } from './item/render-toolbar';
import { ToolbarConfigTemplates } from './toolbar/toolbar-config-templates';

/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
export class ToolbarManager extends HasLog {
  constructor(parentLog: Log) {
    super('Tlb.Mngr', parentLog, 'init');
  }

  buildToolbars(parentTag: JQuery<HTMLElement>, optionalId?: number) {
    buildToolbars(this.log, parentTag, optionalId);
  }

  disable = disable;
  isDisabled = isDisabled;
  // generate button html
  generateButtonHtml = renderButton;
  generateToolbarHtml = renderToolbar;
  toolbarTemplate = ToolbarConfigTemplates.Instance(this.log).get('default');
}

// 2dm 2018-03-22 this seems to be unused
const sharedTbm = new ToolbarManager(null);
export const _toolbarManager = sharedTbm;

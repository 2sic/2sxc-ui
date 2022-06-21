import { Sxc, SxcGlobalManage as ISxcGlobalManage } from '../../../$2sxc/src';
import { ContextComplete } from '../context';
import { SxcCmsReal } from '../sxc/sxc-cms-real';
import { SxcTools } from '../sxc/sxc-tools';
import { ToolbarManager } from '../toolbar';
import { EditManager } from './edit-manager';

/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 * @internal
 */
export class SxcGlobalManage implements ISxcGlobalManage {
  /**
   * Init the manage-object on a just-created sxc-instance
   * we must keep signature of initInstance in sync with the 2sxc.api.js
   * @param sxc
   */
  initInstance(sxc: Sxc) {
    try {
      const myContext = ContextComplete.findContext(sxc);
      const editContext = SxcTools.getEditContext(sxc);

      sxc.manage = new EditManager(editContext, myContext);

      // add code for the cms.run command, which doesn't exist until editing is enabled
      sxc.cms = new SxcCmsReal(sxc);
    } catch (e) {
      console.error('error in 2sxc - will log but not throw', e);
    }
  }

  /** Internal - ATM only used in dnn-sxc-angular to enable toolbar initialization */
  _toolbarManager = ToolbarManager.singleton();
}

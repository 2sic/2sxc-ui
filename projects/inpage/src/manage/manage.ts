import { SxcInstanceEngine } from '../commands';
import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { EditManager } from './edit-manager';
import { UserOfEditContext } from './user-of-edit-context';

/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 */
export class Manage {
  initInstance = initInstance;
}

// export const _manage = new Manage(); // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js

/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 * @param sxc
 *
 * we must keep signature of initInstance for compatibility because it is used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
 */
function initInstance(sxc: SxcEdit) {
    try {
      _initInstance(sxc);
    } catch (e) {
      console.error('error in 2sxc - will log but not throw', e);
    }
  }

  // ReSharper disable once InconsistentNaming
function _initInstance(sxc: SxcEdit) {
    const myContext = ContextBundleButton.findContext(sxc);
    const editContext = SxcEdit.getEditContext(myContext.sxc);

    const userInfo = UserOfEditContext.fromContext(myContext); // 2dm simplified getUserOfEditContext(context);
    const cmdEngine = new SxcInstanceEngine(myContext.sxc);

    const editManager = new EditManager(myContext.sxc, editContext, userInfo, cmdEngine, myContext);
    sxc.manage = editManager;
    editManager.init();
    return editManager;
  }

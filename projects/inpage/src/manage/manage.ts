import { InstanceEngine } from '../commands/execute/instance-engine';
import { findContext } from '../context/context';
import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { getEditContext } from './api';
import { EditManager } from './create';
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
export function initInstance(sxc: SxcIntanceEditable) {
    try {
      _initInstance(sxc);
    } catch (e) {
      console.error('error in 2sxc - will log but not throw', e);
    }
  }

  // ReSharper disable once InconsistentNaming
function _initInstance(sxc: SxcIntanceEditable) {
    const myContext = findContext(sxc);
    const editContext = getEditContext(myContext.sxc);

    const userInfo = UserOfEditContext.fromContext(myContext); // 2dm simplified getUserOfEditContext(context);
    const cmdEngine = new InstanceEngine(myContext.sxc);

    const editManager = new EditManager(myContext.sxc, editContext, userInfo, cmdEngine, myContext);
    sxc.manage = editManager;
    editManager.init();
    return editManager;
  }

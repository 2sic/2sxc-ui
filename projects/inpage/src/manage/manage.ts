import { SxcInstanceEngine } from '../commands';
import { ContextComplete } from '../context';
import { ContextOfUser } from '../context';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
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
 */
export class Manage {
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
    initInstance(sxc: SxcEdit) {
        try {
            const myContext = ContextComplete.findContext(sxc);
            const editContext = SxcEdit.getEditContext(myContext.sxc);

            const userInfo = ContextOfUser.fromContext(myContext);
            const cmdEngine = new SxcInstanceEngine(myContext.sxc);

            const editManager = new EditManager(myContext.sxc, editContext, userInfo, cmdEngine, myContext);
            sxc.manage = editManager;
            editManager.init();
            return editManager;
        } catch (e) {
          console.error('error in 2sxc - will log but not throw', e);
        }
    }
}

import { SxcInstanceEngine } from '../commands';
import { ContextComplete } from '../context';
import { ContextOfUser } from '../context';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
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
 */
export class Manage {
    /**
     * Init the manager object
     * we must keep signature of initInstance in sync with the 2sxc.api.js
     * @param sxc
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

    /** Internal - ATM only used in dnn-sxc-angular to enable toolbar initialization */
    _toolbarManager = ToolbarManager;
}

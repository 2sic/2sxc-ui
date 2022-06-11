import { Sxc } from '../../../$2sxc/src';
import { RunParams } from '../../../$2sxc/src/cms';
import { Cms } from '../cms/Cms';
import { RunParamsHelpers } from '../cms/run-params-helpers';
import { SxcInstanceEngine } from '../commands';
import { ContextComplete } from '../context';
import { ContextOfUser } from '../context';
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
export class Manage {
    /**
     * Init the manager object
     * we must keep signature of initInstance in sync with the 2sxc.api.js
     * @param sxc
     */
    initInstance(sxc: Sxc) {
        try {
            const myContext = ContextComplete.findContext(sxc);
            const editContext = SxcTools.getEditContext(myContext.sxc);

            const userInfo = ContextOfUser.fromContext(myContext);
            const cmdEngine = new SxcInstanceEngine(myContext.sxc);

            const editManager = new EditManager(myContext.sxc, editContext, userInfo, cmdEngine, myContext);
            sxc.manage = editManager;
            sxc.cms.run = <T>(runParams: RunParams): Promise<void | T> => {
                RunParamsHelpers.ensureRunParamsInstanceOrError(runParams);
                return new Cms().run({ ...runParams, context: sxc });
            };
            sxc.run = sxc.cms.run;

            // Init to handle special errors
            // 2022-05-02 2dm disabled, don't think we need it any more
            // editManager.init();
            return editManager;
        } catch (e) {
          console.error('error in 2sxc - will log but not throw', e);
        }
    }

    /** Internal - ATM only used in dnn-sxc-angular to enable toolbar initialization */
    _toolbarManager = ToolbarManager.singleton();
}

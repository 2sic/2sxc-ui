import { Sxc, SxcGlobalManage as ISxcGlobalManage } from '../../../$2sxc/src';
import { ToolbarManager } from '../toolbar';
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
export declare class SxcGlobalManage implements ISxcGlobalManage {
    /**
     * Init the manage-object on a just-created sxc-instance
     * we must keep signature of initInstance in sync with the 2sxc.api.js
     * @param sxc
     */
    initInstance(sxc: Sxc): void;
    /** Internal - ATM only used in dnn-sxc-angular to enable toolbar initialization */
    _toolbarManager: ToolbarManager;
}

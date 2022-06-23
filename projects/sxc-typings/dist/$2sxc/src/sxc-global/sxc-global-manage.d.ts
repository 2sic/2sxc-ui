import { Sxc } from '..';
/**
 * @internal
 */
export interface SxcGlobalManage {
    /**
     * Init the manage-object on a just-created sxc-instance
     * we must keep signature of initInstance in sync with the 2sxc.api.js
     * @param sxc
     */
    initInstance(sxc: Sxc): void;
    _toolbarManager: any;
}

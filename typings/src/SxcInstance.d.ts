import { SxcWebApi } from './WebApi';

/**
 * The typical sxc-instance object for a specific DNN module or content-block
 */
export interface SxcInstance {
    /**
     * the sxc-instance ID, which is usually the DNN Module Id
     */
    id: number,

    /**
     * content-block ID, which is either the module ID, or the content-block definition entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    cbid: number,

    /**
     * checks if we're currently in edit mode
     * @returns {boolean}
     */
    // isEditMode(): boolean,
    // TODO: 2DM

    /**
     * helpers for ajax calls
     */
    webApi: SxcWebApi,
}
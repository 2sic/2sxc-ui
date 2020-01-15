import { SxcInstance } from '../instance/SxcInstance';
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';

/**
 * This is the interface for the main $2sxc object on the window
 */
export interface SxcController {
    /**
     * returns a 2sxc-instance of the id or html-tag passed in
     * @param id
     * @param cbid
     * @returns {}
     */
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals,

    /**
     * system information, mainly for checking which version of 2sxc is running
     * note: it's not always updated reliably, but it helps when debugging
     */
    sysinfo: {
        /** the version using the ##.##.## syntax */
        version: string,

        /** a short text description, for people who have no idea what this is */
        description: string,
    };
}

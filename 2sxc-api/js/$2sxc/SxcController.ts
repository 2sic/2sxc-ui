import { SxcInstance } from '../instance/SxcInstance';
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { Environment } from '../environment/Environment';
import { SxcHttp } from '../http/SxcHttp';
import { Log } from '../tools/Log';
import { SxcVersion } from '../constants';

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

    /**
     * Environment information
     * @type {Environment}
     */
    env: Environment;

    /**
     * Http helper for API calls and such
     */
    http: SxcHttp;

    /**
     * Internal logger to better see what's happening
     */
    log: Log;

}


export function getRootParts() : Partial<SxcController> {
    var env = new Environment();
    return {
        sysinfo: {
            version: SxcVersion,
            description: 'The 2sxc Controller - read more about it on docs.2sxc.org',
        },
        env: env,
        http: new SxcHttp(env),
        log: new Log('$2sxc', 'building'),
    };
}
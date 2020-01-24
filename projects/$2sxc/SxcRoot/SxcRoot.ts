import * as Public from '../../../typings/index';
import { SxcInstance } from '../instance/SxcInstance';
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { Environment } from '../environment/Environment';
import { SxcHttp } from '../http/SxcHttp';
import { Log } from '../logging/Log';
import { SxcVersion } from '../constants';

/**
 * This is the interface for the main $2sxc object on the window
 * This definition only extends the public interface
 */
export interface SxcRoot extends Public.SxcRoot {
    /**
     * Get's an SxcInstance
     * @param id number | HTMLElement
     * @param cbid number
     * @returns SxcInstance
     */
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals,

    /**
     * Environment information
     * @type {Environment}
     */
    env: Environment;

    /**
     * Http helper for API calls and such
     */
    http: SxcHttp;

}


export function getRootParts() : Partial<SxcRoot> {
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
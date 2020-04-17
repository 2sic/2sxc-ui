import * as Public from '../../../sxc-typings/index';
import { SxcInstanceWithInternals } from '../sxc-instance/sxc-instance-with-internals';
import { Environment } from '../environment';
import { SxcHttp } from '../http/sxc-http';
import { Log, SxcVersion } from '..';

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
    (id: number | HTMLElement | JQuery, cbid?: number): SxcInstanceWithInternals,

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


export function getRootPartsV2() : Partial<SxcRoot> {
    const log = new Log('$2sxc', null, 'building');
    var env = new Environment();
    return {
        sysinfo: {
            version: SxcVersion,
            description: 'The 2sxc Controller - read more about it on docs.2sxc.org',
        },
        env: env,
        http: new SxcHttp(env),
        log: log,
    };
}
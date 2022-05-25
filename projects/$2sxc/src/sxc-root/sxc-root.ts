import { SxcRoot } from '..';
import { SxcInstanceWithInternals } from '../sxc-instance/sxc-instance-with-internals';
import { Environment } from '../environment';
import { SxcHttp } from '../http/sxc-http';
import { Log, SxcVersion } from '../../../core';

/**
 * This is the interface for the main $2sxc object on the window
 * This definition only extends the public interface
 * @internal
 */
export interface SxcRootExt extends SxcRoot {
    /**
     * Get's an SxcInstance
     * @param id number | HTMLElement
     * @param cbid number
     * @returns SxcInstance
     */
    // 2021-10-04 spm assume this function doesn't use jquery
    (id: number | HTMLElement, cbid?: number): SxcInstanceWithInternals,

    /**
     * Http helper for API calls and such
     */
    http: SxcHttp;

}

/** @internal */
export function getRootPartsV2(): Partial<SxcRootExt> {
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

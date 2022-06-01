import { Sxc, SxcRoot } from '..';
import { Environment } from '../environment';
import { SxcHttp } from '../http/sxc-http';
import { Log, SxcVersion } from '../../../core';



/** @internal */
export function getRootPartsV2(): Partial<SxcRoot> {
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

import { SxcInstance } from '../instance/SxcInstance';
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { Environment } from '../environment/Environment';
import { SxcHttp } from '../http/SxcHttp';
import { Log } from '../logging/Log';
export interface SxcRoot {
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals;
    sysinfo: {
        version: string;
        description: string;
    };
    env: Environment;
    http: SxcHttp;
    log: Log;
}
export declare function getRootParts(): Partial<SxcRoot>;

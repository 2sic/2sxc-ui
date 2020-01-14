import { SxcInstance } from '../instance/SxcInstance';
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { Environment } from '../environment/Environment';
export interface SxcController {
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals;
    sysinfo: {
        version: string;
        description: string;
    };
    env: Environment;
}

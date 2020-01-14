import { Environment } from './Environment';
import { Log } from '../tools/Log';
export declare class EnvironmentMetaLoader {
    private env;
    retries: number;
    log: Log;
    constructor(env: Environment);
    loadMetaFromHeader(forceFallback?: boolean): void;
    private getMeta;
}

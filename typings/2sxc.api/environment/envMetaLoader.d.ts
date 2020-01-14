import { Environment } from './Environment';
import { Log } from '../log';
export declare class EnvironmentMetaLoader {
    private env;
    retries: number;
    log: Log;
    constructor(env: Environment);
    loadMetaFromHeader(forceFallback?: boolean): void;
    private getMeta;
}

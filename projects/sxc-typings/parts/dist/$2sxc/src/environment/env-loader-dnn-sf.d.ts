import { SxcGlobalEnvironment } from '.';
import { HasLog } from '../../../core';
/**
 * This helps load environment information from DNN ServicesFramework - it's a fallback in case the other mechanisms fail
 * @internal
 */
export declare class EnvironmentDnnSfLoader extends HasLog {
    env: SxcGlobalEnvironment;
    constructor(env: SxcGlobalEnvironment);
    /**
     * This will assume the new parameter injection failed and it will attempt to fallback
     * it's for backward compatibility, in case something is using $2sxc and doesn't provide the new
     * implementation
     */
    dnnSfFallback(): void;
    private dnnSfLoadWhenDocumentReady;
}

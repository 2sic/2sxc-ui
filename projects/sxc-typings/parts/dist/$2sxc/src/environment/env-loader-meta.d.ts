import { EnvironmentSpecs } from '..';
import { SxcGlobalEnvironment } from '.';
import { HasLog, Log } from '../../../core';
/**
 * This loads environment information from the meta-header tag.
 * Because of timing issues, it will try multiple times
 * @internal
 */
export declare class EnvironmentMetaLoader extends HasLog {
    env: SxcGlobalEnvironment;
    retries: number;
    log: Log;
    private dynamicPageHelper;
    constructor(env: SxcGlobalEnvironment);
    loadMetaFromHeader(forceFallback?: boolean): void;
    updateEnv(newJsInfo: EnvironmentSpecs): void;
    getMetaContent(): string;
    getJsApiMetaTag(): Element;
    /**
     * Watch for changes in our special meta header, to update the variables.
     * Important for Oqtane, which changes the page on the fly without reloading.
     */
    startMetaTagObserver(): void;
    private observer;
}

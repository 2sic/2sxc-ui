import { Log } from '../../../core';
import { EnvironmentMetaLoader } from './env-loader-meta';
/**
 * Special loader for dynamic pages like Oqtane, where content can change at runtime
 * @internal
 */
export declare class EnvironmentLoaderDynamic {
    private mainLoader;
    log: Log;
    constructor(mainLoader: EnvironmentMetaLoader);
    /**
     * Watch for changes in our special meta header, to update the variables.
     * Important for Oqtane, which changes the page on the fly without reloading.
     */
    startMetaTagObserver(attribute: string): void;
    private observer;
    /**
     * Load RequestVerificationToken from the hidden form-field in Oqtane
     */
    startInputRvtObserver(): void;
    private inputRvtObserver;
    private loadRvtFromHiddenInput;
}

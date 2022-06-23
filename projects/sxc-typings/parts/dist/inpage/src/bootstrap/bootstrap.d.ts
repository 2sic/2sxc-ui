import { Sxc } from '../../../$2sxc/src';
import { HasLog } from '../core';
/**
 * This contains everything necessary to bootstrap the edit mode.
 * It must be initialized and started at the end in the x-bootstrap code,
 * to ensure everything is already ready and loaded
 * @internal
 */
export declare class BootstrapInPage extends HasLog {
    constructor();
    private initializedInstances;
    private openedTemplatePickerOnce;
    private diagCancelStateOnStart;
    initialize(): void;
    /**
     * Scan all instances and initialize them
     * @param isFirstRun should be true only on the very initial call
     */
    private initAllInstances;
    /**
     * create an observer instance and start observing
     */
    private watchDomChanges;
    /**
     * Show the template picker if
     * - template picker has not yet been opened
     * - dialog has not been cancelled
     * - only one uninitialized module on page
     * @returns
     */
    private tryShowTemplatePicker;
    private initInstance;
    private showGlassesButtonIfUninitialized;
    isInitialized(sxci: Sxc): boolean;
}

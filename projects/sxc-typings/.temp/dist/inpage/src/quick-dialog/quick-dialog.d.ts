import { IIFrameBridge } from '.';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog } from '../core';
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 * @internal
 */
export declare class QuickDialog extends HasLog {
    /** Singleton */
    static singleton(): QuickDialog;
    private static _singleton;
    private container;
    private constructor();
    /**
     * Determines if a.ny dialog is currently showing
     */
    isVisible(): boolean;
    /**
     * toggle visibility
     * @param {boolean} [show] true/false optional
     */
    setVisible(show: boolean): void;
    /**
     * show / reset the current iframe to use new url and callback
     * @param {ContextComplete} context object
     * @param {string} url - url to show
     * @param {function()} closeCallback - callback event
     * @param {boolean} isFullscreen - if it should open full screen
     * @param {string} [dialogName] - optional name of dialog, to check if it's already open
     * @returns {Promise<boolean>}
     */
    showOrToggleFromToolbar(context: ContextComplete, url: string, isFullscreen: boolean, dialogName: string): Promise<boolean>;
    cancel(bridge: IIFrameBridge): void;
    private rememberDialogState;
    private promise;
    private resolvePromise;
    private promiseRestart;
    /**
     * rewrite the url to fit the quick-dialog situation
     * optionally with a live-compiled version from ng-serve
     * @param {string} url - original url pointing to the default dialog
     * @returns {string} new url pointing to quick dialog
     */
    private setUrlToQuickDialog;
}

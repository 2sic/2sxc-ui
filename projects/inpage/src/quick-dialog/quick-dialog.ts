import { IDialogFrameElement, IIFrameBridge } from '.';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Insights } from '../core';
import { IFrameBridge } from './iframe-bridge';
import { QuickDialogContainer } from './quick-dialog-container';
import * as QuickEditState from './state';

const diagShowClass: string = 'dia-select';

/** dialog manager - the currently active dialog object */
let current: IDialogFrameElement = null;

interface IFrameWindow extends Window {
    reboot(): void;
}

/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 * @internal
 */
export class QuickDialog extends HasLog {

    /** Singleton */
    public static singleton(): QuickDialog {
        return this._singleton ?? (this._singleton = new QuickDialog());
    }
    private static _singleton: QuickDialog;


    private container: QuickDialogContainer;
    private constructor() {
        super('Qdl.Managr');
        Insights.add('quick-dialog', 'manager', this.log);
        this.container = new QuickDialogContainer(this);
    }

    /**
     * Determines if a.ny dialog is currently showing
     */
    isVisible() {
        return current != null;
    }

    /**
     * toggle visibility
     * @param {boolean} [show] true/false optional
     */
    setVisible(show: boolean): void {
        const cl = this.log.call('setVisible');
        const cont = this.container.getOrCreate();
        cont.classList.toggle(diagShowClass, show);
        this.rememberDialogState(this.container.getIFrame(cont), show);
        current = show ? this.container.getIFrame() : null;
        cl.done();
    }

    /**
     * show / reset the current iframe to use new url and callback
     * @param {ContextComplete} context object
     * @param url - url to show
     * @param {function()} closeCallback - callback event
     * @param {boolean} isFullscreen - if it should open full screen
     * @param [dialogName] - optional name of dialog, to check if it's already open
     * @returns {Promise<boolean>}
     */
    showOrToggleFromToolbar(
        context: ContextComplete,
        url: string,
        isFullscreen: boolean,
        dialogName: string,
    ): Promise<boolean> {
        const cl = this.log.call('showOrToggleFromToolbar', `ctx, url: '${url}', isFullScreen:${isFullscreen}, name:'${dialogName}'`);
        this.container.setSize(isFullscreen);
        const iFrame = this.container.getIFrame();

        // in case it's a toggle
        if (this.isVisible()) {
            cl.add('is already visible');
            // check if we're just toggling the current, or will show a new one afterwards
            const isForSame = dialogName && current
                && (current.bridge as IFrameBridge).isConfiguredFor(context.sxc.cacheKey, dialogName);
            const togglePromise = isForSame ? this.promise : null;
            this.cancel(current.bridge);
            // just a hide this, return the old promise
            if (togglePromise) return cl.return(togglePromise, 'just toggle off');
        }

        const dialogUrl = this.setUrlToQuickDialog(url);
        (iFrame.bridge as IFrameBridge).setup(context.sxc, dialogName);
        iFrame.setAttribute('src', dialogUrl);
        // if the window had already been loaded, re-init
        if (iFrame.contentWindow && (iFrame.contentWindow as IFrameWindow).reboot)
            (iFrame.contentWindow as IFrameWindow).reboot();

        // make sure it's visible'
        this.setVisible(true);
        return cl.return(this.promiseRestart(), 'restart');
    }

    cancel(bridge: IIFrameBridge) {
        const callLog = this.log.call('cancel');
        this.setVisible(false);
        QuickEditState.cancelled.set('true');
        this.resolvePromise(bridge.changed);
        callLog.done();
    }

    private rememberDialogState(
        iframe: IDialogFrameElement,
        state: boolean,
    ): void {
        const callLog = this.log.call('rememberDialogState');
        callLog.add(`qDialog persistDia(..., ${state})`);
        if (state) {
            const cbId = (iframe.bridge as IFrameBridge)
                .getContext()
                .contentBlockReference.id.toString();
            callLog.add(`contentBlockId: ${cbId})`);
            return callLog.return(QuickEditState.cbId.set(cbId));
        }
        return callLog.return(QuickEditState.cbId.remove(), 'remove');
    }

    //#region promise handling
    private promise: Promise<boolean>;
    private resolvePromise: (value?: boolean) => void;
    private promiseRestart(): Promise<boolean> {
        this.promise = new Promise<boolean>(
            (resolve) => (this.resolvePromise = resolve),
        );
        return this.promise;
    }
    //#endregion

    /**
     * rewrite the url to fit the quick-dialog situation
     * optionally with a live-compiled version from ng-serve
     * @param url - original url pointing to the default dialog
     * @returns {string} new url pointing to quick dialog
     */
    private setUrlToQuickDialog(url: string): string {
        const cl = this.log.call('setUrlToQuickDialog', url);
        // change default url-schema from the primary angular-app to the quick-dialog
        url = url.replace(C.DialogPaths.eavUi, C.DialogPaths.quickDialog);
        return cl.return(url);
    }
}

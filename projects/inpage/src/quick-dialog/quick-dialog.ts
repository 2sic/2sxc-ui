import { IDialogFrameElement } from '.';
import { CmdItemHistory } from '../commands';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Insights } from '../logging';
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
 */
class QuickDialogManagerSingleton extends HasLog {
    private container: QuickDialogContainer;
    constructor() {
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
    setVisible(show: boolean, dialogName?: string): void {
        const cl = this.log.call('setVisible');
        const cont = this.container.getOrCreate();
        cont.toggleClass(diagShowClass, show);
        // remember the state if it's a normal dialog, but not on history
        // this ensures the dialog pops up again after a page reload
        const rememberShowState = (dialogName === CmdItemHistory) ? false : show ;
        this.rememberDialogState(this.container.getIFrame(cont), rememberShowState);
        current = show ? this.container.getIFrame() : null;
        cl.done();
    }

    /**
     * show / reset the current iframe to use new url and callback
     * @param {ContextComplete} context object
     * @param {string} url - url to show
     * @param {function()} closeCallback - callback event
     * @param {boolean} isFullscreen - if it should open full screen
     * @param {string} [dialogName] - optional name of dialog, to check if it's already open
     * @returns {Promise<boolean>} jquery object of the iframe
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
                && current.bridge.isConfiguredFor(context.sxc.cacheKey, dialogName);
            const togglePromise = isForSame ? this.promise : null;
            this.cancel(current.bridge);
            // just a hide this, return the old promise
            if (togglePromise) return cl.return(togglePromise, 'just toggle off');
        }

        const dialogUrl = this.setUrlToQuickDialog(url);
        iFrame.bridge.setup(context.sxc, dialogName);
        iFrame.setAttribute('src', dialogUrl);
        // if the window had already been loaded, re-init
        if (iFrame.contentWindow && (iFrame.contentWindow as IFrameWindow).reboot)
            (iFrame.contentWindow as IFrameWindow).reboot();

        // make sure it's visible'
        this.setVisible(true, dialogName);
        return cl.return(this.promiseRestart(), 'restart');
    }

    cancel(bridge: IFrameBridge) {
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
                .contentBlock.id.toString();
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
     * @param {string} url - original url pointing to the default dialog
     * @returns {string} new url pointing to quick dialog
     */
    private setUrlToQuickDialog(url: string): string {
        const cl = this.log.call('setUrlToQuickDialog', url);
        // change default url-schema from the primary angular-app to the quick-dialog
        url = url
            // 2020-07-31 #2134 .replace(C.DialogPaths.ng1, C.DialogPaths.quickDialog)
            .replace(C.DialogPaths.ng8, C.DialogPaths.quickDialog);
        url = this.changePathToLocalhostForDev(url);
        return cl.return(url);
    }


    /**
     * special debug-code when running on local ng-serve
     * this is only activated if the developer manually sets a value in the localStorage
     * @param url
     */
    private changePathToLocalhostForDev(url: string): string {
        const cl = this.log.call('changePathToLocalhostForDev', url);
        try {
            const devMode = localStorage.getItem('devMode');
            if (devMode && !!devMode)
                return url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
        } catch (e) {
            // ignore
        }
        return cl.return(url);
    }
}

export let QuickDialog = new QuickDialogManagerSingleton();





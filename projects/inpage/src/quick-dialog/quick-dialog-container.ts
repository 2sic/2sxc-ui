import { IDialogFrameElement, IFrameBridge } from '.';
import { HasLog, NoJQ } from '../logging/';
import { QuickDialog } from './quick-dialog';

/**
 * this is a dialog manager which is in charge of all quick-dialoges
 * it always has a reference to the latest dialog created by a.ny module instance
 */

const containerClass = 'inpage-frame-wrapper';
const iframeClass = 'inpage-frame';
const iframeTag = 'iframe';
const containerTemplate = `<div class="${containerClass}"><div class="${iframeClass}"></div></div>`;
const resizeInterval = 200;


export class QuickDialogContainer extends HasLog {

    constructor(quickDialog: QuickDialog) {
        super('QDl.Contnr', quickDialog.log);
    }

    private isFullscreen: boolean = false;
    private resizeWatcher: number = null;
    /**
     * get the current container
     * @returns {element} html element of the div
     */
    getOrCreate(): HTMLElement {
        const container = document.querySelector<HTMLElement>(`.${containerClass}`);
        return container ?? this.buildContainerAndIFrame();
    }

    /**
     * build the container in the dom w/iframe for re-use
     * @return {HTMLElement} dom-object
     */
    private buildContainerAndIFrame(): HTMLElement {
        const callLog = this.log.call('buildContainerAndIFrame');
        const container = NoJQ.domFromString(containerTemplate)[0];
        if (document.querySelectorAll<HTMLElement>('#personaBar-iframe').length > 0)
            container.classList.add('persona-bar-visible');
        const newIFrame = document.createElement(iframeTag);
        const extendedIFrame = convertIFrameToQuickDialog(newIFrame, this);
        container.querySelector<HTMLElement>(`.${iframeClass}`).append(extendedIFrame);
        document.body.append(container);
        this.watchForResize(container);
        return callLog.return(container, 'ok');
    }

    /**
     * find the iframe which hosts the dialog
     * @param {html} [container] - html-container
     * @returns {html} iframe object
     */
    getIFrame(container?: HTMLElement): IDialogFrameElement {
        if (!container) container = this.getOrCreate();
        return container.querySelector<IDialogFrameElement>(iframeTag);
    }

    /**
     * set container css for size
     * @param {boolean} fullScreen
     */
    setSize(fullScreen: boolean): void {
        const cl = this.log.call('setSize');
        const container = this.getOrCreate();
        // set container height
        container.style.minHeight = fullScreen ? '100%' : '225px';
        this.isFullscreen = fullScreen;
        cl.done();
    }


    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     */
    private watchForResize(container: HTMLElement): void {
        // only add a timer if not already running
        if (this.resizeWatcher) return;
        const callLog = this.log.call('watchForResize');
        // if (!resizeWatcher)
        this.resizeWatcher = window.setInterval(() => {
            try {
                const frm = this.getIFrame(container);
                if (!frm) {
                    callLog.onlyAddIfNew('no iframe');
                    return;
                }

                const height: number = frm.contentDocument.body.offsetHeight;
                if (frm.previousHeight === height) {
                    callLog.onlyAddIfNew('no height change');
                    return;
                }
                frm.style.minHeight = container.style.minHeight;
                frm.style.height = height + 'px';
                frm.previousHeight = height;
                if (this.isFullscreen) {
                    frm.style.height = '100%';
                    frm.style.position = 'absolute';
                }
                callLog.onlyAddIfNew('changed to ' + height);
            } catch (e) {
                callLog.add('error', e);
            }
        }, resizeInterval);
        callLog.return(null, 'watcher added');
    }

}



function convertIFrameToQuickDialog(iFrame: HTMLIFrameElement, parent: QuickDialogContainer): IDialogFrameElement {
    const callLog = parent.log.call('build');
    callLog.data('prototype', IFrameBridge.prototype);
    const iFrameExtended = iFrame as IDialogFrameElement;
    iFrameExtended.bridge = new IFrameBridge(parent);
    callLog.data('extensions', iFrameExtended.bridge);
    return callLog.return(iFrameExtended);
}

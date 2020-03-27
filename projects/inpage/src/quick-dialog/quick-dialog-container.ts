import { HasLog, Insights } from '../logging/';
import * as DialogFrameElement from './iDialogFrameElement';
import { QuickDialog } from './quick-dialog';
import IDialogFrameElement = DialogFrameElement.IDialogFrameElement;

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

    constructor(quickDialog: typeof QuickDialog) {
        super('QDl.Contnr', quickDialog.log);
    }

    private isFullscreen: boolean = false;
    private resizeWatcher: number = null;
    /**
     * get the current container
     * @returns {element} html element of the div
     */
    getOrCreate(): JQuery {
        const container = $(`.${containerClass}`);
        return container.length > 0 ? container : this.buildContainerAndIFrame();
    }

    /**
     * build the container in the dom w/iframe for re-use
     * @return {jquery} jquery dom-object
     */
    private buildContainerAndIFrame(): JQuery {
        const callLog = this.log.call('buildContainerAndIFrame');
        const container = $(containerTemplate);
        if ($('#personaBar-iframe').length > 0)
            container.addClass('persona-bar-visible');
        const newIFrame = document.createElement(iframeTag);
        const extendedIFrame = IDialogFrameElement.build(newIFrame, this);
        container.find(`.${iframeClass}`).append(extendedIFrame);
        $('body').append(container);
        this.watchForResize(container);
        return callLog.return(container, 'ok');
    }

    /**
     * find the iframe which hosts the dialog
     * @param {html} [container] - html-container as jQuery object
     * @returns {html} iframe object
     */
    getIFrame(container?: JQuery): IDialogFrameElement {
        if (!container) container = this.getOrCreate();
        return container.find(iframeTag)[0] as IDialogFrameElement;
    }

    /**
     * set container css for size
     * @param {boolean} fullScreen
     */
    setSize(fullScreen: boolean): void {
        const cl = this.log.call('setSize');
        const container = this.getOrCreate();
        // set container height
        container.css('min-height', fullScreen ? '100%' : '225px');
        this.isFullscreen = fullScreen;
        cl.done();
    }


    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     */
    private watchForResize(container: JQuery): void {
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
                frm.style.minHeight = container.css('min-height');
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

// export const QuickDialogContainer = new QuickDialogContainerSingleton();






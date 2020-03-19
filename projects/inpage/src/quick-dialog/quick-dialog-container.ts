import * as DialogFrameElement from './iDialogFrameElement';
import IDialogFrameElement = DialogFrameElement.IDialogFrameElement;

/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 */

const containerClass = 'inpage-frame-wrapper';
const iframeClass = 'inpage-frame';
const iframeTag = 'iframe';
const containerTemplate = `<div class="${containerClass}"><div class="${iframeClass}"></div></div>`;

export class QuickDialogContainer {

    /**
     * get the current container
     * @returns {element} html element of the div
     */
    static getOrCreate(): JQuery {
        const container = $(`.${containerClass}`);
        return container.length > 0 ? container : buildContainerAndIFrame();
    }

    /**
     * find the iframe which hosts the dialog
     * @param {html} [container] - html-container as jQuery object
     * @returns {html} iframe object
     */
    static getIFrame(container?: JQuery): IDialogFrameElement {
        if (!container) container = QuickDialogContainer.getOrCreate();
        return container.find(iframeTag)[0] as IDialogFrameElement;
    }

    /**
     * set container css for size
     * @param {boolean} fullScreen
     */
    static setSize(fullScreen: boolean): void {
        const container = QuickDialogContainer.getOrCreate();
        // set container height
        container.css('min-height', fullScreen ? '100%' : '225px');
        isFullscreen = fullScreen;
    }



    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     */
    static watchForResize(container: JQuery): void {

        if (!resizeWatcher) // only add a timer if not already running
        resizeWatcher = window.setInterval(() => {
            try {
            const frm = QuickDialogContainer.getIFrame(container);
            if (!frm) return;

            const height: number = frm.contentDocument.body.offsetHeight;
            if (frm.previousHeight === height) return;
            frm.style.minHeight = container.css('min-height');
            frm.style.height = height + 'px';
            frm.previousHeight = height;
            if (isFullscreen) {
                frm.style.height = '100%';
                frm.style.position = 'absolute';
            }
            } catch (e) {
            // ignore
            }
        }, resizeInterval);
    }

}






/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame(): JQuery {
    const container = $(containerTemplate);
    if ($('#personaBar-iframe').length > 0)
        container.addClass('persona-bar-visible');
    const newIFrame = document.createElement(iframeTag);
    const extendedIFrame = IDialogFrameElement.build(newIFrame);
    container.find(`.${iframeClass}`).append(extendedIFrame);
    $('body').append(container);
    QuickDialogContainer.watchForResize(container);
    return container;
}


/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 */
let isFullscreen: boolean = false;
const resizeInterval: number = 200;
let resizeWatcher: number = null;


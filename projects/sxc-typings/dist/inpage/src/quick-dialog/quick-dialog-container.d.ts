import { IDialogFrameElement } from '.';
import { HasLog } from '../core';
import { QuickDialog } from './quick-dialog';
/**
 * @internal
 */
export declare class QuickDialogContainer extends HasLog {
    constructor(quickDialog: QuickDialog);
    private isFullscreen;
    private resizeWatcher;
    /**
     * get the current container
     * @returns {element} html element of the div
     */
    getOrCreate(): HTMLElement;
    /**
     * build the container in the dom w/iframe for re-use
     * @return {HTMLElement} dom-object
     */
    private buildContainerAndIFrame;
    /**
     * find the iframe which hosts the dialog
     * @param {html} [container] - html-container
     * @returns {html} iframe object
     */
    getIFrame(container?: HTMLElement): IDialogFrameElement;
    /**
     * set container css for size
     * @param {boolean} fullScreen
     */
    setSize(fullScreen: boolean): void;
    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     */
    private watchForResize;
}

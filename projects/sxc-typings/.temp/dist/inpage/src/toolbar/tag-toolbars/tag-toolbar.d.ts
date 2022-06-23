import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Translator } from '../../i18n';
/**
 * This is the modern toolbar which is attached to a tag from whic it hovers.
 * Internally the toolbar Dom-Elements are hidden at the bottom of the page.
 * This object is responsible for creating them,
 * and making sure that hover-events etc. cause the right toolbar to show up.
 * @internal
 */
export declare class TagToolbar {
    private readonly hoverTag;
    private readonly context;
    private translator?;
    private toolbarElement;
    private initialized;
    private follow;
    private alwaysShow;
    /**
     * A Tag-Toolbar which is outside of the module DOM and floating freely
     * @param {HTMLElement} hoverTag
     * @param {ContextComplete} context
     * @param {typeof Translator} [translator] special translator, only included because otherwise WebPack causes circular references
     * @memberof TagToolbar
     */
    constructor(hoverTag: HTMLElement, context: ContextComplete, translator?: typeof Translator);
    /**
     * Attach Mouse-Enter and Mouse-Leave events to ensure show/hide of the toolbar
     */
    private addMouseEvents;
    private initializeIfNecessary;
    private updatePosition;
    /**
     * Hide the toolbar and detach scrolling-watcher
     */
    private hide;
    /**
     * Show the toolbar
     */
    private show;
    /**
     * Always show the toolbar.
     */
    private showPermanently;
    /** Remember if scrollwatcher has been enabled */
    private watcherActive;
    /** The update function as a prebuild function, so it can be reused in on/off */
    private updateFn;
    /** Enable scroll watcher & remember */
    private activateScrollWatcher;
    /** Disable scroll watcher - if it is active */
    private disableScrollWatcher;
}

import { PositionCoordinates, QuickEditOverlay } from '.';
import { HasLog } from '../core';
import { QuickEditConfigRoot } from './quick-e-configuration';
/**
 * the quick-edit object
 * the quick-insert object
 * @internal
 */
export declare class QuickE extends HasLog {
    /** Singleton */
    static singleton(): QuickE;
    private static _singleton;
    body: HTMLElement;
    main: QuickEditOverlay.Main;
    template: string;
    selected: QuickEditOverlay.Selection;
    contentBlocks: HTMLElement[];
    cachedPanes: HTMLElement[];
    modules: HTMLElement[];
    nearestCb: PositionCoordinates;
    nearestMod: PositionCoordinates;
    cbActions: HTMLElement[];
    modActions: HTMLElement[];
    config: QuickEditConfigRoot;
    bodyOffset: PositionCoordinates;
    private constructor();
    start(): void;
    /**
     * reset the quick-edit
     * for example after ajax-loading a content-block, which may cause changed configurations
     */
    reset(): void;
    /**
     * This checks if the page has any alternate configuration
     * Note that it's also used after ajax refreshes, which can change the config
     * So if it does reconfigure itself, it will start with the default config again
     */
    loadPageConfig(): void;
    /**
     * existing inner blocks found? Will affect if modules can be quick-inserted...
     */
    private detectWhichMenusToActivate;
    private enable;
    prepareToolbarInDom(): void;
    /**
     * cache the panes which can contain modules
     */
    private initPanes;
    /**
     * start watching for mouse-move
     */
    private initWatchMouse;
    private logConfig;
}

import { i18n } from 'i18next';
import { ContextComplete } from '../context/bundles';
import { HasLog } from '../core';
import { EditManager } from '../manage/edit-manager';
declare class TranslatorGlobal extends HasLog {
    i18n: i18n;
    private locReady;
    private initialized;
    constructor();
    translate(key: string): string;
    /**
     * Initialize a manager-object on a 2sxc-instance
     */
    initManager(manage: EditManager): void;
    tryToFindAContext(): ContextComplete;
    /**
     * Initialize loc and auto-translate menu nodes in the DOM
     * This is called when the initialize-promise resolves
     */
    initLoc(): void;
    /**
     * Tell loc to translate all the translatable menu nodes
     * Do this on initial load, and every time dynamic content gets re-created
     */
    autoTranslateMenus(): void;
}
/**
 * @internal
 */
export declare const Translator: TranslatorGlobal;
export {};

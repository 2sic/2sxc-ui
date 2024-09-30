import i18next, { i18n } from 'i18next';
import XHR from 'i18next-http-backend';
// @ts-ignore
import locI18next from 'loc-i18next';
import { primaryLanguage, translations, translationsPath } from '.';
import { IDs } from '../constants/ids';
import { ContextComplete } from '../context/bundles';
import { HasLog, Insights, urlClean } from '../core';
import { EditManager } from '../manage/edit-manager';
import { SxcTools } from '../sxc/sxc-tools';

let localize: any;
// let initialized: boolean = false;

class TranslatorGlobal extends HasLog {
    i18n: i18n;

    private locReady = false;
    private initialized = false;

    constructor() {
        super('Sys.Trnslt');
        Insights.add('system', 'translator', this.log);
        this.i18n = i18next;
    }

    translate(key: string): string {
        if (!this.initialized) return key;
        if (!this.i18n.isInitialized) return key;
        return this.i18n.t(key) || key;
    }

    /**
     * Initialize a manager-object on a 2sxc-instance
     */
    initManager(manage: EditManager): void {
        const cl = this.log.call('initManager');
        if (this.initialized) return cl.done('already initialized');

        const context = manage.context || this.tryToFindAContext();

        cl.add('will initialize');
        const realRootPath = window.$2sxc.env.uiRoot();
        this.i18n
            .use(XHR)
            .init({
                lng: context.app.currentLanguage.substr(0, 2),
                fallbackLng: primaryLanguage,
                // whitelist: translations,
                preload: [primaryLanguage],
                backend: {
                    loadPath: urlClean(realRootPath + translationsPath),
                },
            }, () => this.initLoc());
        this.initialized = true;
        cl.done();
    }

    tryToFindAContext(): ContextComplete {
        const cl = this.log.call('tryToFindAContext');
        cl.add('no context found, will seek');
        // trying to get context...
        const htmlElementOrId = document.querySelector<HTMLElement>('div[data-cb-id]');
        this.initialized = true; // the next SxcEdit.get will call _translate so we must set true to prevent loops
        const sxc = window.$2sxc(htmlElementOrId);
        this.initialized = false; // for real, it is not initialized...
        const editContext = SxcTools.getEditContext(sxc);
        const context = new ContextComplete(editContext, sxc);
        context.sxc = sxc;
        return cl.return(context);
    }

    /**
     * Initialize loc and auto-translate menu nodes in the DOM
     * This is called when the initialize-promise resolves
     */
    initLoc() {
        const cl = this.log.call('initLoc');
        // for options see https://github.com/mthh/loc-i18next#initialize-the-plugin
        localize = locI18next.init(i18next);
        this.locReady = true;
        this.autoTranslateMenus();
        cl.done();
    }

    /**
     * Tell loc to translate all the translatable menu nodes
     * Do this on initial load, and every time dynamic content gets re-created
     */
    autoTranslateMenus() {
        const cl = this.log.call('autoTranslateMenus');
        if (!this.locReady) return cl.done('loc not ready');
        // start localizing, details: https://github.com/mthh/loc-i18next#usage-of-selector-function
        const menus = document.querySelectorAll<HTMLElement>(IDs.sel.tagScMenu);
        localize(IDs.sel.tagScMenu); // inline toolbars
        const quickEButtons = document.querySelectorAll<HTMLElement>('.sc-i18n');
        localize('.sc-i18n'); // quick-insert menus
        cl.add(`found ${menus.length} menus and ${quickEButtons.length} buttons`);
        cl.done();
    }
}

/**
 * @internal
 */
export const Translator = new TranslatorGlobal();

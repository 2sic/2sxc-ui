import i18next, { i18n } from 'i18next';
import XHR from 'i18next-xhr-backend';
import { primaryLanguage, translations, translationsPath } from '.';
import { ContextComplete } from '../context/bundles';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { HasLog, Insights } from '../logging';
import { EditManager } from '../manage/edit-manager';

// tslint:disable-next-line: no-var-requires
const jqueryI18next = require('jquery-i18next/jquery-i18next');

// let initialized: boolean = false;

class TranslatorGlobal extends HasLog {
    i18n: i18n;

    private jQueryReady = false;
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

        const context = manage._context || this.tryToFindAContext();

        cl.add('will initialize');
        this.i18n
            .use(XHR)
            .init({
                lng: context.app.currentLanguage.substr(0, 2),
                fallbackLng: primaryLanguage,
                whitelist: translations,
                preload: [primaryLanguage],
                backend: {
                    loadPath: context.instance.sxcRootUrl + translationsPath,
                },
            }, () => this.initjQuery());
        this.initialized = true;
        cl.done();
    }

    tryToFindAContext(): ContextComplete {
        const cl = this.log.call('tryToFindAContext');
        cl.add('no context found, will seek');
        // trying to get context...
        const htmlElementOrId = $('div[data-cb-id]')[0];
        this.initialized = true; // the next SxcEdit.get will call _translate so we must set true to prevent loops
        const sxc = SxcEdit.get(htmlElementOrId);
        this.initialized = false; // for real, it is not initialized...
        const editContext = SxcEdit.getEditContext(sxc);
        const context = new ContextComplete(editContext);
        context.sxc = sxc;
        return cl.return(context);
    }

    /**
     * Initialize jQuery and auto-translate menu nodes in the DOM
     * This is called when the initialize-promise resolves
     */
    initjQuery() {
        const cl = this.log.call('initJQuery');
        // for options see https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $);
        this.jQueryReady = true;
        this.autoTranslateMenus();
        cl.done();
    }

    /**
     * Tell jQuery to translate all the translatable menu nodes
     * Do this on initial load, and every time dynamic content gets re-created
     */
    autoTranslateMenus() {
        const cl = this.log.call('autoTranslateMenus');
        if (!this.jQueryReady) return cl.done('jQuery not ready');
        // start localizing, details: https://github.com/i18next/jquery-i18next#usage-of-selector-function
        const menus = $('ul.sc-menu');
        menus.localize(); // inline toolbars
        const quickEButtons = $('.sc-i18n');
        quickEButtons.localize();   // quick-insert menus
        cl.add(`found ${menus.length} menus and ${quickEButtons.length} buttons`);
        cl.done();
    }
}

export const Translator = new TranslatorGlobal();

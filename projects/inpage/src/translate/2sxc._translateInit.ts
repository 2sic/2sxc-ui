import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { EditManager } from '../manage/edit-manager';

const jqueryI18next = require('jquery-i18next/jquery-i18next');

let initialized: boolean = false;

// ReSharper disable once InconsistentNaming
export function _translateInit(manage: EditManager): void {
  if (initialized) {
    return;
  }

  let context = manage._context;
  if (!context) {
    initialized = true; // getScxInstance is calling _translate so that we can skip the loop...
    // trying to get context...
    const htmlElementOrId = $('div[data-cb-id]')[0];
    const sxc = SxcEdit.get(htmlElementOrId);
    initialized = false; // for real, it is not initialized...
    const editContext = SxcEdit.getEditContext(sxc);
    context = new ContextComplete(editContext);
    context.sxc = sxc;
  }

  i18n
    .use(XHR)
    .init({
      lng: context.app.currentLanguage.substr(0, 2), // "en",
      fallbackLng: 'en',
      whitelist: ['en', 'de', 'fr', 'it', 'uk', 'nl'],
      preload: ['en'],
      backend: {
        loadPath: context.instance.sxcRootUrl + 'desktopmodules/tosic_sexycontent/dist/i18n/inpage-{{lng}}.js',
      },
      // ReSharper disable UnusedParameter
    },
      () => {
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        // ReSharper disable once TsResolvedFromInaccessibleModule
        jqueryI18next.init(i18n, $);
        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('ul.sc-menu').localize(); // inline toolbars
        $('.sc-i18n').localize(); // quick-insert menus
    });
  initialized = true;
}

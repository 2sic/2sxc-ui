import * as i18next from './libs/i18next.min';
import * as i18nextXHRBackend from './libs/i18nextXHRBackend.min';
import * as jqueryI18next from './libs/jquery-i18next.min';
import { createContextFromEditContext } from '../context/context';
import { windowInPage as window } from '../interfaces/window-in-page';
import { getEditContext } from '../manage/api';
import { getSxcInstance } from '../x-bootstrap/sxc';

/**
 * initialize the translation system; ensure toolbars etc. are translated
 */

window.i18next = i18next;
window.i18nextXHRBackend = i18nextXHRBackend;

let initialized: boolean = false;

// ReSharper disable once InconsistentNaming
export function _translateInit(manage: any): void {
  if (initialized) {
    return;
  }

  let context = manage._context;
  if (!context) {
    initialized = true; // getScxInstance is calling _translate so that we can skip the loop...
    // trying to get context...
    const htmlElementOrId = $('div[data-cb-id]')[0];
    const sxc = getSxcInstance(htmlElementOrId);
    initialized = false; // for real, it is not initialized...
    const editContext = getEditContext(sxc);
    context = createContextFromEditContext(editContext);
    context.sxc = sxc;
  }

  //console.log('stv: compare #1',
  //  manage._editContext.Language.Current.substr(0, 2),
  //  context.app.currentLanguage.substr(0, 2));

  //console.log('stv: compare #2',
  //  manage._editContext.Environment.SxcRootUrl,
  //  context.instance.sxcRootUrl);

  window.i18next
    .use(i18nextXHRBackend)
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
      (err: any, t: any) => {
        // ReSharper restore UnusedParameter
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        // ReSharper disable once TsResolvedFromInaccessibleModule
        jqueryI18next.init(i18next, $);
        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('ul.sc-menu').localize(); // inline toolbars
        $('.sc-i18n').localize(); // quick-insert menus
    });
  initialized = true;
}

import { ContextComplete } from '../context/bundles/context-bundle-button';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../interfaces/window-in-page';
import { EditManager } from '../manage/edit-manager';
import { TypeUnsafe, TypeWeDontCare } from '../plumbing';
import * as i18next from './libs/i18next.min';
import * as i18nextXHRBackend from './libs/i18nextXHRBackend.min';
import * as jqueryI18next from './libs/jquery-i18next.min';

/**
 * initialize the translation system; ensure toolbars etc. are translated
 */
interface Windowi18n extends Window {
    i18next: TypeWeDontCare;
    i18nextXHRBackend: TypeWeDontCare;
}
const win18n = window as TypeUnsafe as Windowi18n;
win18n.i18next = i18next;
win18n.i18nextXHRBackend = i18nextXHRBackend;

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

  win18n.i18next
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
      () => {
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

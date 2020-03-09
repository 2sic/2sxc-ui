import { DialogPaths } from '../settings/DialogPaths';


/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the default dialog
 * @returns {string} new url pointing to quick dialog
 */
export function setUrlToQuickDialog(url: string): string {
  // change default url-schema from the primary angular-app to the quick-dialog
  url = url.replace(DialogPaths.ng1, DialogPaths.quickDialog)
    .replace(DialogPaths.ng8, DialogPaths.quickDialog);
  url = changePathToLocalhostForDev(url);
  return url;
}

/**
 * special debug-code when running on local ng-serve
 * this is only activated if the developer manually sets a value in the localStorage
 * @param url
 */
function changePathToLocalhostForDev(url: string): string {
  try {
    const devMode = localStorage.getItem('devMode');
    if (devMode && !!devMode) {
      return url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
    }
  } catch (e) {
    // ignore
  }
  return url;
}

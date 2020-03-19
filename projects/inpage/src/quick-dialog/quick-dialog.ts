import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { DebugConfig } from '../DebugConfig';
import IDialogFrameElement = DialogFrameElement.IDialogFrameElement;
import { DialogPaths } from '../settings/DialogPaths';
import { QuickDialogContainer } from './quick-dialog-container';
import * as DialogFrameElement from './iDialogFrameElement';
import { IFrameBridge } from './iframe-bridge';
import * as QuickEditState from './state';

const dbg = DebugConfig.qDialog;
const diagShowClass: string = 'dia-select';

/** dialog manager - the currently active dialog object */
let current: IDialogFrameElement = null;

interface iframeWindow extends Window {
    reboot(): void;
}

/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 */
export class QuickDialogManager {
  /**
   * Determines if a.ny dialog is currently showing
   */
  isVisible() {
    return current != null;
  }

  /**
   * toggle visibility
   * @param {boolean} [show] true/false optional
   */
  setVisible(show: boolean): void {
    const cont = QuickDialogContainer.getOrCreate();
    // if (show === undefined)
    //  show = !cont.hasClass(diagShowClass);
    // show/hide visually
    cont.toggleClass(diagShowClass, show);
    this.rememberDialogState(QuickDialogContainer.getIFrame(cont), show);
    current = show ? QuickDialogContainer.getIFrame() : null;
  }

  /**
   * show / reset the current iframe to use new url and callback
   * @param {ContextBundleButton} context object
   * @param {string} url - url to show
   * @param {function()} closeCallback - callback event
   * @param {boolean} isFullscreen - if it should open full screen
   * @param {string} [dialogName] - optional name of dialog, to check if it's already open
   * @returns {Promise<boolean>} jquery object of the iframe
   */
  showOrToggleFromToolbar(
    context: ContextBundleButton,
    url: string,
    isFullscreen: boolean,
    dialogName: string,
  ): Promise<boolean> {
    QuickDialogContainer.setSize(isFullscreen);
    const iFrame = QuickDialogContainer.getIFrame();

    // in case it's a toggle
    if (this.isVisible()) {
      // check if we're just toggling the current, or will show a new one afterwards
      const currentPromise =
        dialogName &&
        current &&
        current.bridge.isConfiguredFor(context.sxc.cacheKey, dialogName)
          ? this.promise
          : null;
      this.cancel(current.bridge);
      // just a hide this, return the old promise
      if (currentPromise) return currentPromise;
    }

    const dialogUrl = setUrlToQuickDialog(url);
    iFrame.bridge.setup(context.sxc, dialogName);
    iFrame.setAttribute('src', dialogUrl);
    // if the window had already been loaded, re-init
    if (iFrame.contentWindow && (iFrame.contentWindow as iframeWindow).reboot)
      (iFrame.contentWindow as iframeWindow).reboot();

    // make sure it's visible'
    this.setVisible(true);
    return this.promiseRestart();
  }

  cancel(bridge: IFrameBridge) {
    this.setVisible(false);
    QuickEditState.cancelled.set('true');
    this.resolvePromise(bridge.changed);
  }

  private rememberDialogState(
    iframe: IDialogFrameElement,
    state: boolean,
  ): void {
    if (dbg.showHide) console.log(`qDialog persistDia(..., ${state})`);
    if (state) {
      const cbId = (iframe.bridge as IFrameBridge)
        .getContext()
        .contentBlock.id.toString();
      if (dbg.showHide) console.log(`contentBlockId: ${cbId})`);
      return QuickEditState.cbId.set(cbId);
    } else return QuickEditState.cbId.remove();
  }

  //#region promise handling
  private promise: Promise<boolean>;
  private resolvePromise: (value?: boolean) => void;
  private promiseRestart(): Promise<boolean> {
    this.promise = new Promise<boolean>(
      (resolve) => (this.resolvePromise = resolve),
    );
    return this.promise;
  }
  //#endregion
}

export let quickDialog = new QuickDialogManager();

/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the default dialog
 * @returns {string} new url pointing to quick dialog
 */
function setUrlToQuickDialog(url: string): string {
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

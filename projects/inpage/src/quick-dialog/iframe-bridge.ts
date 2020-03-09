import { renderer } from '../contentBlock/render';
import { updateTemplateFromDia } from '../contentBlock/templates';
import { context } from '../context/context';
import { ContextOfButton } from '../context/context-of-button';
import * as Iiframebridge from '../interfaces/iiframe-bridge';
import { IQuickDialogConfig } from '../interfaces/iquick-dialog-config';
import { getTag } from '../manage/api';
import { IDialogFrameElement } from './iDialogFrameElement';
import { quickDialog } from './quick-dialog';
import { QuickDialogConfig } from './quick-dialog-config';
import IIFrameBridge = Iiframebridge.IIFrameBridge;

const scrollTopOffset: number = 80;
const animationTime: number = 400;

export function build(iFrame: HTMLIFrameElement): IDialogFrameElement {
  console.log('prot: ', IFrameBridge.prototype);
  const iFrameExtended = iFrame as IDialogFrameElement;
  iFrameExtended.bridge = new IFrameBridge();
  console.log('extensions: ', iFrameExtended.bridge);
  return iFrameExtended;
}

/**
 *
 */
// ReSharper disable once InconsistentNaming
export class IFrameBridge implements IIFrameBridge {

  private sxcCacheKey: string;
  private dialogName: string;

  /** internal object to keep track of the sxc-instance */
  private instanceSxc: SxcInstanceWithInternals;

  /** The html-tag of the current module */
  private tagModule: JQuery<HTMLElement>;

  /**
   * get the sxc-object of this iframe
   * @returns {Object<any>} refreshed sxc-object
   */
  private uncachedSxc(): SxcInstanceWithInternals {
    if (!this.instanceSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
    return this.instanceSxc.recreate();
  }

  getContext(): ContextOfButton { return context(this.uncachedSxc()); }

  getAdditionalDashboardConfig() { return QuickDialogConfig.fromContext(this.getContext()); }

  hide(): void { quickDialog.setVisible(false); }

  run(verb: string) { this.uncachedSxc().manage.run(verb); }

  cancel(): void { quickDialog.cancel(this); }

  showMessage(message: string) {
    renderer.showMessage(this.getContext(), `<p class="no-live-preview-available">${message}</p>`);
    scrollToTarget(this.tagModule);
  }

  reloadAndReInit(): Promise<IQuickDialogConfig> {
    this.changed = false;
    return renderer.reloadAndReInitialize(this.getContext(), true, true)
      .then(() => scrollToTarget(this.tagModule))
      .then(() => Promise.resolve(this.getAdditionalDashboardConfig()));
  }

  setTemplate(templateId: number, templateName: string, final: boolean): Promise<boolean> {
    this.changed = true;
    const config = this.getAdditionalDashboardConfig(),
      context = this.getContext();
    const ajax = config.isContent || config.supportsAjax;

    // add msg on full-reload, as it takes longer
    // don't add this on ajax, as it will have side-effects because sometimes
    // in ajax the content won't be replaced
    if (!ajax)
      this.showMessage(`refreshing <b>${templateName}</b>...`);

    const reallySave = final || !ajax;
    let promise = reallySave
      ? updateTemplateFromDia(context, templateId)
      : renderer.ajaxLoad(context, templateId, true);

    if (final) promise = promise
      .then(() => quickDialog.setVisible(false));

    promise = ajax
      ? promise.then(() => scrollToTarget(this.tagModule))
      : promise.then(() => window.parent.location.reload());

    // return true if ajax, so upstream can update UIs
    return promise.then(() => ajax);
  }

  changed = false;

  /**
   * prepare the bridge with the info of the current instance
   */
  setup(sxc: SxcInstanceWithInternals, dialogName: string): void {
    console.log('rewire with sxc: ', sxc);

    this.changed = false;
    this.instanceSxc = sxc;
    this.tagModule = $($(getTag(sxc)).parent().eq(0));
    this.sxcCacheKey = sxc.cacheKey;
    if (dialogName)
      this.dialogName = dialogName;
  }

  /**
  * check if the dialog is showing for the current sxc-instance
  * @param {string} dialogName - name of dialog
  * @returns {boolean} true if it's currently showing for this sxc-instance
  */
  isConfiguredFor(instanceId: string, dialogName: string): boolean {
    return this.sxcCacheKey === instanceId // the iframe is showing for the current sxc
      && this.dialogName === dialogName; // the view is the same as previously
  }
}

function scrollToTarget(target: JQuery<HTMLElement>) {
  const specs = {
    scrollTop: target.offset().top - scrollTopOffset,
  } as any;
  $('body').animate(specs, animationTime);
}

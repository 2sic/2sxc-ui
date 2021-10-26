import { QuickDialogContainer } from '.';
import { IIFrameBridge } from '../../../connect-parts/inpage-quick-dialog';
import { IQuickDialogConfig } from '../../../connect-parts/inpage-quick-dialog';
import { ContentBlockEditor } from '../contentBlock/content-block-editor';
import { renderer } from '../contentBlock/render';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { HasLog, NoJQ } from '../logging';
import { TypeUnsafe } from '../plumbing/TypeTbD';
import { QuickDialog } from './quick-dialog';
import { QuickDialogConfig } from './quick-dialog-config';

const scrollTopOffset: number = 80;
const animationTime: number = 400;

/**
 *
 */
// ReSharper disable once InconsistentNaming
export class IFrameBridge extends HasLog implements IIFrameBridge {

    constructor(parent: QuickDialogContainer) {
        super('QDl.IfBrig', parent.log);
    }

    private sxcCacheKey: string;
    private dialogName: string;

    /** internal object to keep track of the sxc-instance */
    private instanceSxc: SxcEdit;

    /** The html-tag of the current module */
    private tagModule: HTMLElement;

    /**
     * get the sxc-object of this iframe
     */
    private uncachedSxc(): SxcEdit {
        if (!this.instanceSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
        return this.instanceSxc.recreate(true) as TypeUnsafe as SxcEdit;
    }

    getContext(): ContextComplete {
        const cl = this.log.call('getContext');
        return cl.return(ContextComplete.findContext(this.uncachedSxc()));
    }

    getAdditionalDashboardConfig() {
        const cl = this.log.call('getAdditionalDashboardConfig');
        return cl.return(QuickDialogConfig.fromContext(this.getContext()));
    }

    hide(): void {
        QuickDialog.singleton().setVisible(false);
    }

    run(verb: string) {
        this.uncachedSxc().manage.run(verb);
    }

    cancel(): void { QuickDialog.singleton().cancel(this); }

    showMessage(message: string) {
        const cl = this.log.call('showMessage');
        renderer.showMessage(this.getContext(), `<p class="no-live-preview-available">${message}</p>`);
        this.scrollToTarget(this.tagModule);
        cl.done();
    }

    reloadAndReInit(): Promise<IQuickDialogConfig> {
        this.changed = false;
        return renderer.reloadAndReInitialize(this.getContext(), true, true)
            .then(() => this.scrollToTarget(this.tagModule))
            .then(() => Promise.resolve(this.getAdditionalDashboardConfig()));
    }

    setTemplate(templateId: number, templateName: string, final: boolean): Promise<boolean> {
        const cl = this.log.call('setTemplate', `tid: ${templateId}, tname: ${templateName}, final: ${final}`);
        this.changed = true;
        const config = this.getAdditionalDashboardConfig();
        const context = this.getContext();
        const ajax = config.isContent || config.supportsAjax;

        // add msg on full-reload, as it takes longer
        // don't add this on ajax, as it will have side-effects because sometimes
        // in ajax the content won't be replaced
        if (!ajax)
            this.showMessage(`refreshing <b>${templateName}</b>...`);

        const reallySave = final || !ajax;
        let promise = reallySave
            ? ContentBlockEditor.updateTemplateFromDia(context, templateId)
            : renderer.ajaxLoad(context, templateId, true);

        if (final)
            promise = promise.then(() => QuickDialog.singleton().setVisible(false));

        promise = ajax
            ? promise.then(() => this.scrollToTarget(this.tagModule))
            : promise.then(() => window.parent.location.reload());

        // return true if ajax, so upstream can update UIs
        return cl.return(promise.then(() => ajax));
    }

    changed = false;

    /**
     * prepare the bridge with the info of the current instance
     */
    setup(sxc: SxcEdit, dialogName: string): void {
        const cl = this.log.call('setup');
        cl.data('rewire with sxc: ', sxc);

        this.changed = false;
        this.instanceSxc = sxc;
        this.tagModule = SxcEdit.getTag(sxc).parentElement;
        this.sxcCacheKey = sxc.cacheKey;
        if (dialogName) this.dialogName = dialogName;
        cl.done();
    }

    /**
     * check if the dialog is showing for the current sxc-instance
     * @param {string} dialogName - name of dialog
     * @returns {boolean} true if it's currently showing for this sxc-instance
     */
    isConfiguredFor(instanceId: string, dialogName: string): boolean {
        const cl = this.log.call('isConfiguredFor', `id:${instanceId}, dialog:${dialogName}`);
        const result = this.sxcCacheKey === instanceId // the iframe is showing for the current sxc
            && this.dialogName === dialogName; // the view is the same as previously
        return cl.return(result);
    }

    private scrollToTarget(target: HTMLElement): void {
        const cl = this.log.call('scrollToTarget');
        const specs: ScrollToOptions = {
            top: NoJQ.offset(target).top - scrollTopOffset,
            left: 0,
            behavior: 'smooth',
        };
        // debugger; // scrolls to wrong location. Target is wrong
        // window.scrollTo(specs);
        cl.done();
    }
}



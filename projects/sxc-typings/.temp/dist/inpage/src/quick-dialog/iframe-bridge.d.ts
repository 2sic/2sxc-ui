import { QuickDialogContainer } from '.';
import { Sxc } from '../../../$2sxc/src';
import { IIFrameBridge } from '../../../connect-parts/inpage-quick-dialog';
import { IQuickDialogConfig } from '../../../connect-parts/inpage-quick-dialog';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog } from '../core';
import { QuickDialogConfig } from './quick-dialog-config';
/**
 * @internal
 */
export declare class IFrameBridge extends HasLog implements IIFrameBridge {
    constructor(parent: QuickDialogContainer);
    private sxcCacheKey;
    private dialogName;
    /** internal object to keep track of the sxc-instance */
    private instanceSxc;
    /** The html-tag of the current module */
    private tagModule;
    /**
     * get the sxc-object of this iframe
     */
    private uncachedSxc;
    getContext(): ContextComplete;
    getAdditionalDashboardConfig(): QuickDialogConfig;
    hide(): void;
    run(verb: string): void;
    cancel(): void;
    showMessage(message: string): void;
    reloadAndReInit(): Promise<IQuickDialogConfig>;
    setTemplate(templateId: number, templateName: string, final: boolean): Promise<boolean>;
    changed: boolean;
    /**
     * prepare the bridge with the info of the current instance
     */
    setup(sxc: Sxc, dialogName: string): void;
    /**
     * check if the dialog is showing for the current sxc-instance
     * @param {string} dialogName - name of dialog
     * @returns {boolean} true if it's currently showing for this sxc-instance
     */
    isConfiguredFor(instanceId: string, dialogName: string): boolean;
    private scrollToTarget;
}

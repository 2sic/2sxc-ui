import { CmdLayout } from '../commands/command/layout';
import { C } from '../constants';
import { NoJQ } from '../interfaces/no-jquery';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../interfaces/window-in-page';
import { HasLog, Insights, Log } from '../logging';
import { TypeUnsafe } from '../plumbing';
import { QuickDialog } from '../quick-dialog';
import * as QuickEditState from '../quick-dialog/state';
import { TagToolbarManager } from '../toolbar/tag-toolbars/tag-toolbar-manager';
import { ToolbarManager } from '../toolbar/toolbar-manager';

/**
 * This contains everything necessary to bootstrap the edit mode.
 * It must be initialized and started at the end in the x-bootstrap code,
 * to ensure everything is already ready and loaded
 */
export class BootstrapInPage extends HasLog {
    constructor() {
        super('Sys.Bootst', null, 'Building Bootstrapper');
        Insights.add('system', 'bootstrap', this.log);
    }

    private initializedInstances: HTMLElement[] = [];
    private openedTemplatePickerOnce: boolean = false;
    private diagCancelStateOnStart: boolean = QuickEditState.cancelled.get();

    initialize() {
        const callLog = this.log.call('initialize');
        // reset cancelled state after one reload
        if (this.diagCancelStateOnStart) QuickEditState.cancelled.remove();

        // initialize all modules
        this.initAllInstances(true);

        // start observing the body for configured mutations
        this.watchDomChanges();
        callLog.return('done');
    }


    /**
     * Scan all instances and initialize them
     * @param isFirstRun should be true only on the very initial call
     */
    private initAllInstances(isFirstRun: boolean): void {
        const callLog = this.log.call('initAllInstances');
        document.querySelectorAll<HTMLElement>('div[data-edit-context]').forEach((e) => {
            this.initInstance(e, isFirstRun);
        });
        if (isFirstRun) this.tryShowTemplatePicker();
        callLog.return('initAllInstances done');
    }

    /**
     * create an observer instance and start observing
     */
    private watchDomChanges() {
        const callLog = this.log.call('watchDomChanges');
        const observer = new MutationObserver((m) => {
            // Watch statistics how changes were processed
            window.$2sxc.stats.watchDomChanges++;
            let processed = 0;

            // Loop through each changed item, check if it's something we want to initialize
            m.forEach((v) => {
                v.addedNodes.forEach((n) => {
                    // remove #comment and text nodes
                    if ((n as HTMLElement).matches == null) return;
                    const node = n as HTMLElement;

                    // Menus which appear also cause DOM changes, but we want to ignore these for performance reasons
                    if (node.matches('sc-menu')) return;

                    processed++;

                    // If the added node is a [data-edit-context], it is either a module or a content block which was replaced
                    // re-initialize the module
                    if (node.matches('div[data-edit-context]')) {
                        this.initInstance(node, false);
                        // in case it has inner content, try to open the picker-dialog
                        if (!QuickDialog.isVisible()) this.tryShowTemplatePicker();
                    }
                    // If the added node contains [data-edit-context] nodes, it is likely the DNN module drag manager which added
                    // the node. To prevent multiple initialization while dragging modules, we additionally check for the
                    // .active-module class which seems to be applied while dragging the module.
                    else if (node.matches(':not(.active-module)') && node.querySelectorAll<HTMLElement>('div[data-edit-context]').length > 0) {
                        node.querySelectorAll<HTMLElement>('div[data-edit-context]').forEach((e) => {
                            this.initInstance(e, false);
                        });
                    } else
                        ToolbarManager.build(node);
                });
            });

            // Clean up orphan tags if nodes have been added
            if (processed) TagToolbarManager.CleanupOrphanedToolbars();
        });

        observer.observe(document.body, {
            attributes: false,
            childList: true,
            subtree: true,
        });
        callLog.return('watchDomChanges done');
    }



    /**
     * Show the template picker if
     * - template picker has not yet been opened
     * - dialog has not been cancelled
     * - only one uninitialized module on page
     * @returns
     */
    private tryShowTemplatePicker(): boolean {
        const cl = this.log.call('tryShowTemplatePicker');
        let sxc: SxcEdit;
        // first check if we should show one according to the state-settings
        const openDialogId = QuickEditState.cbId.get();
        if (openDialogId) {
            // must check if it's on this page, as it could be from another page
            const found = document.querySelectorAll<HTMLElement>(`[data-cb-id="${openDialogId}"]`);
            if (found.length) {
                // since the CB-ID could also be an inner content (marked as a negative "-" number)
                // we must be sure that we use the right id a.nyhow
                if (openDialogId < 0) {
                    const instanceId = Number(found[0].attributes.getNamedItem(C.Attributes.InstanceId).value);
                    sxc = SxcEdit.get(instanceId, openDialogId);
                } else sxc = SxcEdit.get(openDialogId);
            }
        }

        if (!sxc) {
            const uninitializedModules = document.querySelectorAll<HTMLElement>('.sc-uninitialized');

            if (this.diagCancelStateOnStart || this.openedTemplatePickerOnce)
                return cl.return(false, 'cancelled');

            // already showing a dialog
            if (QuickDialog.isVisible())
                return cl.return(false, 'should be invisible');

            // not exactly one uninitialized module
            if (uninitializedModules.length !== 1)
                return cl.return(false, 'has un-init modules');

            // show the template picker of this module
            const module = Array.from(uninitializedModules).find((e) => e.parentElement.matches('div[data-edit-context]'))?.parentElement;
            sxc = SxcEdit.get(module);
        }

        if (sxc) {
            sxc.manage.run(CmdLayout);
            this.openedTemplatePickerOnce = true;
        }
        return cl.return(true, 'tryShowTemplatePicker() done');
    }


    private initInstance(module: HTMLElement, isFirstRun: boolean): void {
        const cl = this.log.call('initInstance', `module: obj, isFirstRun: ${isFirstRun}) initialized: ${this.initializedInstances}`);

        // if instance is already in the list of initialized modules, skip
        // otherwise add for next time to prevent recursions
        if (this.initializedInstances.find((m) => m === module)) return;
        this.initializedInstances.push(module);

        let sxc = SxcEdit.get(module);

        // check if the sxc must be re-created. This is necessary when modules are dynamically changed
        // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
        if (!isFirstRun) sxc = sxc.recreate(true) as SxcEdit;

        // check if we must show the glasses
        // this must always run because it can be added ajax-style
        const wasEmpty = this.showGlassesButtonIfUninitialized(sxc);

        if (isFirstRun || !wasEmpty) {
            // use a logger for each iteration
            const log = new Log('Bts.Module');

            ToolbarManager.buildModule(module);
        }
        cl.done();
    }


    private showGlassesButtonIfUninitialized(sxci: SxcEdit): boolean {
        const callLog = this.log.call('showGlassesButtonIfUninitialized');
        // already initialized
        if (this.isInitialized(sxci))
            return callLog.return(false, 'is initialized');

        // already has a glasses button
        const tag = SxcEdit.getTag(sxci);
        if (tag.querySelectorAll<HTMLElement>('.sc-uninitialized').length !== 0)
            return callLog.return(false, 'already has button');

        // note: title is added on mouseover, as the translation isn't ready at page-load
        const btn = NoJQ.domFromString(
            '<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement">' +
            '<div class="icon-sxc-glasses"></div>' +
            '</div>',
        )[0];

        btn.addEventListener('click', () => sxci.manage.run(CmdLayout));

        tag.append(btn);
        return callLog.return(true, 'ok');
    }


    isInitialized(sxci: SxcEdit): boolean {
        const cg =
            sxci &&
            sxci.manage &&
            sxci.manage._editContext &&
            sxci.manage._editContext.contentBlock;
        return cg && cg.TemplateId !== 0;
    }
}












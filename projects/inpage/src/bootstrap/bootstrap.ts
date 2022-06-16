import { Sxc } from '../../../$2sxc/src';
import { CommandNames } from '../commands';
import { C } from '../constants';
import { HasLog, Insights, Log } from '../core';
import { EditManager } from '../manage/edit-manager';
import { NoJQ } from '../plumbing';
import { QuickDialog } from '../quick-dialog';
import * as QuickEditState from '../quick-dialog/state';
import { SxcTools } from '../sxc/sxc-tools';
import { toolbarSelector } from '../toolbar';
import { TagToolbarManager } from '../toolbar/tag-toolbars/tag-toolbar-manager';
import { ToolbarManager } from '../toolbar/toolbar-manager';

/**
 * This contains everything necessary to bootstrap the edit mode.
 * It must be initialized and started at the end in the x-bootstrap code,
 * to ensure everything is already ready and loaded
 * @internal
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
        // initialize toolbars that are not inside 2sxc modules (e.g. in skin)
        const noModuleToolbars = Array.from(document.querySelectorAll<HTMLElement>(toolbarSelector))
            .filter((e) => !e.closest(C.Sel.SxcDivs));

        this.log.add(`Found ${noModuleToolbars.length} toolbars outside of 2sxc modules`);
        noModuleToolbars.forEach((e) => {
            ToolbarManager.singleton().build(e);
        });
        // initialize toolbars inside 2sxc modules
        const modToolbars = document.querySelectorAll<HTMLElement>(C.Sel.SxcDivs);
        this.log.add(`Found ${modToolbars.length} toolbars inside 2sxc modules`);
        modToolbars.forEach((e) => {
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
                    if (node.matches(C.IDs.cls.scMenu)) return;

                    processed++;

                    // If the added node is a [data-edit-context], it is either a module or a content block which was replaced
                    // re-initialize the module
                    if (node.matches(C.Sel.SxcDivs)) {
                        this.initInstance(node, false);
                        // in case it has inner content, try to open the picker-dialog
                        if (!QuickDialog.singleton().isVisible()) this.tryShowTemplatePicker();
                    }
                    // If the added node contains [data-edit-context] nodes, it is likely the DNN module drag manager which added
                    // the node. To prevent multiple initialization while dragging modules, we additionally check for the
                    // .active-module class which seems to be applied while dragging the module.
                    else if (node.matches(':not(.active-module)') && node.querySelectorAll<HTMLElement>(C.Sel.SxcDivs).length > 0) {
                        node.querySelectorAll<HTMLElement>(C.Sel.SxcDivs).forEach((e) => {
                            this.initInstance(e, false);
                        });
                    } else
                        ToolbarManager.singleton().build(node);
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
        let sxc: Sxc;
        // first check if we should show one according to the state-settings
        const openDialogId = QuickEditState.cbId.get();
        if (openDialogId) {
            // must check if it's on this page, as it could be from another page
            const found = document.querySelectorAll<HTMLElement>(`[${C.AttrNames.ContentBlockId}="${openDialogId}"]`);
            if (found.length) {
                // since the CB-ID could also be an inner content (marked as a negative "-" number)
                // we must be sure that we use the right id a.nyhow
                if (openDialogId < 0) {
                    const instanceId = Number(found[0].attributes.getNamedItem(C.AttrNames.InstanceId).value);
                    sxc = window.$2sxc(instanceId, openDialogId);
                } else sxc = window.$2sxc(openDialogId);
            }
        }

        if (!sxc) {
            const uninitializedModules = document.querySelectorAll<HTMLElement>(`.${C.ClsNames.UnInitialized}`);

            if (this.diagCancelStateOnStart || this.openedTemplatePickerOnce)
                return cl.return(false, 'cancelled');

            // already showing a dialog
            if (QuickDialog.singleton().isVisible())
                return cl.return(false, 'should be invisible');

            // not exactly one uninitialized module
            if (uninitializedModules.length !== 1)
                return cl.return(false, 'has un-init modules');

            // show the template picker of this module
            const module = Array.from(uninitializedModules).find((e) => e.parentElement.matches(C.Sel.SxcDivs))?.parentElement;
            sxc = window.$2sxc(module);
        }

        if (sxc) {
            (sxc.manage as EditManager).run(CommandNames.layout);
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

        let sxc = window.$2sxc(module);

        // check if the sxc must be re-created. This is necessary when modules are dynamically changed
        // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
        if (!isFirstRun) sxc = sxc.recreate(true) as Sxc;

        // check if we must show the glasses
        // this must always run because it can be added ajax-style
        const wasEmpty = this.showGlassesButtonIfUninitialized(sxc);

        if (isFirstRun || !wasEmpty) {
            // use a logger for each iteration
            const log = new Log('Bts.Module');

            ToolbarManager.singleton().buildModule(module);
        }
        cl.done();
    }


    private showGlassesButtonIfUninitialized(sxci: Sxc): boolean {
        const callLog = this.log.call('showGlassesButtonIfUninitialized');
        // already initialized
        if (this.isInitialized(sxci))
            return callLog.return(false, 'is initialized');

        // already has a glasses button
        const tag = SxcTools.getTag(sxci);
        if (tag.querySelectorAll<HTMLElement>(`.${C.ClsNames.UnInitialized}`).length !== 0)
            return callLog.return(false, 'already has button');

        // note: title is added on mouseover, as the translation isn't ready at page-load
        const btn = NoJQ.domFromString(
            `<div class="${C.ClsNames.UnInitialized}" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement">` +
            '<div class="icon-sxc-glasses"></div>' +
            '</div>',
        )[0];

        btn.addEventListener('click', () => (sxci.manage as EditManager).run(CommandNames.layout));

        tag.append(btn);
        return callLog.return(true, 'ok');
    }


    isInitialized(sxci: Sxc): boolean {
        const manage = sxci?.manage as EditManager;
        const cg = manage?.editContext?.contentBlock;
        return cg && cg.TemplateId !== 0;
    }
}












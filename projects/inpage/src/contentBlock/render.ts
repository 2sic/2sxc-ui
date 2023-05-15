import { WorkflowCommands } from '../commands';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HtmlTools } from '../html/dom-tools';
import { AssetsLoader, HasLog, Insights, NoJQ } from '../core';
import { QuickE } from '../quick-edit/quick-e';
import { SxcTools } from '../sxc/sxc-tools';
import { WorkflowHelper, WorkflowPhases, WorkflowStepCodeArguments } from '../workflow';
import { ContentBlockEditor } from './content-block-editor';

/**
 * This is the rendering component, responsible to update the page when something changes.
 * Depending on the feature-set it will use ajax or not
 * @internal
 */
class RendererGlobal extends HasLog {

    constructor() {
        super('Rnd.Rndrer');
        Insights.add('system', 'renderer', this.log);
    }

    /**
     * Show a message where the content of a module should be - usually as placeholder till something else happens
     * @param {ContextComplete} context
     * @param newContent
     * @returns {} nothing
     */
    showMessage(context: ContextComplete, newContent: string): void {
        SxcTools.getTag(context.sxc).innerHTML = newContent;
    }


    /**
     * this one assumes a replace / change has already happened, but now must be finalized...
     * @param {ContextComplete} context
     * @param {boolean} forceAjax
     * @param {boolean} preview
     */
    reloadAndReInitialize(context: ContextComplete, forceAjax?: boolean, preview?: boolean): Promise<void> {
        const cl = this.log.call('reloadAndReInitialize', `..., forceAjax: ${forceAjax}, preview: ${preview}`, null, { context: context });

        // get workflow engine or a dummy engine
        const wf = context.commandWorkflow ?? WorkflowHelper.getDummyManager();
        const promiseChain = wf.run(new WorkflowStepCodeArguments(WorkflowCommands.refresh, WorkflowPhases.before, context));

        // 2021-02-21 2dm New in 11.12 enable toolbar to not reload in a SPA scenario
        const finalPromise = promiseChain.then((wfArgs) => {
            if (WorkflowHelper.isCancelled(wfArgs)) {
                cl.add('Workflow return false, will cancel and not refresh.');
                return Promise.resolve();
            }

            // if Oqtane (2sxc 16.01) then reload using Blazor
            const winForOqt = window as any;
            if (winForOqt.ToSic?.Sxc?.Oqtane)
            {
              console.log('Oqtane detected, will reload using Blazor');
              winForOqt.ToSic.Sxc.Oqtane.reloadModule(context.sxc.id);
              return Promise.resolve();
            }

            // if ajax is not supported, we must reload the whole page
            if (!forceAjax && !context.app.supportsAjax) {
                cl.done('not ajax - reloading page');
                window.location.reload();
                return Promise.resolve();
            }

            cl.add('is ajax, calling ajaxReload');
            return this.ajaxLoad(context, C.ContentBlock.UseExistingTemplate, preview)
                .then((result) => {
                    // If Evoq, tell Evoq that page has changed if it has changed (Ajax call)
                    if (window.dnn_tabVersioningEnabled) { // this only exists in evoq or on new DNNs with tabVersioning
                        cl.add('system is using tabVersioning - will inform DNN');
                        try {
                            window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
                        } catch (e) { /* ignore */ }
                    }
                    return cl.return(result);
                })
                .catch((error) => console.log('Error in reloadAndReInitialize', error));
        });

        return finalPromise;
    }

    /**
     * ajax-call, then replace
     * @param {ContextComplete} context
     * @param {number} alternateTemplateId
     * @param {boolean} justPreview
     */
    ajaxLoad(context: ContextComplete, alternateTemplateId: number, justPreview: boolean): Promise<void> {
        const cl = this.log.call('ajaxLoad');
        cl.add('starting promise chain');
        return ContentBlockEditor.singleton().getPreviewWithTemplate(context, alternateTemplateId)
            .then((result: string) => {
                cl.add("get preview done, let's replace the content");
                this.replaceContentBlock(context, result, justPreview);
            })
            .then(() => {
                cl.add('replace done, resetting quickE');
                QuickE.singleton().reset(); // reset quick-edit, because the config could have changed
                cl.done();
            });
    }


    /**
     * ajax update/replace the content of the content-block
     * optionally also initialize the toolbar (if not just preview)
     * @param {ContextComplete} context
     * @param newContent
     * @param {boolean} justPreview
     */
    private replaceContentBlock(context: ContextComplete, newContent: string, justPreview: boolean): void {
        const cl = this.log.call('replaceContentBlock');
        try {
            try {
                const newContentObj = JSON.parse(newContent) as ContentBlockReplacement;
                const newHeadHtml = newContentObj.Resources
                    .map((resource) => {
                        if (resource.Type === 'js') {
                            return `<script type="text/javascript" src="${resource.Url}"></script>`;
                        }
                        if (resource.Type === 'css') {
                            return `<link rel="stylesheet" href="${resource.Url}">`;
                        }
                    })
                    .filter((resource) => resource != null)
                    .join('\n');
                const newHead = NoJQ.domFromString(newHeadHtml);
                const newDom = NoJQ.domFromString(newContentObj.Html)[0];

                NoJQ.append(document.head, newHead, false);
                // Must disable toolbar before we attach to DOM
                if (justPreview) HtmlTools.disable(newDom);
                NoJQ.replaceWith(SxcTools.getTag(context.sxc), newDom, false);

                // run scripts manually to ensure proper timing
                const scripts = [
                    ...newHead.filter((asset) => asset.tagName.toLocaleLowerCase() === 'script'),
                    ...Array.from(newDom.querySelectorAll('script')),
                ] as HTMLScriptElement[];
                AssetsLoader.runScripts(scripts, undefined);
            } catch {
                const newDom = NoJQ.domFromString(newContent)[0];

                // Must disable toolbar before we attach to DOM
                if (justPreview) HtmlTools.disable(newDom);
                NoJQ.replaceWith(SxcTools.getTag(context.sxc), newDom, true);
            }

            // reset the cache, so the sxc-object is refreshed
            context.sxc.recreate(true);
        } catch (e) {
            console.log('Error while rendering template:', e);
        }
        cl.done();
    }
}


/**
 * @internal
 */
export const renderer = new RendererGlobal();

interface ContentBlockReplacement {
    Html: string;
    Resources: ContentBlockResource[];
}

interface ContentBlockResource {
    Contents: null;
    Id: null;
    Type: 'js' | 'css';
    Url: string;
}

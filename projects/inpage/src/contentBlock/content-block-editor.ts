import { C } from '../constants/index';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HtmlTools } from '../html/dom-tools';
import { HasLog, Insights } from '../core';
import { renderer } from './render';

//#region WebApi Endpoints used: 2sxc
const webApiRender = 'cms/block/render';
const webApiSave = 'cms/block/template';
//#endregion

/**
 * @internal
 */
export class ContentBlockEditor extends HasLog {

    /** Singleton */
    public static singleton(): ContentBlockEditor {
        return this._singleton ?? (this._singleton = new ContentBlockEditor());
    }
    private static _singleton: ContentBlockEditor;


    private constructor() {
        super('Sys.CbEdit');
        Insights.add('system', 'cb-editor-api', this.log);
    }


    /**
     * prepare the instance so content can be added
     * this ensure the content-group has been created, which is required to add content
     * @param {ContextComplete} context
     */
    prepareToAddContent(context: ContextComplete, useModuleList: boolean): Promise<string | void> {
        const cl = this.log.call('prepareToAddContent');
        const isCreated: boolean = context.contentBlock.isCreated;
        if (isCreated || !useModuleList)
            return cl.return(Promise.resolve());

        // persist the template
        const promise = this.updateTemplate(context, context.contentBlock.templateId, true);
        return cl.return(promise, 'ok');
    }


    /**
     * Update the template and adjust UI accordingly.
     * @param {ContextComplete} context
     * @param {number} templateId
     * @param {boolean} forceCreate
     */
    updateTemplateFromDia(context: ContextComplete, templateId: number): Promise<void> {
        const cl = this.log.call('updateTemplateFromDia', `..., ${templateId}`);
        const wasShowingPreview = HtmlTools.isDisabled(context.sxc);
        cl.add(`wasShowingPreview: ${wasShowingPreview}`);
        const promise = this.updateTemplate(context, templateId, false)
            .then(() => {
                // only reload on ajax, not on app as that was already re-loaded on the preview
                // necessary to show the original template again
                if (wasShowingPreview) renderer.reloadAndReInitialize(context);
            });
        return cl.return(promise);
    }



    /**
     * Retrieve the preview from the web-api
     * @param {ContextComplete} context
     * @param {number} templateId
     * @returns {promise} promise with the html in the result
     */
    getPreviewWithTemplate(context: ContextComplete, templateId: number): Promise<string> {
        const cl = this.log.call('getPreviewWithTemplate', `..., ${templateId}`);
        templateId = templateId || C.ContentBlock.UseExistingTemplate; // fallback, meaning use saved ID
        const params: WebApiParams = {
            templateId: templateId,
            lang: context.app.currentLanguage,
            cbid: context.contentBlockReference.id,
            originalparameters: JSON.stringify(context.instance.parameters),
            edition: context.contentBlock.edition,
        };
        cl.data('params', params);
        const promise = context.sxc.webApi.fetchRaw(context.sxc.webApi.url(webApiRender, params))
            .then((response) => response.text());
        return cl.return(promise);
    }



    /**
     * Update the template.
     */
    private updateTemplate(context: ContextComplete, templateId: number, forceCreate: boolean): Promise<string | void> {
        const cl = this.log.call('updateTemplate');
        const promise = this.saveTemplate(context, templateId, forceCreate)
            .then((data) => {
                if (!data) return null;

                // fixes a special case where the guid is given with quotes (depends on version of angularjs) issue #532
                const newGuid = data.replace(/[\",\']/g, '');

                if (console)
                    console.log(`created content group {${newGuid}}`);

                return context.contentBlock.contentGroupId = newGuid;
            }).catch(() => {
                // error handling
                return alert('error - result not ok, was not able to create ContentGroup');
            });
        return cl.return(promise);
    }


    /**
     * Save the template configuration for this instance
     * @param {ContextComplete} context
     * @param {number} templateId
     * @param {boolean} [forceCreateContentGroup]
     * @returns {promise}
     */
    private saveTemplate(context: ContextComplete, templateId: number, forceCreateContentGroup: boolean): Promise<string> {
        const cl = this.log.call('saveTemplate');
        const params: WebApiParams = {
            templateId: templateId,
            forceCreateContentGroup: forceCreateContentGroup,
            newTemplateChooserState: false,
        };
        cl.data('params', params);
        const promise = context.sxc.webApi.fetchJson(context.sxc.webApi.url(webApiSave, params), undefined, 'POST');
        return cl.return(promise);
    }

}


interface WebApiParams {
    templateId?: number;
    lang?: string;
    cbisentity?: boolean;
    cbid?: number;
    originalparameters?: string;
    forceCreateContentGroup?: boolean;
    newTemplateChooserState?: boolean;
    zoneId?: number;
    appId?: number;
    edition?: string;
}

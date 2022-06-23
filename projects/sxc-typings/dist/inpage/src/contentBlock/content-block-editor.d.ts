import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog } from '../core';
/**
 * @internal
 */
export declare class ContentBlockEditor extends HasLog {
    /** Singleton */
    static singleton(): ContentBlockEditor;
    private static _singleton;
    private constructor();
    /**
     * prepare the instance so content can be added
     * this ensure the content-group has been created, which is required to add content
     * @param {ContextComplete} context
     */
    prepareToAddContent(context: ContextComplete, useModuleList: boolean): Promise<string | void>;
    /**
     * Update the template and adjust UI accordingly.
     * @param {ContextComplete} context
     * @param {number} templateId
     * @param {boolean} forceCreate
     */
    updateTemplateFromDia(context: ContextComplete, templateId: number): Promise<void>;
    /**
     * Retrieve the preview from the web-api
     * @param {ContextComplete} context
     * @param {number} templateId
     * @returns {promise} promise with the html in the result
     */
    getPreviewWithTemplate(context: ContextComplete, templateId: number): Promise<string>;
    /**
     * Update the template.
     */
    private updateTemplate;
    /**
     * Save the template configuration for this instance
     * @param {ContextComplete} context
     * @param {number} templateId
     * @param {boolean} [forceCreateContentGroup]
     * @returns {promise}
     */
    private saveTemplate;
}

import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog } from '../core';
/**
 * This is the rendering compontent, responsible to update the page when something changes.
 * Depending on the feature-set it will use ajax or not
 * @internal
 */
declare class RendererGlobal extends HasLog {
    constructor();
    /**
     * Show a message where the content of a module should be - usually as placeholder till something else happens
     * @param {ContextComplete} context
     * @param {string} newContent
     * @returns {} nothing
     */
    showMessage(context: ContextComplete, newContent: string): void;
    /**
     * this one assumes a replace / change has already happened, but now must be finalized...
     * @param {ContextComplete} context
     * @param {boolean} forceAjax
     * @param {boolean} preview
     */
    reloadAndReInitialize(context: ContextComplete, forceAjax?: boolean, preview?: boolean): Promise<void>;
    /**
     * ajax-call, then replace
     * @param {ContextComplete} context
     * @param {number} alternateTemplateId
     * @param {boolean} justPreview
     */
    ajaxLoad(context: ContextComplete, alternateTemplateId: number, justPreview: boolean): Promise<void>;
    /**
     * ajax update/replace the content of the content-block
     * optionally also initialize the toolbar (if not just preview)
     * @param {ContextComplete} context
     * @param {string} newContent
     * @param {boolean} justPreview
     */
    private replaceContentBlock;
}
/**
 * @internal
 */
export declare const renderer: RendererGlobal;
export {};

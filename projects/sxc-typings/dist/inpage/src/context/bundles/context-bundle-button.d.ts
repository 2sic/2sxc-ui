import { Sxc } from '../../../../$2sxc/src';
import { Button } from '../../toolbar/config/button';
import { ToolbarWorkflowManager } from '../../workflow';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextBundleToolbar } from './context-bundle-toolbar';
/**
 * @internal
 */
export declare class ContextComplete extends ContextBundleToolbar {
    button?: Button;
    commandWorkflow?: ToolbarWorkflowManager;
    constructor(editCtx: AttrJsonEditContext, sxc?: Sxc);
    /**
     * Primary API to get the context (context is cached)
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    static findContext(tagOrSxc: Sxc | HTMLElement | number, cbid?: number): ContextComplete;
    /**
     * Create copy of context, so it can be modified before use
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    static contextCopy(htmlElementOrId: HTMLElement | number, cbid?: number): ContextComplete;
    /**
     * Create new context
     * @param sxc
     * @param htmlElement
     */
    static getContextInstance(sxc: Sxc, htmlElement?: HTMLElement): ContextComplete;
}

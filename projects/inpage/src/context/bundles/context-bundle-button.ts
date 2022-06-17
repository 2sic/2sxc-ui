import { Sxc } from '../../../../$2sxc/src';
import { Obj } from '../../plumbing';
import { SxcTools } from '../../sxc/sxc-tools';
import { Button } from '../../toolbar/config/button';
import { ToolbarWorkflowManager } from '../../workflow';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextBundleToolbar } from './context-bundle-toolbar';

/**
 * @internal
 */
export class ContextComplete extends ContextBundleToolbar {
    button?: Button;

    commandWorkflow?: ToolbarWorkflowManager;

    constructor(editCtx: AttrJsonEditContext, sxc?: Sxc) {
        super(editCtx, sxc);
        // note that the button will not be filled here, as it will be filled somewhere else
    }

    /**
     * Primary API to get the context (context is cached)
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    static findContext(tagOrSxc: Sxc | HTMLElement | number, cbid?: number): ContextComplete {
        let sxc: Sxc;
        let containerTag: HTMLElement = null;

        if (Sxc.is(tagOrSxc)) { // it is SxcInstance
            sxc = tagOrSxc;
        } else if (typeof tagOrSxc === 'number') { // it is number
            sxc = window.$2sxc(tagOrSxc, cbid);
        } else { // it is HTMLElement
            sxc = window.$2sxc(tagOrSxc);
            containerTag = SxcTools.getContainerTag(tagOrSxc);
        }

        const contextOfButton = ContextComplete.getContextInstance(sxc, containerTag);
        contextOfButton.sxc = sxc;
        return contextOfButton;
    }

    /**
     * Create copy of context, so it can be modified before use
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    static contextCopy(htmlElementOrId: HTMLElement | number, cbid?: number): ContextComplete {
        const contextOfButton = ContextComplete.findContext(htmlElementOrId, cbid);
        // set sxc to null because of cyclic reference, so we can serialize it
        contextOfButton.sxc = null;
        // make a copy
        const copyOfContext = Obj.DeepClone(contextOfButton); // JSON.parse(JSON.stringify(contextOfButton));
        // bring sxc back to context
        contextOfButton.sxc = window.$2sxc(htmlElementOrId) as Sxc;
        return copyOfContext;
    }

    /**
     * Create new context
     * @param sxc
     * @param htmlElement
     */
    static getContextInstance(sxc: Sxc, htmlElement?: HTMLElement): ContextComplete {
        const editContext = SxcTools.getEditContext(sxc, htmlElement);
        return new ContextComplete(editContext, sxc);
    }

}

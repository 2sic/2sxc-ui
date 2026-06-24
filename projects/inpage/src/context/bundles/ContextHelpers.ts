import { Sxc } from '../../../../$2sxc/src';
import { DomTools } from '../../../../$2sxc/src/dom/dom-tools';
import { SxcTools } from '../../sxc';
import { BuildRule } from '../../toolbar/rules';
import { ContextComplete, createContextComplete } from './context-bundle-button';


export class ContextHelpers {

    /**
     * @internal
     */
    static isComplete(thing: unknown): thing is ContextComplete {
        return (thing as ContextComplete)._isCtxComplete === true;
    }

    /** @internal
     * must be implemented as static, because the final object is actually just an interface and created from values.
     */
    static getRule(ctx: ContextComplete): BuildRule | null {
        return ctx.toolbar?.settings?._rules?.find(ctx.button!.id) ?? null;
    }



    /**
     * Primary API to get the context (context is cached)
     * @internal
     */
    static expandContext(tagOrSxc: Sxc | HTMLElement | number, cbid?: number): ContextComplete {
        let sxc: Sxc;
        let containerTag: HTMLElement | null = null;

        // it is SxcInstance
        if (Sxc.is(tagOrSxc))
            return ContextHelpers.#getContextInstance(tagOrSxc);

        // it is number
        if (typeof tagOrSxc === 'number')
            return ContextHelpers.#getContextInstance(window.$2sxc(tagOrSxc, cbid));

        // it is HTMLElement
        sxc = window.$2sxc(tagOrSxc);
        containerTag = DomTools.getContainerTag(tagOrSxc);
        return ContextHelpers.#getContextInstance(sxc, containerTag);
    }

    /**
     * Create new context
     * @param sxc
     * @param htmlElement
     * @internal
     */
    static #getContextInstance(sxc: Sxc, htmlElement?: HTMLElement): ContextComplete {
        const editContext = SxcTools.getEditContext(sxc, htmlElement);
        return createContextComplete(editContext, sxc);
    }

}

﻿import { C } from '../../constants/index';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Translator } from '../../i18n/translator';
import { HasLog } from '../../core';
import { ToolbarRenderer } from '../render/toolbar-renderer';
import { TagToolbar } from '../tag-toolbars/tag-toolbar';
import { ToolbarLifecycle } from '../toolbar-lifecycle';
import { ToolbarManager } from '../toolbar-manager';
import { ToolbarInitConfig } from './toolbar-init-config';
import { getToolbarWhenNoneProvided } from '../templates/toolbar-when-no-toolbar-provided';

// quick debug - set to false if not needed for production
const dbg = false;
/**
 * @internal
 */
export const toolbarSelector = `.sc-menu[toolbar],.sc-menu[data-toolbar],[${C.Toolbar.attr.full}]`;

/**
 * This class is responsible for finding toolbar configurations in the doom
 * and then initializing them.
 * @internal
 */
export class ToolbarConfigFinderAndInitializer extends HasLog {

    /**
     * Special constructor which only allows this builder to be instatiated from the TagManager
     * This is to simplify program control flow
     */
    constructor(private tlbManager: ToolbarManager) {
        super('Tlb.Buildr', tlbManager.log);
    }

    /**
     * Generate toolbars inside a MODULE tag (usually a div with class sc-edit-context)
     * @param parentTag
     * @param optionalId
     */
    buildDnnModule(parentTag: HTMLElement): void {
        const cl = this.log.call('buildDnnModule');

        // if something says the toolbars are disabled, then skip
        if (parentTag.getAttribute(C.Toolbar.attr.disable)) return cl.done('disabled');

        let toolbars = this.findChildTagsWithConfig(parentTag);

        // no toolbars found, must help a bit because otherwise editing is hard
        if (toolbars.length === 0) {
            toolbars = addDefaultToolbarConfigToTag(parentTag);
            if (toolbars == null) return cl.done('toolbars=null');
        }

        toolbars.forEach((e) => this.loadConfigAndInitialize(e));

        // ensure translations are rebuilt
        Translator.autoTranslateMenus();
        cl.done();
    }

    /**
     * Build toolbar, but allow an html node as target
     * Will automatically find a wrapping sc-edit-context and all containing toolbars
     * @param node
     */
    build(node: HTMLElement): void {
        // for toolbars that are not inside 2sxc modules (e.g. in skin)
        if (node.matches(toolbarSelector) && !node.closest(C.Sel.SxcDivs)) {
            this.loadConfigAndInitialize(node);
            return;
        }

        // go up the DOM to find the parent which has context-information
        // if we have no contextNode (a parent content block), we can
        // assume the node is outside of a 2sxc module so not interesting
        const contextNode = node.closest<HTMLElement>(C.Cb.selectors.ofName);
        if (contextNode == null) return;

        // check if the current node needs a toolbar
        if (node.matches(toolbarSelector)) this.loadConfigAndInitialize(node);

        // activate all child-nodes with toolbars
        const toolbars = node.querySelectorAll<HTMLElement>(toolbarSelector);
        toolbars.forEach((e) => this.loadConfigAndInitialize(e));
    }


    //////////////////////////////// Private Functions ////////////////////////////////////

    /**
     * find current toolbars inside this wrapper-tag
     */
    private findChildTagsWithConfig(parentTag: HTMLElement): HTMLElement[] {
        const allInner = Array.from(parentTag.querySelectorAll<HTMLElement>(toolbarSelector));

        // return only those, which don't belong to a sub-item
        const onlyDirectDescendents = allInner.filter((e) => e.closest(C.Cb.selectors.ofName) === parentTag);
        if (dbg)
            console.log('found toolbars for parent', parentTag, onlyDirectDescendents);
        return onlyDirectDescendents;
    }


    /**
     * Setup a toolbar for a specific tag/node by loading its self-contained configuration
     * and replacing / preparing the toolbar as needed.
     * @param node
     */
    private loadConfigAndInitialize(tag: HTMLElement): void {
        const cl = this.log.call('loadConfigAndInitialize');

        // Do not process tag if a toolbar has already been attached
        if (tag.getAttribute(`data-${C.Toolbar.attrToMarkInitalized}`))
            return cl.done('already initialized');

        const config = ToolbarInitConfig.loadFromTag(tag);

        if (config != null) {  // is null if load failed
            // catch errors, as this is very common - make sure the others are still rendered
            try {
                this.convertConfigToToolbars(tag, config);
            } catch (err2) {
                console.error('error creating toolbar - will skip this one', err2);
            }
        }
        cl.done();
    }


    /**
     * Take a configuration and convert into a toolbar-menu; also attach the hover-attribute
     * @param tag
     * @param config
     */
    private convertConfigToToolbars(tag: HTMLElement, config: ToolbarInitConfig): void {
        const cl = this.log.call('convertConfigToToolbars');
        cl.data('tag', tag);
        cl.data('config', config);
        const context = ContextComplete.findContext(tag);
        context.toolbar = this.tlbManager.loadConfig(context, config);

        // V2 where the full toolbar is included in one setting
        if (tag.getAttribute(C.Toolbar.attr.full)) {
            cl.add('V2 TagToolbar detected');
            const tagToolbar = new TagToolbar(tag, context, Translator);
            tag.setAttribute(`data-${C.Toolbar.attrToMarkInitalized}`, `${tagToolbar != null}`);
            this.addHoverAttributeToTag(tag);
            return cl.done();
        }

        // default case, tag is the old <ul> tag, so find the sc-element parent before replacing
        const toolbar = new ToolbarRenderer(context).generate();
        const hoverParent = tag.closest<HTMLElement>(C.Toolbar.selectors.ofOldHover);
        cl.data('parentTag', hoverParent);
        tag.replaceWith(toolbar);

        if (hoverParent) {
            cl.add('V1 hover-toolbar and parents found - will add attribute');
            this.addHoverAttributeToTag(hoverParent);
        }

        // Also run toolbar-init on the new toolbar.
        // Must use var 'toolbar' and not 'tag', as that is kind of reset/not existing at this
        // So the event would get lost
        // Added in 12.10
        ToolbarLifecycle.raiseToolbarInitEvent(toolbar, toolbar, context);

        cl.done();
    }


    /**
     * add hover-attribute to tag which is responsible for the menu to appear/disappear
     */
    private addHoverAttributeToTag(tag: HTMLElement): void {
        const cl = this.log.call('addHoverAttributeToTag');
        if (!tag) return cl.done('no tag found'); // skip in case nothing was given
        if (!tag.hasAttribute(C.Toolbar.attr.hover)) {
            cl.add('will add attribute ' + C.Toolbar.attr.hover);
            tag.setAttribute(C.Toolbar.attr.hover, '');
        }
        cl.done();
    }
}


//////////////////////////////// Private Functions ////////////////////////////////////




/**
 * Create a default/fallback toolbar and return it
 */
function addDefaultToolbarConfigToTag(parentTag: HTMLElement): HTMLElement[] {
    if (dbg) console.log("didn't find toolbar, so will auto-create", parentTag);

    const outsideCb = !parentTag.classList.contains(C.Cb.classes.name);
    const contentTag = outsideCb ? parentTag.querySelector<HTMLElement>(`div${C.Cb.selectors.ofName}`) : parentTag;

    // auto toolbar
    const ctx = ContextComplete.findContext(contentTag);
    if (ctx.ui.autoToolbar === false)
        return null;

    contentTag.setAttribute(C.Toolbar.attr.full, JSON.stringify(getToolbarWhenNoneProvided()));

    return [contentTag];
}

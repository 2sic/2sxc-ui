import * as Constants from '../../constants';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { HasLog } from '../../logging/has-log';
import { ToolbarEmpty } from '../config';
import { ToolbarConfigLoader } from '../config-loaders';
import { ToolbarRenderer } from '../render/toolbar-renderer';
import { TagToolbar } from '../tag-toolbars/tag-toolbar';
import { ToolbarManager } from '../toolbar-manager';
import { ToolbarInitConfig } from './toolbar-init-config';

// quick debug - set to false if not needed for production
const dbg = false;
const toolbarSelector = `.sc-menu[toolbar],.sc-menu[data-toolbar],[${Constants.toolbar.attr.full}]`;

/**
 * This class is responsible for finding toolbar configurations in the doom
 * and then initializing them.
 */
export class ToolbarConfigFinderAndInitializer extends HasLog {

    /**
     * Special constructor which only allows this builder to be instatiated from the TagManager
     * This is to simplify program control flow
     */
    constructor(private tlbManager: typeof ToolbarManager) {
        super('Tlb.Buildr', tlbManager.log);
    }

    /**
     * Generate toolbars inside a MODULE tag (usually a div with class sc-edit-context)
     * @param parentTag
     * @param optionalId
     */
    buildDnnModule(parentTag: JQuery, optionalId?: number): void {
        parentTag = $(parentTag || '.DnnModule-' + optionalId);

        // if something says the toolbars are disabled, then skip
        if (parentTag.attr(Constants.toolbar.attr.disable)) return;

        let toolbars = this.findChildTagsWithConfig(parentTag);

        // no toolbars found, must help a bit because otherwise editing is hard
        if (toolbars.length === 0) {
            toolbars = addDefaultToolbarConfigToTag(parentTag);
            if (toolbars == null) return;
        }

        toolbars.each((i, e: HTMLElement) => this.loadConfigAndInitialize(e));
    }

    /**
     * Build toolbar, but allow an html node as target
     * Will automatically find a wrapping sc-edit-context and all containing toolbars
     * @param node
     */
    build(node: JQuery): void {
        // go up the DOM to find the parent which has context-information
        // if we have no contextNode (a parent content block), we can
        // assume the node is outside of a 2sxc module so not interesting
        const contextNode = $(node).closest(Constants.cb.selectors.ofName)[0];
        if (contextNode == null) return;

        // check if the parent-node needs a toolbar
        if (node.is(toolbarSelector)) this.loadConfigAndInitialize(node[0]);

        // activate all child-nodes with toolbars
        const toolbars = $(toolbarSelector, node);
        toolbars.each((i, e: HTMLElement) => this.loadConfigAndInitialize(e));
    }


//////////////////////////////// Private Functions ////////////////////////////////////

    /**
     * find current toolbars inside this wrapper-tag
     */
    private findChildTagsWithConfig(parentTag: JQuery): JQuery {
        const allInner = $(toolbarSelector, parentTag);

        // return only those, which don't belong to a sub-item
        const onlyDirectDescendents = allInner
            .filter((i: number, e: HTMLElement) =>
                $(e).closest(Constants.cb.selectors.ofName)[0] === parentTag[0]);
        if (dbg)
            console.log('found toolbars for parent', parentTag, onlyDirectDescendents);
        return onlyDirectDescendents;
    }


    /**
     * Setup a toolbar for a specific tag/node by loading its self-contained configuration
     * and replacing / preparing the toolbar as needed.
     * @param node
     */
    private loadConfigAndInitialize(node: HTMLElement): void {
        const tag = $(node);

        // Do not process tag if a toolbar has already been attached
        if (tag.data(Constants.toolbar.attrToMarkInitalized)) return;

        const config = ToolbarInitConfig.loadFromTag(node);

        if (config != null) {  // is null if load failed
            // catch errors, as this is very common - make sure the others are still rendered
            try {
                this.convertConfigToToolbars(tag, config);
            } catch (err2) {
                console.error('error creating toolbar - will skip this one', err2);
            }
        }
    }


    /**
     * Take a configuration and convert into a toolbar-menu; also attach the hover-attribute
     * @param tag
     * @param config
     */
    private convertConfigToToolbars(tag: JQuery, config: ToolbarInitConfig): void {
        const context = ContextBundleButton.findContext(tag);
        context.toolbar = this.tlbManager.loadConfig(context, config); // new ToolbarConfigLoader(this.log)
            // .expandToolbarConfig(context, config.toolbar, config.settings);

        // V2 where the full toolbar is included in one setting
        if (tag.attr(Constants.toolbar.attr.full)) {
            tag.data(Constants.toolbar.attrToMarkInitalized, new TagToolbar(tag, context));
            addHoverAttributeToTag(tag);
            return;
        }

        // default case, tag is the old <ul> tag, so find the sc-element parent before replacing
        const toolbar = new ToolbarRenderer(context).render();
        const scElementParent = tag.closest(Constants.toolbar.selectors.ofOldHover);
        tag.replaceWith(toolbar);

        if (scElementParent.length > 0)
            addHoverAttributeToTag(scElementParent);
    }
}


//////////////////////////////// Private Functions ////////////////////////////////////


/**
 * add hover-attribute to tag which is responsible for the menu to appear/disappear
 */
function addHoverAttributeToTag(jtag: JQuery): void {
  if (jtag.length <= 0) return; // skip in case nothing was given
  const tag = jtag[0];
  if (!tag.hasAttribute(Constants.toolbar.attr.hover))
    tag.setAttribute(Constants.toolbar.attr.hover, '');
}

/**
 * Create a default/fallback toolbar and return it
 */
function addDefaultToolbarConfigToTag(parentTag: JQuery): JQuery {
  if (dbg) console.log("didn't find toolbar, so will auto-create", parentTag);

  const outsideCb = !parentTag.hasClass(Constants.cb.classes.name);
  const contentTag = outsideCb ? parentTag.find(`div${Constants.cb.selectors.ofName}`) : parentTag;

  // auto toolbar
  const ctx = ContextBundleButton.findContext(contentTag);
  if (ctx.ui.autoToolbar === false)
    return null;

  contentTag.attr(Constants.toolbar.attr.full, JSON.stringify(ToolbarEmpty));

  return contentTag;
}

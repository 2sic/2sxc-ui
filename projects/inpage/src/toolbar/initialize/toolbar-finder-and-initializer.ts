import { C } from '../../constants/index';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Translator } from '../../i18n/translator';
import { $jq } from '../../interfaces/sxc-controller-in-page';
import { HasLog } from '../../logging';
import { ToolbarWhenNoToolbarProvided } from '../config';
import { ToolbarRenderer } from '../render/toolbar-renderer';
import { TagToolbar } from '../tag-toolbars/tag-toolbar';
import { ToolbarLifecycle } from '../toolbar-lifecycle';
import { ToolbarManager } from '../toolbar-manager';
import { ToolbarInitConfig } from './toolbar-init-config';

// quick debug - set to false if not needed for production
const dbg = false;
const toolbarSelector = `.sc-menu[toolbar],.sc-menu[data-toolbar],[${C.Toolbar.attr.full}]`;

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
        const cl = this.log.call('buildDnnModule');
        parentTag = $jq(parentTag || '.DnnModule-' + optionalId);

        // if something says the toolbars are disabled, then skip
        if (parentTag.attr(C.Toolbar.attr.disable)) return cl.done('disabled');

        let toolbars = this.findChildTagsWithConfig(parentTag);

        // no toolbars found, must help a bit because otherwise editing is hard
        if (toolbars.length === 0) {
            toolbars = addDefaultToolbarConfigToTag(parentTag);
            if (toolbars == null) return cl.done('toolbars=null');
        }

        toolbars.each((i, e: HTMLElement) => this.loadConfigAndInitialize(e));

        // ensure translations are rebuilt
        Translator.autoTranslateMenus();
        cl.done();
    }

    /**
     * Build toolbar, but allow an html node as target
     * Will automatically find a wrapping sc-edit-context and all containing toolbars
     * @param node
     */
    build(node: JQuery | HTMLElement): void {
        node = $jq(node);
        // go up the DOM to find the parent which has context-information
        // if we have no contextNode (a parent content block), we can
        // assume the node is outside of a 2sxc module so not interesting
        const contextNode = $jq(node).closest(C.Cb.selectors.ofName)[0];
        if (contextNode == null) return;

        // check if the current node needs a toolbar
        if (node.is(toolbarSelector)) this.loadConfigAndInitialize(node[0]);

        // activate all child-nodes with toolbars
        const toolbars = $jq(toolbarSelector, node);
        toolbars.each((i, e: HTMLElement) => this.loadConfigAndInitialize(e));
    }


//////////////////////////////// Private Functions ////////////////////////////////////

    /**
     * find current toolbars inside this wrapper-tag
     */
    private findChildTagsWithConfig(parentTag: JQuery): JQuery {
        const allInner = $jq(toolbarSelector, parentTag);

        // return only those, which don't belong to a sub-item
        const onlyDirectDescendents = allInner
            .filter((i: number, e: HTMLElement) =>
                $jq(e).closest(C.Cb.selectors.ofName)[0] === parentTag[0]);
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
        const cl = this.log.call('loadConfigAndInitialize');
        const tag = $jq(node);

        // Do not process tag if a toolbar has already been attached
        if (tag.data(C.Toolbar.attrToMarkInitalized))
            return cl.done('already initialized');

        const config = ToolbarInitConfig.loadFromTag(node);

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
    private convertConfigToToolbars(tag: JQuery, config: ToolbarInitConfig): void {
        const cl = this.log.call('convertConfigToToolbars');
        cl.data('tag', tag);
        cl.data('config', config);
        const context = ContextComplete.findContext(tag);
        context.toolbar = this.tlbManager.loadConfig(context, config);

        // V2 where the full toolbar is included in one setting
        if (tag.attr(C.Toolbar.attr.full)) {
            cl.add('V2 TagToolbar detected');
            tag.data(C.Toolbar.attrToMarkInitalized, new TagToolbar(tag, context, Translator));
            this.addHoverAttributeToTag(tag);
            return cl.done();
        }

        // default case, tag is the old <ul> tag, so find the sc-element parent before replacing
        const toolbar = new ToolbarRenderer(context).generate();
        const hoverParent = tag.closest(C.Toolbar.selectors.ofOldHover);
        cl.data('parentTag', hoverParent);
        tag.replaceWith(toolbar);

        if (hoverParent.length > 0) {
            cl.add('V1 hover-toolbar and parents found - will add attribute');
            this.addHoverAttributeToTag(hoverParent);
        }

        // TODO: get init to run
        ToolbarLifecycle.raiseToolbarInitEvent(tag?.[0], hoverParent?.[0], context);

        cl.done();
    }


    /**
     * add hover-attribute to tag which is responsible for the menu to appear/disappear
     */
    private addHoverAttributeToTag(jtag: JQuery): void {
        const cl = this.log.call('addHoverAttributeToTag');
        if (jtag.length <= 0) return cl.done('no tag found'); // skip in case nothing was given
        const tag = jtag[0];
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
function addDefaultToolbarConfigToTag(parentTag: JQuery): JQuery {
  if (dbg) console.log("didn't find toolbar, so will auto-create", parentTag);

  const outsideCb = !parentTag.hasClass(C.Cb.classes.name);
  const contentTag = outsideCb ? parentTag.find(`div${C.Cb.selectors.ofName}`) : parentTag;

  // auto toolbar
  const ctx = ContextComplete.findContext(contentTag);
  if (ctx.ui.autoToolbar === false)
    return null;

  contentTag.attr(C.Toolbar.attr.full, JSON.stringify(ToolbarWhenNoToolbarProvided));

  return contentTag;
}

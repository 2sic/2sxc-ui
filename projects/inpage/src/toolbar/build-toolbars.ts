import * as Constants from '../constants';
import { context } from '../context/context';
import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
import { Log } from '../logging/log';
import { getTag } from '../manage/api';
import { renderToolbar } from './item/render-toolbar';
import { TagToolbar } from './tag-toolbar';
import { ToolbarInitConfig } from './toolbar-init-config';
import { expandToolbarConfig } from './toolbar/toolbar-expand-config';
import { emptyToolbar, ToolbarSettings } from './toolbar/toolbar-settings';

// quick debug - set to false if not needed for production
const dbg = false;
const toolbarSelector = `.sc-menu[toolbar],.sc-menu[data-toolbar],[${Constants.toolbar.attr.full}]`;

/**
 * Generate toolbars inside a MODULE tag (usually a div with class sc-edit-context)
 * @param parentLog
 * @param parentTag
 * @param optionalId
 */
export function buildToolbars(parentLog: Log, parentTag: JQuery<HTMLElement>, optionalId?: number): void {
  const log = new Log('Tlb.BldAll', parentLog);
  parentTag = $(parentTag || '.DnnModule-' + optionalId);

  // if something says the toolbars are disabled, then skip
  if (parentTag.attr(Constants.toolbar.attr.disable))
    return;

  let toolbars = getToolbarTags(parentTag);

  // no toolbars found, must help a bit because otherwise editing is hard
  if (toolbars.length === 0) {
    toolbars = addFallbackToolbar(parentTag);
    if (toolbars == null) return;
  }

  toolbars.each((i, e: HTMLElement) => loadAndConvertTag(log, e));
}

/**
 * Build toolbar, but allow any node as target
 * Will automatically find a wrapping sc-edit-context and all containing toolbars
 * @param parentLog
 * @param node
 */
export function buildToolbarsFromAnyNode(parentLog: Log, node: JQuery<HTMLElement>): void {
  const log = new Log('Tlb.BldAny', parentLog);
  const contextNode = $(node).closest(Constants.cb.selectors.ofName)[0];

  // if we have no contextNode (a parent content block), we can
  // assume the node is outside of a 2sxc module so not interesting
  if (contextNode == null)
    return;

  if (node.is(toolbarSelector)) // toolbar itself has been added
    loadAndConvertTag(log, node[0]);

  const toolbars = $(toolbarSelector, node);
  toolbars.each((i, e: HTMLElement) => loadAndConvertTag(log, e));
}

//////////////////////////////// Private Functions ////////////////////////////////////

/**
 * Setup a toolbar for a specific tag/node by loading its self-contained configuration
 * and replacing / preparing the toolbar as needed.
 * @param log
 * @param node
 */
function loadAndConvertTag(log: Log, node: HTMLElement): void {
  const tag = $(node);

  // Do not process tag if a toolbar has already been attached
  if (tag.data('2sxc-tagtoolbar'))
    return;

  const config = loadConfigFromAttributes(node);

  if (config != null) {  // is null if load failed
    try {
      convertConfigToToolbarTags(tag, config, log);
    } catch (err2) {
      // catch any errors, as this is very common - make sure the others are still rendered
      console.error('error creating toolbar - will skip this one', err2);
    }
  }
}

/**
 * Load the toolbar configuration from the sxc-toolbar attribute OR the old schema
 * @param tag
 * @return a configuration object or null in case of an error
 */
function loadConfigFromAttributes(tag: HTMLElement): ToolbarInitConfig {
  try {
    const newConfigFormat = tryGetAttrText(tag, Constants.toolbar.attr.full);
    if (newConfigFormat) {
      return JSON.parse(newConfigFormat) as ToolbarInitConfig;
    } else {
      const at = $2sxc.c.attr;
      const data = getFirstAttribute(tag, at.toolbar, at.toolbarData);
      const settings = getFirstAttribute(tag, at.settings, at.settingsData);
      return {
        toolbar: JSON.parse(data),
        settings: JSON.parse(settings) as ToolbarSettings,
      } as ToolbarInitConfig;
    }
  } catch (err) {
    console.error(
      'error in settings JSON - probably invalid - make sure you also quote your properties like "name": ...',
      tag, err);
    return null;
  }
}

/**
 * Take a configuration and convert into a toolbar-menu; also attach the hover-attribute
 * @param tag
 * @param config
 * @param log
 */
function convertConfigToToolbarTags(tag: JQuery<HTMLElement>, config: ToolbarInitConfig, log: Log): void {
  const cnt = context(tag);
  cnt.toolbar = expandToolbarConfig(cnt, config.toolbar, config.settings, log);

  if (tag.attr(Constants.toolbar.attr.full)) {
    // new case, where the full toolbar is included in one setting
    // ReSharper disable once WrongExpressionStatement
    tag.data('2sxc-tagtoolbar', new TagToolbar(tag, cnt));
    ensureToolbarHoverClass(tag);
  } else {
    const toolbar = renderToolbar(cnt);
    // default case, tag is the old <ul> tag, so find the sc-element parent before replacing
    const scElementParent = tag.closest(Constants.toolbar.selectors.ofOldHover);
    tag.replaceWith(toolbar);

    if (scElementParent.length > 0)
      ensureToolbarHoverClass(scElementParent);
  }

}


/** find current toolbars inside this wrapper-tag */
function getToolbarTags(parentTag: JQuery<HTMLElement>): JQuery<HTMLElement> {
  const allInner = $(toolbarSelector, parentTag);

  // return only those, which don't belong to a sub-item
  const onlyDirectDescendents = allInner
    .filter((i: number, e: HTMLElement) => $(e).closest(Constants.cb.selectors.ofName)[0] === parentTag[0]);
  if (dbg)
    console.log('found toolbars for parent', parentTag, onlyDirectDescendents);
  return onlyDirectDescendents;
}

/** add hover-attribute to tag */
function ensureToolbarHoverClass(jtag: JQuery<HTMLElement>): void {
  if (jtag.length <= 0) return; // skip in case nothing was given
  const tag = jtag[0];
  if (!tag.hasAttribute(Constants.toolbar.attr.hover))
    tag.setAttribute(Constants.toolbar.attr.hover, '');
}

/** Create a default/fallback toolbar and return it */
function addFallbackToolbar(parentTag: JQuery<HTMLElement>): JQuery<HTMLElement> {
  if (dbg) console.log("didn't find toolbar, so will auto-create", parentTag);

  const outsideCb = !parentTag.hasClass(Constants.cb.classes.name);
  const contentTag = outsideCb ? parentTag.find(`div${Constants.cb.selectors.ofName}`) : parentTag;

  // auto toolbar
  const ctx = context(contentTag);
  if (ctx.ui.autoToolbar === false)
    return null;

  contentTag.attr(Constants.toolbar.attr.full, JSON.stringify(emptyToolbar));

  return contentTag;
}

/** Find the text of one or more attributes in fallback order, till we found one */
function getFirstAttribute(toolbar: HTMLElement, name1: string, name2: string): string {
  return tryGetAttrText(toolbar, name1) || tryGetAttrText(toolbar, name2) || '{}';
}

/** Get text-content of an attribute (or return null) */
function tryGetAttrText(tag: HTMLElement, name: string): string {
  const item1 = tag.attributes.getNamedItem(name);
  return item1 && item1.textContent;
}

export function disable(tag: HTMLElement | JQuery<HTMLElement>): void {
  const jtag = $(tag);
  jtag.attr(Constants.toolbar.attr.disable, 'true');
}

export function isDisabled(sxc: SxcInstanceWithInternals): boolean {
  const tag: any = $(getTag(sxc));
  return !!tag.attr(Constants.toolbar.attr.disable);
}

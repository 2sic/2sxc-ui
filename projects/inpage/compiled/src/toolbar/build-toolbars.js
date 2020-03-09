"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var sxc_controller_in_page_1 = require("../interfaces/sxc-controller-in-page");
var api_1 = require("../manage/api");
var render_toolbar_1 = require("./item/render-toolbar");
var toolbar_expand_config_1 = require("./toolbar/toolbar-expand-config");
var toolbar_settings_1 = require("./toolbar/toolbar-settings");
var log_1 = require("../logging/log");
var Constants = require("../constants");
var tag_toolbar_1 = require("./tag-toolbar");
// quick debug - set to false if not needed for production
var dbg = false;
/**
 * create a process - toolbar command to generate toolbars inside a tag
 * @param parentLog
 * @param parentTag
 * @param optionalId
 */
function buildToolbars(parentLog, parentTag, optionalId) {
    var log = new log_1.Log('Tlb.BldAll', parentLog);
    parentTag = $(parentTag || '.DnnModule-' + optionalId);
    // if something says the toolbars are disabled, then skip
    if (parentTag.attr(Constants.toolbar.attr.disable))
        return;
    var toolbars = getToolbarTags(parentTag);
    // no toolbars found, must help a bit because otherwise editing is hard
    if (toolbars.length === 0) {
        toolbars = addFallbackToolbar(parentTag);
        if (toolbars == null)
            return;
    }
    for (var i = 0; i < toolbars.length; i++) {
        var tag = $(toolbars[i]);
        var config = loadConfigFromAttributes(toolbars[i]);
        if (config != null) // is null if load failed
            try {
                convertConfigToToolbarTags(tag, config, log);
            }
            catch (err2) {
                // catch any errors, as this is very common - make sure the others are still rendered
                console.error('error creating toolbar - will skip this one', err2);
            }
    }
}
exports.buildToolbars = buildToolbars;
//////////////////////////////// Private Functions ////////////////////////////////////
/**
 * Load the toolbar configuration from the sxc-toolbar attribute OR the old schema
 * @param tag
 * @return a configuration object or null in case of an error
 */
function loadConfigFromAttributes(tag) {
    try {
        var newConfigFormat = tryGetAttrText(tag, Constants.toolbar.attr.full);
        if (newConfigFormat) {
            return JSON.parse(newConfigFormat);
        }
        else {
            var at = sxc_controller_in_page_1.$2sxcInPage.c.attr;
            var data = getFirstAttribute(tag, at.toolbar, at.toolbarData);
            var settings = getFirstAttribute(tag, at.settings, at.settingsData);
            return {
                toolbar: JSON.parse(data),
                settings: JSON.parse(settings)
            };
        }
    }
    catch (err) {
        console.error('error in settings JSON - probably invalid - make sure you also quote your properties like "name": ...', tag, err);
        return null;
    }
}
/**
 * Take a configuration and convert into a toolbar-menu; also attach the hover-attribute
 * @param tag
 * @param config
 * @param log
 */
function convertConfigToToolbarTags(tag, config, log) {
    var cnt = context_1.context(tag);
    cnt.toolbar = toolbar_expand_config_1.expandToolbarConfig(cnt, config.toolbar, config.settings, log);
    if (tag.attr(Constants.toolbar.attr.full)) {
        // new case, where the full toolbar is included in one setting
        // ReSharper disable once WrongExpressionStatement
        new tag_toolbar_1.TagToolbar(tag, cnt);
        ensureToolbarHoverClass(tag);
    }
    else {
        var toolbar_1 = render_toolbar_1.renderToolbar(cnt);
        // default case, tag is the old <ul> tag, so find the sc-element parent before replacing
        var scElementParent = tag.closest(Constants.toolbar.selectors.ofOldHover);
        tag.replaceWith(toolbar_1);
        if (scElementParent.length > 0)
            ensureToolbarHoverClass(scElementParent);
    }
}
/** find current toolbars inside this wrapper-tag */
function getToolbarTags(parentTag) {
    var allInner = $(".sc-menu[toolbar],.sc-menu[data-toolbar],[" + Constants.toolbar.attr.full + "]", parentTag);
    // return only those, which don't belong to a sub-item
    var onlyDirectDescendents = allInner
        .filter(function (i, e) { return $(e).closest(Constants.cb.selectors.ofName)[0] === parentTag[0]; });
    if (dbg)
        console.log('found toolbars for parent', parentTag, onlyDirectDescendents);
    return onlyDirectDescendents;
}
/** add hover-attribute to tag */
function ensureToolbarHoverClass(jtag) {
    if (jtag.length <= 0)
        return; // skip in case nothing was given
    var tag = jtag[0];
    if (!tag.hasAttribute(Constants.toolbar.attr.hover))
        tag.setAttribute(Constants.toolbar.attr.hover, '');
}
/** Create a default/fallback toolbar and return it */
function addFallbackToolbar(parentTag) {
    if (dbg)
        console.log("didn't find toolbar, so will auto-create", parentTag);
    var outsideCb = !parentTag.hasClass(Constants.cb.classes.name);
    var contentTag = outsideCb ? parentTag.find("div" + Constants.cb.selectors.ofName) : parentTag;
    // auto toolbar
    var ctx = context_1.context(contentTag);
    if (ctx.ui.autoToolbar === false)
        return null;
    contentTag.attr(Constants.toolbar.attr.full, JSON.stringify(toolbar_settings_1.emptyToolbar));
    return contentTag;
}
/** Find the text of one or more attributes in fallback order, till we found one */
function getFirstAttribute(toolbar, name1, name2) {
    return tryGetAttrText(toolbar, name1) || tryGetAttrText(toolbar, name2) || '{}';
}
/** Get text-content of an attribute (or return null) */
function tryGetAttrText(tag, name) {
    var item1 = tag.attributes.getNamedItem(name);
    return item1 && item1.textContent;
}
function disable(tag) {
    var jtag = $(tag);
    jtag.attr(Constants.toolbar.attr.disable, 'true');
}
exports.disable = disable;
function isDisabled(sxc) {
    var tag = $(api_1.getTag(sxc));
    return !!tag.attr(Constants.toolbar.attr.disable);
}
exports.isDisabled = isDisabled;
//# sourceMappingURL=build-toolbars.js.map
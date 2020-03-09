// todo: use Rewire to access internal methods without using export
// https://stackoverflow.com/questions/14874208/how-to-access-and-test-an-internal-non-exports-function-in-a-node-js-module/30794280

import 'jasmine';
//import { generateFallbackToolbar } from '../src/toolbar/build-toolbars';
import { createContextFromEditContext } from '../src/context/context';
import { expandToolbarConfig } from '../src/toolbar/toolbar/toolbar-expand-config';
import { renderToolbar } from '../src/toolbar/item/render-toolbar';
import { ToolbarSettings } from '../src/toolbar/toolbar/toolbar-settings';
import { DataEditContext } from '../src/data-edit-context/data-edit-context';

describe('Toolbar test suite', function () {
  const editContext: DataEditContext = { "Environment": { "WebsiteId": 0, "WebsiteUrl": "//2sxc914lts-dnn742.dnndev.me/", "PageId": 93, "PageUrl": "http://2sxc914lts-dnn742.dnndev.me/TB3", "parameters": [{ "Key": "TabId", "Value": "93" }, { "Key": "language", "Value": "en-US" }], "InstanceId": 2506, "SxcVersion": "9.14.0.27116", "SxcRootUrl": "/", "IsEditable": true }, "User": { "CanDesign": true, "CanDevelop": true }, "Language": { "Current": "en-us", "Primary": "en-us", "All": [] }, "ContentBlock": { "ShowTemplatePicker": true, "IsEntity": false, "VersioningRequirements": "DraftOptional", "Id": 2506, "ParentFieldName": null, "ParentFieldSortOrder": 0, "PartOfPage": true }, "ContentGroup": { "IsCreated": true, "IsList": true, "TemplateId": 4994, "QueryId": null, "ContentTypeName": "5a3932e9-cff0-46a2-a465-d2370154c39e", "AppUrl": "/Portals/0/2sxc/TestToolbar", "AppSettingsId": null, "AppResourcesId": null, "IsContent": false, "HasContent": true, "SupportsAjax": false, "ZoneId": 2, "AppId": 16, "Guid": "bacde468-fe3c-4993-8b0b-b6813f5141cc", "Id": 4995 }, "error": { "type": null } } as DataEditContext;

  it('1 jasmine smoke test', function () {
    expect(true).toBe(true);
  });

  //it('2 generate fallback toolbar', function () {
  //  const generatedHtml = generateFallbackToolbar()[0].outerHTML;
  //  const expectedHtml = '<ul class="sc-menu" toolbar="" settings="{&quot;autoAddMore&quot;:&quot;start&quot;,&quot;hover&quot;:&quot;left&quot;,&quot;show&quot;:&quot;hover&quot;,&quot;classes&quot;:&quot;&quot;}"></ul>';
  //  expect(generatedHtml).toBe(expectedHtml);
  //});

  //it('3 mock standard toolbar', function () {
  //  const toolbarData: any = {};
  //  const toolbarSettings: ToolbarSettings = {} as ToolbarSettings;
  //  const cnt = getContextFromEditContext(editContext);
  //  cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
  //  console.log(
  //    'stv: cnt.toolbar',
  //    JSON.stringify(cnt.toolbar));
  //  const expected = { "groups": [{ "name": "default", "buttons": [{ "name": "layout", "classes": "", "dialog": "", "fullScreen": null, "icon": "icon-sxc-glasses", "inlineWindow": true, "newWindow": null, "partOfPage": true, "show": null, "uiActionOnly": true, "action": { "name": "layout", "params": {}, "commandDefinition": { "name": "layout", "buttonConfig": { "icon": "icon-sxc-glasses", "uiActionOnly": true, "partOfPage": true, "inlineWindow": true } } }, "disabled": false }, { "name": "more", "classes": "", "dialog": "", "fullScreen": null, "icon": "icon-sxc-options btn-mode", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "more", "params": {}, "commandDefinition": { "name": "more", "buttonConfig": { "icon": "icon-sxc-options btn-mode", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }] }, { "name": "list", "buttons": [{ "name": "item-history", "classes": "", "dialog": "", "fullScreen": true, "icon": "icon-sxc-clock", "inlineWindow": true, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "item-history", "params": {}, "commandDefinition": { "name": "item-history", "buttonConfig": { "icon": "icon-sxc-clock", "uiActionOnly": true, "partOfPage": false, "inlineWindow": true, "fullScreen": true } } }, "disabled": false }, { "name": "more", "classes": "", "dialog": "", "fullScreen": null, "icon": "icon-sxc-options btn-mode", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "more", "params": {}, "commandDefinition": { "name": "more", "buttonConfig": { "icon": "icon-sxc-options btn-mode", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }] }, { "name": "instance", "buttons": [{ "name": "template-develop", "classes": "group-pro", "dialog": "develop", "fullScreen": null, "icon": "icon-sxc-code", "inlineWindow": null, "newWindow": true, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "template-develop", "params": {}, "commandDefinition": { "name": "template-develop", "buttonConfig": { "icon": "icon-sxc-code", "uiActionOnly": true, "partOfPage": false, "newWindow": true, "dialog": "develop" } } }, "disabled": false }, { "name": "template-settings", "classes": "group-pro", "dialog": "edit", "fullScreen": null, "icon": "icon-sxc-sliders", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "template-settings", "params": {}, "commandDefinition": { "name": "template-settings", "buttonConfig": { "icon": "icon-sxc-sliders", "uiActionOnly": true, "partOfPage": false, "dialog": "edit" } } }, "disabled": false }, { "name": "contentitems", "classes": "group-pro", "dialog": "", "fullScreen": null, "icon": "icon-sxc-table", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "contentitems", "params": {}, "commandDefinition": { "name": "contentitems", "buttonConfig": { "icon": "icon-sxc-table", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }, { "name": "template-query", "classes": "group-pro", "dialog": "pipeline-designer", "fullScreen": null, "icon": "icon-sxc-filter", "inlineWindow": null, "newWindow": true, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "template-query", "params": {}, "commandDefinition": { "name": "template-query", "buttonConfig": { "icon": "icon-sxc-filter", "uiActionOnly": true, "partOfPage": false, "dialog": "pipeline-designer", "newWindow": true } } }, "disabled": true }, { "name": "contenttype", "classes": "group-pro", "dialog": "", "fullScreen": null, "icon": "icon-sxc-fields", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "contenttype", "params": {}, "commandDefinition": { "name": "contenttype", "buttonConfig": { "icon": "icon-sxc-fields", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }, { "name": "more", "classes": "group-pro", "dialog": "", "fullScreen": null, "icon": "icon-sxc-options btn-mode", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "more", "params": {}, "commandDefinition": { "name": "more", "buttonConfig": { "icon": "icon-sxc-options btn-mode", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }], "defaults": { "classes": "group-pro" } }, { "name": "app", "buttons": [{ "name": "app", "classes": "group-pro", "dialog": "", "fullScreen": null, "icon": "icon-sxc-settings", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "app", "params": {}, "commandDefinition": { "name": "app", "buttonConfig": { "icon": "icon-sxc-settings", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }, { "name": "app-settings", "classes": "group-pro", "dialog": "edit", "fullScreen": null, "icon": "icon-sxc-sliders", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "app-settings", "params": {}, "commandDefinition": { "name": "app-settings", "buttonConfig": { "icon": "icon-sxc-sliders", "uiActionOnly": true, "partOfPage": false, "dialog": "edit" } } }, "disabled": true }, { "name": "app-resources", "classes": "group-pro", "dialog": "edit", "fullScreen": null, "icon": "icon-sxc-language", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "app-resources", "params": {}, "commandDefinition": { "name": "app-resources", "buttonConfig": { "icon": "icon-sxc-language", "uiActionOnly": true, "partOfPage": false, "dialog": "edit" } } }, "disabled": true }, { "name": "zone", "classes": "group-pro", "dialog": "", "fullScreen": null, "icon": "icon-sxc-manage", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "zone", "params": {}, "commandDefinition": { "name": "zone", "buttonConfig": { "icon": "icon-sxc-manage", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }, { "name": "more", "classes": "group-pro", "dialog": "", "fullScreen": null, "icon": "icon-sxc-options btn-mode", "inlineWindow": null, "newWindow": null, "partOfPage": false, "show": null, "uiActionOnly": true, "action": { "name": "more", "params": {}, "commandDefinition": { "name": "more", "buttonConfig": { "icon": "icon-sxc-options btn-mode", "uiActionOnly": true, "partOfPage": false } } }, "disabled": false }], "defaults": { "classes": "group-pro" } }], "name": "toolbar", "debug": false, "params": {}, "settings": { "autoAddMore": "end", "hover": "right", "show": "hover" }, "defaults": {} } as ToolbarConfig;
  //  expect(cnt.toolbar).toBe(expected);
  //});

  it('3 mock standard toolbar', function () {
    const toolbarData: any = {};
    const toolbarSettings = {} as ToolbarSettings;
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-right sc-tb-show-hover" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="4"><li><a class="sc-layout group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;layout&quot;}, event);" data-i18n="[title]Toolbar.ChangeLayout"><div><i class="icon-sxc-glasses" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-item-history group-1" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;item-history&quot;}, event);" data-i18n="[title]Toolbar.ItemHistory"><div><i class="icon-sxc-clock" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-1" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-template-develop group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;template-develop&quot;}, event);" data-i18n="[title]Toolbar.Develop"><div><i class="icon-sxc-code" aria-hidden="true"></i></div></a></li><li><a class="sc-template-settings group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;template-settings&quot;}, event);" data-i18n="[title]Toolbar.TemplateSettings"><div><i class="icon-sxc-sliders" aria-hidden="true"></i></div></a></li><li><a class="sc-contentitems group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;contentitems&quot;}, event);" data-i18n="[title]Toolbar.ContentItems"><div><i class="icon-sxc-table" aria-hidden="true"></i></div></a></li><li><a class="sc-template-query group-2 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.QueryEditDisabled"><div><i class="icon-sxc-filter" aria-hidden="true"></i></div></a></li><li><a class="sc-contenttype group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;contenttype&quot;}, event);" data-i18n="[title]Toolbar.ContentType"><div><i class="icon-sxc-fields" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-app group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;app&quot;}, event);" data-i18n="[title]Toolbar.App"><div><i class="icon-sxc-settings" aria-hidden="true"></i></div></a></li><li><a class="sc-app-settings group-3 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.AppSettingsDisabled"><div><i class="icon-sxc-sliders" aria-hidden="true"></i></div></a></li><li><a class="sc-app-resources group-3 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.AppResourcesDisabled"><div><i class="icon-sxc-language" aria-hidden="true"></i></div></a></li><li><a class="sc-zone group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;zone&quot;}, event);" data-i18n="[title]Toolbar.Zone"><div><i class="icon-sxc-manage" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li></ul>`;
    expect(generatedHtml).toBe(expectedHtml);
  });


  it('4 mock standard toolbar with settings { "hover": "left" } to contain "sc-tb-hover-left"', function () {
    const toolbarData: any = {};
    const toolbarSettings = new ToolbarSettings({ "hover": "left" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const containHtml = `sc-tb-hover-left`;
    expect(generatedHtml).toContain(containHtml);
  });

  it('5 mock standard toolbar with settings { "hover": "left" } ', function () {
    const toolbarData: any = {};
    const toolbarSettings = new ToolbarSettings({ "hover": "left" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-left sc-tb-show-hover" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="4"><li><a class="sc-layout group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;layout&quot;}, event);" data-i18n="[title]Toolbar.ChangeLayout"><div><i class="icon-sxc-glasses" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-item-history group-1" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;item-history&quot;}, event);" data-i18n="[title]Toolbar.ItemHistory"><div><i class="icon-sxc-clock" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-1" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-template-develop group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;template-develop&quot;}, event);" data-i18n="[title]Toolbar.Develop"><div><i class="icon-sxc-code" aria-hidden="true"></i></div></a></li><li><a class="sc-template-settings group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;template-settings&quot;}, event);" data-i18n="[title]Toolbar.TemplateSettings"><div><i class="icon-sxc-sliders" aria-hidden="true"></i></div></a></li><li><a class="sc-contentitems group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;contentitems&quot;}, event);" data-i18n="[title]Toolbar.ContentItems"><div><i class="icon-sxc-table" aria-hidden="true"></i></div></a></li><li><a class="sc-template-query group-2 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.QueryEditDisabled"><div><i class="icon-sxc-filter" aria-hidden="true"></i></div></a></li><li><a class="sc-contenttype group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;contenttype&quot;}, event);" data-i18n="[title]Toolbar.ContentType"><div><i class="icon-sxc-fields" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-app group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;app&quot;}, event);" data-i18n="[title]Toolbar.App"><div><i class="icon-sxc-settings" aria-hidden="true"></i></div></a></li><li><a class="sc-app-settings group-3 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.AppSettingsDisabled"><div><i class="icon-sxc-sliders" aria-hidden="true"></i></div></a></li><li><a class="sc-app-resources group-3 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.AppResourcesDisabled"><div><i class="icon-sxc-language" aria-hidden="true"></i></div></a></li><li><a class="sc-zone group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;zone&quot;}, event);" data-i18n="[title]Toolbar.Zone"><div><i class="icon-sxc-manage" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li></ul>`;
    expect(generatedHtml).toBe(expectedHtml);
  });

  it('6 mock standard toolbar with settings { "hover": "left", "autoAddMore": "start" } to contain button more as first button in toolbar', function () {
    const toolbarData: any = {};
    const toolbarSettings = new ToolbarSettings({ "hover": "left", "autoAddMore": "start" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const containHtml = `<ul class="sc-menu group-0 sc-tb-hover-left sc-tb-show-hover" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="4"><li><a class="sc-more group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li>`;
    expect(generatedHtml).toContain(containHtml);
  });

  it('7 mock standard toolbar with settings { "hover": "left", "autoAddMore": "start" } ', function () {
    const toolbarData: any = {};
    const toolbarSettings = new ToolbarSettings({ "hover": "left", "autoAddMore": "start" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-left sc-tb-show-hover" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="4"><li><a class="sc-more group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-layout group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;layout&quot;}, event);" data-i18n="[title]Toolbar.ChangeLayout"><div><i class="icon-sxc-glasses" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-1" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-item-history group-1" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;item-history&quot;}, event);" data-i18n="[title]Toolbar.ItemHistory"><div><i class="icon-sxc-clock" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-template-develop group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;template-develop&quot;}, event);" data-i18n="[title]Toolbar.Develop"><div><i class="icon-sxc-code" aria-hidden="true"></i></div></a></li><li><a class="sc-template-settings group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;template-settings&quot;}, event);" data-i18n="[title]Toolbar.TemplateSettings"><div><i class="icon-sxc-sliders" aria-hidden="true"></i></div></a></li><li><a class="sc-contentitems group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;contentitems&quot;}, event);" data-i18n="[title]Toolbar.ContentItems"><div><i class="icon-sxc-table" aria-hidden="true"></i></div></a></li><li><a class="sc-template-query group-2 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.QueryEditDisabled"><div><i class="icon-sxc-filter" aria-hidden="true"></i></div></a></li><li><a class="sc-contenttype group-2 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;contenttype&quot;}, event);" data-i18n="[title]Toolbar.ContentType"><div><i class="icon-sxc-fields" aria-hidden="true"></i></div></a></li><li><a class="sc-more group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;more&quot;}, event);" data-i18n="[title]Toolbar.MoreActions"><div><i class="icon-sxc-options btn-mode" aria-hidden="true"></i></div></a></li><li><a class="sc-app group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;app&quot;}, event);" data-i18n="[title]Toolbar.App"><div><i class="icon-sxc-settings" aria-hidden="true"></i></div></a></li><li><a class="sc-app-settings group-3 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.AppSettingsDisabled"><div><i class="icon-sxc-sliders" aria-hidden="true"></i></div></a></li><li><a class="sc-app-resources group-3 disabled group-pro empty" onclick="" data-i18n="[title]Toolbar.AppResourcesDisabled"><div><i class="icon-sxc-language" aria-hidden="true"></i></div></a></li><li><a class="sc-zone group-3 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;zone&quot;}, event);" data-i18n="[title]Toolbar.Zone"><div><i class="icon-sxc-manage" aria-hidden="true"></i></div></a></li></ul>`;
    expect(generatedHtml).toBe(expectedHtml);
  });

  it('8 mock toolbar with one button "new" and settings { "hover": "left" } to contain `sc-tb-hover-left`', function () {
    const toolbarData: any = [{ "action": "new", "contentType": "Dummy" }];
    const toolbarSettings = new ToolbarSettings({ "hover": "left" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const containHtml = `sc-tb-hover-left`;
    expect(generatedHtml).toContain(containHtml);
  });

  it('9 mock toolbar with one button "new" and settings { "hover": "left" }', function () {
    const toolbarData: any = [{ "action": "new", "contentType": "Dummy" }];
    const toolbarSettings = new ToolbarSettings({ "hover": "left" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-left sc-tb-show-hover" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="1"><li><a class="sc-new group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;new&quot;,&quot;contentType&quot;:&quot;Dummy&quot;}, event);" data-i18n="[title]Toolbar.New"><div><i class="icon-sxc-plus" aria-hidden="true"></i></div></a></li></ul>`;
    expect(generatedHtml).toBe(expectedHtml);
  });

  it('10 mock toolbar two "new" buttons and settings { "hover": "left", "show": "always" } to contain `sc-tb-hover-left sc-tb-show-always`', function () {
    const toolbarData: any = [{
      "command": {
        "action": "new",
        "contentType": "Category"
      },
      "title": "create Category",
      "classes": "group-pro"
    }, {
      "command": {
        "action": "new",
        "contentType": "Author"
      },
      "title": "create Author"
    }];
    const toolbarSettings = new ToolbarSettings({ "hover": "left", "show": "always" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const containHtml = `sc-tb-hover-left sc-tb-show-always`;
    expect(generatedHtml).toContain(containHtml);
  });

  it('11 mock toolbar two "new" buttons and settings { "hover": "left", "show": "always" }', function () {
    const toolbarData: any = [{
      "command": {
        "action": "new",
        "contentType": "Category"
      },
      "title": "create Category",
      "classes": "group-pro"
    }, {
      "command": {
        "action": "new",
        "contentType": "Author"
      },
      "title": "create Author"
    }];
    const toolbarSettings = new ToolbarSettings({ "hover": "left", "show": "always" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-left sc-tb-show-always" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="1"><li><a class="sc-new group-0 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;new&quot;,&quot;contentType&quot;:&quot;Category&quot;}, event);" data-i18n="[title]create Category"><div><i class="icon-sxc-plus" aria-hidden="true"></i></div></a></li><li><a class="sc-new group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;new&quot;,&quot;contentType&quot;:&quot;Author&quot;}, event);" data-i18n="[title]create Author"><div><i class="icon-sxc-plus" aria-hidden="true"></i></div></a></li></ul>`;
    expect(generatedHtml).toBe(expectedHtml);
  });

  it('12 mock toolbar with only one "custom" button in group to contain "custom"', function () {
    const toolbarData: any = {
      "groups": [{
        "buttons": [{
          "command": {
            "action": "custom",
            "customCode": "alert(\"custom button!\")"
          }
        }]
      }]
    };
    const toolbarSettings = new ToolbarSettings({});
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const containHtml = `custom`;
    expect(generatedHtml).toContain(containHtml);
  });

  it('12b mock toolbar with only one "custom" button in group', function () {
    const toolbarData: any = {
      "groups": [{
        "buttons": [{
          "command": {
            "action": "custom",
            "customCode": "alert(\"custom button!\")"
          }
        }]
      }]
    };
    const toolbarSettings = new ToolbarSettings({});
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-right sc-tb-show-hover" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="1"><li><a class="sc-custom group-0" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;custom&quot;,&quot;customCode&quot;:&quot;alert(\\&quot;custom button!\\&quot;)&quot;}, event);" data-i18n="[title]Toolbar.Custom"><div><i class="icon-sxc-bomb" aria-hidden="true"></i></div></a></li></ul>`;
    expect(generatedHtml).toBe(expectedHtml);
  });

  it('14 mock toolbar with one button "app" and defaults, plus settings to contain "group-pro"', function () {
    const toolbarData: any = { "groups": [{ "name": "default", "buttons": "app", "contentType": "Libraries" }], "defaults": { "title": "Libraries", "classes": "group-pro" } };
    const toolbarSettings = new ToolbarSettings({ "hover": "none", "show": "always" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const containHtml = `group-pro`;
    expect(generatedHtml).toContain(containHtml);
  });

  it('15 mock toolbar with one button "app" and defaults, plus settigns', function () {
    const toolbarData: any = { "groups": [{ "name": "default", "buttons": "app", "contentType": "Libraries" }], "defaults": { "title": "Libraries", "classes": "group-pro" } };
    const toolbarSettings = new ToolbarSettings({ "hover": "none", "show": "always" });
    const cnt = createContextFromEditContext(editContext);
    cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
    const generatedHtml = renderToolbar(cnt);
    const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-none sc-tb-show-always" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="1"><li><a class="sc-app group-0 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;app&quot;}, event);" data-i18n="[title]Toolbar.App"><div><i class="icon-sxc-settings" aria-hidden="true"></i></div></a></li></ul>`;
    expect(generatedHtml).toBe(expectedHtml);
  });

  //it('16 mock toolbar with one button "app" and defaults, plus settings to contain "group-pro"', function () {
  //  const toolbarData: any = { "groups": [{ "name": "default", "buttons": "app", "contentType": "Libraries" }], "defaults": { "title": "Libraries", "classes": "group-pro" } };
  //  const toolbarSettings = new ToolbarSettings({ "hover": "none", "show": "always" });
  //  const cnt = getContextFromEditContext(editContext);
  //  cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
  //  const generatedHtml = renderToolbar(cnt);
  //  console.log(
  //    'stv: html',
  //    generatedHtml);
  //  const containHtml = `group-pro`;
  //  expect(generatedHtml).toContain(containHtml);
  //});

  //it('17 mock toolbar with one button "app" and defaults, plus settigns', function () {
  //  const toolbarData: any = { "groups": [{ "name": "default", "buttons": "app", "contentType": "Libraries" }], "defaults": { "title": "Libraries", "classes": "group-pro" } };
  //  const toolbarSettings = new ToolbarSettings({ "hover": "none", "show": "always" });
  //  const cnt = getContextFromEditContext(editContext);
  //  cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings);
  //  const generatedHtml = renderToolbar(cnt);
  //  console.log(
  //    'stv: html',
  //    generatedHtml);
  //  const expectedHtml = `<ul class="sc-menu group-0 sc-tb-hover-none sc-tb-show-always" onclick="var e = arguments[0] || window.event; e.stopPropagation();" group-count="1"><li><a class="sc-app group-0 group-pro" onclick="$2sxc(2506, 2506).manage.run({&quot;action&quot;:&quot;app&quot;}, event);" data-i18n="[title]Toolbar.App"><div><i class="icon-sxc-settings" aria-hidden="true"></i></div></a></li></ul>`;
  //  expect(generatedHtml).toBe(expectedHtml);
  //});

});


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills/include-polyfills");
var sxc_controller_in_page_1 = require("./interfaces/sxc-controller-in-page");
var window_in_page_1 = require("./interfaces/window-in-page");
var commands_1 = require("./commands/commands");
var Cms_1 = require("./cms/Cms");
var context_1 = require("./context/context");
var manage_1 = require("./manage/manage");
var quick_e_1 = require("./quick-edit/quick-e");
var start_1 = require("./quick-edit/start");
var _2sxc__translateInit_1 = require("./translate/2sxc._translateInit");
var _2sxc_translate_1 = require("./translate/2sxc.translate");
require("./x-bootstrap/module-bootstrapper");
sxc_controller_in_page_1.$2sxcInPage.context = context_1.context; // primary API to get the context
sxc_controller_in_page_1.$2sxcInPage._translateInit = _2sxc__translateInit_1._translateInit; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
sxc_controller_in_page_1.$2sxcInPage.translate = _2sxc_translate_1.translate; // provide an official translate API for 2sxc
sxc_controller_in_page_1.$2sxcInPage._commands = commands_1.Commands.getInstance();
sxc_controller_in_page_1.$2sxcInPage._manage = manage_1._manage; // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
window_in_page_1.windowInPage.$quickE = quick_e_1.$quickE;
$(start_1.start); // run on-load
sxc_controller_in_page_1.$2sxcInPage.cms = new Cms_1.Cms();
//# sourceMappingURL=inpage.{}.js.map
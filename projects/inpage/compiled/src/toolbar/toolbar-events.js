"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sxc_controller_in_page_1 = require("../interfaces/sxc-controller-in-page");
// prevent propagation of the click (if menu was clicked)
$(sxc_controller_in_page_1.$2sxcInPage.c.sel.scMenu).click(function (e) { return e.stopPropagation(); });
//# sourceMappingURL=toolbar-events.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_1 = require("./create");
/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 */
var Manage = /** @class */ (function () {
    function Manage() {
        this.initInstance = create_1.initInstance;
    }
    return Manage;
}());
exports._manage = new Manage(); // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
//# sourceMappingURL=manage.js.map
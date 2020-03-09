"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 *
 * Maybe ToDo 2cb:
 * 2sxc should have one entry point (interface to browser context) only.
 * Otherwise, we cannot know, when which part will be executed and debugging becomes very difficult.
 *
 */
var MainContentBlock = /** @class */ (function () {
    function MainContentBlock() {
        this.prepareToAddContent = templates_1.prepareToAddContent;
        //updateTemplateFromDia = updateTemplateFromDia;
    }
    // constants
    MainContentBlock.cViewWithoutContent = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
    MainContentBlock.cUseExistingTemplate = -1;
    return MainContentBlock;
}());
exports.MainContentBlock = MainContentBlock;
/**
 * The main content-block manager
 */
// ReSharper disable once InconsistentNaming
exports._contentBlock = new MainContentBlock();
//# sourceMappingURL=main-content-block.js.map
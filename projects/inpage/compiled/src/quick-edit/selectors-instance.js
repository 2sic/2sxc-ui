"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * selectors used all over the in-page-editing, centralized to ensure consistency
 */
exports.selectors = {
    cb: {
        id: 'cb',
        class: 'sc-content-block',
        selector: '.sc-content-block',
        listSelector: '.sc-content-block-list',
        context: 'data-list-context',
        singleItem: 'single-item',
    },
    mod: {
        id: 'mod',
        class: 'DnnModule',
        selector: '.DnnModule',
        listSelector: '.DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)',
        context: null,
    },
    eitherCbOrMod: '.DnnModule, .sc-content-block',
    selected: 'sc-cb-is-selected',
};
//# sourceMappingURL=selectors-instance.js.map
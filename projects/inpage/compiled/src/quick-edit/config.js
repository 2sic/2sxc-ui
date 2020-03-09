"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quick_e_1 = require("./quick-e");
var selectors_instance_1 = require("./selectors-instance");
var configAttr = 'quick-edit-config';
/**
 * the initial configuration
 */
var conf = quick_e_1.$quickE.config = {
    enable: true,
    innerBlocks: {
        enable: null,
    },
    modules: {
        enable: null,
    },
};
function _readPageConfig() {
    var configs /*: Conf[]*/ = $("[" + configAttr + "]");
    var confJ;
    // any inner blocks found? will currently affect if modules can be inserted...
    var hasInnerCBs = ($(selectors_instance_1.selectors.cb.listSelector).length > 0);
    if (configs.length > 0) {
        // go through reverse list, as the last is the most important...
        var finalConfig = {};
        for (var c = configs.length; c >= 0; c--) {
            confJ = configs[0].getAttribute(configAttr);
            try {
                var confO = JSON.parse(confJ);
                Object.assign(finalConfig, confO);
            }
            catch (e) {
                console.warn('had trouble with json', e);
            }
        }
        Object.assign(conf, finalConfig);
    }
    // re-check "auto" or "null"
    // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
    if (conf.modules.enable === null || conf.modules.enable === 'auto')
        conf.modules.enable = !hasInnerCBs;
    // for now, ContentBlocks are only enabled if they exist on the page
    if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto')
        conf.innerBlocks.enable = hasInnerCBs;
}
exports._readPageConfig = _readPageConfig;
//# sourceMappingURL=config.js.map
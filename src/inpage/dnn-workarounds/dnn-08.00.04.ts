// The following script fixes a bug in DNN 08.00.04
// the bug tries to detect a module-ID based on classes in a tag, 
// but uses a bad regex and captures the number 2 on all 2sxc-modules 
// instead of the real id
// this patch changes the order of the className of 2sxc modules when
// they are accessed through '$.fn.attr'
// 'DnnModule-2sxc DnnModule-xxx' -> DNN thinks the mod id is 2 (false)
// 'DnnModule-xxx DnnModule-2sxc' -> DNN thinks the mod id is xxx (correct)
// documented here https://github.com/2sic/2sxc/issues/986

/**
 * Fix drag-drop functionality in dnn 08.00.04 - it has an incorrect regex
 */
declare const $;

(() => {
    var fn = $.fn.attr;
    $.fn.attr = function () {
        var val = fn.apply(this, arguments);
        if (arguments[0] !== "class"
            || typeof val !== "string"
            || val.search("DnnModule-2sxc ") === -1) return val;
        return val.replace("DnnModule-2sxc ", "") + " DnnModule-2sxc";
    };
})();
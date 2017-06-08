// The following script fixes a bug in DNN 08.00.04
// the bug tries to detect a module-ID based on classes in a tag, 
// but uses a bad regex and captures the number 2 on all 2sxc-modules 
// instead of the real id
// this patch replaces the faulty regex with the correct one
// documented here https://github.com/2sic/2sxc/issues/986

/**
 * Fix bug in dnn 08.00.04 drag-drop functionality - it has an incorrect regex
 */
(function () {
    var fn = $.fn.attr;
    $.fn.attr = function () {
        var val = fn.apply(this, arguments);
        if (arguments[0] !== 'class' || typeof val !== 'string') return val;
        if (val.search('DnnModule-2sxc ') === -1) return val;
        return val.replace('DnnModule-2sxc ', '') + ' DnnModule-2sxc';
    };
})();
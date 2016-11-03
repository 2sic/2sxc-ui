
// The following script fixes a bug in DNN 08.00.04
// the bug tries to detect a module-ID based on classes in a tag, 
// but uses a bad regex and captures the number 2 on all 2sxc-modules 
// instead of the real id
// this patch replaces the faulty regex with the correct one
// documented here https://github.com/2sic/2sxc/issues/986

/*jshint ignore:start*/
// fix bug in dnn 08.00.04 drag-drop functionality - it has an incorrect regex
if($ && $.fn && $.fn.dnnModuleDragDrop)
    eval("$.fn.dnnModuleDragDrop = "
        + $.fn.dnnModuleDragDrop.toString()
            .replace(".match(/DnnModule-([0-9]+)/)", ".match(/DnnModule-([0-9]+)(?:\W|$)/)"));
/*jshint ignore:end*/
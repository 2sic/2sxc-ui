
// this is a dialog manager which is in charge of all
// quick-dialogs. 
// it always has a reference to the latest dialog created by any module instance

(function () {

    /**
     * dialog manager - the currently active dialog object
     */
    var diagManager = $2sxc._dialogManager = {
        current: null,
        hide: function() {
            if (diagManager.current) diagManager.current.toggle(false);

        },
        cancel: function() {
            if (diagManager.current)
                diagManager.current.cancel(); // cancel & hide

        }
    };
    
})();
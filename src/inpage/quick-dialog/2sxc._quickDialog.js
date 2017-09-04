// this is a dialog handler which will create in-page dialogs for 
// - the template / view picker
// - the getting-started / install-templates dialog
// 

(function () {
    $2sxc._quickDialog = Dialog;

    var diagManager = $2sxc._dialogManager;

    diagManager.watchForResize();

    // ReSharper disable once InconsistentNaming
    function Dialog(sxc, url, closeCallback, fullScreen) {

         return diagManager.show(sxc, url, closeCallback, fullScreen);
        
    }
})();
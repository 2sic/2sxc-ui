/* 
 * this is a content block in the browser
 * 
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
(function () {

    var cbm = $2sxc._contentBlock;

    cbm.dialogToggle = function (sxc) {
        // check if the dialog already exists, if yes, use that
        // it can already exist as part of the manage-object, 
        // ...or if the manage object was reset, we must find it in the DOM

        //var diag = sxc.manage.dialog;
        //if (diag)
        //    diag.toggle();
        //else
        {
            // didn't find an own dialog, so check if we must cancel another one first
            //$2sxc._dialogManager.cancel();

            // now create the new one
            // sxc.manage.dialog =

            sxc.manage.run("dash-view"); // not ideal, must improve
            //sxc.manage.run("layout"); // not ideal, must improve
            // todo 2cb - this just doesn't work right
            //sxc.manage.dialog.toggle(true); // just in case it was hidden before, and wasn't fully restored
        }
    };


    
})();
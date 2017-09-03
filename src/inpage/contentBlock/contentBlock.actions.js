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

    // internal helper, to do something and reload the content block
    cbm.getAndReload = function (sxc, url, params) {
        return sxc.webApi.get({
            url: url,
            params: params
        }).then(function () { cbm.reloadAndReInitialize(sxc); });
    };

    /**
     * remove an item from a list, then reload
     * @param {} sxc 
     * @param {} sortOrder 
     * @returns {} 
     */
    cbm.removeFromList = function(sxc, sortOrder) {
        return cbm.getAndReload(sxc, "view/module/removefromlist", { sortOrder: sortOrder });
    };

    /**
     * change the order of an item in a list, then reload
     * @param {} sxc 
     * @param {} initOrder 
     * @param {} newOrder 
     * @returns {} 
     */
    cbm.changeOrder = function(sxc, initOrder, newOrder) {
        return cbm.getAndReload(sxc, "view/module/changeorder",
            { sortOrder: initOrder, destinationSortOrder: newOrder });
    };

    /**
     * add an item to the list at this position
     * @param {} sxc 
     * @param {} sortOrder 
     * @returns {} 
     */
    cbm.addItem = function(sxc, sortOrder) {
        return cbm.getAndReload(sxc, "view/module/additem", { sortOrder: sortOrder });
    };

    /**
     * set a content-item in this block to published, then reload
     * @param {} sxc 
     * @param {} part 
     * @param {} sortOrder 
     * @returns {} 
     */
    cbm.publish = function(sxc, part, sortOrder) {
        return cbm.getAndReload(sxc, "view/module/publish", { part: part, sortOrder: sortOrder });
    };

    /**
     * publish an item using it's ID
     * @param {} sxc 
     * @param {} entityId 
     * @returns {} 
     */
    cbm.publishId = function(sxc, entityId) {
        return cbm.getAndReload(sxc, "view/module/publish", { id: entityId });
    };


})();
// the default / initial buttons in a standard toolbar
(function () {

    // ToDo: refactor to avoid side-effects
    $2sxc._toolbarManager.toolbarTemplate = {
        groups: [
            // ToDo: remove dead code
            //{
            //    name: "test",
            //    buttons: [
            //        {
            //            action: "edit",
            //            icon: "icon-sxc-code",
            //            title: "just quick edit!"
            //        },
            //        "inexisting-action",
            //        "edit",
            //        {
            //            action: "publish",
            //            showCondition: true,
            //            title: "forced publish button"
            //        },
            //        {
            //            command: {
            //                action: "custom",
            //                customCode: "alert('custom button!')"
            //            }
            //        },
            //        "more"
            //    ]
            //},
            {
                name: "default",
                buttons: "edit,new,metadata,publish,layout"
            }, {
                name: "list",
                buttons: "add,remove,moveup,movedown,instance-list,replace,item-history"
            }, {
                name: "data",
                buttons: "delete"
            }, {
                name: "instance",
                buttons: "template-develop,template-settings,contentitems,template-query,contenttype",
                defaults: {
                    classes: "group-pro"
                }
            }, {
                name: "app",
                buttons: "app,app-settings,app-resources,zone",
                defaults: {
                    classes: "group-pro"
                }
            }
        ],
        defaults: {},
        params: {},
        settings: {
            autoAddMore: "right",
            // these are defaults, don't set again
            // hover: "right",
        }
    };
})();
// the default / initial buttons in a standard toolbar

(function () {
    $2sxc._toolbarManager.toolbarTemplate = {
        groups: [
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
                buttons: "edit,new,metadata,publish,layout,more"
            },
            {
                name: "list",
                buttons: "add,remove,moveup,movedown,instance-list,replace,more"
            },
            {
                name: "instance",
                // todo: add templatesettings, query
                buttons: "template-develop,template-settings,contentitems,query,contenttype,more",
                defaults: {
                    classes: "group-pro"
                }
            },
            {
                name: "app",
                // todo: add multilanguage-resources & settings
                buttons: "app,app-settings,app-resources,zone,more",
                defaults: {
                    classes: "group-pro"
                }
            }
        ],
        defaults: {},
        params: {}
    };
})();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
exports.leftToolbarTemplate = {
    groups: [
        {
            name: 'default',
            buttons: 'edit,new,metadata,publish,layout',
        }, {
            name: 'list',
            buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
        }, {
            name: 'data',
            buttons: 'delete',
        }, {
            name: 'instance',
            buttons: 'template-develop,template-settings,contentitems,template-query,contenttype',
            defaults: {
                classes: 'group-pro',
            },
        }, {
            name: 'app',
            buttons: 'app,app-settings,app-resources,zone',
            defaults: {
                classes: 'group-pro',
            },
        },
    ],
    defaults: {},
    params: {},
    settings: {
        autoAddMore: 'start',
    },
};
//# sourceMappingURL=left-toolbar-template.js.map
import { TemplateConstants as TC, ToolbarTemplate } from '.';

/**
 * @internal
 */
// the default / initial buttons in a standard toolbar
export const ToolbarTemplateDefault: ToolbarTemplate = {
  name: TC.NameDefault,
  groups: [
    {
      name: TC.GroupDefault,
      buttons: 'edit,new,metadata,publish,layout',
    }, {
      name: TC.GroupList,
      buttons: 'add,add-existing,replace,remove,moveup,movedown,instance-list',
    }, {
      name: TC.GroupEditAdvanced,
      buttons: 'delete',
    }, {
      name: TC.GroupView,
      buttons: 'template-develop,template-settings,contentitems,template-query,contenttype',
      defaults: {
        classes: 'group-pro',
      },
    }, {
      name: TC.GroupApp,
      buttons: 'app,app-settings,app-resources,zone,insights-server',
      defaults: {
        classes: 'group-pro',
      },
    },
  ],
  defaults: {},
  params: {},
  settings: {
    autoAddMore: 'end',
    // these are defaults, don't set again
    // hover: "right",
  },
  _isToolbarTemplate: true,
};

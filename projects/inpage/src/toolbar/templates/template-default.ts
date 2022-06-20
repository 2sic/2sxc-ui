import { TemplateConstants as TC, ToolbarTemplate } from '.';
import { CommandNames as CN } from '../../commands';

/**
 * @internal
 */
// the default / initial buttons in a standard toolbar
export const ToolbarTemplateDefault: ToolbarTemplate = {
  name: TC.NameDefault,
  groups: [
    {
      name: TC.GroupDefault,
      buttons: [CN.edit, CN.new, CN.metadata, CN.publish, CN.layout].join(','),
      // 'edit,new,metadata,publish,layout',
    }, {
      name: TC.GroupList,
      buttons: [CN.add, CN.addExisting, CN.replace, CN.remove, CN.moveUp, CN.moveDown, CN.instanceList].join(','),
      // 'add,add-existing,replace,remove,moveup,movedown,instance-list',
    }, {
      name: TC.GroupEditAdvanced,
      buttons: [CN.delete].join(','),
      // 'delete',
    }, {
      name: TC.GroupView,
      buttons: [CN.templateDevelop, CN.templateSettings, CN.contentItems, CN.templateQuery, CN.contentType].join(','),
      // 'template-develop,template-settings,contentitems,template-query,contenttype',
      defaults: {
        classes: 'group-pro',
      },
    }, {
      name: TC.GroupApp,
      buttons: [CN.app, CN.appSettings, CN.appResources, CN.zone, CN.insightsServer].join(','),
      // 'app,app-settings,app-resources,zone,insights-server',
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

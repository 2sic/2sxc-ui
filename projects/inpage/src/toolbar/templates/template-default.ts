import { TemplateConstants, ToolbarTemplate } from '.';

// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
export const ToolbarTemplateDefault: ToolbarTemplate = {
  name: 'default',
  groups: [
    {
      name: TemplateConstants.NameDefault,
      buttons: 'edit,new,metadata,publish,layout',
    }, {
      name: 'list',
      buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
    }, {
        // todo: rename - and in all templates
      name: 'data',
      buttons: 'delete',
    }, {
        // todo: rename - and in all templates - probably 'view'
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
    autoAddMore: 'end',
    // these are defaults, don't set again
    // hover: "right",
  },
  _isToolbarTemplate: true,
};
